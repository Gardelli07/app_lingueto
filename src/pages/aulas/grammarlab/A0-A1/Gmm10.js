import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 7 (Abilities): Habilidades: swim, drive, draw, fly, ride a bike, play the guitar, fix….
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["swim", "nadar"],
            ["drive", "dirigir"],
            ["draw", "desenhar"],
            ["ride a bike", "andar de bicicleta"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint: "Esses verbos aparecem muito com **can**: I can swim, I can drive…",
          explanation: "Mandou bem! Todas as habilidades certas.",
          correction:
            "Esse par não combina. **swim** = nadar · **drive** = dirigir · **draw** = desenhar · **ride a bike** = andar de bicicleta.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Fish can ",
          after: ", but they can't walk.",
          options: ["swim", "fly", "drive"],
          correctAnswer: "swim",
          hint: "O que os peixes sabem fazer?",
          explanation: "Isso aí! “Fish can swim” = “Peixes sabem nadar.”",
          correction: "Quase! Peixes sabem **swim** (nadar).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I can play soccer.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm10S3.mp3"),
          options: ["I can play tennis.", "I can play soccer.", "I can't play soccer."],
          correctAnswer: "I can play soccer.",
          hint:
            "Escute o esporte (**soccer** ou **tennis**) e se tem o “t” de **can't**.",
          explanation: "Ótimo ouvido! “I can play soccer” = “Eu sei jogar futebol.”",
          correction:
            "A frase é **I can play soccer.** Use o botão 0.5× para ouvir “soccer”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Birds can ",
          after: ".",
          answer: "fly",
          instruction: "Type the word for “voar”.",
          hint: "“Voar” = **fly**.",
          explanation: "Isso! “Birds can fly” = “Pássaros sabem voar.”",
          correction: "A palavra certa é **fly** (voar).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela sabe tocar violão.",
          answer: ["She", "can", "play", "the", "guitar"],
          bank: ["play", "the", "She", "can", "guitar", "plays", "piano"],
          hint: "“Tocar instrumento” = **play the** + instrumento.",
          explanation: "Perfeito! “She can play the guitar” = “Ela sabe tocar violão.”",
          correction: "O certo é **She can play the guitar.** Can + play, sem -s.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Babies can't ",
          after: ". They're too young.",
          options: ["drive", "sleep", "cry"],
          correctAnswer: "drive",
          hint: "O que um bebê não consegue fazer?",
          explanation: "Mandou bem! “Babies can't drive” = “Bebês não sabem dirigir.”",
          correction: "Quase! Bebês dormem e choram, mas não sabem **drive** (dirigir).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I can ",
          after: " a car.",
          answer: "drive",
          instruction: "Type the word for “dirigir”.",
          hint: "“Dirigir” = **drive**.",
          explanation: "Isso! “I can drive a car” = “Eu sei dirigir carro.”",
          correction: "A resposta é **drive** (dirigir).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu avô sabe consertar tudo.",
          answer: ["My", "grandpa", "can", "fix", "everything"],
          bank: ["fix", "everything", "My", "can", "grandpa", "fixes"],
          hint: "“Consertar” = **fix**. Depois de can, sem **-es**.",
          explanation:
            "Muito bem! “My grandpa can fix everything” = “Meu avô sabe consertar tudo.”",
          correction: "O certo é **My grandpa can fix everything.** Can + fix (sem -es).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can you speak Italian?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm10S9.mp3"),
          options: [
            "Can you speak English?",
            "Can you teach Italian?",
            "Can you speak Italian?",
          ],
          correctAnswer: "Can you speak Italian?",
          hint:
            "Escute o verbo (**speak** ou **teach**) e o idioma (**Italian** ou **English**).",
          explanation: "Perfeito! “Can you speak Italian?” = “Você sabe falar italiano?”",
          correction:
            "A frase é **Can you speak Italian?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Penguins can swim, but they can't ",
          after: ".",
          options: ["swim", "eat", "fly"],
          correctAnswer: "fly",
          hint: "Pinguins são aves, mas não…",
          explanation:
            "Mandou bem! “Penguins can't fly” = “Pinguins não sabem voar.” Lição completa! 🎉",
          correction: "Quase lá! Pinguins nadam, mas não **fly** (voam).",
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
