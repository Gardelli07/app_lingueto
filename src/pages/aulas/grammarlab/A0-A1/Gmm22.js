import createLessonScreen from "../../LessonScreen";

// Past simple, aula 8 (Irregular verbs 3): say → said · tell → told · write →
// wrote · drink → drank · sleep → slept · feel → felt · know → knew · lose →
// lost · find → found · think → thought. Os 5 tipos do Grammar Lab
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
          before: "She ",
          after: " “hello” to me yesterday.",
          options: ["sayed", "said", "says"],
          correctAnswer: "said",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso aí! “She said hello to me yesterday” = “Ela me disse oi ontem.”",
          correction: "Quase! Say → **said.**",
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
            ["write", "wrote"],
            ["drink", "drank"],
            ["sleep", "slept"],
            ["feel", "felt"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. write → **wrote** · drink → **drank** · sleep → **slept** · feel → **felt**.",
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
          after: " (lose) my keys yesterday.",
          answer: "lost",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “I lost my keys yesterday” = “Eu perdi minhas chaves ontem.”",
          correction: "A palavra certa é **lost**: lose → lost.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He told me a secret.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm22S4.mp3"),
          options: [
            "He told me a secret.",
            "He tells me a secret.",
            "She told me a secret.",
          ],
          correctAnswer: "He told me a secret.",
          hint: "Escute **told** (passado) ou **tells**, e **He** ou **She**.",
          explanation:
            "Ótimo ouvido! “He told me a secret” = “Ele me contou um segredo.”",
          correction:
            "A frase é **He told me a secret.** Use o botão 0.5× para ouvir “told”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu dormi muito bem.",
          answer: ["I", "slept", "very", "well"],
          bank: ["slept", "very", "I", "well", "sleeped", "good"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Perfeito! “I slept very well” = “Eu dormi muito bem.”",
          correction: "O certo é **I slept very well.** Sleep → slept.",
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
          after: " a lot of water after the game yesterday.",
          options: ["drank", "drinked", "drink"],
          correctAnswer: "drank",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “We drank a lot of water” = “Nós bebemos muita água.”",
          correction: "Quase! Drink → **drank.**",
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
          after: " (write) a letter to her mom last week.",
          answer: "wrote",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “She wrote a letter to her mom last week” = “Ela escreveu uma carta para a mãe semana passada.”",
          correction: "A resposta é **wrote**: write → wrote.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele encontrou a carteira dele.",
          answer: ["He", "found", "his", "wallet"],
          bank: ["found", "his", "He", "wallet", "finded", "her"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Muito bem! “He found his wallet” = “Ele encontrou a carteira dele.”",
          correction: "O certo é **He found his wallet.** Find → found.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I thought you were sick.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm22S9.mp3"),
          options: [
            "I think you are sick.",
            "I thought you were sick.",
            "I thought he was sick.",
          ],
          correctAnswer: "I thought you were sick.",
          hint: "Escute **thought** (passado de think) e **you were** ou **he was**.",
          explanation:
            "Perfeito! “I thought you were sick” = “Eu achei que você estava doente.”",
          correction:
            "A frase é **I thought you were sick.** Use o botão 0.5× para ouvir “thought”.",
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
          after: " the answer, but I forgot it.",
          options: ["knowed", "knew", "know"],
          correctAnswer: "knew",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “I knew the answer, but I forgot it” = “Eu sabia a resposta, mas esqueci.” Lição completa! 🎉",
          correction: "Quase lá! Know → **knew.**",
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
