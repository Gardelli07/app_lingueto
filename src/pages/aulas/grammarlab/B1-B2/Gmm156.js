import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 5 (Still): still = ainda (algo
// continua) · I still haven't…. Os 5 tipos do Grammar Lab alternados, uma
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
          after: " haven't found my keys.",
          options: ["still", "yet", "already"],
          correctAnswer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation:
            "Isso aí! “I still haven't found my keys” = “Ainda não achei minhas chaves.”",
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
          before: "She ",
          after: " hasn't called me back.",
          answer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation:
            "Isso! “She still hasn't called me back” = “Ela ainda não me retornou.”",
          correction: "A palavra certa é **still**: vem antes de hasn't.",
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
            ["I still haven't…", "Eu ainda não… (e já devia)"],
            ["I haven't… yet", "Eu ainda não…"],
            ["He still lives here.", "Ele ainda mora aqui."],
            ["Are you still working?", "Você ainda está trabalhando?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation: "Mandou bem! Still = ainda (continua).",
          correction:
            "Esse par não combina. **still haven't** = ainda não (impaciência) · **yet** = ainda não · **still lives / still working** = ainda.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We still haven't heard from him.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm156S4.mp3"),
          options: [
            "We still haven't heard from him.",
            "We still haven't heard from her.",
            "We haven't heard from him yet.",
          ],
          correctAnswer: "We still haven't heard from him.",
          hint: "Escute **still** no começo ou **yet** no final, e **him** ou **her**.",
          explanation:
            "Ótimo ouvido! “We still haven't heard from him” = “Ainda não tivemos notícias dele.”",
          correction:
            "A frase é **We still haven't heard from him.** Use o botão 0.5× para ouvir “still”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele ainda não pagou o aluguel (e já devia).",
          answer: ["He", "still", "hasn't", "paid", "the", "rent"],
          bank: ["He", "still", "hasn't", "paid", "the", "rent", "already", "pay"],
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation: "Perfeito! “He still hasn't paid the rent.”",
          correction:
            "O certo é **He still hasn't paid the rent.** Still vem antes de hasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It's midnight and the kids are ",
          after: " awake.",
          options: ["yet", "still", "already"],
          correctAnswer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation:
            "Mandou bem! “The kids are still awake” = “As crianças ainda estão acordadas.”",
          correction: "Quase! Algo que continua → **still.**",
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
          after: " don't understand this exercise.",
          answer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation:
            "Isso! “I still don't understand this exercise” = “Ainda não entendo este exercício.”",
          correction: "A resposta é **still**: vem antes de don't.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você ainda está com fome?",
          answer: ["Are", "you", "still", "hungry"],
          bank: ["Are", "you", "still", "hungry", "yet", "Do"],
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation: "Muito bem! “Are you still hungry?” = “Você ainda está com fome?”",
          correction: "O certo é **Are you still hungry?** Still vem depois do sujeito.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is it still raining?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm156S9.mp3"),
          options: [
            "Has it stopped raining?",
            "Is it raining yet?",
            "Is it still raining?",
          ],
          correctAnswer: "Is it still raining?",
          hint: "Escute **still raining** (ainda chovendo) ou **stopped raining**.",
          explanation: "Perfeito! “Is it still raining?” = “Ainda está chovendo?”",
          correction:
            "A frase é **Is it still raining?** Use o botão 0.5× para ouvir “still”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They've been engaged for ten years and they ",
          after: " haven't got married!",
          options: ["still", "yet", "already"],
          correctAnswer: "still",
          hint:
            "**still** = ainda (algo continua). Com negativa, vem antes de haven't / hasn't: I still haven't called her.",
          explanation:
            "Mandou bem! “They still haven't got married!” = “Eles ainda não se casaram!” Lição completa! 🎉",
          correction: "Quase lá! Antes de haven't → **still.**",
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
