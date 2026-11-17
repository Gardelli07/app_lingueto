import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 8 (Two meanings): think, have, see,
// taste, look: mudam de sentido com -ing. Os 5 tipos do Grammar Lab
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
          before: "I ",
          after: " it's a great idea.",
          options: ["think", "am thinking", "thinks"],
          correctAnswer: "think",
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation:
            "Isso aí! “I think it's a great idea” = “Acho que é uma ótima ideia.” (opinião)",
          correction: "Quase! Opinião → **I think** (sem -ing).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Be quiet, I'm ",
          after: " (think) about the problem.",
          answer: "thinking",
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation:
            "Isso! “I'm thinking about the problem” = “Estou pensando no problema.” (ação)",
          correction: "A palavra certa é **thinking**: pensar agora (ação) aceita -ing.",
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
            ["I think so.", "Eu acho que sim. (opinião)"],
            ["I'm thinking about it.", "Estou pensando nisso. (ação)"],
            ["I have a car.", "Eu tenho um carro. (posse)"],
            ["I'm having lunch.", "Estou almoçando. (ação)"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation: "Mandou bem! Você já vê a mudança de sentido.",
          correction:
            "Esse par não combina. **think / have sem -ing** = opinião / posse · **com -ing** = ação.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We're having a party on Saturday.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm126S4.mp3"),
          options: [
            "We have a party on Saturday.",
            "We're having a party on Saturday.",
            "We're having a party on Sunday.",
          ],
          correctAnswer: "We're having a party on Saturday.",
          hint:
            "**having a party** = dar uma festa (ação). Escute também **Saturday** ou **Sunday**.",
          explanation:
            "Ótimo ouvido! “We're having a party on Saturday” = “Vamos dar uma festa no sábado.”",
          correction:
            "A frase é **We're having a party on Saturday.** Use o botão 0.5× para ouvir o dia.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Esta sopa está com um gosto ótimo.",
          answer: ["This", "soup", "tastes", "great"],
          bank: ["This", "soup", "tastes", "great", "is", "tasting"],
          hint: "**taste** = ter gosto (sem -ing) · **tasting** = provar (ação).",
          explanation: "Perfeito! “This soup tastes great” = “Esta sopa está ótima.”",
          correction: "O certo é **This soup tastes great.** “Ter gosto” não usa -ing.",
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
          after: " two brothers and a sister.",
          options: ["is having", "has", "have"],
          correctAnswer: "has",
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation:
            "Mandou bem! “She has two brothers and a sister” = “Ela tem dois irmãos e uma irmã.”",
          correction: "Quase! “Ter” (posse / família) não usa -ing: **She has.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The chef is ",
          after: " (taste) the sauce.",
          answer: "tasting",
          hint:
            "Alguns verbos mudam de sentido: **I think** (opinião) × **I'm thinking** (pensando agora) · **I have a car** (posse) × **I'm having lunch** (ação).",
          explanation:
            "Isso! “The chef is tasting the sauce” = “O chef está provando o molho.”",
          correction:
            "A resposta é **tasting**: provar (ação) aceita -ing. Taste perde o “e”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vou ao médico amanhã. (já marquei)",
          answer: ["I'm", "seeing", "the", "doctor", "tomorrow"],
          bank: ["I'm", "seeing", "the", "doctor", "tomorrow", "see", "am"],
          hint:
            "**see** = ver (sem -ing) · **seeing** = encontrar / ter consulta com (ação).",
          explanation:
            "Muito bem! “I'm seeing the doctor tomorrow” = “Vou ao médico amanhã.”",
          correction:
            "O certo é **I'm seeing the doctor tomorrow.** Consulta marcada → seeing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You look tired.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm126S9.mp3"),
          options: ["You look happy.", "You look tired.", "You looked tired."],
          correctAnswer: "You look tired.",
          hint:
            "**look** = parecer (sem -ing). Escute **tired** ou **happy**, e **look** ou **looked**.",
          explanation: "Perfeito! “You look tired” = “Você parece cansado.”",
          correction:
            "A frase é **You look tired.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Why ",
          after: " at me like that?",
          options: ["do you look", "are you looking", "you look"],
          correctAnswer: "are you looking",
          hint: "**look at** = olhar para (ação, agora) → present continuous.",
          explanation:
            "Mandou bem! “Why are you looking at me like that?” = “Por que você está me olhando assim?” Lição completa! 🎉",
          correction: "Quase lá! Olhar agora (ação) → **Why are you looking at me?**",
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
