import React, { useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as dailyGoals from "../util/dailyGoals";
import { comboBonusFor } from "../util/xp";
import {
  pickAdvancedGoal,
  projectXp,
  slideAccuracy,
} from "../util/exerciseProgress";
import { colors } from "./expressions/theme";
import { TopBar } from "./expressions/ui";
import { FillStep, LearnStep, MeaningStep } from "./expressions/steps";
import { FeedbackSheet } from "./expressions/FeedbackSheet";

// Cada expressao vira tres passos: apresenta, o que significa e completar a
// frase. So os dois ultimos sao perguntas (contam acerto, XP e metas). Uma
// segunda chance comprada poe a pergunta errada de novo no fim, com `retry`.
function buildSteps(expressions) {
  return expressions.flatMap((_, expressionIndex) => [
    { kind: "learn", expressionIndex },
    { kind: "meaning", expressionIndex },
    { kind: "fill", expressionIndex },
  ]);
}

function questionKey(expression, kind) {
  return `${expression.id}-${kind}`;
}

// Na revisao de erros so entram as perguntas que estao no Meus erros (pelo
// mesmo `trackingSuffix` do onAttempt). Sem lista, ou se nenhuma bater (a
// aula mudou), volta a aula inteira.
function buildReviewSteps(expressions, reviewQuestionKeys) {
  const all = buildSteps(expressions);
  if (!Array.isArray(reviewQuestionKeys) || reviewQuestionKeys.length === 0) {
    return all;
  }
  const missed = all.filter(
    (step) =>
      step.kind !== "learn" &&
      reviewQuestionKeys.includes(
        questionKey(expressions[step.expressionIndex], step.kind),
      ),
  );
  return missed.length > 0 ? missed : all;
}

function dailyGoalDisplay(goal) {
  return {
    label: goal.completed ? "Meta concluída!" : "Meta diária",
    current: goal.progress,
    target: goal.target,
    completed: goal.completed,
    description: `Meta diária: ${goal.label}, ${goal.progress} de ${goal.target}`,
  };
}

// Quando nenhuma meta do dia andou, o anel mostra o progresso da aula.
function lessonProgressDisplay(done, total) {
  return {
    label: "Lição",
    current: done,
    target: total,
    completed: done >= total,
    description: `Progresso da lição: ${done} de ${total}`,
  };
}

// Expressions: varias expressoes num slide so, cada uma com apresentacao,
// "o que significa" e "complete a frase". Segue o Exercise22: o XP de cada
// acerto e a projecao do LessonScreen (precisao da aula) mais o bonus de
// combo a partir do 2o acerto seguido, que vai pro onAttempt como
// `slideBonusXp` e o servidor credita como xp_bonus. Cada pergunta vai pro
// onAttempt com o proprio `trackingSuffix` (Meus erros) e o anel mostra a
// meta do dia que andou com a resposta. Ao errar, `secondChance` (do
// LessonScreen) deixa pagar XP para refazer a pergunta no fim; acertar na
// segunda chance sobe a precisao e tira o erro do Meus erros. A tela de
// conclusao e a do LessonScreen.
export function Exercise23({
  activity,
  next,
  onAttempt,
  xpProjection,
  secondChance,
  reviewQuestionKeys,
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const expressions = activity.expressions || [];

  const [steps, setSteps] = useState(() =>
    buildReviewSteps(expressions, reviewQuestionKeys),
  );
  // Perguntas desta passagem (na revisao, so as erradas); as da segunda
  // chance repetem uma que ja conta.
  const [totalQuestions] = useState(
    () =>
      buildReviewSteps(expressions, reviewQuestionKeys).filter(
        (step) => step.kind !== "learn",
      ).length,
  );
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboXp, setComboXp] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [meaningPick, setMeaningPick] = useState(null);
  // idle | buying | added | failed, da segunda chance do passo atual.
  const [chanceStatus, setChanceStatus] = useState("idle");
  // undefined enquanto as metas carregam; null se nenhuma andou.
  const [advancedGoal, setAdvancedGoal] = useState(undefined);
  const answeredStepRef = useRef(-1);
  const advancedStepRef = useRef(-1);
  const buyingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (steps.length === 0) return null;

  const step = steps[index];
  const expression = expressions[step.expressionIndex];
  const progress = index / steps.length;

  const answer = (isCorrect) => {
    if (answeredStepRef.current === index) return;
    answeredStepRef.current = index;

    const content =
      step.kind === "meaning" ? expression.meaningCheck : expression.fillBlank;
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    const nextCombo = isCorrect ? combo + 1 : 0;
    // Sem projecao (revisao ou aula ja concluida) a aula nao rende XP, nem
    // de combo.
    const xpBefore = projectXp(xpProjection, correctCount, totalQuestions);
    const bonus = xpBefore != null && isCorrect ? comboBonusFor(nextCombo) : 0;
    const nextComboXp = comboXp + bonus;
    const xpGain =
      isCorrect && xpBefore != null
        ? projectXp(xpProjection, nextCorrect, totalQuestions) - xpBefore + bonus
        : null;

    setCorrectCount(nextCorrect);
    if (!step.retry) setAnsweredCount((current) => current + 1);
    setCombo(nextCombo);
    setComboXp(nextComboXp);
    setChanceStatus("idle");
    setAdvancedGoal(undefined);
    setFeedback({
      correct: isCorrect,
      explanation: isCorrect
        ? content.correctExplanation
        : content.wrongExplanation,
      answer:
        step.kind === "meaning"
          ? expression.meaningCheck.answer
          : expression.phrase.toLowerCase(),
      xpGain,
      comboBonus: bonus,
    });

    // As duas leituras entram na fila do dailyGoals antes e depois do
    // registro que o LessonScreen faz dentro do onAttempt, entao a
    // comparacao mostra exatamente o que essa resposta mudou.
    const before = isCorrect
      ? dailyGoals.getTodayGoals().catch(() => null)
      : null;
    // A segunda chance usa o mesmo sufixo: o servidor so guarda a ultima
    // tentativa de cada chave, entao acertar nela apaga o erro.
    onAttempt?.({
      isCorrect,
      trackingSuffix: questionKey(expression, step.kind),
      exerciseAccuracy: slideAccuracy(nextCorrect, totalQuestions),
      slideBonusXp: nextComboXp,
    });
    if (!isCorrect) return;

    const answeredStep = index;
    const after = dailyGoals.getTodayGoals().catch(() => null);
    Promise.all([before, after]).then(([goalsBefore, goalsAfter]) => {
      if (mountedRef.current && answeredStepRef.current === answeredStep) {
        setAdvancedGoal(pickAdvancedGoal(goalsBefore, goalsAfter));
      }
    });
  };

  const canOfferSecondChance =
    !!secondChance && !!feedback && !feedback.correct && !step.retry;

  const buySecondChance = async () => {
    if (!canOfferSecondChance || buyingRef.current) return;
    if (chanceStatus === "added" || secondChance.balance < secondChance.cost)
      return;

    buyingRef.current = true;
    setChanceStatus("buying");
    const missedStep = step;
    try {
      await secondChance.buy();
      if (!mountedRef.current) return;
      setSteps((current) => [...current, { ...missedStep, retry: true }]);
      setChanceStatus("added");
    } catch {
      if (mountedRef.current) setChanceStatus("failed");
    } finally {
      buyingRef.current = false;
    }
  };

  // Protegido contra toque duplo: sem isso o GOT IT/Continuar pulava um passo.
  const advance = () => {
    if (buyingRef.current || advancedStepRef.current === index) return;
    advancedStepRef.current = index;

    if (index === steps.length - 1) {
      next();
      return;
    }

    setFeedback(null);
    setMeaningPick(null);
    setChanceStatus("idle");
    setIndex((current) => current + 1);
  };

  const goal =
    advancedGoal === undefined
      ? null
      : advancedGoal
        ? dailyGoalDisplay(advancedGoal)
        : lessonProgressDisplay(answeredCount, totalQuestions);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 20 }]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.content, { paddingBottom: insets.bottom + 32 }]}>
        <TopBar
          progress={progress}
          progressColor={feedback?.correct ? colors.green : colors.blue}
          onClose={() => navigation.goBack()}
        />
        {/* a key reinicia o estado de cada passo (embaralhar, palavra escolhida) */}
        <View key={index} style={{ flex: 1 }}>
          {step.kind === "learn" ? (
            <LearnStep expression={expression} onNext={advance} />
          ) : step.kind === "meaning" ? (
            <MeaningStep
              expression={expression}
              answered={meaningPick}
              xpBadge={
                feedback?.correct && feedback.xpGain > 0
                  ? `+${feedback.xpGain} XP`
                  : undefined
              }
              onAnswer={(isCorrect, optionIndex) => {
                if (answeredStepRef.current === index) return;
                setMeaningPick(optionIndex);
                answer(isCorrect);
              }}
            />
          ) : (
            <FillStep
              expression={expression}
              checked={!!feedback}
              onCheck={answer}
            />
          )}
        </View>
      </View>

      {feedback ? (
        <FeedbackSheet
          key={index}
          correct={feedback.correct}
          explanation={feedback.explanation}
          answer={feedback.answer}
          xpGain={feedback.xpGain}
          correctCount={correctCount}
          combo={combo}
          comboBonus={feedback.comboBonus}
          goal={goal}
          secondChance={
            canOfferSecondChance
              ? {
                  status: chanceStatus,
                  cost: secondChance.cost,
                  affordable:
                    chanceStatus === "added" ||
                    secondChance.balance >= secondChance.cost,
                  onBuy: buySecondChance,
                }
              : null
          }
          onContinue={advance}
        />
      ) : null}
    </View>
  );
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise23.fullScreen = true;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, paddingHorizontal: 24 },
});
