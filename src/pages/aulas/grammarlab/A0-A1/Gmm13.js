import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 10 (How well?): very well · well · a little · not at all.
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
            ["very well", "muito bem"],
            ["well", "bem"],
            ["a little", "um pouco"],
            ["not at all", "nada / de jeito nenhum"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a phrase, then its translation.",
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I can speak English very ",
          after: ".",
          options: ["good", "well", "nice"],
          correctAnswer: "well",
          hint: "Para dizer como você faz algo, use **well** (bem), não “good”.",
          explanation:
            "Isso aí! “I can speak English very well” = “Eu sei falar inglês muito bem.”",
          correction: "Quase! “Muito bem” = **very well.** “Good” = bom.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She can cook very well.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm13S3.mp3"),
          options: [
            "She can cook very well.",
            "She can't cook very well.",
            "She can cook a little.",
          ],
          correctAnswer: "She can cook very well.",
          hint: "Escute se tem o “t” de **can't**, e **very well** ou **a little**.",
          explanation:
            "Ótimo ouvido! “She can cook very well” = “Ela cozinha muito bem.”",
          correction:
            "A frase é **She can cook very well.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I can swim a ",
          after: ".",
          answer: "little",
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Isso! “I can swim a little” = “Eu sei nadar um pouco.”",
          correction: "A palavra certa é **little**: a little = um pouco.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele sabe dançar muito bem.",
          answer: ["He", "can", "dance", "very", "well"],
          bank: ["dance", "very", "He", "can", "well", "good", "dances"],
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Perfeito! “He can dance very well” = “Ele dança muito bem.”",
          correction: "O certo é **He can dance very well.** “Muito bem” = very well.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I can't sing ",
          after: " all.",
          options: ["at", "in", "on"],
          correctAnswer: "at",
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Mandou bem! “I can't sing at all” = “Eu não sei cantar nada.”",
          correction: "Quase! A expressão é not at all: **I can't sing at all.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My mom can't drive ",
          after: " all.",
          answer: "at",
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation:
            "Isso! “My mom can't drive at all” = “Minha mãe não sabe dirigir de jeito nenhum.”",
          correction: "A resposta é **at**: can't … at all.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu sei falar um pouco de espanhol.",
          answer: ["I", "can", "speak", "a", "little", "Spanish"],
          bank: ["speak", "a", "I", "little", "can", "Spanish", "few", "speaks"],
          hint: "“Um pouco de” = **a little** + coisa.",
          explanation:
            "Muito bem! “I can speak a little Spanish” = “Eu sei falar um pouco de espanhol.”",
          correction:
            "O certo é **I can speak a little Spanish.** “Um pouco de” = a little.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I can't swim at all.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm13S9.mp3"),
          options: [
            "I can swim a little.",
            "I can't swim at all.",
            "I can't swim very well.",
          ],
          correctAnswer: "I can't swim at all.",
          hint: "Escute o final: **at all**, **a little** ou **very well**.",
          explanation: "Perfeito! “I can't swim at all” = “Eu não sei nadar nada.”",
          correction:
            "A frase é **I can't swim at all.** Use o botão 0.5× para ouvir “at all”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can you play the piano? – Yes, but only a ",
          after: ".",
          options: ["well", "lot", "little"],
          correctAnswer: "little",
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Mandou bem! “Only a little” = “Só um pouco.” Lição completa! 🎉",
          correction: "Quase lá! “Só um pouco” = **only a little.**",
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
