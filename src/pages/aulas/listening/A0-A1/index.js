import React from "react";
import Lsn01 from "./Lsn01";
import GrammarLabHome from "../../grammarlab/GrammarLabHome";

export const LISTENING_STORAGE_KEY = "@curso_progress_listening_A0-A1";
export const LISTENING_COURSE_NAME = "Listening";

export const listeningModuleDefs = [
  {
    id: 0,
    name: "Everyday English",
    glyph: "EN",
    level: "A1",
    subtitle: "Entenda conversas do dia a dia",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
];

export const listeningLevels = [{ code: "A1", name: "Básico" }];

export const listeningSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Listening: everyday English",
    type: "Aula",
    screen: "Lsn01",
  },
];

export const lessonScreens = {
  Lsn01,
};

export default function ListeningScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={LISTENING_COURSE_NAME}
      kicker="TREINE O OUVIDO"
      showDailyGoals={false}
      storageKey={LISTENING_STORAGE_KEY}
      moduleDefs={listeningModuleDefs}
      lessons={listeningSampleLessons}
      levels={listeningLevels}
    />
  );
}
