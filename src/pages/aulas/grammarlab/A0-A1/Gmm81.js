import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 4 (There's & some): Contração there's (= there
// is) · a / an no singular, some no plural. Os 5 tipos do Grammar Lab
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
          before: "",
          after: " a dog in the garden.",
          options: ["There's", "Theres", "There're"],
          correctAnswer: "There's",
          instruction: "Choose the short form of “There is”.",
          hint: "There is vira **There's**, com apóstrofo.",
          explanation:
            "Isso aí! “There's a dog in the garden” = “Tem um cachorro no jardim.”",
          correction: "Quase! A forma curta de There is é **There's**, com apóstrofo.",
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
            ["There's a cat", "Tem um gato"],
            ["There's an egg", "Tem um ovo"],
            ["There are some cats", "Tem alguns gatos"],
            ["There are some eggs", "Tem alguns ovos"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint: "**There's a / an** = um · **There are some** = alguns.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **a / an** = um · **some** = alguns.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There's a bus stop here.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm81S3.mp3"),
          options: [
            "There's a bus stop here.",
            "There's a bus here.",
            "There are bus stops here.",
          ],
          correctAnswer: "There's a bus stop here.",
          hint: "Escute **bus stop** (ponto de ônibus) ou só **bus** (ônibus).",
          explanation:
            "Ótimo ouvido! “There's a bus stop here” = “Tem um ponto de ônibus aqui.”",
          correction:
            "A frase é **There's a bus stop here.** Use o botão 0.5× para ouvir “bus stop”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There are ",
          after: " books on the shelf.",
          answer: "some",
          instruction: "Type the word for “alguns”.",
          hint: "“Alguns / algumas” = **some**.",
          explanation:
            "Isso! “There are some books on the shelf” = “Tem alguns livros na prateleira.”",
          correction: "A palavra certa é **some**: alguns livros = some books.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um banco perto daqui.",
          answer: ["There's", "a", "bank", "near", "here"],
          bank: ["bank", "There's", "near", "a", "here", "are", "some"],
          hint: "Use a forma curta **There's** + a bank.",
          explanation:
            "Perfeito! “There's a bank near here” = “Tem um banco perto daqui.”",
          correction:
            "O certo é **There's a bank near here.** Um banco → There's a bank.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There's ",
          after: " orange in the bag.",
          options: ["a", "an", "some"],
          correctAnswer: "an",
          hint: "There's + uma coisa. Orange começa com vogal → **an**.",
          explanation:
            "Mandou bem! “There's an orange in the bag” = “Tem uma laranja na bolsa.”",
          correction: "Quase! Uma laranja, e orange começa com vogal: **an orange.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There's = There ",
          after: ".",
          answer: "is",
          hint: "O **'s** de there's vem de qual verbo?",
          explanation: "Isso! “There's” = “There is”.",
          correction: "A resposta é **is**: There's = There is.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem algumas crianças no parque.",
          answer: ["There", "are", "some", "children", "in", "the", "park"],
          bank: ["children", "some", "There", "park", "are", "the", "in", "There's", "a"],
          hint: "Várias crianças → **There are some** + children.",
          explanation:
            "Muito bem! “There are some children in the park” = “Tem algumas crianças no parque.”",
          correction:
            "O certo é **There are some children in the park.** Plural → there are some.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There are some cups in the kitchen.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm81S9.mp3"),
          options: [
            "There's a cup in the kitchen.",
            "There are some cups in the kitchen.",
            "There are some cups in the bedroom.",
          ],
          correctAnswer: "There are some cups in the kitchen.",
          hint:
            "Escute **a cup** ou **some cups**, e o lugar: **kitchen** (cozinha) ou **bedroom** (quarto).",
          explanation:
            "Perfeito! “There are some cups in the kitchen” = “Tem algumas xícaras na cozinha.”",
          correction:
            "A frase é **There are some cups in the kitchen.** Use o botão 0.5× para ouvir o final.",
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
          after: " some chairs in the room.",
          options: ["There's", "There are", "There is"],
          correctAnswer: "There are",
          hint: "**some** + plural (chairs) → **There are**. Não use there's com plural.",
          explanation:
            "Mandou bem! “There are some chairs in the room” = “Tem algumas cadeiras na sala.” Lição completa! 🎉",
          correction: "Quase lá! Chairs é plural → **There are some chairs.**",
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
