import createLessonScreen from "../../LessonScreen";

// Past simple, aula 13 (Time expressions): yesterday · last night / week /
// year · two days ago · in 2010. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["yesterday", "ontem"],
            ["last week", "semana passada"],
            ["two days ago", "dois dias atrás"],
            ["last night", "ontem à noite"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a phrase, then its translation.",
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **yesterday** = ontem · **last week** = semana passada · **ago** = atrás · **last night** = ontem à noite.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I saw her two days ",
          after: ".",
          options: ["ago", "last", "next"],
          correctAnswer: "ago",
          hint: "**ago** vem depois do tempo: two days ago = dois dias atrás.",
          explanation: "Isso aí! “I saw her two days ago” = “Eu a vi dois dias atrás.”",
          correction: "Quase! “Atrás” = **ago**, depois do tempo.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We moved here last year.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm27S3.mp3"),
          options: [
            "We moved here last week.",
            "We moved here last year.",
            "We move here every year.",
          ],
          correctAnswer: "We moved here last year.",
          hint:
            "Escute o final: **last year** (ano passado) ou **last week** (semana passada).",
          explanation:
            "Ótimo ouvido! “We moved here last year” = “Nós nos mudamos para cá ano passado.”",
          correction:
            "A frase é **We moved here last year.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She called me ",
          after: " night.",
          answer: "last",
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation: "Isso! “She called me last night” = “Ela me ligou ontem à noite.”",
          correction: "A palavra certa é **last**: last night = ontem à noite.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu cheguei há uma hora.",
          answer: ["I", "arrived", "an", "hour", "ago"],
          bank: ["arrived", "an", "I", "hour", "ago", "a", "last"],
          hint: "“Há uma hora” = **an hour ago** (ago no final).",
          explanation: "Perfeito! “I arrived an hour ago” = “Eu cheguei há uma hora.”",
          correction: "O certo é **I arrived an hour ago.** O “ago” vai no final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He was born ",
          after: " 1998.",
          options: ["on", "at", "in"],
          correctAnswer: "in",
          hint: "Com ano, use **in**: in 1998, in 2010.",
          explanation: "Mandou bem! “He was born in 1998” = “Ele nasceu em 1998.”",
          correction: "Quase! Com ano: **in 1998.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We went to the beach ",
          after: " weekend.",
          answer: "last",
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation:
            "Isso! “We went to the beach last weekend” = “Nós fomos à praia no fim de semana passado.”",
          correction: "A resposta é **last**: last weekend = fim de semana passado.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela viajou semana passada.",
          answer: ["She", "traveled", "last", "week"],
          bank: ["traveled", "last", "She", "week", "ago", "travels"],
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation:
            "Muito bem! “She traveled last week” = “Ela viajou semana passada.”",
          correction:
            "O certo é **She traveled last week.** “Semana passada” = last week (sem “the”).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I talked to him yesterday morning.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm27S9.mp3"),
          options: [
            "I talked to him yesterday morning.",
            "I talked to him this morning.",
            "I talk to him every morning.",
          ],
          correctAnswer: "I talked to him yesterday morning.",
          hint: "Escute **yesterday morning** (ontem de manhã) ou **this morning**.",
          explanation:
            "Perfeito! “I talked to him yesterday morning” = “Eu falei com ele ontem de manhã.”",
          correction:
            "A frase é **I talked to him yesterday morning.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They got married three years ",
          after: ".",
          options: ["last", "ago", "in"],
          correctAnswer: "ago",
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation:
            "Mandou bem! “They got married three years ago” = “Eles se casaram três anos atrás.” Lição completa! 🎉",
          correction: "Quase lá! “Três anos atrás” = **three years ago.**",
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
