import { Platform } from "react-native";

// IDs cadastrados no App Store Connect (grupo "Lingueto Premium") e mapeados
// para o plano "base" no backend (banco/PRODUTOS_LOJA_APPLE.sql, no
// api_lingueto). Preco, nome e oferta do 1o ano vem do catalogo da loja
// (buscarProdutos), nunca daqui.
export const PRODUTO_MENSAL = "com.shironora.lingueto.mensal";
export const PRODUTO_ANUAL = "com.shironora.lingueto.anual";
export const PRODUTOS_ASSINATURA = [PRODUTO_MENSAL, PRODUTO_ANUAL];

// Por enquanto so iOS: a Play Store ainda nao tem produtos cadastrados.
export const COMPRA_SUPORTADA = Platform.OS === "ios";

export class CompraError extends Error {
  // code: "indisponivel" | "cancelada" | "pendente" | "loja"
  constructor(message, code, causa = null) {
    super(message);
    this.name = "CompraError";
    this.code = code;
    this.causa = causa;
  }
}

// O expo-iap so e carregado sob demanda: o modulo nativo nao existe no Expo
// Go, na web nem em builds de dev client gerados antes da lib entrar no
// projeto, e um import no topo derrubaria o app nesses casos.
let iapModule;
function iap() {
  if (iapModule === undefined) {
    try {
      iapModule = COMPRA_SUPORTADA ? require("expo-iap") : null;
    } catch {
      iapModule = null;
    }
  }
  if (!iapModule) {
    throw new CompraError(
      "As compras não estão disponíveis nesta versão do app.",
      "indisponivel",
    );
  }
  return iapModule;
}

function paraCompraError(error) {
  if (error instanceof CompraError) return error;

  const code = error?.code;
  if (iapModule?.isUserCancelledError?.(error) || code === "user-cancelled") {
    return new CompraError("Compra cancelada.", "cancelada", error);
  }
  if (code === "deferred-payment" || code === "pending") {
    return new CompraError(
      "Sua compra está aguardando aprovação. Assim que for aprovada, o acesso é liberado automaticamente.",
      "pendente",
      error,
    );
  }
  return new CompraError(
    "Não foi possível concluir a operação na App Store. Tente novamente.",
    "loja",
    error,
  );
}

let conexao = null;

export function conectar() {
  if (!conexao) {
    conexao = Promise.resolve()
      .then(() => iap().initConnection())
      .catch((error) => {
        conexao = null;
        if (error instanceof CompraError) throw error;
        throw new CompraError(
          "Não foi possível conectar à App Store. Tente novamente mais tarde.",
          "indisponivel",
          error,
        );
      });
  }
  return conexao;
}

export async function buscarProdutos() {
  const lib = iap();
  await conectar();
  try {
    return (
      (await lib.fetchProducts({ skus: PRODUTOS_ASSINATURA, type: "subs" })) ??
      []
    );
  } catch (error) {
    throw paraCompraError(error);
  }
}

// A oferta do 1o ano so vale pra quem nunca assinou nada do grupo. Sem essa
// checagem o paywall mostraria um preco que a folha da App Store nao cobra.
// Na duvida (erro, produto sem grupo), responde que nao tem direito.
export async function elegivelOfertaIntrodutoria(produto) {
  const grupo = produto?.subscriptionGroupIdIOS;
  if (!grupo) return false;
  try {
    return !!(await iap().isEligibleForIntroOfferIOS(grupo));
  } catch {
    return false;
  }
}

// Compra iniciada por comprar(), esperando o observador terminar de
// processa-la: { sku, resolve, reject }.
let compraEmAndamento = null;
let observando = false;

function encerrarCompraEmAndamento() {
  const aguardando = compraEmAndamento;
  compraEmAndamento = null;
  return aguardando;
}

