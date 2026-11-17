import createLessonScreen from "../../LessonScreen";

// Present simple, aula 2 (He / She / It + -s): Com he, she, it o verbo ganha
// -s (she works). Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " in a hospital.",
          options: ["work", "works", "working"],
          correctAnswer: "works",
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation:
            "Isso aí! “She works in a hospital” = “Ela trabalha num hospital.”",
          correction: "Quase! Com “she”, o verbo ganha -s: **She works.**",
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
            ["I work", "he works"],
            ["I live", "he lives"],
            ["I eat", "he eats"],
            ["I read", "he reads"],
          ],
          rightOrder: [3, 2, 0, 1],
          instruction: "Tap a sentence with I, then the same with he.",
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation: "Mandou bem! Você já vê o -s do he.",
          correction:
            "Esse par não combina. O verbo é o mesmo, só ganha -s: work → **works**, live → **lives**.",
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
          after: " (like) pizza.",
          answer: "likes",
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation: "Isso! “He likes pizza” = “Ele gosta de pizza.”",
          correction: "A palavra certa é **likes**: com “he”, like + s.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She drinks tea.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm60S4.mp3"),
          options: ["He drinks tea.", "She drinks tea.", "She drinks coffee."],
          correctAnswer: "She drinks tea.",
          hint: "Escute o começo (**She** ou **He**) e o final (**tea** ou **coffee**).",
          explanation: "Ótimo ouvido! “She drinks tea” = “Ela bebe chá.”",
          correction:
            "A frase é **She drinks tea.** Use o botão 0.5× para ouvir o “sh” de she.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu pai lê o jornal.",
          answer: ["My", "dad", "reads", "the", "newspaper"],
          bank: ["reads", "the", "My", "newspaper", "dad", "read"],
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation: "Perfeito! “My dad reads the newspaper” = “Meu pai lê o jornal.”",
          correction: "O certo é **My dad reads the newspaper.** My dad = he → reads.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My cat ",
          after: " a lot.",
          options: ["sleeps", "sleep", "sleeping"],
          correctAnswer: "sleeps",
          hint: "My cat = it. Com it, o verbo ganha **-s**.",
          explanation: "Mandou bem! “My cat sleeps a lot” = “Meu gato dorme muito.”",
          correction: "Quase! My cat = it → **sleeps.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Ana ",
          after: " (speak) three languages.",
          answer: "speaks",
          hint: "Ana = she. Qual é o verbo com she?",
          explanation: "Isso! “Ana speaks three languages” = “A Ana fala três idiomas.”",
          correction: "A resposta é **speaks**: Ana = she, então speak + s.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela mora com os pais.",
          answer: ["She", "lives", "with", "her", "parents"],
          bank: ["lives", "her", "She", "with", "parents", "live", "his"],
          hint: "Com she: **lives**. “Os pais dela” = **her parents**.",
          explanation:
            "Muito bem! “She lives with her parents” = “Ela mora com os pais.”",
          correction:
            "O certo é **She lives with her parents.** She → lives, e os pais dela → her parents.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He works every day.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm60S9.mp3"),
          options: ["He walks every day.", "We work every day.", "He works every day."],
          correctAnswer: "He works every day.",
          hint: "Escute **works** (trabalha) ou **walks** (caminha), e **He** ou **We**.",
          explanation: "Perfeito! “He works every day” = “Ele trabalha todo dia.”",
          correction:
            "A frase é **He works every day.** Use o botão 0.5× para ouvir “works”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The shop ",
          after: " at 9 a.m.",
          options: ["open", "opens", "opening"],
          correctAnswer: "opens",
          hint: "The shop = it → **verbo + s**.",
          explanation:
            "Mandou bem! “The shop opens at 9 a.m.” = “A loja abre às 9h.” Lição completa! 🎉",
          correction: "Quase lá! The shop = it → **opens.**",
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
