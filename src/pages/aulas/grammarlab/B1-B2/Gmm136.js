import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 7 (Irregular verbs (B1)): caught ·
// fell · stole · drove · broke · forgot · chose · understood · rang. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["catch", "caught"],
            ["fall", "fell"],
            ["steal", "stole"],
            ["drive", "drove"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove**.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The police ",
          after: " the thief yesterday.",
          options: ["catched", "caught", "catch"],
          correctAnswer: "caught",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Isso aí! “The police caught the thief yesterday” = “A polícia pegou o ladrão ontem.”",
          correction: "Quase! Catch é irregular → **caught.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Someone ",
          after: " (steal) my bike last night.",
          answer: "stole",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Isso! “Someone stole my bike last night” = “Alguém roubou minha bicicleta ontem à noite.”",
          correction: "A palavra certa é **stole**: steal → stole.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He fell off his bike.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm136S4.mp3"),
          options: [
            "He fell off his bike.",
            "He fell off his horse.",
            "She fell off her bike.",
          ],
          correctAnswer: "He fell off his bike.",
          hint: "Escute **He** ou **She**, e o final: **bike** ou **horse**.",
          explanation: "Ótimo ouvido! “He fell off his bike” = “Ele caiu da bicicleta.”",
          correction:
            "A frase é **He fell off his bike.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu quebrei meu celular ontem.",
          answer: ["I", "broke", "my", "phone", "yesterday"],
          bank: ["I", "broke", "my", "phone", "yesterday", "breaked", "break"],
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Perfeito! “I broke my phone yesterday” = “Eu quebrei meu celular ontem.”",
          correction: "O certo é **I broke my phone yesterday.** Break → broke.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " for six hours to get to the coast.",
          options: ["drove", "drived", "driven"],
          correctAnswer: "drove",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Mandou bem! “We drove for six hours” = “Dirigimos por seis horas.”",
          correction: "Quase! Drive → **drove** (driven é o particípio).",
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
          after: " (forget) her passport at home.",
          answer: "forgot",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Isso! “She forgot her passport at home” = “Ela esqueceu o passaporte em casa.”",
          correction: "A resposta é **forgot**: forget → forgot.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles escolheram o hotel mais barato.",
          answer: ["They", "chose", "the", "cheapest", "hotel"],
          bank: ["They", "chose", "the", "cheapest", "hotel", "choosed", "choose"],
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation: "Muito bem! “They chose the cheapest hotel.”",
          correction: "O certo é **They chose the cheapest hotel.** Choose → chose.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I understood every word.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm136S9.mp3"),
          options: [
            "I understand every word.",
            "I understood every word.",
            "I understood every world.",
          ],
          correctAnswer: "I understood every word.",
          hint:
            "Escute **understood** (passado) ou **understand**, e **word** ou **world**.",
          explanation:
            "Perfeito! “I understood every word” = “Eu entendi todas as palavras.”",
          correction:
            "A frase é **I understood every word.** Use o botão 0.5× para ouvir “understood”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The bell ",
          after: " at exactly nine o'clock.",
          options: ["ringed", "rang", "rung"],
          correctAnswer: "rang",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Mandou bem! “The bell rang at exactly nine o'clock.” Lição completa! 🎉",
          correction: "Quase lá! Ring → **rang** (rung é o particípio).",
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
