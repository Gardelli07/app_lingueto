import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 1 (I can): can + verbo normal: I can swim (sei / consigo / posso).
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
          before: "I ",
          after: " swim.",
          options: ["can", "cans", "am"],
          correctAnswer: "can",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation: "Isso aí! “I can swim” = “Eu sei nadar.”",
          correction: "Quase! Para habilidade, usamos can: **I can swim.**",
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
            ["I can swim", "Eu sei nadar"],
            ["I can cook", "Eu sei cozinhar"],
            ["I can dance", "Eu sei dançar"],
            ["I can drive", "Eu sei dirigir"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**can** = sei / consigo / posso. Olhe o verbo: **swim, cook, dance, drive**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **swim** = nadar · **cook** = cozinhar · **dance** = dançar · **drive** = dirigir.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I can play the guitar.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm04S3.mp3"),
          options: [
            "I can play the piano.",
            "I can play the guitar.",
            "I can't play the guitar.",
          ],
          correctAnswer: "I can play the guitar.",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation: "Ótimo ouvido! “I can play the guitar” = “Eu sei tocar violão.”",
          correction:
            "A frase é **I can play the guitar.** Use o botão 0.5× para ouvir “guitar”.",
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
          after: " (speak) English.",
          answer: "speak",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation: "Isso! “I can speak English” = “Eu sei falar inglês.”",
          correction: "A palavra certa é **speak**: depois de can, o verbo fica normal.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu sei andar de bicicleta.",
          answer: ["I", "can", "ride", "a", "bike"],
          bank: ["ride", "a", "I", "can", "bike", "to", "rides"],
          hint: "“Andar de bicicleta” = **ride a bike**. Depois de can, sem **to**.",
          explanation: "Perfeito! “I can ride a bike” = “Eu sei andar de bicicleta.”",
          correction: "O certo é **I can ride a bike.** Can + ride, sem “to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We can ",
          after: " you tomorrow.",
          options: ["helping", "to help", "help"],
          correctAnswer: "help",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Mandou bem! “We can help you tomorrow” = “Nós podemos te ajudar amanhã.”",
          correction: "Quase! Depois de can, o verbo fica normal, sem to: **can help.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They ",
          after: " run very fast.",
          answer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Isso! “They can run very fast” = “Eles conseguem correr muito rápido.”",
          correction: "A resposta é **can**: they can run.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós podemos ir à praia.",
          answer: ["We", "can", "go", "to", "the", "beach"],
          bank: ["go", "to", "We", "the", "can", "beach", "goes"],
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation: "Muito bem! “We can go to the beach” = “Nós podemos ir à praia.”",
          correction: "O certo é **We can go to the beach.** Can + go (verbo normal).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You can do it!",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm04S9.mp3"),
          options: ["We can do it!", "You can't do it!", "You can do it!"],
          correctAnswer: "You can do it!",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation: "Perfeito! “You can do it!” = “Você consegue!”",
          correction: "A frase é **You can do it!** Sem o “t” no final, é “can”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I can ",
          after: " three languages.",
          options: ["speak", "speaks", "to speak"],
          correctAnswer: "speak",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Mandou bem! “I can speak three languages” = “Eu sei falar três idiomas.” Lição completa! 🎉",
          correction: "Quase lá! Depois de can: verbo normal, **speak.**",
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
