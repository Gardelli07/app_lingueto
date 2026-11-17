import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 7 (First time & superlatives):
// It's the first time I've… · the best / worst / most … I've ever…. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This is the first time I've ",
          after: " sushi.",
          options: ["eaten", "ate", "eat"],
          correctAnswer: "eaten",
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation:
            "Isso aí! “This is the first time I've eaten sushi” = “É a primeira vez que como sushi.”",
          correction: "Quase! It's the first time I've + particípio: **eaten.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It's the best film I've ever ",
          after: " (see).",
          answer: "seen",
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation:
            "Isso! “It's the best film I've ever seen” = “É o melhor filme que já vi.”",
          correction: "A palavra certa é **seen**: I've ever + particípio.",
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
            ["It's the first time I've…", "É a primeira vez que eu…"],
            ["the best … I've ever…", "o melhor … que eu já…"],
            ["the worst … I've ever…", "o pior … que eu já…"],
            ["I've never … before", "Eu nunca … antes"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **first time** = primeira vez · **best** = melhor · **worst** = pior · **never … before** = nunca antes.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It's the most beautiful place I've ever seen.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm150S4.mp3"),
          options: [
            "It's the most beautiful beach I've ever seen.",
            "It's the most beautiful place I've ever seen.",
            "It's the most beautiful place I ever saw.",
          ],
          correctAnswer: "It's the most beautiful place I've ever seen.",
          hint: "Escute **place** ou **beach**, e **I've ever seen** no final.",
          explanation: "Ótimo ouvido! “É o lugar mais bonito que já vi.”",
          correction:
            "A frase é **It's the most beautiful place I've ever seen.** Use o botão 0.5× para ouvir “place”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "É a primeira vez que ela dirige.",
          answer: ["It's", "the", "first", "time", "she", "has", "driven"],
          bank: ["It's", "the", "first", "time", "she", "has", "driven", "drove", "have"],
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation: "Perfeito! “It's the first time she has driven.”",
          correction:
            "O certo é **It's the first time she has driven.** Em inglês, depois de “first time” vem o present perfect.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "That's the worst meal I've ever ",
          after: "!",
          options: ["have", "had", "having"],
          correctAnswer: "had",
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation:
            "Mandou bem! “That's the worst meal I've ever had!” = “É a pior refeição que já comi!”",
          correction: "Quase! I've ever + particípio: **had.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He's the funniest person I've ever ",
          after: " (meet).",
          answer: "met",
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation:
            "Isso! “He's the funniest person I've ever met” = “Ele é a pessoa mais engraçada que já conheci.”",
          correction: "A resposta é **met**: meet → met → met.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu nunca estive aqui antes.",
          answer: ["I've", "never", "been", "here", "before"],
          bank: ["I've", "never", "been", "here", "before", "went", "ever"],
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation: "Muito bem! “I've never been here before.”",
          correction: "O certo é **I've never been here before.** Never + been + before.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "This is the first time I've flown.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm150S9.mp3"),
          options: [
            "This is the first time I fly.",
            "This is the first time I've flown.",
            "This is the first time I've flown alone.",
          ],
          correctAnswer: "This is the first time I've flown.",
          hint: "Escute **I've flown** e se tem **alone** (sozinho) no final.",
          explanation:
            "Perfeito! “This is the first time I've flown” = “É a primeira vez que ando de avião.”",
          correction:
            "A frase é **This is the first time I've flown.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It's the easiest test we've ever ",
          after: ".",
          options: ["did", "done", "do"],
          correctAnswer: "done",
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation:
            "Mandou bem! “It's the easiest test we've ever done.” Lição completa! 🎉",
          correction: "Quase lá! We've ever + particípio: **done.**",
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
