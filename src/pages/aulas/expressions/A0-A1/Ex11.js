import createLessonScreen from "../../LessonScreen";

// Aula 10 do plano Expressions A1-A2 (FEELINGS): On edge
const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "on-edge",
          phrase: "On edge",
          meaning: "Nervous and worried.",
          meaningPt: "Nervoso e preocupado.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex11.mp3"),
          image: require("../../../../../assets/EX/A0-A1/on-edge.webp"),
          meaningCheck: {
            options: [
              { text: "Nervoso e tenso", correct: true },
              { text: "À beira da estrada" },
              { text: "Com muita fome" },
            ],
            answer: "nervoso e tenso",
            correctExplanation:
              "É isso: nervoso e tenso, com os nervos à flor da pele.",
            wrongExplanation:
              "É nervoso e tenso. On edge é estar nervoso, ansioso.",
          },
          fillBlank: {
            before: "My exam results come out tomorrow, so I'm a bit",
            after: ".",
            translation: "O resultado da minha prova sai amanhã, então estou meio ___.",
            distractors: ["over the moon", "in a good mood", "feel down"],
            correctExplanation:
              "Esperando o resultado da prova, ele está on edge.",
            wrongExplanation:
              "O certo é on edge: esperar o resultado da prova deixa a gente nervoso.",
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
