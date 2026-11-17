import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 7 (These / Those): this → these · that → those (+ are).
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This is a pen. ",
          after: " are pens.",
          options: ["These", "This", "That"],
          correctAnswer: "These",
          hint: "this (este) → **these** (estes) · that (aquele) → **those** (aqueles).",
          explanation: "Isso aí! “These are pens” = “Estas são canetas.”",
          correction: "Quase! O plural de this é These: **These are pens.**",
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
            ["this", "este / esta"],
            ["these", "estes / estas"],
            ["that", "aquele / aquela"],
            ["those", "aqueles / aquelas"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**this / these** = perto · **that / those** = longe.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **these** = estes (perto) e **those** = aqueles (longe).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "These shoes are new.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm94S3.mp3"),
          options: ["This shoe is new.", "These shoes are new.", "Those shoes are new."],
          correctAnswer: "These shoes are new.",
          hint: "**These** tem som de “ii” longo; **those** tem som de “ou”.",
          explanation: "Ótimo ouvido! “These shoes are new” = “Estes sapatos são novos.”",
          correction:
            "A frase é **These shoes are new.** Use o botão 0.5× para ouvir “these” e não “those”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "That is a bird. Those ",
          after: " birds.",
          answer: "are",
          hint: "**Those** é plural, então o verbo é **are**.",
          explanation: "Isso! “Those are birds” = “Aqueles são pássaros.”",
          correction: "A palavra certa é **are**: Those are birds.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Estes livros são meus.",
          answer: ["These", "books", "are", "mine"],
          bank: ["books", "mine", "These", "is", "This", "are"],
          hint: "“Estes” = **These**. Plural usa **are**.",
          explanation: "Perfeito! “These books are mine” = “Estes livros são meus.”",
          correction:
            "O certo é **These books are mine.** “Estes” = these, e plural leva “are”.",
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
          after: " boxes over there are heavy.",
          options: ["These", "Those", "That"],
          correctAnswer: "Those",
          hint: "over there = lá longe. Plural e longe = **those**.",
          explanation:
            "Mandou bem! “Those boxes over there are heavy” = “Aquelas caixas lá são pesadas.”",
          correction: "Quase! Longe (over there) e no plural = **Those.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "This is a child. These are ",
          after: ".",
          answer: "children",
          hint: "Lembra do plural irregular de child?",
          explanation: "Isso! “These are children” = “Estas são crianças.”",
          correction: "A resposta é **children**: o plural de child é irregular.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Aquelas mulheres são professoras.",
          answer: ["Those", "women", "are", "teachers"],
          bank: ["women", "teachers", "Those", "are", "That", "woman", "is", "teacher"],
          hint: "“Aquelas” = **Those**. Woman → **women**, teacher → **teachers**.",
          explanation:
            "Muito bem! “Those women are teachers” = “Aquelas mulheres são professoras.”",
          correction:
            "O certo é **Those women are teachers.** Tudo no plural: those, women, teachers.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Those are my keys.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm94S9.mp3"),
          options: ["Those are my keys.", "These are my keys.", "That is my key."],
          correctAnswer: "Those are my keys.",
          hint: "Escute **those** (“ou”) ou **these** (“ii”).",
          explanation: "Perfeito! “Those are my keys” = “Aquelas são as minhas chaves.”",
          correction:
            "A frase é **Those are my keys.** Use o botão 0.5× para ouvir o “ou” de those.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "These ",
          after: " my friends.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "**These** é plural: o verbo é **are**.",
          explanation:
            "Mandou bem! “These are my friends” = “Estes são meus amigos.” Lição completa! 🎉",
          correction: "Quase lá! Com these usamos are: **These are my friends.**",
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
