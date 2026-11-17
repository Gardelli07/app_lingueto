import createLessonScreen from "../../LessonScreen";

// Aula 8 do plano Expressions A1-A2 (FEELINGS): Fed up
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "fed-up",
          phrase: "Fed up",
          meaning: "Bored and annoyed with something that has gone on for too long.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex09.mp3"),
          image: require("../../../../../assets/EX/A0-A1/fed-up.webp"),
          meaningCheck: {
            options: [
              { text: "De saco cheio", correct: true },
              { text: "Satisfeito depois de comer" },
              { text: "Muito animado" },
            ],
            answer: "de saco cheio",
            correctExplanation:
              "É isso: de saco cheio! Cuidado: não tem nada a ver com comida.",
            wrongExplanation:
              "É de saco cheio. Apesar do “fed”, não tem nada a ver com comida.",
          },
          fillBlank: {
            before: "It's rained every day for two weeks. I'm so",
            after: "!",
            distractors: ["over the moon", "in a good mood", "feel down"],
            correctExplanation:
              "Duas semanas de chuva: fed up!",
            wrongExplanation:
              "O certo é fed up: ninguém aguenta duas semanas de chuva.",
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
