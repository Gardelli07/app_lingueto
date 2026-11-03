import api, { ApiError } from "./api";

// Nome do chat que o aluno ve. O backend tem o mesmo nome em professor.prompt.ts
// (e como a IA se apresenta); o card da Home escreve em duas linhas com o "IA"
// em destaque.
export const NOME_PROFESSOR = "Professor Lingueto IA";

// Limites do lado do app so pra nao mandar lixo; quem valida de verdade e o
// backend, que tambem guarda a instrucao de sistema e a chave do Gemini.
export const LIMITE_MENSAGEM = 1000;
const MAX_HISTORICO = 10;

// A resposta do Gemini costuma levar alguns segundos a mais que o resto da API
// (o backend desiste em 25s).
const TIMEOUT_CHAT = 30000;

export async function enviarMensagemProfessor({ mensagem, historico = [] }) {
  const resposta = await api.post(
    "/professor/chat",
    {
      mensagem,
      historico: historico
        .slice(-MAX_HISTORICO)
        .map(({ autor, texto }) => ({ autor, texto })),
    },
    // Host atual ja foi achado pelas chamadas da Home; sem failover o timeout
    // vale inteiro e a pergunta nao e reenviada a outro host.
    { timeout: TIMEOUT_CHAT, failover: false },
  );

  const texto = resposta?.resposta;
  if (typeof texto !== "string" || !texto.trim()) {
    throw new ApiError("O Professor não conseguiu responder agora.", 502);
  }
  return { resposta: texto.trim(), tempo: resposta?.tempo ?? null };
}

// { limite_segundos, iniciado_em, expira_em, agora }: expira_em fica null
// enquanto o aluno nao mandou a primeira mensagem do dia.
export function buscarTempoProfessor() {
  return api.get("/professor/tempo");
}

// O servidor manda a hora dele junto: o relogio do celular pode estar
// adiantado ou atrasado, e quem decide o fim do tempo e o servidor. Devolve o
// fim no relogio do aparelho, ou null se o tempo de hoje ainda nao comecou.
export function expiracaoNoAparelho(tempo) {
  if (!tempo?.expira_em) return null;
  return Date.parse(tempo.expira_em) - (Date.parse(tempo.agora) - Date.now());
}

export function formatarTempo(ms) {
  const segundos = Math.ceil(ms / 1000);
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, "0")}`;
}

// So pra teste: zera o tempo do dia. O backend so aceita com
// PROFESSOR_RESET_TESTE=true.
export function resetarTempoProfessor() {
  return api.delete("/professor/tempo");
}
