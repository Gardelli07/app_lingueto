import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 2 (Already): already = já (antes do
// esperado), em frases afirmativas. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We don't need to buy milk. I've ",
          after: " bought some.",
          options: ["already", "yet", "ever"],
          correctAnswer: "already",
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Isso aí! “I've already bought some” = “Já comprei.”",
          correction: "Quase! Afirmativa com “já” → **already.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The train has ",
          after: " left. We're too late!",
          answer: "already",
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Isso! “The train has already left” = “O trem já saiu.”",
          correction: "A palavra certa é **already**: já saiu (antes de chegarmos).",
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
            ["I've already done it.", "Eu já fiz isso."],
            ["She's already gone.", "Ela já foi embora."],
            ["We've already paid.", "Nós já pagamos."],
            ["They've already seen it.", "Eles já viram."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Mandou bem! Already = já.",
          correction:
            "Esse par não combina. **done** = fiz · **gone** = foi embora · **paid** = pagamos · **seen** = viram.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I've already finished my homework.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm153S4.mp3"),
          options: [
            "I haven't finished my homework yet.",
            "I've already finished my homework.",
            "I've already finished my housework.",
          ],
          correctAnswer: "I've already finished my homework.",
          hint:
            "Escute **already** (já) ou **haven't … yet** (ainda não), e **homework** ou **housework**.",
          explanation:
            "Ótimo ouvido! “I've already finished my homework” = “Já terminei a lição.”",
          correction:
            "A frase é **I've already finished my homework.** Use o botão 0.5× para ouvir “already”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela já leu o livro todo.",
          answer: ["She", "has", "already", "read", "the", "whole", "book"],
          bank: [
            "She",
            "has",
            "already",
            "read",
            "the",
            "whole",
            "book",
            "yet",
            "readed",
          ],
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Perfeito! “She has already read the whole book.”",
          correction:
            "O certo é **She has already read the whole book.** Has + already + read.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is Tom coming? – No, he's ",
          after: " gone home.",
          options: ["yet", "ever", "already"],
          correctAnswer: "already",
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Mandou bem! “He's already gone home” = “Ele já foi para casa.”",
          correction: "Quase! Afirmativa → **already.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " told you twice!",
          answer: "already",
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation:
            "Isso! “I've already told you twice!” = “Eu já te disse duas vezes!”",
          correction: "A resposta é **already**: já disse.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós já reservamos o hotel.",
          answer: ["We", "have", "already", "booked", "the", "hotel"],
          bank: ["We", "have", "already", "booked", "the", "hotel", "yet", "book"],
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation: "Muito bem! “We have already booked the hotel.”",
          correction:
            "O certo é **We have already booked the hotel.** Have + already + booked.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Has she already left?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm153S9.mp3"),
          options: ["Has she already left?", "Has he already left?", "Has she left yet?"],
          correctAnswer: "Has she already left?",
          hint: "Escute **she** ou **he**, e **already left** ou **left yet**.",
          explanation:
            "Perfeito! “Has she already left?” = “Ela já foi embora?” (surpresa)",
          correction:
            "A frase é **Has she already left?** Use o botão 0.5× para ouvir “already”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You're too late. The concert has ",
          after: " started.",
          options: ["yet", "already", "still"],
          correctAnswer: "already",
          hint:
            "**already** = já (antes do esperado), em frases afirmativas: She's already left. Fica entre have / has e o particípio.",
          explanation:
            "Mandou bem! “The concert has already started” = “O show já começou.” Lição completa! 🎉",
          correction: "Quase lá! Afirmativa → **already started.**",
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
