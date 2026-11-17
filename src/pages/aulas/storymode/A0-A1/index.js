import React from "react";
import Hi01 from "./Hi01";
import Hi02 from "./Hi02";
import Hi03 from "./Hi03";
import Hi04 from "./Hi04";
import Hi05 from "./Hi05";

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
  {
    module: 0,
    id: "3",
    title: "A New City",
    type: "Aula",
    screen: "Hi03",
  },
  {
    module: 0,
    id: "4",
    title: "My Neighbor, Jake",
    type: "Aula",
    screen: "Hi04",
  },
  {
    module: 0,
    id: "5",
    title: "The First Day at Work",
    type: "Aula",
    screen: "Hi05",
  },
];

export const lessonScreens = {
  Hi01,
  Hi02,
  Hi03,
  Hi04,
  Hi05,
};

// A tela do curso fica em ../StoryModeHome.js (os dois niveis numa pagina so).
