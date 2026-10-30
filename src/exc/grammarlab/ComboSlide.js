import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { comboBonusFor, comboRewardFor, formatXp } from "../../util/xp";
import { projectXp, slideAccuracy } from "../../util/exerciseProgress";
import { colors, fonts, praiseFor, timing } from "./theme";
import { BoltIcon, BulbIcon, ChevronLeftIcon, GearIcon, TrophyIcon } from "./icons";
import {
  playCorrect,
  playPair,
  playTick,
  playWrong,
  speakSentence,
  stopSpeaking,
} from "./feedback";
import { ComboChip } from "./ComboChip";
import { FeedbackPanel } from "./FeedbackPanel";
import { FlyingXp } from "./FlyingXp";
import { RewardOverlay } from "./RewardOverlay";
import { ScreenEdge } from "./ScreenEdge";
import { ChoiceExercise } from "./types/ChoiceExercise";
import { BuildExercise } from "./types/BuildExercise";
import { ListenExercise } from "./types/ListenExercise";
import { MatchExercise } from "./types/MatchExercise";
import { normalizeAnswer, TypeExercise } from "./types/TypeExercise";

// `**trecho**` nas mensagens vira destaque (normalmente a resposta).
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

// Linha do painel ALMOST! quando a pergunta nao traz `correction`.
function correctMessage(type, item) {
  switch (type) {
    case "listen":
      return `You heard: “${item.say}”`;
    case "build":
      return `Correct: “${item.answer.join(" ")}.”`;
    case "type":
      return `The correct answer is “${item.answer}”.`;
    case "match":
      return item.pairs.map(([english, portuguese]) => `${english} = ${portuguese}`).join(" · ");
    default:
      return `The correct answer is “${item.correctAnswer}”.`;
  }
}

const TAP_TEXT = {
  listen: "Ouça e toque na frase certa",
  match: "Forme os pares, um de cada vez",
};

// Na revisao de erros so entram as perguntas que estao no Meus erros. Cada
// uma guarda o numero original, que e o `trackingSuffix` (q1, q2...): acertar
// na revisao apaga o erro certo. Sem lista, ou se nenhuma bater (a aula
// mudou), volta todas.
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

// Estado de entrada de cada pergunta, zerado ao avancar.
const RESET_QUESTION = {
  checked: false,
  picked: null,
  correct: false,
  lastBase: 0,
  lastBonus: 0,
  reward: null,
  hint: false,
  built: [],
  typed: "",
  mSel: null,
  matched: [],
  mBad: null,
};

