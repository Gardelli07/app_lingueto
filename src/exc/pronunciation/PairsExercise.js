import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { buildQuestionItems, slideAccuracy } from "../../util/exerciseProgress";
import { playCorrect, playWrong } from "../grammarlab/feedback";
import { SpeakerIcon } from "./icons";
import { AnswerSheet } from "./Sheets";
import { frameStyles, optionColors, PronunciationFrame } from "./Frame";
import { gainForCorrect } from "./scoring";
import { useVoicePractice } from "./useVoicePractice";
import { colors, fonts } from "./theme";

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const coin = () => (Math.random() < 0.5 ? 0 : 1);

/*
  Etapa 4 do Pronunciation Lab (Exercise37): pares minimos. A palavra toca
  sozinha e o aluno escolhe qual ouviu. Ordem dos pares, palavra tocada e lado
  de cada opcao sao sorteados. Cada par e uma pergunta (trackingSuffix q1,
  q2...) e so a primeira resposta de cada uma conta; "Listen again" no erro
  toca de novo e deixa tentar.

  activity: { stage, lessonTag, title, instruction,
    pairs: [["THINK", "TINK"], ...], right, wrong }
*/
export function PairsExercise({
  activity,
  next,
  onAttempt,
  xpProjection,
  reviewQuestionKeys,
  userXp = 0,
  comboSession,
}) {
  const insets = useSafeAreaInsets();
  const voice = useVoicePractice();
  const [items] = useState(() =>
    shuffle(buildQuestionItems(activity.pairs, reviewQuestionKeys)).map((item) => ({
      ...item,
      target: coin(),
      swap: coin(),
    })),
  );
  const total = items.length;
  const [q, setQ] = useState(0);
  const [pick, setPick] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [right, setRight] = useState(0);
  const [gained, setGained] = useState(comboSession?.gained ?? 0);
  const answeredRef = useRef(-1);
  const advancedRef = useRef(-1);

  const item = items[q];
  const pair = item.question;
  const target = pair[item.target];
  const shown = item.swap ? [pair[1], pair[0]] : [pair[0], pair[1]];

  const say = (rate = 0.85) => voice.speak(target.toLowerCase(), "pair", { rate });

  // A palavra toca sozinha quando cada par aparece.
  useEffect(() => {
    const t = setTimeout(() => say(0.8), 450);
    return () => clearTimeout(t);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => voice.stopAll(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (i) => {
    if (pick !== null) return;
    voice.stopAll();
    const ok = shown[i] === target;
    setPick(i);

    if (answeredRef.current !== q) {
      answeredRef.current = q;
      const nextRight = right + (ok ? 1 : 0);
      const gain = ok ? gainForCorrect(xpProjection, right, total) : 0;
      const nextGained = gained + gain;
      setRight(nextRight);
      setGained(nextGained);
      if (comboSession) comboSession.gained = nextGained;
      // O LessonScreen toca o som da 1a resposta.
      onAttempt?.({
        isCorrect: ok,
        trackingSuffix: item.suffix,
        exerciseAccuracy: slideAccuracy(nextRight, total),
      });
    } else if (ok) {
      playCorrect(1);
    } else {
      playWrong();
    }

    setSheet({ ok, text: `${ok ? activity.right : activity.wrong} You heard “${target}”.` });
  };

  const advance = () => {
    if (advancedRef.current === q) return;
    advancedRef.current = q;
    voice.stopAll();
    if (q + 1 >= total) {
      next();
      return;
    }
    setSheet(null);
    setPick(null);
    setQ(q + 1);
  };

  return (
    <PronunciationFrame
      stage={activity.stage}
      lessonTag={activity.lessonTag}
      fill={q / total}
      xp={userXp + gained}
      cta="Choose a word"
      ctaDisabled
      hideBottom={!!sheet}
      overlay={
        sheet ? (
          <AnswerSheet
            ok={sheet.ok}
            text={sheet.text}
            onNext={advance}
            onRetry={() => {
              setSheet(null);
              setPick(null);
              say(0.8);
            }}
            bottomInset={insets.bottom}
          />
        ) : null
      }
    >
      <Text style={frameStyles.h1}>{activity.title}</Text>
      <Text style={[frameStyles.sub, { fontSize: 15 }]}>
        {activity.instruction} · {q + 1} / {total}
      </Text>
      <View style={{ alignItems: "center", marginTop: 24 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ouvir a palavra"
          onPress={() => say(0.85)}
          style={[
            styles.bigPlay,
            voice.speaking === "pair" && {
              boxShadow: `0 6px 0 ${colors.blueDeep}, 0 0 0 10px rgba(85,135,198,0.25)`,
            },
          ]}
        >
          <SpeakerIcon size={46} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.row}>
        {shown.map((word, i) => {
          const answered = pick !== null;
          const isTarget = word === target;
          const k = optionColors(!answered ? "idle" : isTarget ? "ok" : i === pick ? "bad" : "idle");
          return (
            <Pressable
              key={word}
              accessibilityRole="button"
              disabled={answered}
              onPress={() => choose(i)}
              style={[
                styles.pairBtn,
                {
                  backgroundColor: k.bg,
                  borderColor: k.border,
                  boxShadow: answered ? undefined : `0 4px 0 ${colors.badge}`,
                  opacity: answered && !isTarget && i !== pick ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.pairText}>{word}</Text>
            </Pressable>
          );
        })}
      </View>
    </PronunciationFrame>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 26 },
  bigPlay: {
    width: 112,
    height: 112,
    borderRadius: 99,
    backgroundColor: colors.blue,
    boxShadow: `0 6px 0 ${colors.blueDeep}`,
    alignItems: "center",
    justifyContent: "center",
  },
  pairBtn: {
    flex: 1,
    height: 92,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pairText: { fontFamily: fonts.extrabold, fontSize: 26, letterSpacing: 1, color: colors.text },
});
