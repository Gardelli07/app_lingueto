import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 9 (Going to questions): Are you going to…? · Is she
// going to…? · Yes, I am. / No, she isn't. Os 5 tipos do Grammar Lab
// alternados, uma pergunta por slide. O combo e o XP seguem de um slide para
// o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o painel
// de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you going to come?",
          options: ["Do", "Are", "Will"],
          correctAnswer: "Are",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Isso aí! “Are you going to come?” = “Você vai vir?”",
          correction: "Quase! Com going to: **Are you going to…?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela vai trabalhar amanhã?",
          answer: ["Is", "she", "going", "to", "work", "tomorrow"],
          bank: ["going", "to", "Is", "she", "work", "tomorrow", "Does", "Are"],
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation:
            "Perfeito! “Is she going to work tomorrow?” = “Ela vai trabalhar amanhã?”",
          correction: "O certo é **Is she going to work tomorrow?** Is + she + going to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are they going to win?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm112S3.mp3"),
          options: [
            "They are going to win.",
            "Are they going to win?",
            "Are they going to wait?",
          ],
          correctAnswer: "Are they going to win?",
          hint: "Escute o começo (**Are they** = pergunta) e **win** ou **wait**.",
          explanation: "Ótimo ouvido! “Are they going to win?” = “Eles vão ganhar?”",
          correction:
            "A frase é **Are they going to win?** Ela começa com “Are”, por isso é pergunta.",
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
            ["Are you going to eat?", "Yes, I am."],
            ["Is he going to come?", "No, he isn't."],
            ["Are they going to stay?", "Yes, they are."],
            ["Is it going to rain?", "No, it isn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta repete o sujeito: **you → I** · **he → he** · **they → they** · **it → it**.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Is Lucas going to play? – Yes, he ",
          after: ".",
          answer: "is",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Isso! “Yes, he is” = “Sim, vai.”",
          correction: "A palavra certa é **is**: a pergunta usa “Is”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are you going to study tonight? – No, ",
          after: ".",
          options: ["I'm not", "I don't", "I doesn't"],
          correctAnswer: "I'm not",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Mandou bem! “No, I'm not” = “Não, não vou.”",
          correction: "Quase! A pergunta usa “Are”: **No, I'm not.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês vão viajar? Sim, vamos.",
          answer: ["Yes,", "we", "are"],
          bank: ["are", "we", "Yes,", "No,", "will", "going"],
          instruction: "Build the short answer.",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Muito bem! “Yes, we are” = “Sim, vamos.”",
          correction:
            "O certo é **Yes, we are.** Na resposta curta, não repita “going to”.",
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
          after: " your sister going to visit us?",
          answer: "Is",
          hint: "Your sister = she → **Is**.",
          explanation:
            "Isso! “Is your sister going to visit us?” = “Sua irmã vai nos visitar?”",
          correction: "A resposta é **Is**: your sister = she.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is it going to be cold?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm112S9.mp3"),
          options: [
            "It's going to be cold.",
            "Is it going to be hot?",
            "Is it going to be cold?",
          ],
          correctAnswer: "Is it going to be cold?",
          hint:
            "Escute o começo (**Is it** = pergunta) e **cold** (frio) ou **hot** (quente).",
          explanation: "Perfeito! “Is it going to be cold?” = “Vai fazer frio?”",
          correction:
            "A frase é **Is it going to be cold?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are we going to take the bus? – Yes, we ",
          after: ".",
          options: ["do", "are", "does"],
          correctAnswer: "are",
          hint:
            "Pergunta: **Are you going to…?** / **Is she going to…?** · Resposta: **Yes, I am.** / **No, she isn't.**",
          explanation: "Mandou bem! “Yes, we are” = “Sim, vamos.” Lição completa! 🎉",
          correction: "Quase lá! A pergunta usa “Are”: **Yes, we are.**",
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