/*
  Motor do Grammar Lab com sistema de combo, usado pelos exercicios
  Exercise22 (choice: completar a lacuna), Exercise24 (build: montar a
  frase), Exercise25 (listen: ouvir), Exercise26 (match: ligar os pares) e
  Exercise27 (type: digitar a resposta). Cada slide tem `activity.questions`
  do seu tipo; o resultado sai na hora (choice/listen/match) ou no Check
  (build/type), e a proxima vem sozinha.

  XP: cada acerto e a projecao do LessonScreen (precisao da aula) mais +5 a
  partir do 2o acerto seguido; o x5 e o x10 abrem a tela de recompensa
  (+10 / +20). Combo e recompensas vao pro onAttempt como `slideBonusXp` e o
  servidor credita como xp_bonus. Sem XP nesta passagem (revisao ou aula ja
  concluida) o combo continua, mas sem XP nem tela de recompensa.

  `comboSession` (do LessonScreen) guarda o combo e o XP mostrado entre
  slides: numa aula que alterna tipos, o combo segue de um exercicio para o
  outro. `lessonPosition` ({ questionOffset, questionTotal }) faz o
  "Question x of y" e a barra contarem a aula inteira. A tela de conclusao e
  a do LessonScreen.
*/
export function ComboSlide({
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
  const { width, height } = useWindowDimensions();
  const [items] = useState(() =>
    buildQuestionItems(activity.questions, reviewQuestionKeys),
  );
  const total = items.length;
  const questionOffset = lessonPosition?.questionOffset ?? 0;
  const questionTotal = Math.max(lessonPosition?.questionTotal ?? total, questionOffset + total);

  const [s, setS] = useState(() => ({
    ...RESET_QUESTION,
    q: 0,
    combo: comboSession?.combo ?? 0,
    lostCombo: 0,
    right: 0,
    // XP mostrado no contador: o que a aula ja rendeu (inclusive em slides
    // anteriores) mais o que este slide for somando.
    gained: comboSession?.gained ?? 0,
    // Combo + recompensas deste slide: vai pro onAttempt como slideBonusXp.
    slideBonus: 0,
    flyKey: 0,
  }));
  const sRef = useRef(s);
  const timer = useRef(null);
  const listenTimer = useRef(null);
  const finishedRef = useRef(false);
  const [speaking, setSpeaking] = useState(false);

  const shake = useRef(new Animated.Value(0)).current;
  const pillScale = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(questionOffset / questionTotal)).current;
  const pillRef = useRef(null);
  const [pillCenter, setPillCenter] = useState({
    x: width - 70,
    y: insets.top + 40,
  });

  // O estado vai pro ref na hora (nao so no proximo render): dois toques
  // rapidos nao respondem a mesma pergunta duas vezes.
  const commit = useCallback((nextState) => {
    sRef.current = nextState;
    setS(nextState);
  }, []);

  const update = (patch) => commit({ ...sRef.current, ...patch });

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (listenTimer.current) clearTimeout(listenTimer.current);
      stopSpeaking();
    };
  }, []);

  const { question: item } = items[Math.min(s.q, total - 1)];
  const hasXp = xpProjection != null;

  const speak = useCallback((text, slow) => {
    speakSentence(text, slow, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, []);

  // No "ouvir", a frase toca sozinha quando a pergunta aparece.
  useEffect(() => {
    if (type !== "listen") return undefined;
    listenTimer.current = setTimeout(() => speak(item.say, false), 450);
    return () => clearTimeout(listenTimer.current);
  }, [type, s.q]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (questionOffset + s.q + (s.checked ? 1 : 0)) / questionTotal,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [s.q, s.checked, questionOffset, questionTotal, progress]);

  const measurePill = useCallback(() => {
    pillRef.current?.measureInWindow((x, y, w, h) => {
      if (w > 0) setPillCenter({ x: x + w / 2, y: y + h / 2 });
    });
  }, []);

  const advance = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    const st = sRef.current;
    if (!st.checked || st.reward) return;
    stopSpeaking();
    if (st.q + 1 >= total) {
      if (finishedRef.current) return;
      finishedRef.current = true;
      next();
      return;
    }
    commit({ ...st, ...RESET_QUESTION, q: st.q + 1 });
  }, [commit, next, total]);

  const schedule = useCallback(
    (ms) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(advance, ms);
    },
    [advance],
  );

  const shakeScreen = () => {
    shake.setValue(0);
    Animated.sequence(
      [-2, 5, -10, 10, -10, 10, -10, 5, -2, 0].map((toValue) =>
        Animated.timing(shake, { toValue, duration: 50, useNativeDriver: true }),
      ),
    ).start();
  };

  const bumpPill = useCallback(() => {
    Animated.sequence([
      Animated.timing(pillScale, { toValue: 1.14, duration: 160, useNativeDriver: true }),
      Animated.spring(pillScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, [pillScale]);

  // XP que o proximo acerto renderia (precisao + combo).
  const nextGainFor = (right, combo) => {
    const before = projectXp(xpProjection, right, total);
    if (before == null) return null;
    return (
      projectXp(xpProjection, right + 1, total) - before + comboBonusFor(combo + 1)
    );
  };

  // Um caminho de resultado para todos os tipos; `extra` traz o estado de
  // entrada final (alternativa, pares...).
  const finish = (ok, extra = {}) => {
    const st = sRef.current;
    if (st.checked) return;
    const { suffix } = items[st.q];

    if (ok) {
      const combo = st.combo + 1;
      const base = hasXp ? nextGainFor(st.right, st.combo) : 0;
      const bonus = hasXp ? comboRewardFor(combo) : 0;
      const reward = bonus > 0 ? (combo === 10 ? "perfect" : "bonus") : null;
      const slideBonus = st.slideBonus + (hasXp ? comboBonusFor(combo) + bonus : 0);
      const gained = st.gained + base + bonus;

      commit({
        ...st,
        ...extra,
        checked: true,
        correct: true,
        combo,
        right: st.right + 1,
        gained,
        slideBonus,
        lastBase: base,
        lastBonus: bonus,
        reward,
        hint: false,
        flyKey: st.flyKey + 1,
      });
      if (comboSession) {
        comboSession.combo = combo;
        comboSession.gained = gained;
      }
      // O som de acerto e o do combo (muteSound desliga o do LessonScreen).
      onAttempt?.({
        isCorrect: true,
        trackingSuffix: suffix,
        exerciseAccuracy: slideAccuracy(st.right + 1, total),
        slideBonusXp: slideBonus,
        muteSound: true,
      });
      measurePill();
      playCorrect(combo);
      if (!reward) schedule(timing.advanceAfterCorrectMs);
      return;
    }

    commit({
      ...st,
      ...extra,
      checked: true,
      correct: false,
      lostCombo: st.combo,
      combo: 0,
      lastBase: 0,
      lastBonus: 0,
      hint: false,
      reward: null,
    });
    if (comboSession) comboSession.combo = 0;
    onAttempt?.({
      isCorrect: false,
      trackingSuffix: suffix,
      exerciseAccuracy: slideAccuracy(st.right, total),
      slideBonusXp: st.slideBonus,
      muteSound: true,
    });
    playWrong();
    shakeScreen();
    schedule(timing.advanceAfterWrongMs);
  };

  // choice + listen: tocar na alternativa ja responde.
  const pickOption = (option) => {
    finish(option === item.correctAnswer, { picked: option });
  };

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
    const right = side === "r" ? pairIndex : st.mSel.idx;
    if (left === right) {
      const matched = [...st.matched, left];
      if (matched.length === item.pairs.length) {
        finish(true, { matched, mSel: null });
      } else {
        update({ matched, mSel: null });
        playPair(matched.length);
      }
    } else {
      finish(false, { mBad: { l: left, r: right }, mSel: null });
    }
  };

  // build + type: conferem no Check.
  const canCheck =
    type === "build"
      ? s.built.length > 0
      : type === "type"
        ? normalizeAnswer(s.typed).length > 0
        : false;
  const submit = () => {
    const st = sRef.current;
    if (st.checked) return;
    if (type === "build") {
      if (!st.built.length) return;
      finish(
        st.built.map((bankIndex) => item.bank[bankIndex]).join(" ") ===
          item.answer.join(" "),
      );
    } else if (type === "type") {
      const value = normalizeAnswer(st.typed);
      if (!value) return;
      finish(value === normalizeAnswer(item.answer));
    }
  };

  const closeReward = () => {
    commit({ ...sRef.current, reward: null });
    schedule(timing.advanceAfterRewardMs);
  };

  // ---- valores da tela ----
  const isLastOfLesson = questionOffset + s.q + 1 >= questionTotal;
  const upcomingCombo = s.combo + 1;
  const headerGain = hasXp
    ? s.checked && s.correct
      ? s.lastBase
      : nextGainFor(s.right, s.combo)
    : null;
  const tipGain = hasXp ? nextGainFor(s.right, s.combo) : null;
  const nextTip =
    isLastOfLesson || !hasXp
      ? null
      : upcomingCombo === 5
        ? "Mais 1 acerto para o bônus de combo!"
        : upcomingCombo === 10
          ? "Mais 1 para a conquista especial!"
          : `Próximo acerto: +${tipGain} XP`;
  const drainMs = s.reward
    ? null
    : s.correct
      ? s.lastBonus > 0
        ? timing.advanceAfterRewardMs
        : timing.advanceAfterCorrectMs
      : timing.advanceAfterWrongMs;

  const needsCheck = type === "build" || type === "type";
  const wrongMessage = item.correction
    ? renderRich(item.correction)
    : correctMessage(type, item);

  const exerciseProps = { item, instruction: activity.instruction, checked: s.checked };

  return (
    <Animated.View style={[styles.root, { transform: [{ translateX: shake }] }]}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.content, { paddingTop: insets.top + 12 }]}
      >
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
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <View style={styles.trophyDot}>
              <TrophyIcon size={15} color="#8e98b8" />
            </View>
          </View>
          <View ref={pillRef} onLayout={measurePill}>
            <Animated.View style={[styles.xpPill, { transform: [{ scale: pillScale }] }]}>
              <BoltIcon size={14} color={colors.greenBright} />
              <Text style={styles.xpValue}>{formatXp(userXp + s.gained)}</Text>
              <Text style={styles.xpUnit}>XP</Text>
            </Animated.View>
          </View>
        </View>

        {/* Pergunta x de y (na aula inteira) */}
        <View style={styles.meta}>
          <View style={styles.gear}>
            <GearIcon color={colors.textSoft} />
          </View>
          <Text style={styles.metaText}>
            Question <Text style={styles.metaStrong}>{questionOffset + s.q + 1}</Text> of{" "}
            {questionTotal}
          </Text>
          <View style={{ flex: 1 }} />
          {headerGain > 0 ? (
            <>
              <BoltIcon size={12} color={colors.accentSoft} />
              <Text style={styles.metaGain}>+{headerGain} XP</Text>
            </>
          ) : null}
        </View>

        {/* Combo */}
        <View style={styles.comboRow}>
          {s.combo > 0 ? (
            <ComboChip combo={s.combo} />
          ) : (
            <Text style={styles.comboHint}>Acerte em sequência para ativar o combo</Text>
          )}
        </View>

        {/* Exercicio */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View key={`q-${s.q}`}>
            {type === "choice" && (
              <ChoiceExercise {...exerciseProps} picked={s.picked} onPick={pickOption} />
            )}
            {type === "listen" && (
              <ListenExercise
                {...exerciseProps}
                picked={s.picked}
                speaking={speaking}
                onSpeak={(slow) => speak(item.say, slow)}
                onPick={pickOption}
              />
            )}
            {type === "build" && (
              <BuildExercise
                {...exerciseProps}
                built={s.built}
                correct={s.correct}
                onAdd={addWord}
                onRemove={removeWord}
              />
            )}
            {type === "match" && (
              <MatchExercise
                {...exerciseProps}
                matched={s.matched}
                selected={s.mSel}
                bad={s.mBad}
                correct={s.correct}
                onPick={pickTile}
              />
            )}
            {type === "type" && (
              <TypeExercise
                {...exerciseProps}
                typed={s.typed}
                correct={s.correct}
                onChange={(typed) => update({ typed })}
                onSubmit={submit}
              />
            )}
          </View>

          {s.hint && !s.checked && !!item.hint && (
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
                accessibilityState={{ selected: s.hint }}
                onPress={() => update({ hint: !sRef.current.hint })}
                style={styles.hintButton}
              >
                <BulbIcon color={colors.hint} />
              </Pressable>
            )}
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
              <Text style={styles.tapHint}>{TAP_TEXT[type] || "Toque na resposta certa"}</Text>
            )}
          </View>
        )}
      </KeyboardAvoidingView>

      {s.checked && (
        <FeedbackPanel
          key={`panel-${s.q}`}
          correct={s.correct}
          praise={praiseFor(s.combo)}
          base={s.lastBase}
          bonus={s.lastBonus}
          combo={s.combo}
          nextTip={nextTip}
          message={wrongMessage}
          lostText={
            s.lostCombo > 0
              ? `Você perdeu o combo x${s.lostCombo}, mas mantém o XP conquistado.`
              : "Sem problema: o XP que você já ganhou continua com você."
          }
          drainMs={drainMs}
          bottomInset={insets.bottom}
        />
      )}

      {s.reward && (
        <RewardOverlay
          variant={s.reward}
          base={s.lastBase}
          bonus={s.lastBonus}
          onClose={closeReward}
        />
      )}

      {s.checked && s.correct && (
        <ScreenEdge
          key={`edge-ok-${s.q}`}
          pattern="correct"
          color={colors.green}
          glow="rgba(52,211,153,0.45)"
        />
      )}
      {s.checked && !s.correct && (
        <ScreenEdge
          key={`edge-bad-${s.q}`}
          pattern="wrong"
          color={colors.orange}
          glow="rgba(255,138,101,0.4)"
        />
      )}

      {s.checked && s.correct && s.lastBase + s.lastBonus > 0 && (
        <FlyingXp
          key={`fly-${s.flyKey}`}
          amount={s.lastBase + s.lastBonus}
          from={{ x: width / 2, y: height - 230 - insets.bottom }}
          to={pillCenter}
          onLand={bumpPill}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, overflow: "hidden" },
  content: { flex: 1, paddingHorizontal: 16 },
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
  meta: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 22 },
  gear: {
    width: 36,
    height: 36,
    borderRadius: 99,
    backgroundColor: "#1e2540",
    alignItems: "center",
    justifyContent: "center",
  },
  metaText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textSoft },
  metaStrong: { fontFamily: fonts.extrabold, color: colors.text },
  metaGain: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.accentSoft,
    marginLeft: -6,
  },
  comboRow: { height: 34, marginTop: 14, justifyContent: "center" },
  comboHint: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted },
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
  highlight: { fontFamily: fonts.extrabold, color: colors.greenBright },
});
