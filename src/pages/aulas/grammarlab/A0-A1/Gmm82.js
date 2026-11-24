import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 5 (Negatives): There isn't (a / any) · There
// aren't any. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
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
          after: " a TV in my room.",
          options: ["isn't", "aren't", "not"],
          correctAnswer: "isn't",
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation:
            "Isso aí! “There isn't a TV in my room” = “Não tem TV no meu quarto.”",
          correction: "Quase! Uma TV → **There isn't a TV.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Não tem ovos na geladeira.",
          answer: ["There", "aren't", "any", "eggs", "in", "the", "fridge"],
          bank: [
            "eggs",
            "There",
            "any",
            "the",
            "aren't",
            "in",
            "isn't",
            "fridge",
            "some",
          ],
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation:
            "Perfeito! “There aren't any eggs in the fridge” = “Não tem ovos na geladeira.”",
          correction:
            "O certo é **There aren't any eggs in the fridge.** Na negativa, use “any”, não “some”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There isn't a bank here.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm82S3.mp3"),
          options: [
            "There is a bank here.",
            "There isn't a bank here.",
            "There isn't a park here.",
          ],
          correctAnswer: "There isn't a bank here.",
          hint: "Escute se tem **isn't** (negativa) e o lugar: **bank** ou **park**.",
          explanation: "Ótimo ouvido! “There isn't a bank here” = “Não tem banco aqui.”",
          correction:
            "A frase é **There isn't a bank here.** Use o botão 0.5× para ouvir o “n't”.",
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
            ["There isn't a car", "Não tem um carro"],
            ["There aren't any cars", "Não tem carros"],
            ["There isn't any milk", "Não tem leite"],
            ["There aren't any chairs", "Não tem cadeiras"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **isn't a car** = um carro · **aren't any cars** = carros (plural).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There aren't ",
          after: " students in the classroom.",
          answer: "any",
          hint: "Na negativa com plural, usamos **any**: There aren't any…",
          explanation:
            "Isso! “There aren't any students in the classroom” = “Não tem alunos na sala.”",
          correction: "A palavra certa é **any**: na negativa, some vira any.",
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
          after: " any people in the street.",
          options: ["not", "isn't", "aren't"],
          correctAnswer: "aren't",
          hint: "People é plural → **aren't**.",
          explanation:
            "Mandou bem! “There aren't any people in the street” = “Não tem ninguém na rua.”",
          correction: "Quase! People é plural → **There aren't any people.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Não tem leite.",
          answer: ["There", "isn't", "any", "milk"],
          bank: ["milk", "any", "There", "isn't", "aren't", "some"],
          hint: "Leite não se conta → **isn't + any**.",
          explanation: "Muito bem! “There isn't any milk” = “Não tem leite.”",
          correction:
            "O certo é **There isn't any milk.** Milk não se conta → isn't any.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There is ",
          after: " a hospital in my town.",
          answer: "not",
          hint: "Qual palavra deixa a frase negativa?",
          explanation:
            "Isso! “There is not a hospital in my town” = “Não tem hospital na minha cidade.”",
          correction: "A resposta é **not**: There is not = There isn't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There aren't any cookies.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm82S9.mp3"),
          options: [
            "There aren't any cookies.",
            "There are some cookies.",
            "There aren't any cakes.",
          ],
          correctAnswer: "There aren't any cookies.",
          hint:
            "Escute **aren't any** ou **are some**, e o final: **cookies** ou **cakes**.",
          explanation: "Perfeito! “There aren't any cookies” = “Não tem biscoitos.”",
          correction:
            "A frase é **There aren't any cookies.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There aren't ",
          after: " apples.",
          options: ["some", "any", "a"],
          correctAnswer: "any",
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation:
            "Mandou bem! “There aren't any apples” = “Não tem maçãs.” Lição completa! 🎉",
          correction: "Quase lá! Na negativa usamos any: **There aren't any apples.**",
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
