import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 4 (-f / -fe → -ves): f / fe → ves (knife → knives) e
// exceções (roof → roofs, chef → chefs). Os 5 tipos do Grammar Lab
// alternados, uma pergunta por slide. O combo e o XP seguem de um slide para
// o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o painel
// de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One knife, two ",
          after: ".",
          options: ["knifes", "knives", "knivs"],
          correctAnswer: "knives",
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation: "Isso aí! “Two knives” = “Duas facas.”",
          correction: "Quase! Knife termina em fe, que vira ves: **knives.**",
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
            ["a leaf", "uma folha"],
            ["two leaves", "duas folhas"],
            ["a wolf", "um lobo"],
            ["two wolves", "dois lobos"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **leaves** = folhas e **wolves** = lobos (f → ves).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One leaf, many ",
          after: ".",
          answer: "leaves",
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation: "Isso! “Many leaves” = “Muitas folhas.”",
          correction: "A palavra certa é **leaves**: o “f” vira “ves”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As facas estão na gaveta.",
          answer: ["The", "knives", "are", "in", "the", "drawer"],
          bank: ["knives", "drawer", "The", "in", "is", "the", "knifes", "are"],
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation:
            "Perfeito! “The knives are in the drawer” = “As facas estão na gaveta.”",
          correction: "O certo é **The knives are in the drawer.** Knife → knives.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The wolves are hungry.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm91S5.mp3"),
          options: [
            "The wolf is hungry.",
            "The wolves are hungry.",
            "The wolves are angry.",
          ],
          correctAnswer: "The wolves are hungry.",
          hint:
            "Escute **wolf** ou **wolves** (com som de “v”), e **hungry** ou **angry**.",
          explanation:
            "Ótimo ouvido! “The wolves are hungry” = “Os lobos estão com fome.”",
          correction:
            "A frase é **The wolves are hungry.** Use o botão 0.5× para ouvir o “v” de wolves.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The books are on the ",
          after: ".",
          options: ["shelfs", "shelvs", "shelves"],
          correctAnswer: "shelves",
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation:
            "Mandou bem! “The books are on the shelves” = “Os livros estão nas prateleiras.”",
          correction: "Quase! Shelf vira **shelves**: o “f” vira “ves”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One half, two ",
          after: ".",
          answer: "halves",
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation: "Isso! “Two halves” = “Duas metades.”",
          correction: "A resposta é **halves**: half → halves.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The roofs are red.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm91S8.mp3"),
          options: ["The roofs are red.", "The roof is red.", "The rooms are red."],
          correctAnswer: "The roofs are red.",
          hint:
            "Roof é exceção: o plural é só **roofs**. Escute também **roofs** ou **rooms**.",
          explanation: "Perfeito! “The roofs are red” = “Os telhados são vermelhos.”",
          correction:
            "A frase é **The roofs are red.** Roof é exceção: roofs, não “rooves”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One chef, two ",
          after: ".",
          options: ["cheves", "chefs", "chefes"],
          correctAnswer: "chefs",
          hint: "Chef é exceção, igual a roof: só acrescente **-s**.",
          explanation: "Mandou bem! “Two chefs” = “Dois chefs.”",
          correction: "Quase! Chef é exceção: o plural é só **chefs.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os lobos são grandes.",
          answer: ["The", "wolves", "are", "big"],
          bank: ["wolves", "are", "The", "big", "wolfs", "is"],
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation:
            "Muito bem! “The wolves are big” = “Os lobos são grandes.” Lição completa! 🎉",
          correction: "O certo é **The wolves are big.** Wolf → wolves.",
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
