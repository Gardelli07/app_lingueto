import React, { forwardRef } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { formatXp } from "../../util/xp";
import { BoltIcon, BulbIcon, XIcon } from "../grammarlab/icons";
import { ArrowRightIcon } from "./icons";
import { colors, fonts, STAGES, TH_BLUE } from "./theme";

/*
  Moldura das etapas do Pronunciation Lab (Exercise34 a Exercise38): cada
  etapa da aula e um slide do LessonScreen, mas o topo continua mostrando as
  5 etapas como no design (segmentos, "STAGE n / 5" e a tag da aula). O
  `activity.stage` diz qual etapa e; `fill` (0 a 1) e o quanto a etapa atual
  ja andou. O XP do topo e o do aluno mais o que a aula ja rendeu
  (comboSession.gained, que os slides com pergunta atualizam).
*/
export const PronunciationFrame = forwardRef(function PronunciationFrame(
  {
    stage,
    lessonTag,
    fill = 0.12,
    xp,
    cta = "Continue",
    ctaDisabled = false,
    onCta,
    showTipButton = false,
    tipOn = false,
    onTip,
    hideBottom = false,
    children,
    overlay,
  },
  scrollRef,
) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 16 }}>
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sair da lição"
            onPress={() => navigation.goBack()}
            style={styles.exit}
          >
            <XIcon size={14} color={colors.textSoft} strokeWidth={2.6} />
          </Pressable>
          <View style={{ flex: 1, flexDirection: "row", gap: 5 }} accessibilityRole="progressbar">
            {STAGES.map((_, i) => {
              const segFill = i < stage - 1 ? 1 : i > stage - 1 ? 0 : fill;
              return (
                <View key={i} style={styles.seg}>
                  <View
                    style={{
                      height: "100%",
                      width: `${segFill * 100}%`,
                      borderRadius: 99,
                      backgroundColor: i < stage - 1 ? colors.lime : colors.blue,
                    }}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.xpPill} accessibilityLabel={`${xp} XP`}>
            <BoltIcon size={12} color={colors.greenBright} />
            <Text style={styles.xpText}>{formatXp(xp)}</Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 16, gap: 8 }]}>
          <View style={styles.stageTag}>
            <Text style={styles.stageTagText}>
              STAGE {stage} / {STAGES.length}
            </Text>
          </View>
          <Text style={styles.stageName} numberOfLines={1}>
            {STAGES[stage - 1]}
          </Text>
          {lessonTag ? <Text style={styles.lessonTag}>{lessonTag}</Text> : null}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {!hideBottom ? (
        <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
          {showTipButton ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dica"
              accessibilityState={{ selected: tipOn }}
              onPress={onTip}
              style={[styles.tipBtn, { borderColor: tipOn ? colors.hint : colors.raisedBorder }]}
            >
              <BulbIcon size={22} color={colors.hint} />
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            disabled={ctaDisabled}
            onPress={onCta}
            style={[
              styles.cta,
              ctaDisabled
                ? { backgroundColor: colors.badge }
                : { backgroundColor: colors.blue, boxShadow: `0 4px 0 ${colors.blueDeep}` },
            ]}
          >
            <Text style={[styles.ctaText, { color: ctaDisabled ? colors.textMuted : colors.text }]}>{cta}</Text>
            <ArrowRightIcon size={18} color={ctaDisabled ? colors.textMuted : colors.text} strokeWidth={2.6} />
          </Pressable>
        </View>
      ) : null}

      {overlay}
    </View>
  );
});

// "TH" em azul, o resto em branco.
export function ThText({ text, style }) {
  const parts = String(text).split(/(\bth)/i);
  return (
    <Text style={style}>
      {parts.map((part, i) => (
        <Text key={i} style={{ color: /^th$/i.test(part) ? TH_BLUE : colors.text }}>
          {part}
        </Text>
      ))}
    </Text>
  );
}

export function Dots({ count, at }) {
  return (
    <View style={styles.dots} accessibilityLabel={`${at + 1} de ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={{
            width: i === at ? 20 : 6,
            height: 6,
            borderRadius: 99,
            backgroundColor: i < at ? colors.blue : i === at ? colors.lime : "#2f3854",
          }}
        />
      ))}
    </View>
  );
}

export function Tip({ text }) {
  return (
    <View accessibilityLiveRegion="polite" style={styles.tip}>
      <BulbIcon size={20} color={colors.hint} />
      <Text style={styles.tipText}>
        <Text style={{ color: colors.hint, fontFamily: fonts.extrabold }}>Dica: </Text>
        {text}
      </Text>
    </View>
  );
}

// Cores das alternativas (Discover e Minimal pairs).
export function optionColors(state) {
  if (state === "ok") {
    return { bg: "#11302a", border: "#2fbf94", badgeBg: colors.tealDeep, badgeFg: colors.text };
  }
  if (state === "bad") {
    return { bg: "#33191a", border: "#e8603c", badgeBg: colors.redOrange, badgeFg: colors.text };
  }
  return { bg: colors.card, border: colors.cardBorder, badgeBg: colors.badge, badgeFg: "#aab3d0" };
}

export const frameStyles = StyleSheet.create({
  h1: { marginTop: 12, fontFamily: fonts.extrabold, fontSize: 24, lineHeight: 30, color: colors.text },
  sub: { marginTop: 8, fontFamily: fonts.medium, fontSize: 16, lineHeight: 23, color: TH_BLUE },
  label: {
    marginTop: 18,
    marginBottom: 8,
    fontFamily: fonts.extrabold,
    fontSize: 13,
    letterSpacing: 1,
    color: colors.text,
  },
  wordCard: {
    marginTop: 16,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.blueBorder,
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  exit: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  seg: { flex: 1, height: 8, borderRadius: 99, backgroundColor: colors.badge, overflow: "hidden" },
  xpPill: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  xpText: { fontFamily: fonts.extrabold, fontSize: 14, color: colors.text },
  stageTag: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: 7,
    backgroundColor: colors.blueBg,
    borderWidth: 1,
    borderColor: colors.blueBorder,
    justifyContent: "center",
  },
  stageTagText: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 0.8, color: colors.blueSoft },
  stageName: { flexShrink: 1, fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 1, color: colors.text },
  lessonTag: { marginLeft: "auto", fontFamily: fonts.bold, fontSize: 12, color: "#7f8aad" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 12 },
  tip: {
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6b5a2a",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  tipText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 21, color: "#dfe3f1" },
  bottom: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.raised,
  },
  tipBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  cta: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaText: { fontFamily: fonts.extrabold, fontSize: 17, color: colors.text },
});
