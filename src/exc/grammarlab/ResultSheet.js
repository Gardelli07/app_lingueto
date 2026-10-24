import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts, radii, shadows } from "./theme";
import { ArrowRight, Bolt, Check, Cross, Retry } from "./icons";

const stickerCorrect = require("../../../assets/GrammarLab/mascot-correct.png");
const stickerIncorrect = require("../../../assets/GrammarLab/mascot-incorrect.png");

// Confete em volta do icone de acerto: [left, top, width, height, rotacao, cor]
const CONFETTI = [
  [-14, -10, 6, 10, -24, colors.blue],
  [10, -22, 5, 9, 18, colors.green],
  [34, -18, 6, 6, 0, colors.gold],
  [56, -6, 5, 10, 32, colors.periwinkle],
  [-20, 18, 5, 8, 40, colors.green],
  [60, 22, 6, 6, 0, colors.blue],
  [-12, 50, 6, 9, -38, colors.gold],
  [52, 50, 5, 9, 22, colors.periwinkle],
  [22, -30, 4, 4, 0, colors.green],
  [-26, -2, 4, 4, 0, colors.blue],
];

/*
  Painel de resultado que sobe do rodape.

  variant "correct": message, xpGain (quanto o acerto somou no XP da aula),
    lessonXp (o XP da aula ate agora) e `goal` - a meta/progresso que andou
    com a resposta, mostrada no anel da direita:
    { label, current, target, icon, completed, description }. Enquanto
    `goal` e null o lado direito da faixa fica vazio; sem XP (revisao ou aula
    ja concluida) o lado esquerdo some, e sem nenhum dos dois, a faixa.
  variant "incorrect": message. A faixa avisa que o erro foi para o Revisar
    erros; o Continue segue pra proxima pergunta.
*/
export function ResultSheet(props) {
  const ok = props.variant === "correct";

  const slide = useRef(new Animated.Value(0)).current;
  const burst = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.spring(slide, {
        toValue: 1,
        friction: 9,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.spring(burst, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slide, burst]);

  const sheetMotion = {
    transform: [
      {
        translateY: slide.interpolate({
          inputRange: [0, 1],
          outputRange: [360, 0],
        }),
      },
    ],
  };
  const stickerMotion = {
    opacity: burst,
    transform: [
      {
        translateY: burst.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
        }),
      },
      { rotate: "6deg" },
      { scaleX: -1 }, // espelhado pro mascote olhar pra mensagem
      {
        scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.sheet,
        { paddingBottom: props.bottomInset + 16 },
        sheetMotion,
      ]}
    >
      <View
        style={[
          styles.handle,
          { backgroundColor: ok ? colors.greenHandle : colors.redHandle },
        ]}
      />

      <Animated.Image
        source={ok ? stickerCorrect : stickerIncorrect}
        accessibilityLabel={
          ok ? "Lingueto mascot clapping" : "Lingueto mascot wagging a finger"
        }
        style={[styles.sticker, stickerMotion]}
        resizeMode="contain"
      />

      {/* Veredito */}
      <View style={styles.verdict}>
        <View style={styles.iconWrap}>
          {ok &&
            CONFETTI.map(([l, t, w, h, r, c], i) => (
              <Animated.View
                key={i}
                style={{
                  position: "absolute",
                  left: l,
                  top: t,
                  width: w,
                  height: h,
                  borderRadius: w === h ? w / 2 : 2,
                  backgroundColor: c,
                  opacity: burst,
                  transform: [{ rotate: `${r}deg` }, { scale: burst }],
                }}
              />
            ))}
          <View style={[styles.icon, ok ? styles.iconOk : styles.iconBad]}>
            {ok ? (
              <Check size={26} color="#FFFFFF" />
            ) : (
              <Cross size={22} color="#FFFFFF" />
            )}
          </View>
        </View>
        <View style={styles.verdictText}>
          <Text
            style={[styles.title, { color: ok ? colors.greenInk : colors.redInk }]}
          >
            {ok ? "Spot on!" : "Not quite"}
          </Text>
          <Text style={styles.message}>{props.message}</Text>
        </View>
      </View>

      {/* Faixa de recompensa / erro salvo */}
      {ok && (props.xpGain > 0 || !!props.goal) && (
        <View style={[styles.strip, styles.stripOk]}>
          {props.xpGain > 0 ? (
            <View style={styles.stripLeft}>
              <View
                style={[styles.stripIcon, { borderColor: colors.greenBorder }]}
              >
                <Bolt size={18} color={colors.green} />
              </View>
              <View>
                <Text style={styles.xpBig}>+{props.xpGain} XP</Text>
                <Text style={styles.stripSub}>
                  {props.lessonXp} XP this lesson
                </Text>
              </View>
            </View>
          ) : (
            <View />
          )}
          {props.goal ? (
            <View
              style={styles.stripLeft}
              accessible
              accessibilityLabel={props.goal.description}
            >
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={[
                    styles.goalLabel,
                    props.goal.completed && { color: colors.greenInk },
                  ]}
                >
                  {props.goal.label}
                </Text>
                <Text style={styles.goalValue}>
                  {props.goal.current}
                  <Text style={styles.goalOf}> / {props.goal.target}</Text>
                </Text>
              </View>
              <GoalRing
                pct={Math.min(1, props.goal.current / props.goal.target)}
                icon={props.goal.completed ? "check" : props.goal.icon}
              />
            </View>
          ) : null}
        </View>
      )}
      {!ok && (
        <View style={[styles.strip, styles.stripRetry]}>
          <View style={[styles.stripIcon, { borderColor: colors.redBorder }]}>
            <Retry size={18} color={colors.red} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.retryTitle}>Saved to your mistakes</Text>
            <Text style={styles.stripSub}>
              Practice it again anytime in Revisar erros.
            </Text>
          </View>
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        onPress={props.onContinue}
        style={({ pressed }) => [
          styles.button,
          ok ? styles.buttonOk : styles.buttonBad,
          pressed && { transform: [{ scale: 0.985 }] },
        ]}
      >
        <Text style={styles.buttonText}>Continue</Text>
        <ArrowRight size={18} color="#FFFFFF" />
      </Pressable>
    </Animated.View>
  );
}

