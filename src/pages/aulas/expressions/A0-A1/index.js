import React from "react";
import Ex01 from "./Ex01";
import CourseOverviewScreen from "../../CourseOverviewScreen";

export const EXPRESSIONS_STORAGE_KEY = "@curso_progress_expressions_A0-A1";
export const EXPRESSIONS_COURSE_NAME = "Expressions";

export const expressionsModuleDefs = [
  {
    id: 0,
    name: "Everyday",
    subtitle: "Expressões do dia a dia para usar na conversa",
    locked: false,
    accent: "#3B5BF6",
    icon: "check",
  },
];

export const expressionsSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Break the ice & Call it a day",
    type: "Aula",
    screen: "Ex01",
  },
];

export const lessonScreens = {
  Ex01,
};

export default function ExpressionsScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={EXPRESSIONS_COURSE_NAME}
      storageKey={EXPRESSIONS_STORAGE_KEY}
      moduleDefs={expressionsModuleDefs}
      lessons={expressionsSampleLessons}
    />
  );
}
