import React, { useEffect, useRef, useState } from "react";
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
import * as dailyGoals from "../util/dailyGoals";
import { colors, fonts, radii } from "./grammarlab/theme";
import { Bulb } from "./grammarlab/icons";
import { ProgressHeader } from "./grammarlab/ProgressHeader";
import { AnswerCard } from "./grammarlab/AnswerCard";
import { ResultSheet } from "./grammarlab/ResultSheet";

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const NBSP = " ";

// `**trecho**` nas mensagens vira destaque verde (normalmente a resposta).
function renderRich(text) {
  return String(text || "")
    .split("**")
    .map((part, index) =>
      index % 2 === 1 ? (
        <Text key={index} style={styles.highlight}>
          {part}
        </Text>
      ) : (
        part
      ),
    );
}

// Metas do dia que andaram com a resposta (comparando antes x depois). As
// que acabaram de ser concluidas tem prioridade; entre as candidatas, uma e
// sorteada.
function pickAdvancedGoal(before, after) {
  if (!before || !after) return null;

  const advanced = after.goals.filter((goal) => {
    const previous = before.goals.find((item) => item.id === goal.id);
    return previous && goal.progress > previous.progress;
  });
  const completed = advanced.filter((goal) => goal.completed);
  const pool = completed.length > 0 ? completed : advanced;

  return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function dailyGoalDisplay(goal) {
  return {
    label: goal.completed ? "Goal done!" : "Daily goal",
    current: goal.progress,
    target: goal.target,
    icon: goal.icon,
    completed: goal.completed,
    description: `Daily goal: ${goal.label}, ${goal.progress} of ${goal.target}`,
  };
}

// Precisao do slide contando as perguntas ainda nao respondidas como erro:
// so sobe durante a aula e, na ultima resposta, e a precisao real.
function slideAccuracy(correctCount, totalQuestions) {
  return (correctCount / totalQuestions) * 100;
}

// XP que o servidor vai creditar se a aula fechar com `correctCount` acertos
// neste slide (projecao do LessonScreen, mesma conta da API). Null quando a
// aula nao rende XP nesta passagem (revisao ou aula ja concluida).
function projectXp(xpProjection, correctCount, totalQuestions) {
  return xpProjection
    ? xpProjection(slideAccuracy(correctCount, totalQuestions))
    : null;
}

// Quando nenhuma meta do dia andou, o anel mostra o progresso da aula.
function lessonProgressDisplay(done, total) {
  return {
    label: "Lesson",
    current: done,
    target: total,
    icon: "flask-outline",
    completed: done >= total,
    description: `Lesson progress: ${done} of ${total}`,
  };
}

function GrammarQuestion({
  question,
  instruction,
  questionNumber,
  totalQuestions,
  correctSoFar,
  xpProjection,
  onBack,
  onAttempt,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState(null);
  const [status, setStatus] = useState("answering");
  const [showHint, setShowHint] = useState(false);
  // undefined enquanto as metas carregam; null se nenhuma andou.
  const [advancedGoal, setAdvancedGoal] = useState(undefined);
  const answeredRef = useRef(false);
  const continuedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const answered = status !== "answering";
  const correct = status === "correct";
  const wrong = status === "incorrect";

  // Quanto o acerto desta pergunta soma na projecao do XP da aula.
  const xpBefore = projectXp(xpProjection, correctSoFar, totalQuestions);
  const questionXp =
    xpBefore == null
      ? null
      : projectXp(xpProjection, correctSoFar + 1, totalQuestions) - xpBefore;
  const xpGain = correct && questionXp ? questionXp : 0;
  const lessonXp = xpBefore == null ? null : xpBefore + xpGain;
  const done = questionNumber - 1 + (correct ? 1 : 0);

  const goal =
    advancedGoal === undefined
      ? null
      : advancedGoal
        ? dailyGoalDisplay(advancedGoal)
        : lessonProgressDisplay(done, totalQuestions);

  const variantFor = (option) => {
    if (status === "answering") return option === picked ? "selected" : "idle";
    if (correct) return option === picked ? "correct" : "dimmed";
    if (option === picked) return "wrong";
    if (option === question.correctAnswer) return "reveal";
    return "dimmed";
  };

  // Sem etapa de confirmar: tocar numa alternativa ja corrige.
  const answer = (option) => {
    if (answeredRef.current) return;
    answeredRef.current = true;

    const isCorrect = option === question.correctAnswer;
    setPicked(option);
    setStatus(isCorrect ? "correct" : "incorrect");
    setShowHint(false);

    // As duas leituras entram na fila do dailyGoals antes e depois do
    // registro que o LessonScreen faz dentro do onAttempt, entao a
    // comparacao mostra exatamente o que essa resposta mudou.
    const before = isCorrect
      ? dailyGoals.getTodayGoals().catch(() => null)
      : null;
    onAttempt?.({
      isCorrect,
      trackingSuffix: `q${questionNumber}`,
      exerciseAccuracy: slideAccuracy(
        correctSoFar + (isCorrect ? 1 : 0),
        totalQuestions,
      ),
    });
    if (!isCorrect) return;

    const after = dailyGoals.getTodayGoals().catch(() => null);
    Promise.all([before, after]).then(([goalsBefore, goalsAfter]) => {
      if (mountedRef.current) {
        setAdvancedGoal(pickAdvancedGoal(goalsBefore, goalsAfter));
      }
    });
  };

  const handleContinue = () => {
    if (continuedRef.current) return;
    continuedRef.current = true;
    onContinue({ correct });
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <View style={styles.gutter}>
        <ProgressHeader
          done={done}
          total={totalQuestions}
          questionNumber={questionNumber}
          questionXp={questionXp}
          xp={lessonXp}
          xpGain={xpGain}
          onBack={onBack}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.gutter,
          { paddingTop: 30, paddingBottom: 300 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question} accessibilityRole="header">
          {question.before}
          <Gap
            status={status}
            text={picked}
            correctText={question.correctAnswer}
          />
          {question.after}
        </Text>
        <Text style={styles.instruction}>
          {question.instruction || instruction}
        </Text>

        <View style={styles.answers} accessibilityRole="radiogroup">
          {question.options.map((option, index) => (
            <AnswerCard
              key={option}
              letter={LETTERS[index]}
              text={option}
              variant={variantFor(option)}
              xpReward={xpGain}
              disabled={answered}
              onPress={() => answer(option)}
            />
          ))}
        </View>
      </ScrollView>

      {!answered && (
        <View
          style={[styles.actionArea, { paddingBottom: insets.bottom + 16 }]}
        >
          {showHint && (
            <View style={styles.hintCard}>
              <Bulb size={18} color={colors.blue} />
              <Text style={styles.hintText}>{question.hint}</Text>
            </View>
          )}
          <View style={styles.actions}>
            {!!question.hint && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Hint"
                accessibilityState={{ expanded: showHint }}
                onPress={() => setShowHint((current) => !current)}
                style={({ pressed }) => [
                  styles.hint,
                  showHint && styles.hintActive,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Bulb
                  size={22}
                  color={showHint ? colors.blue : colors.inkSoft}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}

      {correct && (
        <ResultSheet
          variant="correct"
          message={renderRich(question.explanation)}
          xpGain={xpGain}
          lessonXp={lessonXp}
          goal={goal}
          bottomInset={insets.bottom}
          onContinue={handleContinue}
        />
      )}
      {wrong && (
        <ResultSheet
          variant="incorrect"
          message={renderRich(question.correction)}
          bottomInset={insets.bottom}
          onContinue={handleContinue}
        />
      )}
    </View>
  );
}

// A lacuna da frase: tracejada enquanto vazia, depois preenchida com a escolha.
function Gap({ status, text, correctText }) {
  if (!text) {
    return <Text style={styles.gapEmpty}>{NBSP.repeat(16)}</Text>;
  }
  if (status === "correct") {
    return (
      <Text style={[styles.gapFilled, styles.gapCorrect]}>
        {NBSP + (correctText ?? text) + NBSP}
      </Text>
    );
  }
  if (status === "incorrect") {
    return (
      <Text style={[styles.gapFilled, styles.gapWrong]}>
        {NBSP + text + NBSP}
      </Text>
    );
  }
  return (
    <Text style={[styles.gapFilled, styles.gapSelected]}>
      {NBSP + text + NBSP}
    </Text>
  );
}

// Grammar Lab: varias perguntas de completar a frase num slide so. O chip
// mostra o XP que o servidor vai creditar pela aula (projecao do LessonScreen),
// que sobe a cada acerto e na ultima resposta bate com a tela final; cada
// resposta vai pro onAttempt com o proprio `trackingSuffix`, igual ao
// Exercise21.
export function Exercise22({ activity, next, onAttempt, xpProjection }) {
  const navigation = useNavigation();
  const questions = activity.questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleContinue = ({ correct }) => {
    if (correct) setCorrectCount((current) => current + 1);

    if (questionIndex === questions.length - 1) {
      next();
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <GrammarQuestion
        key={questionIndex}
        question={questions[questionIndex]}
        instruction={activity.instruction}
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
        correctSoFar={correctCount}
        xpProjection={xpProjection}
        onBack={() => navigation.goBack()}
        onAttempt={onAttempt}
        onContinue={handleContinue}
      />
    </View>
  );
}

// Layout proprio (scroll, safe area e painel fixo no rodape): o LessonScreen
// nao embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise22.fullScreen = true;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  gutter: { paddingHorizontal: 20 },
  question: {
    fontFamily: fonts.display,
    fontSize: 25,
    lineHeight: 33,
    letterSpacing: -0.375,
    color: colors.ink,
  },
  gapEmpty: {
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    textDecorationColor: colors.blankDash,
  },
  gapFilled: { textDecorationLine: "underline" },
  gapSelected: {
    color: colors.blueInk,
    backgroundColor: colors.blueBlank,
    textDecorationColor: colors.blue,
  },
  gapCorrect: {
    color: colors.greenInk,
    backgroundColor: colors.greenBlank,
    textDecorationColor: colors.green,
  },
  gapWrong: {
    color: colors.redInk,
    backgroundColor: colors.redBlank,
    textDecorationLine: "line-through",
    textDecorationColor: colors.red,
  },
  instruction: {
    marginTop: 10,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkSoft,
  },
  answers: { marginTop: 24, gap: 10 },
  highlight: { fontFamily: fonts.bodyHeavy, color: colors.greenInk },
  actionArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 14,
    backgroundColor: colors.bg,
  },
  actions: { flexDirection: "row", gap: 12 },
  hint: {
    width: 56,
    height: 56,
    borderRadius: radii.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  hintActive: {
    borderColor: colors.blueBorderSoft,
    backgroundColor: colors.blueTint,
  },
  hintCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    backgroundColor: colors.blueSelected,
  },
  hintText: {
    flex: 1,
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkStrong2,
  },
});
