import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 5 (Uses of will): Previsão (I think…), oferta (I'll
// help), promessa (I'll call) e decisão na hora. Os 5 tipos do Grammar Lab
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
          before: "I think it ",
          after: " rain tomorrow.",
          options: ["will", "is", "does"],
          correctAnswer: "will",
          hint:
            "**will** para: previsão com opinião (I think it will…), oferta (I'll help you), promessa (I'll call you) e decisão na hora.",
          explanation:
            "Isso aí! “I think it will rain tomorrow” = “Acho que vai chover amanhã.”",
          correction: "Quase! Previsão com “I think” → **will.**",
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
            ["I'll help you.", "Eu te ajudo. (oferta)"],
            ["I'll call you.", "Eu te ligo. (promessa)"],
            ["I think she'll win.", "Acho que ela vai ganhar. (previsão)"],
            ["I'll have a coffee.", "Vou querer um café. (decisão na hora)"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**will** para: previsão com opinião (I think it will…), oferta (I'll help you), promessa (I'll call you) e decisão na hora.",
          explanation: "Mandou bem! Você já conhece os usos de will.",
          correction:
            "Esse par não combina. **help** = ajudar · **call** = ligar · **win** = ganhar · **have a coffee** = tomar um café.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'll carry your bag.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm108S3.mp3"),
          options: ["I carry your bag.", "I'll carry your bag.", "I'll carry your bags."],
          correctAnswer: "I'll carry your bag.",
          hint: "Escute o **'ll** depois de I, e **bag** (uma) ou **bags** (várias).",
          explanation: "Ótimo ouvido! “I'll carry your bag” = “Eu carrego sua bolsa.”",
          correction:
            "A frase é **I'll carry your bag.** Use o botão 0.5× para ouvir “I'll”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Your bag looks heavy. I ",
          after: " help you.",
          answer: "will",
          hint: "Oferecer ajuda → **will**.",
          explanation: "Isso! “I will help you” = “Eu te ajudo.”",
          correction: "A palavra certa é **will**: para oferecer ajuda.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu prometo que vou estudar.",
          answer: ["I", "promise", "I", "will", "study"],
          bank: ["promise", "I", "will", "study", "I", "to", "studies"],
          hint: "Promessa → **will**: I promise I will…",
          explanation:
            "Perfeito! “I promise I will study” = “Eu prometo que vou estudar.”",
          correction: "O certo é **I promise I will study.** Promessa → will + study.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The phone is ringing. I ",
          after: " answer it.",
          options: ["answers", "am going", "will"],
          correctAnswer: "will",
          hint: "Decisão na hora → **will**.",
          explanation: "Mandou bem! “I will answer it” = “Eu atendo.”",
          correction: "Quase! Decisão na hora → **I will answer it.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Acho que você vai gostar.",
          answer: ["I", "think", "you", "will", "like", "it"],
          bank: ["think", "you", "I", "will", "like", "it", "likes", "are"],
          hint:
            "**will** para: previsão com opinião (I think it will…), oferta (I'll help you), promessa (I'll call you) e decisão na hora.",
          explanation:
            "Muito bem! “I think you will like it” = “Acho que você vai gostar.”",
          correction:
            "O certo é **I think you will like it.** Previsão com “I think” → will.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Maybe I ",
          after: " go to the beach tomorrow.",
          answer: "will",
          hint: "**Maybe** (talvez) + **will**: ainda não é um plano decidido.",
          explanation:
            "Isso! “Maybe I will go to the beach tomorrow” = “Talvez eu vá à praia amanhã.”",
          correction: "A resposta é **will**: maybe + will.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I think he'll be a great teacher.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm108S9.mp3"),
          options: [
            "I think he'll be a great teacher.",
            "I think he's a great teacher.",
            "I think she'll be a great teacher.",
          ],
          correctAnswer: "I think he'll be a great teacher.",
          hint: "Escute **he'll be** (futuro) ou **he's** (agora), e **he** ou **she**.",
          explanation:
            "Perfeito! “I think he'll be a great teacher” = “Acho que ele vai ser um ótimo professor.”",
          correction:
            "A frase é **I think he'll be a great teacher.** Use o botão 0.5× para ouvir “he'll be”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Waiter: What would you like? – ",
          after: " have the chicken, please.",
          options: ["I'm", "I will", "I do"],
          correctAnswer: "I will",
          hint: "Pedido no restaurante = decisão na hora → **will**.",
          explanation:
            "Mandou bem! “I will have the chicken” = “Vou querer o frango.” Lição completa! 🎉",
          correction: "Quase lá! Pedido na hora → **I will have the chicken.**",
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
