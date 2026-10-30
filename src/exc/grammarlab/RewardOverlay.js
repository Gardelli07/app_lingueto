import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { BoltIcon, CheckIcon, TrophyIcon } from "./icons";
import { colors, fonts } from "./theme";
import { ComboChip } from "./ComboChip";

const MASCOT_COMBO = require("../../../assets/GrammarLab/mascot-combo.png");
const MASCOT_PERFECT = require("../../../assets/GrammarLab/mascot-perfect.png");

// Bonus do combo x5 e conquista do x10, sobre um fundo verde.
// variant: bonus | perfect; base = XP do acerto, bonus = recompensa.
export function RewardOverlay({ variant, base, bonus, onClose }) {
  const perfect = variant === "perfect";
  const fade = useRef(new Animated.Value(0)).current;
  const card = useRef(new Animated.Value(0.6)).current;
  const enter = useRef(new Animated.Value(0)).current;
  const idle = useRef(new Animated.Value(0)).current;
  const late = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop = null;
    Animated.timing(fade, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    Animated.spring(card, { toValue: 1, friction: 5, tension: 140, useNativeDriver: true }).start();
    Animated.timing(enter, {
      toValue: 1,
      duration: 750,
      easing: Easing.bezier(0.2, 0.8, 0.3, 1.15),
      useNativeDriver: true,
    }).start(() => {
      const duration = perfect ? 900 : 1100;
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(idle, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(idle, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      );
      loop.start();
    });
    Animated.spring(late, {
      toValue: 1,
      friction: 4,
      tension: 150,
      delay: 500,
      useNativeDriver: true,
    }).start();
    return () => loop?.stop();
  }, [fade, card, enter, idle, late, perfect]);

  // bonus: entra voando de baixo/esquerda e fica flutuando; perfect: pula de
  // baixo e fica "flexionando". Um item por tipo de transform (entrada +
  // idle somados): chave repetida e instavel no Android.
  const mascotTransform = perfect
    ? [
        {
          translateY: Animated.add(
            enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: [120, -14, 0] }),
            idle.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }),
          ),
        },
        {
          scale: Animated.multiply(
            enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.5, 1.08, 1] }),
            idle.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }),
          ),
        },
      ]
    : [
        { translateX: enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: [-170, 10, 0] }) },
        {
          translateY: Animated.add(
            enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: [140, -12, 0] }),
            idle.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }),
          ),
        },
        { rotate: enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: ["-14deg", "4deg", "0deg"] }) },
        { scale: enter.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.45, 1.06, 1] }) },
      ];

  const filled = perfect ? 10 : 5;

  return (
    <Animated.View style={[styles.scrim, { opacity: fade }]}>
      <Animated.View style={[styles.card, { transform: [{ scale: card }] }]}>
        <View style={styles.stage}>
          <Animated.View
            style={[
              styles.mascotWrap,
              {
                opacity: enter.interpolate({
                  inputRange: [0, 0.2],
                  outputRange: [0, 1],
                  extrapolate: "clamp",
                }),
                transform: mascotTransform,
              },
            ]}
          >
            <Image
              source={perfect ? MASCOT_PERFECT : MASCOT_COMBO}
              style={styles.mascot}
              resizeMode="contain"
              accessibilityLabel={
                perfect
                  ? "Mascote musculoso de capa comemorando"
                  : "Mascote voando de capa comemorando"
              }
            />
          </Animated.View>
          {perfect && (
            <Animated.View style={[styles.trophyBadge, { transform: [{ scale: late }] }]}>
              <TrophyIcon size={24} color={colors.amberInk} strokeWidth={2.4} />
            </Animated.View>
          )}
        </View>

        <View style={{ alignItems: "center", marginTop: 4 }}>
          <ComboChip combo={perfect ? 10 : 5} />
        </View>

        {perfect && <Text style={styles.kicker}>CONQUISTA DESBLOQUEADA</Text>}
        <Text style={[styles.title, { marginTop: perfect ? 6 : 14 }]}>
          {perfect ? "Sequência perfeita" : "Combo bonus!"}
        </Text>
        <Text style={styles.subtitle}>
          {perfect
            ? "10 acertos seguidos, sem nenhum erro."
            : "5 acertos seguidos. Você está voando!"}
        </Text>

        <View style={{ gap: 10, marginTop: 20 }}>
          <View style={[styles.row, { backgroundColor: "#0f2a20", borderColor: colors.green }]}>
            <View style={[styles.rowBadge, { backgroundColor: colors.amber }]}>
              {perfect ? (
                <TrophyIcon size={16} color={colors.amberInk} strokeWidth={2.6} />
              ) : (
                <BoltIcon size={15} color={colors.amberInk} />
              )}
            </View>
            <Text style={styles.rowText}>
              {perfect ? "Conquista especial" : "Bônus de combo"}
            </Text>
            <Animated.View style={[styles.xpPill, { transform: [{ scale: late }] }]}>
              <Text style={styles.xpPillText}>+{bonus} XP</Text>
            </Animated.View>
          </View>
          <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={[styles.rowBadge, { backgroundColor: colors.badge }]}>
              <CheckIcon size={15} color="#aab3d0" strokeWidth={3} />
            </View>
            <Text style={styles.rowText}>Resposta certa</Text>
            <Text style={styles.rowXp}>+{base} XP</Text>
          </View>
        </View>

        <View style={{ marginTop: 18, gap: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.roadLabel}>
              {perfect ? "COMBO x10 COMPLETO" : "RUMO AO COMBO x10"}
            </Text>
            <Text style={[styles.roadLabel, { color: colors.amberText }]}>
              {filled}/10
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.seg,
                    { backgroundColor: index < filled ? colors.amber : colors.badge },
                  ]}
                />
              ))}
            </View>
            <View
              style={[
                styles.roadTrophy,
                perfect
                  ? { backgroundColor: colors.amber, borderColor: colors.amber }
                  : { backgroundColor: colors.raised, borderColor: "#2f3854" },
              ]}
            >
              <TrophyIcon
                size={15}
                color={perfect ? colors.amberInk : "#8e98b8"}
                strokeWidth={2.4}
              />
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.buttonText}>{perfect ? "Collect" : "Keep going"}</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.greenScrim,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    zIndex: 5,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
  },
  stage: { height: 150, alignItems: "center", overflow: "visible", zIndex: 2 },
  mascotWrap: { position: "absolute", top: -100, width: 220, height: 210, zIndex: 2 },
  mascot: { width: 220, height: 210 },
  trophyBadge: {
    position: "absolute",
    right: 18,
    top: 8,
    width: 54,
    height: 54,
    borderRadius: 99,
    backgroundColor: colors.amber,
    borderWidth: 3,
    borderColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  kicker: {
    marginTop: 14,
    textAlign: "center",
    fontFamily: fonts.extrabold,
    fontSize: 12,
    letterSpacing: 1.7,
    color: colors.amberText,
  },
  title: { textAlign: "center", fontFamily: fonts.extrabold, fontSize: 28, color: colors.text },
  subtitle: {
    marginTop: 6,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.subtitle,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 58,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  rowBadge: { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  rowText: { flex: 1, fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  rowXp: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.greenText },
  xpPill: { paddingVertical: 5, paddingHorizontal: 11, borderRadius: 99, backgroundColor: colors.greenBright },
  xpPillText: { fontFamily: fonts.extrabold, fontSize: 14, color: colors.greenInk },
  roadLabel: { fontFamily: fonts.bold, fontSize: 12, letterSpacing: 0.5, color: "#8e98b8" },
  seg: { flex: 1, height: 8, borderRadius: 99 },
  roadTrophy: {
    width: 30,
    height: 30,
    borderRadius: 99,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontFamily: fonts.extrabold, fontSize: 17, color: colors.text },
});
