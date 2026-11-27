import createLessonScreen from "../../LessonScreen";

// Present simple, aula 17 (Be or Do?): am / is / are (adjetivo, lugar, idade)
// × do / does (ações). Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you tired?",
          options: ["Do", "Are", "Does"],
          correctAnswer: "Are",
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Isso aí! “Are you tired?” = “Você está cansado?”",
          correction: "Quase! “Tired” é um adjetivo, então usamos be: **Are you tired?**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " you like chocolate?",
          answer: "Do",
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Isso! “Do you like chocolate?” = “Você gosta de chocolate?”",
          correction: "A palavra certa é **Do**: “like” é uma ação (verbo).",
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
            ["I am happy", "Eu estou feliz"],
            ["I work", "Eu trabalho"],
            ["I'm not hungry", "Eu não estou com fome"],
            ["I don't work", "Eu não trabalho"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Mandou bem! Você já separa be e do.",
          correction:
            "Esse par não combina. **am / 'm not** = estou / não estou · **work / don't work** = trabalho / não trabalho.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is she a doctor?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm75S4.mp3"),
          options: ["Is she a doctor?", "Is he a doctor?", "Is she a teacher?"],
          correctAnswer: "Is she a doctor?",
          hint: "Escute **she** ou **he**, e a profissão: **doctor** ou **teacher**.",
          explanation: "Ótimo ouvido! “Is she a doctor?” = “Ela é médica?”",
          correction: "A frase é **Is she a doctor?** Profissão usa be (is).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não está em casa.",
          answer: ["He", "isn't", "at", "home"],
          bank: ["isn't", "home", "He", "at", "doesn't", "don't"],
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Perfeito! “He isn't at home” = “Ele não está em casa.”",
          correction: "O certo é **He isn't at home.** Lugar usa be: isn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " like fish.",
          options: ["doesn't", "isn't", "don't"],
          correctAnswer: "doesn't",
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Mandou bem! “She doesn't like fish” = “Ela não gosta de peixe.”",
          correction: "Quase! “Like” é ação e she → **doesn't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você trabalha aqui?",
          answer: ["Do", "you", "work", "here"],
          bank: ["work", "here", "you", "Do", "Are", "are"],
          hint:
            "Adjetivo, lugar, idade, profissão → **be** (am / is / are). Ação (trabalhar, morar, gostar) → **do / does**.",
          explanation: "Muito bem! “Do you work here?” = “Você trabalha aqui?”",
          correction: "O certo é **Do you work here?** “Work” é ação → Do.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " your brother 20 years old?",
          answer: "Is",
          hint: "Idade usa **be**. Your brother = he.",
          explanation: "Isso! “Is your brother 20 years old?” = “Seu irmão tem 20 anos?”",
          correction: "A resposta é **Is**: idade usa be, e your brother = he.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Does he live in Rio?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm75S9.mp3"),
          options: ["Is he in Rio?", "Does he live in Rio?", "Does he leave Rio?"],
          correctAnswer: "Does he live in Rio?",
          hint:
            "Escute **Does he live** (morar) ou **Is he** (estar), e **live** ou **leave**.",
          explanation: "Perfeito! “Does he live in Rio?” = “Ele mora no Rio?”",
          correction:
            "A frase é **Does he live in Rio?** Use o botão 0.5× para ouvir “live in”.",
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
          after: " from Brazil.",
          options: ["do", "does", "am"],
          correctAnswer: "am",
          hint: "**be from** = ser de (origem). I → **am**.",
          explanation:
            "Mandou bem! “I am from Brazil” = “Eu sou do Brasil.” Lição completa! 🎉",
          correction: "Quase lá! Origem usa be: **I am from Brazil.**",
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
