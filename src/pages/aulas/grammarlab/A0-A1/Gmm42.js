import createLessonScreen from "../../LessonScreen";

// Possessives, aula 8 (Review): Revisão: uma mistura das aulas 1 a 7. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'm Leo. This is ",
          after: " dog.",
          options: ["my", "mine", "me"],
          correctAnswer: "my",
          hint:
            "I → **my** · you → **your** · he → **his** · she → **her** · it → **its** · we → **our** · they → **their**",
          explanation: "Isso aí! “This is my dog” = “Este é o meu cachorro.”",
          correction: "Quase! Antes de “dog” usamos my: **This is my dog.**",
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
            ["his", "dele"],
            ["her", "dela"],
            ["their", "deles"],
            ["our", "nosso"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "I → **my** · you → **your** · he → **his** · she → **her** · it → **its** · we → **our** · they → **their**",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **his** = dele · **her** = dela · **their** = deles · **our** = nosso.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O quarto dos meninos é azul.",
          answer: ["The", "boys'", "room", "is", "blue"],
          bank: ["room", "blue", "The", "boys'", "is", "boy's", "are"],
          hint:
            "Plural com s → só apóstrofo (**boys'**). Plural irregular → 's (**children's**).",
          explanation:
            "Perfeito! “The boys' room is blue” = “O quarto dos meninos é azul.”",
          correction: "O certo é **The boys' room is blue.** Vários meninos: boys'.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is this your phone?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm42S4.mp3"),
          options: ["Is this her phone?", "Is this your phone?", "Is this yours?"],
          correctAnswer: "Is this your phone?",
          hint: "Escute **your** ou **her**, e se tem **phone** no final.",
          explanation: "Ótimo ouvido! “Is this your phone?” = “Este celular é seu?”",
          correction:
            "A frase é **Is this your phone?** Use o botão 0.5× para ouvir “your phone”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Tom and Ana have a car. It's ",
          after: " car.",
          answer: "their",
          hint: "Tom e Ana = they. Antes de “car”, qual possessivo?",
          explanation: "Isso! “It's their car” = “É o carro deles.”",
          correction: "A palavra certa é **their**: they → their.",
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
          after: " coat is this? – It's Pedro's.",
          options: ["Who's", "Whose", "Who"],
          correctAnswer: "Whose",
          hint: "**Whose** = de quem.",
          explanation: "Mandou bem! “Whose coat is this?” = “De quem é este casaco?”",
          correction: "Quase! Para perguntar “de quem”, usamos **Whose.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "This is Maria's bag. It's ",
          after: ".",
          answer: "hers",
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation: "Isso! “It's hers” = “É dela.”",
          correction: "A resposta é **hers**: a bolsa da Maria = é dela.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O celular é dela.",
          answer: ["The", "phone", "is", "hers"],
          bank: ["phone", "hers", "The", "her", "is", "she's"],
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation: "Muito bem! “The phone is hers” = “O celular é dela.”",
          correction: "O certo é **The phone is hers.** No fim da frase, “dela” = hers.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Our grandma's house is old.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm42S9.mp3"),
          options: [
            "Our grandma's house is old.",
            "Their grandma's house is old.",
            "Our grandma's house is cold.",
          ],
          correctAnswer: "Our grandma's house is old.",
          hint: "Escute **our** ou **their**, e o final: **old** ou **cold**.",
          explanation:
            "Perfeito! “Our grandma's house is old” = “A casa da nossa avó é antiga.”",
          correction:
            "A frase é **Our grandma's house is old.** Use o botão 0.5× para ouvir “our” e “old”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The house is old, but ",
          after: " windows are new.",
          options: ["it's", "its", "his"],
          correctAnswer: "its",
          hint: "Para coisas: **its** (sem apóstrofo). it's = it is.",
          explanation:
            "Mandou bem! “Its windows are new” = “As janelas dela (da casa) são novas.” Você terminou possessives! 🎉",
          correction:
            "Quase lá! A casa é uma coisa: **its**, sem apóstrofo. “It's” = it is.",
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
