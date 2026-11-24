import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 8 (Asking): Pedir permissão (Can I…?) e favores (Can you…?).
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
          before: "",
          after: " I go to the bathroom, please?",
          options: ["Can", "Do", "Am"],
          correctAnswer: "Can",
          hint: "Para pedir: **Can I…?** (posso…?) · **Can you…?** (você pode…?)",
          explanation:
            "Isso aí! “Can I go to the bathroom, please?” = “Posso ir ao banheiro, por favor?”",
          correction: "Quase! Para pedir permissão: **Can I…?**",
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
            ["Can I come in?", "Posso entrar?"],
            ["Can I have some water?", "Posso tomar água?"],
            ["Can you help me?", "Você pode me ajudar?"],
            ["Can you repeat, please?", "Você pode repetir, por favor?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Para pedir: **Can I…?** (posso…?) · **Can you…?** (você pode…?)",
          explanation: "Mandou bem! Todos os pedidos certos.",
          correction:
            "Esse par não combina. **Can I…?** = posso…? · **Can you…?** = você pode…?",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can you open the window, please?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm11S3.mp3"),
          options: [
            "Can you close the window, please?",
            "Can you open the window, please?",
            "Can I open the window, please?",
          ],
          correctAnswer: "Can you open the window, please?",
          hint: "Escute **you** ou **I**, e **open** (abrir) ou **close** (fechar).",
          explanation:
            "Ótimo ouvido! “Can you open the window, please?” = “Você pode abrir a janela, por favor?”",
          correction:
            "A frase é **Can you open the window, please?** Use o botão 0.5× para ouvir “open”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Can I ",
          after: " (use) your phone?",
          answer: "use",
          hint: "Para pedir: **Can I…?** (posso…?) · **Can you…?** (você pode…?)",
          explanation: "Isso! “Can I use your phone?” = “Posso usar o seu celular?”",
          correction: "A palavra certa é **use**: verbo normal depois de Can I.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Posso fazer uma pergunta?",
          answer: ["Can", "I", "ask", "a", "question"],
          bank: ["ask", "a", "Can", "I", "question", "do", "make"],
          hint: "“Fazer uma pergunta” = **ask a question** (e não “make a question”).",
          explanation: "Perfeito! “Can I ask a question?” = “Posso fazer uma pergunta?”",
          correction:
            "O certo é **Can I ask a question?** Em inglês, pergunta se “ask”, não se “make”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can you ",
          after: " me the salt, please?",
          options: ["passes", "pass", "passing"],
          correctAnswer: "pass",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Mandou bem! “Can you pass me the salt, please?” = “Você pode me passar o sal, por favor?”",
          correction: "Quase! Depois de can + sujeito, verbo normal: **pass.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você pode falar mais devagar?",
          answer: ["Can", "you", "speak", "more", "slowly"],
          bank: ["speak", "more", "Can", "you", "slowly", "slow", "I"],
          hint: "“Mais devagar” = **more slowly**.",
          explanation:
            "Muito bem! “Can you speak more slowly?” = “Você pode falar mais devagar?”",
          correction: "O certo é **Can you speak more slowly?** “Devagar” = slowly.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " I borrow your pen? – Sure!",
          answer: "Can",
          hint: "Para pedir: **Can I…?** (posso…?) · **Can you…?** (você pode…?)",
          explanation:
            "Isso! “Can I borrow your pen?” = “Posso pegar sua caneta emprestada?”",
          correction: "A resposta é **Can**: Can I borrow…?",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can I pay by card?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm11S9.mp3"),
          options: ["Can I pay in cash?", "Can you pay by card?", "Can I pay by card?"],
          correctAnswer: "Can I pay by card?",
          hint:
            "Escute **I** ou **you**, e **by card** (cartão) ou **in cash** (dinheiro).",
          explanation: "Perfeito! “Can I pay by card?” = “Posso pagar com cartão?”",
          correction:
            "A frase é **Can I pay by card?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Excuse me, ",
          after: " you tell me the time?",
          options: ["do", "are", "can"],
          correctAnswer: "can",
          hint: "Para pedir: **Can I…?** (posso…?) · **Can you…?** (você pode…?)",
          explanation:
            "Mandou bem! “Can you tell me the time?” = “Você pode me dizer as horas?” Lição completa! 🎉",
          correction: "Quase lá! Para pedir um favor: **can you…?**",
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
