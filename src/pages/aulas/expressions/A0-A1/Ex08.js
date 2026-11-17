import createLessonScreen from "../../LessonScreen";

// Aula 7 do plano Expressions A1-A2 (FEELINGS): Over the moon
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "over-the-moon",
          phrase: "Over the moon",
          meaning: "Very, very happy.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex08.mp3"),
          image: require("../../../../../assets/EX/A0-A1/over-the-moon.webp"),
          meaningCheck: {
            options: [
              { text: "Muito feliz", correct: true },
              { text: "Muito cansado" },
              { text: "Viajando para longe" },
            ],
            answer: "muito feliz",
            correctExplanation:
              "É isso: muito feliz, nas nuvens de alegria!",
            wrongExplanation:
              "É muito feliz. Over the moon é estar radiante de alegria.",
          },
          fillBlank: {
            before: "She passed her driving test, and she's",
            after: "!",
            distractors: ["fed up", "on edge", "feel down"],
            correctExplanation:
              "Ela passou no teste e está over the moon!",
            wrongExplanation:
              "O certo é over the moon: ela está muito feliz porque passou no teste.",
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
