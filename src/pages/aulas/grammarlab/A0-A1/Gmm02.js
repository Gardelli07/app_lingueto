import createLessonScreen from "../../LessonScreen";

// Dica do verb to be, a mesma em todas as perguntas da aula.
const HINT = "I → **am** · he / she / it → **is** · you / we / they → **are**";

// Verb to be com os 5 tipos do Grammar Lab alternados. O combo e o XP seguem
// de um slide para o outro (ComboSlide), entao as telas de x5 e x10 aparecem
// mesmo com um tipo diferente a cada pergunta.
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " Brazilian.",
          options: ["am", "is", "are"],
          correctAnswer: "am",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles estão em casa.",
          answer: ["They", "are", "at", "home"],
          bank: ["are", "home", "They", "is", "in", "at"],
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She is a teacher.",
          options: ["He is a teacher.", "She is a teacher.", "She is at the theater."],
          correctAnswer: "She is a teacher.",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["I am", "Eu sou"],
            ["She is", "Ela é"],
            ["They are", "Eles são"],
            ["We are", "Nós somos"],
          ],
          rightOrder: [2, 0, 3, 1],
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Lucas ",
          after: " 12 years old.",
          answer: "is",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It ",
          after: " cold today.",
          options: ["are", "am", "is"],
          correctAnswer: "is",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você é meu melhor amigo.",
          answer: ["You", "are", "my", "best", "friend"],
          bank: ["best", "are", "You", "is", "friend", "my", "am"],
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We are friends.",
          options: ["We are friends.", "They are friends.", "We are fine."],
          correctAnswer: "We are friends.",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I ",
          after: " not hungry.",
          answer: "am",
          hint: HINT,
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The cat ",
          after: " on the table.",
          options: ["am", "are", "is"],
          correctAnswer: "is",
          hint: HINT,
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
  storageKey: "@curso_progress_grammar_lab_A0-A1",
  nextRouteName: "GrammarLab",
  screenName: "GrammarLabA0A1LessonScreen",
});
