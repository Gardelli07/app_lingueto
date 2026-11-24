import createLessonScreen from "../../LessonScreen";

// Present simple, aula 15 (In / On / At): in the morning · on Monday · at 7
// o'clock · at night. Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I work ",
          after: " the morning.",
          options: ["on", "at", "in"],
          correctAnswer: "in",
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation: "Isso aí! “I work in the morning” = “Eu trabalho de manhã.”",
          correction: "Quase! Partes do dia usam in: **in the morning.**",
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
            ["in the morning", "de manhã"],
            ["on Monday", "na segunda"],
            ["at 7 o'clock", "às 7 horas"],
            ["at night", "à noite"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **in** the morning · **on** + dia · **at** + hora · **at** night.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The class starts ",
          after: " 8 o'clock.",
          answer: "at",
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation:
            "Isso! “The class starts at 8 o'clock” = “A aula começa às 8 horas.”",
          correction: "A palavra certa é **at**: hora → at.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I have English on Tuesdays.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm73S4.mp3"),
          options: [
            "I have English on Thursdays.",
            "I have English on Tuesdays.",
            "I have Spanish on Tuesdays.",
          ],
          correctAnswer: "I have English on Tuesdays.",
          hint:
            "Escute o dia (**Tuesdays** = terças ou **Thursdays** = quintas) e a matéria.",
          explanation:
            "Ótimo ouvido! “I have English on Tuesdays” = “Eu tenho inglês às terças.”",
          correction:
            "A frase é **I have English on Tuesdays.** Use o botão 0.5× para ouvir “Tuesdays”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela estuda à noite.",
          answer: ["She", "studies", "at", "night"],
          bank: ["studies", "night", "She", "at", "in", "study"],
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation: "Perfeito! “She studies at night” = “Ela estuda à noite.”",
          correction: "O certo é **She studies at night.** “À noite” = at night.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We go to church ",
          after: " Sundays.",
          options: ["in", "on", "at"],
          correctAnswer: "on",
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation:
            "Mandou bem! “We go to church on Sundays” = “Nós vamos à igreja aos domingos.”",
          correction: "Quase! Dias da semana usam on: **on Sundays.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He reads ",
          after: " the evening.",
          answer: "in",
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation: "Isso! “He reads in the evening” = “Ele lê à noitinha.”",
          correction: "A resposta é **in**: in the evening.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu acordo às 6 da manhã.",
          answer: ["I", "wake", "up", "at", "6", "in", "the", "morning"],
          bank: ["wake", "up", "I", "at", "6", "in", "the", "morning", "on", "wakes"],
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation:
            "Muito bem! “I wake up at 6 in the morning” = “Eu acordo às 6 da manhã.”",
          correction:
            "O certo é **I wake up at 6 in the morning.** Hora → at · manhã → in the morning.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We have dinner at eight.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm73S9.mp3"),
          options: [
            "We have dinner at eight.",
            "We have lunch at eight.",
            "We have dinner at nine.",
          ],
          correctAnswer: "We have dinner at eight.",
          hint:
            "Escute **dinner** (jantar) ou **lunch** (almoço), e a hora: **eight** ou **nine**.",
          explanation: "Perfeito! “We have dinner at eight” = “Nós jantamos às oito.”",
          correction:
            "A frase é **We have dinner at eight.** Use o botão 0.5× para ouvir “dinner”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My birthday party is ",
          after: " Saturday.",
          options: ["at", "in", "on"],
          correctAnswer: "on",
          hint:
            "**in** the morning / afternoon / evening · **on** + dia (on Monday) · **at** + hora (at 7) e at night.",
          explanation:
            "Mandou bem! “My birthday party is on Saturday” = “Minha festa de aniversário é no sábado.” Lição completa! 🎉",
          correction: "Quase lá! Dia da semana → **on Saturday.**",
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
