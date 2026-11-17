import createLessonScreen from "../../LessonScreen";

// Artigo definido the: algo especifico, ja mencionado ou unico (the sun), e
// the vs a / an. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I have a dog. ",
          after: " dog is black.",
          options: ["A", "The", "An"],
          correctAnswer: "The",
          hint: "Na primeira vez que falamos de algo, usamos **a / an**. Depois que já sabemos qual é, usamos **the**.",
          explanation:
            "Isso aí! “The dog is black” = “O cachorro é preto.” Já sabemos de qual cachorro estamos falando.",
          correction:
            "Quase! O cachorro já foi mencionado, então usamos The: **The dog is black.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O sol está quente.",
          answer: ["The", "sun", "is", "hot"],
          bank: ["sun", "A", "is", "hot", "The", "are"],
          hint: "Só existe um sol. Coisas únicas levam **the**: the sun, the moon, the sky.",
          explanation: "Perfeito! “The sun is hot” = “O sol está quente.”",
          correction: "O certo é **The sun is hot.** Só existe um sol, por isso usamos “the”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The book is on the table.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm34S3.mp3"),
          options: [
            "The book is on the table.",
            "A book is on the table.",
            "The book is on a table.",
          ],
          correctAnswer: "The book is on the table.",
          hint: "Escute as palavrinhas antes de book e de table: é **the** ou **a**?",
          explanation: "Ótimo ouvido! “The book is on the table” = “O livro está na mesa.”",
          correction:
            "A frase é **The book is on the table.** Use o botão 0.5× para ouvir “the” nas duas partes.",
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
            ["the sun", "o sol"],
            ["the moon", "a lua"],
            ["the door", "a porta"],
            ["the children", "as crianças"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**the** serve para tudo: o, a, os, as. Não muda com masculino, feminino ou plural.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **the** pode ser o, a, os ou as: o que muda é a palavra depois dele.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It's cold. Please close ",
          after: " door.",
          answer: "the",
          hint: "Estamos falando de uma porta específica: a porta daqui.",
          explanation: "Isso! “Please close the door” = “Por favor, feche a porta.”",
          correction:
            "A palavra certa é **the**: Please close the door. É uma porta específica, a desta sala.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where are ",
          after: " keys? – On the table.",
          options: ["a", "the", "an"],
          correctAnswer: "the",
          hint: "**a / an** só vão com uma coisa. Para o plural específico (as chaves), use **the**.",
          explanation: "Mandou bem! “Where are the keys?” = “Onde estão as chaves?”",
          correction:
            "Quase! “Keys” é plural e são chaves específicas, então usamos the: **Where are the keys?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O gato está debaixo da cama.",
          answer: ["The", "cat", "is", "under", "the", "bed"],
          bank: ["bed", "the", "under", "a", "The", "is", "cat"],
          hint: "“O gato” = **The cat** e “da cama” = **the bed**. Em português, “da” = de + a.",
          explanation: "Muito bem! “The cat is under the bed” = “O gato está debaixo da cama.”",
          correction:
            "O certo é **The cat is under the bed.** É a cama específica da casa, então usamos “the”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The apple is red.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm34S8.mp3"),
          options: ["An apple is red.", "The apple is red.", "The apples are red."],
          correctAnswer: "The apple is red.",
          hint: "Antes de som de vogal, **the** soa como “di”: the apple (“di apple”).",
          explanation: "Perfeito! “The apple is red” = “A maçã é vermelha.”",
          correction:
            "A frase é **The apple is red.** Antes de vogal, “the” soa como “di”. Use o botão 0.5× para ouvir.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I have a cat and a dog. ",
          after: " cat is white.",
          answer: "The",
          hint: "Na primeira vez que falamos de algo, usamos **a / an**. Depois que já sabemos qual é, usamos **the**.",
          explanation: "Isso! “The cat is white” = “O gato é branco.”",
          correction: "A resposta é **The**: The cat is white. O gato já apareceu na frase anterior.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at ",
          after: " moon! It's beautiful.",
          options: ["a", "an", "the"],
          correctAnswer: "the",
          hint: "Só existe uma lua no céu. Coisas únicas levam **the**.",
          explanation: "Mandou bem! “Look at the moon!” = “Olha a lua!” Lição completa! 🎉",
          correction: "Quase lá! Só existe uma lua, então usamos the: **Look at the moon!**",
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
