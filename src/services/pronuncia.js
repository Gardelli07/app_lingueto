import api from "./api";

// Feedback instantaneo do Pronunciation Lab. O backend (/pronuncia) confere o
// Premium, conta os feedbacks do dia e chama o SpeechAce com a chave que so ele
// tem; o app nunca fala direto com o SpeechAce.

// O SpeechAce costuma levar alguns segundos; o backend desiste em 25s.
const TIMEOUT_AVALIACAO = 30000;

function ensureFileScheme(uri) {
  if (!uri || uri.includes("://")) return uri;
  return `file://${uri}`;
}

// Apostrofo curvo (it’s) vira o reto, que e o que o dicionario do SpeechAce conhece.
const normalizarTexto = (texto) => String(texto || "").replace(/[’‘]/g, "'").trim();

// tipo: "palavra" | "frase"; foco: fonemas da aula em ARPAbet ("th", "dh").
// Resposta: { nota, titulo, dica, cefr, palavras: [{ palavra, nota }],
//   foco: { fonema, palavra, nota, soou_como } | null,
//   cota: { limite, usadas, restantes, premium } }
// Erros (ApiError): data.detalhes.motivo = premium | cota_esgotada | sem_fala |
//   nao_entendeu | audio_longo | audio_invalido | indisponivel.
export function avaliarPronuncia(uri, { tipo, texto, foco }) {
  const formData = new FormData();
  formData.append("audio", {
    uri: ensureFileScheme(uri),
    name: `pronuncia-${Date.now()}.m4a`,
    type: "audio/m4a",
  });
  formData.append("tipo", tipo);
  formData.append("texto", normalizarTexto(texto));
  if (foco) formData.append("foco", foco);
  // Sem failover: repetir em outro host gastaria o feedback do dia de novo.
  return api.post("/pronuncia/avaliar", formData, { timeout: TIMEOUT_AVALIACAO, failover: false });
}

// { limite, usadas, restantes, premium }
export function buscarCotaPronuncia() {
  return api.get("/pronuncia/cota");
}

export function motivoDoErro(error) {
  return error?.data?.detalhes?.motivo || null;
}
