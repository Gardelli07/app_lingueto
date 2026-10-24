import React from "react";
import Hi01 from "./Hi01";
import CourseOverviewScreen from "../../CourseOverviewScreen";

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
];

export const lessonScreens = {
  Hi01,
};

export default function StoryModeScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={STORY_MODE_COURSE_NAME}
      storageKey={STORY_MODE_STORAGE_KEY}
      moduleDefs={storyModeModuleDefs}
      lessons={storyModeSampleLessons}
    />
  );
}
