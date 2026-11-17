import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { playCorrect, playWrong } from "../grammarlab/feedback";
import { PlayIcon } from "./icons";
import { AnswerSheet } from "./Sheets";
import { frameStyles, optionColors, PronunciationFrame, ThText } from "./Frame";
import { gainForCorrect } from "./scoring";
import { useVoicePractice } from "./useVoicePractice";
import { colors, fonts } from "./theme";

/*
  Etapa 1 do Pronunciation Lab (Exercise34): ouvir dois audios da mesma
  palavra e dizer se soam igual. So a primeira resposta conta (XP e Meus
  erros); "Listen again" no erro deixa tentar de novo.

  activity: { stage, lessonTag, title, instruction, word,
    audios: [{ label, say, audioSource? }], question, options, answer (indice),
    right, wrong }
*/
export function DiscoverExercise({ activity, next, onAttempt, xpProjection, userXp = 0, comboSession }) {
  const insets = useSafeAreaInsets();
  const voice = useVoicePractice();
  const [pick, setPick] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [gained, setGained] = useState(comboSession?.gained ?? 0);
  const answeredRef = useRef(false);
  const advancedRef = useRef(false);

  useEffect(() => () => voice.stopAll(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (i) => {
    if (pick !== null) return;
    voice.stopAll();
    const ok = i === activity.answer;
    setPick(i);

    if (!answeredRef.current) {
      answeredRef.current = true;
      const gain = ok ? gainForCorrect(xpProjection, 0, 1) : 0;
      const nextGained = gained + gain;
      setGained(nextGained);
      if (comboSession) comboSession.gained = nextGained;
      // O LessonScreen toca o som da 1a resposta.
      onAttempt?.({ isCorrect: ok, exerciseAccuracy: ok ? 100 : 0 });
    } else if (ok) {
      playCorrect(1);
    } else {
      playWrong();
    }

    setSheet({ ok, text: ok ? activity.right : activity.wrong });
  };

  const advance = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    voice.stopAll();
    next();
  };

  return (
    <PronunciationFrame
      stage={activity.stage}
      lessonTag={activity.lessonTag}
      xp={userXp + gained}
      cta="Answer the question"
      ctaDisabled
      hideBottom={!!sheet}
      overlay={
        sheet ? (
          <AnswerSheet
            ok={sheet.ok}
            text={sheet.text}
            onNext={advance}
            onRetry={() => {
              setPick(null);
              setSheet(null);
            }}
            bottomInset={insets.bottom}
          />
        ) : null
      }
    >
      <Text style={frameStyles.h1}>{activity.title}</Text>
      <Text style={frameStyles.sub}>{activity.instruction}</Text>
      <View style={styles.wordBox} accessible accessibilityLabel={activity.word}>
        <ThText text={activity.word} style={styles.wordBoxText} />
      </View>
      <View style={styles.audioRow}>
        {activity.audios.map((audio, i) => {
          const on = voice.speaking === `a${i}`;
          return (
            <Pressable
              key={audio.label}
              accessibilityRole="button"
              accessibilityLabel={`Ouvir ${audio.label.toLowerCase()}`}
              onPress={() => voice.speak(audio.say, `a${i}`, { rate: 0.8, source: audio.audioSource })}
              style={[styles.audioBtn, on && { backgroundColor: colors.blueBg, borderColor: colors.blue }]}
            >
              <View style={[styles.audioPlay, on && { boxShadow: "0 0 0 5px rgba(85,135,198,0.3)" }]}>
                <PlayIcon size={14} color={colors.text} />
              </View>
              <Text style={styles.audioLabel}>{audio.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.question}>{activity.question}</Text>
      <View style={{ gap: 10, marginTop: 12 }}>
        {activity.options.map((text, i) => {
          const answered = pick !== null;
          const k = optionColors(!answered ? "idle" : i === activity.answer ? "ok" : i === pick ? "bad" : "idle");
          return (
            <Pressable
              key={text}
              accessibilityRole="button"
              disabled={answered}
              onPress={() => choose(i)}
              style={[
                styles.option,
                {
                  backgroundColor: k.bg,
                  borderColor: k.border,
                  opacity: answered && i !== activity.answer && i !== pick ? 0.5 : 1,
                },
              ]}
            >
              <View style={[styles.optionBadge, { backgroundColor: k.badgeBg }]}>
                <Text style={[styles.optionBadgeText, { color: k.badgeFg }]}>{"ABCD"[i]}</Text>
              </View>
              <Text style={styles.optionText}>{text}</Text>
            </Pressable>
          );
        })}
      </View>
    </PronunciationFrame>
  );
}

const styles = StyleSheet.create({
  wordBox: {
    marginTop: 20,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#131a2b",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#3a4470",
    alignItems: "center",
    justifyContent: "center",
  },
  wordBoxText: { fontFamily: fonts.extrabold, fontSize: 36, lineHeight: 42, letterSpacing: 1 },
  audioRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 10 },
  audioBtn: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  audioPlay: {
    width: 34,
    height: 34,
    borderRadius: 99,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  audioLabel: { fontFamily: fonts.extrabold, fontSize: 15, color: colors.text },
  question: { marginTop: 24, fontFamily: fonts.extrabold, fontSize: 18, color: colors.text },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 60,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 2,
  },
  optionBadge: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  optionBadgeText: { fontFamily: fonts.extrabold, fontSize: 14 },
  optionText: { flex: 1, fontFamily: fonts.bold, fontSize: 16, lineHeight: 22, color: colors.text },
});
