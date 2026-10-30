import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { CheckIcon, XIcon } from "./icons";
import { colors, fonts } from "./theme";
import { ComboChip } from "./ComboChip";

/*
  Painel NICE! / ALMOST! que sobe do rodape, com a barra que esvazia ate o
  avanco automatico.

  acerto: praise, base (XP do acerto, combo incluso; 0 quando a aula nao
    rende XP nesta passagem), bonus (recompensa do x5/x10), combo e nextTip.
  erro: message (a correcao) e lostText (o que aconteceu com o combo).
  drainMs: ms ate avancar; null enquanto a tela de recompensa esta aberta.
*/
export function FeedbackPanel(props) {
  const slide = useRef(new Animated.Value(320)).current;
  const pop = useRef(new Animated.Value(0.6)).current;
  const drain = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    Animated.spring(pop, {
      toValue: 1,
      friction: 4,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [slide, pop]);

  useEffect(() => {
    drain.setValue(1);
    if (props.drainMs == null) return undefined;
    const animation = Animated.timing(drain, {
      toValue: 0,
      duration: props.drainMs,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [props.drainMs, drain]);

  const tone = props.correct
    ? { bg: colors.greenBg, border: colors.greenBorder, bar: colors.green }
    : { bg: colors.orangeBg, border: colors.orangeBorder, bar: colors.orange };

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        styles.panel,
        {
          backgroundColor: tone.bg,
          borderTopColor: tone.border,
          paddingBottom: 24 + props.bottomInset,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      {props.correct ? (
        <View style={{ gap: 10 }}>
          <View style={styles.row}>
            <Animated.View
              style={[
                styles.circle,
                { backgroundColor: colors.green, transform: [{ scale: pop }] },
              ]}
            >
              <CheckIcon size={20} color={colors.greenInk} strokeWidth={3} />
            </Animated.View>
            <Text style={[styles.word, { color: colors.greenBright }]}>
              {props.praise}
            </Text>
            <View style={{ flex: 1 }} />
            {props.base > 0 ? (
              <Animated.View style={[styles.xpPill, { transform: [{ scale: pop }] }]}>
                <Text style={styles.xpPillText}>+{props.base} XP</Text>
              </Animated.View>
            ) : null}
          </View>
          <View style={[styles.row, { gap: 8, flexWrap: "wrap" }]}>
            <ComboChip combo={props.combo} size="sm" />
            {props.bonus > 0 ? (
              <Text style={styles.bonusText}>+{props.bonus} XP de bônus</Text>
            ) : props.nextTip ? (
              <Text style={styles.tipText}>{props.nextTip}</Text>
            ) : null}
          </View>
        </View>
      ) : (
        <View style={{ gap: 8 }}>
          <View style={styles.row}>
            <View style={[styles.circle, { backgroundColor: colors.orange }]}>
              <XIcon size={18} color={colors.orangeInk} strokeWidth={3} />
            </View>
            <Text style={[styles.word, { color: colors.orangeText }]}>ALMOST!</Text>
          </View>
          <Text style={styles.answer}>{props.message}</Text>
          <Text style={styles.lost}>{props.lostText}</Text>
        </View>
      )}

      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: tone.bar,
              transformOrigin: "left",
              transform: [{ scaleX: drain }],
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 22,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1.5,
    gap: 18,
    zIndex: 3,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  circle: { width: 40, height: 40, borderRadius: 99, alignItems: "center", justifyContent: "center" },
  word: { fontFamily: fonts.extrabold, fontSize: 26 },
  xpPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    backgroundColor: colors.greenBright,
  },
  xpPillText: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.greenInk },
  bonusText: { fontFamily: fonts.bold, fontSize: 13, color: colors.amberText },
  tipText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.greenText },
  answer: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 22, color: colors.text },
  lost: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.orangeSoft },
  track: {
    height: 6,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  fill: { height: "100%", width: "100%", borderRadius: 99 },
});
