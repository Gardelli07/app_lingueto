import { Linking, Platform } from "react-native";

const ANDROID = Platform.OS === "android";

// IDs cadastrados no App Store Connect (grupo "Lingueto Premium") e mapeados
// para o plano "base" no backend (banco/PRODUTOS_LOJA_APPLE.sql, no
// api_lingueto). Preco, nome e oferta do 1o ano vem do catalogo da loja
// (buscarPlanos), nunca daqui.
export const PRODUTO_MENSAL = "com.shironora.lingueto.mensal";
export const PRODUTO_ANUAL = "com.shironora.lingueto.anual";
export const PRODUTOS_ASSINATURA = [PRODUTO_MENSAL, PRODUTO_ANUAL];

// No Google Play e o contrario da Apple: um produto so ("premium"), com
// mensal e anual como base plans dentro dele. Cada oferta (base plan puro ou
// a oferta "primeiro-ano" do anual) tem um offerToken, e e ele que a compra
// precisa receber, nao so o produto.
export const PRODUTO_ANDROID = "premium";
const PACOTE_ANDROID = "com.shironora.lingueto";
const BASE_PLAN_MENSAL = "mensal";
const BASE_PLAN_ANUAL = "anual";
const OFERTA_PRIMEIRO_ANO = "primeiro-ano";

const PRODUTOS_DA_PLATAFORMA = ANDROID
  ? [PRODUTO_ANDROID]
  : PRODUTOS_ASSINATURA;

export const COMPRA_SUPORTADA = Platform.OS === "ios" || ANDROID;

// Textos de cada loja, pela `plataforma` do backend ("ios" | "android").
export const LOJAS = {
  android: {
    nome: "Google Play",
    na: "no Google Play",
    a: "ao Google Play",
    com: "com o Google Play",
    nestaConta: "nesta conta do Google",
    mesmaConta: "a mesma conta do Google",
    caminhoAssinaturas:
      "Google Play > foto do perfil > Pagamentos e assinaturas > Assinaturas",
  },
  ios: {
    nome: "App Store",
    na: "na App Store",
    a: "à App Store",
    com: "com a App Store",
    nestaConta: "neste Apple ID",
    mesmaConta: "o mesmo Apple ID",
    caminhoAssinaturas: "Ajustes > [seu nome] > Assinaturas",
  },
};

// Loja do aparelho atual: e onde uma compra nova acontece.
export const LOJA = ANDROID ? LOJAS.android : LOJAS.ios;

// Status em que a assinatura ainda e da loja: dela vem o acesso (ou viria,
// no caso de "pagamento_pendente"), e e la que se cancela ou reativa.
// "cancelada" continua dando acesso ate o fim do periodo ja pago.
const STATUS_GERENCIAVEIS = ["ativa", "teste", "pagamento_pendente", "cancelada"];

// Loja onde a pessoa realmente assinou ("ios" | "android"), a partir da
// `assinatura` de /assinaturas/minha — que pode ser de outro aparelho.
// null quando nao ha loja pra gerenciar: sem assinatura, contrato
// corporativo ou assinatura de loja ja expirada/revogada (acesso por outra via).
export function lojaDaAssinatura(assinatura) {
  const plataforma = assinatura?.plataforma;
  if (!LOJAS[plataforma]) return null;
  return STATUS_GERENCIAVEIS.includes(assinatura.status) ? plataforma : null;
}

const URL_ASSINATURAS_GOOGLE_PLAY = `https://play.google.com/store/account/subscriptions?sku=${PRODUTO_ANDROID}&package=${PACOTE_ANDROID}`;

// A Apple so deixa gerenciar assinatura num aparelho Apple: uma assinatura
// da App Store nao abre a partir do Android.
export function podeAbrirGerenciamento(plataforma) {
  return plataforma === "android" || Platform.OS === "ios";
}

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

function erroPendente(causa = null) {
  return new CompraError(
    "Sua compra está aguardando aprovação. Assim que for aprovada, o acesso é liberado automaticamente.",
    "pendente",
    causa,
  );
}

function paraCompraError(error) {
  if (error instanceof CompraError) return error;

  const code = error?.code;
  if (iapModule?.isUserCancelledError?.(error) || code === "user-cancelled") {
    return new CompraError("Compra cancelada.", "cancelada", error);
  }
  if (code === "deferred-payment" || code === "pending") {
    return erroPendente(error);
  }
  return new CompraError(
    `Não foi possível concluir a operação ${LOJA.na}. Tente novamente.`,
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
          `Não foi possível conectar ${LOJA.a}. Tente novamente mais tarde.`,
          "indisponivel",
          error,
        );
      });
  }
  return conexao;
}

