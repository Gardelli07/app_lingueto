import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 6 (Wh-questions): What / Where / When / How + can + sujeito + verbo?.
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What ",
          after: " you do?",
          options: ["can", "does", "are"],
          correctAnswer: "can",
          hint: "**Palavra de pergunta + can + sujeito + verbo**: What can you do?",
          explanation: "Isso aí! “What can you do?” = “O que você sabe fazer?”",
          correction: "Quase! **What can you do?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde eu posso comprar um ingresso?",
          answer: ["Where", "can", "I", "buy", "a", "ticket"],
          bank: ["buy", "a", "Where", "can", "I", "ticket", "What", "to"],
          hint: "**Palavra de pergunta + can + sujeito + verbo**: What can you do?",
          explanation:
            "Perfeito! “Where can I buy a ticket?” = “Onde posso comprar um ingresso?”",
          correction: "O certo é **Where can I buy a ticket?** Where + can + I + buy.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What languages can you speak?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm09S3.mp3"),
          options: [
            "What languages can you speak?",
            "What languages can he speak?",
            "What language do you speak?",
          ],
          correctAnswer: "What languages can you speak?",
          hint: "Escute **can you** ou **can he**, e **languages** (plural).",
          explanation:
            "Ótimo ouvido! “What languages can you speak?” = “Que idiomas você sabe falar?”",
          correction:
            "A frase é **What languages can you speak?** Use o botão 0.5× para ouvir “can you”.",
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
            ["What can you do?", "O que você sabe fazer?"],
            ["Where can I park?", "Onde posso estacionar?"],
            ["When can you come?", "Quando você pode vir?"],
            ["How can I help?", "Como posso ajudar?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**What** = o que · **Where** = onde · **When** = quando · **How** = como.",
          explanation: "Mandou bem! Todas as perguntas certas.",
          correction:
            "Esse par não combina. **What** = o que · **Where** = onde · **When** = quando · **How** = como.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How ",
          after: " I help you?",
          answer: "can",
          hint:
            "Frase muito usada em lojas: **How can I help you?** (Como posso te ajudar?)",
          explanation: "Isso! “How can I help you?” = “Como posso te ajudar?”",
          correction: "A palavra certa é **can**: How can I help you?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where can I ",
          after: " a taxi?",
          options: ["gets", "to get", "get"],
          correctAnswer: "get",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Mandou bem! “Where can I get a taxi?” = “Onde posso pegar um táxi?”",
          correction: "Quase! Depois de can + sujeito, verbo normal: **get.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que ele sabe fazer?",
          answer: ["What", "can", "he", "do"],
          bank: ["do", "he", "What", "can", "does", "cans"],
          hint: "**Palavra de pergunta + can + sujeito + verbo**: What can you do?",
          explanation: "Muito bem! “What can he do?” = “O que ele sabe fazer?”",
          correction: "O certo é **What can he do?** Can não muda com he.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What can you ",
          after: " (see) from your window?",
          answer: "see",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Isso! “What can you see from your window?” = “O que você consegue ver da sua janela?”",
          correction: "A resposta é **see**: verbo normal depois de can.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Where can we eat?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm09S9.mp3"),
          options: ["Where can we meet?", "Where can we eat?", "When can we eat?"],
          correctAnswer: "Where can we eat?",
          hint:
            "Escute **Where** ou **When**, e **eat** (comer) ou **meet** (encontrar).",
          explanation: "Perfeito! “Where can we eat?” = “Onde podemos comer?”",
          correction:
            "A frase é **Where can we eat?** Use o botão 0.5× para ouvir “eat”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Who ",
          after: " help me?",
          options: ["cans", "can", "does"],
          correctAnswer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Mandou bem! “Who can help me?” = “Quem pode me ajudar?” Lição completa! 🎉",
          correction: "Quase lá! **Who can help me?** Can nunca ganha -s.",
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
