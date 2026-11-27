import createLessonScreen from "../../LessonScreen";

// Possessives, aula 5 (Plural possessive): plural com s → s' (the boys' room)
// · plural irregular → 's (the children's toys). Os 5 tipos do Grammar Lab
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
          before: "My two brothers share a room. It's my ",
          after: " room.",
          options: ["brother's", "brothers'", "brothers"],
          correctAnswer: "brothers'",
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation: "Isso aí! “My brothers' room” = “O quarto dos meus irmãos.”",
          correction:
            "Quase! São dois irmãos (brothers), então o apóstrofo vem depois do s: **brothers'.**",
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
            ["the girl's bag", "a bolsa da menina"],
            ["the girls' bag", "a bolsa das meninas"],
            ["the boy's dog", "o cachorro do menino"],
            ["the boys' dog", "o cachorro dos meninos"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "**'s** = um dono · **s'** = vários donos.",
          explanation: "Mandou bem! Você já vê a diferença entre 's e s'.",
          correction:
            "Esse par não combina. **girl's** = da menina (uma) · **girls'** = das meninas (várias).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os brinquedos das crianças estão aqui.",
          answer: ["The", "children's", "toys", "are", "here"],
          bank: ["toys", "here", "The", "children's", "childrens'", "are", "is"],
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation:
            "Perfeito! “The children's toys are here” = “Os brinquedos das crianças estão aqui.”",
          correction:
            "O certo é **The children's toys are here.** Children não termina em s, então leva 's.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The students' books are new.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm39S4.mp3"),
          options: [
            "The student's book is new.",
            "The students' books are new.",
            "The teachers' books are new.",
          ],
          correctAnswer: "The students' books are new.",
          hint:
            "Escute **book is** (um) ou **books are** (vários), e **students** ou **teachers**.",
          explanation:
            "Ótimo ouvido! “The students' books are new” = “Os livros dos alunos são novos.”",
          correction:
            "A frase é **The students' books are new.** “Books are” mostra que é plural.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The boys' room = the room of the ",
          after: ".",
          answer: "boys",
          hint: "O apóstrofo depois do s mostra que são **vários donos**.",
          explanation: "Isso! “The boys' room” = o quarto dos meninos.",
          correction:
            "A palavra certa é **boys**: boys' room = o quarto dos meninos (vários).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This store sells ",
          after: " clothes.",
          options: ["women's", "womens'", "woman's"],
          correctAnswer: "women's",
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation:
            "Mandou bem! “Women's clothes” = “Roupas femininas (das mulheres).”",
          correction:
            "Quase! Women é plural irregular (sem s), então leva 's: **women's.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O carro dos meus pais é azul.",
          answer: ["My", "parents'", "car", "is", "blue"],
          bank: ["car", "blue", "My", "parents'", "is", "parent's", "are"],
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation:
            "Muito bem! “My parents' car is blue” = “O carro dos meus pais é azul.”",
          correction:
            "O certo é **My parents' car is blue.** Parents termina em s, então leva só o apóstrofo.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The children's school = the school of the ",
          after: ".",
          answer: "children",
          hint: "Quem vem antes do **'s** é o dono.",
          explanation: "Isso! “The children's school” = a escola das crianças.",
          correction:
            "A resposta é **children**: the children's school = a escola das crianças.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Where are the kids' shoes?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm39S9.mp3"),
          options: [
            "Where is the kid's shoe?",
            "Where are the kids' socks?",
            "Where are the kids' shoes?",
          ],
          correctAnswer: "Where are the kids' shoes?",
          hint:
            "Escute **is** ou **are**, e o final: **shoes** (sapatos) ou **socks** (meias).",
          explanation:
            "Perfeito! “Where are the kids' shoes?” = “Onde estão os sapatos das crianças?”",
          correction:
            "A frase é **Where are the kids' shoes?** Use o botão 0.5× para ouvir “shoes”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The two cats eat together. That's the ",
          after: " food.",
          options: ["cat's", "cats'", "cats"],
          correctAnswer: "cats'",
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation:
            "Mandou bem! “The cats' food” = “A comida dos gatos.” Lição completa! 🎉",
          correction:
            "Quase lá! São dois gatos (cats), então o apóstrofo vem depois do s: **cats'.**",
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
