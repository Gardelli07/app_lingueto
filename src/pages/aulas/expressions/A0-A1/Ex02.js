import createLessonScreen from "../../LessonScreen";

// Aula 1 do plano Expressions A1-A2 (MEETING PEOPLE): Nice to meet you
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "nice-to-meet-you",
          phrase: "Nice to meet you",
          meaning: "A polite thing to say when you meet someone for the first time.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex02.mp3"),
          image: require("../../../../../assets/EX/A0-A1/nice-to-meet-you.webp"),
          meaningCheck: {
            options: [
              { text: "Prazer em te conhecer", correct: true },
              { text: "Que bom te ver de novo" },
              { text: "Até logo" },
            ],
            answer: "prazer em te conhecer",
            correctExplanation:
              "É isso: prazer em te conhecer. Usamos na primeira vez que encontramos alguém.",
            wrongExplanation:
              "É prazer em te conhecer. Usamos na primeira vez que encontramos alguém.",
          },
          fillBlank: {
            before: "Hi, Laura! I'm Ben, Tom's brother. It's",
            after: ".",
            distractors: ["long time no see", "take care", "catch up"],
            correctExplanation:
              "Na primeira vez que encontramos alguém, dizemos nice to meet you.",
            wrongExplanation:
              "O certo é nice to meet you: é a primeira vez que Ben e Laura se encontram.",
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
