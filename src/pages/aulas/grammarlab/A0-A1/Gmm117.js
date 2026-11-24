import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 14 (Review 1): Revisão: aulas 1 a 5 (will, 'll,
// won't, perguntas, usos). Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " be a great doctor.",
          options: ["wills", "will", "will to"],
          correctAnswer: "will",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation:
            "Isso aí! “She will be a great doctor” = “Ela vai ser uma ótima médica.”",
          correction: "Quase! **will** não muda e não leva to.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We ",
          after: " never forget you.",
          answer: "will",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation: "Isso! “We will never forget you” = “Nunca vamos te esquecer.”",
          correction: "A palavra certa é **will**: we will never forget.",
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
            ["I will", "I'll"],
            ["will not", "won't"],
            ["Will you…?", "Você vai…?"],
            ["I think it will…", "Acho que vai…"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Lembre: **'ll** = will · **won't** = will not.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **I'll** = I will · **won't** = will not · **Will you** = você vai? · **I think it will** = acho que vai.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não vai gostar.",
          answer: ["He", "won't", "like", "it"],
          bank: ["like", "it", "He", "won't", "doesn't", "likes"],
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Perfeito! “He won't like it” = “Ele não vai gostar.”",
          correction: "O certo é **He won't like it.** Futuro negativo → won't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Will you help me?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm117S5.mp3"),
          options: ["Will you help me?", "Can you help me?", "Will you tell me?"],
          correctAnswer: "Will you help me?",
          hint: "Escute **Will** ou **Can**, e **help** ou **tell**.",
          explanation: "Ótimo ouvido! “Will you help me?” = “Você vai me ajudar?”",
          correction:
            "A frase é **Will you help me?** Use o botão 0.5× para ouvir “Will”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Will they come? – No, they ",
          after: ".",
          options: ["don't", "won't", "aren't"],
          correctAnswer: "won't",
          hint:
            "Pergunta: **Will + sujeito + verbo?** · Resposta: **Yes, I will.** / **No, I won't.**",
          explanation: "Mandou bem! “No, they won't” = “Não, não vão.”",
          correction: "Quase! A pergunta usa “Will”: **No, they won't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It won't ",
          after: " (be) easy.",
          answer: "be",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation: "Isso! “It won't be easy” = “Não vai ser fácil.”",
          correction: "A resposta é **be**: won't be.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu te ajudo!",
          answer: ["I'll", "help", "you"],
          bank: ["I'll", "help", "you", "Ill", "helps", "me"],
          hint:
            "**will** para: previsão com opinião (I think it will…), oferta (I'll help you), promessa (I'll call you) e decisão na hora.",
          explanation: "Muito bem! “I'll help you!” = “Eu te ajudo!”",
          correction: "O certo é **I'll help you!** Oferta → I'll.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I think it'll be sunny.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm117S9.mp3"),
          options: [
            "I think it's sunny.",
            "I think it'll be rainy.",
            "I think it'll be sunny.",
          ],
          correctAnswer: "I think it'll be sunny.",
          hint:
            "Escute **it'll be** (futuro) ou **it's** (agora), e **sunny** ou **rainy**.",
          explanation: "Perfeito! “I think it'll be sunny” = “Acho que vai fazer sol.”",
          correction:
            "A frase é **I think it'll be sunny.** Use o botão 0.5× para ouvir “it'll be”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Don't worry. I ",
          after: " tell anybody.",
          options: ["won't", "doesn't", "not"],
          correctAnswer: "won't",
          hint:
            "Negativa: **won't** (= will not) + verbo normal. Cuidado: won't (“wount”) ≠ want (querer).",
          explanation:
            "Mandou bem! “I won't tell anybody” = “Não vou contar para ninguém.” Revisão 1 completa! 🎉",
          correction: "Quase lá! Promessa negativa → **I won't tell.**",
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
  ptToggle: true,
  nextRouteName: "GrammarLab",
  screenName: "GrammarLabA0A1LessonScreen",
});
