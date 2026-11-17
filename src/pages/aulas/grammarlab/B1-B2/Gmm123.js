import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 5 (Time expressions): nowadays,
// currently, at the moment, these days × usually, once in a while, every…. Os
// 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["nowadays", "hoje em dia"],
            ["currently", "atualmente"],
            ["at the moment", "no momento"],
            ["once in a while", "de vez em quando"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a phrase, then its translation.",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **nowadays** = hoje em dia · **currently** = atualmente · **at the moment** = no momento · **once in a while** = de vez em quando.",
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
          after: " my emails at the moment. Can I call you back?",
          options: ["check", "am checking", "checks"],
          correctAnswer: "am checking",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation:
            "Isso aí! “I am checking my emails at the moment” = “Estou vendo meus e-mails no momento.”",
          correction: "Quase! “At the moment” → present continuous: **am checking.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She hardly ever ",
          after: " (watch) TV.",
          answer: "watches",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation:
            "Isso! “She hardly ever watches TV” = “Ela quase nunca assiste TV.”",
          correction:
            "A palavra certa é **watches**: frequência → present simple, e watch → -es.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We're currently looking for a new flat.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm123S4.mp3"),
          options: [
            "We usually look for a new flat.",
            "We're currently looking for a new flat.",
            "We're currently looking for a new job.",
          ],
          correctAnswer: "We're currently looking for a new flat.",
          hint:
            "Escute **currently** (atualmente) e o final: **flat** (apartamento) ou **job**.",
          explanation:
            "Ótimo ouvido! “We're currently looking for a new flat” = “Estamos procurando um apartamento novo.”",
          correction:
            "A frase é **We're currently looking for a new flat.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "De vez em quando, eu cozinho para os meus amigos.",
          answer: ["Once", "in", "a", "while,", "I", "cook", "for", "my", "friends"],
          bank: [
            "Once",
            "in",
            "a",
            "while,",
            "I",
            "cook",
            "for",
            "my",
            "friends",
            "am",
            "cooking",
          ],
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation: "Perfeito! “Once in a while, I cook for my friends.”",
          correction:
            "O certo é **Once in a while, I cook for my friends.** “De vez em quando” = hábito → present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Every Monday, our team ",
          after: " a meeting at 9.",
          options: ["has", "is having", "have"],
          correctAnswer: "has",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation: "Mandou bem! “Every Monday, our team has a meeting at 9.”",
          correction: "Quase! “Every Monday” = rotina → **our team has.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He ",
          after: " (visit) his grandmother once a week.",
          answer: "visits",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation:
            "Isso! “He visits his grandmother once a week” = “Ele visita a avó uma vez por semana.”",
          correction: "A resposta é **visits**: “once a week” = rotina.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "No momento, ela está morando em Lisboa.",
          answer: ["At", "the", "moment,", "she's", "living", "in", "Lisbon"],
          bank: [
            "At",
            "the",
            "moment,",
            "she's",
            "living",
            "in",
            "Lisbon",
            "lives",
            "is",
          ],
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation: "Muito bem! “At the moment, she's living in Lisbon.”",
          correction:
            "O certo é **At the moment, she's living in Lisbon.** “At the moment” → present continuous.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I go running three times a week.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm123S9.mp3"),
          options: [
            "I go running three times a week.",
            "I'm going running three times a week.",
            "I go running two times a week.",
          ],
          correctAnswer: "I go running three times a week.",
          hint: "Escute **I go** (hábito) e o número: **three** ou **two**.",
          explanation:
            "Perfeito! “I go running three times a week” = “Eu corro três vezes por semana.”",
          correction:
            "A frase é **I go running three times a week.** Use o botão 0.5× para ouvir o número.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at Ana! She ",
          after: " a new dress today.",
          options: ["wears", "is wearing", "wear"],
          correctAnswer: "is wearing",
          hint:
            "**Simple**: usually, always, every day, once in a while · **Continuous**: now, at the moment, currently, this week, these days.",
          explanation:
            "Mandou bem! “She is wearing a new dress today” = “Ela está usando um vestido novo hoje.” Lição completa! 🎉",
          correction: "Quase lá! “Look!” + “today” → **is wearing.**",
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
