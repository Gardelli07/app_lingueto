import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearTokens, setOnAuthFailure, setOnSessionRenewed } from "../services/api";
import {
  buscarMinhaAssinatura,
  registrarCompra,
  restaurarCompras as restaurarComprasDaLoja,
} from "../services/assinaturas";
import {
  COMPRA_SUPORTADA,
  lojaDaAssinatura,
  observarCompras,
} from "../services/iap";
import { setActiveUser } from "../util/userScope";
import { PLAN_FREE, PLAN_FULL_ACCESS } from "../util/plans";
import { useThemeMode } from "../theme";

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "@lingueto:user";

export function AuthProvider({ children }) {
  const { aplicarTemaDoAparelho } = useThemeMode();
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE_KEY)
      .then((raw) => {
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed) setUser(parsed);
        setActiveUser(parsed);
      })
      .catch(() => {
        setActiveUser(null);
      })
      .finally(() => setCarregando(false));
  }, []);

  function signIn(userData) {
    setUser(userData);
    setActiveUser(userData);
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    // O login e o unico momento em que o app olha o tema do aparelho e ja
    // deixa o app claro ou escuro de acordo. Depois disso, so o switch de
    // "Modo escuro" no Perfil muda (ver src/theme/ThemeContext.js).
    aplicarTemaDoAparelho();
  }

  function updateUser(dadosParciais) {
    setUser((prev) => {
      const next = { ...prev, ...dadosParciais };
      setActiveUser(next);
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function signOut() {
    setUser(null);
    setActiveUser(null);
    AsyncStorage.removeItem(USER_STORAGE_KEY);
    clearTokens();
  }

  // Registra o signOut para que api.js possa deslogar o usuario quando o
  // access_token expirar e o refresh_token tambem falhar (expirado/revogado).
  useEffect(() => {
    setOnAuthFailure(signOut);
    // A cada renovacao de sessao o backend devolve o usuario de novo, com a
    // foto_url reassinada. Sem isso a copia guardada no aparelho envelheceria
    // ate a assinatura da url vencer e o avatar parar de carregar.
    setOnSessionRenewed((usuario) => {
      setUser((prev) => {
        if (!prev || String(prev.id) !== String(usuario?.id)) return prev;
        const next = { ...prev, ...usuario };
        setActiveUser(next);
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    });
  }, []);

  const idUsuario = user?.id ?? null;

  // O plano vem sempre do backend (acesso_completo de /assinaturas/minha:
  // assinatura, contrato corporativo ou permissao manual) e fica salvo junto
  // com o usuario, pra o app abrir offline com o ultimo acesso conhecido.
  // Resposta que chega depois de trocar de conta ou sair e descartada.
  // `loja_assinatura` ("ios" | "android" | null) e onde a pessoa assinou, que
  // pode nao ser o aparelho atual: decide pra qual loja o Perfil manda no
  // "Gerenciar assinatura".
  const aplicarAcesso = useCallback((idDono, acessoCompleto, assinatura) => {
    setUser((prev) => {
      if (!prev || prev.id !== idDono) return prev;
      const next = {
        ...prev,
        plano: acessoCompleto ? PLAN_FULL_ACCESS : PLAN_FREE,
        loja_assinatura: lojaDaAssinatura(assinatura),
      };
      setActiveUser(next);
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    if (!idUsuario) return;
    buscarMinhaAssinatura()
      .then((resumo) =>
        aplicarAcesso(idUsuario, !!resumo?.acesso_completo, resumo?.assinatura),
      )
      .catch(() => {});
  }, [idUsuario, aplicarAcesso]);

  // Toda transacao da loja (compra do paywall, renovacao, compra que
  // ficou pendente em outra sessao) e validada no backend e so entao libera o
  // acesso. Roda so com usuario logado, porque a validacao vincula a compra a
  // conta atual.
  useEffect(() => {
    if (!idUsuario || !COMPRA_SUPORTADA) return undefined;
    try {
      return observarCompras(async (compra) => {
        const resultado = await registrarCompra(compra);
        aplicarAcesso(idUsuario, resultado.acessoCompleto, resultado.assinatura);
        return resultado;
      });
    } catch {
      // Build sem o modulo nativo do expo-iap: sem compra, o resto do app segue.
      return undefined;
    }
  }, [idUsuario, aplicarAcesso]);

  // "Restaurar compras" (exigido pela Apple). Devolve null se a conta da loja
  // (Apple ID ou conta do Google) nao tiver assinatura ativa do Lingueto.
  async function restaurarCompras() {
    const resultado = await restaurarComprasDaLoja();
    if (resultado) {
      aplicarAcesso(idUsuario, resultado.acessoCompleto, resultado.assinatura);
    }
    return resultado;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        carregando,
        signIn,
        updateUser,
        signOut,
        restaurarCompras,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
