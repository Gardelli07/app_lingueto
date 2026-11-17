import createLessonScreen from "../../LessonScreen";

// Aula 3 do plano Expressions A1-A2 (MEETING PEOPLE): How's it going
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "hows-it-going",
          phrase: "How's it going",
          meaning: "An informal way to ask how someone is.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex04.mp3"),
          image: require("../../../../../assets/EX/A0-A1/hows-it-going.webp"),
          meaningCheck: {
            options: [
              { text: "Como vão as coisas", correct: true },
              { text: "Para onde você vai" },
              { text: "Quanto custa isso" },
            ],
            answer: "como vão as coisas",
            correctExplanation:
              "É isso: como vão as coisas? É um jeito informal de perguntar como a pessoa está.",
            wrongExplanation:
              "É como vão as coisas? É um jeito informal de perguntar como a pessoa está.",
          },
          fillBlank: {
            before: "Hey, Jake! So,",
            after: "?",
            distractors: ["take care", "see you around", "nice to meet you"],
            correctExplanation:
              "Para perguntar como o amigo está: how's it going?",
            wrongExplanation:
              "O certo é how's it going: estamos perguntando como o Jake está.",
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
