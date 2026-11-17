import createLessonScreen from "../../LessonScreen";

// Aula 6 do plano Expressions A1-A2 (MEETING PEOPLE): Catch up
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "catch-up",
          phrase: "Catch up",
          meaning: "Talk with someone about what has happened since you last met.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex07.mp3"),
          image: require("../../../../../assets/EX/A0-A1/catch-up.webp"),
          meaningCheck: {
            options: [
              { text: "Colocar o papo em dia", correct: true },
              { text: "Correr atrás do ônibus" },
              { text: "Pegar alguma coisa" },
            ],
            answer: "colocar o papo em dia",
            correctExplanation:
              "É isso: colocar o papo em dia com alguém que você não vê há tempo.",
            wrongExplanation:
              "É colocar o papo em dia: conversar sobre as novidades desde a última vez.",
          },
          fillBlank: {
            before: "We haven't talked in months! Let's have coffee and",
            after: ".",
            distractors: ["take care", "see you around", "long time no see"],
            correctExplanation:
              "Depois de meses sem conversar, é hora de catch up.",
            wrongExplanation:
              "O certo é catch up: eles vão conversar sobre as novidades.",
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
