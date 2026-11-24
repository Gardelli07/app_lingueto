import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 6 (Questions): Perguntas: Am I…? Is she…? Are they…?
// (verbo antes do sujeito). Os 5 tipos do Grammar Lab alternados, uma
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
          after: " you ready?",
          options: ["Is", "Are", "Am"],
          correctAnswer: "Are",
          hint: "Na pergunta, **o verbo vem antes do sujeito**. Com you, usamos **Are**.",
          explanation: "Isso aí! “Are you ready?” = “Você está pronto?”",
          correction: "Quase! Com “you” usamos Are: **Are you ready?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela é professora?",
          answer: ["Is", "she", "a", "teacher"],
          bank: ["teacher", "she", "She", "Is", "a", "is", "Are"],
          hint: "Para perguntar, **troque a ordem**: She is → Is she…?",
          explanation: "Perfeito! “Is she a teacher?” = “Ela é professora?”",
          correction:
            "O certo é **Is she a teacher?** Na pergunta, o “is” vem antes de “she”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are they at home?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm99S3.mp3"),
          options: ["They are at home.", "Are they at home?", "Are they at work?"],
          correctAnswer: "Are they at home?",
          hint:
            "Escute a ordem: começa com **Are** (pergunta) ou com **They** (afirmação)?",
          explanation: "Ótimo ouvido! “Are they at home?” = “Eles estão em casa?”",
          correction:
            "A frase é **Are they at home?** Ela começa com “Are”, por isso é pergunta.",
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
            ["Am I late?", "Estou atrasado?"],
            ["Is he OK?", "Ele está bem?"],
            ["Are we ready?", "Estamos prontos?"],
            ["Is it cold?", "Está frio?"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "Olhe a palavra depois do verbo: **I**, **he**, **we** ou **it**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **Am I** = eu estou?, **Is he** = ele está?, **Are we** = nós estamos?",
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
          after: " Lucas your brother?",
          answer: "Is",
          hint: "Lucas é uma pessoa só, como he. Qual verbo abre a pergunta?",
          explanation: "Isso! “Is Lucas your brother?” = “O Lucas é seu irmão?”",
          correction:
            "A palavra certa é **Is**: Is Lucas your brother? Nome de uma pessoa funciona como “he” ou “she”.",
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
          after: " I late?",
          options: ["Am", "Is", "Are"],
          correctAnswer: "Am",
          hint: "**I** sempre combina com **am**, também na pergunta.",
          explanation: "Mandou bem! “Am I late?” = “Estou atrasado?”",
          correction: "Quase! Com “I” usamos Am: **Am I late?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês estão cansados?",
          answer: ["Are", "you", "tired"],
          bank: ["tired", "Is", "you", "You", "Are", "are"],
          hint: "Pergunta: **verbo primeiro**. You are → Are you…?",
          explanation: "Muito bem! “Are you tired?” = “Vocês estão cansados?”",
          correction:
            "O certo é **Are you tired?** Na pergunta, “are” vem antes de “you”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is she your sister?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm99S8.mp3"),
          options: ["Is he your sister?", "She is your sister.", "Is she your sister?"],
          correctAnswer: "Is she your sister?",
          hint: "Escute o começo (**Is** ou **She**) e o sujeito (**she** ou **he**).",
          explanation: "Perfeito! “Is she your sister?” = “Ela é sua irmã?”",
          correction:
            "A frase é **Is she your sister?** Use o botão 0.5× para ouvir o “sh” de “she”.",
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
          after: " the dogs hungry?",
          answer: "Are",
          hint: "The dogs são vários, como **they**.",
          explanation: "Isso! “Are the dogs hungry?” = “Os cachorros estão com fome?”",
          correction: "A resposta é **Are**: Are the dogs hungry? Plural usa “are”.",
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
          after: " it cold today?",
          options: ["Are", "Am", "Is"],
          correctAnswer: "Is",
          hint: "**It** combina com **is**. Na pergunta, ele vem primeiro.",
          explanation:
            "Mandou bem! “Is it cold today?” = “Está frio hoje?” Lição completa! 🎉",
          correction: "Quase lá! Com “it” usamos Is: **Is it cold today?**",
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
