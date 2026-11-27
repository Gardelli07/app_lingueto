import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 11 (Review): Revisão: uma mistura das aulas 1 a 10.
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
          before: "She ",
          after: " speak three languages.",
          options: ["cans", "can", "can to"],
          correctAnswer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Isso aí! “She can speak three languages” = “Ela sabe falar três idiomas.”",
          correction: "Quase! Can não muda e não leva to: **She can speak.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He can ",
          after: " (drive).",
          answer: "drive",
          hint: "Depois de can, o **verbo fica normal**: She can swim (e não “swims”).",
          explanation: "Isso! “He can drive” = “Ele sabe dirigir.”",
          correction: "A palavra certa é **drive**: depois de can, sem -s.",
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
            ["I can", "Eu sei / posso"],
            ["I can't", "Eu não sei / não posso"],
            ["Can I…?", "Posso…?"],
            ["Can you…?", "Você pode…?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**can** = sei / posso · **can't** = não sei / não posso.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **can** = posso · **can't** = não posso · **Can I** = posso? · **Can you** = você pode?",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós não podemos ficar.",
          answer: ["We", "can't", "stay"],
          bank: ["stay", "We", "can't", "don't", "stays", "can"],
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Perfeito! “We can't stay” = “Nós não podemos ficar.”",
          correction: "O certo é **We can't stay.** Não existe “don't can”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can you help me, please?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm14S5.mp3"),
          options: [
            "Can you help me, please?",
            "Can you hear me, please?",
            "Can I help you, please?",
          ],
          correctAnswer: "Can you help me, please?",
          hint: "Escute **you … me** ou **I … you**, e **help** ou **hear**.",
          explanation:
            "Ótimo ouvido! “Can you help me, please?” = “Você pode me ajudar, por favor?”",
          correction:
            "A frase é **Can you help me, please?** Use o botão 0.5× para ouvir “help me”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can they come to the party? – No, they ",
          after: ".",
          options: ["don't", "can't", "aren't"],
          correctAnswer: "can't",
          hint:
            "Resposta curta: **Yes, I can.** / **No, I can't.** Use o mesmo sujeito da pergunta.",
          explanation: "Mandou bem! “No, they can't” = “Não, eles não podem.”",
          correction: "Quase! A pergunta usa “Can”: **No, they can't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "You can't park here. = You ",
          after: " park here.",
          answer: "cannot",
          instruction: "Type the long form of “can't”.",
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Isso! “You cannot park here” = “Não pode estacionar aqui.”",
          correction: "A resposta é **cannot**: can't = cannot.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você sabe nadar muito bem!",
          answer: ["You", "can", "swim", "very", "well"],
          bank: ["swim", "very", "You", "can", "well", "good", "swims"],
          hint:
            "**very well** = muito bem · **well** = bem · **a little** = um pouco · **not at all** = nada.",
          explanation: "Muito bem! “You can swim very well!” = “Você nada muito bem!”",
          correction: "O certo é **You can swim very well!** “Muito bem” = very well.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I can't come tomorrow.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm14S9.mp3"),
          options: [
            "I can come tomorrow.",
            "I can't come today.",
            "I can't come tomorrow.",
          ],
          correctAnswer: "I can't come tomorrow.",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation: "Perfeito! “I can't come tomorrow” = “Eu não posso vir amanhã.”",
          correction:
            "A frase é **I can't come tomorrow.** Escute o “t” de can't e “tomorrow”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad can ",
          after: " the guitar very well.",
          options: ["play", "plays", "to play"],
          correctAnswer: "play",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation:
            "Mandou bem! “My dad can play the guitar very well” = “Meu pai toca violão muito bem.” Você terminou can / can't! 🎉",
          correction: "Quase lá! Depois de can: verbo normal, **play.**",
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
