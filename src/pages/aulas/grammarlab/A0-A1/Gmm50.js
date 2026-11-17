import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 8 (Questions): Am I…ing? · Is he / she / it…ing? ·
// Are you / we / they…ing?. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you listening?",
          options: ["Is", "Are", "Do"],
          correctAnswer: "Are",
          hint: "Pergunta: **troque a ordem** → Are you working? / Is she working?",
          explanation: "Isso aí! “Are you listening?” = “Você está ouvindo?”",
          correction: "Quase! Com “you”: **Are you listening?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela está dormindo?",
          answer: ["Is", "she", "sleeping"],
          bank: ["sleeping", "she", "Is", "Does", "She", "is"],
          hint: "Pergunta: **troque a ordem** → Are you working? / Is she working?",
          explanation: "Perfeito! “Is she sleeping?” = “Ela está dormindo?”",
          correction: "O certo é **Is she sleeping?** Na pergunta, o “is” vem primeiro.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are they coming?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm50S3.mp3"),
          options: ["They are coming.", "Are they coming?", "Are they running?"],
          correctAnswer: "Are they coming?",
          hint: "Escute o começo (**Are they** = pergunta) e **coming** ou **running**.",
          explanation: "Ótimo ouvido! “Are they coming?” = “Eles estão vindo?”",
          correction:
            "A frase é **Are they coming?** Ela começa com “Are”, por isso é pergunta.",
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
            ["Are you working?", "Você está trabalhando?"],
            ["Is he cooking?", "Ele está cozinhando?"],
            ["Is it raining?", "Está chovendo?"],
            ["Are they playing?", "Eles estão jogando?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Pergunta: **troque a ordem** → Are you working? / Is she working?",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **working** = trabalhando · **cooking** = cozinhando · **raining** = chovendo · **playing** = jogando.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " your brother studying?",
          answer: "Is",
          hint: "Your brother = he → **Is**.",
          explanation: "Isso! “Is your brother studying?” = “Seu irmão está estudando?”",
          correction: "A palavra certa é **Is**: your brother = he.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is she ",
          after: " a dress?",
          options: ["wearing", "wear", "wears"],
          correctAnswer: "wearing",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation:
            "Mandou bem! “Is she wearing a dress?” = “Ela está usando um vestido?”",
          correction: "Quase! Na pergunta, o verbo continua com -ing: **wearing.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês estão se divertindo?",
          answer: ["Are", "you", "having", "fun"],
          bank: ["having", "fun", "you", "Are", "Do", "have"],
          hint: "“Se divertir” = **have fun**. Pergunta: Are you having fun?",
          explanation: "Muito bem! “Are you having fun?” = “Vocês estão se divertindo?”",
          correction: "O certo é **Are you having fun?** Are + you + having fun.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Are you ",
          after: " (enjoy) the class?",
          answer: "enjoying",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation:
            "Isso! “Are you enjoying the class?” = “Você está gostando da aula?”",
          correction: "A resposta é **enjoying**: enjoy + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is the baby crying?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm50S9.mp3"),
          options: ["The baby is crying.", "Is the baby trying?", "Is the baby crying?"],
          correctAnswer: "Is the baby crying?",
          hint:
            "Escute o começo (**Is** = pergunta) e **crying** (chorando) ou **trying** (tentando).",
          explanation: "Perfeito! “Is the baby crying?” = “O bebê está chorando?”",
          correction:
            "A frase é **Is the baby crying?** Use o botão 0.5× para ouvir “crying”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " I talking too much?",
          options: ["Am", "Is", "Do"],
          correctAnswer: "Am",
          hint: "**I** sempre combina com **am**, também na pergunta.",
          explanation:
            "Mandou bem! “Am I talking too much?” = “Estou falando demais?” Lição completa! 🎉",
          correction: "Quase lá! Com “I”: **Am I talking…?**",
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
