import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 7 (Short answers): Respostas curtas: Yes, I am. / No, she
// isn't. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are you Brazilian? – Yes, I ",
          after: ".",
          options: ["am", "are", "is"],
          correctAnswer: "am",
          hint: "Na resposta curta, **repita o sujeito e o verbo**: Yes, I am.",
          explanation: "Isso aí! “Yes, I am” = “Sim, sou.”",
          correction: "Quase! A resposta com “I” leva am: **Yes, I am.**",
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
            ["Are you OK?", "Yes, I am."],
            ["Is she tired?", "No, she isn't."],
            ["Are they here?", "Yes, they are."],
            ["Is it cold?", "No, it isn't."],
          ],
          rightOrder: [3, 2, 0, 1],
          instruction: "Tap a question, then its answer.",
          hint:
            "A resposta repete o sujeito da pergunta: **you → I**, **she → she**, **they → they**, **it → it**.",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta usa o mesmo sujeito da pergunta (**she → she**, **it → it**).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, she is.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm100S3.mp3"),
          options: ["Yes, he is.", "Yes, she is.", "No, she isn't."],
          correctAnswer: "Yes, she is.",
          hint: "Escute o começo (**Yes** ou **No**) e o sujeito (**she** ou **he**).",
          explanation: "Ótimo ouvido! “Yes, she is” = “Sim, ela é / está.”",
          correction:
            "A frase é **Yes, she is.** Use o botão 0.5× para ouvir o “sh” de “she”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele é seu amigo? Sim, é.",
          answer: ["Yes,", "he", "is"],
          bank: ["is", "he's", "No,", "he", "Yes,", "isn't"],
          instruction: "Build the short answer.",
          hint:
            "Resposta curta com Yes não usa contração: **Yes, he is** (e não “Yes, he's”).",
          explanation: "Perfeito! “Yes, he is” = “Sim, ele é.”",
          correction:
            "O certo é **Yes, he is.** Na resposta curta com “Yes”, não use “he's”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Is Ana at home? – Yes, she ",
          after: ".",
          answer: "is",
          hint: "A pergunta usa **is**. A resposta repete o mesmo verbo.",
          explanation: "Isso! “Yes, she is” = “Sim, ela está.”",
          correction:
            "A palavra certa é **is**: Yes, she is. A resposta curta repete o verbo da pergunta.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is it your bag? – No, it ",
          after: ".",
          options: ["is", "isn't", "not"],
          correctAnswer: "isn't",
          hint: "Com No, use a forma negativa: **isn't** ou **aren't**.",
          explanation: "Mandou bem! “No, it isn't” = “Não, não é.”",
          correction: "Quase! Com “No” usamos a negativa: **No, it isn't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês estão prontos? Não, não estamos.",
          answer: ["No,", "we", "aren't"],
          bank: ["aren't", "we", "Yes,", "isn't", "No,", "are"],
          instruction: "Build the short answer.",
          hint:
            "“Vocês” na pergunta vira **we** na resposta. Negativa com we: **aren't**.",
          explanation: "Muito bem! “No, we aren't” = “Não, não estamos.”",
          correction: "O certo é **No, we aren't.** Com “we”, a negativa é “aren't”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, I'm not.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm100S8.mp3"),
          options: ["No, I'm not.", "No, it's not.", "Yes, I am."],
          correctAnswer: "No, I'm not.",
          hint: "Escute o começo (**Yes** ou **No**) e depois **I'm** ou **it's**.",
          explanation: "Perfeito! “No, I'm not” = “Não, não estou / não sou.”",
          correction:
            "A frase é **No, I'm not.** Use o botão 0.5× para ouvir “I'm” devagar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Am I late? – Yes, you ",
          after: ".",
          answer: "are",
          hint: "A pergunta usa I; quem responde fala you. Qual verbo combina com you?",
          explanation: "Isso! “Yes, you are” = “Sim, você está.”",
          correction:
            "A resposta é **are**: Yes, you are. Com “you”, o verbo é sempre “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are you a student? – Yes, ",
          after: ".",
          options: ["I'm", "I am", "I is"],
          correctAnswer: "I am",
          hint: "Resposta curta com Yes termina com o **verbo inteiro**, sem contração.",
          explanation: "Mandou bem! “Yes, I am” = “Sim, sou.” Lição completa! 🎉",
          correction:
            "Quase lá! O certo é **Yes, I am.** Não terminamos a resposta com “I'm”.",
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
