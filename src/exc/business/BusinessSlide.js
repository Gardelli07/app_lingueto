import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
import { playPair, playTick, speakSentence, stopSpeaking } from "../grammarlab/feedback";
import { BoltIcon, BulbIcon, ChevronLeftIcon, TrophyIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { ChoiceExercise } from "../grammarlab/types/ChoiceExercise";
import { BuildExercise } from "../grammarlab/types/BuildExercise";
import { ListenExercise } from "../grammarlab/types/ListenExercise";
import { MatchExercise } from "../grammarlab/types/MatchExercise";
import { normalizeAnswer, TypeExercise } from "../grammarlab/types/TypeExercise";
import { BookIcon } from "../storymode/icons";
import { WIN_TITLES } from "../storymode/theme";
import {
  goalDisplay,
  LoseInfoCard,
  LoseSheet,
  resultStyles,
  SecondChanceCard,
  WinSheet,
} from "../storymode/ResultSheet";
import { BusinessReading } from "./BusinessReading";

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

// Texto do erro quando a pergunta nao traz `correction`.
function correctMessage(item) {
  switch (item.type) {
    case "listen":
      return `You heard: “**${item.say}**”`;
    case "build":
      return `Correct: “**${item.answer.join(" ")}**.”`;
    case "type":
      return `The correct answer is “**${item.answer}**”.`;
    case "match":
      return item.pairs.map(([english, portuguese]) => `${english} = ${portuguese}`).join(" · ");
    default:
      return `The correct answer is “**${item.correctAnswer}**”.`;
  }
}

const TAP_TEXT = {
  choice: "Toque na resposta certa",
  listen: "Ouça e toque na frase certa",
  match: "Forme os pares, um de cada vez",
};

// Estado de entrada de cada pergunta, zerado ao avancar.
const RESET_QUESTION = {
  checked: false,
  correct: false,
  picked: null,
  built: [],
  typed: "",
  mSel: null,
  matched: [],
  mBad: null,
};

// Historia em partes, cada uma seguida das suas perguntas. Na revisao de
// erros so entram as partes que tem pergunta para refazer.
function buildSteps(parts, items, reviewing) {
  const steps = [];
  parts.forEach((_, part) => {
    const partItems = items.filter((entry) => entry.question.part === part);
    if (reviewing && partItems.length === 0) return;
    steps.push({ kind: "read", part });
    partItems.forEach((entry) => steps.push({ kind: "ex", part, entry }));
  });
  return steps;
}

/*
  Motor do curso de Business (Exercise33): a aula inteira num slide so. A
  historia vem em partes (`activity.parts`) e depois de cada parte vem as
  perguntas dela (`activity.questions`, cada uma com `part` e `type`: choice,
  build, listen, match ou type, os mesmos componentes do Grammar Lab).

  Sem combo: o motor e o do Story Mode. O XP de cada acerto e a projecao do
  LessonScreen (precisao da aula); o resultado sobe no pop-up do Story Mode,
  com o mascote; ao errar, `secondChance` (do LessonScreen) deixa pagar XP para
  a pergunta voltar no final da aula. O livro reabre a parte da historia do
  exercicio atual. O LessonScreen toca o som de acerto/erro.

  Campos da pergunta, alem dos de cada tipo: part, hint, explanation (no
  acerto) e correction (no erro); os dois ultimos aceitam **destaque**.
  `review: true` marca as perguntas da "Revisao final" (vao na ultima parte).
*/
export function BusinessSlide({
  activity,
  next,
  onAttempt,
  xpProjection,
  secondChance,
  reviewQuestionKeys,
  userXp = 0,
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const parts = activity.parts || [];

  const items = useMemo(
    () => buildQuestionItems(activity.questions, reviewQuestionKeys),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const total = items.length;
  const reviewing = Array.isArray(reviewQuestionKeys) && reviewQuestionKeys.length > 0;
  // Passos da aula; a segunda chance acrescenta perguntas no fim.
  const [steps, setSteps] = useState(() => buildSteps(parts, items, reviewing));
  const exSteps = steps.filter((step) => step.kind === "ex");

  const [stepIndex, setStepIndex] = useState(0);
  const [peek, setPeek] = useState(false);
  const [s, setS] = useState(RESET_QUESTION);
  const sRef = useRef(s);
  const [right, setRight] = useState(0);
  const [gained, setGained] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  // undefined enquanto as metas carregam; null se nenhuma andou.
  const [advancedGoal, setAdvancedGoal] = useState(undefined);
  // idle | buying | added | failed, da segunda chance do passo atual.
  const [chanceStatus, setChanceStatus] = useState("idle");

  const audioTimer = useRef(null);
  const answeredRef = useRef(-1);
  const advancedRef = useRef(-1);
  const buyingRef = useRef(false);
  const finishedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimeout(audioTimer.current);
      stopSpeaking();
    };
  }, []);

  const step = steps[stepIndex];
  const item = step.kind === "ex" ? step.entry.question : null;
  const hasXp = xpProjection != null;
  const reading = step.kind === "read" || peek;

  const commit = (nextState) => {
    sRef.current = nextState;
    setS(nextState);
  };
  const update = (patch) => commit({ ...sRef.current, ...patch });

  const speak = useCallback((question, slow) => {
    speakSentence(question.say, slow, {
      source: question.audioSource,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, []);

  // No "ouvir", a frase toca sozinha quando a pergunta aparece.
  useEffect(() => {
    if (!item || item.type !== "listen" || peek) return undefined;
    audioTimer.current = setTimeout(() => speak(item, false), 450);
    return () => clearTimeout(audioTimer.current);
  }, [stepIndex, peek]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextGain = () => {
    const before = projectXp(xpProjection, right, total);
    return before == null ? 0 : projectXp(xpProjection, right + 1, total) - before;
  };

  // Um caminho de resultado para todos os tipos; `extra` traz o estado de
  // entrada final (alternativa, pares...).
  const finish = (isCorrect, extra = {}) => {
    if (answeredRef.current === stepIndex) return;
    answeredRef.current = stepIndex;

    clearTimeout(audioTimer.current);
    stopSpeaking();
    setSpeaking(false);

    const nextRight = right + (isCorrect ? 1 : 0);
    const gain = isCorrect && hasXp ? nextGain() : 0;

    commit({ ...sRef.current, ...extra, checked: true, correct: isCorrect });
    setShowHint(false);
    setRight(nextRight);
    setLastGain(gain);
    setGained((current) => current + gain);
    setAdvancedGoal(undefined);
    setChanceStatus("idle");

    // As duas leituras entram na fila do dailyGoals antes e depois do registro
    // que o LessonScreen faz dentro do onAttempt, entao a comparacao mostra
    // exatamente o que essa resposta mudou.
    const before = isCorrect ? dailyGoals.getTodayGoals().catch(() => null) : null;
    onAttempt?.({
      isCorrect,
      trackingSuffix: step.entry.suffix,
      exerciseAccuracy: slideAccuracy(nextRight, total),
    });
    if (!isCorrect) return;

    const answeredStep = stepIndex;
    const after = dailyGoals.getTodayGoals().catch(() => null);
    Promise.all([before, after]).then(([goalsBefore, goalsAfter]) => {
      if (mountedRef.current && answeredRef.current === answeredStep) {
        setAdvancedGoal(pickAdvancedGoal(goalsBefore, goalsAfter));
      }
    });
  };

  // choice + listen: tocar na alternativa ja responde.
  const pickOption = (option) => finish(option === item.correctAnswer, { picked: option });

  // build
  const addWord = (bankIndex) => {
    const st = sRef.current;
    if (st.checked || st.built.includes(bankIndex)) return;
    update({ built: [...st.built, bankIndex] });
    playTick("add");
  };
  const removeWord = (position) => {
    const st = sRef.current;
    if (st.checked) return;
    update({ built: st.built.filter((_, index) => index !== position) });
    playTick("remove");
  };

  // match: um par errado encerra o exercicio.
  const pickTile = (side, pairIndex) => {
    const st = sRef.current;
    if (st.checked || st.matched.includes(pairIndex)) return;
    if (!st.mSel || st.mSel.side === side) {
      update({ mSel: { side, idx: pairIndex } });
      playTick("add");
      return;
    }
    const left = side === "l" ? pairIndex : st.mSel.idx;
    const rightSide = side === "r" ? pairIndex : st.mSel.idx;
    if (left === rightSide) {
      const matched = [...st.matched, left];
      if (matched.length === item.pairs.length) {
        finish(true, { matched, mSel: null });
      } else {
        update({ matched, mSel: null });
        playPair(matched.length);
      }
    } else {
      finish(false, { mBad: { l: left, r: rightSide }, mSel: null });
    }
  };

  // build + type: conferem no Check.
  const needsCheck = item && (item.type === "build" || item.type === "type");
  const canCheck =
    item?.type === "build"
      ? s.built.length > 0
      : item?.type === "type"
        ? normalizeAnswer(s.typed).length > 0
        : false;
  const submit = () => {
    const st = sRef.current;
    if (st.checked) return;
    if (item.type === "build") {
      if (!st.built.length) return;
      finish(st.built.map((bankIndex) => item.bank[bankIndex]).join(" ") === item.answer.join(" "));
    } else if (item.type === "type") {
      const value = normalizeAnswer(st.typed);
      if (!value) return;
      finish(value === normalizeAnswer(item.answer));
    }
  };

  const canOfferSecondChance = !!secondChance && s.checked && !s.correct && !step.retry;

  const buySecondChance = async () => {
    if (!canOfferSecondChance || buyingRef.current) return;
    if (chanceStatus === "added" || secondChance.balance < secondChance.cost) return;

    buyingRef.current = true;
    setChanceStatus("buying");
    const missed = step;
    try {
      await secondChance.buy();
      if (!mountedRef.current) return;
      setSteps((current) => [...current, { ...missed, retry: true }]);
      setChanceStatus("added");
    } catch {
      if (mountedRef.current) setChanceStatus("failed");
    } finally {
      buyingRef.current = false;
    }
  };

  // Vai para o proximo passo (parte da historia ou pergunta). Protegido
  // contra toque duplo no Continue.
  const goNext = () => {
    if (buyingRef.current || advancedRef.current === stepIndex) return;
    advancedRef.current = stepIndex;
    stopSpeaking();
    setSpeaking(false);
    if (stepIndex + 1 >= steps.length) {
      if (finishedRef.current) return;
      finishedRef.current = true;
      next();
      return;
    }
    commit(RESET_QUESTION);
    setPeek(false);
    setShowHint(false);
    setLastGain(0);
    setChanceStatus("idle");
    setStepIndex(stepIndex + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  // Ao responder, sobe a tela para o que apareceu nao ficar atras do pop-up.
  useEffect(() => {
    if (s.checked) scrollRef.current?.scrollTo({ y: 150, animated: true });
  }, [s.checked]);

  // ---- valores da tela ----
  const exNumber = steps.slice(0, stepIndex + 1).filter((entry) => entry.kind === "ex").length;
  const answeredCount = exNumber - (step.kind === "ex" && !s.checked ? 1 : 0);
  const progress = exSteps.length ? answeredCount / exSteps.length : 0;

  if (reading) {
    const retry = step.kind === "ex" && step.retry;
    return (
      <BusinessReading
        key={`read-${stepIndex}-${peek ? "peek" : "step"}`}
        part={parts[step.part]}
        partIndex={step.part}
        partCount={parts.length}
        dictionary={activity.dictionary}
        glossary={activity.glossary}
        progress={progress}
        peek={peek}
        continueLabel={
          peek ? (retry ? "Voltar para a pergunta" : `Voltar para a pergunta ${exNumber}`) : "Continuar"
        }
        onClose={() => (peek ? setPeek(false) : navigation.goBack())}
        onContinue={() => (peek ? setPeek(false) : goNext())}
      />
    );
  }

  const exerciseProps = { item, instruction: activity.instruction, checked: s.checked };
  const position = exNumber;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.root, { paddingTop: insets.top + 12 }]}
    >
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
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
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

      {/* Pergunta x de y */}
      <View style={styles.meta}>
        <View style={{ gap: 2 }}>
          <Text style={styles.metaText}>
            Question <Text style={styles.metaStrong}>{position}</Text> of {exSteps.length}
          </Text>
          {step.retry ? (
            <Text style={styles.retryTag}>Segunda chance</Text>
          ) : (
            item.review && <Text style={styles.retryTag}>Revisão final</Text>
          )}
        </View>
        <View style={{ flex: 1 }} />
        {hasXp && !s.checked && nextGain() > 0 ? (
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
        contentContainerStyle={{ paddingBottom: s.checked ? 420 : 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View key={`q-${stepIndex}`}>
          {item.type === "choice" && (
            <ChoiceExercise {...exerciseProps} picked={s.picked} onPick={pickOption} />
          )}
          {item.type === "listen" && (
            <ListenExercise
              {...exerciseProps}
              picked={s.picked}
              speaking={speaking}
              onSpeak={(slow) => speak(item, slow)}
              onPick={pickOption}
            />
          )}
          {item.type === "build" && (
            <BuildExercise
              {...exerciseProps}
              built={s.built}
              correct={s.correct}
              onAdd={addWord}
              onRemove={removeWord}
            />
          )}
          {item.type === "match" && (
            <MatchExercise
              {...exerciseProps}
              matched={s.matched}
              selected={s.mSel}
              bad={s.mBad}
              correct={s.correct}
              onPick={pickTile}
            />
          )}
          {item.type === "type" && (
            <TypeExercise
              {...exerciseProps}
              typed={s.typed}
              correct={s.correct}
              onChange={(typed) => update({ typed })}
              onSubmit={submit}
            />
          )}
        </View>

        {showHint && !s.checked && !!item.hint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              <Text style={styles.hintLabel}>Dica: </Text>
              {renderRich(item.hint)}
            </Text>
          </View>
        )}
      </ScrollView>

      {!s.checked && (
        <View style={[styles.bottomBar, { paddingBottom: 24 + insets.bottom }]}>
          {!!item.hint && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Mostrar dica"
              accessibilityState={{ selected: showHint }}
              onPress={() => setShowHint((current) => !current)}
              style={[styles.squareButton, showHint && { borderColor: colors.hint }]}
            >
              <BulbIcon color={colors.hint} />
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ler a parte ${step.part + 1} da história de novo`}
            onPress={() => {
              stopSpeaking();
              setSpeaking(false);
              setPeek(true);
            }}
            style={styles.squareButton}
          >
            <BookIcon size={20} color={colors.accentSoft} />
          </Pressable>
          {needsCheck ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canCheck }}
              disabled={!canCheck}
              onPress={submit}
              style={({ pressed }) => [
                styles.checkButton,
                !canCheck && styles.checkDisabled,
                pressed && canCheck && { transform: [{ translateY: 3 }], boxShadow: "none" },
              ]}
            >
              <Text style={[styles.checkText, !canCheck && { color: "#6b7590" }]}>Check</Text>
            </Pressable>
          ) : (
            <Text style={styles.tapHint}>{TAP_TEXT[item.type]}</Text>
          )}
        </View>
      )}

      {s.checked && s.correct && (
        <WinSheet
          key={`win-${stepIndex}`}
          title={WIN_TITLES[(position - 1) % WIN_TITLES.length]}
          text={renderRich(item.explanation)}
          gain={lastGain}
          right={right}
          total={total}
          goal={goalDisplay(advancedGoal, Math.min(answeredCount, total), total)}
          onContinue={goNext}
        />
      )}

      {s.checked && !s.correct && (
        <LoseSheet
          key={`lose-${stepIndex}`}
          text={renderRich(item.correction || correctMessage(item))}
          continueDisabled={chanceStatus === "buying"}
          onContinue={goNext}
        >
          {canOfferSecondChance ? (
            <SecondChanceCard
              secondChance={secondChance}
              status={chanceStatus}
              onPress={buySecondChance}
            />
          ) : (
            <LoseInfoCard
              title="Salvo no Meus erros"
              body="Pratique de novo quando quiser em Revisar erros."
            />
          )}
        </LoseSheet>
      )}
    </KeyboardAvoidingView>
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
  retryTag: { fontFamily: fonts.bold, fontSize: 13, color: colors.orange },
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
  bottomBar: { flexDirection: "row", alignItems: "center", gap: 10, paddingTop: 12 },
  squareButton: {
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
  checkButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 0 #4552c4",
  },
  checkDisabled: { backgroundColor: colors.badge, boxShadow: "none" },
  checkText: { fontFamily: fonts.extrabold, fontSize: 17, color: colors.text },
});
