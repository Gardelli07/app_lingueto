import createLessonScreen from "../../LessonScreen";

// Aula 2 do plano Expressions A1-A2 (MEETING PEOPLE): Long time no see
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "long-time-no-see",
          phrase: "Long time no see",
          meaning: "Said when you meet someone you haven't seen for a long time.",
          meaningPt: "Dito quando você encontra alguém que não vê há muito tempo.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex03.mp3"),
          image: require("../../../../../assets/EX/A0-A1/long-time-no-see.webp"),
          meaningCheck: {
            options: [
              { text: "Quanto tempo sem te ver", correct: true },
              { text: "Até amanhã" },
              { text: "Prazer em te conhecer" },
            ],
            answer: "quanto tempo sem te ver",
            correctExplanation:
              "É isso: quanto tempo sem te ver! Usamos quando reencontramos alguém.",
            wrongExplanation:
              "É quanto tempo sem te ver. Usamos quando reencontramos alguém depois de muito tempo.",
          },
          fillBlank: {
            before: "Mark! I haven't seen you since school. Wow,",
            after: "!",
            distractors: ["nice to meet you", "see you around", "catch up"],
            correctExplanation:
              "Eles não se viam desde a escola: long time no see!",
            wrongExplanation:
              "O certo é long time no see: eles não se viam desde a escola.",
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
