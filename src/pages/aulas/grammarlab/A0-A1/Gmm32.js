import createLessonScreen from "../../LessonScreen";

// Dica de a / an, a mesma em todas as perguntas do Grammar Lab.
const HINT =
  "Som de consoante → **a** · som de vogal → **an** · o que vale é o **SOM**: an hour, a university";

// Artigos a / an: a escolha depende do som da proxima palavra, nao da letra.
// Os 5 tipos do Grammar Lab, um slide por tipo, e no fim uma historia do Story
// Mode (sem mp3 e sem imagem: o player le o texto com TTS). O combo e o XP
// seguem de um slide para o outro (ComboSlide).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      instruction: "Choose a or an.",
      questions: [
        {
          before: "She is ",
          after: " teacher.",
          options: ["a", "an"],
          correctAnswer: "a",
          hint: HINT,
          correction: "É **a**: teacher começa com som de consoante (t).",
        },
        {
          before: "I eat ",
          after: " apple every day.",
          options: ["a", "an"],
          correctAnswer: "an",
          hint: HINT,
          correction: "É **an**: apple começa com som de vogal.",
        },
        {
          before: "My dad is ",
          after: " engineer.",
          options: ["an", "a"],
          correctAnswer: "an",
          hint: HINT,
          correction: "É **an**: engineer começa com som de vogal (e).",
        },
        {
          before: "They live in ",
          after: " big house.",
          options: ["an", "a"],
          correctAnswer: "a",
          hint: HINT,
          correction:
            "É **a**: o artigo olha para a palavra seguinte, big, que começa com consoante.",
        },
        {
          before: "We need ",
          after: " hour to finish.",
          options: ["a", "an"],
          correctAnswer: "an",
          hint: HINT,
          correction: "É **an**: em hour o h é mudo, então o som começa com vogal (“auer”).",
        },
        {
          before: "He studies at ",
          after: " university.",
          options: ["an", "a"],
          correctAnswer: "a",
          hint: HINT,
          correction: "É **a**: university começa com som de “iu”, que é som de consoante.",
        },
        {
          before: "It's ",
          after: " orange cat.",
          options: ["a", "an"],
          correctAnswer: "an",
          hint: HINT,
          correction: "É **an**: orange começa com som de vogal.",
        },
        {
          before: "That's ",
          after: " honest answer.",
          options: ["an", "a"],
          correctAnswer: "an",
          hint: HINT,
          correction: "É **an**: em honest o h é mudo (“ónest”).",
        },
      ],
    },
  },
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          // Sem `correction`: o painel de erro lista os pares sozinho.
          pairs: [
            ["an apple", "uma maçã"],
            ["a dog", "um cachorro"],
            ["an egg", "um ovo"],
            ["a house", "uma casa"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: HINT,
        },
        {
          pairs: [
            ["an hour", "uma hora"],
            ["a horse", "um cavalo"],
            ["an umbrella", "um guarda-chuva"],
            ["a uniform", "um uniforme"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint: HINT,
          correction:
            "**an hour** (h mudo) · **a horse** · **an umbrella** · **a uniform** (som de “iu”)",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I have an hour.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm32S3Q1.mp3"),
          options: ["I have a horse.", "I have an hour.", "I have a house."],
          correctAnswer: "I have an hour.",
          hint: HINT,
          correction: "Você ouviu **I have an hour.**",
        },
        {
          say: "He is an actor.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm32S3Q2.mp3"),
          options: ["He is an actor.", "He is a doctor.", "He is an author."],
          correctAnswer: "He is an actor.",
          hint: HINT,
          correction: "Você ouviu **He is an actor.**",
        },
        {
          say: "It's a nice egg.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm32S3Q3.mp3"),
          options: ["It's an egg.", "It's a big egg.", "It's a nice egg."],
          correctAnswer: "It's a nice egg.",
          hint: HINT,
          correction: "Você ouviu **It's a nice egg.** Antes de nice, usamos **a**.",
        },
        {
          say: "She has an old car.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm32S3Q4.mp3"),
          options: ["She has a new car.", "She has an old car.", "She has an old cat."],
          correctAnswer: "She has an old car.",
          hint: HINT,
          correction: "Você ouviu **She has an old car.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu tenho um cachorro.",
          answer: ["I", "have", "a", "dog"],
          bank: ["dog", "an", "I", "a", "has", "have"],
          hint: HINT,
          correction: "Dog começa com consoante: **a dog.**",
        },
        {
          prompt: "Ela é uma atriz.",
          answer: ["She", "is", "an", "actress"],
          bank: ["an", "is", "actress", "a", "She", "are"],
          hint: HINT,
          correction: "Actress começa com vogal: **an actress.**",
        },
        {
          prompt: "Ele é um bom aluno.",
          answer: ["He", "is", "a", "good", "student"],
          bank: ["good", "an", "He", "student", "a", "is", "am"],
          hint: HINT,
          correction: "O artigo vem antes de good, que começa com consoante: **a good student.**",
        },
        {
          prompt: "Eu preciso de uma hora.",
          answer: ["I", "need", "an", "hour"],
          bank: ["hour", "a", "need", "I", "an", "needs"],
          hint: HINT,
          correction: "Em hour o h é mudo: **an hour.**",
        },
        {
          prompt: "É um guarda-chuva amarelo.",
          answer: ["It", "is", "a", "yellow", "umbrella"],
          bank: ["umbrella", "an", "is", "It", "yellow", "a", "are"],
          hint: HINT,
          correction: "O artigo olha para yellow (consoante): **a yellow umbrella.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      instruction: "Type a or an.",
      questions: [
        {
          before: "There is ",
          after: " elephant at the zoo.",
          answer: "an",
          hint: HINT,
          correction: "É **an**: elephant começa com som de vogal.",
        },
        {
          before: "I want ",
          after: " sandwich, please.",
          answer: "a",
          hint: HINT,
          correction: "É **a**: sandwich começa com som de consoante.",
        },
        {
          before: "He is ",
          after: " old friend.",
          answer: "an",
          hint: HINT,
          correction: "É **an**: old começa com som de vogal.",
        },
        {
          before: "She wears ",
          after: " uniform at work.",
          answer: "a",
          hint: HINT,
          correction: "É **a**: uniform começa com som de “iu” (consoante).",
        },
        {
          before: "I'll call you in ",
          after: " hour.",
          answer: "an",
          hint: HINT,
          correction: "É **an**: o h de hour é mudo.",
        },
        {
          before: "We live in ",
          after: " small town.",
          answer: "a",
          hint: HINT,
          correction: "É **a**: small começa com som de consoante.",
        },
        {
          before: "This is ",
          after: " easy exercise.",
          answer: "an",
          hint: HINT,
          correction: "É **an**: easy começa com som de vogal.",
        },
      ],
    },
  },
  {
    component: "Exercise21",
    activity: {
      title: "Ana's Bag",
      // Palavras ligadas por "_" formam uma expressao (toque para traduzir).
      text: [
        "Hi! My_name_is Ana. I'm a student.",
        "In my bag, I have a book, an apple and an umbrella. I also have a pen and an old notebook.",
        "My brother Leo is an engineer. He has a car and an orange bike.",
      ],
      dictionary: {
        hi: "oi",
        "my name is": "meu nome é",
        my: "meu / minha",
        name: "nome",
        is: "é",
        ana: "Ana",
        "i'm": "eu sou / eu estou",
        a: "um / uma",
        an: "um / uma (antes de som de vogal)",
        student: "estudante",
        in: "em / dentro de",
        bag: "bolsa / mochila",
        i: "eu",
        have: "tenho / ter",
        book: "livro",
        apple: "maçã",
        and: "e",
        umbrella: "guarda-chuva",
        also: "também",
        pen: "caneta",
        old: "velho / antigo",
        notebook: "caderno",
        brother: "irmão",
        leo: "Leo",
        engineer: "engenheiro",
        he: "ele",
        has: "tem",
        car: "carro",
        orange: "laranja (cor)",
        bike: "bicicleta",
      },
      questions: [
        {
          question: "What fruit is in Ana's bag?",
          options: ["A banana.", "An orange.", "An apple."],
          correctAnswer: "An apple.",
          hint: "In my bag, I have a book, an apple and an umbrella.",
          explanation: "Ana says “I have a book, an apple and an umbrella.”",
          correction: "the orange thing in the story is Leo's bike, not a fruit.",
        },
        {
          question: "What is Leo's job?",
          options: ["An engineer.", "A teacher.", "A student."],
          correctAnswer: "An engineer.",
          hint: "My brother Leo is an engineer.",
          explanation: "Ana says “My brother Leo is an engineer.”",
          correction: "Ana is the student; Leo is an engineer.",
        },
        {
          question: "Which is correct?",
          options: [
            "Ana has a old notebook.",
            "Ana has an old notebook.",
            "Ana has an notebook old.",
          ],
          correctAnswer: "Ana has an old notebook.",
          hint: "I also have a pen and an old notebook.",
          explanation: "Old começa com som de vogal, então é “an old notebook”.",
          correction: "old starts with a vowel sound, so we say “an old notebook”.",
        },
        {
          question: "What does Leo have?",
          options: [
            "A car and a orange bike.",
            "An car and an orange bike.",
            "A car and an orange bike.",
          ],
          correctAnswer: "A car and an orange bike.",
          hint: "He has a car and an orange bike.",
          explanation: "“A car” (consoante) e “an orange bike” (vogal).",
          correction: "car starts with a consonant sound and orange with a vowel sound.",
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
