import React from "react";
import GrammarLabHome from "../grammarlab/GrammarLabHome";
import {
  STORY_MODE_COURSE_NAME,
  STORY_MODE_STORAGE_KEY,
  storyModeModuleDefs,
  storyModeSampleLessons,
} from "./A0-A1";
import {
  STORY_MODE_A2_STORAGE_KEY,
  storyModeA2ModuleDefs,
  storyModeA2SampleLessons,
} from "./A2";

// Story Mode no visual do Grammar Lab: os niveis numa pagina so, um embaixo
// do outro. Cada nivel continua com a propria chave de progresso (e os ids
// das aulas se repetem entre eles), entao cada aula leva o `storageKey` dela
// e o modulo ganha um id unico por nivel.
const STORY_MODE_SOURCES = [
  {
    level: "A1",
    storageKey: STORY_MODE_STORAGE_KEY,
    moduleDefs: storyModeModuleDefs,
    lessons: storyModeSampleLessons,
  },
  {
    level: "A2",
    storageKey: STORY_MODE_A2_STORAGE_KEY,
    moduleDefs: storyModeA2ModuleDefs,
    lessons: storyModeA2SampleLessons,
  },
];

const storyModeLevels = [
  { code: "A1", name: "Básico" },
  { code: "A2", name: "Elementar" },
];

const moduleDefs = STORY_MODE_SOURCES.flatMap((source) =>
  source.moduleDefs.map((moduleItem) => ({
    ...moduleItem,
    id: `${source.level}-${moduleItem.id}`,
    level: source.level,
  })),
);

const lessons = STORY_MODE_SOURCES.flatMap((source) =>
  source.lessons.map((lesson) => ({
    ...lesson,
    module: `${source.level}-${lesson.module}`,
    storageKey: source.storageKey,
  })),
);

function StoryModeScreen({ autoOpenStorageKey, ...props }) {
  return (
    <GrammarLabHome
      {...props}
      courseName={STORY_MODE_COURSE_NAME}
      kicker="HISTÓRIAS EM INGLÊS"
      showDailyGoals={false}
      storageKey={STORY_MODE_STORAGE_KEY}
      moduleDefs={moduleDefs}
      lessons={lessons}
      levels={storyModeLevels}
      autoOpenStorageKey={autoOpenStorageKey}
    />
  );
}

// Rota StoryMode: as aulas do A0-A1 e do A2 voltam para ela (o
// autoOpenStorageKey nos params diz de qual nivel e a proxima aula).
export default function StoryModeHome(props) {
  return <StoryModeScreen {...props} />;
}

// Rota StoryModeA2: mesma pagina, mantida so por compatibilidade. Nada mais
// navega para ela (o tile da Home abre StoryMode rolada ate o nivel).
export function StoryModeA2Home(props) {
  return <StoryModeScreen {...props} autoOpenStorageKey={STORY_MODE_A2_STORAGE_KEY} />;
}
