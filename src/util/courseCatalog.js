import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAulasConcluidas } from "../services/progresso";
import { fetchConteudoMaps } from "../services/conteudos";
import { scopedKey } from "./userScope";
import { clearLastLessonDone, loadLastLessonDone } from "./lastLesson";
import {
  BUSSINES_STORAGE_KEY,
  bussinesModuleDefs,
  bussinesSampleLessons,
} from "../pages/aulas/bussines";
import {
  BUSSINES_B1_STORAGE_KEY,
  bussinesB1ModuleDefs,
  bussinesB1SampleLessons,
} from "../pages/aulas/bussines/B1";
import {
  INGLES_COMPLETO_STORAGE_KEY,
  inglesModuleDefs,
  inglesSampleLessons,
} from "../pages/aulas/completo/A0-A1";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_A2_STORAGE_KEY,
  inglesModuleDefs as inglesA2ModuleDefs,
  inglesSampleLessons as inglesA2SampleLessons,
} from "../pages/aulas/completo/A2";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_B1_STORAGE_KEY,
  inglesModuleDefs as inglesB1ModuleDefs,
  inglesSampleLessons as inglesB1SampleLessons,
} from "../pages/aulas/completo/B1";
import {
  TRAVEL_STORAGE_KEY,
  travelModuleDefs,
  travelSampleLessons,
} from "../pages/aulas/viagem/A1";
import {
  GRAMMAR_LAB_STORAGE_KEY,
  GRAMMAR_LAB_COURSE_NAME,
  grammarLabModuleDefs,
  grammarLabSampleLessons,
} from "../pages/aulas/grammarlab/A0-A1";
import {
  EXPRESSIONS_STORAGE_KEY,
  EXPRESSIONS_COURSE_NAME,
  expressionsModuleDefs,
  expressionsSampleLessons,
} from "../pages/aulas/expressions/A0-A1";
import {
  STORY_MODE_STORAGE_KEY,
  STORY_MODE_COURSE_NAME,
  storyModeModuleDefs,
  storyModeSampleLessons,
} from "../pages/aulas/storymode/A0-A1";
import {
  STORY_MODE_A2_STORAGE_KEY,
  storyModeA2ModuleDefs,
  storyModeA2SampleLessons,
} from "../pages/aulas/storymode/A2";

export const COURSE_OPTIONS = [
  "Ingles Completo",
  "Bussines English",
  "Ingles para viagem",
];
export const LEVEL_OPTIONS = [
  "Starter",
  "Elementary",
  "Intermediate",
  "Advanced",
];

export const LEVEL_CONFIG = {
  Starter: {
    folder: "A0-A1",
    routeName: "Inglescompleto",
    storageKey: INGLES_COMPLETO_STORAGE_KEY,
    moduleDefs: inglesModuleDefs,
    lessons: inglesSampleLessons,
    available: true,
  },
  Elementary: {
    folder: "A2",
    routeName: "InglescompletoA2",
    storageKey: INGLES_COMPLETO_A2_STORAGE_KEY,
    moduleDefs: inglesA2ModuleDefs,
    lessons: inglesA2SampleLessons,
    available: true,
  },
  Intermediate: {
    folder: "B1",
    routeName: "InglescompletoB1",
    storageKey: INGLES_COMPLETO_B1_STORAGE_KEY,
    moduleDefs: inglesB1ModuleDefs,
    lessons: inglesB1SampleLessons,
    available: true,
  },
  Advanced: {
    folder: "C1-C2",
    routeName: null,
    storageKey: "@progesso_ingles_completo_C1-C2",
    moduleDefs: [],
    lessons: [],
    available: false,
  },
};

export const COURSE_CONFIG = {
  "Ingles Completo": {
    courseId: "ingles_completo",
    defaultLevel: "Starter",
  },
  "Bussines English": {
    courseId: "bussines",
    defaultLevel: "Starter",
  },
  "Ingles para viagem": {
    courseId: "travel",
    defaultLevel: "Starter",
  },
};

