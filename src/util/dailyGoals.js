import AsyncStorage from "@react-native-async-storage/async-storage";
import { scopedKey } from "./userScope";

const STORAGE_KEY = "@lingueto:dailyGoals";
const ONE_HOUR_MS = 60 * 60 * 1000;

// Exercicios que disparam onAttempt varias vezes por slide de um jeito que
// nao corresponde a "uma pergunta respondida" (mesmo motivo pelo qual ja
// ficam de fora do registro de erros em LessonScreen.js).
export const EXERCISE_TYPES_WITHOUT_GOAL_TRACKING = new Set([
  "Exercise1",
  "Exercise2",
  "Exercise7",
  "Exercise10",
]);

// facil = 5 XP, normal = 10 XP, dificil = 15 XP ao completar a meta.
export const DIFFICULTY_REWARD_XP = {
  facil: 5,
  normal: 10,
  dificil: 15,
};

const GOAL_POOL = [
  { id: "lessons_1", label: "Concluir 1 atividade", metric: "lessons", target: 1, icon: "check-circle-outline", difficulty: "facil" },
  { id: "lessons_2", label: "Concluir 2 atividades", metric: "lessons", target: 2, icon: "check-circle-outline", difficulty: "facil" },
  { id: "lessons_3", label: "Concluir 3 atividades", metric: "lessons", target: 3, icon: "check-circle-outline", difficulty: "normal" },
  { id: "lessons_5", label: "Concluir 5 atividades", metric: "lessons", target: 5, icon: "check-circle-outline", difficulty: "dificil" },
  { id: "exercises_10", label: "Responder 10 exercícios", metric: "exercises", target: 10, icon: "pencil-outline", difficulty: "facil" },
  { id: "exercises_15", label: "Responder 15 exercícios", metric: "exercises", target: 15, icon: "pencil-outline", difficulty: "normal" },
  { id: "exercises_25", label: "Responder 25 exercícios", metric: "exercises", target: 25, icon: "pencil-outline", difficulty: "dificil" },
  { id: "correct_10", label: "Acertar 10 questões", metric: "correct", target: 10, icon: "target", difficulty: "facil" },
  { id: "correct_15", label: "Acertar 15 questões", metric: "correct", target: 15, icon: "target", difficulty: "normal" },
  { id: "correct_20", label: "Acertar 20 questões", metric: "correct", target: 20, icon: "target", difficulty: "dificil" },
  { id: "xp_50", label: "Ganhar 50 XP", metric: "xp", target: 50, icon: "star-outline", difficulty: "facil" },
  { id: "xp_100", label: "Ganhar 100 XP", metric: "xp", target: 100, icon: "star-outline", difficulty: "normal" },
  { id: "xp_150", label: "Ganhar 150 XP", metric: "xp", target: 150, icon: "star-outline", difficulty: "normal" },
  { id: "xp_200", label: "Ganhar 200 XP", metric: "xp", target: 200, icon: "star-outline", difficulty: "dificil" },
  { id: "review_1", label: "Fazer uma revisão", metric: "review", target: 1, icon: "history", difficulty: "normal" },
  { id: "two_moments", label: "Estudar em dois momentos diferentes do dia", metric: "twoMoments", target: 1, icon: "clock-outline", difficulty: "normal" },
  { id: "study_10", label: "Completar 10 minutos de estudo", metric: "studyMinutes", target: 10, icon: "timer-outline", difficulty: "facil" },
  { id: "study_20", label: "Completar 20 minutos de estudo", metric: "studyMinutes", target: 20, icon: "timer-outline", difficulty: "normal" },
  { id: "study_30", label: "Completar 30 minutos de estudo", metric: "studyMinutes", target: 30, icon: "timer-outline", difficulty: "dificil" },
  { id: "streak_5", label: "Acertar 5 questões seguidas sem errar", metric: "correctStreak", target: 5, icon: "fire", difficulty: "normal" },
  { id: "streak_8", label: "Acertar 8 questões seguidas sem errar", metric: "correctStreak", target: 8, icon: "fire", difficulty: "dificil" },
  { id: "lesson_90", label: "Concluir uma lição com 90% de acerto ou mais", metric: "lessonAccuracy", target: 90, icon: "medal-outline", difficulty: "normal" },
  { id: "lesson_100", label: "Concluir uma lição com 100% de acerto", metric: "lessonAccuracy", target: 100, icon: "trophy-outline", difficulty: "dificil" },
];

const EMPTY_COUNTERS = {
  lessons: 0,
  exercises: 0,
  correct: 0,
  xp: 0,
  review: 0,
  studyMs: 0,
  currentCorrectStreak: 0,
  bestCorrectStreak: 0,
  bestLessonAccuracy: 0,
};

// Toda operacao le o estado inteiro do AsyncStorage e regrava no fim; sem
// fila, duas chamadas ao mesmo tempo (ex.: addStudyMillis e
// recordExerciseAttempt) podiam sobrescrever o progresso uma da outra. A fila
// tambem garante que uma leitura pedida depois de registrar uma tentativa ja
// enxerga o resultado dela (o Exercise22 usa isso pra mostrar a meta que
// andou com a resposta).
let pending = Promise.resolve();

