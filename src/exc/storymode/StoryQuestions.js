import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as dailyGoals from "../../util/dailyGoals";
import { formatXp } from "../../util/xp";
import {
  pickAdvancedGoal,
  projectXp,
  slideAccuracy,
} from "../../util/exerciseProgress";
import { C, F, WIN_TITLES } from "./theme";
import {
  ArrowIcon,
  BackIcon,
  BoltIcon,
  BookIcon,
  BulbIcon,
  CheckIcon,
  RetryIcon,
  Ring,
  TrophyIcon,
  XIcon,
} from "./icons";
import BottomSheet from "./BottomSheet";
import Mascot from "./Mascot";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const chanceCopy = {
  title: "Segunda chance no final",
  body: (cost) => `Use ${cost} XP para tentar de novo no final da lição.`,
  addedTitle: "Segunda chance garantida",
  addedBody: "A pergunta vai voltar no final da lição.",
  noXp: "Você não tem XP suficiente.",
  buying: "Usando seu XP...",
  failed: "Não deu certo agora. Toque para tentar de novo.",
};

// Na revisao de erros so entram as perguntas que estao no Meus erros. Cada
// uma guarda o numero original, que e o `trackingSuffix` (q1, q2...): acertar
// na revisao (ou na segunda chance) apaga o erro certo. Sem lista, ou se
// nenhuma bater (a aula mudou), volta todas.
function buildQuestionItems(questions, reviewQuestionKeys) {
  const all = questions.map((question, index) => ({
    question,
    suffix: `q${index + 1}`,
  }));
  if (!Array.isArray(reviewQuestionKeys) || reviewQuestionKeys.length === 0) {
    return all;
  }
  const missed = all.filter((item) => reviewQuestionKeys.includes(item.suffix));
  return missed.length > 0 ? missed : all;
}

function dailyGoalDisplay(goal) {
  return {
    label: goal.completed ? "Goal done!" : "Daily goal",
    current: goal.progress,
    target: goal.target,
    description: `Meta diária: ${goal.label}, ${goal.progress} de ${goal.target}`,
  };
}

// Quando nenhuma meta do dia andou, o anel mostra o progresso da aula.
function lessonProgressDisplay(done, total) {
  return {
    label: "Lesson",
    current: done,
    target: total,
    description: `Progresso da lição: ${done} de ${total}`,
  };
}

// "22 years old." -> "22 years old", para entrar no meio da frase.
const answerInline = (text) => String(text).replace(/\.$/, "");

