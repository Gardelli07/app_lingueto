import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowRightIcon,
  BoltIcon,
  CheckIcon,
  CloseIcon,
  ProgressRing,
  RetryIcon,
} from "./icons";
import { colors, fonts } from "./theme";

// Mesmo mascote do Grammar Lab, nas versoes em alta resolucao.
const MASCOT_CORRECT = require("../../../assets/GrammarLab/mascot-correct.png");
const MASCOT_WRONG = require("../../../assets/GrammarLab/mascot-incorrect.png");

export const copy = {
  correctTitle: "Mandou bem!",
  wrongTitle: "Quase!",
  savedTitle: "Salvo em Meus erros",
  savedBody: "Pratique de novo quando quiser em Revisar erros.",
  secondChanceTitle: "Segunda chance no final",
  secondChanceBody: (cost) =>
    `Use ${cost} XP para tentar de novo no final da lição.`,
  secondChanceAddedTitle: "Segunda chance garantida",
  secondChanceAddedBody: "A pergunta vai voltar no final da lição.",
  secondChanceNoXp: "Você não tem XP suficiente.",
  secondChanceBuying: "Usando seu XP...",
  secondChanceFailed: "Não deu certo agora. Toque para tentar de novo.",
  correctCount: (n) => (n === 1 ? "1 acerto" : `${n} acertos`),
  combo: (bonus, n) => (bonus > 0 ? `+${bonus} combo ×${n}` : `combo ×${n}`),
  continue: "Continuar",
};

// Troca o `{answer}` do texto pela resposta em verde e negrito.
function Explanation({ text, answer }) {
  const [before, after = ""] = String(text || "").split("{answer}");
  return (
    <Text style={styles.body}>
      {before}
      <Text style={styles.answer}>{answer}</Text>
      {after}
    </Text>
  );
}

const CONFETTI = [
  { left: 6, top: 38, w: 6, h: 12, color: "#3B5BF6", rotate: "-25deg" },
  { left: 26, top: 20, w: 5, h: 11, color: "#22A55A", rotate: "20deg" },
  { left: 40, top: 10, w: 4, h: 4, color: "#22A55A", rotate: "0deg" },
  { left: 52, top: 26, w: 6, h: 6, color: "#F59E0B", rotate: "0deg" },
  { left: 2, top: 78, w: 5, h: 10, color: "#22A55A", rotate: "35deg" },
  { left: 8, top: 102, w: 8, h: 10, color: "#F59E0B", rotate: "-35deg" },
  { left: 76, top: 40, w: 4, h: 9, color: "#3B5BF6", rotate: "30deg" },
  { left: 77, top: 62, w: 5, h: 5, color: "#3B5BF6", rotate: "0deg" },
  { left: 70, top: 84, w: 4, h: 9, color: "#8EA2FB", rotate: "20deg" },
];

