import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../services/api';
import {
  COMPRA_SUPORTADA,
  CompraError,
  PRODUTO_ANUAL,
  PRODUTO_MENSAL,
  buscarProdutos,
  comprar,
  elegivelOfertaIntrodutoria,
} from '../services/iap';
import { useTheme, useThemedStyles } from '../theme';

// Paleta local da tela, derivada do tema ativo.
const paywallColors = (CORES) => ({
  blue: CORES.mode === 'dark' ? '#6E82FF' : '#3d70b2',
  mint: CORES.SECONDARY,
  white: CORES.SURFACE,
  onAccent: CORES.ON_ACCENT,
  ink: CORES.TEXT,
  greyText: CORES.TEXT_MUTED,
  greyBorder: CORES.BORDER,
  greyBg: CORES.SURFACE_ALT,
  mintDark: '#0f3d2e',
});

const RAW_PLANS = {
  free: {
    key: 'free',
    name: 'Free',
    tagline: 'Comece com o básico',
    monthly: { now: 0, was: null },
    yearly: { now: 0, was: null },
    features: [
      { label: 'Acesso limitado às aulas', ok: false },
      { label: 'Sem testes de nível', ok: false },
      { label: 'Sem descontos em aulas premium', ok: false },
    ],
  },
  premium: {
    key: 'premium',
    name: 'Premium',
    tagline: 'Tudo para se certificar',
    monthly: { now: 14.9, was: null },
    yearly: { now: 89.9, was: 200 },
    recommended: true,
    features: [
      { label: 'Acesso completo a todas as aulas', ok: true },
      { label: 'Teste de nível + certificado ao final do curso', ok: true },
      { label: 'Descontos em aulas premium', ok: true },
    ],
  },
};

const PLAN_ORDER = ['free', 'premium'];

function fmt(n) {
  return 'R$ ' + n.toFixed(2).replace('.', ',');
}

// Precos fixos acima (RAW_PLANS) so aparecem onde a App Store nao vende
// (Android, por enquanto). No iPhone o preco vem sempre do catalogo da loja.
function precoDeReferencia(price, isYearly) {
  if (price.now === 0) {
    return { priceNow: 'R$ 0', priceWas: '', priceSubnote: 'para sempre', discountPct: null };
  }
  if (!isYearly) {
    return {
      priceNow: fmt(price.now) + '/mês',
      priceWas: '',
      priceSubnote: 'cobrado mensalmente',
      discountPct: null,
    };
  }
  return {
    priceNow: fmt(price.now),
    priceWas: price.was ? fmt(price.was) : '',
    priceSubnote: price.was ? `no 1º ano · depois ${fmt(price.was)}/ano` : 'cobrado anualmente',
    discountPct: price.was ? Math.round((1 - price.now / price.was) * 100) : null,
  };
}

// Oferta do anual configurada na App Store: 1 ano pago adiantado com desconto.
// Qualquer outro formato cai no preco cheio, que e o que a folha cobra.
function ofertaDoPrimeiroAno(produto) {
  const umAnoAdiantado =
    produto.introductoryPricePaymentModeIOS === 'pay-up-front' &&
    produto.introductoryPriceSubscriptionPeriodIOS === 'year' &&
    Number(produto.introductoryPriceNumberOfPeriodsIOS) === 1;
  if (!umAnoAdiantado || !produto.introductoryPriceIOS) return null;

  const valor = Number(produto.introductoryPriceAsAmountIOS);
  const cheio = Number(produto.price);
  return {
    displayPrice: produto.introductoryPriceIOS,
    discountPct: valor > 0 && cheio > valor ? Math.round((1 - valor / cheio) * 100) : null,
  };
}

function precoDaLoja(catalogo, isYearly) {
  if (catalogo.status === 'carregando') {
    return { priceNow: '…', priceWas: '', priceSubnote: 'buscando preço na App Store', discountPct: null };
  }
  const produto = catalogo.produtos[isYearly ? PRODUTO_ANUAL : PRODUTO_MENSAL];
  if (!produto) {
    return { priceNow: '—', priceWas: '', priceSubnote: 'preço indisponível no momento', discountPct: null };
  }
  if (!isYearly) {
    return {
      priceNow: `${produto.displayPrice}/mês`,
      priceWas: '',
      priceSubnote: 'cobrado mensalmente',
      discountPct: null,
    };
  }
  const oferta = catalogo.elegivelOferta ? ofertaDoPrimeiroAno(produto) : null;
  if (!oferta) {
    return { priceNow: produto.displayPrice, priceWas: '', priceSubnote: 'cobrado anualmente', discountPct: null };
  }
  return {
    priceNow: oferta.displayPrice,
    priceWas: produto.displayPrice,
    priceSubnote: `no 1º ano · depois ${produto.displayPrice}/ano`,
    discountPct: oferta.discountPct,
  };
}

