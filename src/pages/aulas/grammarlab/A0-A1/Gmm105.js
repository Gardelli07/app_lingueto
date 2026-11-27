import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 2 ('ll): Contrações: I'll · you'll · he'll · she'll ·
// it'll · we'll · they'll. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " call you later.",
          options: ["I'll", "Ill", "I'will"],
          correctAnswer: "I'll",
          instruction: "Choose the short form of “I will”.",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Isso aí! “I'll call you later” = “Eu te ligo mais tarde.”",
          correction: "Quase! I will vira **I'll**, com apóstrofo.",
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
            ["I will", "I'll"],
            ["she will", "she'll"],
            ["we will", "we'll"],
            ["they will", "they'll"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap the full form, then its short form.",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Mandou bem! Todas as contrações certas.",
          correction:
            "Esse par não combina. **will** sempre vira **'ll**: I'll, she'll, we'll, they'll.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She'll be here soon.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm105S3.mp3"),
          options: [
            "He'll be here soon.",
            "She'll be here soon.",
            "She'll be here at noon.",
          ],
          correctAnswer: "She'll be here soon.",
          hint: "Escute **She'll** ou **He'll**, e o final: **soon** ou **at noon**.",
          explanation: "Ótimo ouvido! “She'll be here soon” = “Ela vai chegar logo.”",
          correction:
            "A frase é **She'll be here soon.** Use o botão 0.5× para ouvir “She'll”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We'll = We ",
          after: ".",
          answer: "will",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Isso! “We'll” = “We will”.",
          correction: "A palavra certa é **will**: o 'll vem de will.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles vão chegar tarde.",
          answer: ["They'll", "arrive", "late"],
          bank: ["arrive", "late", "They'll", "Their", "arrives", "is"],
          instruction: "Translate it using the short form.",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Perfeito! “They'll arrive late” = “Eles vão chegar tarde.”",
          correction: "O certo é **They'll arrive late.** They'll = they will.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Don't worry. ",
          after: " help you.",
          options: ["Ill", "I'll", "I will to"],
          correctAnswer: "I'll",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation:
            "Mandou bem! “Don't worry. I'll help you” = “Não se preocupe. Eu te ajudo.”",
          correction: "Quase! A forma certa é **I'll** (com apóstrofo, sem “to”).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It'll = It ",
          after: ".",
          answer: "will",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Isso! “It'll” = “It will”.",
          correction: "A resposta é **will**: It'll = It will.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vai chover amanhã.",
          answer: ["It'll", "rain", "tomorrow"],
          bank: ["rain", "tomorrow", "It'll", "It's", "rains", "is"],
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation: "Muito bem! “It'll rain tomorrow” = “Vai chover amanhã.”",
          correction:
            "O certo é **It'll rain tomorrow.** It'll = it will. “It's” = it is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You'll love it!",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm105S9.mp3"),
          options: ["You love it!", "You'll love it!", "You'll like it!"],
          correctAnswer: "You'll love it!",
          hint: "Escute o **'ll** depois de You, e **love** ou **like**.",
          explanation: "Perfeito! “You'll love it!” = “Você vai amar!”",
          correction:
            "A frase é **You'll love it!** Use o botão 0.5× para ouvir o “'ll”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Wait for me! ",
          after: " be ready in five minutes.",
          options: ["I'll", "I'm", "Ill"],
          correctAnswer: "I'll",
          hint:
            "Contração: I will → **I'll** · she will → **she'll** · it will → **it'll** · they will → **they'll**.",
          explanation:
            "Mandou bem! “I'll be ready in five minutes” = “Fico pronto em cinco minutos.” Lição completa! 🎉",
          correction: "Quase lá! “I'm be” não existe. O certo é **I'll be ready.**",
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
