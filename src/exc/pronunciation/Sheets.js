import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { MODO_SANDBOX_COMPRAS } from "../../services/assinaturas";
import { buscarPlanos, COMPRA_SUPORTADA } from "../../services/iap";
import { PRECO_REFERENCIA_PREMIUM } from "../../pages/PaywallScreen";
import { BoltIcon, BulbIcon, CheckIcon, XIcon } from "../grammarlab/icons";
import { ArrowRightIcon, MicIcon } from "./icons";
import { colors, fonts } from "./theme";

const STICKER_RIGHT = require("../../../assets/PR/sticker-right.png");
const STICKER_WRONG = require("../../../assets/PR/sticker-wrong.png");

function useSlideUp() {
  const y = useRef(new Animated.Value(420)).current;
  useEffect(() => {
    Animated.timing(y, {
      toValue: 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [y]);
  return y;
}

// Pop-up de certo/errado do Pronunciation Lab, com o sticker do camaleao.
// No erro, "Listen again" deixa tentar de novo (so a 1a resposta conta XP).
export function AnswerSheet({ ok, text, onNext, onRetry, bottomInset }) {
  const y = useSlideUp();
  const pop = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.spring(pop, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }).start();
  }, [pop]);
  return (
    <>
      <View style={styles.scrim} />
      <Animated.View
        accessibilityLiveRegion="polite"
        style={[styles.sheet, { paddingBottom: 30 + bottomInset, transform: [{ translateY: y }] }]}
      >
        <Animated.Image
          source={ok ? STICKER_RIGHT : STICKER_WRONG}
          resizeMode="contain"
          importantForAccessibility="no"
          style={[styles.sticker, { transform: [{ scale: pop }] }]}
        />
        <View style={[styles.handle, { backgroundColor: ok ? colors.greenBorder : colors.orangeBorder }]} />
        <View style={styles.head}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: ok ? colors.tealDeep : colors.redOrange,
                boxShadow: `0 0 0 8px ${ok ? "rgba(47,191,148,0.16)" : "rgba(255,106,61,0.16)"}`,
              },
            ]}
          >
            {ok ? (
              <CheckIcon size={26} color={colors.text} strokeWidth={3} />
            ) : (
              <XIcon size={24} color={colors.text} strokeWidth={3} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: ok ? colors.tealTitle : colors.orangeText }]}>
              {ok ? "Spot on!" : "Try again"}
            </Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {!ok && onRetry ? (
            <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retry}>
              <Text style={styles.retryText}>Listen again</Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            onPress={onNext}
            style={[styles.cta, { backgroundColor: ok ? colors.ctaGreen : colors.ctaRed }]}
          >
            <Text style={styles.ctaText}>Continue</Text>
            <ArrowRightIcon size={18} color={colors.text} strokeWidth={2.6} />
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
}

const PERKS = [
  "Correção automática da sua pronúncia em segundos",
  "Até 3 feedbacks instantâneos por dia",
  "Envio para a comunidade continua grátis",
];

// Sem loja (web, Expo Go, modo sandbox) mostra o preco de referencia do paywall.
const PRECO_DA_LOJA = COMPRA_SUPORTADA && !MODO_SANDBOX_COMPRAS;

const PLANOS_REFERENCIA = [
  { id: "monthly", name: "MENSAL", price: PRECO_REFERENCIA_PREMIUM.mensal, per: "por mês" },
  { id: "yearly", name: "ANUAL", price: PRECO_REFERENCIA_PREMIUM.anual, per: "por ano" },
];

// Mesmo catalogo do PaywallScreen (buscarPlanos): o preco ja vem formatado
// pela loja, e o anual mostra a oferta do 1o ano quando o aluno tem direito.
function planosDaLoja(status, planos) {
  if (status === "carregando") {
    return [
      { id: "monthly", name: "MENSAL", price: "…", per: "buscando preço" },
      { id: "yearly", name: "ANUAL", price: "…", per: "buscando preço" },
    ];
  }
  const mensal = planos?.mensal;
  const anual = planos?.anual;
  const oferta = anual?.ofertaPrimeiroAno;
  return [
    {
      id: "monthly",
      name: "MENSAL",
      price: mensal ? mensal.preco : "—",
      per: mensal ? "por mês" : "preço indisponível",
    },
    {
      id: "yearly",
      name: "ANUAL",
      price: anual ? (oferta ? oferta.preco : anual.preco) : "—",
      per: anual ? (oferta ? `no 1º ano · depois ${anual.preco}` : "por ano") : "preço indisponível",
    },
  ];
}

