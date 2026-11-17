import React from "react";
import CourseOverviewScreen from "../../CourseOverviewScreen";
import { BUSINESS_LEVELS } from "../levels";

// Business A2: ainda sem aulas. Existe para o seletor de nivel ja aparecer;
// as aulas entram aqui no mesmo molde do A0-A1 (lessonScreens + modulos).
export const BUSINESS_A2_STORAGE_KEY = "@curso_progress_business_A2";
export const BUSINESS_COURSE_NAME = "Business";

export const businessA2ModuleDefs = [];

export const businessA2SampleLessons = [];

export const lessonScreens = {};

export default function BusinessA2Screen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={BUSINESS_COURSE_NAME}
      storageKey={BUSINESS_A2_STORAGE_KEY}
      moduleDefs={businessA2ModuleDefs}
      lessons={businessA2SampleLessons}
      levels={BUSINESS_LEVELS}
      currentLevelRoute="BusinessA2"
    />
  );
}