// Catalogo do paywall no mesmo formato nas duas lojas:
//   { mensal: Plano | null, anual: Plano | null }
//   Plano = { preco, ofertaPrimeiroAno: { preco, descontoPct } | null, compra }
// `preco` e o preco cheio ja formatado pela loja. `ofertaPrimeiroAno` so vem
// quando o usuario tem direito a ela. `compra` e o que comprar() recebe.
export async function buscarPlanos() {
  const lib = iap();
  await conectar();
  let produtos;
  try {
    produtos =
      (await lib.fetchProducts({ skus: PRODUTOS_DA_PLATAFORMA, type: "subs" })) ??
      [];
  } catch (error) {
    throw paraCompraError(error);
  }
  return ANDROID ? planosAndroid(produtos) : planosIOS(produtos);
}

function descontoPct(valor, cheio) {
  return valor > 0 && cheio > valor
    ? Math.round((1 - valor / cheio) * 100)
    : null;
}

async function planosIOS(produtos) {
  const porId = Object.fromEntries(produtos.map((p) => [p.id, p]));
  const mensal = porId[PRODUTO_MENSAL];
  const anual = porId[PRODUTO_ANUAL];
  const elegivel = anual ? await elegivelOfertaIntrodutoriaIOS(anual) : false;

  const plano = (produto, oferta) =>
    produto
      ? {
          preco: produto.displayPrice,
          ofertaPrimeiroAno: oferta,
          compra: { sku: produto.id },
        }
      : null;

  return {
    mensal: plano(mensal, null),
    anual: plano(anual, elegivel ? ofertaDoPrimeiroAnoIOS(anual) : null),
  };
}

// Oferta do anual configurada na App Store: 1 ano pago adiantado com desconto.
// Qualquer outro formato cai no preco cheio, que e o que a folha cobra.
function ofertaDoPrimeiroAnoIOS(produto) {
  const umAnoAdiantado =
    produto.introductoryPricePaymentModeIOS === "pay-up-front" &&
    produto.introductoryPriceSubscriptionPeriodIOS === "year" &&
    Number(produto.introductoryPriceNumberOfPeriodsIOS) === 1;
  if (!umAnoAdiantado || !produto.introductoryPriceIOS) return null;

  return {
    preco: produto.introductoryPriceIOS,
    descontoPct: descontoPct(
      Number(produto.introductoryPriceAsAmountIOS),
      Number(produto.price),
    ),
  };
}

// A oferta do 1o ano so vale pra quem nunca assinou nada do grupo. Sem essa
// checagem o paywall mostraria um preco que a folha da App Store nao cobra.
// Na duvida (erro, produto sem grupo), responde que nao tem direito.
async function elegivelOfertaIntrodutoriaIOS(produto) {
  const grupo = produto?.subscriptionGroupIdIOS;
  if (!grupo) return false;
  try {
    return !!(await iap().isEligibleForIntroOfferIOS(grupo));
  } catch {
    return false;
  }
}

// recurrenceMode da Billing Library: 1 = repete ate cancelar (preco cheio),
// 2 = numero fixo de ciclos (oferta).
const RECORRENCIA_INFINITA = 1;
const RECORRENCIA_FINITA = 2;

function fasesAndroid(oferta) {
  return oferta?.pricingPhasesAndroid?.pricingPhaseList ?? [];
}

