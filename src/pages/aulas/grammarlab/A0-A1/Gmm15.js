import createLessonScreen from "../../LessonScreen";

// Past simple, aula 1 (Was / Were): O verbo be no passado: I / he / she / it
// was · you / we / they were. Os 5 tipos do Grammar Lab alternados, uma
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
          after: " at home yesterday.",
          options: ["was", "were", "am"],
          correctAnswer: "was",
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation: "Isso aí! “I was at home yesterday” = “Eu estava em casa ontem.”",
          correction: "Quase! Com “I”, no passado, usamos **was.**",
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
            ["I was", "Eu estava / era"],
            ["You were", "Você estava / era"],
            ["He was", "Ele estava / era"],
            ["They were", "Eles estavam / eram"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **was** = I, he, she, it · **were** = you, we, they.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We were at the beach.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm15S3.mp3"),
          options: [
            "We are at the beach.",
            "We were at the beach.",
            "We were at the park.",
          ],
          correctAnswer: "We were at the beach.",
          hint:
            "Escute **were** (passado) ou **are** (presente), e o lugar: **beach** ou **park**.",
          explanation: "Ótimo ouvido! “We were at the beach” = “Nós estávamos na praia.”",
          correction:
            "A frase é **We were at the beach.** Use o botão 0.5× para ouvir “were”.",
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
          after: " very happy last night.",
          answer: "was",
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation:
            "Isso! “She was very happy last night” = “Ela estava muito feliz ontem à noite.”",
          correction: "A palavra certa é **was**: she → was.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles estavam cansados.",
          answer: ["They", "were", "tired"],
          bank: ["were", "tired", "They", "was", "are"],
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation: "Perfeito! “They were tired” = “Eles estavam cansados.”",
          correction: "O certo é **They were tired.** They → were.",
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
          after: " in Rio last week.",
          options: ["were", "was", "are"],
          correctAnswer: "were",
          hint: "My parents = they → **were**.",
          explanation:
            "Mandou bem! “My parents were in Rio last week” = “Meus pais estavam no Rio semana passada.”",
          correction: "Quase! My parents = they → **were.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It ",
          after: " cold yesterday.",
          answer: "was",
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation: "Isso! “It was cold yesterday” = “Estava frio ontem.”",
          correction: "A resposta é **was**: it → was.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estava na escola ontem.",
          answer: ["I", "was", "at", "school", "yesterday"],
          bank: ["was", "at", "I", "school", "yesterday", "were", "am"],
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation:
            "Muito bem! “I was at school yesterday” = “Eu estava na escola ontem.”",
          correction: "O certo é **I was at school yesterday.** I → was.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The movie was great.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm15S9.mp3"),
          options: [
            "The movie is great.",
            "The movies were great.",
            "The movie was great.",
          ],
          correctAnswer: "The movie was great.",
          hint: "Escute **was** ou **is**, e **movie** (um) ou **movies** (vários).",
          explanation: "Perfeito! “The movie was great” = “O filme foi ótimo.”",
          correction:
            "A frase é **The movie was great.** Use o botão 0.5× para ouvir “was”.",
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
          after: " late this morning!",
          options: ["was", "were", "is"],
          correctAnswer: "were",
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation:
            "Mandou bem! “You were late this morning!” = “Você estava atrasado hoje de manhã!” Lição completa! 🎉",
          correction: "Quase lá! Com “you”, sempre **were.**",
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
