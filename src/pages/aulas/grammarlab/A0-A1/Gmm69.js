import createLessonScreen from "../../LessonScreen";

// Present simple, aula 11 (Short answers): Yes, I do. / No, I don't. · Yes,
// she does. / No, she doesn't. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Do you like cats? – Yes, I ",
          after: ".",
          options: ["do", "does", "am"],
          correctAnswer: "do",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Isso aí! “Yes, I do” = “Sim, gosto.”",
          correction: "Quase! A pergunta usa “Do”: **Yes, I do.**",
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
            ["Do you swim?", "Yes, I do."],
            ["Does she swim?", "No, she doesn't."],
            ["Do they swim?", "Yes, they do."],
            ["Does it work?", "No, it doesn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
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
          say: "No, he doesn't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm69S3.mp3"),
          options: ["No, she doesn't.", "No, he doesn't.", "Yes, he does."],
          correctAnswer: "No, he doesn't.",
          hint: "Escute **Yes** ou **No**, e **he** ou **she**.",
          explanation: "Ótimo ouvido! “No, he doesn't” = “Não, ele não.”",
          correction: "A frase é **No, he doesn't.** Use o botão 0.5× para ouvir “he”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Does Ana work here? – Yes, she ",
          after: ".",
          answer: "does",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Isso! “Yes, she does” = “Sim, trabalha.”",
          correction: "A palavra certa é **does**: a pergunta usa Does.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você fala inglês? Sim, falo.",
          answer: ["Yes,", "I", "do"],
          bank: ["do", "Yes,", "I", "No,", "speak", "does"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Perfeito! “Yes, I do” = “Sim, falo.”",
          correction:
            "O certo é **Yes, I do.** Na resposta curta, não repita o verbo: use “do”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Do they live here? – No, they ",
          after: ".",
          options: ["doesn't", "don't", "aren't"],
          correctAnswer: "don't",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Mandou bem! “No, they don't” = “Não, não moram.”",
          correction:
            "Quase! A pergunta usa “Do” e a resposta é não: **No, they don't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Do you have a pen? – Yes, I ",
          after: ".",
          answer: "do",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Isso! “Yes, I do” = “Sim, tenho.”",
          correction: "A resposta é **do**: Do you…? → Yes, I do.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele dirige? Não, não dirige.",
          answer: ["No,", "he", "doesn't"],
          bank: ["doesn't", "he", "Yes,", "No,", "don't", "drive"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation: "Muito bem! “No, he doesn't” = “Não, não dirige.”",
          correction: "O certo é **No, he doesn't.** He → doesn't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, we do.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm69S9.mp3"),
          options: ["Yes, we are.", "No, we don't.", "Yes, we do."],
          correctAnswer: "Yes, we do.",
          hint: "Escute **Yes** ou **No**, e o final: **do** ou **are**.",
          explanation: "Perfeito! “Yes, we do” = “Sim, nós sim.”",
          correction: "A frase é **Yes, we do.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Does your dog bite? – No, it ",
          after: ".",
          options: ["don't", "doesn't", "isn't"],
          correctAnswer: "doesn't",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation:
            "Mandou bem! “No, it doesn't” = “Não, não morde.” Lição completa! 🎉",
          correction:
            "Quase lá! A pergunta usa “Does” e a resposta é não: **No, it doesn't.**",
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
