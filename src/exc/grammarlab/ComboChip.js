import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { BoltIcon } from "./icons";
import { colors, fonts } from "./theme";

// "⚡ COMBO xN": discreto no x1, contorno ambar a partir do x2, preenchido e
// pulsando a partir do x5.
export function ComboChip({ combo, size = "md", label }) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const hot = combo >= 5;

  useEffect(() => {
    scale.setValue(0.6);
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 180,
      useNativeDriver: true,
    }).start();
  }, [combo, scale]);

  useEffect(() => {
    if (!hot) {
      glow.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [hot, glow]);

  const variant = hot ? styles.hot : combo >= 2 ? styles.warm : styles.cool;
  const textColor = hot
    ? colors.amberInk
    : combo >= 2
      ? colors.amberText
      : colors.textSoft;
  const height = size === "sm" ? 28 : 30;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {hot && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.halo, { opacity: glow }]}
        />
      )}
      <View style={[styles.chip, variant, { height }]}>
        <BoltIcon size={13} color={textColor} />
        <Text style={[styles.text, { color: textColor }]}>
          {label ?? `COMBO x${combo}`}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  cool: { backgroundColor: colors.raised, borderColor: colors.raisedBorder },
  warm: { backgroundColor: colors.amberSoftBg, borderColor: colors.amber },
  hot: { backgroundColor: colors.amber, borderColor: colors.amber },
  halo: {
    backgroundColor: colors.amber,
    borderRadius: 99,
    boxShadow: "0 0 18px 4px rgba(255,176,32,0.6)",
  },
  text: { fontFamily: fonts.extrabold, fontSize: 13, letterSpacing: 0.8 },
});