function planosAndroid(produtos) {
  const produto = produtos.find((p) => p.id === PRODUTO_ANDROID);
  const ofertas = (produto?.subscriptionOffers ?? []).filter(
    (o) => o.offerTokenAndroid,
  );

  // O base plan puro e a oferta sem offerId: a lib (openiap-google) preenche
  // o id com o proprio basePlanId nesse caso.
  const basePlan = (id) =>
    ofertas.find((o) => o.basePlanIdAndroid === id && o.id === id) ?? null;

  const plano = (id) => {
    const base = basePlan(id);
    const fases = fasesAndroid(base);
    const fase = fases[fases.length - 1];
    if (!fase) return null;
    return {
      preco: fase.formattedPrice,
      ofertaPrimeiroAno: null,
      compra: {
        sku: PRODUTO_ANDROID,
        offerToken: base.offerTokenAndroid,
        basePlanId: id,
      },
    };
  };

  const mensal = plano(BASE_PLAN_MENSAL);
  const anual = plano(BASE_PLAN_ANUAL);

  // No Android nao existe checagem de elegibilidade separada: o Google so
  // devolve a oferta "primeiro-ano" pra quem tem direito a ela.
  const oferta = ofertas.find(
    (o) => o.basePlanIdAndroid === BASE_PLAN_ANUAL && o.id === OFERTA_PRIMEIRO_ANO,
  );
  const fases = fasesAndroid(oferta);
  const primeiroAno = fases.find(
    (f) =>
      f.recurrenceMode === RECORRENCIA_FINITA &&
      f.billingPeriod === "P1Y" &&
      Number(f.billingCycleCount) === 1,
  );
  const cheio = fases.find((f) => f.recurrenceMode === RECORRENCIA_INFINITA);
  if (anual && primeiroAno && cheio) {
    anual.ofertaPrimeiroAno = {
      preco: primeiroAno.formattedPrice,
      descontoPct: descontoPct(
        Number(primeiroAno.priceAmountMicros),
        Number(cheio.priceAmountMicros),
      ),
    };
    anual.compra = { ...anual.compra, offerToken: oferta.offerTokenAndroid };
  }

  return { mensal, anual };
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

// No Android a compra pode chegar ainda sem pagamento (boleto, por exemplo).
// Ela nao pode ser validada nem confirmada antes de virar "purchased": o
// Google entrega de novo quando o pagamento cair.
function compraPendenteAndroid(compra) {
  return ANDROID && compra.purchaseState === "pending";
}

// Toda transacao que a loja entrega passa por aqui: a compra feita agora no
// paywall, renovacoes com o app aberto, compras "Pedir para comprar" (iOS) ou
// com pagamento pendente (Android) aprovadas depois e compras que ficaram sem
// finalizar numa sessao anterior. A transacao so e finalizada DEPOIS que
// `processar` (validacao no backend) termina sem erro: se o backend falhar,
// ela continua pendente e e reprocessada, entao ninguem fica "pago sem
// acesso". Deve rodar so com usuario logado, porque `processar` vincula a
// compra a conta atual. Devolve a funcao que para de observar.
export function observarCompras(processar) {
  const lib = iap();

  async function tratarCompra(compra) {
    const aguardando =
      compraEmAndamento?.sku === compra.productId
        ? encerrarCompraEmAndamento()
        : null;

    if (compraPendenteAndroid(compra)) {
      aguardando?.reject(erroPendente());
      return;
    }

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
      // O backend ja registrou a compra; se finalizar falhar, a transacao e
      // reentregue e a validacao (idempotente) roda de novo.
    }
    aguardando?.resolve(resultado);
  }

  const escutaCompra = lib.purchaseUpdatedListener(tratarCompra);

  const escutaErro = lib.purchaseErrorListener((error) => {
    encerrarCompraEmAndamento()?.reject(paraCompraError(error));
  });

  observando = true;
  // Os listeners precisam existir antes de conectar, senao as transacoes
  // pendentes reentregues na conexao (iOS) se perdem.
  conectar()
    .then(() => (ANDROID ? reprocessarNaoConfirmadasAndroid(tratarCompra) : null))
    .catch(() => {});

  return () => {
    observando = false;
    escutaCompra.remove();
    escutaErro.remove();
    encerrarCompraEmAndamento()?.reject(
      new CompraError("Compra interrompida.", "loja"),
    );
  };
}

// Diferente do iOS, o Google Play nao reentrega ao conectar uma compra que
// ficou sem confirmar (backend fora do ar, app fechado no meio). Se ninguem
// confirmar em 3 dias, o Google reembolsa e cancela sozinho — entao cada
// abertura do app busca essas compras e passa pelo mesmo fluxo.
async function reprocessarNaoConfirmadasAndroid(tratarCompra) {
  const compras = await iap().getAvailablePurchases();
  for (const compra of compras ?? []) {
    if (
      compra.productId === PRODUTO_ANDROID &&
      compra.purchaseState === "purchased" &&
      !compra.isAcknowledgedAndroid
    ) {
      await tratarCompra(compra);
    }
  }
}

function pedidoDeCompra({ sku, offerToken }) {
  if (ANDROID) {
    return {
      // SEGURANCA (pendente, proxima rodada): sem obfuscatedAccountId, o
      // backend nao sabe a qual conta a compra pertence (mesmo problema do
      // appAccountToken no iOS, abaixo).
      google: {
        skus: [sku],
        subscriptionOffers: [{ sku, offerToken }],
      },
    };
  }
  // SEGURANCA (pendente, proxima rodada): sem appAccountToken, o backend
  // nao sabe a qual conta a compra pertence, entao "Restaurar compras"
  // logado em outra conta libera o acesso nela tambem — uma assinatura
  // paga pode liberar N contas. Corrigir junto com o api_lingueto.
  return { apple: { sku } };
}

