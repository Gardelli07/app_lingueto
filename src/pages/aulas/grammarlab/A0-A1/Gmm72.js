import createLessonScreen from "../../LessonScreen";

// Present simple, aula 14 (How often?): How often…? · every day, once a week,
// twice a month, three times a year. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " do you go to the gym? – Twice a week.",
          options: ["How often", "How many", "When"],
          correctAnswer: "How often",
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Isso aí! “How often do you go to the gym?” = “Com que frequência você vai à academia?”",
          correction:
            "Quase! A resposta é uma frequência, então a pergunta é **How often.**",
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
            ["every day", "todo dia"],
            ["once a week", "uma vez por semana"],
            ["twice a month", "duas vezes por mês"],
            ["three times a year", "três vezes por ano"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **once** = 1 vez · **twice** = 2 vezes · **three times** = 3 vezes.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I go to the cinema once a month.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm72S3.mp3"),
          options: [
            "I go to the cinema once a week.",
            "I go to the cinema once a month.",
            "I go to the cinema twice a month.",
          ],
          correctAnswer: "I go to the cinema once a month.",
          hint: "Escute **once** ou **twice**, e **week** ou **month**.",
          explanation:
            "Ótimo ouvido! “I go to the cinema once a month” = “Eu vou ao cinema uma vez por mês.”",
          correction:
            "A frase é **I go to the cinema once a month.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I play tennis ",
          after: " a week.",
          answer: "twice",
          instruction: "Type the word for “duas vezes”.",
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Isso! “I play tennis twice a week” = “Eu jogo tênis duas vezes por semana.”",
          correction: "A palavra certa é **twice** (duas vezes).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Com que frequência você estuda?",
          answer: ["How", "often", "do", "you", "study"],
          bank: ["often", "you", "How", "do", "study", "does", "many"],
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Perfeito! “How often do you study?” = “Com que frequência você estuda?”",
          correction:
            "O certo é **How often do you study?** How often + do + you + study.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She visits her grandma every ",
          after: ".",
          options: ["Sundays", "Sunday", "on Sunday"],
          correctAnswer: "Sunday",
          hint:
            "Depois de **every**, a palavra fica no singular: every Sunday, every day.",
          explanation:
            "Mandou bem! “She visits her grandma every Sunday” = “Ela visita a avó todo domingo.”",
          correction: "Quase! Depois de every, use o singular: **every Sunday.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We eat pizza ",
          after: " a week.",
          answer: "once",
          instruction: "Type the word for “uma vez”.",
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Isso! “We eat pizza once a week” = “Nós comemos pizza uma vez por semana.”",
          correction: "A resposta é **once** (uma vez).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele vai ao médico uma vez por ano.",
          answer: ["He", "goes", "to", "the", "doctor", "once", "a", "year"],
          bank: ["goes", "the", "He", "to", "doctor", "once", "a", "year", "go", "twice"],
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Muito bem! “He goes to the doctor once a year” = “Ele vai ao médico uma vez por ano.”",
          correction:
            "O certo é **He goes to the doctor once a year.** A frequência vai no final.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "How often does she run?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm72S9.mp3"),
          options: [
            "How long does she run?",
            "How often do you run?",
            "How often does she run?",
          ],
          correctAnswer: "How often does she run?",
          hint: "Escute **often** ou **long**, e **does she** ou **do you**.",
          explanation:
            "Perfeito! “How often does she run?” = “Com que frequência ela corre?”",
          correction:
            "A frase é **How often does she run?** Use o botão 0.5× para ouvir “often”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I brush my teeth three ",
          after: " a day.",
          options: ["time", "once", "times"],
          correctAnswer: "times",
          hint: "A partir de 3: **three times, four times**…",
          explanation:
            "Mandou bem! “Three times a day” = “Três vezes por dia.” Lição completa! 🎉",
          correction: "Quase lá! Três vezes = **three times.**",
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
