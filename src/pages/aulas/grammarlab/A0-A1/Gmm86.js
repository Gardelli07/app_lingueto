import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 9 (In real life): Descrever casa, cidade e sala
// de aula · in, on, under, next to. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There is a park ",
          after: " my house.",
          options: ["next to", "next", "near of"],
          correctAnswer: "next to",
          hint: "“Ao lado de” = **next to**. (Também dá para dizer near, sem “of”.)",
          explanation:
            "Isso aí! “There is a park next to my house” = “Tem um parque ao lado da minha casa.”",
          correction:
            "Quase! “Ao lado de” = next to: **There is a park next to my house.**",
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
            ["in", "dentro de / em"],
            ["on", "em cima de"],
            ["under", "embaixo de"],
            ["next to", "ao lado de"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "Imagine uma caixa: **in** = dentro · **on** = em cima · **under** = embaixo · **next to** = do lado.",
          explanation: "Mandou bem! Todas as preposições certas.",
          correction:
            "Esse par não combina. **in** = dentro · **on** = em cima · **under** = embaixo · **next to** = ao lado.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There is a cat under the bed.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm86S3.mp3"),
          options: [
            "There is a cat on the bed.",
            "There is a cat under the bed.",
            "There is a hat under the bed.",
          ],
          correctAnswer: "There is a cat under the bed.",
          hint:
            "Escute **on** (em cima) ou **under** (embaixo), e **cat** (gato) ou **hat** (chapéu).",
          explanation:
            "Ótimo ouvido! “There is a cat under the bed” = “Tem um gato embaixo da cama.”",
          correction:
            "A frase é **There is a cat under the bed.** Use o botão 0.5× para ouvir “under”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There is a dog ",
          after: " the table. (embaixo da mesa)",
          answer: "under",
          hint: "“Embaixo de” = **under**.",
          explanation:
            "Isso! “There is a dog under the table” = “Tem um cachorro embaixo da mesa.”",
          correction: "A palavra certa é **under**: embaixo de = under.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um supermercado perto da minha casa.",
          answer: ["There", "is", "a", "supermarket", "near", "my", "house"],
          bank: ["supermarket", "near", "There", "my", "is", "a", "are", "house", "of"],
          hint: "“Perto de” = **near** (sem “of”).",
          explanation:
            "Perfeito! “There is a supermarket near my house” = “Tem um supermercado perto da minha casa.”",
          correction:
            "O certo é **There is a supermarket near my house.** “Perto de” = near, sem “of”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "In my classroom, there ",
          after: " 20 desks.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "Uma coisa → **There is** · duas ou mais → **There are**.",
          explanation: "Mandou bem! “There are 20 desks” = “Tem 20 carteiras.”",
          correction: "Quase! 20 carteiras → **There are.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem duas camas no meu quarto.",
          answer: ["There", "are", "two", "beds", "in", "my", "room"],
          bank: ["beds", "two", "There", "in", "my", "are", "is", "room", "on"],
          hint: "Duas camas → **There are two beds**. “No meu quarto” = **in my room**.",
          explanation:
            "Muito bem! “There are two beds in my room” = “Tem duas camas no meu quarto.”",
          correction:
            "O certo é **There are two beds in my room.** Plural → there are; dentro do quarto → in.",
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
          after: " a lot of traffic in São Paulo.",
          answer: "is",
          hint: "**Traffic** (trânsito) não se conta → **is**.",
          explanation:
            "Isso! “There is a lot of traffic in São Paulo” = “Tem muito trânsito em São Paulo.”",
          correction: "A resposta é **is**: traffic não se conta → There is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There's a bakery next to the school.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm86S9.mp3"),
          options: [
            "There's a bakery next to the school.",
            "There's a bakery near the school.",
            "There's a library next to the school.",
          ],
          correctAnswer: "There's a bakery next to the school.",
          hint:
            "Escute **bakery** (padaria) ou **library** (biblioteca), e **next to** ou **near**.",
          explanation:
            "Perfeito! “There's a bakery next to the school” = “Tem uma padaria ao lado da escola.”",
          correction:
            "A frase é **There's a bakery next to the school.** Use o botão 0.5× para ouvir “bakery”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My city is small. There ",
          after: " any big malls.",
          options: ["isn't", "aren't", "not"],
          correctAnswer: "aren't",
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation:
            "Mandou bem! “There aren't any big malls” = “Não tem shoppings grandes.” Lição completa! 🎉",
          correction: "Quase lá! Malls é plural → **There aren't any.**",
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
