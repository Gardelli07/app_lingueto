import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 3 (-y → -ies): consoante + y → ies (baby → babies);
// vogal + y → s (boy → boys). Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One baby, two ",
          after: ".",
          options: ["babys", "babies", "babyes"],
          correctAnswer: "babies",
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation: "Isso aí! “Two babies” = “Dois bebês.”",
          correction: "Quase! Baby termina em consoante + y, então vira **babies.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As cidades são grandes.",
          answer: ["The", "cities", "are", "big"],
          bank: ["cities", "are", "The", "big", "citys", "is"],
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation: "Perfeito! “The cities are big” = “As cidades são grandes.”",
          correction: "O certo é **The cities are big.** City → cities.",
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
            ["a city", "uma cidade"],
            ["two cities", "duas cidades"],
            ["a boy", "um menino"],
            ["two boys", "dois meninos"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **cities** = cidades e **boys** = meninos.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One party, two ",
          after: ".",
          answer: "parties",
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation: "Isso! “Two parties” = “Duas festas.”",
          correction:
            "A palavra certa é **parties**: party termina em consoante + y, então vira “ies”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The babies are tired.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm90S5.mp3"),
          options: ["The baby is tired.", "The babies are tired.", "The boys are tired."],
          correctAnswer: "The babies are tired.",
          hint: "Escute **is** (um) ou **are** (vários), e **babies** ou **boys**.",
          explanation:
            "Ótimo ouvido! “The babies are tired” = “Os bebês estão cansados.”",
          correction:
            "A frase é **The babies are tired.** Use o botão 0.5× para ouvir “babies”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I have three ",
          after: ".",
          options: ["keys", "keies", "keyes"],
          correctAnswer: "keys",
          hint: "Key termina em vogal + y (e + y): só acrescente **-s**.",
          explanation: "Mandou bem! “I have three keys” = “Eu tenho três chaves.”",
          correction: "Quase! Key tem vogal antes do y, então é só -s: **keys.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os morangos estão bons.",
          answer: ["The", "strawberries", "are", "good"],
          bank: ["strawberries", "good", "The", "is", "strawberrys", "are"],
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation:
            "Muito bem! “The strawberries are good” = “Os morangos estão bons.”",
          correction:
            "O certo é **The strawberries are good.** Strawberry → strawberries.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One day, seven ",
          after: ".",
          answer: "days",
          hint: "Day termina em vogal + y (a + y): só acrescente **-s**.",
          explanation: "Isso! “Seven days” = “Sete dias.”",
          correction:
            "A resposta é **days**: tem vogal antes do y, então não muda para “ies”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Two ladies are here.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm90S9.mp3"),
          options: ["Two ladies are here.", "A lady is here.", "Two babies are here."],
          correctAnswer: "Two ladies are here.",
          hint:
            "Escute o começo (**Two** ou **A**) e a palavra: **ladies** ou **babies**.",
          explanation: "Perfeito! “Two ladies are here” = “Duas senhoras estão aqui.”",
          correction: "A frase é **Two ladies are here.** Lady → ladies.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Kids love ",
          after: ".",
          options: ["toies", "toyes", "toys"],
          correctAnswer: "toys",
          hint: "Toy termina em vogal + y (o + y): só **-s**.",
          explanation:
            "Mandou bem! “Kids love toys” = “Crianças adoram brinquedos.” Lição completa! 🎉",
          correction: "Quase lá! Toy tem vogal antes do y, então é só -s: **toys.**",
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