function precoDoPlano(plan, isYearly, catalogo) {
  if (plan.key === 'premium' && COMPRA_SUPORTADA) return precoDaLoja(catalogo, isYearly);
  return precoDeReferencia(isYearly ? plan.yearly : plan.monthly, isYearly);
}

const CATALOGO_INICIAL = { status: 'carregando', produtos: {}, elegivelOferta: false };

export default function PaywallScreen({ navigation }) {
  const CORES = useTheme();
  const COLORS = paywallColors(CORES);
  const styles = useThemedStyles(makeStyles);
  const { restaurarCompras } = useAuth();
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'
  const [selected, setSelected] = useState('premium');
  const [submitting, setSubmitting] = useState(false);
  const [restaurando, setRestaurando] = useState(false);
  // status: 'carregando' | 'pronto' | 'erro'
  const [catalogo, setCatalogo] = useState(CATALOGO_INICIAL);

  const carregarCatalogo = useCallback(async () => {
    if (!COMPRA_SUPORTADA) return;
    setCatalogo(CATALOGO_INICIAL);
    try {
      const lista = await buscarProdutos();
      const produtos = Object.fromEntries(lista.map((produto) => [produto.id, produto]));
      const completo = !!(produtos[PRODUTO_MENSAL] && produtos[PRODUTO_ANUAL]);
      const elegivelOferta = await elegivelOfertaIntrodutoria(produtos[PRODUTO_ANUAL]);
      setCatalogo({ status: completo ? 'pronto' : 'erro', produtos, elegivelOferta });
    } catch {
      setCatalogo({ ...CATALOGO_INICIAL, status: 'erro' });
    }
  }, []);

  useEffect(() => {
    carregarCatalogo();
  }, [carregarCatalogo]);

  const plans = useMemo(() => {
    const isYearly = billing === 'yearly';
    return PLAN_ORDER.map((key) => {
      const p = RAW_PLANS[key];
      return { ...p, ...precoDoPlano(p, isYearly, catalogo) };
    });
  }, [billing, catalogo]);

  const yearlyDiscountPct = precoDoPlano(RAW_PLANS.premium, true, catalogo).discountPct;

  const selectedPlan = plans.find((p) => p.key === selected);
  const catalogoComErro = COMPRA_SUPORTADA && catalogo.status === 'erro';
  const aguardandoCatalogo = COMPRA_SUPORTADA && catalogo.status === 'carregando';
  let ctaLabel;
  if (selected === 'free') ctaLabel = 'Continuar com o Free';
  else if (catalogoComErro) ctaLabel = 'Tentar carregar os preços de novo';
  else if (aguardandoCatalogo) ctaLabel = 'Começar agora';
  else ctaLabel = `Começar agora → ${selectedPlan.priceNow}`;

  const ocupado = submitting || restaurando;
  const ctaDisabled = ocupado || (selected === 'premium' && aguardandoCatalogo);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubscribe = async () => {
    if (selected === 'free') {
      handleClose();
      return;
    }
    if (ocupado) return;
    if (!COMPRA_SUPORTADA) {
      Alert.alert(
        'Assinatura indisponível',
        'Por enquanto o Premium só pode ser assinado pelo iPhone. Em breve também no Android.',
      );
      return;
    }
    if (catalogoComErro) {
      carregarCatalogo();
      return;
    }

    setSubmitting(true);
    try {
      // A folha da App Store abre aqui. O acesso e liberado pelo AuthContext
      // depois que o backend valida a transacao; `comprar` devolve o resultado.
      const { acessoCompleto } = await comprar(
        billing === 'yearly' ? PRODUTO_ANUAL : PRODUTO_MENSAL,
      );
      if (acessoCompleto) {
        Alert.alert('Assinatura ativa', 'Tudo pronto! O Premium já está liberado na sua conta.');
        handleClose();
      } else {
        Alert.alert(
          'Compra recebida',
          'Ainda não conseguimos liberar o seu acesso. Toque em "Restaurar compras" em alguns instantes.',
        );
      }
    } catch (error) {
      if (error instanceof CompraError) {
        if (error.code !== 'cancelada') {
          Alert.alert(
            error.code === 'pendente' ? 'Compra pendente' : 'Não foi possível assinar',
            error.message,
          );
        }
      } else if (error instanceof ApiError) {
        // A App Store cobrou, mas o backend nao validou (rede, servidor). A
        // transacao fica pendente e e reenviada; o usuario nao paga de novo.
        Alert.alert(
          'Não foi possível liberar o acesso',
          `${error.message}\n\nSe a compra foi concluída, você não será cobrado de novo: toque em "Restaurar compras" para liberar.`,
        );
      } else {
        Alert.alert('Não foi possível assinar', 'Não foi possível confirmar a assinatura. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestore = async () => {
    if (ocupado) return;
    setRestaurando(true);
    try {
      const resultado = await restaurarCompras();
      if (!resultado) {
        Alert.alert(
          'Nenhuma assinatura encontrada',
          'Não encontramos uma assinatura ativa do Lingueto neste Apple ID.',
        );
      } else if (resultado.acessoCompleto) {
        Alert.alert('Compras restauradas', 'O Premium já está liberado na sua conta.');
        handleClose();
      } else {
        Alert.alert(
          'Assinatura inativa',
          'Encontramos sua assinatura, mas ela não está mais ativa. Você pode assinar de novo abaixo.',
        );
      }
    } catch (error) {
      if (!(error instanceof CompraError && error.code === 'cancelada')) {
        const message =
          error instanceof CompraError || error instanceof ApiError
            ? error.message
            : 'Não foi possível restaurar as compras. Tente novamente.';
        Alert.alert('Não foi possível restaurar', message);
      }
    } finally {
      setRestaurando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.closeRow}>
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Desbloqueie sua fluência</Text>
          <Text style={styles.subtitle}>
            Vá mais longe no inglês — acesso completo às aulas, testes de verdade e descontos em
            aulas premium.
          </Text>
          <View style={styles.trustRow}>
            <Text style={[styles.trustText, { color: COLORS.blue }]}>★ 4,8</Text>
            <Text style={styles.trustText}> · +2 milhões de alunos</Text>
          </View>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, billing === 'monthly' && styles.tabActive]}
            onPress={() => setBilling('monthly')}
          >
            <Text style={[styles.tabText, billing === 'monthly' && styles.tabTextActive]}>
              Mensal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, billing === 'yearly' && styles.tabActive]}
            onPress={() => setBilling('yearly')}
          >
            <Text style={[styles.tabText, billing === 'yearly' && styles.tabTextActive]}>
              Anual
            </Text>
            {yearlyDiscountPct ? (
              <View style={styles.yearlyBadge}>
                <Text style={styles.yearlyBadgeText}>-{yearlyDiscountPct}%</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        <View style={styles.plansWrap}>
          {plans.map((plan) => {
            const isSelected = plan.key === selected;
            return (
              <TouchableOpacity
                key={plan.key}
                activeOpacity={0.85}
                onPress={() => setSelected(plan.key)}
                style={[
                  styles.card,
                  {
                    borderColor: isSelected ? COLORS.blue : COLORS.greyBorder,
                    backgroundColor: isSelected ? CORES.EX_BLUE_BG : COLORS.white,
                  },
                  plan.recommended && styles.cardRecommended,
                ]}
              >
                {plan.recommended ? (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>MAIS POPULAR</Text>
                  </View>
                ) : null}
                {plan.discountPct ? (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>-{plan.discountPct}%</Text>
                  </View>
                ) : null}

                <View style={styles.cardTopRow}>
                  <View>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planTagline}>{plan.tagline}</Text>
                  </View>
                  <View
                    style={[
                      styles.radio,
                      {
                        borderColor: isSelected ? COLORS.blue : CORES.BORDER_STRONG,
                        backgroundColor: isSelected ? COLORS.blue : COLORS.white,
                      },
                    ]}
                  >
                    {isSelected ? <View style={styles.radioDot} /> : null}
                  </View>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.priceNow}>{plan.priceNow}</Text>
                  {plan.priceWas ? <Text style={styles.priceWas}>{plan.priceWas}</Text> : null}
                </View>
                <Text style={styles.priceSubnote}>{plan.priceSubnote}</Text>

                <View style={styles.featuresWrap}>
                  {plan.features.map((feat, i) => (
                    <View key={i} style={styles.featureRow}>
                      <View
                        style={[
                          styles.featureIcon,
                          { backgroundColor: feat.ok ? COLORS.mint : CORES.TRACK },
                        ]}
                      >
                        <Text
                          style={[
                            styles.featureIconText,
                            { color: feat.ok ? COLORS.mintDark : CORES.TEXT_MUTED },
                          ]}
                        >
                          {feat.ok ? '✓' : '✕'}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.featureLabel,
                          { color: feat.ok ? COLORS.ink : COLORS.greyText },
                        ]}
                      >
                        {feat.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.ctaWrap}>
          {selected !== 'free' ? (
            <Text style={styles.urgency}>OFERTA POR TEMPO LIMITADO</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.ctaBtn, ctaDisabled && styles.ctaBtnDisabled]}
            activeOpacity={0.9}
            onPress={handleSubscribe}
            disabled={ctaDisabled}
          >
            {submitting || (selected === 'premium' && aguardandoCatalogo) ? (
              <ActivityIndicator color={COLORS.onAccent} />
            ) : (
              <Text style={styles.ctaText}>{ctaLabel}</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            Cancele quando quiser. Renovação automática até o cancelamento.
          </Text>
          {COMPRA_SUPORTADA ? (
            <TouchableOpacity
              style={styles.restoreBtn}
              onPress={handleRestore}
              disabled={ocupado}
            >
              {restaurando ? (
                <ActivityIndicator color={COLORS.blue} />
              ) : (
                <Text style={styles.restoreText}>Restaurar compras</Text>
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (CORES) => {
  const COLORS = paywallColors(CORES);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.white },
    scroll: { paddingBottom: 24 },
    closeRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 8 },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.greyBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeBtnText: { color: CORES.TEXT_MUTED, fontSize: 16, fontWeight: '600' },
    header: { paddingHorizontal: 24, alignItems: 'center', marginTop: 4 },
    title: { fontSize: 24, fontWeight: '800', color: COLORS.ink, textAlign: 'center' },
    subtitle: {
      fontSize: 14,
      color: CORES.TEXT_MUTED,
      textAlign: 'center',
      marginTop: 6,
      lineHeight: 19,
    },
    trustRow: { flexDirection: 'row', marginTop: 10 },
    trustText: { fontSize: 12, fontWeight: '600', color: CORES.TEXT_MUTED },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: COLORS.greyBg,
      borderRadius: 999,
      padding: 4,
      marginHorizontal: 24,
      marginTop: 18,
      marginBottom: 4,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 9,
      borderRadius: 999,
    },
    tabActive: {
      backgroundColor: COLORS.white,
      shadowColor: CORES.SHADOW,
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    tabText: { fontSize: 13, fontWeight: '700', color: CORES.TEXT_MUTED },
    tabTextActive: { color: COLORS.ink },
    yearlyBadge: {
      position: 'absolute',
      top: -9,
      right: 6,
      backgroundColor: COLORS.mint,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
    },
    yearlyBadgeText: { fontSize: 9, fontWeight: '800', color: COLORS.mintDark },
    plansWrap: { paddingHorizontal: 20, paddingTop: 16, gap: 12 },
    card: {
      borderRadius: 18,
      padding: 16,
      borderWidth: 2,
      position: 'relative',
      marginTop: 12,
    },
    cardRecommended: {
      shadowColor: COLORS.blue,
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    popularBadge: {
      position: 'absolute',
      top: -11,
      left: 16,
      backgroundColor: COLORS.blue,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 8,
    },
    popularBadgeText: { color: COLORS.onAccent, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
    discountBadge: {
      position: 'absolute',
      top: -11,
      right: 16,
      backgroundColor: COLORS.mint,
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: 8,
    },
    discountBadgeText: { color: COLORS.mintDark, fontSize: 10, fontWeight: '800' },
    cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    planName: { fontSize: 17, fontWeight: '700', color: COLORS.ink },
    planTagline: { fontSize: 12, color: CORES.TEXT_MUTED, marginTop: 2 },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: COLORS.onAccent },
    priceRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 12, gap: 8 },
    priceNow: { fontSize: 24, fontWeight: '800', color: COLORS.ink },
    priceWas: {
      fontSize: 13,
      color: CORES.TEXT_FAINT,
      textDecorationLine: 'line-through',
      marginBottom: 2,
    },
    priceSubnote: { fontSize: 11, color: CORES.TEXT_FAINT, marginTop: 1 },
    featuresWrap: { marginTop: 12, gap: 16 },
    featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
    featureIcon: {
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    featureIconText: { fontSize: 9, fontWeight: '800' },
    featureLabel: { fontSize: 12.5, lineHeight: 17, flex: 1 },
    ctaWrap: { paddingHorizontal: 20, paddingTop: 14 },
    urgency: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.blue,
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    ctaBtn: {
      backgroundColor: COLORS.blue,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      shadowColor: COLORS.blue,
      shadowOpacity: 0.35,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    ctaBtnDisabled: { opacity: 0.7 },
    ctaText: { color: COLORS.onAccent, fontWeight: '700', fontSize: 16 },
    disclaimer: { textAlign: 'center', fontSize: 11, color: CORES.TEXT_FAINT, marginTop: 10 },
    restoreBtn: { alignSelf: 'center', marginTop: 8, paddingVertical: 8, paddingHorizontal: 12 },
    restoreText: { fontSize: 13, fontWeight: '700', color: COLORS.blue },
  });
};
