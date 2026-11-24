import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 2 (-es endings): Plural com -es: s, ss, sh, ch, x e
// alguns -o (boxes, watches, tomatoes). Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One box, two ",
          after: ".",
          options: ["boxs", "boxes", "boxies"],
          correctAnswer: "boxes",
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Isso aí! “Two boxes” = “Duas caixas.”",
          correction: "Quase! Box termina em x, então ganha -es: **boxes.**",
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
            ["a bus", "um ônibus"],
            ["two buses", "dois ônibus"],
            ["a watch", "um relógio"],
            ["two watches", "dois relógios"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **buses** e **watches** são plurais com -es.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I need two glasses.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm89S3.mp3"),
          options: ["I need a glass.", "I need two classes.", "I need two glasses."],
          correctAnswer: "I need two glasses.",
          hint: "Escute o número e o final **-es** (“glass-iz”).",
          explanation: "Ótimo ouvido! “I need two glasses” = “Eu preciso de dois copos.”",
          correction:
            "A frase é **I need two glasses.** O “-es” soa como “iz”. Use o botão 0.5×.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One dish, three ",
          after: ".",
          answer: "dishes",
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Isso! “Three dishes” = “Três pratos.”",
          correction:
            "A palavra certa é **dishes**: dish termina em “sh”, então ganha “es”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As caixas estão na mesa.",
          answer: ["The", "boxes", "are", "on", "the", "table"],
          bank: ["boxes", "table", "The", "is", "on", "boxs", "are", "the"],
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation:
            "Perfeito! “The boxes are on the table” = “As caixas estão na mesa.”",
          correction: "O certo é **The boxes are on the table.** Box + es = boxes.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I want two ",
          after: ", please.",
          options: ["tomato", "tomatos", "tomatoes"],
          correctAnswer: "tomatoes",
          hint:
            "Algumas palavras com -o ganham **-es**: tomato → tomatoes, potato → potatoes. (Mas photo → photos.)",
          explanation: "Mandou bem! “Two tomatoes, please” = “Dois tomates, por favor.”",
          correction: "Quase! Tomato ganha -es: **tomatoes.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One church, two ",
          after: ".",
          answer: "churches",
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Isso! “Two churches” = “Duas igrejas.”",
          correction:
            "A resposta é **churches**: church termina em “ch”, então ganha “es”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele tem dois relógios.",
          answer: ["He", "has", "two", "watches"],
          bank: ["watches", "has", "He", "two", "watchs", "have"],
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Muito bem! “He has two watches” = “Ele tem dois relógios.”",
          correction: "O certo é **He has two watches.** Watch termina em “ch”: watches.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The classes are big.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm89S9.mp3"),
          options: ["The glasses are big.", "The class is big.", "The classes are big."],
          correctAnswer: "The classes are big.",
          hint:
            "Escute **classes** (turmas) ou **glasses** (copos/óculos), e **is** ou **are**.",
          explanation: "Perfeito! “The classes are big” = “As turmas são grandes.”",
          correction:
            "A frase é **The classes are big.** Use o botão 0.5× para ouvir o “c” de classes.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Her ",
          after: " are beautiful.",
          options: ["dresses", "dresss", "dress"],
          correctAnswer: "dresses",
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation:
            "Mandou bem! “Her dresses are beautiful” = “Os vestidos dela são lindos.” Lição completa! 🎉",
          correction: "Quase lá! Dress termina em “ss”, então ganha -es: **dresses.**",
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
