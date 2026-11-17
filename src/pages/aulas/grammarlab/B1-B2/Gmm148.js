import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 5 (Questions & short answers):
// Have you ever…? / Has she ever…? · Yes, I have. / No, she hasn't. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have you ever been to Paris? – Yes, I ",
          after: ".",
          options: ["have", "did", "am"],
          correctAnswer: "have",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation: "Isso aí! “Yes, I have” = “Sim, já.”",
          correction: "Quase! A pergunta usa “Have”: **Yes, I have.**",
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
            ["Have you ever cooked?", "Yes, I have."],
            ["Has she ever flown?", "No, she hasn't."],
            ["Have they ever met?", "Yes, they have."],
            ["Has it ever snowed here?", "No, it hasn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
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
          say: "No, I haven't.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm148S3.mp3"),
          options: ["No, I didn't.", "No, I'm not.", "No, I haven't."],
          correctAnswer: "No, I haven't.",
          hint: "Escute o final: **haven't**, **didn't** ou **'m not**.",
          explanation: "Ótimo ouvido! “No, I haven't” = “Não, nunca.”",
          correction:
            "A frase é **No, I haven't.** Use o botão 0.5× para ouvir “haven't”.",
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
          after: " your brother ever lived abroad?",
          answer: "Has",
          hint: "Your brother = he → **Has**.",
          explanation:
            "Isso! “Has your brother ever lived abroad?” = “Seu irmão já morou fora?”",
          correction: "A palavra certa é **Has**: your brother = he.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele já viu esse filme? Não, não viu.",
          answer: ["No,", "he", "hasn't"],
          bank: ["No,", "he", "hasn't", "Yes,", "has", "didn't"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation: "Perfeito! “No, he hasn't” = “Não, não viu.”",
          correction: "O certo é **No, he hasn't.** He → hasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Has she ever won a prize? – Yes, she ",
          after: ".",
          options: ["have", "has", "did"],
          correctAnswer: "has",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation: "Mandou bem! “Yes, she has” = “Sim, já ganhou.”",
          correction: "Quase! A pergunta usa “Has”: **Yes, she has.**",
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
          after: " you ever swum in a lake?",
          answer: "Have",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation:
            "Isso! “Have you ever swum in a lake?” = “Você já nadou num lago?”",
          correction: "A resposta é **Have**: you → have.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês já trabalharam juntos? Sim, já.",
          answer: ["Yes,", "we", "have"],
          bank: ["Yes,", "we", "have", "No,", "haven't", "did"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation: "Muito bem! “Yes, we have” = “Sim, já.”",
          correction: "O certo é **Yes, we have.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Has he ever been late?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm148S9.mp3"),
          options: [
            "Has she ever been late?",
            "Has he ever been late?",
            "Was he ever late?",
          ],
          correctAnswer: "Has he ever been late?",
          hint: "Escute **Has he** ou **Has she**, e **been late** ou **Was … late**.",
          explanation:
            "Perfeito! “Has he ever been late?” = “Ele já se atrasou alguma vez?”",
          correction:
            "A frase é **Has he ever been late?** Use o botão 0.5× para ouvir “he”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have your parents ever visited you? – No, they ",
          after: ".",
          options: ["hasn't", "haven't", "didn't"],
          correctAnswer: "haven't",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation:
            "Mandou bem! “No, they haven't” = “Não, nunca visitaram.” Lição completa! 🎉",
          correction: "Quase lá! They → **No, they haven't.**",
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
