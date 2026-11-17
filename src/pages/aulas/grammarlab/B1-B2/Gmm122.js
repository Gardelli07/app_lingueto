import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 4 (Temporary or permanent?): I live
// (permanente) × I'm living (temporário). Os 5 tipos do Grammar Lab
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
          after: " in Madrid. I was born here.",
          options: ["live", "am living", "lives"],
          correctAnswer: "live",
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Isso aí! “I live in Madrid” = “Eu moro em Madri.” Situação permanente.",
          correction: "Quase! Nasceu lá = permanente → **I live.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Estou morando com a minha tia este mês.",
          answer: ["I'm", "living", "with", "my", "aunt", "this", "month"],
          bank: ["I'm", "living", "with", "my", "aunt", "this", "month", "live", "am"],
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Perfeito! “I'm living with my aunt this month” = “Estou morando com a minha tia este mês.”",
          correction:
            "O certo é **I'm living with my aunt this month.** Só este mês = temporário.",
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
            ["She works in a bank.", "emprego fixo"],
            ["She's working in a café this summer.", "emprego temporário"],
            ["He lives in Paris.", "mora lá de vez"],
            ["He's staying in a hotel.", "está lá por pouco tempo"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation: "Mandou bem! Você já separa permanente e temporário.",
          correction:
            "Esse par não combina. **Sem -ing** = permanente · **com -ing** = temporário.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My car is at the garage, so I'm ",
          after: " (use) my dad's car this week.",
          answer: "using",
          hint: "Use → tire o e e coloque **-ing**.",
          explanation:
            "Isso! “I'm using my dad's car this week” = “Estou usando o carro do meu pai esta semana.”",
          correction: "A palavra certa é **using**: use perde o “e” antes do -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They're renting a flat until they find a house.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm122S5.mp3"),
          options: [
            "They rent a flat.",
            "They're renting a flat until they find a house.",
            "They're renting a flat until they find a job.",
          ],
          correctAnswer: "They're renting a flat until they find a house.",
          hint:
            "Escute **They're renting … until** (temporário) e o final: **house** ou **job**.",
          explanation:
            "Ótimo ouvido! “Eles estão alugando um apartamento até acharem uma casa.”",
          correction:
            "A frase é **They're renting a flat until they find a house.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Normally I ",
          after: " eight hours a night, but this month I'm sleeping only five.",
          options: ["am sleeping", "sleeps", "sleep"],
          correctAnswer: "sleep",
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Mandou bem! “Normally I sleep eight hours a night” = “Normalmente eu durmo oito horas por noite.”",
          correction: "Quase! “Normally” = rotina → **I sleep.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She usually ",
          after: " (teach) at a university, but she's on holiday now.",
          answer: "teaches",
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Isso! “She usually teaches at a university” = “Ela geralmente dá aula numa universidade.”",
          correction: "A resposta é **teaches**: rotina, e teach termina em “ch” → -es.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles estão trabalhando de casa até o escritório reabrir.",
          answer: [
            "They",
            "are",
            "working",
            "from",
            "home",
            "until",
            "the",
            "office",
            "reopens",
          ],
          bank: [
            "They",
            "are",
            "working",
            "from",
            "home",
            "until",
            "the",
            "office",
            "reopens",
            "work",
            "reopen",
          ],
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Muito bem! “They are working from home until the office reopens.”",
          correction:
            "O certo é **They are working from home until the office reopens.** Até reabrir = temporário. Depois de “until”, use o present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm not driving these days. My car is broken.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm122S9.mp3"),
          options: [
            "I don't drive these days.",
            "I'm not driving these days. My arm is broken.",
            "I'm not driving these days. My car is broken.",
          ],
          correctAnswer: "I'm not driving these days. My car is broken.",
          hint: "Escute **I'm not driving** (temporário) e o final: **car** ou **arm**.",
          explanation:
            "Perfeito! “Não estou dirigindo esses dias. Meu carro está quebrado.”",
          correction:
            "A frase é **I'm not driving these days. My car is broken.** Use o botão 0.5× para ouvir “car”.",
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
          after: " in a small town near the coast. They love it there.",
          options: ["are living", "live", "lives"],
          correctAnswer: "live",
          hint:
            "Permanente → **present simple** (I live in Madrid) · temporário → **present continuous** (I'm living with my aunt this month).",
          explanation:
            "Mandou bem! “My parents live in a small town near the coast.” Lição completa! 🎉",
          correction: "Quase lá! Situação permanente → **My parents live.**",
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
