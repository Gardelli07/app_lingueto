import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 1 (There is): There is + uma coisa só (= tem /
// há). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo
// e o XP seguem de um slide para o outro (ComboSlide). `explanation` e o
// texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " a cat on the sofa.",
          options: ["There are", "There is", "Their is"],
          correctAnswer: "There is",
          hint: "Uma coisa só → **There is**: There is a cat. (tem um gato)",
          explanation: "Isso aí! “There is a cat on the sofa” = “Tem um gato no sofá.”",
          correction: "Quase! É um gato só, então usamos **There is.**",
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
            ["There is a book", "Tem um livro"],
            ["There is a dog", "Tem um cachorro"],
            ["There is a bed", "Tem uma cama"],
            ["There is an apple", "Tem uma maçã"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**There is** = tem / há. Olhe a palavra no final.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **There is** = tem. Confira a palavra: **book** = livro, **dog** = cachorro, **bed** = cama.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There is a pen on the table.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm78S3.mp3"),
          options: [
            "There is a pen on the table.",
            "There is a pen under the table.",
            "There are pens on the table.",
          ],
          correctAnswer: "There is a pen on the table.",
          hint:
            "Escute **is a pen** (uma) ou **are pens** (várias), e **on** (em cima) ou **under** (embaixo).",
          explanation:
            "Ótimo ouvido! “There is a pen on the table” = “Tem uma caneta na mesa.”",
          correction:
            "A frase é **There is a pen on the table.** Use o botão 0.5× para ouvir “on the table”.",
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
          after: " a car in the street.",
          answer: "is",
          hint: "Uma coisa só → **There is**: There is a cat. (tem um gato)",
          explanation: "Isso! “There is a car in the street” = “Tem um carro na rua.”",
          correction: "A palavra certa é **is**: um carro só → There is.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um gato no meu quarto.",
          answer: ["There", "is", "a", "cat", "in", "my", "room"],
          bank: ["cat", "There", "in", "is", "my", "are", "room", "a"],
          hint: "Comece com **There is**. Depois: a cat + in my room.",
          explanation:
            "Perfeito! “There is a cat in my room” = “Tem um gato no meu quarto.”",
          correction: "O certo é **There is a cat in my room.** “Tem” = there is.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There is ",
          after: " apple in my bag.",
          options: ["a", "an", "two"],
          correctAnswer: "an",
          hint:
            "There is + **a / an** (uma coisa). Apple começa com som de vogal → **an**.",
          explanation:
            "Mandou bem! “There is an apple in my bag” = “Tem uma maçã na minha bolsa.”",
          correction:
            "Quase! There is + uma coisa, e apple começa com vogal: **an apple.**",
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
          after: " is a park near my house.",
          answer: "There",
          hint: "Para dizer que tem alguma coisa, começamos com **There**.",
          explanation:
            "Isso! “There is a park near my house” = “Tem um parque perto da minha casa.”",
          correction: "A resposta é **There**: There is a park near my house.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem uma mesa na sala.",
          answer: ["There", "is", "a", "table", "in", "the", "living", "room"],
          bank: ["table", "the", "There", "living", "is", "a", "room", "in", "are"],
          hint: "“Sala (de estar)” = **living room**. Comece com There is a…",
          explanation:
            "Muito bem! “There is a table in the living room” = “Tem uma mesa na sala.”",
          correction:
            "O certo é **There is a table in the living room.** Uma mesa → there is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There is a bird in the tree.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm78S9.mp3"),
          options: [
            "There are birds in the tree.",
            "There is a bird in the street.",
            "There is a bird in the tree.",
          ],
          correctAnswer: "There is a bird in the tree.",
          hint:
            "Escute **is a bird** ou **are birds**, e o final: **tree** (árvore) ou **street** (rua).",
          explanation:
            "Perfeito! “There is a bird in the tree” = “Tem um pássaro na árvore.”",
          correction:
            "A frase é **There is a bird in the tree.** Use o botão 0.5× para ouvir “tree”.",
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
          after: " a teacher in the classroom.",
          options: ["is", "are", "am"],
          correctAnswer: "is",
          hint: "Uma coisa só → **There is**: There is a cat. (tem um gato)",
          explanation:
            "Mandou bem! “There is a teacher in the classroom” = “Tem um professor na sala de aula.” Lição completa! 🎉",
          correction: "Quase lá! Um professor só → **There is.**",
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
