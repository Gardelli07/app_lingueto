import createLessonScreen from "../../LessonScreen";

// Aula 15 do plano Expressions A1-A2 (FOOD AND EATING OUT): Split the bill
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "split-the-bill",
          phrase: "Split the bill",
          meaning: "Share the cost of a meal.",
          meaningPt: "Dividir o valor de uma refeição.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex16.mp3"),
          image: require("../../../../../assets/EX/A0-A1/split-the-bill.webp"),
          meaningCheck: {
            options: [
              { text: "Dividir a conta", correct: true },
              { text: "Rasgar o papel" },
              { text: "Pedir a conta" },
            ],
            answer: "dividir a conta",
            correctExplanation:
              "É isso: dividir a conta entre todo mundo.",
            wrongExplanation:
              "É dividir a conta. Bill = conta.",
          },
          fillBlank: {
            before: "The meal was $60, so we decided to",
            after: ".",
            distractors: ["help yourself", "have a sweet tooth", "my treat"],
            correctExplanation:
              "A conta deu 60 dólares e eles resolveram split the bill.",
            wrongExplanation:
              "O certo é split the bill: cada um paga uma parte.",
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
