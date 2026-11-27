import createLessonScreen from "../../LessonScreen";

// Present simple, aula 1 (I / You / We / They): Verbo normal com I, you, we,
// they (I work, they live). Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " in São Paulo.",
          options: ["live", "lives", "living"],
          correctAnswer: "live",
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation: "Isso aí! “I live in São Paulo” = “Eu moro em São Paulo.”",
          correction: "Quase! Com “I”, o verbo fica normal: **I live.**",
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
            ["I work", "Eu trabalho"],
            ["You study", "Você estuda"],
            ["We play", "Nós jogamos"],
            ["They eat", "Eles comem"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Olhe o verbo: **work** = trabalhar, **study** = estudar, **play** = jogar, **eat** = comer.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **work** = trabalho · **study** = estuda · **play** = jogamos · **eat** = comem.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We speak English.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm59S3.mp3"),
          options: ["They speak English.", "We speak English.", "We speak Spanish."],
          correctAnswer: "We speak English.",
          hint:
            "Escute o começo (**We** ou **They**) e o idioma (**English** ou **Spanish**).",
          explanation: "Ótimo ouvido! “We speak English” = “Nós falamos inglês.”",
          correction: "A frase é **We speak English.** Use o botão 0.5× para ouvir “We”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They ",
          after: " (drink) coffee every day.",
          answer: "drink",
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation:
            "Isso! “They drink coffee every day” = “Eles bebem café todo dia.”",
          correction: "A palavra certa é **drink**: com “they”, o verbo não muda.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu trabalho num banco.",
          answer: ["I", "work", "in", "a", "bank"],
          bank: ["work", "a", "I", "in", "works", "bank"],
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation: "Perfeito! “I work in a bank” = “Eu trabalho num banco.”",
          correction: "O certo é **I work in a bank.** Com “I”, use “work”, sem -s.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You ",
          after: " very well!",
          options: ["cooks", "cooking", "cook"],
          correctAnswer: "cook",
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation: "Mandou bem! “You cook very well!” = “Você cozinha muito bem!”",
          correction: "Quase! Com “you”, o verbo fica normal: **You cook.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós moramos no Brasil.",
          answer: ["We", "live", "in", "Brazil"],
          bank: ["live", "Brazil", "We", "in", "lives", "They"],
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation: "Muito bem! “We live in Brazil” = “Nós moramos no Brasil.”",
          correction:
            "O certo é **We live in Brazil.** “Nós” = we, e o verbo fica normal.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " (watch) TV at night.",
          answer: "watch",
          hint: "My parents = they. Com they, o **verbo fica normal**.",
          explanation:
            "Isso! “My parents watch TV at night” = “Meus pais assistem TV à noite.”",
          correction: "A resposta é **watch**: my parents = they, então sem -es.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They play soccer on Sundays.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm59S9.mp3"),
          options: [
            "They play soccer on Sundays.",
            "They play soccer on Saturdays.",
            "We play soccer on Sundays.",
          ],
          correctAnswer: "They play soccer on Sundays.",
          hint:
            "Escute o começo (**They** ou **We**) e o dia (**Sundays** ou **Saturdays**).",
          explanation:
            "Perfeito! “They play soccer on Sundays” = “Eles jogam futebol aos domingos.”",
          correction:
            "A frase é **They play soccer on Sundays.** Use o botão 0.5× para ouvir o dia.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My friends and I ",
          after: " to school by bus.",
          options: ["goes", "go", "going"],
          correctAnswer: "go",
          hint: "My friends and I = nós (**we**). Verbo normal.",
          explanation:
            "Mandou bem! “My friends and I go to school by bus” = “Meus amigos e eu vamos de ônibus para a escola.” Lição completa! 🎉",
          correction:
            "Quase lá! “My friends and I” = we, então o verbo fica normal: **go.**",
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
