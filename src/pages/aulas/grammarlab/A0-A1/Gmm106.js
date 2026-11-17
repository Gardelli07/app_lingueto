import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 3 (Won't): won't (= will not) + verbo normal. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " tell anyone. It's a secret.",
          options: ["won't", "doesn't", "will"],
          correctAnswer: "won't",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation:
            "Isso aí! “I won't tell anyone” = “Eu não vou contar para ninguém.”",
          correction: "Quase! Promessa negativa no futuro: **I won't tell.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não vai vir.",
          answer: ["She", "won't", "come"],
          bank: ["come", "She", "won't", "doesn't", "comes", "will"],
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Perfeito! “She won't come” = “Ela não vai vir.”",
          correction: "O certo é **She won't come.** Futuro negativo → won't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He won't be late.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm106S3.mp3"),
          options: ["He will be late.", "He won't be late.", "He wasn't late."],
          correctAnswer: "He won't be late.",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Ótimo ouvido! “He won't be late” = “Ele não vai se atrasar.”",
          correction:
            "A frase é **He won't be late.** Use o botão 0.5× para ouvir “won't”.",
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
            ["I won't forget", "Eu não vou esquecer"],
            ["It won't rain", "Não vai chover"],
            ["We won't stay", "Nós não vamos ficar"],
            ["They won't win", "Eles não vão ganhar"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **forget** = esquecer · **rain** = chover · **stay** = ficar · **win** = ganhar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She will ",
          after: " be at the party.",
          answer: "not",
          hint: "**won't** = will not.",
          explanation:
            "Isso! “She will not be at the party” = “Ela não vai estar na festa.”",
          correction: "A palavra certa é **not**: will not = won't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Don't worry, the test ",
          after: " be difficult.",
          options: ["isn't", "don't", "won't"],
          correctAnswer: "won't",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation:
            "Mandou bem! “The test won't be difficult” = “A prova não vai ser difícil.”",
          correction: "Quase! Futuro negativo + be: **the test won't be difficult.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não vou fazer isso.",
          answer: ["I", "won't", "do", "that"],
          bank: ["do", "that", "I", "won't", "don't", "want"],
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Muito bem! “I won't do that” = “Eu não vou fazer isso.”",
          correction: "O certo é **I won't do that.** Cuidado: “want” = querer.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It won't ",
          after: " (take) long.",
          answer: "take",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Isso! “It won't take long” = “Não vai demorar.”",
          correction: "A resposta é **take**: depois de won't, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I won't do it again.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm106S9.mp3"),
          options: [
            "I want to do it again.",
            "I'll do it again.",
            "I won't do it again.",
          ],
          correctAnswer: "I won't do it again.",
          hint:
            "**won't** (“wount”) e **want** (“uónt”) são parecidos. Escute também se tem “to”.",
          explanation: "Perfeito! “I won't do it again” = “Eu não vou fazer de novo.”",
          correction: "A frase é **I won't do it again.** “Want to” teria o “to” depois.",
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
          after: " let me go.",
          options: ["won't", "doesn't", "aren't"],
          correctAnswer: "won't",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation:
            "Mandou bem! “My parents won't let me go” = “Meus pais não vão me deixar ir.” Lição completa! 🎉",
          correction: "Quase lá! Futuro negativo: **My parents won't let me go.**",
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