function GoalRing({ pct, icon }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <View style={styles.ring}>
      <Svg width={40} height={40} viewBox="0 0 44 44">
        <Circle
          cx={22}
          cy={22}
          r={r}
          fill="none"
          stroke={colors.greenRing}
          strokeWidth={5}
        />
        <Circle
          cx={22}
          cy={22}
          r={r}
          fill="none"
          stroke={colors.green}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          transform="rotate(-90 22 22)"
        />
      </Svg>
      {icon ? (
        <View style={styles.ringIcon}>
          <MaterialCommunityIcons name={icon} size={15} color={colors.green} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 24,
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    boxShadow: shadows.sheet,
  },
  handle: {
    position: "absolute",
    top: 8,
    alignSelf: "center",
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 4,
    borderRadius: radii.pill,
  },
  sticker: {
    position: "absolute",
    right: 30,
    top: -58,
    width: 96,
    height: 115,
    zIndex: 2,
  },
  verdict: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconWrap: { width: 48, height: 48 },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOk: {
    backgroundColor: colors.green,
    boxShadow: "0px 0px 0px 6px rgba(18, 183, 106, 0.14)",
  },
  iconBad: {
    backgroundColor: colors.red,
    boxShadow: "0px 0px 0px 6px rgba(240, 68, 56, 0.12)",
  },
  verdictText: { flex: 1, gap: 2, paddingRight: 108 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 22, letterSpacing: -0.33 },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  strip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radii.card,
    borderWidth: 1,
  },
  stripOk: {
    justifyContent: "space-between",
    backgroundColor: colors.greenStrip,
    borderColor: colors.greenBorder,
  },
  stripRetry: {
    gap: 12,
    backgroundColor: colors.redTint,
    borderColor: colors.redBorder,
  },
  stripLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  stripIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.tile,
    backgroundColor: colors.surface,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  xpBig: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.44,
    color: colors.greenInk,
  },
  stripSub: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.inkStrong2 },
  goalLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.22,
    color: colors.inkStrong2,
  },
  goalValue: { fontFamily: fonts.bodyHeavy, fontSize: 13, color: colors.ink },
  goalOf: { fontFamily: fonts.bodySemi, color: colors.inkMuted },
  ring: { width: 40, height: 40 },
  ringIcon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  retryTitle: { fontFamily: fonts.bodyHeavy, fontSize: 14, color: colors.ink },
  button: {
    height: 56,
    borderRadius: radii.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonOk: { backgroundColor: colors.greenButton, boxShadow: shadows.buttonGreen },
  buttonBad: { backgroundColor: colors.redButton, boxShadow: shadows.buttonRed },
  buttonText: { fontFamily: fonts.bodyHeavy, fontSize: 17, color: "#FFFFFF" },
});
