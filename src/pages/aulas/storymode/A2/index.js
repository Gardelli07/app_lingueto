import React from "react";
import A2Hi01 from "./A2Hi01";
import A2Hi02 from "./A2Hi02";
import CourseOverviewScreen from "../../CourseOverviewScreen";
import { STORY_MODE_LEVELS } from "../levels";

export const STORY_MODE_A2_STORAGE_KEY = "@curso_progress_story_mode_A2";
export const STORY_MODE_COURSE_NAME = "Story Mode";

export const storyModeA2ModuleDefs = [
  {
    id: 0,
    name: "Stories",
    subtitle: "Histórias mais longas com perguntas de interpretação",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
];

export const storyModeA2SampleLessons = [
  {
    module: 0,
    id: "1",
    title: "The Surprise Party",
    type: "Aula",
    screen: "A2Hi01",
  },
  {
    module: 0,
    id: "2",
    title: "The Wrong Bus",
    type: "Aula",
    screen: "A2Hi02",
  },
];

export const lessonScreens = {
  A2Hi01,
  A2Hi02,
};

export default function StoryModeA2Screen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={STORY_MODE_COURSE_NAME}
      storageKey={STORY_MODE_A2_STORAGE_KEY}
      moduleDefs={storyModeA2ModuleDefs}
      lessons={storyModeA2SampleLessons}
      levels={STORY_MODE_LEVELS}
      currentLevelRoute="StoryModeA2"
    />
  );
}
