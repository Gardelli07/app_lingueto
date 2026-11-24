import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 12 (Will or going to?): Plano decidido (going to) ×
// decisão na hora, oferta, promessa (will). Os 5 tipos do Grammar Lab
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
          before: "I've already decided. I ",
          after: " study medicine.",
          options: ["will", "am going to", "going to"],
          correctAnswer: "am going to",
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation:
            "Isso aí! “I am going to study medicine” = “Vou estudar medicina.” (já decidido)",
          correction: "Quase! “Already decided” = plano → **am going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "A: I'm cold. B: I ",
          after: " close the window.",
          answer: "will",
          hint: "B decidiu na hora → **will**.",
          explanation: "Isso! “I will close the window” = “Eu fecho a janela.”",
          correction: "A palavra certa é **will**: decisão na hora.",
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
            ["I'm going to visit Paris.", "plano já decidido"],
            ["I'll help you.", "oferta"],
            ["I'll call you later.", "promessa"],
            ["Look! It's going to rain.", "eu vejo os sinais"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then why we use it.",
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation: "Mandou bem! Você já sabe quando usar will e going to.",
          correction:
            "Esse par não combina. **going to** = plano ou sinais · **will** = oferta ou promessa.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm going to start a diet on Monday.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm115S4.mp3"),
          options: [
            "I'm going to start a diet on Monday.",
            "I'll start a diet on Monday.",
            "I'm going to start a diet on Sunday.",
          ],
          correctAnswer: "I'm going to start a diet on Monday.",
          hint: "Escute **I'm going to** ou **I'll**, e o dia: **Monday** ou **Sunday**.",
          explanation:
            "Ótimo ouvido! “I'm going to start a diet on Monday” = “Vou começar uma dieta na segunda.”",
          correction:
            "A frase é **I'm going to start a diet on Monday.** Use o botão 0.5× para ouvir o começo.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A: Não tem leite. B: Eu compro! (decidi agora)",
          answer: ["I'll", "buy", "some"],
          bank: ["I'll", "buy", "some", "I'm", "buys", "any"],
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation: "Perfeito! “I'll buy some” = “Eu compro.”",
          correction: "O certo é **I'll buy some.** Decisão na hora → will.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We bought the tickets. We ",
          after: " see the show on Friday.",
          options: ["will", "are going to", "go to"],
          correctAnswer: "are going to",
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation:
            "Mandou bem! “We are going to see the show” = “Vamos ver o show.” (já compramos os ingressos)",
          correction: "Quase! Já compraram os ingressos = plano → **are going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My birthday is next week. I'm going to ",
          after: " a party.",
          answer: "have",
          hint: "“Dar uma festa” = **have a party**.",
          explanation: "Isso! “I'm going to have a party” = “Vou dar uma festa.”",
          correction: "A resposta é **have**: have a party.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles vão se casar em maio. (já decidiram)",
          answer: ["They", "are", "going", "to", "get", "married", "in", "May"],
          bank: ["going", "to", "They", "are", "get", "married", "in", "May", "will"],
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation:
            "Muito bem! “They are going to get married in May” = “Eles vão se casar em maio.”",
          correction:
            "O certo é **They are going to get married in May.** Plano decidido → going to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Don't worry, I'll pay.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm115S9.mp3"),
          options: [
            "Don't worry, I paid.",
            "Don't worry, I'll play.",
            "Don't worry, I'll pay.",
          ],
          correctAnswer: "Don't worry, I'll pay.",
          hint:
            "Escute **I'll pay** (eu pago), **I'll play** (eu jogo) ou **I paid** (eu paguei).",
          explanation: "Perfeito! “Don't worry, I'll pay” = “Não se preocupe, eu pago.”",
          correction: "A frase é **Don't worry, I'll pay.** Oferta → will.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "A: The phone is ringing! B: ",
          after: " get it.",
          options: ["I'm going to", "I will", "I going to"],
          correctAnswer: "I will",
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation: "Mandou bem! “I will get it” = “Eu atendo!” Lição completa! 🎉",
          correction: "Quase lá! Decisão na hora → **I will get it.**",
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