function serialized(task) {
  const run = pending.then(task);
  pending = run.catch(() => {});
  return run;
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

function pickDailyGoalIds() {
  const groups = new Map();
  GOAL_POOL.forEach((goal) => {
    if (!groups.has(goal.metric)) groups.set(goal.metric, []);
    groups.get(goal.metric).push(goal);
  });

  const chosenGroups = shuffle([...groups.values()]).slice(0, 3);
  return chosenGroups.map((group) => shuffle(group)[0].id);
}

function freshState(carryOverLifetimeBonusXp = 0) {
  return {
    date: todayKey(),
    goalIds: pickDailyGoalIds(),
    counters: { ...EMPTY_COUNTERS },
    firstEventAt: null,
    twoMomentsDone: false,
    rewardedGoalIds: [],
    lifetimeBonusXp: carryOverLifetimeBonusXp,
  };
}

async function loadState() {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(STORAGE_KEY));
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || parsed.date !== todayKey()) {
      // A recompensa em XP acumulada nunca reseta, so o progresso do dia.
      return freshState(parsed?.lifetimeBonusXp || 0);
    }
    return {
      ...parsed,
      counters: { ...EMPTY_COUNTERS, ...parsed.counters },
      rewardedGoalIds: parsed.rewardedGoalIds || [],
      lifetimeBonusXp: parsed.lifetimeBonusXp || 0,
    };
  } catch {
    return freshState();
  }
}

// Concede a recompensa em XP de cada meta do dia exatamente uma vez, no
// momento em que ela cruza o alvo (nao ao reabrir o app com ela ja completa).
function applyRewards(state) {
  state.goalIds.forEach((id) => {
    if (state.rewardedGoalIds.includes(id)) return;
    const goal = GOAL_POOL.find((item) => item.id === id);
    if (!goal) return;
    if (goalProgress(goal, state) >= goal.target) {
      state.rewardedGoalIds.push(id);
      state.lifetimeBonusXp += DIFFICULTY_REWARD_XP[goal.difficulty] || 0;
    }
  });
}

async function saveState(state) {
  await AsyncStorage.setItem(await scopedKey(STORAGE_KEY), JSON.stringify(state));
}

function registerActivityTimestamp(state) {
  const now = Date.now();
  if (state.firstEventAt == null) {
    state.firstEventAt = now;
  } else if (!state.twoMomentsDone && now - state.firstEventAt >= ONE_HOUR_MS) {
    state.twoMomentsDone = true;
  }
}

function goalProgress(goal, state) {
  if (goal.metric === "twoMoments") {
    return state.twoMomentsDone ? 1 : 0;
  }
  if (goal.metric === "studyMinutes") {
    return Math.floor(state.counters.studyMs / 60000);
  }
  if (goal.metric === "correctStreak") {
    return state.counters.bestCorrectStreak ?? 0;
  }
  if (goal.metric === "lessonAccuracy") {
    return state.counters.bestLessonAccuracy ?? 0;
  }
  return state.counters[goal.metric] ?? 0;
}

export function getTodayGoals() {
  return serialized(async () => {
    const state = await loadState();
    applyRewards(state);
    await saveState(state);

    const goals = state.goalIds
      .map((id) => GOAL_POOL.find((goal) => goal.id === id))
      .filter(Boolean)
      .map((goal) => {
        const progress = goalProgress(goal, state);
        return {
          id: goal.id,
          label: goal.label,
          icon: goal.icon,
          metric: goal.metric,
          target: goal.target,
          progress: Math.min(progress, goal.target),
          completed: progress >= goal.target,
          difficulty: goal.difficulty,
          rewardXp: DIFFICULTY_REWARD_XP[goal.difficulty] || 0,
          rewarded: state.rewardedGoalIds.includes(goal.id),
        };
      });

    const bonusXpEarnedToday = goals
      .filter((goal) => goal.rewarded)
      .reduce((sum, goal) => sum + goal.rewardXp, 0);

    return {
      date: state.date,
      goals,
      bonusXpEarnedToday,
      lifetimeBonusXp: state.lifetimeBonusXp,
    };
  });
}

export function recordExerciseAttempt({ isCorrect, exerciseType } = {}) {
  return serialized(async () => {
    if (exerciseType && EXERCISE_TYPES_WITHOUT_GOAL_TRACKING.has(exerciseType)) return;

    const state = await loadState();
    state.counters.exercises += 1;
    if (isCorrect) {
      state.counters.correct += 1;
      state.counters.currentCorrectStreak = (state.counters.currentCorrectStreak || 0) + 1;
      if (state.counters.currentCorrectStreak > (state.counters.bestCorrectStreak || 0)) {
        state.counters.bestCorrectStreak = state.counters.currentCorrectStreak;
      }
    } else {
      state.counters.currentCorrectStreak = 0;
    }
    registerActivityTimestamp(state);
    applyRewards(state);
    await saveState(state);
  });
}

export function recordLessonCompleted({ xp = 0, accuracy } = {}) {
  return serialized(async () => {
    const state = await loadState();
    state.counters.lessons += 1;
    state.counters.xp += xp;
    if (typeof accuracy === "number") {
      state.counters.bestLessonAccuracy = Math.max(
        state.counters.bestLessonAccuracy || 0,
        accuracy,
      );
    }
    registerActivityTimestamp(state);
    applyRewards(state);
    await saveState(state);
  });
}

export function recordReviewCompleted() {
  return serialized(async () => {
    const state = await loadState();
    state.counters.review += 1;
    registerActivityTimestamp(state);
    applyRewards(state);
    await saveState(state);
  });
}

export function addStudyMillis(ms) {
  return serialized(async () => {
    if (!ms || ms <= 0) return;
    const state = await loadState();
    state.counters.studyMs += ms;
    registerActivityTimestamp(state);
    applyRewards(state);
    await saveState(state);
  });
}
