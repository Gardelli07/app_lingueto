import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, shadows } from "./theme";
import { Check, Cross } from "./icons";

/*
  Variantes do card:
    idle     - ainda nao escolhido
    selected - escolhido, sem correcao
    correct  - escolhido e certo
    wrong    - escolhido e errado
    reveal   - a resposta certa, mostrada depois de um erro
    dimmed   - qualquer outra opcao depois da correcao
*/
const card = {
  idle: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    boxShadow: shadows.hairline,
  },
  selected: {
    backgroundColor: colors.blueSelected,
    borderWidth: 2,
    borderColor: colors.blue,
    boxShadow: shadows.ringBlue,
  },
  correct: {
    backgroundColor: colors.greenTint,
    borderWidth: 2,
    borderColor: colors.green,
    boxShadow: shadows.ringGreen,
  },
  wrong: {
    backgroundColor: colors.redTint,
    borderWidth: 2,
    borderColor: colors.red,
    boxShadow: shadows.ringRed,
  },
  reveal: {
    backgroundColor: colors.greenTint,
    borderWidth: 2,
    borderColor: colors.green,
  },
  dimmed: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    opacity: 0.45,
  },
};

const tileBg = {
  idle: colors.tile,
  selected: colors.blue,
  correct: colors.green,
  wrong: colors.red,
  reveal: colors.green,
  dimmed: colors.tile,
};

export function AnswerCard({ letter, text, variant, xpReward, disabled, onPress }) {
  const showRadio = variant === "idle" || variant === "selected";
  const letterColor = variant === "selected" ? "#FFFFFF" : colors.inkSoft;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={`${letter}. ${text}`}
      accessibilityState={{
        checked:
          variant === "selected" || variant === "correct" || variant === "wrong",
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        card[variant],
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={[styles.tile, { backgroundColor: tileBg[variant] }]}>
        {variant === "correct" || variant === "reveal" ? (
          <Check size={18} color="#FFFFFF" />
        ) : variant === "wrong" ? (
          <Cross size={16} color="#FFFFFF" />
        ) : (
          <Text style={[styles.letter, { color: letterColor }]}>{letter}</Text>
        )}
      </View>

      <Text style={styles.text} numberOfLines={2}>
        {text}
      </Text>

      {showRadio && (
        <View
          style={[
            styles.radio,
            variant === "selected" ? styles.radioOn : styles.radioOff,
          ]}
        >
          {variant === "selected" && <View style={styles.radioDot} />}
        </View>
      )}

      {variant === "correct" && xpReward ? (
        <View style={[styles.tag, { backgroundColor: colors.green }]}>
          <Text style={[styles.tagText, { color: "#FFFFFF", fontSize: 12 }]}>
            +{xpReward} XP
          </Text>
        </View>
      ) : null}
      {variant === "wrong" && (
        <View style={[styles.tag, { backgroundColor: colors.redTag }]}>
          <Text style={[styles.tagText, { color: colors.redInk }]}>
            Your answer
          </Text>
        </View>
      )}
      {variant === "reveal" && (
        <View style={[styles.tag, { backgroundColor: colors.greenTag }]}>
          <Text style={[styles.tagText, { color: colors.greenInk }]}>Correct</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    height: 60,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: radii.card,
  },
  pressed: { transform: [{ scale: 0.985 }] },
  tile: {
    width: 36,
    height: 36,
    borderRadius: radii.tile,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: { fontFamily: fonts.display, fontSize: 15 },
  text: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 17, color: colors.ink },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOff: { borderColor: colors.radio, backgroundColor: colors.surface },
  radioOn: { borderColor: colors.blue, backgroundColor: colors.blue },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" },
  tag: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: radii.pill,
    justifyContent: "center",
  },
  tagText: { fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 0.22 },
});
