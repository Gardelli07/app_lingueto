import createLessonScreen from "../../LessonScreen";

// Possessives, aula 1 (My / Your): Possessivos de I e you: my (meu/minha) e
// your (seu/sua). Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'm Ana. ",
          after: " name is Ana.",
          options: ["I", "My", "Me"],
          correctAnswer: "My",
          hint: "I → **my** (meu / minha).",
          explanation: "Isso aí! “My name is Ana” = “Meu nome é Ana.”",
          correction: "Quase! Para dizer “meu”, usamos My: **My name is Ana.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Este é o meu livro.",
          answer: ["This", "is", "my", "book"],
          bank: ["book", "my", "This", "I", "is", "me"],
          hint: "“Meu” = **my**. Em inglês não usamos “the” antes de my.",
          explanation: "Perfeito! “This is my book” = “Este é o meu livro.”",
          correction: "O certo é **This is my book.** “Meu” = my, sem “the”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is this your bag?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm35S3.mp3"),
          options: ["Is this your bag?", "Is this my bag?", "Is this your back?"],
          correctAnswer: "Is this your bag?",
          hint:
            "Escute **your** ou **my**, e o final: **bag** (bolsa) ou **back** (costas).",
          explanation: "Ótimo ouvido! “Is this your bag?” = “Esta bolsa é sua?”",
          correction:
            "A frase é **Is this your bag?** Use o botão 0.5× para ouvir “your” e “bag”.",
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
            ["my book", "meu livro"],
            ["my bag", "minha bolsa"],
            ["your phone", "seu celular"],
            ["your keys", "suas chaves"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**my** e **your** não mudam: servem para masculino, feminino e plural.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **my** = meu / minha · **your** = seu / sua / suas.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I have a cat. ",
          after: " cat is white.",
          answer: "My",
          hint: "O gato é meu. Qual palavra significa “meu”?",
          explanation: "Isso! “My cat is white” = “Meu gato é branco.”",
          correction: "A palavra certa é **My**: My cat is white.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Hi, Tom! How are ",
          after: " parents?",
          options: ["you", "yours", "your"],
          correctAnswer: "your",
          hint: "Antes de um substantivo (parents), use **your**.",
          explanation: "Mandou bem! “How are your parents?” = “Como estão seus pais?”",
          correction: "Quase! Antes de “parents” usamos your: **How are your parents?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meus pais estão em casa.",
          answer: ["My", "parents", "are", "at", "home"],
          bank: ["parents", "are", "My", "at", "I", "home", "is"],
          hint: "“Meus” = **My** (não muda no plural). Plural usa **are**.",
          explanation: "Muito bem! “My parents are at home” = “Meus pais estão em casa.”",
          correction: "O certo é **My parents are at home.** “My” serve para meu e meus.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My keys are in my bag.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm35S8.mp3"),
          options: [
            "My keys are in your bag.",
            "My keys are in my bag.",
            "My keys are on my bag.",
          ],
          correctAnswer: "My keys are in my bag.",
          hint: "Escute o final: **in my bag**, **in your bag** ou **on my bag**?",
          explanation:
            "Perfeito! “My keys are in my bag” = “Minhas chaves estão na minha bolsa.”",
          correction:
            "A frase é **My keys are in my bag.** Use o botão 0.5× para ouvir “in my”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What is ",
          after: " name? – I'm Paulo.",
          answer: "your",
          hint: "A pergunta é para a pessoa com quem você fala (**you**).",
          explanation: "Isso! “What is your name?” = “Qual é o seu nome?”",
          correction: "A resposta é **your**: What is your name?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I love ",
          after: " mom.",
          options: ["me", "my", "I"],
          correctAnswer: "my",
          hint:
            "I → **my** · you → **your** · he → **his** · she → **her** · it → **its** · we → **our** · they → **their**",
          explanation:
            "Mandou bem! “I love my mom” = “Eu amo minha mãe.” Lição completa! 🎉",
          correction: "Quase lá! “Minha” = my: **I love my mom.**",
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
