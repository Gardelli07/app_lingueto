import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 3 (We / They are): Sujeitos no plural (we, they, you,
// nomes no plural) + are. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " friends.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "Com we, you e they (plural), usamos sempre **are**.",
          explanation: "Isso aí! “We are friends” = “Nós somos amigos.”",
          correction: "Quase! Com “We” usamos are: **We are friends.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles estão em casa.",
          answer: ["They", "are", "at", "home"],
          bank: ["home", "is", "They", "at", "are", "We"],
          hint: "“Eles” é **They** e “nós” é **We**. Com os dois usamos **are**.",
          explanation: "Perfeito! “They are at home” = “Eles estão em casa.”",
          correction: "O certo é **They are at home.** “They” = eles, “We” = nós.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We are happy.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm96S3.mp3"),
          options: ["They are happy.", "We are happy.", "We are hungry."],
          correctAnswer: "We are happy.",
          hint: "Ouça o começo (**We** ou **They**) e o final (**happy** ou **hungry**).",
          explanation: "Ótimo ouvido! “We are happy” = “Nós estamos felizes.”",
          correction:
            "A frase é **We are happy.** “Happy” = feliz; “hungry” = com fome.",
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
            ["We are", "Nós somos"],
            ["They are", "Eles são"],
            ["You are", "Vocês são"],
            ["Ana and I are", "Ana e eu somos"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Ana and I = Ana e eu = nós. Por isso leva **are**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **We** = nós, **They** = eles, **You** = vocês.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Tom and Lucy ",
          after: " at school.",
          answer: "are",
          hint: "Tom e Lucy são duas pessoas, como they. Qual verbo combina?",
          explanation:
            "Isso! “Tom and Lucy are at school” = “Tom e Lucy estão na escola.”",
          correction:
            "A palavra certa é **are**: Tom and Lucy are at school. Duas pessoas funcionam como “they”.",
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
          after: " are my parents.",
          options: ["He", "It", "They"],
          correctAnswer: "They",
          hint: "Pais são duas pessoas. Qual palavra significa “eles”?",
          explanation: "Mandou bem! “They are my parents” = “Eles são meus pais.”",
          correction:
            "Quase! Para duas ou mais pessoas usamos They: **They are my parents.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós somos brasileiros.",
          answer: ["We", "are", "Brazilian"],
          bank: ["Brazilian", "They", "is", "We", "are", "am"],
          hint:
            "“Nós” é **We**. Nacionalidade em inglês não vai para o plural: **Brazilian**.",
          explanation: "Muito bem! “We are Brazilian” = “Nós somos brasileiros.”",
          correction:
            "O certo é **We are Brazilian.** Com “We” usamos “are”, e “Brazilian” fica igual no plural.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They are my friends.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm96S8.mp3"),
          options: [
            "They are my parents.",
            "They are my friends.",
            "We are your friends.",
          ],
          correctAnswer: "They are my friends.",
          hint: "Preste atenção no final: **friends** (amigos) ou **parents** (pais)?",
          explanation: "Perfeito! “They are my friends” = “Eles são meus amigos.”",
          correction:
            "A frase é **They are my friends.** Use o botão 0.5× para ouvir “friends” devagar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My cats ",
          after: " black.",
          answer: "are",
          hint: "My cats são vários gatos, como **they**.",
          explanation: "Isso! “My cats are black” = “Meus gatos são pretos.”",
          correction:
            "A resposta é **are**: My cats are black. Animais no plural funcionam como “they”.",
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
            ["The dogs are big", "Os cachorros são grandes"],
            ["We are tired", "Nós estamos cansados"],
            ["They are at work", "Eles estão no trabalho"],
            ["You are students", "Vocês são alunos"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "Comece pelo sujeito: **We**, **They**, **You** ou um nome no plural.",
          explanation:
            "Excelente! Você já reconhece frases inteiras com “are”. Lição completa! 🎉",
          correction:
            "Ops! Confira o sujeito: **We** = nós, **They** = eles, **You** = vocês.",
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
