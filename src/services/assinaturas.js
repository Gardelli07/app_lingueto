import { Platform } from "react-native";
import api from "./api";
import { buscarAssinaturasAtivas, finalizarTransacao } from "./iap";

// Acesso do usuario logado, calculado pelo backend com a mesma regra que
// protege GET /conteudos/:id (assinatura ativa, contrato corporativo ou
// permissao manual). Resposta: { acesso_completo, assinatura }, onde
// `assinatura` e o registro mais recente de QUALQUER status (pode vir
// "expirada" com acesso_completo true, por outra via) — serve so pra exibir,
// quem decide o acesso e `acesso_completo`.
export function buscarMinhaAssinatura() {
  return api.get("/assinaturas/minha");
}

// No iOS quem valida a compra e o id_transacao: o backend consulta a App
// Store Server API direto com ele. O token_compra (JWS da transacao, alguns
// milhares de caracteres) so fica guardado pra auditoria, e o backend aceita
// no maximo 10.000 — acima disso vai o proprio id da transacao.
const TOKEN_COMPRA_MAX = 10000;

export function validarCompraApple(compra) {
  const idTransacao = compra.transactionId || compra.id;
  const jws = compra.purchaseToken;

  return api.post("/assinaturas/validar-compra", {
    plataforma: "ios",
    id_transacao: idTransacao,
    token_compra: jws && jws.length <= TOKEN_COMPRA_MAX ? jws : idTransacao,
    id_produto: compra.productId,
  });
}

// Registra no backend uma transacao do StoreKit e devolve o acesso resultante:
// { acessoCompleto, assinatura }. O 201 do validar-compra NAO significa
// acesso — a Apple pode devolver a transacao como expirada/revogada — entao o
// acesso vem do /assinaturas/minha logo em seguida. Se so essa segunda
// chamada falhar, cai no status da propria assinatura validada, pra nao
// tratar como erro uma compra que o backend ja aceitou.
export async function registrarCompraApple(compra) {
  const assinatura = await validarCompraApple(compra);
  const resumo = await buscarMinhaAssinatura().catch(() => null);

  if (resumo) {
    return {
      acessoCompleto: !!resumo.acesso_completo,
      assinatura: resumo.assinatura ?? assinatura,
    };
  }
  return { acessoCompleto: assinatura?.status === "ativa", assinatura };
}

// "Restaurar compras" (exigido pela Apple): reenvia pro backend a assinatura
// ativa mais recente que a App Store conhece para este Apple ID. Devolve null
// se nao houver nenhuma. Tambem serve de "tentar de novo" pra uma compra que
// ficou sem validar por falha de rede.
export async function restaurarComprasApple() {
  const [maisRecente] = await buscarAssinaturasAtivas({ sincronizar: true });
  if (!maisRecente) return null;

  const resultado = await registrarCompraApple(maisRecente);
  await finalizarTransacao(maisRecente).catch(() => {});
  return resultado;
}

// TEMPORARIO: ainda usado pelo PaywallScreen ate ele passar a comprar pelo
// StoreKit (services/iap.js). So funciona com o backend em
// MODO_SANDBOX_COMPRAS=true — em producao a Apple rejeita esses ids falsos.
function idSandbox() {
  return `sandbox-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function validarCompraSandbox() {
  const plataforma = Platform.OS === "ios" ? "ios" : "android";

  return api.post("/assinaturas/validar-compra", {
    plataforma,
    token_compra: idSandbox(),
    id_produto: `sandbox_base_${plataforma}`,
    ...(plataforma === "ios" ? { id_transacao: idSandbox() } : {}),
  });
}
