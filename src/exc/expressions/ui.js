import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { CloseIcon } from "./icons";
import { colors, fonts, ledge } from "./theme";

// Botao "🌐 PT" (o mesmo do CoffeeShop): liga/desliga a traducao dos
// enunciados e frases, nunca da expressao em si.
export function PtToggle({ active, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={active ? "Esconder tradução" : "Mostrar tradução"}
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      hitSlop={6}
      style={[styles.pt, active && styles.ptActive]}
    >
      <Text style={[styles.ptText, active && { color: "#FFFFFF" }]}>🌐 PT</Text>
    </Pressable>
  );
}

// Texto da traducao que aparece embaixo do original com o "🌐 PT" ligado.
export function PtText({ children, style }) {
  return <Text style={[styles.ptLine, style]}>{children}</Text>;
}

// Barra do topo: fechar + progresso da aula (+ "🌐 PT" quando ha onTogglePt).
export function TopBar({
  progress,
  progressColor = colors.blue,
  onClose,
  ptShown,
  onTogglePt,
}) {
  const width = useRef(new Animated.Value(progress)).current;
  useEffect(() => {
    Animated.timing(width, {
      toValue: progress,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [progress, width]);

  return (
    <View style={styles.topBar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fechar lição"
        onPress={onClose}
        hitSlop={8}
        style={styles.closeBtn}
      >
        <CloseIcon />
      </Pressable>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: progressColor,
              width: width.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      {onTogglePt ? <PtToggle active={ptShown} onPress={onTogglePt} /> : null}
    </View>
  );
}

const VARIANTS = {
  blue: { bg: colors.blue, ledge: colors.blueDark },
  green: { bg: colors.green, ledge: colors.greenDark },
  red: { bg: colors.red, ledge: colors.redDark },
};

// Botao "3D" grandao do rodape (GOT IT, CHECK).
export function ChunkyButton({ label, onPress, variant = "blue", disabled, style }) {
  const v = VARIANTS[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chunky,
        disabled
          ? { backgroundColor: colors.border, boxShadow: ledge("#D3DAE6") }
          : {
              backgroundColor: v.bg,
              boxShadow: pressed ? "none" : ledge(v.ledge),
            },
        pressed && !disabled && { transform: [{ translateY: 5 }] },
        style,
      ]}
    >
      <Text style={[styles.chunkyText, disabled && { color: "#9AA6BC" }]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Alternativa do "What does ... mean?". state: idle | correct | wrong | dimmed
export function OptionButton({ label, state, badge, onPress, disabled }) {
  const palette =
    state === "correct"
      ? { border: colors.green, bg: colors.greenSoft, text: colors.greenDark }
      : state === "wrong"
        ? { border: colors.red, bg: colors.redSoft, text: colors.redDark }
        : { border: colors.border, bg: colors.surface, text: colors.text };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          borderColor: palette.border,
          backgroundColor: palette.bg,
          boxShadow: pressed ? "none" : ledge(palette.border, 4),
          opacity: state === "dimmed" ? 0.45 : 1,
        },
        pressed && { transform: [{ translateY: 4 }] },
      ]}
    >
      <Text
        style={[
          styles.optionText,
          {
            color: palette.text,
            fontFamily:
              state === "idle" || state === "dimmed"
                ? fonts.bold
                : fonts.extrabold,
          },
        ]}
      >
        {label}
      </Text>
      {badge ? (
        <View style={styles.optionBadge}>
          <Text style={styles.optionBadgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

// Ficha de palavra do "Fill in the blank". Usada, vira so o contorno tracejado.
export function WordChip({ label, used, onPress, disabled }) {
  if (used) {
    return (
      <View
        style={[styles.chip, styles.chipUsed]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Text style={[styles.chipText, { color: "transparent" }]}>{label}</Text>
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { boxShadow: pressed ? "none" : ledge(colors.border, 4) },
        pressed && { transform: [{ translateY: 4 }] },
      ]}
    >
      <Text style={styles.chipText}>{label}</Text>
    </Pressable>
  );
}

export function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row", alignItems: "center", gap: 14 },
  closeBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  track: {
    flex: 1,
    height: 14,
    borderRadius: 99,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: { height: 14, borderRadius: 99 },

  pt: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  ptActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  ptText: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  ptLine: {
    marginTop: 6,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.muted,
  },

  chunky: {
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  chunkyText: {
    color: "#FFFFFF",
    fontFamily: fonts.extrabold,
    fontSize: 18,
    letterSpacing: 0.7,
  },

  option: {
    minHeight: 64,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  optionText: { fontSize: 17, flexShrink: 1 },
  optionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#1F9D55",
  },
  optionBadgeText: { color: "#FFFFFF", fontFamily: fonts.extrabold, fontSize: 13 },

  chip: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
  },
  chipUsed: {
    borderStyle: "dashed",
    borderColor: colors.chipDashed,
    backgroundColor: "transparent",
  },
  chipText: { fontFamily: fonts.bold, fontSize: 17, color: colors.text },

  title: {
    fontFamily: fonts.extrabold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.text,
  },
});
