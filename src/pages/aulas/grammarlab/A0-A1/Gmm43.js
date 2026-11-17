import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 1 (I am + -ing): I am + verbo-ing: o que eu estou
// fazendo agora. Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " studying now.",
          options: ["am", "is", "are"],
          correctAnswer: "am",
          hint: "I → **am + verbo-ing**: I am studying.",
          explanation: "Isso aí! “I am studying now” = “Eu estou estudando agora.”",
          correction: "Quase! Com “I”, usamos am: **I am studying.**",
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
            ["I am eating", "Eu estou comendo"],
            ["I am reading", "Eu estou lendo"],
            ["I am sleeping", "Eu estou dormindo"],
            ["I am cooking", "Eu estou cozinhando"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**-ing** = -ando / -endo / -indo em português: eating = comendo.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **eating** = comendo · **reading** = lendo · **sleeping** = dormindo · **cooking** = cozinhando.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I am ",
          after: " (work) right now.",
          answer: "working",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “I am working right now” = “Eu estou trabalhando agora.”",
          correction: "A palavra certa é **working**: work + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I am watching TV.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm43S4.mp3"),
          options: ["I watch TV.", "I am watching TV.", "I am watching a movie."],
          correctAnswer: "I am watching TV.",
          hint: "Escute se tem **am …ing** (agora) e o final: **TV** ou **a movie**.",
          explanation: "Ótimo ouvido! “I am watching TV” = “Eu estou assistindo TV.”",
          correction:
            "A frase é **I am watching TV.** Use o botão 0.5× para ouvir “am watching”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estou bebendo água.",
          answer: ["I", "am", "drinking", "water"],
          bank: ["drinking", "water", "I", "am", "drink", "is"],
          hint: "I → **am + verbo-ing**: I am studying.",
          explanation: "Perfeito! “I am drinking water” = “Eu estou bebendo água.”",
          correction: "O certo é **I am drinking water.** I + am + drinking.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I am ",
          after: " a book.",
          options: ["reading", "read", "reads"],
          correctAnswer: "reading",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Mandou bem! “I am reading a book” = “Eu estou lendo um livro.”",
          correction: "Quase! Depois de am, o verbo vem com -ing: **reading.**",
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
          after: " listening to music.",
          answer: "am",
          hint: "I → **am + verbo-ing**: I am studying.",
          explanation: "Isso! “I am listening to music” = “Eu estou ouvindo música.”",
          correction: "A resposta é **am**: I am listening.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estou esperando o ônibus.",
          answer: ["I", "am", "waiting", "for", "the", "bus"],
          bank: ["waiting", "for", "the", "I", "am", "bus", "wait", "is"],
          hint: "“Esperar” = **wait for**. I am waiting for the bus.",
          explanation:
            "Muito bem! “I am waiting for the bus” = “Eu estou esperando o ônibus.”",
          correction: "O certo é **I am waiting for the bus.** Wait vem com “for”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I am talking to my mom.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm43S9.mp3"),
          options: [
            "I am talking to my dad.",
            "I talk to my mom.",
            "I am talking to my mom.",
          ],
          correctAnswer: "I am talking to my mom.",
          hint: "Escute **am talking** ou **talk**, e o final: **mom** ou **dad**.",
          explanation:
            "Perfeito! “I am talking to my mom” = “Eu estou falando com a minha mãe.”",
          correction:
            "A frase é **I am talking to my mom.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Sorry, I can't talk. I ",
          after: " driving.",
          options: ["is", "am", "are"],
          correctAnswer: "am",
          hint: "I → **am + verbo-ing**: I am studying.",
          explanation:
            "Mandou bem! “I am driving” = “Eu estou dirigindo.” Lição completa! 🎉",
          correction: "Quase lá! Com “I”, use am: **I am driving.**",
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