/*
  Painel de resultado que sobe do rodape.

  correct: xpGain (quanto o acerto somou no XP da aula, combo incluso; null
    quando a aula nao rende XP nesta passagem), correctCount, combo,
    comboBonus e `goal` - a meta do dia que andou com a resposta, ou o
    progresso da aula: { label, current, target, completed, description }.
    Enquanto `goal` e null o lado direito da faixa fica vazio.
  errado: com `secondChance` ({ status, cost, affordable, onBuy }, status
    idle | buying | added | failed) oferece refazer a pergunta no fim da
    aula pagando XP; sem ela, a faixa avisa que o erro foi para o Revisar
    erros.
*/
export function FeedbackSheet({
  correct,
  explanation,
  answer,
  xpGain,
  correctCount,
  combo,
  comboBonus,
  goal,
  secondChance,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const slide = useRef(new Animated.Value(1)).current;
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slide, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 6,
        speed: 14,
      }),
      Animated.spring(pop, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 14,
        speed: 8,
        delay: 120,
      }),
    ]).start();
  }, [slide, pop]);

  const ok = correct;
  const accent = ok ? colors.greenDark : colors.redText;
  const hasXp = xpGain > 0;
  const comboText = combo >= 2 ? copy.combo(comboBonus, combo) : "";
  const buying = secondChance?.status === "buying";
  const added = secondChance?.status === "added";
  const chanceDisabled = buying || added || !secondChance?.affordable;
  const chanceBody = added
    ? copy.secondChanceAddedBody
    : buying
      ? copy.secondChanceBuying
      : !secondChance?.affordable
        ? copy.secondChanceNoXp
        : secondChance?.status === "failed"
          ? copy.secondChanceFailed
          : copy.secondChanceBody(secondChance?.cost);

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        styles.sheet,
        { paddingBottom: 28 + insets.bottom },
        {
          transform: [
            {
              translateY: slide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 420],
              }),
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.handle,
          { backgroundColor: ok ? colors.greenHandle : colors.redHandle },
        ]}
      />

      <Animated.Image
        source={ok ? MASCOT_CORRECT : MASCOT_WRONG}
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        style={[
          styles.mascot,
          {
            transform: [
              { scale: pop },
              {
                translateY: pop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      />

      {ok ? (
        <View pointerEvents="none" style={styles.confetti}>
          {CONFETTI.map((c, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: c.left,
                top: c.top,
                width: c.w,
                height: c.h,
                borderRadius: 3,
                backgroundColor: c.color,
                transform: [{ rotate: c.rotate }],
              }}
            />
          ))}
        </View>
      ) : null}

      <View style={styles.header}>
        <View
          style={[
            styles.halo,
            { backgroundColor: ok ? colors.greenHalo : colors.redHalo },
          ]}
        >
          <View
            style={[
              styles.badge,
              { backgroundColor: ok ? colors.green : colors.redIcon },
            ]}
          >
            {ok ? (
              <CheckIcon size={26} />
            ) : (
              <CloseIcon size={24} color="#FFFFFF" strokeWidth={3} />
            )}
          </View>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: accent }]}>
            {ok ? copy.correctTitle : copy.wrongTitle}
          </Text>
          <Explanation text={explanation} answer={answer} />
        </View>
      </View>

      {ok ? (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.greenCard,
              borderColor: colors.greenCardBorder,
            },
          ]}
        >
          <View style={styles.cardIcon}>
            <BoltIcon size={16} color={colors.green} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.xpBig} numberOfLines={1}>
              {hasXp ? `+${xpGain} XP` : copy.correctCount(correctCount)}
            </Text>
            {hasXp || comboText ? (
              <Text
                style={styles.small}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {hasXp
                  ? copy.correctCount(correctCount) +
                    (comboText ? ` · ${comboText}` : "")
                  : comboText}
              </Text>
            ) : null}
          </View>
          {goal ? (
            <>
              <View
                style={{ alignItems: "flex-end" }}
                accessible
                accessibilityLabel={goal.description}
              >
                <Text style={styles.smallSemi} numberOfLines={1}>
                  {goal.label}
                </Text>
                <Text style={styles.goal} numberOfLines={1}>
                  {Math.min(goal.current, goal.target)}{" "}
                  <Text style={styles.goalOf}>/ {goal.target}</Text>
                </Text>
              </View>
              <ProgressRing progress={goal.current / goal.target} />
            </>
          ) : null}
        </View>
      ) : secondChance ? (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: chanceDisabled, selected: added, busy: buying }}
          disabled={chanceDisabled}
          onPress={secondChance.onBuy}
          style={({ pressed }) => [
            styles.card,
            { backgroundColor: colors.redCard, borderColor: colors.redCardBorder },
            !added && !secondChance.affordable && { opacity: 0.5 },
            pressed && { opacity: 0.8 },
          ]}
        >
          <View style={[styles.cardIcon, { borderColor: "#F1DADB" }]}>
            {added ? (
              <CheckIcon size={20} color={colors.redStrong} />
            ) : (
              <RetryIcon />
            )}
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {added ? copy.secondChanceAddedTitle : copy.secondChanceTitle}
            </Text>
            <Text style={styles.small}>{chanceBody}</Text>
          </View>
          {added ? null : (
            <View style={styles.xpPill}>
              <BoltIcon size={12} color={colors.redStrong} />
              <Text style={styles.xpPillText}>{secondChance.cost} XP</Text>
            </View>
          )}
        </Pressable>
      ) : (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.redCard, borderColor: colors.redCardBorder },
          ]}
        >
          <View style={[styles.cardIcon, { borderColor: "#F1DADB" }]}>
            <RetryIcon />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {copy.savedTitle}
            </Text>
            <Text style={styles.small}>{copy.savedBody}</Text>
          </View>
        </View>
      )}

      {/* Enquanto a compra da segunda chance esta no ar, seguir em frente
          gastaria o XP sem a pergunta voltar. */}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: buying }}
        disabled={buying}
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continue,
          {
            backgroundColor: ok ? colors.greenDark : colors.redStrong,
            boxShadow: `0px 8px 20px 0px ${
              ok ? "rgba(21,128,61,0.25)" : "rgba(220,38,38,0.25)"
            }`,
            opacity: buying ? 0.6 : pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={styles.continueText}>{copy.continue}</Text>
        <ArrowRightIcon />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 18,
    gap: 18,
    boxShadow: "0px -10px 32px 0px rgba(15,23,42,0.10)",
  },
  handle: { width: 40, height: 4, borderRadius: 99, alignSelf: "center" },
  mascot: {
    position: "absolute",
    right: 36,
    top: -60,
    width: 88,
    height: 88,
    zIndex: 2,
  },
  confetti: { position: "absolute", left: 0, top: 0, width: 120, height: 120 },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingTop: 6,
    paddingRight: 8,
  },
  halo: {
    width: 66,
    height: 66,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  badge: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { flex: 1, gap: 4 },
  title: { fontFamily: fonts.extrabold, fontSize: 24 },
  body: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 23, color: colors.body },
  answer: { fontFamily: fonts.extrabold, color: colors.greenDark },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.text },
  xpBig: { fontFamily: fonts.extrabold, fontSize: 24, color: colors.greenDark },
  small: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18, color: colors.body },
  smallSemi: { fontFamily: fonts.semibold, fontSize: 13, color: colors.body },
  goal: { fontFamily: fonts.extrabold, fontSize: 16, color: colors.text },
  goalOf: { fontFamily: fonts.semibold, color: colors.body },
  xpPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.redHandle,
    backgroundColor: "#FFFFFF",
  },
  xpPillText: { fontFamily: fonts.extrabold, fontSize: 14, color: colors.redText },

  continue: {
    height: 60,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  continueText: { fontFamily: fonts.extrabold, fontSize: 19, color: "#FFFFFF" },
});
