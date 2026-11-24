import createLessonScreen from "../../LessonScreen";

// Aula 9 do plano Expressions A1-A2 (FEELINGS): Under the weather
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "under-the-weather",
          phrase: "Under the weather",
          meaning: "A little sick or not feeling well.",
          meaningPt: "Meio doente ou não se sentindo bem.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex10.mp3"),
          image: require("../../../../../assets/EX/A0-A1/under-the-weather.webp"),
          meaningCheck: {
            options: [
              { text: "Meio doente", correct: true },
              { text: "Molhado de chuva" },
              { text: "Com medo de tempestade" },
            ],
            answer: "meio doente",
            correctExplanation:
              "É isso: meio doente, meio indisposto.",
            wrongExplanation:
              "É meio doente. Não tem a ver com o tempo, e sim com a saúde.",
          },
          fillBlank: {
            before: "I'm not coming to work today. I have a headache and I feel a bit",
            after: ".",
            translation: "Não vou trabalhar hoje. Estou com dor de cabeça e me sentindo meio ___.",
            distractors: ["over the moon", "in a good mood", "feel down"],
            correctExplanation:
              "Com dor de cabeça, ele está under the weather.",
            wrongExplanation:
              "O certo é under the weather: ele está com dor de cabeça, meio doente.",
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