// Toda transacao que o StoreKit entrega passa por aqui: a compra feita agora
// no paywall, renovacoes com o app aberto, compras "Pedir para comprar"
// aprovadas depois e compras que ficaram sem finalizar numa sessao anterior
// (o iOS reentrega essas ao conectar). A transacao so e finalizada DEPOIS que
// `processar` (validacao no backend) termina sem erro: se o backend falhar,
// ela continua pendente e o iOS entrega de novo, entao ninguem fica "pago sem
// acesso". Deve rodar so com usuario logado, porque `processar` vincula a
// compra a conta atual. Devolve a funcao que para de observar.
export function observarCompras(processar) {
  const lib = iap();

  const escutaCompra = lib.purchaseUpdatedListener(async (compra) => {
    const aguardando =
      compraEmAndamento?.sku === compra.productId
        ? encerrarCompraEmAndamento()
        : null;

    let resultado;
    try {
      resultado = await processar(compra);
    } catch (error) {
      aguardando?.reject(error);
      return;
    }

    try {
      await lib.finishTransaction({ purchase: compra, isConsumable: false });
    } catch {
      // O backend ja registrou a compra; se finalizar falhar, o iOS so
      // reentrega a transacao e a validacao (idempotente) roda de novo.
    }
    aguardando?.resolve(resultado);
  });

  const escutaErro = lib.purchaseErrorListener((error) => {
    encerrarCompraEmAndamento()?.reject(paraCompraError(error));
  });

  observando = true;
  // Os listeners precisam existir antes de conectar, senao as transacoes
  // pendentes reentregues na conexao se perdem.
  conectar().catch(() => {});

  return () => {
    observando = false;
    escutaCompra.remove();
    escutaErro.remove();
    encerrarCompraEmAndamento()?.reject(
      new CompraError("Compra interrompida.", "loja"),
    );
  };
}

// Abre a folha de compra da App Store e resolve com o que `processar` (de
// observarCompras) devolveu para essa compra. Cancelamento e "Pedir para
// comprar" rejeitam com CompraError code "cancelada" / "pendente".
export async function comprar(sku) {
  const lib = iap();
  if (!observando) {
    throw new CompraError(
      "Entre na sua conta para assinar.",
      "indisponivel",
    );
  }
  if (compraEmAndamento) {
    throw new CompraError("Já existe uma compra em andamento.", "loja");
  }
  await conectar();

  const resultado = new Promise((resolve, reject) => {
    compraEmAndamento = { sku, resolve, reject };
  });

  try {
    // SEGURANCA (pendente, proxima rodada): sem appAccountToken, o backend
    // nao sabe a qual conta a compra pertence, entao "Restaurar compras"
    // logado em outra conta libera o acesso nela tambem — uma assinatura
    // paga pode liberar N contas. Corrigir junto com o api_lingueto.
    const retorno = await lib.requestPurchase({
      request: { apple: { sku } },
      type: "subs",
    });
    // Compra aprovada chega pelo listener antes desse retorno. Sem compra no
    // retorno, nada vai chegar: nao deixa o paywall esperando pra sempre.
    const semCompra = !retorno || (Array.isArray(retorno) && !retorno.length);
    if (semCompra && compraEmAndamento?.sku === sku) {
      encerrarCompraEmAndamento().reject(
        new CompraError(
          "Não foi possível concluir a compra na App Store. Tente novamente.",
          "loja",
        ),
      );
    }
  } catch (error) {
    if (compraEmAndamento?.sku === sku) {
      encerrarCompraEmAndamento().reject(paraCompraError(error));
    }
  }

  return resultado;
}

// Assinaturas do Lingueto ativas no Apple ID do aparelho, da mais recente pra
// mais antiga. Com `sincronizar`, forca uma sincronizacao com a App Store
// antes (usado no "Restaurar compras"; pode pedir login do Apple ID).
export async function buscarAssinaturasAtivas({ sincronizar = false } = {}) {
  const lib = iap();
  await conectar();
  try {
    if (sincronizar) await lib.restorePurchases();
    const compras = await lib.getAvailablePurchases({
      onlyIncludeActiveItemsIOS: true,
    });
    return (compras ?? [])
      .filter((compra) => PRODUTOS_ASSINATURA.includes(compra.productId))
      .sort((a, b) => (b.transactionDate ?? 0) - (a.transactionDate ?? 0));
  } catch (error) {
    throw paraCompraError(error);
  }
}

export async function finalizarTransacao(compra) {
  await iap().finishTransaction({ purchase: compra, isConsumable: false });
}

// Tela de assinaturas do iOS (cancelar, trocar de plano). A Apple nao deixa
// o app cancelar a assinatura por conta propria. A folha nativa do StoreKit
// mostra a conta que fez a compra (inclusive a do sandbox); o link da App
// Store fica de plano B porque sempre abre a Conta Apple principal do aparelho.
export async function abrirGerenciarAssinaturas() {
  try {
    await iap().showManageSubscriptionsIOS();
  } catch (erroFolha) {
    if (__DEV__) console.warn("[iap] folha de assinaturas falhou, abrindo a App Store:", erroFolha);
    try {
      await iap().deepLinkToSubscriptions();
    } catch (error) {
      throw paraCompraError(error);
    }
  }
}
