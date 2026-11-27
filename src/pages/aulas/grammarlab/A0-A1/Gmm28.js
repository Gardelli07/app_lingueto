import createLessonScreen from "../../LessonScreen";

// Past simple, aula 14 (Was or did?): was / were (estado, lugar, adjetivo) ×
// did / didn't (ações). Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you tired yesterday?",
          options: ["Were", "Did", "Was"],
          correctAnswer: "Were",
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation:
            "Isso aí! “Were you tired yesterday?” = “Você estava cansado ontem?”",
          correction: "Quase! “Tired” é adjetivo → be: **Were you tired?**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " you like the food?",
          answer: "Did",
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation: "Isso! “Did you like the food?” = “Você gostou da comida?”",
          correction: "A palavra certa é **Did**: “like” é uma ação (verbo).",
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
            ["I was tired", "Eu estava cansado"],
            ["I worked", "Eu trabalhei"],
            ["I wasn't there", "Eu não estava lá"],
            ["I didn't work", "Eu não trabalhei"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation: "Mandou bem! Você já separa was e did.",
          correction:
            "Esse par não combina. **was / wasn't** = estava · **worked / didn't work** = trabalhei / não trabalhei.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Was it expensive?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm28S4.mp3"),
          options: ["Was it expensive?", "Is it expensive?", "Was it cheap?"],
          correctAnswer: "Was it expensive?",
          hint: "Escute **Was** ou **Is**, e **expensive** (caro) ou **cheap** (barato).",
          explanation: "Ótimo ouvido! “Was it expensive?” = “Foi caro?”",
          correction: "A frase é **Was it expensive?** Adjetivo → was.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não estava feliz.",
          answer: ["He", "wasn't", "happy"],
          bank: ["wasn't", "happy", "He", "didn't", "was"],
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation: "Perfeito! “He wasn't happy” = “Ele não estava feliz.”",
          correction: "O certo é **He wasn't happy.** Adjetivo → wasn't (não didn't).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " go to school yesterday. She was sick.",
          options: ["wasn't", "didn't", "weren't"],
          correctAnswer: "didn't",
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation:
            "Mandou bem! “She didn't go to school yesterday” = “Ela não foi à escola ontem.”",
          correction: "Quase! “Go” é ação → **didn't go.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você foi à festa?",
          answer: ["Did", "you", "go", "to", "the", "party"],
          bank: ["go", "to", "the", "Did", "you", "party", "Were", "went"],
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation: "Muito bem! “Did you go to the party?” = “Você foi à festa?”",
          correction: "O certo é **Did you go to the party?** Ação → Did + go.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The movie last night ",
          after: " boring.",
          answer: "was",
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation:
            "Isso! “The movie last night was boring” = “O filme de ontem à noite foi chato.”",
          correction: "A resposta é **was**: “boring” é adjetivo.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Did you see the game?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm28S9.mp3"),
          options: [
            "Were you at the game?",
            "Did you see the game?",
            "Do you see the game?",
          ],
          correctAnswer: "Did you see the game?",
          hint: "Escute **Did you see** (ação) ou **Were you at** (lugar).",
          explanation: "Perfeito! “Did you see the game?” = “Você viu o jogo?”",
          correction:
            "A frase é **Did you see the game?** Use o botão 0.5× para ouvir “Did”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " at home all day yesterday.",
          options: ["did", "was", "were"],
          correctAnswer: "was",
          hint:
            "Estado, lugar, adjetivo → **was / were** (I was tired). Ação → **did / didn't** (Did you go?).",
          explanation:
            "Mandou bem! “I was at home all day yesterday” = “Eu fiquei em casa o dia todo ontem.” Lição completa! 🎉",
          correction: "Quase lá! Lugar → be: **I was at home.**",
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
