import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "./theme";

// Rotulo do tipo (ex.: "BUILD THE SENTENCE"), enunciado grande e instrucao.
export function ExerciseHeader({ icon, kicker, title, subtitle }) {
  return (
    <View>
      <View style={styles.kicker}>
        {icon}
        <Text style={styles.kickerText}>{kicker}</Text>
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

// Lacuna da frase: vazia, sendo digitada ou preenchida com a resposta.
export const blankStyles = StyleSheet.create({
  empty: { color: colors.textMuted },
  typing: { color: colors.accent, textDecorationLine: "underline" },
  done: {
    color: colors.greenBright,
    textDecorationLine: "underline",
    textDecorationColor: colors.green,
  },
});

const styles = StyleSheet.create({
  kicker: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  kickerText: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.accentSoft,
  },
  title: {
    marginTop: 8,
    fontFamily: fonts.extrabold,
    fontSize: 28,
    lineHeight: 35,
    color: colors.text,
  },
  subtitle: { marginTop: 8, fontFamily: fonts.medium, fontSize: 15, color: colors.subtitle },
});
