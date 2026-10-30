import React from "react";
import Gmm01 from "./Gmm01";
import Gmm02 from "./Gmm02";
import Gmm03 from "./Gmm03";
import CourseOverviewScreen from "../../CourseOverviewScreen";

export const GRAMMAR_LAB_STORAGE_KEY = "@curso_progress_grammar_lab_A0-A1";
export const GRAMMAR_LAB_COURSE_NAME = "Grammar Lab";

export const grammarLabModuleDefs = [
  {
    id: 0,
    name: "Basics",
    subtitle: "Gramatica essencial com frases para completar",
    locked: false,
    accent: "#3355FF",
    icon: "check",
  },
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
    <CourseOverviewScreen
      {...props}
      courseName={GRAMMAR_LAB_COURSE_NAME}
      storageKey={GRAMMAR_LAB_STORAGE_KEY}
      moduleDefs={grammarLabModuleDefs}
      lessons={grammarLabSampleLessons}
    />
  );
}
