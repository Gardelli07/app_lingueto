import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 11 (Review): Revisão do Set 1: simple ×
// continuous, temporário, stative verbs, always + -ing. Os 5 tipos do Grammar
// Lab alternados, uma pergunta por slide. O combo e o XP seguem de um slide
// para o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o
// painel de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The Earth ",
          after: " around the Sun.",
          options: ["goes", "is going", "go"],
          correctAnswer: "goes",
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation:
            "Isso aí! “The Earth goes around the Sun” = “A Terra gira em torno do Sol.”",
          correction: "Quase! Fato científico → **The Earth goes.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I'm ",
          after: " (look) for my glasses. Have you seen them?",
          answer: "looking",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Isso! “I'm looking for my glasses” = “Estou procurando meus óculos.”",
          correction: "A palavra certa é **looking**: procurando agora.",
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
            ["I work in a bank.", "permanente"],
            ["I'm working late this week.", "temporário"],
            ["I think so.", "opinião"],
            ["You're always late!", "reclamação"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then what it expresses.",
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation: "Mandou bem! Você domina os usos do Set 1.",
          correction:
            "Esse par não combina. **work** = permanente · **working this week** = temporário · **think** = opinião · **always late!** = reclamação.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não gosta de filmes de terror.",
          answer: ["She", "doesn't", "like", "horror", "movies"],
          bank: ["She", "doesn't", "like", "horror", "movies", "isn't", "liking"],
          hint:
            "Verbos de gosto e desejo (**like, love, hate, want, need, prefer**) normalmente não usam -ing.",
          explanation:
            "Perfeito! “She doesn't like horror movies” = “Ela não gosta de filmes de terror.”",
          correction: "O certo é **She doesn't like horror movies.** Like não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What are you doing this weekend?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm129S5.mp3"),
          options: [
            "What do you do at the weekend?",
            "What are you doing this weekend?",
            "What are you doing this evening?",
          ],
          correctAnswer: "What are you doing this weekend?",
          hint:
            "Escute **are you doing** (plano) ou **do you do** (hábito), e **weekend** ou **evening**.",
          explanation:
            "Ótimo ouvido! “What are you doing this weekend?” = “O que você vai fazer neste fim de semana?”",
          correction:
            "A frase é **What are you doing this weekend?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This cake ",
          after: " delicious!",
          options: ["is tasting", "tastes", "taste"],
          correctAnswer: "tastes",
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation:
            "Mandou bem! “This cake tastes delicious!” = “Este bolo está delicioso!”",
          correction: "Quase! “Ter gosto” não usa -ing: **This cake tastes.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How often ",
          after: " you go to the cinema?",
          answer: "do",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Isso! “How often do you go to the cinema?” = “Com que frequência você vai ao cinema?”",
          correction: "A resposta é **do**: hábito → present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele está ficando com amigos até achar um apartamento.",
          answer: [
            "He's",
            "staying",
            "with",
            "friends",
            "until",
            "he",
            "finds",
            "a",
            "flat",
          ],
          bank: [
            "He's",
            "staying",
            "with",
            "friends",
            "until",
            "he",
            "finds",
            "a",
            "flat",
            "stays",
            "find",
          ],
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation: "Muito bem! “He's staying with friends until he finds a flat.”",
          correction:
            "O certo é **He's staying with friends until he finds a flat.** Temporário → staying; depois de until → finds.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I don't believe you.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm129S9.mp3"),
          options: [
            "I don't believe you.",
            "I didn't believe you.",
            "I don't believe it.",
          ],
          correctAnswer: "I don't believe you.",
          hint: "Escute **don't** ou **didn't**, e o final: **you** ou **it**.",
          explanation: "Perfeito! “I don't believe you” = “Eu não acredito em você.”",
          correction: "A frase é **I don't believe you.** Believe não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Shh! I ",
          after: " to the news.",
          options: ["listen", "am listening", "listens"],
          correctAnswer: "am listening",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Mandou bem! “I am listening to the news” = “Estou ouvindo o jornal.” Set 1 completo! 🎉",
          correction: "Quase lá! “Shh!” = agora → **I am listening.**",
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
