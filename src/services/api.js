import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "@lingueto:access_token";
const REFRESH_TOKEN_KEY = "@lingueto:refresh_token";
const LAST_GOOD_API_URL_KEY = "@lingueto:api_url";
const DEFAULT_TIMEOUT = 15000;

// EXPO_PUBLIC_API_URL pode conter varias URLs separadas por virgula
// (ex.: uma por rede/roteador). A primeira que responder vira a atual,
// e essa escolha e lembrada para as proximas requisicoes.
const API_URL_CANDIDATES = (process.env.EXPO_PUBLIC_API_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""))
  .filter(Boolean);

export let API_URL = API_URL_CANDIDATES[0] || "";

AsyncStorage.getItem(LAST_GOOD_API_URL_KEY)
  .then((saved) => {
    if (saved && API_URL_CANDIDATES.includes(saved)) API_URL = saved;
  })
  .catch(() => {});

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function setAccessToken(token) {
  if (!token) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
  return AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function setTokens({ access_token, refresh_token } = {}) {
  await Promise.all([
    access_token ? setAccessToken(access_token) : Promise.resolve(),
    refresh_token
      ? AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
      : Promise.resolve(),
  ]);
}

export function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  return AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}

// Chamado pelo AuthContext para poder deslogar o usuario quando o
// refresh_token tambem falhar (expirado/revogado). Evita import
// circular entre api.js e AuthContext.js.
let onAuthFailure = null;
export function setOnAuthFailure(callback) {
  onAuthFailure = callback;
}

// Chamado a cada renovacao de sessao com o usuario que o backend devolve.
// Serve para o app nao ficar com foto_url vencida: as urls de midia vem
// assinadas com validade, e a copia do usuario guardada no aparelho poderia
// passar semanas sem ser atualizada.
let onSessionRenewed = null;
export function setOnSessionRenewed(callback) {
  onSessionRenewed = callback;
}

function buildUrl(base, endpoint, params) {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const query = Object.entries(params || {})
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];

      return values.map(
        (item) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`,
      );
    })
    .join("&");

  return `${base}${path}${query ? `?${query}` : ""}`;
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function attempt(base, endpoint, { method, data, params, headers, token, isFormData, timeout }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(base, endpoint, params), {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(!isFormData && data !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(data !== undefined
        ? { body: isFormData ? data : JSON.stringify(data) }
        : {}),
    });

    const responseData = await parseResponse(response);

    if (!response.ok) {
      const message =
        responseData?.message ||
        responseData?.erro ||
        responseData?.error ||
        `Erro ${response.status} ao acessar a API.`;

      throw new ApiError(message, response.status, responseData);
    }

    return responseData;
  } finally {
    clearTimeout(timeoutId);
  }
}

// So pode existir um refresh em andamento por vez: como o backend rotaciona
// o refresh_token a cada uso, duas chamadas concorrentes fariam a segunda
// tentar usar um refresh_token que a primeira ja revogou.
let refreshPromise = null;

async function refreshAccessToken(base) {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refresh_token = await getRefreshToken();
      if (!refresh_token) {
        throw new ApiError("Sessão expirada.", 401);
      }

      const response = await attempt(base, "/auth/refresh", {
        method: "POST",
        data: { refresh_token, plataforma: Platform.OS },
        headers: {},
        token: null,
        isFormData: false,
        timeout: DEFAULT_TIMEOUT,
      });

      const payload = response?.dados || response?.data || response;
      if (!payload?.access_token || !payload?.refresh_token) {
        throw new ApiError("Não foi possível renovar a sessão.", 401);
      }

      await setTokens(payload);
      if (payload.usuario) onSessionRenewed?.(payload.usuario);
      return payload.access_token;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function request(
  endpoint,
  {
    method = "GET",
    data,
    params,
    headers = {},
    authenticated = true,
    timeout = DEFAULT_TIMEOUT,
    _isRetry = false,
  } = {},
) {
  if (API_URL_CANDIDATES.length === 0) {
    throw new ApiError(
      "Defina EXPO_PUBLIC_API_URL no arquivo .env antes de usar a API.",
    );
  }

  const token = authenticated ? await getAccessToken() : null;
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const orderedBases = [
    API_URL,
    ...API_URL_CANDIDATES.filter((url) => url !== API_URL),
  ].filter(Boolean);

  let lastError = null;

  for (let i = 0; i < orderedBases.length; i += 1) {
    const base = orderedBases[i];
    const isLastCandidate = i === orderedBases.length - 1;
    // Hosts que nao sao o ultimo candidato usam um timeout curto, so
    // para descobrir rapido se estao fora do ar e trocar de rede.
    const attemptTimeout = isLastCandidate ? timeout : Math.min(timeout, 5000);

    try {
      const responseData = await attempt(base, endpoint, {
        method,
        data,
        params,
        headers,
        token,
        isFormData,
        timeout: attemptTimeout,
      });

      if (base !== API_URL) {
        API_URL = base;
        AsyncStorage.setItem(LAST_GOOD_API_URL_KEY, base).catch(() => {});
      }

      return responseData;
    } catch (error) {
      // Erro HTTP real (a API respondeu) — nao adianta tentar outro host.
      if (error instanceof ApiError) {
        // Access token expirado/invalido: tenta renovar via refresh_token
        // e refazer a requisicao original uma unica vez.
        if (
          error.status === 401 &&
          authenticated &&
          !_isRetry &&
          endpoint !== "/auth/refresh"
        ) {
          try {
            await refreshAccessToken(base);
            return request(endpoint, {
              method,
              data,
              params,
              headers,
              authenticated,
              timeout,
              _isRetry: true,
            });
          } catch {
            await clearTokens();
            onAuthFailure?.();
          }
        }

        throw error;
      }

      lastError = error;
      // Falha de rede/conexao — tenta o proximo host candidato.
    }
  }

  if (lastError?.name === "AbortError") {
    throw new ApiError("A API demorou demais para responder.");
  }

  throw new ApiError(
    "Não foi possível conectar à API. Verifique sua internet e o endereço configurado.",
    0,
    lastError,
  );
}

const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "POST", data }),
  put: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "PUT", data }),
  patch: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "PATCH", data }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

export default api;
