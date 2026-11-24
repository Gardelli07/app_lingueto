import createLessonScreen from "../../LessonScreen";

// Present simple, aula 19 (Review 2): Revisão: aulas 9 a 17 (perguntas,
// respostas curtas, frequência, in / on / at, like + -ing, be ou do). Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " she speak French?",
          options: ["Do", "Is", "Does"],
          correctAnswer: "Does",
          hint: "Pergunta com he, she, it: **Does + sujeito + verbo sem -s?**",
          explanation: "Isso aí! “Does she speak French?” = “Ela fala francês?”",
          correction: "Quase! “Speak” é ação e she → **Does.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde você trabalha?",
          answer: ["Where", "do", "you", "work"],
          bank: ["work", "you", "Where", "do", "does", "What"],
          hint:
            "**Palavra de pergunta + do / does + sujeito + verbo**: Where do you live?",
          explanation: "Perfeito! “Where do you work?” = “Onde você trabalha?”",
          correction: "O certo é **Where do you work?** Where + do + you + work.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, she does.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm77S3.mp3"),
          options: ["Yes, she is.", "Yes, she does.", "No, she doesn't."],
          correctAnswer: "Yes, she does.",
          hint: "Escute **Yes** ou **No**, e o final: **does** ou **is**.",
          explanation: "Ótimo ouvido! “Yes, she does” = “Sim, ela sim.”",
          correction: "A frase é **Yes, she does.** Use o botão 0.5× para ouvir o final.",
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
          after: " do you go to the cinema? – Once a month.",
          answer: "often",
          hint:
            "**How often** = com que frequência. Respostas: every day, **once** (1x), **twice** (2x), **three times**…",
          explanation:
            "Isso! “How often do you go to the cinema?” = “Com que frequência você vai ao cinema?”",
          correction: "A palavra certa é **often**: How often = com que frequência.",
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
            ["always", "sempre"],
            ["never", "nunca"],
            ["in the morning", "de manhã"],
            ["on Fridays", "às sextas"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Frequência: **always / never** · Tempo: **in the morning / on Fridays**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **always** = sempre · **never** = nunca · **in the morning** = de manhã · **on Fridays** = às sextas.",
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
          after: " go to bed late. I'm always tired!",
          options: ["always", "never", "usually"],
          correctAnswer: "usually",
          instruction: "Choose the word for “geralmente”.",
          hint:
            "Quem está sempre cansado geralmente dorme tarde. “Geralmente” = **usually**.",
          explanation:
            "Mandou bem! “I usually go to bed late” = “Eu geralmente vou dormir tarde.”",
          correction:
            "Quase! Aqui o sentido é “geralmente”: **I usually go to bed late.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He loves ",
          after: " (cook).",
          answer: "cooking",
          hint:
            "like / love / hate + coisa (I like pizza) ou + **verbo com -ing** (I like swimming).",
          explanation: "Isso! “He loves cooking” = “Ele adora cozinhar.”",
          correction: "A resposta é **cooking**: depois de love, verbo + -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela está sempre feliz.",
          answer: ["She", "is", "always", "happy"],
          bank: ["is", "always", "She", "happy", "never", "does"],
          hint:
            "A frequência vem **antes do verbo** (I always eat…), mas **depois do be** (I am always late).",
          explanation: "Muito bem! “She is always happy” = “Ela está sempre feliz.”",
          correction:
            "O certo é **She is always happy.** Com be, “always” vem depois do is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What time does the store open?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm77S9.mp3"),
          options: [
            "What time does the store open?",
            "What time does the store close?",
            "What time do the stores open?",
          ],
          correctAnswer: "What time does the store open?",
          hint: "Escute **open** (abre) ou **close** (fecha), e **store** ou **stores**.",
          explanation:
            "Perfeito! “What time does the store open?” = “Que horas a loja abre?”",
          correction:
            "A frase é **What time does the store open?** Use o botão 0.5× para ouvir “open”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Do you like dogs? – Yes, I ",
          after: ".",
          options: ["am", "does", "do"],
          correctAnswer: "do",
          hint:
            "Resposta curta: **Yes, I do.** / **No, I don't.** · **Yes, she does.** / **No, she doesn't.**",
          explanation:
            "Mandou bem! “Yes, I do” = “Sim, gosto.” Você terminou o present simple! 🎉",
          correction: "Quase lá! A pergunta usa “Do”: **Yes, I do.**",
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
