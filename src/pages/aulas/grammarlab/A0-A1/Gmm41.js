import createLessonScreen from "../../LessonScreen";

// Possessives, aula 7 (Whose?): Whose…? para perguntar de quem é · resposta
// com 's ou mine/yours/hers…. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " bag is this? – It's Ana's.",
          options: ["Who", "Whose", "Who's"],
          correctAnswer: "Whose",
          hint: "**Whose** = de quem. **Who** = quem. **Who's** = who is.",
          explanation: "Isso aí! “Whose bag is this?” = “De quem é esta bolsa?”",
          correction: "Quase! Para perguntar “de quem”, usamos **Whose.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "De quem é este celular?",
          answer: ["Whose", "phone", "is", "this"],
          bank: ["phone", "is", "Whose", "this", "Who", "Who's"],
          hint: "A ordem é: **Whose + coisa + is + this?**",
          explanation: "Perfeito! “Whose phone is this?” = “De quem é este celular?”",
          correction:
            "O certo é **Whose phone is this?** “Whose” vem junto da coisa: whose phone.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Whose keys are these?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm41S3.mp3"),
          options: ["Whose keys are these?", "Whose key is this?", "Who is this?"],
          correctAnswer: "Whose keys are these?",
          hint: "Escute **keys are these** (plural) ou **key is this** (uma).",
          explanation:
            "Ótimo ouvido! “Whose keys are these?” = “De quem são estas chaves?”",
          correction:
            "A frase é **Whose keys are these?** “Are these” mostra que é plural.",
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
            ["Whose bag is this?", "It's mine."],
            ["Whose shoes are these?", "They're hers."],
            ["Who is she?", "She's my aunt."],
            ["How old is she?", "She's 30."],
          ],
          rightOrder: [2, 3, 0, 1],
          instruction: "Tap a question, then its answer.",
          hint: "**Whose** pergunta de quem é; **Who** pergunta quem é.",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. **Whose** → de quem (mine, hers) · **Who** → quem (my aunt).",
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
          after: " dog is that? – It's Lucas's dog.",
          answer: "Whose",
          hint: "A resposta diz de quem é o cachorro.",
          explanation: "Isso! “Whose dog is that?” = “De quem é aquele cachorro?”",
          correction: "A palavra certa é **Whose**: Whose dog is that?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Whose pencils are these? – They're ",
          after: ".",
          options: ["me", "my", "mine"],
          correctAnswer: "mine",
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation: "Mandou bem! “They're mine” = “São meus.”",
          correction: "Quase! No fim da resposta, usamos mine: **They're mine.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "(De quem é?) É do meu irmão.",
          answer: ["It's", "my", "brother's"],
          bank: ["brother's", "my", "It's", "brother", "is", "mine"],
          instruction: "Answer using the words below.",
          hint: "Responda com **It's + dono com 's**. A coisa não precisa ser repetida.",
          explanation: "Muito bem! “It's my brother's” = “É do meu irmão.”",
          correction: "O certo é **It's my brother's.** O dono leva 's: my brother's.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It's mine.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm41S8.mp3"),
          options: ["Is it mine?", "It's mine.", "It's nine."],
          correctAnswer: "It's mine.",
          hint: "Escute a ordem (**It's** ou **Is it**) e o final: **mine** ou **nine**.",
          explanation: "Perfeito! “It's mine” = “É meu.”",
          correction:
            "A frase é **It's mine.** Use o botão 0.5× para ouvir o “m” de mine.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Whose jacket is this? Is it Ana's? – Yes, it's ",
          after: ".",
          answer: "hers",
          hint: "Ana = she. Qual pronome usamos no fim da resposta?",
          explanation: "Isso! “Yes, it's hers” = “Sim, é dela.”",
          correction: "A resposta é **hers**: a jaqueta é da Ana = é dela.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " is that man? – He's my teacher.",
          options: ["Whose", "Who", "Who's"],
          correctAnswer: "Who",
          hint: "A resposta diz quem é, não de quem.",
          explanation:
            "Mandou bem! “Who is that man?” = “Quem é aquele homem?” Lição completa! 🎉",
          correction:
            "Quase lá! A pergunta é “quem”: **Who is that man?** “Whose” = de quem.",
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
