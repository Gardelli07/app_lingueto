import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 2 (There are): There are + duas ou mais coisas
// (plural). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " two dogs in the park.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint:
            "Duas ou mais coisas → **There are**: There are two cats. (tem dois gatos)",
          explanation:
            "Isso aí! “There are two dogs in the park” = “Tem dois cachorros no parque.”",
          correction: "Quase! São dois cachorros, então usamos **There are.**",
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
            ["There are two cats", "Tem dois gatos"],
            ["There are three books", "Tem três livros"],
            ["There are four chairs", "Tem quatro cadeiras"],
            ["There are five pens", "Tem cinco canetas"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint:
            "**There are** = tem (várias coisas). Olhe o número: two, three, four, five.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Confira o número: **two** = 2, **three** = 3, **four** = 4, **five** = 5.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There ",
          after: " ten students in my class.",
          answer: "are",
          hint:
            "Duas ou mais coisas → **There are**: There are two cats. (tem dois gatos)",
          explanation:
            "Isso! “There are ten students in my class” = “Tem dez alunos na minha turma.”",
          correction: "A palavra certa é **are**: dez alunos → There are.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There are three apples.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm79S4.mp3"),
          options: [
            "There is an apple.",
            "There are three apples.",
            "There are two apples.",
          ],
          correctAnswer: "There are three apples.",
          hint: "Escute o número: **an** (uma), **two** (duas) ou **three** (três).",
          explanation: "Ótimo ouvido! “There are three apples” = “Tem três maçãs.”",
          correction:
            "A frase é **There are three apples.** Use o botão 0.5× para ouvir “three”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem dois carros na rua.",
          answer: ["There", "are", "two", "cars", "in", "the", "street"],
          bank: ["cars", "There", "the", "two", "are", "in", "is", "street", "car"],
          hint: "Dois carros → **There are** + **cars** (com -s).",
          explanation:
            "Perfeito! “There are two cars in the street” = “Tem dois carros na rua.”",
          correction:
            "O certo é **There are two cars in the street.** Plural: there are + cars.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There are five ",
          after: " on the table.",
          options: ["books", "book", "bookes"],
          correctAnswer: "books",
          hint: "Depois de There are, a palavra vai para o **plural**: book → books.",
          explanation:
            "Mandou bem! “There are five books on the table” = “Tem cinco livros na mesa.”",
          correction: "Quase! Com There are, use o plural: **five books.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There ",
          after: " many people here.",
          answer: "are",
          hint: "**People** (pessoas) já é plural.",
          explanation: "Isso! “There are many people here” = “Tem muitas pessoas aqui.”",
          correction: "A resposta é **are**: people é plural, então There are.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem muitas pessoas aqui.",
          answer: ["There", "are", "many", "people", "here"],
          bank: ["people", "There", "many", "here", "is", "are", "persons"],
          hint: "“Muitas” = **many**. “Pessoas” = **people** (plural).",
          explanation:
            "Muito bem! “There are many people here” = “Tem muitas pessoas aqui.”",
          correction:
            "O certo é **There are many people here.** People é plural → there are.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There are two birds in the garden.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm79S9.mp3"),
          options: [
            "There are two birds in the garden.",
            "There is a bird in the garden.",
            "There are ten birds in the garden.",
          ],
          correctAnswer: "There are two birds in the garden.",
          hint: "Escute o número: **a** (um), **two** (dois) ou **ten** (dez).",
          explanation:
            "Perfeito! “There are two birds in the garden” = “Tem dois pássaros no jardim.”",
          correction:
            "A frase é **There are two birds in the garden.** Use o botão 0.5× para ouvir “two”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " three bedrooms in my house.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint:
            "Duas ou mais coisas → **There are**: There are two cats. (tem dois gatos)",
          explanation:
            "Mandou bem! “There are three bedrooms in my house” = “Tem três quartos na minha casa.” Lição completa! 🎉",
          correction: "Quase lá! Três quartos → **There are.**",
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
