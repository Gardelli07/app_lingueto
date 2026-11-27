import createLessonScreen from "../../LessonScreen";

// Present simple, aula 7 (Negatives: don't): I / you / we / they + don't +
// verbo normal. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation`
// e o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " like coffee.",
          options: ["don't", "doesn't", "not"],
          correctAnswer: "don't",
          hint: "Negativa com I, you, we, they: **don't + verbo normal**.",
          explanation: "Isso aí! “I don't like coffee” = “Eu não gosto de café.”",
          correction: "Quase! Com “I”, a negativa é don't: **I don't like coffee.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não falo espanhol.",
          answer: ["I", "don't", "speak", "Spanish"],
          bank: ["speak", "don't", "I", "Spanish", "doesn't", "speaks"],
          hint: "Negativa com I, you, we, they: **don't + verbo normal**.",
          explanation: "Perfeito! “I don't speak Spanish” = “Eu não falo espanhol.”",
          correction: "O certo é **I don't speak Spanish.** I → don't + verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We don't watch TV.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm65S3.mp3"),
          options: ["We watch TV.", "We don't watch TV.", "They don't watch TV."],
          correctAnswer: "We don't watch TV.",
          hint: "Escute se tem **don't** e se começa com **We** ou **They**.",
          explanation: "Ótimo ouvido! “We don't watch TV” = “Nós não assistimos TV.”",
          correction:
            "A frase é **We don't watch TV.** Use o botão 0.5× para ouvir “don't”.",
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
            ["I don't eat meat", "Eu não como carne"],
            ["You don't work here", "Você não trabalha aqui"],
            ["We don't have a car", "Nós não temos carro"],
            ["They don't live here", "Eles não moram aqui"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Comece pelo sujeito: **I**, **You**, **We** ou **They**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Confira o sujeito e o verbo: **eat** = comer, **work** = trabalhar, **have** = ter, **live** = morar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They do ",
          after: " play tennis.",
          answer: "not",
          hint: "**don't** = do not.",
          explanation: "Isso! “They do not play tennis” = “Eles não jogam tênis.”",
          correction: "A palavra certa é **not**: do not = don't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " drink alcohol.",
          options: ["doesn't", "don't", "not"],
          correctAnswer: "don't",
          hint: "My parents = they → **don't**.",
          explanation:
            "Mandou bem! “My parents don't drink alcohol” = “Meus pais não bebem álcool.”",
          correction: "Quase! My parents = they → **don't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós não moramos aqui.",
          answer: ["We", "don't", "live", "here"],
          bank: ["live", "here", "We", "don't", "lives", "doesn't"],
          hint: "Negativa com I, you, we, they: **don't + verbo normal**.",
          explanation: "Muito bem! “We don't live here” = “Nós não moramos aqui.”",
          correction: "O certo é **We don't live here.** We → don't + live.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I don't ",
          after: " (have) a dog.",
          answer: "have",
          hint: "Depois de **don't**, o verbo fica normal.",
          explanation: "Isso! “I don't have a dog” = “Eu não tenho cachorro.”",
          correction: "A resposta é **have**: depois de don't, o verbo não muda.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I don't like Mondays.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm65S9.mp3"),
          options: ["I like Mondays.", "I don't like Sundays.", "I don't like Mondays."],
          correctAnswer: "I don't like Mondays.",
          hint: "Escute se tem **don't** e o dia: **Mondays** ou **Sundays**.",
          explanation:
            "Perfeito! “I don't like Mondays” = “Eu não gosto de segundas-feiras.”",
          correction:
            "A frase é **I don't like Mondays.** Use o botão 0.5× para ouvir o dia.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You ",
          after: " need a ticket.",
          options: ["doesn't", "not", "don't"],
          correctAnswer: "don't",
          hint: "Negativa com I, you, we, they: **don't + verbo normal**.",
          explanation:
            "Mandou bem! “You don't need a ticket” = “Você não precisa de ingresso.” Lição completa! 🎉",
          correction: "Quase lá! Com “you”, a negativa é **don't.**",
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
