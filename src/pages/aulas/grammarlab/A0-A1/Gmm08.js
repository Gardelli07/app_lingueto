import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 5 (Short answers): Yes, I can. / No, I can't. · Yes, she can. / No, she can't.
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can you swim? – Yes, I ",
          after: ".",
          options: ["do", "can", "am"],
          correctAnswer: "can",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Isso aí! “Yes, I can” = “Sim, sei.”",
          correction: "Quase! A pergunta usa “Can”: **Yes, I can.**",
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
            ["Can you cook?", "Yes, I can."],
            ["Can she drive?", "No, she can't."],
            ["Can they come?", "Yes, they can."],
            ["Can it fly?", "No, it can't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
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
          say: "No, I can't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm08S3.mp3"),
          options: ["Yes, I can.", "No, I can't.", "No, I don't."],
          correctAnswer: "No, I can't.",
          hint: "Escute **Yes** ou **No**, e o final: **can't** ou **don't**.",
          explanation: "Ótimo ouvido! “No, I can't” = “Não, não sei / não posso.”",
          correction: "A frase é **No, I can't.** Use o botão 0.5× para ouvir “can't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Can he speak English? – Yes, he ",
          after: ".",
          answer: "can",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Isso! “Yes, he can” = “Sim, sabe.”",
          correction: "A palavra certa é **can**: a pergunta usa Can.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você sabe dançar? Não, não sei.",
          answer: ["No,", "I", "can't"],
          bank: ["can't", "I", "Yes,", "No,", "don't", "can"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Perfeito! “No, I can't” = “Não, não sei.”",
          correction:
            "O certo é **No, I can't.** A pergunta usa can, então a resposta também.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can your sister sing? – No, she ",
          after: ".",
          options: ["can't", "doesn't", "isn't"],
          correctAnswer: "can't",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Mandou bem! “No, she can't” = “Não, ela não sabe.”",
          correction: "Quase! A pergunta usa “Can”: **No, she can't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Can I come in? – Yes, you ",
          after: ".",
          answer: "can",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Isso! “Yes, you can” = “Sim, pode.”",
          correction: "A resposta é **can**: Yes, you can.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles podem vir? Sim, podem.",
          answer: ["Yes,", "they", "can"],
          bank: ["can", "they", "No,", "Yes,", "can't", "do"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Muito bem! “Yes, they can” = “Sim, podem.”",
          correction: "O certo é **Yes, they can.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, she can.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm08S9.mp3"),
          options: ["Yes, he can.", "No, she can't.", "Yes, she can."],
          correctAnswer: "Yes, she can.",
          hint: "Escute **Yes** ou **No**, e **she** ou **he**.",
          explanation: "Perfeito! “Yes, she can” = “Sim, ela sabe / pode.”",
          correction: "A frase é **Yes, she can.** Use o botão 0.5× para ouvir “she”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can you help me? – Yes, of course I ",
          after: ".",
          options: ["do", "help", "can"],
          correctAnswer: "can",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation:
            "Mandou bem! “Yes, of course I can” = “Sim, claro que posso.” Lição completa! 🎉",
          correction: "Quase lá! A pergunta usa “Can”: **Yes, of course I can.**",
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
