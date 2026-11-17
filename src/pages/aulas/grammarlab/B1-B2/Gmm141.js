import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 4 (Would (past habits)): would = costumava,
// só para ações repetidas (não para estados). Os 5 tipos do Grammar Lab
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
          before: "Every Sunday, my grandpa ",
          after: " take us fishing.",
          options: ["would", "will", "was"],
          correctAnswer: "would",
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation:
            "Isso aí! “My grandpa would take us fishing” = “Meu avô levava a gente para pescar.”",
          correction: "Quase! Ação repetida no passado → **would take.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "When we were kids, we ",
          after: " spend hours playing outside.",
          answer: "would",
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation:
            "Isso! “We would spend hours playing outside” = “A gente passava horas brincando lá fora.”",
          correction: "A palavra certa é **would**: ação repetida no passado.",
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
            ["We would play for hours.", "A gente brincava por horas."],
            ["She would sing to us.", "Ela cantava para nós."],
            ["He would always arrive late.", "Ele sempre chegava atrasado."],
            ["They would visit us every year.", "Eles nos visitavam todo ano."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation: "Mandou bem! Would aqui = imperfeito do português.",
          correction:
            "Esse par não combina. **play** = brincava · **sing** = cantava · **arrive** = chegava · **visit** = visitavam.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My mum would make pancakes on Saturdays.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm141S4.mp3"),
          options: [
            "My mum would make pancakes on Saturdays.",
            "My mum will make pancakes on Saturday.",
            "My mum would make cakes on Saturdays.",
          ],
          correctAnswer: "My mum would make pancakes on Saturdays.",
          hint: "Escute **would** ou **will**, e **pancakes** ou **cakes**.",
          explanation: "Ótimo ouvido! “Minha mãe fazia panquecas aos sábados.”",
          correction:
            "A frase é **My mum would make pancakes on Saturdays.** Use o botão 0.5× para ouvir “pancakes”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu pai lia para mim toda noite.",
          answer: ["My", "dad", "would", "read", "to", "me", "every", "night"],
          bank: [
            "My",
            "dad",
            "would",
            "read",
            "to",
            "me",
            "every",
            "night",
            "will",
            "reads",
          ],
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation: "Perfeito! “My dad would read to me every night.”",
          correction:
            "O certo é **My dad would read to me every night.** Ação repetida → would + read.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " have a cat called Tom.",
          options: ["would", "used to", "will"],
          correctAnswer: "used to",
          hint: "**have** (ter) é estado, não ação → só **used to**.",
          explanation:
            "Mandou bem! “I used to have a cat called Tom” = “Eu tinha um gato chamado Tom.”",
          correction: "Quase! “Have” é estado → **used to** (would não funciona aqui).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She ",
          after: " to be very shy when she was a teenager.",
          answer: "used",
          hint: "**be** (ser) é estado → **used to**, não would.",
          explanation: "Isso! “She used to be very shy” = “Ela era muito tímida.”",
          correction: "A resposta é **used**: estado → used to be.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós sempre brigávamos por causa da TV.",
          answer: ["We", "would", "always", "fight", "over", "the", "TV"],
          bank: ["We", "would", "always", "fight", "over", "the", "TV", "will", "fights"],
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation: "Muito bem! “We would always fight over the TV.”",
          correction:
            "O certo é **We would always fight over the TV.** Would + always + fight.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We would sit by the fire and tell stories.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm141S9.mp3"),
          options: [
            "We will sit by the fire and tell stories.",
            "We would sit by the fire and tell stories.",
            "We would sit by the fire and sing songs.",
          ],
          correctAnswer: "We would sit by the fire and tell stories.",
          hint:
            "Escute **would** ou **will**, e o final: **tell stories** ou **sing songs**.",
          explanation:
            "Perfeito! “A gente sentava perto da lareira e contava histórias.”",
          correction:
            "A frase é **We would sit by the fire and tell stories.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My grandparents ",
          after: " live in a farmhouse.",
          options: ["would", "used to", "will"],
          correctAnswer: "used to",
          hint: "**live** (morar) é estado → **used to**.",
          explanation:
            "Mandou bem! “My grandparents used to live in a farmhouse.” Lição completa! 🎉",
          correction: "Quase lá! Morar é estado → **used to live.**",
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
