import React from "react";
import Gmm01 from "./Gmm01";
import Gmm02 from "./Gmm02";
import Gmm03 from "./Gmm03";
import GrammarLabHome from "../GrammarLabHome";

export const GRAMMAR_LAB_STORAGE_KEY = "@curso_progress_grammar_lab_A0-A1";
export const GRAMMAR_LAB_COURSE_NAME = "Grammar Lab";

// Cada modulo e um topico da tela do Grammar Lab: `glyph` e o simbolo curto
// do quadradinho do card e `level` o nivel (grammarLabLevels) em que aparece.
export const grammarLabModuleDefs = [
  {
    id: 0,
    name: "Verb to be",
    subtitle: "Am, is e are em frases para completar",
    glyph: "be",
    level: "A1",
    locked: false,
    accent: "#3355FF",
    icon: "check",
  },
];

export const grammarLabLevels = [
  { code: "A1", name: "Básico" },
  { code: "A2", name: "Elementar" },
];

// Topicos que ainda nao tem aulas: aparecem bloqueados como "Em breve". Ao
// criar as aulas de um deles, mova-o para grammarLabModuleDefs (com um id).
export const grammarLabUpcomingTopics = [
  { name: "Articles", glyph: "a/an", level: "A1" },
  { name: "Plural nouns", glyph: "+s", level: "A1" },
  { name: "Possessives", glyph: "my", level: "A1" },
  { name: "There is / are", glyph: "there", level: "A1" },
  { name: "Present simple", glyph: "do", level: "A1" },
  { name: "Present continuous", glyph: "-ing", level: "A2" },
  { name: "Can / Can't", glyph: "can", level: "A2" },
  { name: "Past simple", glyph: "-ed", level: "A2" },
  { name: "Going to", glyph: "will", level: "A2" },
];

export const grammarLabSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Verb to be: am, is, are",
    type: "Aula",
    screen: "Gmm01",
  },
  {
    module: 0,
    id: "2",
    title: "Verb to be: mixed practice",
    type: "Aula",
    screen: "Gmm02",
  },
  {
    module: 0,
    id: "3",
    title: "I am / You are",
    type: "Aula",
    screen: "Gmm03",
  },
];

export const lessonScreens = {
  Gmm01,
  Gmm02,
  Gmm03,
};

export default function GrammarLabScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={GRAMMAR_LAB_COURSE_NAME}
      storageKey={GRAMMAR_LAB_STORAGE_KEY}
      moduleDefs={grammarLabModuleDefs}
      lessons={grammarLabSampleLessons}
      levels={grammarLabLevels}
      upcomingTopics={grammarLabUpcomingTopics}
    />
  );
}
