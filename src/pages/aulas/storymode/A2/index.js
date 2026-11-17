import React from "react";
import A2Hi01 from "./A2Hi01";
import A2Hi02 from "./A2Hi02";
import A2Hi03 from "./A2Hi03";
import A2Hi04 from "./A2Hi04";
import A2Hi05 from "./A2Hi05";

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
  {
    module: 0,
    id: "3",
    title: "Saturday at the Market",
    type: "Aula",
    screen: "A2Hi03",
  },
  {
    module: 0,
    id: "4",
    title: "A Call from Theo",
    type: "Aula",
    screen: "A2Hi04",
  },
  {
    module: 0,
    id: "5",
    title: "Where Is Biscuit?",
    type: "Aula",
    screen: "A2Hi05",
  },
];

export const lessonScreens = {
  A2Hi01,
  A2Hi02,
  A2Hi03,
  A2Hi04,
  A2Hi05,
};

// A tela do curso fica em ../StoryModeHome.js (os dois niveis numa pagina so).
