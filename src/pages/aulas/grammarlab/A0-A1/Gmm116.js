import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 13 (Time expressions): tomorrow · tonight · next week
// / month / year · soon · in two days. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["tomorrow", "amanhã"],
            ["next week", "semana que vem"],
            ["soon", "em breve"],
            ["tonight", "hoje à noite"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "Futuro: **tomorrow, tonight, next week / month / year, soon, in two days**.",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **tomorrow** = amanhã · **next week** = semana que vem · **soon** = em breve · **tonight** = hoje à noite.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'll see you ",
          after: " week.",
          options: ["last", "next", "ago"],
          correctAnswer: "next",
          hint:
            "Futuro: **tomorrow, tonight, next week / month / year, soon, in two days**.",
          explanation: "Isso aí! “I'll see you next week” = “Te vejo semana que vem.”",
          correction: "Quase! Futuro → **next week.** (last = passado)",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We're going to travel next month.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm116S3.mp3"),
          options: [
            "We traveled last month.",
            "We're going to travel next month.",
            "We're going to travel next week.",
          ],
          correctAnswer: "We're going to travel next month.",
          hint:
            "Escute **going to travel** (futuro) ou **traveled**, e **month** ou **week**.",
          explanation:
            "Ótimo ouvido! “We're going to travel next month” = “Nós vamos viajar mês que vem.”",
          correction:
            "A frase é **We're going to travel next month.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She'll be back ",
          after: " two days.",
          answer: "in",
          hint: "“Daqui a dois dias” = **in two days**.",
          explanation:
            "Isso! “She'll be back in two days” = “Ela volta daqui a dois dias.”",
          correction: "A palavra certa é **in**: in two days = daqui a dois dias.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu vou terminar em breve.",
          answer: ["I", "will", "finish", "soon"],
          bank: ["finish", "soon", "I", "will", "finished", "ago"],
          hint:
            "Futuro: **tomorrow, tonight, next week / month / year, soon, in two days**.",
          explanation: "Perfeito! “I will finish soon” = “Eu vou terminar em breve.”",
          correction: "O certo é **I will finish soon.** “Em breve” = soon.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The party is ",
          after: " Saturday.",
          options: ["on", "in", "at"],
          correctAnswer: "on",
          hint: "Dia da semana → **on**: on Saturday.",
          explanation: "Mandou bem! “The party is on Saturday” = “A festa é no sábado.”",
          correction: "Quase! Dia da semana → **on Saturday.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What are you going to do ",
          after: "?",
          answer: "tomorrow",
          instruction: "Type the word for “amanhã”.",
          hint:
            "Futuro: **tomorrow, tonight, next week / month / year, soon, in two days**.",
          explanation:
            "Isso! “What are you going to do tomorrow?” = “O que você vai fazer amanhã?”",
          correction: "A resposta é **tomorrow** (amanhã).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele vai fazer 18 anos ano que vem.",
          answer: ["He", "will", "be", "18", "next", "year"],
          bank: ["be", "18", "He", "will", "next", "year", "is", "last"],
          hint: "Idade usa **be**: he will be 18. “Ano que vem” = **next year**.",
          explanation:
            "Muito bem! “He will be 18 next year” = “Ele vai fazer 18 anos ano que vem.”",
          correction: "O certo é **He will be 18 next year.** Idade → will be.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'll call you tonight.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm116S9.mp3"),
          options: [
            "I'll call you tomorrow.",
            "I'll call you at night.",
            "I'll call you tonight.",
          ],
          correctAnswer: "I'll call you tonight.",
          hint: "Escute o final: **tonight**, **tomorrow** ou **at night**.",
          explanation: "Perfeito! “I'll call you tonight” = “Te ligo hoje à noite.”",
          correction:
            "A frase é **I'll call you tonight.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "In 2050, people ",
          after: " live on Mars.",
          options: ["did", "are", "will"],
          correctAnswer: "will",
          hint: "Previsão para o futuro distante → **will**.",
          explanation:
            "Mandou bem! “In 2050, people will live on Mars” = “Em 2050, as pessoas vão morar em Marte.” Lição completa! 🎉",
          correction: "Quase lá! Previsão → **people will live.**",
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
