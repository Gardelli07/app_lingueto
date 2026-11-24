import createLessonScreen from "../../LessonScreen";

// Aula 5 do plano Expressions A1-A2 (MEETING PEOPLE): See you around
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "see-you-around",
          phrase: "See you around",
          meaning: "An informal goodbye when you don't know when you'll meet again.",
          meaningPt: "Uma despedida informal quando você não sabe quando vai ver a pessoa de novo.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex06.mp3"),
          image: require("../../../../../assets/EX/A0-A1/see-you-around.webp"),
          meaningCheck: {
            options: [
              { text: "A gente se vê por aí", correct: true },
              { text: "Olhe ao seu redor" },
              { text: "Vou te mostrar a cidade" },
            ],
            answer: "a gente se vê por aí",
            correctExplanation:
              "É isso: a gente se vê por aí. Um tchau sem data marcada.",
            wrongExplanation:
              "É a gente se vê por aí. É um tchau quando não sabemos quando vamos nos ver.",
          },
          fillBlank: {
            before: "I don't know when I'll be back here, but",
            after: "!",
            translation: "Não sei quando vou voltar aqui, mas ___!",
            distractors: ["long time no see", "how's it going", "catch up"],
            correctExplanation:
              "Sem data para voltar: see you around!",
            wrongExplanation:
              "O certo é see you around: ele não sabe quando vai voltar.",
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
