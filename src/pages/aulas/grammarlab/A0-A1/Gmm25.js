import createLessonScreen from "../../LessonScreen";

// Past simple, aula 11 (Short answers): Yes, I did. / No, she didn't. · (com
// be: Yes, I was.). Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did you like it? – Yes, I ",
          after: ".",
          options: ["did", "was", "liked"],
          correctAnswer: "did",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Isso aí! “Yes, I did” = “Sim, gostei.”",
          correction: "Quase! A pergunta usa “Did”: **Yes, I did.**",
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
            ["Did you go?", "Yes, I did."],
            ["Did she go?", "No, she didn't."],
            ["Did they go?", "Yes, they did."],
            ["Did it work?", "No, it didn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta repete o sujeito: **you → I** · **she → she** · **they → they** · **it → it**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, he didn't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm25S3.mp3"),
          options: ["No, he doesn't.", "No, he didn't.", "Yes, he did."],
          correctAnswer: "No, he didn't.",
          hint: "Escute **Yes** ou **No**, e **didn't** (passado) ou **doesn't**.",
          explanation: "Ótimo ouvido! “No, he didn't” = “Não, ele não.”",
          correction:
            "A frase é **No, he didn't.** Use o botão 0.5× para ouvir “didn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Did Ana call you? – Yes, she ",
          after: ".",
          answer: "did",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Isso! “Yes, she did” = “Sim, ligou.”",
          correction: "A palavra certa é **did**: a pergunta usa Did.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você viu? Não, não vi.",
          answer: ["No,", "I", "didn't"],
          bank: ["didn't", "I", "Yes,", "No,", "saw", "wasn't"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Perfeito! “No, I didn't” = “Não, não vi.”",
          correction:
            "O certo é **No, I didn't.** Na resposta curta, não repita o verbo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Were you tired? – Yes, I ",
          after: ".",
          options: ["did", "was", "were"],
          correctAnswer: "was",
          hint: "Cuidado! A pergunta usa **Were** (be), não Did. Com I → **was**.",
          explanation: "Mandou bem! “Yes, I was” = “Sim, estava.”",
          correction: "Quase! A pergunta usa be (were): **Yes, I was.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Did you finish? – Yes, I ",
          after: ".",
          answer: "did",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Isso! “Yes, I did” = “Sim, terminei.”",
          correction: "A resposta é **did**: Did you…? → Yes, I did.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles ganharam? Sim, ganharam.",
          answer: ["Yes,", "they", "did"],
          bank: ["did", "they", "No,", "Yes,", "won", "didn't"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation: "Muito bem! “Yes, they did” = “Sim, ganharam.”",
          correction: "O certo é **Yes, they did.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, we did.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm25S9.mp3"),
          options: ["Yes, we were.", "No, we didn't.", "Yes, we did."],
          correctAnswer: "Yes, we did.",
          hint: "Escute **Yes** ou **No**, e o final: **did** ou **were**.",
          explanation: "Perfeito! “Yes, we did” = “Sim, nós sim.”",
          correction: "A frase é **Yes, we did.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did it rain yesterday? – No, it ",
          after: ".",
          options: ["wasn't", "didn't", "doesn't"],
          correctAnswer: "didn't",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation:
            "Mandou bem! “No, it didn't” = “Não, não choveu.” Lição completa! 🎉",
          correction: "Quase lá! A pergunta usa “Did”: **No, it didn't.**",
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
