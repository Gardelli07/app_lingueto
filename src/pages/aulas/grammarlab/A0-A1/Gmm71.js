import createLessonScreen from "../../LessonScreen";

// Present simple, aula 13 (Frequency): always, usually, sometimes, never ·
// posição na frase. Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["always", "sempre"],
            ["usually", "geralmente"],
            ["sometimes", "às vezes"],
            ["never", "nunca"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint: "Do mais para o menos: **always → usually → sometimes → never**.",
          explanation: "Mandou bem! Todas as palavras certas.",
          correction:
            "Esse par não combina. **always** = sempre · **usually** = geralmente · **sometimes** = às vezes · **never** = nunca.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I eat breakfast every day. I ",
          after: " eat breakfast.",
          options: ["never", "sometimes", "always"],
          correctAnswer: "always",
          hint: "every day (todo dia) = **always** (sempre).",
          explanation:
            "Isso aí! “I always eat breakfast” = “Eu sempre tomo café da manhã.”",
          correction: "Quase! Todo dia = sempre: **I always eat breakfast.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela nunca bebe café.",
          answer: ["She", "never", "drinks", "coffee"],
          bank: ["never", "drinks", "She", "coffee", "drink", "always"],
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation: "Perfeito! “She never drinks coffee” = “Ela nunca bebe café.”",
          correction:
            "O certo é **She never drinks coffee.** “Never” vem antes do verbo, e she → drinks.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We usually go to the beach in summer.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm71S4.mp3"),
          options: [
            "We usually go to the beach in summer.",
            "We never go to the beach in summer.",
            "We usually go to the park in summer.",
          ],
          correctAnswer: "We usually go to the beach in summer.",
          hint: "Escute **usually** ou **never**, e o lugar: **beach** ou **park**.",
          explanation:
            "Ótimo ouvido! “We usually go to the beach in summer” = “Nós geralmente vamos à praia no verão.”",
          correction:
            "A frase é **We usually go to the beach in summer.** Use o botão 0.5× para ouvir “usually”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He is ",
          after: " late.",
          answer: "always",
          instruction: "Type the word for “sempre”.",
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation: "Isso! “He is always late” = “Ele está sempre atrasado.”",
          correction: "A palavra certa é **always**: depois de “is” vem a frequência.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " tired on Mondays.",
          options: ["am always", "always am", "always"],
          correctAnswer: "am always",
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation:
            "Mandou bem! “I am always tired on Mondays” = “Eu estou sempre cansado às segundas.”",
          correction:
            "Quase! Com o verbo be, a frequência vem depois: **I am always tired.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu às vezes jogo videogame.",
          answer: ["I", "sometimes", "play", "video", "games"],
          bank: ["sometimes", "play", "I", "video", "games", "plays", "never"],
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation:
            "Muito bem! “I sometimes play video games” = “Eu às vezes jogo videogame.”",
          correction:
            "O certo é **I sometimes play video games.** “Sometimes” vem antes do verbo.",
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
          after: " eat meat. They're vegetarian.",
          answer: "never",
          instruction: "Type the word for “nunca”.",
          hint: "Vegetarianos nunca comem carne.",
          explanation: "Isso! “They never eat meat” = “Eles nunca comem carne.”",
          correction: "A resposta é **never**: vegetarianos nunca comem carne.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She is never late.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm71S9.mp3"),
          options: ["She is always late.", "She is never late.", "He is never late."],
          correctAnswer: "She is never late.",
          hint: "Escute **never** ou **always**, e **She** ou **He**.",
          explanation: "Perfeito! “She is never late” = “Ela nunca se atrasa.”",
          correction:
            "A frase é **She is never late.** Use o botão 0.5× para ouvir “never”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad ",
          after: " cooks on Sundays.",
          options: ["usually", "never", "always"],
          correctAnswer: "usually",
          instruction: "Choose the word for “geralmente”.",
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation:
            "Mandou bem! “My dad usually cooks on Sundays” = “Meu pai geralmente cozinha aos domingos.” Lição completa! 🎉",
          correction: "Quase lá! “Geralmente” = **usually.**",
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
