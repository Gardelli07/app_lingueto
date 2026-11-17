import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 6 (Stative verbs 1): like, love, hate,
// want, need, prefer: sem -ing. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " a glass of water, please.",
          options: ["need", "am needing", "needs"],
          correctAnswer: "need",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation:
            "Isso aí! “I need a glass of water, please” = “Preciso de um copo d'água, por favor.”",
          correction: "Quase! “Need” não usa -ing: **I need.**",
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
            ["prefer", "preferir"],
            ["need", "precisar"],
            ["hate", "odiar"],
            ["want", "querer"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its translation.",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation: "Mandou bem! Esses verbos normalmente não usam -ing.",
          correction:
            "Esse par não combina. **prefer** = preferir · **need** = precisar · **hate** = odiar · **want** = querer.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She ",
          after: " (want) to study medicine.",
          answer: "wants",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation:
            "Isso! “She wants to study medicine” = “Ela quer estudar medicina.”",
          correction: "A palavra certa é **wants**: “want” não usa -ing, e she → wants.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I prefer tea to coffee.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm124S4.mp3"),
          options: [
            "I prefer coffee to tea.",
            "I prefer tea to coffee.",
            "I prepare tea and coffee.",
          ],
          correctAnswer: "I prefer tea to coffee.",
          hint: "**prefer A to B** = prefiro A a B. Escute qual vem primeiro.",
          explanation: "Ótimo ouvido! “I prefer tea to coffee” = “Prefiro chá a café.”",
          correction:
            "A frase é **I prefer tea to coffee.** O que vem primeiro é o preferido.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós precisamos de mais tempo.",
          answer: ["We", "need", "more", "time"],
          bank: ["We", "need", "more", "time", "are", "needing"],
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation: "Perfeito! “We need more time” = “Precisamos de mais tempo.”",
          correction: "O certo é **We need more time.** Não diga “are needing”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My kids ",
          after: " this new game. They play it all the time!",
          options: ["are loving", "loves", "love"],
          correctAnswer: "love",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation:
            "Mandou bem! “My kids love this new game” = “Meus filhos adoram esse jogo novo.”",
          correction: "Quase! “Love” normalmente não usa -ing: **My kids love.**",
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
          after: " (like) jazz?",
          answer: "like",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation: "Isso! “Do you like jazz?” = “Você gosta de jazz?”",
          correction: "A resposta é **like**: Do you like…? (sem -ing).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela odeia acordar cedo.",
          answer: ["She", "hates", "waking", "up", "early"],
          bank: ["She", "hates", "waking", "up", "early", "is", "hating", "wake"],
          hint:
            "**hate** não usa -ing, mas o verbo depois dele sim: **hates waking up**.",
          explanation:
            "Muito bem! “She hates waking up early” = “Ela odeia acordar cedo.”",
          correction:
            "O certo é **She hates waking up early.** Hate fica normal; o verbo seguinte vem com -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He doesn't want to come.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm124S9.mp3"),
          options: [
            "He doesn't want to come.",
            "He doesn't want to go.",
            "She doesn't want to come.",
          ],
          correctAnswer: "He doesn't want to come.",
          hint: "Escute **He** ou **She**, e o final: **come** ou **go**.",
          explanation: "Perfeito! “He doesn't want to come” = “Ele não quer vir.”",
          correction:
            "A frase é **He doesn't want to come.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Right now, I ",
          after: " a holiday!",
          options: ["need", "am needing", "needs"],
          correctAnswer: "need",
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation:
            "Mandou bem! “Right now, I need a holiday!” = “Agora eu preciso de férias!” Lição completa! 🎉",
          correction: "Quase lá! Mesmo com “right now”, need não usa -ing: **I need.**",
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
