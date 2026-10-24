import React from "react";
import CourseOverviewScreen from "../../CourseOverviewScreen";

export const EXPRESSIONS_STORAGE_KEY = "@curso_progress_expressions_A0-A1";
export const EXPRESSIONS_COURSE_NAME = "Expressions";

// curso ainda sem aulas: os modulos e as aulas entram aqui quando forem criados
export const expressionsModuleDefs = [];

export const expressionsSampleLessons = [];

export const lessonScreens = {};

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
