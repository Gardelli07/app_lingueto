import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 1 (Just): just = acabou de · have /
// has + just + particípio. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " had lunch, so I'm not hungry.",
          options: ["just", "yet", "ever"],
          correctAnswer: "just",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Isso aí! “I've just had lunch” = “Acabei de almoçar.”",
          correction: "Quase! “Acabei de” = **just**.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She has just ",
          after: " (leave) the office.",
          answer: "left",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation:
            "Isso! “She has just left the office” = “Ela acabou de sair do escritório.”",
          correction: "A palavra certa é **left**: leave → left → left.",
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
            ["I've just arrived.", "Acabei de chegar."],
            ["She's just called.", "Ela acabou de ligar."],
            ["We've just eaten.", "Acabamos de comer."],
            ["They've just left.", "Eles acabaram de sair."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Mandou bem! Just = acabou de.",
          correction:
            "Esse par não combina. **arrived** = chegar · **called** = ligar · **eaten** = comer · **left** = sair.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The film has just started.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm152S4.mp3"),
          options: [
            "The film has just started.",
            "The film has just finished.",
            "The film has already started.",
          ],
          correctAnswer: "The film has just started.",
          hint:
            "Escute **just** ou **already**, e **started** (começou) ou **finished** (terminou).",
          explanation:
            "Ótimo ouvido! “The film has just started” = “O filme acabou de começar.”",
          correction:
            "A frase é **The film has just started.** Use o botão 0.5× para ouvir “just started”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu acabei de ver a Ana.",
          answer: ["I've", "just", "seen", "Ana"],
          bank: ["I've", "just", "seen", "Ana", "saw", "yet"],
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Perfeito! “I've just seen Ana” = “Acabei de ver a Ana.”",
          correction: "O certo é **I've just seen Ana.** I've + just + seen.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look! It's ",
          after: " stopped raining.",
          options: ["yet", "just", "never"],
          correctAnswer: "just",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation:
            "Mandou bem! “It's just stopped raining” = “Acabou de parar de chover.”",
          correction: "Quase! “Acabou de” = **just**.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We've ",
          after: " got home. Can I call you later?",
          answer: "just",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Isso! “We've just got home” = “Acabamos de chegar em casa.”",
          correction: "A resposta é **just**: acabaram de chegar.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O ônibus acabou de sair.",
          answer: ["The", "bus", "has", "just", "left"],
          bank: ["The", "bus", "has", "just", "left", "leaved", "yet"],
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Muito bem! “The bus has just left” = “O ônibus acabou de sair.”",
          correction: "O certo é **The bus has just left.** Has + just + left.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's just woken up.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm152S9.mp3"),
          options: [
            "She's just woken up.",
            "He's just washed up.",
            "He's just woken up.",
          ],
          correctAnswer: "He's just woken up.",
          hint:
            "Escute **He's** ou **She's**, e **woken up** (acordou) ou **washed up** (lavou a louça).",
          explanation: "Perfeito! “He's just woken up” = “Ele acabou de acordar.”",
          correction: "A frase é **He's just woken up.** wake → woke → woken.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Your coffee is hot. I've just ",
          after: " it.",
          options: ["make", "made", "making"],
          correctAnswer: "made",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation:
            "Mandou bem! “I've just made it” = “Acabei de fazer.” Lição completa! 🎉",
          correction: "Quase lá! Have + just + particípio: **made.**",
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
