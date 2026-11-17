import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 6 (Today, this week, so far):
// Período que ainda não terminou → present perfect. Os 5 tipos do Grammar Lab
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
          before: "I've drunk three coffees ",
          after: ".",
          options: ["yesterday", "today", "last week"],
          correctAnswer: "today",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation:
            "Isso aí! “I've drunk three coffees today” = “Já tomei três cafés hoje.”",
          correction:
            "Quase! Present perfect combina com período não terminado: **today.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How many emails have you ",
          after: " (write) this morning?",
          answer: "written",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Isso! “How many emails have you written this morning?”",
          correction: "A palavra certa é **written**: write → wrote → written.",
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
            ["today", "hoje (ainda não acabou)"],
            ["this week", "esta semana"],
            ["so far", "até agora"],
            ["this year", "este ano"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a phrase, then its translation.",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **today** = hoje · **this week** = esta semana · **so far** = até agora · **this year** = este ano.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It's been a busy week so far.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm157S4.mp3"),
          options: [
            "It was a busy week.",
            "It's been a busy week so far.",
            "It's been a busy day so far.",
          ],
          correctAnswer: "It's been a busy week so far.",
          hint: "Escute **It's been** (present perfect) e **week** ou **day**.",
          explanation:
            "Ótimo ouvido! “It's been a busy week so far” = “A semana está corrida até agora.”",
          correction:
            "A frase é **It's been a busy week so far.** Use o botão 0.5× para ouvir “week”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Já choveu três vezes esta semana.",
          answer: ["It", "has", "rained", "three", "times", "this", "week"],
          bank: ["It", "has", "rained", "three", "times", "this", "week", "rain", "last"],
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Perfeito! “It has rained three times this week.”",
          correction:
            "O certo é **It has rained three times this week.** Semana não terminada → present perfect.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " a lot of progress this year.",
          options: ["have made", "make", "makes"],
          correctAnswer: "have made",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Mandou bem! “We have made a lot of progress this year.”",
          correction: "Quase! Este ano (não terminou) → **have made.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "So far, we have ",
          after: " (sell) 200 tickets.",
          answer: "sold",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation:
            "Isso! “So far, we have sold 200 tickets” = “Até agora vendemos 200 ingressos.”",
          correction: "A resposta é **sold**: sell → sold → sold.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu ainda não vi o João hoje.",
          answer: ["I", "haven't", "seen", "João", "today"],
          bank: ["I", "haven't", "seen", "João", "today", "yesterday", "saw"],
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Muito bem! “I haven't seen João today.”",
          correction:
            "O certo é **I haven't seen João today.** Hoje ainda não acabou → present perfect.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's had two job interviews this month.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm157S9.mp3"),
          options: [
            "She had two job interviews last month.",
            "She's had two job interviews this month.",
            "She's had three job interviews this month.",
          ],
          correctAnswer: "She's had two job interviews this month.",
          hint: "Escute **She's had … this month** ou **had … last month**, e o número.",
          explanation:
            "Perfeito! “She's had two job interviews this month” = “Ela já fez duas entrevistas este mês.”",
          correction:
            "A frase é **She's had two job interviews this month.** Use o botão 0.5× para ouvir o número.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have you spoken to your mum ",
          after: "?",
          options: ["today", "yesterday", "last night"],
          correctAnswer: "today",
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation:
            "Mandou bem! “Have you spoken to your mum today?” Lição completa! 🎉",
          correction: "Quase lá! Present perfect + período não terminado → **today.**",
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
