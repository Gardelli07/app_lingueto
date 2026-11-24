import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 4 (Will questions): Will you…? · Yes, I will. / No, I
// won't. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you come to my party? – Yes, I will.",
          options: ["Do", "Will", "Are"],
          correctAnswer: "Will",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation:
            "Isso aí! “Will you come to my party?” = “Você vai vir à minha festa?”",
          correction:
            "Quase! A resposta usa “will”, então a pergunta é **Will you come?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você vai me ajudar?",
          answer: ["Will", "you", "help", "me"],
          bank: ["help", "me", "Will", "you", "Do", "helps"],
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Perfeito! “Will you help me?” = “Você vai me ajudar?”",
          correction: "O certo é **Will you help me?** Will + you + help.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Will it rain tomorrow?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm107S3.mp3"),
          options: [
            "It will rain tomorrow.",
            "Will it rain tomorrow?",
            "Will it rain today?",
          ],
          correctAnswer: "Will it rain tomorrow?",
          hint: "Escute o começo (**Will it** = pergunta) e **tomorrow** ou **today**.",
          explanation: "Ótimo ouvido! “Will it rain tomorrow?” = “Vai chover amanhã?”",
          correction:
            "A frase é **Will it rain tomorrow?** Ela começa com “Will”, por isso é pergunta.",
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
            ["Will you come?", "Yes, I will."],
            ["Will she win?", "No, she won't."],
            ["Will they call?", "Yes, they will."],
            ["Will it work?", "No, it won't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta repete o sujeito: **you → I** · **she → she** · **they → they** · **it → it**.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Will he be OK? – Yes, he ",
          after: ".",
          answer: "will",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Isso! “Yes, he will” = “Sim, vai.”",
          correction: "A palavra certa é **will**: Yes, he will.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Will you marry me? – Yes, I ",
          after: "!",
          options: ["do", "am", "will"],
          correctAnswer: "will",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Mandou bem! “Yes, I will!” = “Sim, eu caso!”",
          correction: "Quase! A pergunta usa “Will”: **Yes, I will!**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela vai passar na prova? Sim, vai.",
          answer: ["Yes,", "she", "will"],
          bank: ["will", "she", "No,", "Yes,", "won't", "does"],
          instruction: "Build the short answer.",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Muito bem! “Yes, she will” = “Sim, vai.”",
          correction: "O certo é **Yes, she will.**",
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
          after: " your mom be at home tonight? – Yes, she will.",
          answer: "Will",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation:
            "Isso! “Will your mom be at home tonight?” = “Sua mãe vai estar em casa hoje à noite?”",
          correction: "A resposta é **Will**: a resposta usa will.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, I won't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm107S9.mp3"),
          options: ["No, I don't.", "No, I won't.", "Yes, I will."],
          correctAnswer: "No, I won't.",
          hint: "Escute **Yes** ou **No**, e o final: **won't** ou **don't**.",
          explanation: "Perfeito! “No, I won't” = “Não, não vou.”",
          correction: "A frase é **No, I won't.** Use o botão 0.5× para ouvir “won't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Will they be late? – No, they ",
          after: ".",
          options: ["won't", "don't", "aren't"],
          correctAnswer: "won't",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation:
            "Mandou bem! “No, they won't” = “Não, não vão.” Lição completa! 🎉",
          correction: "Quase lá! A pergunta usa “Will”: **No, they won't.**",
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
  ptToggle: true,
  nextRouteName: "GrammarLab",
  screenName: "GrammarLabA0A1LessonScreen",
});
