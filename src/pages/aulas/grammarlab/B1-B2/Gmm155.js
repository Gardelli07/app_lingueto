import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 4 (Already or yet?): Afirmativa
// (already) × negativa e pergunta (yet). Os 5 tipos do Grammar Lab
// alternados, uma pergunta por slide. O combo e o XP seguem de um slide para
// o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o painel
// de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " cleaned the kitchen.",
          options: ["already", "yet", "ever"],
          correctAnswer: "already",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation:
            "Isso aí! “I've already cleaned the kitchen” = “Já limpei a cozinha.”",
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
          before: "Have they paid the bill ",
          after: "?",
          answer: "yet",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation:
            "Isso! “Have they paid the bill yet?” = “Eles já pagaram a conta?”",
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
            ["already", "já (afirmativa)"],
            ["yet", "ainda (negativa) / já (pergunta)"],
            ["just", "acabou de"],
            ["still", "ainda (continua)"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its meaning.",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation: "Mandou bem! Você já domina as quatro palavras.",
          correction:
            "Esse par não combina. **already** = já · **yet** = ainda / já? · **just** = acabou de · **still** = ainda.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Has the meeting started yet?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm155S4.mp3"),
          options: [
            "Has the meeting started yet?",
            "Has the meeting finished yet?",
            "The meeting has already started.",
          ],
          correctAnswer: "Has the meeting started yet?",
          hint: "Escute **started** ou **finished**, e se é pergunta (**Has … yet?**).",
          explanation:
            "Ótimo ouvido! “Has the meeting started yet?” = “A reunião já começou?”",
          correction:
            "A frase é **Has the meeting started yet?** Use o botão 0.5× para ouvir “started”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu já mandei o e-mail.",
          answer: ["I've", "already", "sent", "the", "email"],
          bank: ["I've", "already", "sent", "the", "email", "yet", "send"],
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation: "Perfeito! “I've already sent the email.”",
          correction: "O certo é **I've already sent the email.** Afirmativa → already.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Don't worry, I haven't told anyone ",
          after: ".",
          options: ["already", "yet", "just"],
          correctAnswer: "yet",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation:
            "Mandou bem! “I haven't told anyone yet” = “Ainda não contei para ninguém.”",
          correction: "Quase! Negativa → **yet.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He's ",
          after: " eaten two sandwiches, and it's only 10 a.m.!",
          answer: "already",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation:
            "Isso! “He's already eaten two sandwiches” = “Ele já comeu dois sanduíches.”",
          correction: "A resposta é **already**: afirmativa, antes do esperado.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A gente ainda não escolheu o nome do bebê.",
          answer: ["We", "haven't", "chosen", "the", "baby's", "name", "yet"],
          bank: [
            "We",
            "haven't",
            "chosen",
            "the",
            "baby's",
            "name",
            "yet",
            "already",
            "chose",
          ],
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation: "Muito bem! “We haven't chosen the baby's name yet.”",
          correction:
            "O certo é **We haven't chosen the baby's name yet.** Negativa → yet no final.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I've already booked the tickets.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm155S9.mp3"),
          options: [
            "I haven't booked the tickets yet.",
            "I've already bought the tickets.",
            "I've already booked the tickets.",
          ],
          correctAnswer: "I've already booked the tickets.",
          hint:
            "Escute **already** ou **haven't … yet**, e **booked** (reservei) ou **bought** (comprei).",
          explanation:
            "Perfeito! “I've already booked the tickets” = “Já reservei os ingressos.”",
          correction:
            "A frase é **I've already booked the tickets.** Use o botão 0.5× para ouvir “booked”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is dinner ready ",
          after: "?",
          options: ["already", "yet", "just"],
          correctAnswer: "yet",
          hint:
            "Afirmativa → **already** (entre have e o particípio) · negativa e pergunta → **yet** (no final).",
          explanation:
            "Mandou bem! “Is dinner ready yet?” = “O jantar já está pronto?” Lição completa! 🎉",
          correction: "Quase lá! Pergunta → **yet no final.**",
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
