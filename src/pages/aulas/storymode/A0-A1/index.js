import React from "react";
import Hi01 from "./Hi01";
import Hi02 from "./Hi02";
import CourseOverviewScreen from "../../CourseOverviewScreen";
import { STORY_MODE_LEVELS } from "../levels";

export const STORY_MODE_STORAGE_KEY = "@curso_progress_story_mode_A0-A1";
export const STORY_MODE_COURSE_NAME = "Story Mode";

export const storyModeModuleDefs = [
  {
    id: 0,
    name: "Stories",
    subtitle: "Historias curtas com perguntas de interpretacao",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const storyModeSampleLessons = [
  {
    module: 0,
    id: "1",
    title: "Alex's Saturday",
    type: "Aula",
    screen: "Hi01",
  },
  {
    module: 0,
    id: "2",
    title: "Lucas's Family",
    type: "Aula",
    screen: "Hi02",
  },
];

export const lessonScreens = {
  Hi01,
  Hi02,
};

export default function StoryModeScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={STORY_MODE_COURSE_NAME}
      storageKey={STORY_MODE_STORAGE_KEY}
      moduleDefs={storyModeModuleDefs}
      lessons={storyModeSampleLessons}
      levels={STORY_MODE_LEVELS}
      currentLevelRoute="StoryMode"
    />
  );
}