// Abre a folha de compra da loja e resolve com o que `processar` (de
// observarCompras) devolveu para essa compra. `compra` e o `compra` de um
// plano de buscarPlanos(). Cancelamento e pagamento pendente rejeitam com
// CompraError code "cancelada" / "pendente".
export async function comprar(compra) {
  const lib = iap();
  const { sku } = compra ?? {};
  if (!observando) {
    throw new CompraError(
      "Entre na sua conta para assinar.",
      "indisponivel",
    );
  }
  if (compraEmAndamento) {
    throw new CompraError("Já existe uma compra em andamento.", "loja");
  }
  if (!sku || (ANDROID && !compra.offerToken)) {
    throw new CompraError(
      `Não foi possível concluir a compra ${LOJA.na}. Tente novamente.`,
      "loja",
    );
  }
  await conectar();

  const resultado = new Promise((resolve, reject) => {
    compraEmAndamento = { sku, resolve, reject };
  });

  try {
    const retorno = await lib.requestPurchase({
      request: pedidoDeCompra(compra),
      type: "subs",
    });
    // Compra aprovada chega pelo listener antes desse retorno. Sem compra no
    // retorno, nada vai chegar: nao deixa o paywall esperando pra sempre.
    const semCompra = !retorno || (Array.isArray(retorno) && !retorno.length);
    if (semCompra && compraEmAndamento?.sku === sku) {
      encerrarCompraEmAndamento().reject(
        new CompraError(
          `Não foi possível concluir a compra ${LOJA.na}. Tente novamente.`,
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

// Assinaturas do Lingueto ativas na conta da loja do aparelho (Apple ID ou
// conta do Google), da mais recente pra mais antiga. Com `sincronizar`, forca
// uma sincronizacao com a loja antes (usado no "Restaurar compras"; no iOS
// pode pedir login do Apple ID).
export async function buscarAssinaturasAtivas({ sincronizar = false } = {}) {
  const lib = iap();
  await conectar();
  try {
    if (sincronizar) await lib.restorePurchases();
    const compras = await lib.getAvailablePurchases(
      ANDROID ? undefined : { onlyIncludeActiveItemsIOS: true },
    );
    return (compras ?? [])
      .filter((compra) => PRODUTOS_DA_PLATAFORMA.includes(compra.productId))
      .filter((compra) => !compraPendenteAndroid(compra))
      .sort((a, b) => (b.transactionDate ?? 0) - (a.transactionDate ?? 0));
  } catch (error) {
    throw paraCompraError(error);
  }
}

export async function finalizarTransacao(compra) {
  // Confirmar de novo uma compra ja confirmada da erro no Google Play.
  if (ANDROID && compra.isAcknowledgedAndroid) return;
  await iap().finishTransaction({ purchase: compra, isConsumable: false });
}

// Tela de assinaturas da loja onde a pessoa assinou (`plataforma`, de
// lojaDaAssinatura), que pode nao ser a do aparelho. Nenhuma das lojas deixa
// o app cancelar a assinatura por conta propria. Antes de chamar, conferir
// podeAbrirGerenciamento: assinatura da App Store nao abre no Android.
export async function abrirGerenciarAssinaturas(plataforma = Platform.OS) {
  if (plataforma === "android") {
    // Fora do Android (assinou no Google Play, esta no iPhone), o link abre a
    // pagina de assinaturas do Google Play no navegador.
    if (ANDROID) {
      try {
        await iap().deepLinkToSubscriptions({
          skuAndroid: PRODUTO_ANDROID,
          packageNameAndroid: PACOTE_ANDROID,
        });
        return;
      } catch (erroLib) {
        if (__DEV__) console.warn("[iap] deep link da lib falhou, abrindo o link do Google Play:", erroLib);
      }
    }
    try {
      await Linking.openURL(URL_ASSINATURAS_GOOGLE_PLAY);
    } catch (error) {
      throw paraCompraError(error);
    }
    return;
  }

  if (!podeAbrirGerenciamento(plataforma)) {
    throw new CompraError(
      `Essa assinatura só pode ser gerenciada ${LOJAS.ios.na}, num iPhone ou iPad.`,
      "indisponivel",
    );
  }

  // iOS: a folha nativa do StoreKit mostra a conta que fez a compra
  // (inclusive a do sandbox); o link da App Store fica de plano B porque
  // sempre abre a Conta Apple principal do aparelho.
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
