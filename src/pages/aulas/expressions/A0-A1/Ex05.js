import createLessonScreen from "../../LessonScreen";

// Aula 4 do plano Expressions A1-A2 (MEETING PEOPLE): Take care
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "take-care",
          phrase: "Take care",
          meaning: "A friendly way to say goodbye and wish someone well.",
          meaningPt: "Um jeito carinhoso de se despedir e desejar o bem da pessoa.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex05.mp3"),
          image: require("../../../../../assets/EX/A0-A1/take-care.webp"),
          meaningCheck: {
            options: [
              { text: "Se cuida", correct: true },
              { text: "Cuide da casa" },
              { text: "Preste atenção na aula" },
            ],
            answer: "se cuida",
            correctExplanation:
              "É isso: se cuida! Um tchau carinhoso.",
            wrongExplanation:
              "É se cuida. É um jeito carinhoso de se despedir.",
          },
          fillBlank: {
            before: "OK, I have to go now. Bye, and",
            after: "!",
            distractors: ["catch up", "long time no see", "how's it going"],
            correctExplanation:
              "Para se despedir com carinho: take care!",
            wrongExplanation:
              "O certo é take care: é uma despedida carinhosa.",
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