export const BUSINESS_LEVEL_CONFIG = {
  Starter: {
    folder: "A1",
    routeName: "Bussines",
    storageKey: BUSSINES_STORAGE_KEY,
    moduleDefs: bussinesModuleDefs,
    lessons: bussinesSampleLessons,
    available: true,
  },
  Intermediate: {
    folder: "B1",
    routeName: "BussinesB1",
    storageKey: BUSSINES_B1_STORAGE_KEY,
    moduleDefs: bussinesB1ModuleDefs,
    lessons: bussinesB1SampleLessons,
    available: true,
  },
};

export const TRAVEL_LEVEL_CONFIG = {
  Starter: {
    folder: "A1",
    routeName: "TravelEnglish",
    storageKey: TRAVEL_STORAGE_KEY,
    moduleDefs: travelModuleDefs,
    lessons: travelSampleLessons,
    available: true,
  },
};

export const COURSE_LEVEL_AVAILABILITY = {
  "Ingles Completo": ["Starter", "Elementary", "Intermediate"],
  "Bussines English": ["Starter", "Intermediate"],
  "Ingles para viagem": ["Starter"],
};

// Cursos que a Home mostra pelos proprios tiles (COURSE_TILES em Home.js) e
// por isso ficam fora de COURSE_OPTIONS. Entram aqui para os erros, a
// sincronizacao com o servidor, o reset e o "Continue de onde parou"
// enxergarem as aulas deles.
export const EXTRA_COURSES = [
  {
    courseName: EXPRESSIONS_COURSE_NAME,
    level: "Starter",
    config: {
      folder: "A0-A1",
      routeName: "Expressions",
      storageKey: EXPRESSIONS_STORAGE_KEY,
      moduleDefs: expressionsModuleDefs,
      lessons: expressionsSampleLessons,
      available: true,
    },
  },
  {
    courseName: GRAMMAR_LAB_COURSE_NAME,
    level: "Starter",
    config: {
      folder: "A0-A1",
      routeName: "GrammarLab",
      storageKey: GRAMMAR_LAB_STORAGE_KEY,
      moduleDefs: grammarLabModuleDefs,
      lessons: grammarLabSampleLessons,
      available: true,
    },
  },
  {
    courseName: STORY_MODE_COURSE_NAME,
    level: "Starter",
    config: {
      folder: "A0-A1",
      routeName: "StoryMode",
      storageKey: STORY_MODE_STORAGE_KEY,
      moduleDefs: storyModeModuleDefs,
      lessons: storyModeSampleLessons,
      available: true,
    },
  },
  {
    courseName: STORY_MODE_COURSE_NAME,
    level: "Elementary",
    config: {
      folder: "A2",
      routeName: "StoryModeA2",
      storageKey: STORY_MODE_A2_STORAGE_KEY,
      moduleDefs: storyModeA2ModuleDefs,
      lessons: storyModeA2SampleLessons,
      available: true,
    },
  },
];

function allAvailableConfigs() {
  return [
    ...Object.values(LEVEL_CONFIG),
    ...Object.values(BUSINESS_LEVEL_CONFIG),
    ...Object.values(TRAVEL_LEVEL_CONFIG),
    ...EXTRA_COURSES.map((course) => course.config),
  ].filter((config) => config.available);
}

export function getCourseLevelConfig(courseName, level) {
  if (courseName === "Bussines English") {
    return BUSINESS_LEVEL_CONFIG[level] ?? BUSINESS_LEVEL_CONFIG.Starter;
  }
  if (courseName === "Ingles para viagem") {
    return TRAVEL_LEVEL_CONFIG[level] ?? TRAVEL_LEVEL_CONFIG.Starter;
  }
  return LEVEL_CONFIG[level] ?? LEVEL_CONFIG.Starter;
}

export async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function mergeCompletedLessonsIntoStorage(storageKey, lessons, completedScreens) {
  const relevantIds = lessons
    .filter((lesson) => completedScreens.has(lesson.screen))
    .map((lesson) => String(lesson.id));
  if (relevantIds.length === 0) return;

  const current = await loadProgress(storageKey);
  const next = { ...current };
  let changed = false;
  for (const id of relevantIds) {
    if (!next[id]) {
      next[id] = true;
      changed = true;
    }
  }
  if (changed) {
    await AsyncStorage.setItem(await scopedKey(storageKey), JSON.stringify(next));
  }
}

