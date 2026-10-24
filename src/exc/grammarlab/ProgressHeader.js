import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, shadows } from "./theme";
import { Bolt, Check, ChevronLeft, Trophy } from "./icons";

const CHECKPOINTS = [1 / 3, 2 / 3];

/*
  done: perguntas concluidas, contando a que acabou de ser acertada.
  questionNumber: numero (1..total) da pergunta atual.
  questionXp: quanto acertar a pergunta atual soma no XP da aula (o "N XP"
    abaixo do chip).
  xp: XP que a aula vai render ate agora, na conta do servidor (o chip do
    canto).
  xpGain: XP que acabou de entrar - mostra o "+N" e o trecho verde da barra.
  xp e questionXp chegam null quando a aula nao rende XP (revisao ou aula ja
  concluida): o chip e o "N XP" somem.
*/
export function ProgressHeader({
  done,
  total,
  questionNumber,
  questionXp,
  xp,
  xpGain = 0,
  onBack,
}) {
  const justEarned = xpGain > 0;
  const donePct = done / total;
  const prevPct = justEarned ? (done - 1) / total : donePct;

  const pop = useRef(new Animated.Value(justEarned ? 0 : 1)).current;
  useEffect(() => {
    if (justEarned) {
      pop.setValue(0);
      Animated.spring(pop, {
        toValue: 1,
        friction: 5,
        tension: 140,
        useNativeDriver: true,
      }).start();
    }
  }, [justEarned, pop]);

  return (
    <View>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.7 }]}
        >
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>

        <View
          style={styles.bar}
          accessibilityRole="progressbar"
          accessibilityLabel="Lesson progress"
          accessibilityValue={{ min: 0, max: total, now: done }}
        >
          <View style={styles.track} />
          {justEarned && (
            <View
              style={[
                styles.fill,
                styles.fillEarned,
                { width: `${donePct * 100}%` },
              ]}
            />
          )}
          <View
            style={[
              styles.fill,
              { width: `${prevPct * 100}%`, backgroundColor: colors.blue },
            ]}
          >
            <View style={styles.sheen} />
          </View>

          {CHECKPOINTS.map((cp) => {
            const reachedBefore = prevPct >= cp - 1e-6;
            const reachedNow = !reachedBefore && donePct >= cp - 1e-6;
            return (
              <View
                key={cp}
                style={[
                  styles.marker,
                  { left: `${cp * 100}%` },
                  reachedBefore && styles.markerDone,
                  reachedNow && styles.markerNew,
                  !reachedBefore && !reachedNow && styles.markerIdle,
                ]}
              >
                {(reachedBefore || reachedNow) && (
                  <Check size={10} color="#FFFFFF" strokeWidth={4} />
                )}
              </View>
            );
          })}

          <View style={styles.finish}>
            <Trophy size={14} color={colors.inkFaint} />
          </View>
        </View>

        {xp != null && (
          <View>
            <View
              style={[styles.xpChip, justEarned && styles.xpChipEarned]}
              accessible
              accessibilityLabel={`${xp} XP earned in this lesson`}
            >
              <Bolt size={14} color={colors.blue} />
              <Text style={styles.xpValue}>{xp.toLocaleString("en-US")}</Text>
              <Text style={styles.xpUnit}>XP</Text>
            </View>
            {justEarned && (
              <Animated.View
                style={[
                  styles.xpPop,
                  {
                    opacity: pop,
                    transform: [
                      {
                        translateY: pop.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-8, 0],
                        }),
                      },
                      {
                        scale: pop.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.6, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.xpPopText}>+{xpGain}</Text>
              </Animated.View>
            )}
          </View>
        )}
      </View>

      <View style={styles.subRow}>
        <Text style={styles.counter}>
          Question {questionNumber}{" "}
          <Text style={styles.counterOf}>of {total}</Text>
        </Text>
        {questionXp != null && (
          <View style={styles.reward}>
            <Bolt size={12} color={colors.inkFaint} />
            <Text style={styles.rewardText}>{questionXp} XP</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  back: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: { flex: 1, height: 22, justifyContent: "center" },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 6,
    height: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.track,
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 6,
    height: 10,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  fillEarned: {
    backgroundColor: colors.green,
    boxShadow: "0px 0px 0px 3px rgba(18, 183, 106, 0.16)",
  },
  sheen: {
    position: "absolute",
    left: 6,
    right: 6,
    top: 2,
    height: 3,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  marker: {
    position: "absolute",
    top: 0,
    width: 22,
    height: 22,
    marginLeft: -11,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  markerDone: {
    backgroundColor: colors.blue,
    borderWidth: 3,
    borderColor: colors.bg,
  },
  markerNew: {
    backgroundColor: colors.green,
    borderWidth: 3,
    borderColor: colors.bg,
    boxShadow: "0px 0px 0px 4px rgba(18, 183, 106, 0.22)",
  },
  markerIdle: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.markerIdle,
  },
  finish: {
    position: "absolute",
    right: -4,
    top: -3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.finishBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  xpChip: {
    height: 36,
    paddingLeft: 10,
    paddingRight: 12,
    borderRadius: radii.chip,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  xpChipEarned: {
    backgroundColor: colors.greenTint,
    borderColor: colors.greenChipBorder,
  },
  xpValue: {
    fontFamily: fonts.display,
    fontSize: 16,
    letterSpacing: -0.16,
    color: colors.ink,
  },
  xpUnit: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    letterSpacing: 0.44,
    color: colors.inkSoft,
  },
  xpPop: {
    position: "absolute",
    right: 2,
    top: 40,
    height: 22,
    paddingHorizontal: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.green,
    justifyContent: "center",
    boxShadow: shadows.xpPop,
  },
  xpPopText: { fontFamily: fonts.bodyHeavy, fontSize: 12, color: "#FFFFFF" },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 56,
    marginTop: 12,
  },
  counter: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.inkSoft },
  counterOf: { fontFamily: fonts.bodySemi, color: colors.inkFaint },
  reward: { flexDirection: "row", alignItems: "center", gap: 4 },
  rewardText: { fontFamily: fonts.bodyBold, fontSize: 12, color: colors.inkSoft },
});
