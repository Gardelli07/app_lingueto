import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { BoltIcon } from "./icons";
import { colors, fonts } from "./theme";

const DURATION = 1300;
const BOX_W = 220;
const BOX_H = 52;

// "+15 XP" que sai de baixo da tela e voa ate o contador de XP do topo.
// from/to: { x, y } em coordenadas da janela.
export function FlyingXp({ amount, from, to, onLand }) {
  const main = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ease = Easing.bezier(0.45, 0, 0.25, 1);
    const run = (value, delay) =>
      Animated.timing(value, {
        toValue: 1,
        duration: DURATION,
        delay,
        easing: ease,
        useNativeDriver: true,
      });
    Animated.parallel([run(main, 0), run(dot1, 120), run(dot2, 220)]).start();
    const timer = setTimeout(() => onLand?.(), DURATION * 0.82);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const path = (value, scales) => ({
    opacity: value.interpolate({
      inputRange: [0, 0.1, 0.82, 1],
      outputRange: [0, 1, 1, 0],
    }),
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [0, 0.22, 0.82, 1],
          outputRange: [0, 0, dx, dx],
        }),
      },
      {
        translateY: value.interpolate({
          inputRange: [0, 0.1, 0.22, 0.82, 1],
          outputRange: [0, -40, -80, dy + 6, dy],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: [0, 0.1, 0.22, 0.82, 1],
          outputRange: scales,
        }),
      },
    ],
  });

  const origin = { left: from.x - BOX_W / 2, top: from.y - BOX_H / 2 };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.box, origin, path(dot2, [0.6, 1, 1, 0.7, 0.4])]}>
        <View style={[styles.dot, { width: 9, height: 9, backgroundColor: "#a7f3c4" }]} />
      </Animated.View>
      <Animated.View style={[styles.box, origin, path(dot1, [0.6, 1, 1, 0.7, 0.4])]}>
        <View style={[styles.dot, { width: 14, height: 14 }]} />
      </Animated.View>
      <Animated.View style={[styles.box, origin, path(main, [0.6, 1.3, 1.15, 0.7, 0.4])]}>
        <View style={styles.pill}>
          <BoltIcon size={20} color={colors.greenInk} />
          <Text style={styles.text}>+{amount} XP</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    width: BOX_W,
    height: BOX_H,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 6,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    backgroundColor: colors.greenBright,
    boxShadow: "0 0 28px 6px rgba(74,222,128,0.45)",
  },
  text: { fontFamily: fonts.extrabold, fontSize: 26, color: colors.greenInk },
  dot: { borderRadius: 99, backgroundColor: colors.greenBright },
});
