import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 11 (I can see it!): going to quando você vê sinais:
// Look! It's going to rain. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at those clouds! It ",
          after: " going to rain.",
          options: ["is", "are", "will"],
          correctAnswer: "is",
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation: "Isso aí! “It is going to rain” = “Vai chover.”",
          correction: "Quase! Você vê as nuvens → **It is going to rain.**",
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
            ["Look at the clouds!", "It's going to rain."],
            ["He's running too fast!", "He's going to fall."],
            ["She's very tired!", "She's going to sleep."],
            ["The glass is on the edge!", "It's going to fall."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a situation, then what's going to happen.",
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation: "Mandou bem! Você viu os sinais.",
          correction:
            "Esse par não combina. Olhe o sujeito: nuvens → **rain** · ele → **he** · ela → **she** · o copo → **it**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Be careful! You're going to fall!",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm114S3.mp3"),
          options: [
            "Be careful! You fell!",
            "Be careful! You're going to fall!",
            "Be careful! You're going to fail!",
          ],
          correctAnswer: "Be careful! You're going to fall!",
          hint:
            "Escute **going to fall** (cair) ou **fail** (falhar), ou **fell** (caiu).",
          explanation:
            "Ótimo ouvido! “Be careful! You're going to fall!” = “Cuidado! Você vai cair!”",
          correction:
            "A frase é **Be careful! You're going to fall!** Use o botão 0.5× para ouvir “fall”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She's pregnant. She's going to ",
          after: " a baby.",
          answer: "have",
          hint: "“Ter um bebê” = **have a baby**.",
          explanation: "Isso! “She's going to have a baby” = “Ela vai ter um bebê.”",
          correction: "A palavra certa é **have**: have a baby.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Olha! O ônibus vai sair.",
          answer: ["Look!", "The", "bus", "is", "going", "to", "leave"],
          bank: ["Look!", "The", "bus", "is", "going", "to", "leave", "are", "leaves"],
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation:
            "Perfeito! “Look! The bus is going to leave” = “Olha! O ônibus vai sair.”",
          correction:
            "O certo é **Look! The bus is going to leave.** Você vê → going to.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We're late! We ",
          after: " miss the train!",
          options: ["will to", "going", "are going to"],
          correctAnswer: "are going to",
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation:
            "Mandou bem! “We are going to miss the train!” = “Nós vamos perder o trem!”",
          correction: "Quase! A forma completa é **are going to miss.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The sky is very dark. It's ",
          after: " to rain.",
          answer: "going",
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation: "Isso! “It's going to rain” = “Vai chover.”",
          correction: "A resposta é **going**: It's going to rain.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele vai cair!",
          answer: ["He's", "going", "to", "fall"],
          bank: ["going", "to", "He's", "fall", "falls", "will"],
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation: "Muito bem! “He's going to fall!” = “Ele vai cair!”",
          correction: "O certo é **He's going to fall!** He's + going to + fall.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Look! It's going to snow.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm114S9.mp3"),
          options: [
            "Look! It's snowing.",
            "Look! It's going to snow.",
            "Look! It's going to stop.",
          ],
          correctAnswer: "Look! It's going to snow.",
          hint: "Escute **going to snow** (vai nevar) ou **snowing** (está nevando).",
          explanation: "Perfeito! “Look! It's going to snow” = “Olha! Vai nevar.”",
          correction:
            "A frase é **Look! It's going to snow.** Use o botão 0.5× para ouvir “going to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at that car! It ",
          after: " crash!",
          options: ["is going to", "are going to", "going to"],
          correctAnswer: "is going to",
          hint:
            "Quando você vê sinais de que algo vai acontecer, use **going to**: Look at the clouds! It's going to rain.",
          explanation:
            "Mandou bem! “It is going to crash!” = “Ele vai bater!” Lição completa! 🎉",
          correction: "Quase lá! It → **is going to crash.**",
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
