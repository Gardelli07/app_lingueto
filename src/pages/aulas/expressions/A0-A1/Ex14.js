import createLessonScreen from "../../LessonScreen";

// Aula 13 do plano Expressions A1-A2 (FOOD AND EATING OUT): Grab a bite
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "grab-a-bite",
          phrase: "Grab a bite",
          meaning: "Eat something quickly.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex14.mp3"),
          image: require("../../../../../assets/EX/A0-A1/grab-a-bite.webp"),
          meaningCheck: {
            options: [
              { text: "Comer alguma coisa rápido", correct: true },
              { text: "Morder alguém" },
              { text: "Pedir a conta" },
            ],
            answer: "comer alguma coisa rápido",
            correctExplanation:
              "É isso: comer alguma coisa rápido, um lanchinho rápido.",
            wrongExplanation:
              "É comer alguma coisa rápido. Grab a bite é fazer uma boquinha.",
          },
          fillBlank: {
            before: "We have 20 minutes before the film. Let's",
            after: ".",
            distractors: ["my treat", "have a sweet tooth", "help yourself"],
            correctExplanation:
              "Com 20 minutos, dá para grab a bite.",
            wrongExplanation:
              "O certo é grab a bite: só dá tempo de comer algo rápido.",
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
