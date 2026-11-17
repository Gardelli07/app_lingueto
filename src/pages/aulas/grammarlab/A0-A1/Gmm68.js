import createLessonScreen from "../../LessonScreen";

// Present simple, aula 10 (Questions: Does…?): Does + he / she / it + verbo
// SEM -s?. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " she work on Saturdays?",
          options: ["Do", "Does", "Is"],
          correctAnswer: "Does",
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation:
            "Isso aí! “Does she work on Saturdays?” = “Ela trabalha aos sábados?”",
          correction: "Quase! Com “she”, a pergunta começa com **Does.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Does he ",
          after: " (like) music?",
          answer: "like",
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation: "Isso! “Does he like music?” = “Ele gosta de música?”",
          correction: "A palavra certa é **like**: o -s já está no Does.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela fala inglês?",
          answer: ["Does", "she", "speak", "English"],
          bank: ["speak", "she", "Does", "English", "Do", "speaks"],
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation: "Perfeito! “Does she speak English?” = “Ela fala inglês?”",
          correction:
            "O certo é **Does she speak English?** Does + she + speak (sem -s).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Does he play the guitar?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm68S4.mp3"),
          options: [
            "He plays the guitar.",
            "Does he play the guitar?",
            "Does she play the guitar?",
          ],
          correctAnswer: "Does he play the guitar?",
          hint: "Escute o começo (**Does** = pergunta) e **he** ou **she**.",
          explanation: "Ótimo ouvido! “Does he play the guitar?” = “Ele toca violão?”",
          correction:
            "A frase é **Does he play the guitar?** Use o botão 0.5× para ouvir “he”.",
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
            ["Does she cook?", "Ela cozinha?"],
            ["Does he drive?", "Ele dirige?"],
            ["Does it work?", "Funciona?"],
            ["Does Ana study?", "A Ana estuda?"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint:
            "Olhe o verbo: **cook** = cozinhar, **drive** = dirigir, **work** = funcionar, **study** = estudar.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **cook** = cozinha · **drive** = dirige · **work** = funciona · **study** = estuda.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Does your mom ",
          after: " coffee?",
          options: ["drink", "drinks", "drinking"],
          correctAnswer: "drink",
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation: "Mandou bem! “Does your mom drink coffee?” = “Sua mãe bebe café?”",
          correction: "Quase! Depois de Does + sujeito, o verbo fica normal: **drink.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O seu irmão mora aqui?",
          answer: ["Does", "your", "brother", "live", "here"],
          bank: ["live", "your", "Does", "here", "brother", "lives", "Do"],
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation:
            "Muito bem! “Does your brother live here?” = “Seu irmão mora aqui?”",
          correction:
            "O certo é **Does your brother live here?** Your brother = he → Does + live.",
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
          after: " the bus stop here?",
          answer: "Does",
          hint: "The bus = it → pergunta com **Does**.",
          explanation: "Isso! “Does the bus stop here?” = “O ônibus para aqui?”",
          correction: "A resposta é **Does**: the bus = it.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Does she have a dog?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm68S9.mp3"),
          options: ["Does he have a dog?", "She has a dog.", "Does she have a dog?"],
          correctAnswer: "Does she have a dog?",
          hint: "Escute o começo (**Does she** ou **Does he**) e se é pergunta.",
          explanation: "Perfeito! “Does she have a dog?” = “Ela tem cachorro?”",
          correction: "A frase é **Does she have a dog?** Com Does, has vira have.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Does Pedro ",
          after: " a car?",
          options: ["has", "have", "haves"],
          correctAnswer: "have",
          hint: "Com **Does**, o verbo volta ao normal: has → **have**.",
          explanation:
            "Mandou bem! “Does Pedro have a car?” = “O Pedro tem carro?” Lição completa! 🎉",
          correction: "Quase lá! Depois de Does, use have: **Does Pedro have a car?**",
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
