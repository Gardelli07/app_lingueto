import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 9 (Short answers): Yes, I am. / No, I'm not. ·
// Yes, she is. / No, she isn't. · Yes, they are. / No, they aren't. Os 5
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
          before: "Are you working? – Yes, I ",
          after: ".",
          options: ["am", "do", "is"],
          correctAnswer: "am",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
          explanation: "Isso aí! “Yes, I am” = “Sim, estou.”",
          correction: "Quase! A pergunta usa be, não do: **Yes, I am.**",
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
            ["Are you eating?", "Yes, I am."],
            ["Is she sleeping?", "No, she isn't."],
            ["Are they coming?", "Yes, they are."],
            ["Is it raining?", "No, it isn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
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
          say: "No, he isn't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm51S3.mp3"),
          options: ["No, he doesn't.", "No, he isn't.", "Yes, he is."],
          correctAnswer: "No, he isn't.",
          hint: "Escute **Yes** ou **No**, e o final: **isn't** ou **doesn't**.",
          explanation: "Ótimo ouvido! “No, he isn't” = “Não, não está.”",
          correction: "A frase é **No, he isn't.** Use o botão 0.5× para ouvir “isn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Is Ana studying? – Yes, she ",
          after: ".",
          answer: "is",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
          explanation: "Isso! “Yes, she is” = “Sim, está.”",
          correction: "A palavra certa é **is**: a pergunta usa “Is”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você está ouvindo? Sim, estou.",
          answer: ["Yes,", "I", "am"],
          bank: ["am", "Yes,", "I", "No,", "I'm", "do"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta com Yes não usa contração: **Yes, I am** (e não “Yes, I'm”).",
          explanation: "Perfeito! “Yes, I am” = “Sim, estou.”",
          correction: "O certo é **Yes, I am.** Não termine com “I'm”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are they playing? – No, they ",
          after: ".",
          options: ["isn't", "don't", "aren't"],
          correctAnswer: "aren't",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
          explanation: "Mandou bem! “No, they aren't” = “Não, não estão.”",
          correction: "Quase! A pergunta usa “Are”: **No, they aren't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Am I talking too fast? – Yes, you ",
          after: ".",
          answer: "are",
          hint: "Quem responde fala you. Com you → **are**.",
          explanation: "Isso! “Yes, you are” = “Sim, está.”",
          correction: "A resposta é **are**: com you, sempre are.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele está dirigindo? Não, não está.",
          answer: ["No,", "he", "isn't"],
          bank: ["isn't", "he", "Yes,", "No,", "doesn't", "is"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
          explanation: "Muito bem! “No, he isn't” = “Não, não está.”",
          correction:
            "O certo é **No, he isn't.** A pergunta usa be, então a resposta é isn't (não doesn't).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, we are.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm51S9.mp3"),
          options: ["Yes, we do.", "No, we aren't.", "Yes, we are."],
          correctAnswer: "Yes, we are.",
          hint: "Escute **Yes** ou **No**, e o final: **are** ou **do**.",
          explanation: "Perfeito! “Yes, we are” = “Sim, estamos.”",
          correction: "A frase é **Yes, we are.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is it working now? – Yes, it ",
          after: ".",
          options: ["is", "does", "are"],
          correctAnswer: "is",
          hint:
            "Resposta curta: **Yes, I am.** / **No, I'm not.** · **Yes, she is.** / **No, she isn't.** · **Yes, they are.** / **No, they aren't.**",
          explanation: "Mandou bem! “Yes, it is” = “Sim, está.” Lição completa! 🎉",
          correction: "Quase lá! A pergunta usa “Is”: **Yes, it is.**",
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
