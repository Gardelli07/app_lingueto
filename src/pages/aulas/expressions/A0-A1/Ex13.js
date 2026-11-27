import createLessonScreen from "../../LessonScreen";

// Aula 12 do plano Expressions A1-A2 (FEELINGS): Feel down
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "feel-down",
          phrase: "Feel down",
          meaning: "Feel sad.",
          meaningPt: "Se sentir triste.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex13.mp3"),
          image: require("../../../../../assets/EX/A0-A1/feel-down.webp"),
          meaningCheck: {
            options: [
              { text: "Ficar pra baixo", correct: true },
              { text: "Cair no chão" },
              { text: "Sentir frio" },
            ],
            answer: "ficar pra baixo",
            correctExplanation:
              "É isso: ficar pra baixo, meio triste.",
            wrongExplanation:
              "É ficar pra baixo. Feel down é se sentir triste, desanimado.",
          },
          fillBlank: {
            before: "When it's dark and cold in winter, I sometimes",
            after: ".",
            distractors: ["in a good mood", "on edge", "over the moon"],
            correctExplanation:
              "O inverno escuro faz muita gente feel down.",
            wrongExplanation:
              "O certo é feel down: o inverno escuro deixa a gente triste.",
          },
        },
      ],
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@curso_progress_expressions_A0-A1",
  nextRouteName: "Expressions",
  screenName: "ExpressionsA0A1LessonScreen",
});
