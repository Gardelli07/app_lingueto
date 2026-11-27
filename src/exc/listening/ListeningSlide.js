import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as dailyGoals from "../../util/dailyGoals";
import { formatXp } from "../../util/xp";
import {
  buildQuestionItems,
  pickAdvancedGoal,
  projectXp,
  slideAccuracy,
} from "../../util/exerciseProgress";
import { speakLines, speakSentence, stopSpeaking } from "../grammarlab/feedback";
import { BoltIcon, BulbIcon, ChevronLeftIcon, TrophyIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { ListenExercise } from "../grammarlab/types/ListenExercise";
import { WIN_TITLES } from "../storymode/theme";
import {
  goalDisplay,
  LoseInfoCard,
  LoseSheet,
  resultStyles,
  WinSheet,
} from "../storymode/ResultSheet";
import { CatchExercise } from "./CatchExercise";
import { DialogueExercise } from "./DialogueExercise";
import { RealSpeedExercise } from "./RealSpeedExercise";
import { ReplyExercise } from "./ReplyExercise";

// `**trecho**` nas mensagens vira destaque (normalmente a resposta).
function renderRich(text) {
  return String(text || "")
    .split("**")
    .map((part, index) =>
      index % 2 === 1 ? (
        <Text key={index} style={resultStyles.answerHi}>
          {part}
        </Text>
      ) : (
        part
      ),
    );
}

const TAP_TEXT = {
  listen: "Ouça e toque na frase certa",
  dialogue: "Ouça e toque na resposta certa",
  catch: "Ouça e toque na palavra certa",
  reply: "Ouça e escolha a melhor resposta",
  realspeed: "Ouça as duas versões e toque na frase certa",
};

/*
  Motor do curso de Listening: Exercise28 (dialogue), Exercise29 (catch),
  Exercise30 (reply), Exercise31 (realspeed) e Exercise32 (listen). O audio toca
  sozinho, tocar na alternativa ja responde e o resultado sobe no pop-up do
  Story Mode, com o sticker do mascote; a proxima pergunta vem no Continue.

  Sem combo: o XP de cada acerto e a projecao do LessonScreen (precisao da
  aula). O LessonScreen toca o som de acerto/erro. `comboSession` e so o lugar
  que o LessonScreen da para guardar o XP mostrado e os acertos entre slides;
  `lessonPosition` faz o "Question x of y" e a barra contarem a aula inteira.

  Campos da pergunta, alem dos de cada tipo: hint, explanation (no acerto) e
  correction (no erro); os dois ultimos aceitam **destaque**.
*/
export function ListeningSlide({
  type,
  activity,
  next,
  onAttempt,
  xpProjection,
  reviewQuestionKeys,
  userXp = 0,
  comboSession,
  lessonPosition,
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [items] = useState(() =>
    buildQuestionItems(activity.questions, reviewQuestionKeys),
  );
  const total = items.length;
  const questionOffset = lessonPosition?.questionOffset ?? 0;
  const questionTotal = Math.max(lessonPosition?.questionTotal ?? total, questionOffset + total);

  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [right, setRight] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gained, setGained] = useState(comboSession?.gained ?? 0);
  const [lessonRight, setLessonRight] = useState(comboSession?.right ?? 0);
  // undefined enquanto as metas carregam; null se nenhuma andou.
  const [advancedGoal, setAdvancedGoal] = useState(undefined);
  const [speaking, setSpeaking] = useState(false);
  // Velocidade real: qual versao esta tocando e se a normal ja foi ouvida.
  const [playing, setPlaying] = useState(null);
  const [heardNormal, setHeardNormal] = useState(false);

  const audioTimer = useRef(null);
  const answeredRef = useRef(-1);
  const advancedRef = useRef(-1);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimeout(audioTimer.current);
      stopSpeaking();
    };
  }, []);

  const { question: item, suffix } = items[q];
  const hasXp = xpProjection != null;
  const correct = checked && picked === item.correctAnswer;

  const speak = useCallback((question, slow) => {
    speakSentence(question.say, slow, {
      source: question.audioSource,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, []);

  const speakDialogue = useCallback((question, slow) => {
    speakLines(question.lines, slow, {
      source: question.audioSource,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, []);

  const speakSpeed = useCallback((question, mode) => {
    const real = mode === "real";
    speakSentence(real ? question.real : question.normal, false, {
      source: real ? question.audioSourceReal : question.audioSource,
      rate: real ? 1.15 : 0.8,
      onStart: () => setPlaying(mode),
      onEnd: () => {
        setPlaying((current) => (current === mode ? null : current));
        if (!real) setHeardNormal(true);
      },
    });
  }, []);

  // O audio toca sozinho quando a pergunta aparece.
  useEffect(() => {
    audioTimer.current = setTimeout(() => {
      if (type === "dialogue") speakDialogue(item, false);
      else if (type === "realspeed") speakSpeed(item, "normal");
      else speak(item, false);
    }, 450);
    return () => clearTimeout(audioTimer.current);
  }, [type, q]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ao responder, sobe a tela para o que apareceu (transcricao, dialogo) nao
  // ficar atras do pop-up.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: checked ? 150 : 0, animated: checked });
  }, [checked, q]);

  const nextGain = () => {
    const before = projectXp(xpProjection, right, total);
    return before == null ? 0 : projectXp(xpProjection, right + 1, total) - before;
  };

  const answer = (option) => {
    if (answeredRef.current === q) return;
    answeredRef.current = q;

    clearTimeout(audioTimer.current);
    stopSpeaking();
    setSpeaking(false);
    setPlaying(null);

    const isCorrect = option === item.correctAnswer;
    const nextRight = right + (isCorrect ? 1 : 0);
    const gain = isCorrect && hasXp ? nextGain() : 0;
    const nextGained = gained + gain;
    const nextLessonRight = lessonRight + (isCorrect ? 1 : 0);

    setPicked(option);
    setChecked(true);
    setShowHint(false);
    setRight(nextRight);
    setLastGain(gain);
    setGained(nextGained);
    setLessonRight(nextLessonRight);
    setAdvancedGoal(undefined);
    if (comboSession) {
      comboSession.gained = nextGained;
      comboSession.right = nextLessonRight;
    }

    // As duas leituras entram na fila do dailyGoals antes e depois do registro
    // que o LessonScreen faz dentro do onAttempt, entao a comparacao mostra
    // exatamente o que essa resposta mudou.
    const before = isCorrect ? dailyGoals.getTodayGoals().catch(() => null) : null;
    onAttempt?.({
      isCorrect,
      trackingSuffix: suffix,
      exerciseAccuracy: slideAccuracy(nextRight, total),
    });
    if (!isCorrect) return;

    const answeredQuestion = q;
    const after = dailyGoals.getTodayGoals().catch(() => null);
    Promise.all([before, after]).then(([goalsBefore, goalsAfter]) => {
      if (mountedRef.current && answeredRef.current === answeredQuestion) {
        setAdvancedGoal(pickAdvancedGoal(goalsBefore, goalsAfter));
      }
    });
  };

  // Protegido contra toque duplo no Continue.
  const advance = () => {
    if (advancedRef.current === q) return;
    advancedRef.current = q;
    stopSpeaking();
    if (q + 1 >= total) {
      next();
      return;
    }
    setPicked(null);
    setChecked(false);
    setLastGain(0);
    setHeardNormal(false);
    setQ(q + 1);
  };

  const position = questionOffset + q + 1;
  const done = questionOffset + q + (checked ? 1 : 0);
  const exerciseProps = { item, instruction: activity.instruction, checked, picked };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
      <StatusBar barStyle="light-content" />

      {/* Barra do topo */}
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <ChevronLeftIcon color={colors.textSoft} />
        </Pressable>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(done / questionTotal) * 100}%` }]} />
          </View>
          <View style={styles.trophyDot}>
            <TrophyIcon size={15} color="#8e98b8" />
          </View>
        </View>
        <View style={styles.xpPill}>
          <BoltIcon size={14} color={colors.greenBright} />
          <Text style={styles.xpValue}>{formatXp(userXp + gained)}</Text>
          <Text style={styles.xpUnit}>XP</Text>
        </View>
      </View>

      {/* Pergunta x de y (na aula inteira) */}
      <View style={styles.meta}>
        <Text style={styles.metaText}>
          Question <Text style={styles.metaStrong}>{position}</Text> of {questionTotal}
        </Text>
        <View style={{ flex: 1 }} />
        {hasXp && !checked && nextGain() > 0 ? (
          <>
            <BoltIcon size={12} color={colors.accentSoft} />
            <Text style={styles.metaGain}>+{nextGain()} XP</Text>
          </>
        ) : null}
      </View>

      {/* Exercicio */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: checked ? 420 : 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View key={`q-${q}`}>
          {type === "listen" && (
            <ListenExercise
              {...exerciseProps}
              speaking={speaking}
              onSpeak={(slow) => speak(item, slow)}
              onPick={answer}
            />
          )}
          {type === "dialogue" && (
            <DialogueExercise
              {...exerciseProps}
              speaking={speaking}
              onSpeak={(slow) => speakDialogue(item, slow)}
              onPick={answer}
            />
          )}
          {type === "catch" && (
            <CatchExercise
              {...exerciseProps}
              speaking={speaking}
              onSpeak={(slow) => speak(item, slow)}
              onPick={answer}
            />
          )}
          {type === "reply" && (
            <ReplyExercise
              {...exerciseProps}
              correct={correct}
              speaking={speaking}
              onSpeak={(slow) => speak(item, slow)}
              onPick={answer}
            />
          )}
          {type === "realspeed" && (
            <RealSpeedExercise
              {...exerciseProps}
              playing={playing}
              heardNormal={heardNormal}
              onPlay={(mode) => speakSpeed(item, mode)}
              onPick={answer}
            />
          )}
        </View>

        {showHint && !checked && !!item.hint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              <Text style={styles.hintLabel}>Dica: </Text>
              {item.hint}
            </Text>
          </View>
        )}
      </ScrollView>

      {!checked && (
        <View style={[styles.bottomBar, { paddingBottom: 24 + insets.bottom }]}>
          {!!item.hint && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Mostrar dica"
              accessibilityState={{ selected: showHint }}
              onPress={() => setShowHint((current) => !current)}
              style={styles.hintButton}
            >
              <BulbIcon color={colors.hint} />
            </Pressable>
          )}
          <Text style={styles.tapHint}>{TAP_TEXT[type]}</Text>
        </View>
      )}

      {checked && correct && (
        <WinSheet
          key={`win-${q}`}
          title={WIN_TITLES[(position - 1) % WIN_TITLES.length]}
          text={renderRich(item.explanation)}
          gain={lastGain}
          right={lessonRight}
          total={questionTotal}
          goal={goalDisplay(advancedGoal, done, questionTotal)}
          onContinue={advance}
        />
      )}

      {checked && !correct && (
        <LoseSheet
          key={`lose-${q}`}
          text={renderRich(item.correction || `The correct answer is “${item.correctAnswer}”.`)}
          onContinue={advance}
        >
          <LoseInfoCard
            title="Salvo no Meus erros"
            body="Pratique de novo quando quiser em Revisar erros."
          />
        </LoseSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  topBar: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  progressWrap: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 99,
    backgroundColor: colors.badge,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 99, backgroundColor: colors.accent },
  trophyDot: {
    width: 30,
    height: 30,
    borderRadius: 99,
    backgroundColor: colors.raised,
    borderWidth: 1.5,
    borderColor: "#2f3854",
    alignItems: "center",
    justifyContent: "center",
  },
  xpPill: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  xpValue: { fontFamily: fonts.extrabold, fontSize: 16, color: colors.text },
  xpUnit: { fontFamily: fonts.bold, fontSize: 11, color: colors.greenText },
  meta: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 18, marginBottom: 6 },
  metaText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textSoft },
  metaStrong: { fontFamily: fonts.extrabold, color: colors.text },
  metaGain: { fontFamily: fonts.bold, fontSize: 13, color: colors.accentSoft, marginLeft: -6 },
  hintBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#3a4470",
  },
  hintText: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 21, color: colors.textSoft },
  hintLabel: { color: colors.hint, fontFamily: fonts.bold },
  bottomBar: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 12 },
  hintButton: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.raisedBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  tapHint: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.textMuted },
});
