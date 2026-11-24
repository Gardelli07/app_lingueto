import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PtButton, ptOf, usePt } from "../ptToggle";
import { colors, fonts } from "./theme";

// Rotulo do tipo (ex.: "BUILD THE SENTENCE"), enunciado grande e instrucao.
// Botao "🌐 PT": aparece nas aulas A1 (PtContext do LessonScreen) ou quando
// quem usa passa `onTogglePt`. Ligado, mostra a traducao do titulo e da
// instrucao embaixo do original: `titlePt`/`subtitlePt` se vierem, senao a do
// dicionario (ptOf). So traduz o enunciado; alternativas e audio continuam em
// ingles.
export function ExerciseHeader({
  icon,
  kicker,
  title,
  subtitle,
  titlePt,
  subtitlePt,
  ptShown,
  onTogglePt,
}) {
  const pt = usePt();
  const shown = ptShown ?? pt?.shown;
  const toggle = onTogglePt ?? pt?.toggle;
  const tPt = titlePt ?? ptOf(title);
  const sPt = subtitlePt ?? ptOf(subtitle);
  const hasPt = !!toggle && (!!tPt || !!sPt);
  return (
    <View>
      <View style={styles.kicker}>
        {icon}
        <Text style={[styles.kickerText, { flex: 1 }]}>{kicker}</Text>
        {hasPt && <PtButton active={shown} onPress={toggle} />}
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {hasPt && shown && !!tPt && <Text style={styles.titlePt}>{tPt}</Text>}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {hasPt && shown && !!sPt && <Text style={styles.subtitlePt}>{sPt}</Text>}
    </View>
  );
}

// Traducao de um enunciado: se a aula trouxe texto proprio, usa a traducao que
// veio junto (ou nenhuma); senao, a do texto padrao do componente.
export function ptFor(custom, customPt, fallbackPt) {
  return custom ? customPt : fallbackPt;
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
  titlePt: {
    marginTop: 4,
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.accentSoft,
  },
  subtitlePt: { marginTop: 2, fontFamily: fonts.medium, fontSize: 14, color: colors.textMuted },
});
