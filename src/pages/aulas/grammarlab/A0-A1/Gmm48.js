import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 6 (Contractions): I'm · you're · he's · she's ·
// it's · we're · they're + verbo-ing. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " working now.",
          options: ["I'm", "Im", "I'am"],
          correctAnswer: "I'm",
          instruction: "Choose the short form of “I am”.",
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation: "Isso aí! “I'm working now” = “Eu estou trabalhando agora.”",
          correction: "Quase! I am vira **I'm**, com apóstrofo.",
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
            ["I am", "I'm"],
            ["she is", "she's"],
            ["we are", "we're"],
            ["they are", "they're"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap the full form, then its short form.",
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation: "Mandou bem! Todas as contrações certas.",
          correction: "Esse par não combina. am → **'m** · is → **'s** · are → **'re**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's cooking.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm48S3.mp3"),
          options: ["He's cooking.", "She's cooking.", "She's looking."],
          correctAnswer: "She's cooking.",
          hint:
            "Escute **She's** ou **He's**, e **cooking** (cozinhando) ou **looking** (olhando).",
          explanation: "Ótimo ouvido! “She's cooking” = “Ela está cozinhando.”",
          correction: "A frase é **She's cooking.** Use o botão 0.5× para ouvir “She's”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We're = We ",
          after: ".",
          answer: "are",
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation: "Isso! “We're” = “We are”.",
          correction: "A palavra certa é **are**: o 're vem de are.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles estão jogando futebol.",
          answer: ["They're", "playing", "soccer"],
          bank: ["playing", "They're", "soccer", "Their", "is", "play"],
          instruction: "Translate it using the short form.",
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation:
            "Perfeito! “They're playing soccer” = “Eles estão jogando futebol.”",
          correction:
            "O certo é **They're playing soccer.** They're = they are. “Their” = deles.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " raining again!",
          options: ["Its", "It's", "It"],
          correctAnswer: "It's",
          hint: "**It's** = it is (com apóstrofo). **Its** = dele / dela (de coisa).",
          explanation: "Mandou bem! “It's raining again!” = “Está chovendo de novo!”",
          correction: "Quase! Aqui é “it is”: **It's raining.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He's = He ",
          after: ".",
          answer: "is",
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation: "Isso! “He's” = “He is”.",
          correction: "A resposta é **is**: o 's vem de is.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estou aprendendo muito.",
          answer: ["I'm", "learning", "a", "lot"],
          bank: ["learning", "a", "I'm", "lot", "Im", "learn"],
          hint:
            "Contrações: I am → **I'm** · she is → **she's** · we are → **we're** · they are → **they're**.",
          explanation: "Muito bem! “I'm learning a lot” = “Eu estou aprendendo muito.”",
          correction: "O certo é **I'm learning a lot.** I'm = I am, com apóstrofo.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You're doing a good job.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm48S9.mp3"),
          options: [
            "You're doing a good job.",
            "You're doing a great job.",
            "We're doing a good job.",
          ],
          correctAnswer: "You're doing a good job.",
          hint: "Escute **You're** ou **We're**, e **good** ou **great**.",
          explanation:
            "Perfeito! “You're doing a good job” = “Você está fazendo um bom trabalho.”",
          correction:
            "A frase é **You're doing a good job.** Use o botão 0.5× para ouvir “good”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My friends are here. ",
          after: " waiting for you.",
          options: ["Their", "There", "They're"],
          correctAnswer: "They're",
          hint: "**They're** = they are · **Their** = deles · **There** = lá.",
          explanation:
            "Mandou bem! “They're waiting for you” = “Eles estão esperando você.” Lição completa! 🎉",
          correction: "Quase lá! Aqui é “they are”: **They're waiting.**",
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
