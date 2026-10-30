import api from "./api";
import { XP_BONUS_MAX } from "../util/xp";

export function concluirAula(conteudoId, acuracia, xpBonus = 0) {
  return api.post("/progresso/concluir-aula", {
    conteudo_id: String(conteudoId),
    acuracia: Math.max(0, Math.min(100, Math.round(acuracia))),
    ...(xpBonus > 0 ? { xp_bonus: Math.min(XP_BONUS_MAX, Math.round(xpBonus)) } : {}),
  });
}

// Gasta XP para refazer uma pergunta errada no fim da aula. O preco e
// definido pela API; responde { custo, xp_total }.
export function comprarSegundaChance(conteudoId) {
  return api.post(
    "/progresso/segunda-chance",
    conteudoId != null ? { conteudo_id: String(conteudoId) } : {},
  );
}

export async function fetchAulasConcluidas() {
  const resposta = await api.get("/progresso/aulas-concluidas");
  return resposta?.conteudo_ids || [];
}

export async function fetchResumoProgresso() {
  const resposta = await api.get("/progresso/resumo");
  return {
    streakAtual: resposta?.sequencia?.sequencia_atual ?? 0,
    melhorStreak: resposta?.sequencia?.melhor_sequencia ?? 0,
    xpTotal: resposta?.xp_total ?? 0,
  };
}

export function resetarProgresso() {
  return api.delete("/progresso/resetar");
}
