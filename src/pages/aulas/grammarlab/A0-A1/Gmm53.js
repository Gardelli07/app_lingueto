import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 11 (Now!): now, right now, at the moment, this
// week, Look!, Listen!. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["now", "agora"],
            ["right now", "agora mesmo"],
            ["at the moment", "no momento"],
            ["this week", "esta semana"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **now** = agora · **right now** = agora mesmo · **at the moment** = no momento · **this week** = esta semana.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look! It ",
          after: " snowing!",
          options: ["is", "are", "am"],
          correctAnswer: "is",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation: "Isso aí! “Look! It is snowing!” = “Olha! Está nevando!”",
          correction: "Quase! “Look!” mostra que é agora: **It is snowing.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm busy at the moment.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm53S3.mp3"),
          options: [
            "I'm busy right now.",
            "I'm busy at the moment.",
            "I'm happy at the moment.",
          ],
          correctAnswer: "I'm busy at the moment.",
          hint:
            "Escute **busy** (ocupado) ou **happy** (feliz), e **at the moment** ou **right now**.",
          explanation:
            "Ótimo ouvido! “I'm busy at the moment” = “Estou ocupado no momento.”",
          correction:
            "A frase é **I'm busy at the moment.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Listen! The baby is ",
          after: " (cry).",
          answer: "crying",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Isso! “Listen! The baby is crying” = “Escuta! O bebê está chorando.”",
          correction: "A palavra certa é **crying**: cry + ing (o y fica).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela está trabalhando muito esta semana.",
          answer: ["She", "is", "working", "a", "lot", "this", "week"],
          bank: ["working", "a", "She", "lot", "is", "this", "week", "works"],
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Perfeito! “She is working a lot this week” = “Ela está trabalhando muito esta semana.”",
          correction:
            "O certo é **She is working a lot this week.** “This week” = agora, nesta fase.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " a test right now.",
          options: ["do", "are doing", "does"],
          correctAnswer: "are doing",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Mandou bem! “We are doing a test right now” = “Nós estamos fazendo uma prova agora.”",
          correction: "Quase! “Right now” = agora → **are doing.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I am ",
          after: " (read) a great book this month.",
          answer: "reading",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Isso! “I am reading a great book this month” = “Estou lendo um ótimo livro este mês.”",
          correction: "A resposta é **reading**: read + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Olha! O ônibus está chegando.",
          answer: ["Look!", "The", "bus", "is", "coming"],
          bank: ["Look!", "The", "bus", "is", "coming", "comes", "are"],
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Muito bem! “Look! The bus is coming” = “Olha! O ônibus está chegando.”",
          correction:
            "O certo é **Look! The bus is coming.** “Look!” mostra que é agora.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What are you doing right now?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm53S9.mp3"),
          options: [
            "What are you doing tonight?",
            "What is he doing right now?",
            "What are you doing right now?",
          ],
          correctAnswer: "What are you doing right now?",
          hint:
            "Escute **are you** ou **is he**, e o final: **right now** ou **tonight**.",
          explanation:
            "Perfeito! “What are you doing right now?” = “O que você está fazendo agora?”",
          correction:
            "A frase é **What are you doing right now?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Be quiet! The kids ",
          after: " sleeping.",
          options: ["is", "are", "do"],
          correctAnswer: "are",
          hint:
            "Palavras de “agora”: **now, right now, at the moment, this week, Look!, Listen!**",
          explanation:
            "Mandou bem! “The kids are sleeping” = “As crianças estão dormindo.” Lição completa! 🎉",
          correction: "Quase lá! The kids = they → **are sleeping.**",
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