// Restaura, a partir do backend, as aulas que o usuario ja concluiu em
// qualquer aparelho/instalacao. So adiciona conclusoes, nunca remove -
// o progresso local continua sendo a fonte de verdade para o que ja foi
// salvo neste aparelho. O servidor devolve conteudo_ids, que viram telas pelo
// nome_tela (o lesson.id de cada curso recomeca em "1").
export async function syncCourseProgressFromServer() {
  let completedScreens;
  try {
    const [completedIds, { telaPorId }] = await Promise.all([
      fetchAulasConcluidas(),
      fetchConteudoMaps(),
    ]);
    completedScreens = new Set(
      completedIds.map((id) => telaPorId[String(id)]).filter(Boolean),
    );
  } catch {
    return;
  }
  if (completedScreens.size === 0) return;

  await Promise.all(
    allAvailableConfigs().map((config) =>
      mergeCompletedLessonsIntoStorage(
        config.storageKey,
        config.lessons,
        completedScreens,
      ),
    ),
  );
}

// Apaga o progresso local (aulas marcadas como concluidas) de todos os
// cursos/niveis para o usuario ativo. Usado pelo botao "Resetar aulas" do
// perfil - o backend e limpo separadamente via resetarProgresso().
export async function clearAllLocalProgress() {
  await Promise.all([
    ...allAvailableConfigs().map(async (config) => {
      await AsyncStorage.removeItem(await scopedKey(config.storageKey));
    }),
    clearLastLessonDone(),
  ]);
}

export function findLessonByScreen(screen) {
  const found = (config, courseName, level) => {
    const lesson = config.lessons.find((item) => item.screen === screen);
    return lesson
      ? {
          lesson,
          lessons: config.lessons,
          courseName,
          level,
          storageKey: config.storageKey,
        }
      : null;
  };

  for (const courseName of COURSE_OPTIONS) {
    for (const level of LEVEL_OPTIONS) {
      if (!COURSE_LEVEL_AVAILABILITY[courseName]?.includes(level)) continue;
      const config = getCourseLevelConfig(courseName, level);
      if (!config.available) continue;
      const result = found(config, courseName, level);
      if (result) return result;
    }
  }
  for (const course of EXTRA_COURSES) {
    if (!course.config.available) continue;
    const result = found(course.config, course.courseName, course.level);
    if (result) return result;
  }
  return null;
}

// A proxima aula ainda nao concluida depois da ultima feita, no mesmo curso;
// sem nenhuma, a propria ultima aula feita. Null quando nenhuma aula foi feita
// (a Home cai no curso selecionado).
export async function findContinueLesson() {
  const last = await loadLastLessonDone();
  const found = last ? findLessonByScreen(last.screen) : null;
  if (!found) return null;

  const progress = await loadProgress(found.storageKey);
  const lastIndex = found.lessons.findIndex(
    (lesson) => lesson.screen === found.lesson.screen,
  );
  const nextLesson = found.lessons
    .slice(lastIndex + 1)
    .find((lesson) => !progress[lesson.id]);
  const completed = found.lessons.filter((lesson) => progress[lesson.id]).length;

  return {
    lesson: nextLesson || found.lesson,
    lessons: found.lessons,
    percent:
      found.lessons.length > 0 ? (completed / found.lessons.length) * 100 : 0,
  };
}

export async function loadGlobalProgressStats() {
  let completed = 0;
  let total = 0;

  for (const level of LEVEL_OPTIONS) {
    const courses = COURSE_OPTIONS.filter((courseName) =>
      COURSE_LEVEL_AVAILABILITY[courseName]?.includes(level),
    );
    for (const courseName of courses) {
      const config = getCourseLevelConfig(courseName, level);
      if (!config.available) continue;
      const progress = await loadProgress(config.storageKey);
      total += config.lessons.length;
      completed += config.lessons.filter(
        (lesson) => progress[lesson.id],
      ).length;
    }
  }

  return { completed, total };
}
