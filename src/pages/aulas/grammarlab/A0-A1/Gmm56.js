import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 14 (Stative verbs): like, love, want, need, know,
// understand, have (= ter) não usam -ing. Os 5 tipos do Grammar Lab
// alternados, uma pergunta por slide. O combo e o XP seguem de um slide para
// o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o painel
// de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " a glass of water, please.",
          options: ["want", "am wanting", "wants"],
          correctAnswer: "want",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation:
            "Isso aí! “I want a glass of water, please” = “Eu quero um copo d'água, por favor.”",
          correction: "Quase! “Want” não usa -ing: **I want.**",
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
            ["like", "gostar"],
            ["want", "querer"],
            ["know", "saber / conhecer"],
            ["need", "precisar"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its translation.",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Mandou bem! Esses verbos não usam -ing.",
          correction:
            "Esse par não combina. **like** = gostar · **want** = querer · **know** = saber · **need** = precisar.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She knows the answer.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm56S3.mp3"),
          options: [
            "He knows the answer.",
            "She knows the answer.",
            "She knows the address.",
          ],
          correctAnswer: "She knows the answer.",
          hint:
            "Escute **She** ou **He**, e o final: **answer** (resposta) ou **address** (endereço).",
          explanation: "Ótimo ouvido! “She knows the answer” = “Ela sabe a resposta.”",
          correction: "A frase é **She knows the answer.** “Know” não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I ",
          after: " (need) help.",
          answer: "need",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Isso! “I need help” = “Eu preciso de ajuda.”",
          correction:
            "A palavra certa é **need**: “need” não usa -ing, mesmo sendo agora.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu gosto deste filme.",
          answer: ["I", "like", "this", "movie"],
          bank: ["like", "this", "I", "movie", "am", "liking"],
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Perfeito! “I like this movie” = “Eu gosto deste filme.”",
          correction: "O certo é **I like this movie.** “Like” não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " a new car.",
          options: ["is having", "has", "have"],
          correctAnswer: "has",
          hint:
            "**have** = ter não usa -ing. (Mas **have lunch / have fun** podem: I'm having lunch.)",
          explanation: "Mandou bem! “He has a new car” = “Ele tem um carro novo.”",
          correction: "Quase! “Ter” não usa -ing: **He has a new car.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Do you ",
          after: " (understand) me?",
          answer: "understand",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Isso! “Do you understand me?” = “Você me entende?”",
          correction: "A resposta é **understand**: esse verbo não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela precisa de um médico.",
          answer: ["She", "needs", "a", "doctor"],
          bank: ["needs", "a", "She", "doctor", "is", "needing"],
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Muito bem! “She needs a doctor” = “Ela precisa de um médico.”",
          correction: "O certo é **She needs a doctor.** “Need” não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We're having lunch now.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm56S9.mp3"),
          options: [
            "We're having lunch later.",
            "They're having lunch now.",
            "We're having lunch now.",
          ],
          correctAnswer: "We're having lunch now.",
          hint:
            "**have lunch** (almoçar) é ação, então pode usar -ing. Escute **We're** ou **They're**, e **now** ou **later**.",
          explanation:
            "Perfeito! “We're having lunch now” = “Nós estamos almoçando agora.”",
          correction:
            "A frase é **We're having lunch now.** Have lunch = almoçar, por isso aceita -ing.",
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
          after: " you!",
          options: ["am loving", "love", "loves"],
          correctAnswer: "love",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Mandou bem! “I love you!” = “Eu te amo!” Lição completa! 🎉",
          correction: "Quase lá! “Love” não usa -ing: **I love you.**",
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
