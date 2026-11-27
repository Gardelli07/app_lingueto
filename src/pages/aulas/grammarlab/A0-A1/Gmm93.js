import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 6 (Same & always plural): Iguais no singular e plural
// (fish, sheep, deer) e sempre plurais (jeans, glasses, pants, scissors,
// shorts). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One sheep, two ",
          after: ".",
          options: ["sheeps", "sheep", "sheepes"],
          correctAnswer: "sheep",
          hint: "**Sheep, fish** e **deer** não mudam no plural.",
          explanation: "Isso aí! “Two sheep” = “Duas ovelhas.”",
          correction: "Quase! Sheep é igual no singular e no plural: **two sheep.**",
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
            ["a fish", "um peixe"],
            ["three fish", "três peixes"],
            ["a sheep", "uma ovelha"],
            ["ten sheep", "dez ovelhas"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "Aqui a palavra **não muda**: olhe o número antes dela.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **fish** e **sheep** não mudam: o número mostra se é um ou vários.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One fish, five ",
          after: ".",
          answer: "fish",
          hint: "**Fish** não muda no plural.",
          explanation: "Isso! “Five fish” = “Cinco peixes.”",
          correction: "A palavra certa é **fish**: no plural continua igual.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My jeans are blue.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm93S4.mp3"),
          options: ["My jeans are blue.", "My jean is blue.", "My jeans are new."],
          correctAnswer: "My jeans are blue.",
          hint:
            "**Jeans** é sempre plural e usa **are**. Escute também **blue** ou **new**.",
          explanation: "Ótimo ouvido! “My jeans are blue” = “Minha calça jeans é azul.”",
          correction: "A frase é **My jeans are blue.** Jeans é sempre plural: “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My glasses ",
          after: " on the table.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "**Glasses** (óculos) é sempre plural, então usa **are**.",
          explanation:
            "Mandou bem! “My glasses are on the table” = “Meus óculos estão na mesa.”",
          correction: "Quase! Glasses é sempre plural: **My glasses are on the table.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A tesoura está na mesa.",
          answer: ["The", "scissors", "are", "on", "the", "table"],
          bank: ["scissors", "are", "The", "on", "is", "table", "the", "scissor"],
          hint: "Em português é singular, mas **scissors** é sempre plural: usa **are**.",
          explanation:
            "Perfeito! “The scissors are on the table” = “A tesoura está na mesa.”",
          correction:
            "O certo é **The scissors are on the table.** Scissors é sempre plural e leva “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My pants ",
          after: " black.",
          answer: "are",
          hint: "**Pants** (calça) é sempre plural.",
          explanation: "Isso! “My pants are black” = “Minha calça é preta.”",
          correction: "A resposta é **are**: pants é sempre plural.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Two deer are in the park.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm93S8.mp3"),
          options: [
            "A deer is in the park.",
            "Two deer are in the park.",
            "Two dogs are in the park.",
          ],
          correctAnswer: "Two deer are in the park.",
          hint:
            "**Deer** não muda. Escute o número (**A** ou **Two**) e **deer** ou **dogs**.",
          explanation:
            "Perfeito! “Two deer are in the park” = “Dois cervos estão no parque.”",
          correction: "A frase é **Two deer are in the park.** Deer é igual no plural.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Minha calça jeans é nova.",
          answer: ["My", "jeans", "are", "new"],
          bank: ["jeans", "is", "My", "new", "are", "jean"],
          hint: "**Jeans** é sempre plural: use **are**, mesmo sendo uma calça só.",
          explanation: "Muito bem! “My jeans are new” = “Minha calça jeans é nova.”",
          correction:
            "O certo é **My jeans are new.** Jeans é sempre plural e leva “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " my shorts?",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "**Shorts** é sempre plural, como jeans e pants.",
          explanation:
            "Mandou bem! “Where are my shorts?” = “Onde está o meu short?” Lição completa! 🎉",
          correction: "Quase lá! Shorts é sempre plural: **Where are my shorts?**",
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
