import createLessonScreen from "../../LessonScreen";

// Past simple, aula 2 (Wasn't / Weren't): Negativa do be no passado: wasn't /
// weren't. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " hungry. I ate at home.",
          options: ["wasn't", "weren't", "didn't"],
          correctAnswer: "wasn't",
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation: "Isso aí! “I wasn't hungry” = “Eu não estava com fome.”",
          correction: "Quase! Com “I”: **I wasn't hungry.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não estava em casa.",
          answer: ["She", "wasn't", "at", "home"],
          bank: ["wasn't", "home", "She", "at", "weren't", "didn't"],
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation: "Perfeito! “She wasn't at home” = “Ela não estava em casa.”",
          correction: "O certo é **She wasn't at home.** She → wasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They weren't at school.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm16S3.mp3"),
          options: [
            "They were at school.",
            "They weren't at school.",
            "We weren't at school.",
          ],
          correctAnswer: "They weren't at school.",
          hint: "Escute se tem **weren't** e se é **They** ou **We**.",
          explanation:
            "Ótimo ouvido! “They weren't at school” = “Eles não estavam na escola.”",
          correction:
            "A frase é **They weren't at school.** Use o botão 0.5× para ouvir o “n't”.",
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
            ["I wasn't sad", "Eu não estava triste"],
            ["We weren't late", "Nós não estávamos atrasados"],
            ["It wasn't easy", "Não foi fácil"],
            ["You weren't there", "Você não estava lá"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **sad** = triste · **late** = atrasado · **easy** = fácil · **there** = lá.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He was ",
          after: " at the party.",
          answer: "not",
          hint: "Qual palavra deixa a frase negativa?",
          explanation: "Isso! “He was not at the party” = “Ele não estava na festa.”",
          correction: "A palavra certa é **not**: was not = wasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The tests ",
          after: " difficult.",
          options: ["didn't", "wasn't", "weren't"],
          correctAnswer: "weren't",
          hint: "The tests = they → **weren't**.",
          explanation:
            "Mandou bem! “The tests weren't difficult” = “As provas não foram difíceis.”",
          correction: "Quase! The tests = they → **weren't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O filme não foi bom.",
          answer: ["The", "movie", "wasn't", "good"],
          bank: ["wasn't", "good", "The", "movie", "weren't", "didn't"],
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation: "Muito bem! “The movie wasn't good” = “O filme não foi bom.”",
          correction: "O certo é **The movie wasn't good.** The movie = it → wasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We were ",
          after: " tired after the trip.",
          answer: "not",
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation:
            "Isso! “We were not tired after the trip” = “Nós não estávamos cansados depois da viagem.”",
          correction: "A resposta é **not**: were not = weren't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It wasn't my fault.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm16S9.mp3"),
          options: ["It was my fault.", "It wasn't your fault.", "It wasn't my fault."],
          correctAnswer: "It wasn't my fault.",
          hint: "Escute **wasn't** ou **was**, e **my** ou **your**.",
          explanation: "Perfeito! “It wasn't my fault” = “Não foi culpa minha.”",
          correction:
            "A frase é **It wasn't my fault.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My friends ",
          after: " at work yesterday.",
          options: ["wasn't", "weren't", "aren't"],
          correctAnswer: "weren't",
          hint: "My friends = they · yesterday = passado → **weren't**.",
          explanation:
            "Mandou bem! “My friends weren't at work yesterday” = “Meus amigos não estavam no trabalho ontem.” Lição completa! 🎉",
          correction: "Quase lá! My friends = they, e é passado → **weren't.**",
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
