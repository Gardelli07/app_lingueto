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

// No Android nao existe id_transacao: quem identifica a compra e o
// purchaseToken, que o backend consulta na Google Play Developer API.
export function validarCompraAndroid(compra) {
  return api.post("/assinaturas/validar-compra", {
    plataforma: "android",
    token_compra: compra.purchaseToken,
    id_produto: compra.productId,
  });
}

function validarCompra(compra) {
  return Platform.OS === "android"
    ? validarCompraAndroid(compra)
    : validarCompraApple(compra);
}

// Registra no backend uma compra da loja e devolve o acesso resultante:
// { acessoCompleto, assinatura }. O 201 do validar-compra NAO significa
// acesso — a loja pode devolver a compra como expirada/revogada — entao o
// acesso vem do /assinaturas/minha logo em seguida. Se so essa segunda
// chamada falhar, cai no status da propria assinatura validada, pra nao
// tratar como erro uma compra que o backend ja aceitou.
export async function registrarCompra(compra) {
  const assinatura = await validarCompra(compra);
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
// ativa mais recente que a loja conhece para a conta do aparelho (Apple ID ou
// conta do Google). Devolve null se nao houver nenhuma. Tambem serve de
// "tentar de novo" pra uma compra que ficou sem validar por falha de rede.
export async function restaurarCompras() {
  const [maisRecente] = await buscarAssinaturasAtivas({ sincronizar: true });
  if (!maisRecente) return null;

  const resultado = await registrarCompra(maisRecente);
  await finalizarTransacao(maisRecente).catch(() => {});
  return resultado;
}
