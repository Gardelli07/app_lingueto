import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon, XIcon } from "./icons";
import { colors, fonts } from "./theme";

// state: idle | ok | bad | dim
const LOOK = {
  idle: { border: colors.cardBorder, bg: colors.card, badgeBg: colors.badge, badgeFg: "#aab3d0" },
  dim: { border: colors.cardBorder, bg: colors.card, badgeBg: colors.badge, badgeFg: "#aab3d0" },
  ok: { border: colors.green, bg: "#0f2a20", badgeBg: colors.green, badgeFg: colors.greenInk },
  bad: { border: colors.orange, bg: colors.wrongOptionBg, badgeBg: colors.orange, badgeFg: colors.orangeInk },
};

// Alternativa A/B/C/D: treme ao errar e da um pulinho ao acertar.
export function OptionButton({ letter, text, state, disabled, onPress }) {
  const shakeX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === "bad") {
      shakeX.setValue(0);
      Animated.sequence(
        [-6, 6, -4, 4, 0].map((toValue) =>
          Animated.timing(shakeX, { toValue, duration: 70, useNativeDriver: true }),
        ),
      ).start();
    } else if (state === "ok") {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.04, duration: 130, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start();
    }
  }, [state, shakeX, scale]);

  const look = LOOK[state];

  return (
    <Animated.View
      style={{
        opacity: state === "dim" ? 0.5 : 1,
        transform: [{ translateX: shakeX }, { scale }],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${letter}: ${text}`}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.option,
          {
            borderColor: look.border,
            backgroundColor:
              pressed && state === "idle" ? colors.selectedBg : look.bg,
          },
        ]}
      >
        <View style={[styles.badge, { backgroundColor: look.badgeBg }]}>
          <Text style={[styles.badgeText, { color: look.badgeFg }]}>{letter}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
        {state === "ok" ? (
          <View style={[styles.mark, { backgroundColor: colors.green }]}>
            <CheckIcon size={14} color={colors.greenInk} />
          </View>
        ) : state === "bad" ? (
          <View style={[styles.mark, { backgroundColor: colors.orange }]}>
            <XIcon size={13} color={colors.orangeInk} />
          </View>
        ) : (
          <View style={styles.ring} />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 60,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  badge: { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  badgeText: { fontFamily: fonts.extrabold, fontSize: 13 },
  text: { flex: 1, color: colors.text, fontFamily: fonts.bold, fontSize: 17 },
  ring: { width: 22, height: 22, borderRadius: 99, borderWidth: 2, borderColor: "#3a4360" },
  mark: { width: 24, height: 24, borderRadius: 99, alignItems: "center", justifyContent: "center" },
});
