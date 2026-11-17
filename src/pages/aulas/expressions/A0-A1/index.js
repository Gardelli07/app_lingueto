import React from "react";
import Ex01 from "./Ex01";
import Ex02 from "./Ex02";
import Ex03 from "./Ex03";
import Ex04 from "./Ex04";
import Ex05 from "./Ex05";
import Ex06 from "./Ex06";
import Ex07 from "./Ex07";
import Ex08 from "./Ex08";
import Ex09 from "./Ex09";
import Ex10 from "./Ex10";
import Ex11 from "./Ex11";
import Ex12 from "./Ex12";
import Ex13 from "./Ex13";
import Ex14 from "./Ex14";
import Ex15 from "./Ex15";
import Ex16 from "./Ex16";
import GrammarLabHome from "../../grammarlab/GrammarLabHome";

export const EXPRESSIONS_STORAGE_KEY = "@curso_progress_expressions_A0-A1";
export const EXPRESSIONS_COURSE_NAME = "Expressions";

export const expressionsModuleDefs = [
  {
    id: 0,
    name: "Everyday",
    glyph: "EV",
    level: "A1",
    subtitle: "Expressões do dia a dia para usar na conversa",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
  {
    id: 1,
    name: "Meeting People",
    glyph: "Hi",
    level: "A1",
    subtitle: "Cumprimentar, reencontrar e se despedir",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
  {
    id: 2,
    name: "Feelings",
    glyph: ":)",
    level: "A1",
    subtitle: "Como você está se sentindo",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
  {
    id: 3,
    name: "Food and Eating Out",
    glyph: "$",
    level: "A1",
    subtitle: "Comer fora, pagar e dividir a conta",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
];

export const expressionsLevels = [{ code: "A1", name: "Básico" }];

export const expressionsSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Break the ice & Call it a day",
    type: "Aula",
    screen: "Ex01",
  },
  {
    module: 1,
    id: "2",
    title: "Nice to meet you",
    type: "Aula",
    screen: "Ex02",
  },
  {
    module: 1,
    id: "3",
    title: "Long time no see",
    type: "Aula",
    screen: "Ex03",
  },
  {
    module: 1,
    id: "4",
    title: "How's it going",
    type: "Aula",
    screen: "Ex04",
  },
  {
    module: 1,
    id: "5",
    title: "Take care",
    type: "Aula",
    screen: "Ex05",
  },
  {
    module: 1,
    id: "6",
    title: "See you around",
    type: "Aula",
    screen: "Ex06",
  },
  {
    module: 1,
    id: "7",
    title: "Catch up",
    type: "Aula",
    screen: "Ex07",
  },
  {
    module: 2,
    id: "8",
    title: "Over the moon",
    type: "Aula",
    screen: "Ex08",
  },
  {
    module: 2,
    id: "9",
    title: "Fed up",
    type: "Aula",
    screen: "Ex09",
  },
  {
    module: 2,
    id: "10",
    title: "Under the weather",
    type: "Aula",
    screen: "Ex10",
  },
  {
    module: 2,
    id: "11",
    title: "On edge",
    type: "Aula",
    screen: "Ex11",
  },
  {
    module: 2,
    id: "12",
    title: "In a good mood",
    type: "Aula",
    screen: "Ex12",
  },
  {
    module: 2,
    id: "13",
    title: "Feel down",
    type: "Aula",
    screen: "Ex13",
  },
  {
    module: 3,
    id: "14",
    title: "Grab a bite",
    type: "Aula",
    screen: "Ex14",
  },
  {
    module: 3,
    id: "15",
    title: "My treat",
    type: "Aula",
    screen: "Ex15",
  },
  {
    module: 3,
    id: "16",
    title: "Split the bill",
    type: "Aula",
    screen: "Ex16",
  },
];

export const lessonScreens = {
  Ex01,
  Ex02,
  Ex03,
  Ex04,
  Ex05,
  Ex06,
  Ex07,
  Ex08,
  Ex09,
  Ex10,
  Ex11,
  Ex12,
  Ex13,
  Ex14,
  Ex15,
  Ex16,
};

export default function ExpressionsScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={EXPRESSIONS_COURSE_NAME}
      kicker="EXPRESSÕES DO DIA A DIA"
      showDailyGoals={false}
      storageKey={EXPRESSIONS_STORAGE_KEY}
      moduleDefs={expressionsModuleDefs}
      lessons={expressionsSampleLessons}
      levels={expressionsLevels}
    />
  );
}
