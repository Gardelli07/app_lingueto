import createLessonScreen from "../../LessonScreen";

// Present simple, aula 16 (Like / Love / Hate): like / love / hate + coisa ou
// + verbo com -ing. Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I like ",
          after: ".",
          options: ["swim", "swimming", "swims"],
          correctAnswer: "swimming",
          hint:
            "like / love / hate + coisa (I like pizza) ou + **verbo com -ing** (I like swimming).",
          explanation: "Isso aí! “I like swimming” = “Eu gosto de nadar.”",
          correction: "Quase! Depois de like, o verbo ganha -ing: **swimming.**",
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
            ["I love", "Eu amo / adoro"],
            ["I like", "Eu gosto"],
            ["I don't like", "Eu não gosto"],
            ["I hate", "Eu odeio"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Do mais para o menos: **love → like → don't like → hate**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **love** = amo · **like** = gosto · **don't like** = não gosto · **hate** = odeio.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She loves ",
          after: " (dance).",
          answer: "dancing",
          hint:
            "Verbo terminado em e: **tire o e** e coloque **-ing** (dance → dancing).",
          explanation: "Isso! “She loves dancing” = “Ela adora dançar.”",
          correction:
            "A palavra certa é **dancing**: tire o “e” de dance e coloque -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He hates waking up early.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm74S4.mp3"),
          options: [
            "He hates waking up early.",
            "He likes waking up early.",
            "He hates walking early.",
          ],
          correctAnswer: "He hates waking up early.",
          hint:
            "Escute **hates** ou **likes**, e **waking up** (acordar) ou **walking** (caminhar).",
          explanation:
            "Ótimo ouvido! “He hates waking up early” = “Ele odeia acordar cedo.”",
          correction:
            "A frase é **He hates waking up early.** Use o botão 0.5× para ouvir “waking up”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós adoramos viajar.",
          answer: ["We", "love", "traveling"],
          bank: ["love", "traveling", "We", "travel", "loves", "like"],
          hint:
            "like / love / hate + coisa (I like pizza) ou + **verbo com -ing** (I like swimming).",
          explanation: "Perfeito! “We love traveling” = “Nós adoramos viajar.”",
          correction:
            "O certo é **We love traveling.** “Adorar” = love, e o verbo vem com -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My brother ",
          after: " playing video games.",
          options: ["likes", "like", "liking"],
          correctAnswer: "likes",
          hint: "My brother = he → **likes**.",
          explanation:
            "Mandou bem! “My brother likes playing video games” = “Meu irmão gosta de jogar videogame.”",
          correction: "Quase! My brother = he → **likes.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I hate ",
          after: " (run).",
          answer: "running",
          hint: "run termina em consoante-vogal-consoante: **dobre o n** → running.",
          explanation: "Isso! “I hate running” = “Eu odeio correr.”",
          correction: "A resposta é **running**: dobre o “n” antes do -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não gosta de cozinhar.",
          answer: ["She", "doesn't", "like", "cooking"],
          bank: ["like", "cooking", "She", "doesn't", "likes", "cook", "don't"],
          hint: "She → **doesn't like + verbo com -ing**.",
          explanation:
            "Muito bem! “She doesn't like cooking” = “Ela não gosta de cozinhar.”",
          correction:
            "O certo é **She doesn't like cooking.** Doesn't + like (sem -s) + cooking.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Do you like reading?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm74S9.mp3"),
          options: [
            "Do you like running?",
            "Does he like reading?",
            "Do you like reading?",
          ],
          correctAnswer: "Do you like reading?",
          hint:
            "Escute **Do you** ou **Does he**, e **reading** (ler) ou **running** (correr).",
          explanation: "Perfeito! “Do you like reading?” = “Você gosta de ler?”",
          correction:
            "A frase é **Do you like reading?** Use o botão 0.5× para ouvir “reading”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They love ",
          after: " movies.",
          options: ["watch", "watching", "watches"],
          correctAnswer: "watching",
          hint:
            "like / love / hate + coisa (I like pizza) ou + **verbo com -ing** (I like swimming).",
          explanation:
            "Mandou bem! “They love watching movies” = “Eles adoram assistir filmes.” Lição completa! 🎉",
          correction: "Quase lá! Depois de love, o verbo ganha -ing: **watching.**",
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
