import createLessonScreen from "../../LessonScreen";

// Aula 14 do plano Expressions A1-A2 (FOOD AND EATING OUT): My treat
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "my-treat",
          phrase: "My treat",
          meaning: "I will pay for this.",
          meaningPt: "Eu pago essa.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex15.mp3"),
          image: require("../../../../../assets/EX/A0-A1/my-treat.webp"),
          meaningCheck: {
            options: [
              { text: "Eu pago", correct: true },
              { text: "Minha comida favorita" },
              { text: "Meu presente de aniversário" },
            ],
            answer: "eu pago",
            correctExplanation:
              "É isso: eu pago, é por minha conta!",
            wrongExplanation:
              "É eu pago. My treat = é por minha conta.",
          },
          fillBlank: {
            before: "Put your wallet away. This dinner is",
            after: "!",
            translation: "Guarda a carteira. Esse jantar é ___!",
            distractors: ["dig in", "split the bill", "grab a bite"],
            correctExplanation:
              "Guarda a carteira: o jantar é my treat!",
            wrongExplanation:
              "O certo é my treat: ele vai pagar o jantar.",
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
