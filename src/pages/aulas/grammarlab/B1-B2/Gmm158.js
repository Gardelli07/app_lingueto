import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 7 (Review): Revisão do Set 5: just,
// already, yet, still, today / so far. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " finished. Give me a minute to save it.",
          options: ["just", "yet", "ever"],
          correctAnswer: "just",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Isso aí! “I've just finished” = “Acabei de terminar.”",
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
          before: "Have you packed your bags ",
          after: "?",
          answer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation: "Isso! “Have you packed your bags yet?” = “Você já fez as malas?”",
          correction: "A palavra certa é **yet**: pergunta, no final.",
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
            ["I've just eaten.", "Acabei de comer."],
            ["I've already eaten.", "Já comi."],
            ["I haven't eaten yet.", "Ainda não comi."],
            ["I still haven't eaten.", "Ainda não comi (e já devia)."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation: "Mandou bem! Você domina just, already, yet e still.",
          correction:
            "Esse par não combina. **just** = acabei de · **already** = já · **yet** = ainda não · **still haven't** = ainda não (impaciência).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela já foi embora.",
          answer: ["She", "has", "already", "left"],
          bank: ["She", "has", "already", "left", "yet", "leaved"],
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Perfeito! “She has already left” = “Ela já foi embora.”",
          correction: "O certo é **She has already left.** Has + already + left.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Have you finished yet?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm158S5.mp3"),
          options: ["Have you finished yet?", "Have you finished it?", "Did you finish?"],
          correctAnswer: "Have you finished yet?",
          hint: "Escute **Have you finished** e o final: **yet** ou **it**.",
          explanation: "Ótimo ouvido! “Have you finished yet?” = “Você já terminou?”",
          correction:
            "A frase é **Have you finished yet?** Use o botão 0.5× para ouvir o final.",
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
          after: " haven't received the package.",
          options: ["yet", "still", "just"],
          correctAnswer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation: "Mandou bem! “We still haven't received the package.”",
          correction: "Quase! Antes de haven't → **still.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The plane has ",
          after: " landed. Look, the passengers are coming out!",
          answer: "just",
          hint:
            "**just** = acabou de: I've just eaten. Fica entre have / has e o particípio.",
          explanation: "Isso! “The plane has just landed” = “O avião acabou de pousar.”",
          correction: "A resposta é **just**: acabou de pousar.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu tomei dois cafés hoje.",
          answer: ["I've", "had", "two", "coffees", "today"],
          bank: ["I've", "had", "two", "coffees", "today", "have", "yet"],
          hint:
            "Período que ainda não terminou (**today, this week, this year, so far**) → **present perfect**. Período terminado (yesterday, last week) → past simple.",
          explanation: "Muito bem! “I've had two coffees today.”",
          correction:
            "O certo é **I've had two coffees today.** Hoje (não terminou) → present perfect.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's just got a new job.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm158S9.mp3"),
          options: [
            "She's just got a new job.",
            "He's still got a new job.",
            "He's just got a new job.",
          ],
          correctAnswer: "He's just got a new job.",
          hint: "Escute **He's** ou **She's**, e **just** ou **still**.",
          explanation:
            "Perfeito! “He's just got a new job” = “Ele acabou de conseguir um emprego novo.”",
          correction:
            "A frase é **He's just got a new job.** Use o botão 0.5× para ouvir “just”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I haven't seen the new film ",
          after: ".",
          options: ["yet", "already", "still"],
          correctAnswer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Mandou bem! “I haven't seen the new film yet.” Set 5 completo! 🎉",
          correction: "Quase lá! Negativa + no final → **yet.**",
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