// Perguntas do Story Mode: escolhe a alternativa, confere no Check e o
// resultado sobe num painel com o mascote. O XP de cada acerto e a projecao
// do LessonScreen (precisao da aula, sem combo); o anel mostra a meta do dia
// que andou com a resposta. Ao errar, `secondChance` (do LessonScreen) deixa
// pagar XP para refazer a pergunta no fim; a precisao conta as perguntas
// unicas, entao acertar na segunda chance sobe a precisao.
//
// Campos da pergunta: question, options, correctAnswer, hint (frase da
// historia), explanation (no acerto) e correction (no erro, entra depois de
// "It's <resposta> —"). Aulas antigas so com `feedbackMessage` usam ele nos
// dois casos.
export function StoryQuestions({
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

  const [steps, setSteps] = useState(() =>
    buildQuestionItems(activity.questions, reviewQuestionKeys),
  );
  // Perguntas desta passagem; as da segunda chance repetem uma que ja conta.
  const [totalQuestions] = useState(() => steps.length);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [right, setRight] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [gained, setGained] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [showHint, setShowHint] = useState(false);
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

  const step = steps[index];
  const { question } = step;
  const hasXp = xpProjection != null;
  const win = checked && picked === question.correctAnswer;
  const lose = checked && !win;
  const isLast = index === steps.length - 1;

  // XP que o proximo acerto renderia na projecao da aula.
  const nextGain = () => {
    const before = projectXp(xpProjection, right, totalQuestions);
    return before == null
      ? 0
      : projectXp(xpProjection, right + 1, totalQuestions) - before;
  };

  const check = () => {
    if (picked === null || answeredStepRef.current === index) return;
    answeredStepRef.current = index;

    const isCorrect = picked === question.correctAnswer;
    const nextRight = right + (isCorrect ? 1 : 0);
    const gain = isCorrect && hasXp ? nextGain() : 0;

    setChecked(true);
    setRight(nextRight);
    if (!step.retry) setAnsweredCount((current) => current + 1);
    setGained((current) => current + gain);
    setLastGain(gain);
    setChanceStatus("idle");
    setAdvancedGoal(undefined);

    // As duas leituras entram na fila do dailyGoals antes e depois do
    // registro que o LessonScreen faz dentro do onAttempt, entao a
    // comparacao mostra exatamente o que essa resposta mudou.
    const before = isCorrect
      ? dailyGoals.getTodayGoals().catch(() => null)
      : null;
    onAttempt?.({
      isCorrect,
      trackingSuffix: step.suffix,
      exerciseAccuracy: slideAccuracy(nextRight, totalQuestions),
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

  const canOfferSecondChance = !!secondChance && lose && !step.retry;

  const buySecondChance = async () => {
    if (!canOfferSecondChance || buyingRef.current) return;
    if (chanceStatus === "added" || secondChance.balance < secondChance.cost) {
      return;
    }

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

  // Protegido contra toque duplo: sem isso o Continue pulava uma pergunta.
  const advance = () => {
    if (buyingRef.current || advancedStepRef.current === index) return;
    advancedStepRef.current = index;

    if (isLast) {
      next();
      return;
    }

    setPicked(null);
    setChecked(false);
    setShowHint(false);
    setLastGain(0);
    setChanceStatus("idle");
    setIndex((current) => current + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  // Barra de progresso: 3 segmentos, 2 marcos e o trofeu.
  const queueLength = steps.length;
  const progress = index + (checked ? 1 : 0);
  const third = queueLength / 3;
  const segPct = (k) =>
    Math.max(0, Math.min(100, ((progress - k * third) / third) * 100));
  const nodeState = (k) => {
    if (progress < (k + 1) * third - 0.001) return "todo";
    const just = checked && index + 1 >= (k + 1) * third && index < (k + 1) * third;
    return just ? "last" : "done";
  };

  const optionState = (option) => {
    if (checked) {
      if (option === question.correctAnswer) return win ? "win" : "cor";
      return option === picked ? "bad" : "dim";
    }
    return option === picked ? "picked" : "idle";
  };

  const goal = !win
    ? null
    : advancedGoal === undefined
      ? null
      : advancedGoal
        ? dailyGoalDisplay(advancedGoal)
        : lessonProgressDisplay(answeredCount, totalQuestions);

  const winText = question.explanation || question.feedbackMessage;
  const chanceDisabled =
    chanceStatus === "added" ||
    chanceStatus === "buying" ||
    !secondChance ||
    secondChance.balance < secondChance.cost;
  const chanceBody =
    chanceStatus === "added"
      ? chanceCopy.addedBody
      : chanceStatus === "buying"
        ? chanceCopy.buying
        : secondChance && secondChance.balance < secondChance.cost
          ? chanceCopy.noXp
          : chanceStatus === "failed"
            ? chanceCopy.failed
            : chanceCopy.body(secondChance?.cost);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar barStyle="light-content" />

      {/* Barra do topo */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.squareBtn}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <BackIcon color={C.text} />
        </Pressable>
        <View
          style={styles.progress}
          accessible
          accessibilityLabel={`Progresso ${Math.round((progress / queueLength) * 100)} por cento`}
        >
          <Segment pct={segPct(0)} />
          <Node state={nodeState(0)} />
          <Segment pct={segPct(1)} />
          <Node state={nodeState(1)} />
          <Segment pct={segPct(2)} />
          <View style={styles.trophy}>
            <TrophyIcon />
          </View>
        </View>
        <View style={styles.xpPill}>
          <BoltIcon />
          <Text style={styles.xpNum}>{formatXp(userXp + gained)}</Text>
          <Text style={styles.xpLbl}>XP</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaRow}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.qCount}>
              Question <Text style={styles.qNum}>{index + 1}</Text> of {queueLength}
            </Text>
            {step.retry && <Text style={styles.retryTag}>Segunda chance</Text>}
          </View>
          {hasXp ? (
            <View style={styles.xpSmall}>
              <BoltIcon size={14} color={C.muted} />
              <Text style={styles.xpSmallText}>
                {win ? lastGain : nextGain()} XP
              </Text>
              {win && lastGain > 0 && <FloatBadge text={`+${lastGain}`} />}
            </View>
          ) : null}
        </View>

        <View style={{ gap: 14 }}>
          <Text style={styles.question} accessibilityRole="header">
            {question.question}
          </Text>
          <Text style={styles.sub}>
            {activity.questionsSubtitle || "Choose the correct answer."}
          </Text>
        </View>

        <View style={{ gap: 14 }} accessibilityRole="radiogroup">
          {question.options.map((option, optionIndex) => (
            <Option
              key={`${index}-${option}`}
              letter={LETTERS[optionIndex]}
              text={option}
              state={optionState(option)}
              gain={lastGain}
              onPress={() => !checked && setPicked(option)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Antes de conferir: dica + Check */}
      {!checked && (
        <View
          style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}
          pointerEvents="box-none"
        >
          <LinearGradient
            colors={["rgba(14,20,36,0)", C.bg]}
            locations={[0, 0.3]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.bottomRow}>
            {!!question.hint && (
              <Pressable
                onPress={() => setShowHint(true)}
                style={styles.hintBtn}
                accessibilityRole="button"
                accessibilityLabel="Mostrar dica"
              >
                <BulbIcon />
              </Pressable>
            )}
            <Pressable
              onPress={check}
              disabled={picked === null}
              accessibilityRole="button"
              style={[styles.cta, picked === null && styles.ctaOff]}
            >
              <Text style={[styles.ctaText, picked === null && { color: "#7C86A6" }]}>
                Check
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Acerto */}
      {win && (
        <BottomSheet
          key={`win-${index}`}
          handleColor={C.greenHandle}
          borderColor="#2E3857"
          overlay={<Mascot mood="happy" width={68} style={styles.mascotWin} />}
        >
          <View style={styles.resultRow}>
            <Confetti />
            <PopTile color={C.green}>
              <CheckIcon size={30} width={3} />
            </PopTile>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={[styles.resultTitle, { color: C.greenText }]}>
                {WIN_TITLES[index % WIN_TITLES.length]}
              </Text>
              {!!winText && <Text style={styles.resultText}>{winText}</Text>}
            </View>
          </View>
          {(lastGain > 0 || goal) && (
            <View
              style={[styles.infoCard, { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}
            >
              <View style={[styles.infoIcon, { borderColor: C.greenBorder }]}>
                <BoltIcon size={20} color={C.greenText} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.gainBig}>
                  {lastGain > 0 ? `+${lastGain} XP` : `${right} certas`}
                </Text>
                <Text style={styles.infoSub} numberOfLines={1}>
                  {right} de {totalQuestions} certas
                </Text>
              </View>
              {goal ? (
                <>
                  <View
                    style={{ alignItems: "flex-end", gap: 2 }}
                    accessible
                    accessibilityLabel={goal.description}
                  >
                    <Text style={styles.goalLbl}>{goal.label}</Text>
                    <Text style={styles.goalNum}>
                      {Math.min(goal.current, goal.target)}{" "}
                      <Text style={styles.goalOf}>/ {goal.target}</Text>
                    </Text>
                  </View>
                  <Ring progress={goal.current / goal.target} />
                </>
              ) : null}
            </View>
          )}
          <BigButton label="Continue" color={C.greenDark} onPress={advance} />
        </BottomSheet>
      )}

      {/* Erro */}
      {lose && (
        <BottomSheet
          key={`lose-${index}`}
          handleColor={C.redBorder}
          borderColor="#3A2A3A"
          overlay={<Mascot mood="wrong" width={70} style={styles.mascotLose} />}
        >
          <View style={styles.resultRow}>
            <PopTile color={C.red} shake>
              <XIcon size={28} width={3.2} />
            </PopTile>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={[styles.resultTitle, { color: C.redText }]}>Not quite</Text>
              <Text style={styles.resultText}>
                It's{" "}
                <Text style={styles.answerHi}>{answerInline(question.correctAnswer)}</Text>
                {question.correction
                  ? ` — ${question.correction}`
                  : `.${question.feedbackMessage ? ` ${question.feedbackMessage}` : ""}`}
              </Text>
            </View>
          </View>
          {canOfferSecondChance ? (
            <Pressable
              onPress={buySecondChance}
              disabled={chanceDisabled}
              accessibilityRole="button"
              accessibilityState={{
                disabled: chanceDisabled,
                selected: chanceStatus === "added",
                busy: chanceStatus === "buying",
              }}
              style={({ pressed }) => [
                styles.infoCard,
                { backgroundColor: C.redCard, borderColor: C.redBorder },
                chanceStatus !== "added" &&
                  secondChance.balance < secondChance.cost && { opacity: 0.5 },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={[styles.infoIcon, { borderColor: C.redBorder }]}>
                {chanceStatus === "added" ? (
                  <CheckIcon size={18} color={C.redText} />
                ) : (
                  <RetryIcon />
                )}
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={styles.infoTitle}>
                  {chanceStatus === "added" ? chanceCopy.addedTitle : chanceCopy.title}
                </Text>
                <Text style={styles.infoSub}>{chanceBody}</Text>
              </View>
              {chanceStatus === "added" ? null : (
                <View style={styles.redPill}>
                  <BoltIcon size={12} color={C.redText} />
                  <Text style={styles.redPillText}>{secondChance.cost} XP</Text>
                </View>
              )}
            </Pressable>
          ) : question.hint ? (
            <View style={[styles.infoCard, { backgroundColor: C.redCard, borderColor: C.redBorder }]}>
              <View style={[styles.infoIcon, { borderColor: C.redBorder }]}>
                <BookIcon />
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={styles.infoTitle}>Read it again in the story</Text>
                <Text style={styles.infoSub}>“{question.hint}”</Text>
              </View>
            </View>
          ) : (
            <View style={[styles.infoCard, { backgroundColor: C.redCard, borderColor: C.redBorder }]}>
              <View style={[styles.infoIcon, { borderColor: C.redBorder }]}>
                <BookIcon />
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={styles.infoTitle}>Salvo no Meus erros</Text>
                <Text style={styles.infoSub}>Pratique de novo quando quiser em Revisar erros.</Text>
              </View>
            </View>
          )}
          <BigButton
            label="Continue"
            color={C.redDark}
            disabled={chanceStatus === "buying"}
            onPress={advance}
          />
        </BottomSheet>
      )}

      {/* Dica */}
      {showHint && !checked && (
        <BottomSheet
          backdrop
          onClose={() => setShowHint(false)}
          backgroundColor={C.sheet}
          borderColor={C.sheetBorder}
          accessibilityLabel="Dica"
        >
          <View style={styles.hintTop}>
            <View style={styles.hintLabelRow}>
              <BulbIcon size={18} color={C.gold} />
              <Text style={styles.hintLabel}>DICA — LOOK IN THE STORY</Text>
            </View>
            <Pressable
              onPress={() => setShowHint(false)}
              style={styles.sheetClose}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <XIcon size={14} color={C.homeBar} />
            </Pressable>
          </View>
          <Text style={styles.hintText}>“{question.hint}”</Text>
        </BottomSheet>
      )}
    </View>
  );
}

/* ---------- pecas ---------- */

function Segment({ pct }) {
  return (
    <View style={styles.seg}>
      <View style={[styles.segFill, { width: `${pct}%` }]} />
    </View>
  );
}

function Node({ state }) {
  if (state === "todo") return <View style={styles.nodeTodo} />;
  const last = state === "last";
  return (
    <View style={last ? styles.nodeLastRing : null}>
      <View
        style={[
          styles.nodeDone,
          last && { backgroundColor: C.green, width: 30, height: 30, borderRadius: 15 },
        ]}
      >
        <CheckIcon size={13} width={4} />
      </View>
    </View>
  );
}

// state: idle | picked | win (acertou) | cor (certa, mas errou) | bad | dim
function Option({ letter, text, state, gain, onPress }) {
  const look = optionStyles[state];
  const showCheck = state === "win" || state === "cor";
  const card = (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: state === "picked" }}
      style={[styles.opt, look.card]}
    >
      <View style={[styles.ltr, look.ltr]}>
        {showCheck ? (
          <CheckIcon size={20} />
        ) : state === "bad" ? (
          <XIcon size={16} />
        ) : (
          <Text style={[styles.ltrText, look.ltrText]}>{letter}</Text>
        )}
      </View>
      <Text style={styles.optText}>{text}</Text>
      {state === "win" && gain > 0 && (
        <View style={styles.pillXp}>
          <Text style={styles.pillXpText}>+{gain} XP</Text>
        </View>
      )}
      {(state === "cor" || (state === "win" && !(gain > 0))) && (
        <View style={styles.pillCor}>
          <Text style={styles.pillCorText}>Correct</Text>
        </View>
      )}
      {(state === "idle" || state === "picked") && (
        <View style={[styles.radio, state === "picked" && styles.radioOn]} />
      )}
    </Pressable>
  );
  if (state === "win") return <View style={styles.glow}>{card}</View>;
  return card;
}

const optionStyles = {
  idle: { card: {}, ltr: {}, ltrText: {} },
  picked: {
    card: { borderColor: C.accentLight, backgroundColor: C.pickedBg },
    ltr: { backgroundColor: C.accent },
    ltrText: { color: C.white },
  },
  win: {
    card: { borderColor: C.green, borderWidth: 2.5, backgroundColor: C.greenBg },
    ltr: { backgroundColor: C.green },
    ltrText: {},
  },
  cor: {
    card: { borderColor: C.green, borderWidth: 2, backgroundColor: C.greenBg },
    ltr: { backgroundColor: C.green },
    ltrText: {},
  },
  bad: {
    card: { borderColor: C.coral, borderWidth: 2, backgroundColor: C.redBg },
    ltr: { backgroundColor: C.red },
    ltrText: {},
  },
  dim: { card: { opacity: 0.4 }, ltr: {}, ltrText: {} },
};

function FloatBadge({ text }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
  }, [anim]);
  return (
    <Animated.View
      style={[
        styles.floatBadge,
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) },
          ],
        },
      ]}
    >
      <Text style={styles.floatText}>{text}</Text>
    </Animated.View>
  );
}

function PopTile({ color, children, shake }) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }).start();
    if (shake) {
      Animated.sequence(
        [6, -6, 4, -4, 0].map((toValue) =>
          Animated.timing(x, { toValue, duration: 70, useNativeDriver: true }),
        ),
      ).start();
    }
  }, [scale, x, shake]);
  return (
    <View style={[styles.tileRing, { borderColor: color + "33" }]}>
      <Animated.View
        style={[
          styles.tile,
          { backgroundColor: color, transform: [{ scale }, { translateX: x }] },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const CONFETTI = [
  { l: -14, t: -2, w: 7, h: 14, c: C.accent, r: "-28deg" },
  { l: 20, t: -30, w: 5, h: 5, c: C.green, round: true },
  { l: 26, t: -16, w: 5, h: 12, c: C.green, r: "18deg" },
  { l: 48, t: -14, w: 8, h: 8, c: C.orange, round: true },
  { l: -18, t: 60, w: 5, h: 12, c: C.green, r: "60deg" },
  { l: -8, t: 88, w: 9, h: 13, c: C.orange, r: "-40deg" },
  { l: 80, t: 2, w: 5, h: 12, c: C.accentLight, r: "22deg" },
  { l: 80, t: 26, w: 6, h: 6, c: C.accent, round: true },
  { l: 78, t: 70, w: 5, h: 12, c: C.accentLight, r: "-18deg" },
];

function Confetti() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 600, delay: 150, useNativeDriver: true }).start();
  }, [anim]);
  return (
    <>
      {CONFETTI.map((piece, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: piece.l,
            top: piece.t,
            width: piece.w,
            height: piece.h,
            backgroundColor: piece.c,
            borderRadius: piece.round ? piece.w / 2 : 3,
            opacity: anim,
            transform: [
              { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) },
              { rotate: piece.r || "0deg" },
            ],
          }}
        />
      ))}
    </>
  );
}