function usePlanos() {
  const [catalogo, setCatalogo] = useState({ status: "carregando", planos: null });
  useEffect(() => {
    if (!PRECO_DA_LOJA) return;
    let active = true;
    buscarPlanos()
      .then((planos) => active && setCatalogo({ status: "pronto", planos }))
      .catch(() => active && setCatalogo({ status: "erro", planos: null }));
    return () => {
      active = false;
    };
  }, []);
  return PRECO_DA_LOJA ? planosDaLoja(catalogo.status, catalogo.planos) : PLANOS_REFERENCIA;
}

// Pop-up do Premium quando um aluno Free toca em "Feedback instantaneo".
// "Assinar Premium" abre o paywall do app com o plano escolhido
// (onSubscribe("monthly" | "yearly")); "Agora nao" envia para a comunidade.
export function PremiumSheet({ onClose, onSubscribe, onCommunity, bottomInset }) {
  const y = useSlideUp();
  const plans = usePlanos();
  const [plan, setPlan] = useState(plans.length - 1);
  return (
    <>
      <Pressable
        accessibilityLabel="Fechar"
        onPress={onClose}
        style={[styles.scrim, { backgroundColor: "rgba(5,8,16,0.6)" }]}
      />
      <Animated.View
        accessibilityViewIsModal
        style={[
          styles.sheet,
          {
            borderTopColor: colors.amberDeepBorder,
            paddingBottom: 30 + bottomInset,
            gap: 0,
            transform: [{ translateY: y }],
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.amberDeepBorder }]} />
        <View style={styles.premiumHead}>
          <View style={styles.premiumIcon}>
            <BoltIcon size={22} color={colors.amberText} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumKicker}>LINGUETO PREMIUM</Text>
            <Text style={styles.premiumTitle}>Feedback instantâneo</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={onClose} style={styles.close}>
            <XIcon size={12} color={colors.textSoft} strokeWidth={2.6} />
          </Pressable>
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          {PERKS.map((perk) => (
            <View key={perk} style={styles.perk}>
              <View style={styles.perkDot}>
                <CheckIcon size={11} color={colors.amberInk} strokeWidth={3.4} />
              </View>
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}
        </View>
        <View style={styles.plans}>
          {plans.map((p, i) => {
            const on = plan === i;
            return (
              <Pressable
                key={p.id}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => setPlan(i)}
                style={[
                  styles.plan,
                  { backgroundColor: on ? "#221c10" : colors.raised, borderColor: on ? colors.amberText : "#2f3854" },
                ]}
              >
                <Text style={[styles.planName, { color: on ? colors.amberText : colors.textMuted }]}>{p.name}</Text>
                <Text style={styles.planPrice} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                  {p.price}
                </Text>
                <Text style={styles.planPer}>{p.per}</Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onSubscribe?.(plans[plan].id)}
          style={styles.subscribe}
        >
          <Text style={styles.subscribeText}>Assinar Premium</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onCommunity || onClose} style={styles.later}>
          <Text style={styles.laterText}>Agora não, enviar para a comunidade</Text>
        </Pressable>
      </Animated.View>
    </>
  );
}

// Cor da nota (corte de 70 = "passa" no SpeechAce).
export function corDaNota(nota) {
  if (nota >= 70) return colors.tealTitle;
  if (nota >= 60) return colors.amberText;
  return colors.orangeText;
}

// Palavra com o "TH" na cor da nota do som treinado (foco); o resto em branco.
function FocusWord({ text, color }) {
  const parts = String(text).split(/(th)/i);
  return (
    <Text style={styles.fbWord} accessibilityLabel={text}>
      {parts.map((part, i) => (
        <Text key={i} style={{ color: /^th$/i.test(part) ? color : colors.text }}>
          {part}
        </Text>
      ))}
    </Text>
  );
}

const NOME_SOM = { t: "T", d: "D", f: "F", v: "V", s: "S", z: "Z", th: "TH /θ/", dh: "TH /ð/" };

/*
  Resultado do feedback instantaneo (SpeechAce via /pronuncia/avaliar): nota
  grande de 0 a 100, a palavra com o TH em verde ou vermelho (na frase, cada
  palavra com a sua cor), a dica em portugues e quantos feedbacks restam hoje.
  `result` e a resposta da API; `isWord` escolhe o layout.
*/
export function FeedbackSheet({ result, text, isWord, onRetry, onClose, bottomInset }) {
  const y = useSlideUp();
  const pop = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    Animated.spring(pop, { toValue: 1, friction: 5, tension: 160, useNativeDriver: true }).start();
  }, [pop]);

  const nota = result.nota;
  const cor = corDaNota(nota);
  const foco = result.foco;
  const cota = result.cota;
  const soou = foco && foco.nota < 70 && foco.soou_como && foco.soou_como !== foco.fonema
    ? NOME_SOM[foco.soou_como] || foco.soou_como.toUpperCase()
    : null;

  return (
    <>
      <Pressable accessibilityLabel="Fechar" onPress={onClose} style={[styles.scrim, { backgroundColor: "rgba(5,8,16,0.6)" }]} />
      <Animated.View
        accessibilityViewIsModal
        accessibilityLiveRegion="polite"
        style={[styles.sheet, { paddingBottom: 30 + bottomInset, gap: 0, transform: [{ translateY: y }] }]}
      >
        <View style={[styles.handle, { backgroundColor: colors.blueBorder }]} />
        <View style={styles.premiumHead}>
          <Animated.View
            style={[styles.scoreRing, { borderColor: cor, transform: [{ scale: pop }] }]}
            accessible
            accessibilityLabel={`Nota ${nota} de 100`}
          >
            <Text style={[styles.scoreNum, { color: cor }]}>{nota}</Text>
            <Text style={styles.scoreOf}>/ 100</Text>
          </Animated.View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.premiumKicker, { color: colors.blueSoft }]}>FEEDBACK INSTANTÂNEO</Text>
            <Text style={styles.premiumTitle}>{result.titulo}</Text>
            {result.cefr ? <Text style={styles.fbCefr}>Nível da pronúncia: {result.cefr}</Text> : null}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={onClose} style={styles.close}>
            <XIcon size={12} color={colors.textSoft} strokeWidth={2.6} />
          </Pressable>
        </View>

        <View style={styles.fbCard}>
          {isWord ? (
            <>
              <FocusWord text={text} color={foco ? corDaNota(foco.nota) : cor} />
              {foco ? (
                <Text style={styles.fbFocus}>
                  Som do TH: <Text style={{ color: corDaNota(foco.nota) }}>{foco.nota}/100</Text>
                  {soou ? ` · soou como ${soou}` : ""}
                </Text>
              ) : null}
            </>
          ) : (
            <View style={styles.fbChips}>
              {result.palavras.map((palavra, i) => (
                <View key={`${palavra.palavra}-${i}`} style={[styles.fbChip, { borderColor: corDaNota(palavra.nota) }]}>
                  <Text style={[styles.fbChipText, { color: corDaNota(palavra.nota) }]}>{palavra.palavra}</Text>
                  <Text style={styles.fbChipNota}>{palavra.nota}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {result.dica ? (
          <View style={styles.fbTip}>
            <BulbIcon size={20} color={colors.hint} />
            <Text style={styles.fbTipText}>{result.dica}</Text>
          </View>
        ) : null}

        {cota ? (
          <Text style={styles.fbQuota}>
            {cota.restantes > 0
              ? `Você ainda tem ${cota.restantes} de ${cota.limite} feedbacks hoje.`
              : `Você usou os ${cota.limite} feedbacks de hoje. Amanhã tem mais!`}
          </Text>
        ) : null}

        <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
          <Pressable accessibilityRole="button" onPress={onRetry} style={styles.fbRetry}>
            <MicIcon size={18} color={colors.orange} />
            <Text style={styles.fbRetryText}>Gravar de novo</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onClose} style={[styles.cta, { backgroundColor: colors.blue }]}>
            <Text style={styles.ctaText}>Continue</Text>
            <ArrowRightIcon size={18} color={colors.text} strokeWidth={2.6} />
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  scoreRing: {
    width: 72,
    height: 72,
    borderRadius: 99,
    borderWidth: 4,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNum: { fontFamily: fonts.extrabold, fontSize: 26, lineHeight: 30 },
  scoreOf: { fontFamily: fonts.bold, fontSize: 10, color: colors.textMuted },
  fbCefr: { marginTop: 2, fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted },
  fbCard: {
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
  },
  fbWord: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 46, letterSpacing: 1 },
  fbFocus: { marginTop: 6, fontFamily: fonts.bold, fontSize: 14, color: colors.textSoft },
  fbChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  fbChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    height: 34,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: colors.raised,
  },
  fbChipText: { fontFamily: fonts.extrabold, fontSize: 15 },
  fbChipNota: { fontFamily: fonts.bold, fontSize: 11, color: colors.textMuted },
  fbTip: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6b5a2a",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  fbTipText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 21, color: "#dfe3f1" },
  fbQuota: { marginTop: 12, textAlign: "center", fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted },
  fbRetry: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#3a2228",
    backgroundColor: colors.raised,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fbRetryText: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.text },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(5,8,16,0.35)",
    zIndex: 4,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderTopColor: "#2a3350",
    backgroundColor: colors.sheet,
    boxShadow: "0 -14px 40px rgba(0,0,0,0.45)",
    gap: 16,
    zIndex: 5,
  },
  sticker: { position: "absolute", right: 44, top: -72, width: 76, height: 102 },
  handle: { alignSelf: "center", width: 40, height: 5, borderRadius: 99 },
  head: { flexDirection: "row", alignItems: "flex-start", gap: 18, marginTop: 4 },
  icon: {
    width: 60,
    height: 60,
    marginTop: 8,
    marginLeft: 8,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontFamily: fonts.extrabold, fontSize: 28, lineHeight: 34 },
  text: { marginTop: 6, fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, color: colors.textSoft },
  retry: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.orangeBorder,
    justifyContent: "center",
  },
  retryText: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.orangeSoft },
  cta: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaText: { fontFamily: fonts.extrabold, fontSize: 17, color: colors.text },
  premiumHead: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 },
  premiumIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.amberDeepBg,
    borderWidth: 1,
    borderColor: colors.amberDeepBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  premiumKicker: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 1, color: colors.amberText },
  premiumTitle: { fontFamily: fonts.extrabold, fontSize: 21, lineHeight: 26, color: colors.text },
  close: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2f3854",
    alignItems: "center",
    justifyContent: "center",
  },
  perk: { flexDirection: "row", alignItems: "center", gap: 10 },
  perkDot: {
    width: 20,
    height: 20,
    borderRadius: 99,
    backgroundColor: colors.amberText,
    alignItems: "center",
    justifyContent: "center",
  },
  perkText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 19, color: "#dfe3f1" },
  plans: { flexDirection: "row", gap: 10, marginTop: 18 },
  plan: { flex: 1, padding: 14, borderRadius: 16, borderWidth: 2, gap: 4 },
  planName: { fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 0.6 },
  planPrice: { fontFamily: fonts.extrabold, fontSize: 22, lineHeight: 26, color: colors.text },
  planPer: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted },
  subscribe: {
    height: 56,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: colors.amberText,
    boxShadow: "0 4px 0 #b07a12",
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeText: { fontFamily: fonts.extrabold, fontSize: 17, color: "#2a1d04" },
  later: { height: 44, marginTop: 6, alignItems: "center", justifyContent: "center" },
  laterText: { fontFamily: fonts.bold, fontSize: 14, color: colors.textSoft },
});
