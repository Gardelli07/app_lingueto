import createLessonScreen from "../../LessonScreen";

// Aula 11 do plano Expressions A1-A2 (FEELINGS): In a good mood
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "in-a-good-mood",
          phrase: "In a good mood",
          meaning: "Happy and friendly.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex12.mp3"),
          image: require("../../../../../assets/EX/A0-A1/in-a-good-mood.webp"),
          meaningCheck: {
            options: [
              { text: "De bom humor", correct: true },
              { text: "Com fome" },
              { text: "Na moda" },
            ],
            answer: "de bom humor",
            correctExplanation:
              "É isso: de bom humor, alegre e simpático.",
            wrongExplanation:
              "É de bom humor. Mood = humor.",
          },
          fillBlank: {
            before: "The boss is smiling and singing today. He's",
            after: ".",
            distractors: ["fed up", "on edge", "under the weather"],
            correctExplanation:
              "Sorrindo e cantando: ele está in a good mood.",
            wrongExplanation:
              "O certo é in a good mood: quem sorri e canta está de bom humor.",
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
