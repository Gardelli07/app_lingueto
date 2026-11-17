import React from "react";
import Pron01 from "./Pron01";
import GrammarLabHome from "../../grammarlab/GrammarLabHome";

// Pronunciation Lab (tile da Home), no visual do Grammar Lab. Curso PR no banco.
export const PRONUNCIATION_STORAGE_KEY = "@curso_progress_pronunciation_A0-A1";
export const PRONUNCIATION_COURSE_NAME = "Pronunciation Lab";

export const pronunciationModuleDefs = [
  {
    id: 0,
    name: "The TH Sounds",
    glyph: "TH",
    level: "A1",
    subtitle: "Os dois sons do TH: /θ/ e /ð/",
    locked: false,
    accent: "#5587C6",
    icon: "check",
  },
];

export const pronunciationLevels = [{ code: "A1", name: "Básico" }];

// Aulas sem `screen` aparecem na lista como "Em breve" (Lessons 2 e 3 ainda
// nao existem).
export const pronunciationLessons = [
  {
    module: 0,
    id: "1",
    title: "The Voiceless TH /θ/",
    type: "Aula",
    screen: "Pron01",
  },
  {
    module: 0,
    id: "2",
    title: "The Voiced TH /ð/",
    type: "Aula",
  },
  {
    module: 0,
    id: "3",
    title: "Both TH Sounds θ + ð",
    type: "Aula",
  },
];

export const lessonScreens = {
  Pron01,
};

export default function PronunciationScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={PRONUNCIATION_COURSE_NAME}
      kicker="TREINE A PRONÚNCIA"
      showDailyGoals={false}
      storageKey={PRONUNCIATION_STORAGE_KEY}
      moduleDefs={pronunciationModuleDefs}
      lessons={pronunciationLessons}
      levels={pronunciationLevels}
    />
  );
}
