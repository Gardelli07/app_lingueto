import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 1 (Regular plural): Plural regular: acrescentar -s (cat
// → cats). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I have two ",
          after: ".",
          options: ["cats", "cat", "cates"],
          correctAnswer: "cats",
          hint: "Para mais de um, acrescente **-s**: cat → cats, book → books.",
          explanation: "Isso aí! “I have two cats” = “Eu tenho dois gatos.”",
          correction: "Quase! Mais de um gato = cats: **I have two cats.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu tenho três livros.",
          answer: ["I", "have", "three", "books"],
          bank: ["books", "have", "book", "three", "I", "a"],
          hint: "Para mais de um, acrescente **-s**: cat → cats, book → books.",
          explanation: "Perfeito! “I have three books” = “Eu tenho três livros.”",
          correction: "O certo é **I have three books.** Três livros = book + s = books.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I have two dogs.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm88S3.mp3"),
          options: ["I have a dog.", "I have two dogs.", "I have ten dogs."],
          correctAnswer: "I have two dogs.",
          hint:
            "Escute o número (**a**, **two** ou **ten**) e o **-s** no final de dogs.",
          explanation: "Ótimo ouvido! “I have two dogs” = “Eu tenho dois cachorros.”",
          correction:
            "A frase é **I have two dogs.** Use o botão 0.5× para ouvir “two” e o “s” de dogs.",
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
            ["a car", "um carro"],
            ["two cars", "dois carros"],
            ["a pen", "uma caneta"],
            ["three pens", "três canetas"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "Olhe o final: com **-s** é plural (mais de um).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Com **-s** é plural: **car** = carro, **cars** = carros.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One apple, two ",
          after: ".",
          answer: "apples",
          hint: "Para mais de um, acrescente **-s**: cat → cats, book → books.",
          explanation: "Isso! “Two apples” = “Duas maçãs.”",
          correction: "A palavra certa é **apples**: apple + s.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My ",
          after: " are at school.",
          options: ["friend", "friendes", "friends"],
          correctAnswer: "friends",
          hint: "O verbo é **are**, então o sujeito está no plural: acrescente **-s**.",
          explanation:
            "Mandou bem! “My friends are at school” = “Meus amigos estão na escola.”",
          correction:
            "Quase! Com “are”, o sujeito é plural: **My friends are at school.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As meninas são legais.",
          answer: ["The", "girls", "are", "nice"],
          bank: ["girls", "is", "The", "nice", "girl", "are"],
          hint: "“As meninas” = mais de uma: **girls**. Plural usa **are**.",
          explanation: "Muito bem! “The girls are nice” = “As meninas são legais.”",
          correction: "O certo é **The girls are nice.** Plural: “girls” + “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The cars are red.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm88S8.mp3"),
          options: ["The cars are red.", "The car is red.", "The cards are red."],
          correctAnswer: "The cars are red.",
          hint:
            "Escute **is** (um) ou **are** (vários), e **cars** (carros) ou **cards** (cartões).",
          explanation: "Perfeito! “The cars are red” = “Os carros são vermelhos.”",
          correction:
            "A frase é **The cars are red.** “Are” mostra que é mais de um carro.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One house, three ",
          after: ".",
          answer: "houses",
          hint: "House já termina em e: é só acrescentar **-s**.",
          explanation: "Isso! “Three houses” = “Três casas.”",
          correction:
            "A resposta é **houses**: house + s. Não precisa de “es”, porque house já termina em “e”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She has two ",
          after: ".",
          options: ["brother", "brothers", "brotheres"],
          correctAnswer: "brothers",
          hint: "Para mais de um, acrescente **-s**: cat → cats, book → books.",
          explanation:
            "Mandou bem! “She has two brothers” = “Ela tem dois irmãos.” Lição completa! 🎉",
          correction: "Quase lá! Dois irmãos = **brothers**: brother + s.",
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
