import createLessonScreen from "../../LessonScreen";

// Possessives, aula 6 (Mine / Yours): Pronomes possessivos: mine, yours, his,
// hers, ours, theirs (sem substantivo depois). Os 5 tipos do Grammar Lab
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
          before: "This book is ",
          after: ".",
          options: ["my", "mine", "me"],
          correctAnswer: "mine",
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation: "Isso aí! “This book is mine” = “Este livro é meu.”",
          correction: "Quase! No fim da frase, sem substantivo depois, usamos **mine.**",
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
            ["my", "mine"],
            ["your", "yours"],
            ["her", "hers"],
            ["our", "ours"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its pronoun.",
          hint:
            "Quase todos ganham **-s**: your → yours, her → hers, our → ours. **my** vira **mine**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. my → **mine** · your → **yours** · her → **hers** · our → **ours**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "That bag is hers.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm40S3.mp3"),
          options: ["That bag is hers.", "That bag is his.", "That bag is ours."],
          correctAnswer: "That bag is hers.",
          hint:
            "Escute o final: **hers** (“hêrz”), **his** (“hiz”) ou **ours** (“áuerz”).",
          explanation: "Ótimo ouvido! “That bag is hers” = “Aquela bolsa é dela.”",
          correction:
            "A frase é **That bag is hers.** Use o botão 0.5× para ouvir “hers”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It's my phone. It's ",
          after: ".",
          answer: "mine",
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation: "Isso! “It's mine” = “É meu.”",
          correction: "A palavra certa é **mine**: my phone = mine.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Esse carro é nosso.",
          answer: ["That", "car", "is", "ours"],
          bank: ["car", "ours", "That", "our", "is", "us"],
          hint: "No fim da frase, “nosso” = **ours**.",
          explanation: "Perfeito! “That car is ours” = “Esse carro é nosso.”",
          correction:
            "O certo é **That car is ours.** Sem substantivo depois, usamos “ours”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is this Pedro's pen? – Yes, it's ",
          after: ".",
          options: ["him", "his", "he's"],
          correctAnswer: "his",
          hint: "**his** serve para os dois casos: his pen e it's his.",
          explanation: "Mandou bem! “Yes, it's his” = “Sim, é dele.”",
          correction: "Quase! “Dele” no fim da frase continua his: **Yes, it's his.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A casa é deles.",
          answer: ["The", "house", "is", "theirs"],
          bank: ["house", "theirs", "The", "their", "is", "they"],
          hint: "No fim da frase, “deles” = **theirs**.",
          explanation: "Muito bem! “The house is theirs” = “A casa é deles.”",
          correction:
            "O certo é **The house is theirs.** Sem substantivo depois, usamos “theirs”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It's Ana's bag. It's ",
          after: ".",
          answer: "hers",
          hint: "A bolsa é da Ana (she). No fim da frase, qual pronome?",
          explanation: "Isso! “It's hers” = “É dela.”",
          correction: "A resposta é **hers**: her bag = hers.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Those books are theirs.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm40S9.mp3"),
          options: [
            "These books are theirs.",
            "Those books are ours.",
            "Those books are theirs.",
          ],
          correctAnswer: "Those books are theirs.",
          hint: "Escute **these** ou **those**, e o final: **theirs** ou **ours**.",
          explanation: "Perfeito! “Those books are theirs” = “Aqueles livros são deles.”",
          correction:
            "A frase é **Those books are theirs.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Your shoes are white. ",
          after: " are black.",
          options: ["Mine", "My", "Me"],
          correctAnswer: "Mine",
          hint: "Sem substantivo depois, use: **mine, yours, his, hers, ours, theirs**.",
          explanation:
            "Mandou bem! “Mine are black” = “Os meus são pretos.” Lição completa! 🎉",
          correction:
            "Quase lá! Sem substantivo depois, usamos Mine: **Mine are black.**",
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