// O Continue fica bloqueado enquanto a compra da segunda chance esta no ar:
// seguir em frente gastaria o XP sem a pergunta voltar.
function BigButton({ label, color, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.bigBtn,
        { backgroundColor: color, shadowColor: color },
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.88 },
      ]}
    >
      <Text style={styles.bigBtnText}>{label}</Text>
      <ArrowIcon />
    </Pressable>
  );
}

/* ---------- estilos ---------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  squareBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: { flex: 1, flexDirection: "row", alignItems: "center" },
  seg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: C.track, overflow: "hidden" },
  segFill: { height: "100%", backgroundColor: C.accent, borderRadius: 4 },
  nodeTodo: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.bg,
    borderWidth: 3,
    borderColor: C.border,
  },
  nodeDone: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeLastRing: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "rgba(47,174,138,0.25)",
    marginHorizontal: -4,
  },
  trophy: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  xpPill: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: C.greenBg,
    borderWidth: 1,
    borderColor: C.greenBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  xpNum: { fontFamily: F.l600, fontSize: 19, color: C.text, fontVariant: ["tabular-nums"] },
  xpLbl: { fontFamily: F.l600, fontSize: 13, color: C.muted },

  content: { paddingHorizontal: 20, paddingBottom: 420, gap: 22 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 10 },
  qCount: { fontFamily: F.l500, fontSize: 17, color: C.muted },
  qNum: { fontFamily: F.l600, color: C.text },
  retryTag: { fontFamily: F.l600, fontSize: 13, color: C.orange },
  xpSmall: { flexDirection: "row", alignItems: "center", gap: 4 },
  xpSmallText: { fontFamily: F.l600, fontSize: 16, color: C.muted },
  floatBadge: {
    position: "absolute",
    right: 0,
    top: -26,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: C.greenDark,
  },
  floatText: { fontFamily: F.l600, fontSize: 17, color: C.white },
  question: {
    fontFamily: F.l700,
    fontSize: 30,
    lineHeight: 39,
    letterSpacing: -0.4,
    color: C.white,
  },
  sub: { fontFamily: F.l400, fontSize: 17, lineHeight: 26, color: C.muted },

  opt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    minHeight: 68,
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 14,
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 20,
  },
  glow: {
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "rgba(47,174,138,0.2)",
    margin: -5,
  },
  ltr: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: C.chip,
    alignItems: "center",
    justifyContent: "center",
  },
  ltrText: { fontFamily: F.l600, fontSize: 16, color: C.muted },
  optText: { flex: 1, fontFamily: F.l500, fontSize: 19, color: C.text },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: C.radio },
  radioOn: { borderWidth: 7, borderColor: C.accentLight },
  pillXp: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, backgroundColor: C.greenDark },
  pillXpText: { fontFamily: F.l600, fontSize: 15, color: C.white },
  pillCor: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(47,174,138,0.16)",
  },
  pillCorText: { fontFamily: F.l600, fontSize: 15, color: C.greenText },

  bottomBar: { position: "absolute", left: 0, right: 0, bottom: 0, paddingTop: 30, paddingHorizontal: 20 },
  bottomRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  hintBtn: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  cta: {
    flex: 1,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.green,
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ctaOff: { backgroundColor: C.chip, shadowOpacity: 0, elevation: 0 },
  ctaText: { fontFamily: F.l600, fontSize: 19, color: C.white },

  mascotWin: { position: "absolute", right: 42, top: -42, zIndex: 2 },
  mascotLose: { position: "absolute", right: 42, top: -60, zIndex: 2 },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 18 },
  tileRing: { borderRadius: 30, borderWidth: 8 },
  tile: { width: 70, height: 70, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  resultTitle: { fontFamily: F.l700, fontSize: 30, lineHeight: 34, letterSpacing: -0.4 },
  resultText: { fontFamily: F.l400, fontSize: 17, lineHeight: 25, color: C.soft },
  answerHi: { fontFamily: F.l600, color: C.greenText },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: C.bg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: { fontFamily: F.l600, fontSize: 17, color: C.white },
  infoSub: { fontFamily: F.l400, fontSize: 13, lineHeight: 19, color: C.soft },
  gainBig: { fontFamily: F.l700, fontSize: 28, lineHeight: 32, color: C.greenText },
  goalLbl: { fontFamily: F.l500, fontSize: 13, color: C.soft },
  goalNum: { fontFamily: F.l700, fontSize: 18, color: C.white },
  goalOf: { fontFamily: F.l400, color: C.soft },
  redPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.redBorder,
  },
  redPillText: { fontFamily: F.l600, fontSize: 15, color: C.redText },
  bigBtn: {
    height: 62,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  bigBtnText: { fontFamily: F.l600, fontSize: 21, color: C.white },

  hintTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  hintLabelRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  hintLabel: { fontFamily: F.l600, fontSize: 13, letterSpacing: 0.6, color: C.gold },
  sheetClose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2A3456",
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: { fontFamily: F.l500, fontSize: 20, lineHeight: 30, color: C.white },
});
