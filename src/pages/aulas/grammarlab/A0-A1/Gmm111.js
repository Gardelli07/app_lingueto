import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 8 (Not going to): I'm not / isn't / aren't going to +
// verbo normal. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation`
// e o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " going to work tomorrow. It's a holiday.",
          options: ["I'm not", "I isn't", "I don't"],
          correctAnswer: "I'm not",
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation:
            "Isso aí! “I'm not going to work tomorrow” = “Não vou trabalhar amanhã.”",
          correction: "Quase! Com “I”: **I'm not going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não vai viajar.",
          answer: ["She", "isn't", "going", "to", "travel"],
          bank: ["going", "to", "She", "isn't", "travel", "aren't", "doesn't"],
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation: "Perfeito! “She isn't going to travel” = “Ela não vai viajar.”",
          correction: "O certo é **She isn't going to travel.** She → isn't going to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We aren't going to stay.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm111S3.mp3"),
          options: [
            "We are going to stay.",
            "We aren't going to stay.",
            "We aren't going to stop.",
          ],
          correctAnswer: "We aren't going to stay.",
          hint: "Escute se tem **aren't**, e **stay** (ficar) ou **stop** (parar).",
          explanation: "Ótimo ouvido! “We aren't going to stay” = “Nós não vamos ficar.”",
          correction:
            "A frase é **We aren't going to stay.** Use o botão 0.5× para ouvir “aren't”.",
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
            ["I'm not going to cry", "Eu não vou chorar"],
            ["He isn't going to come", "Ele não vai vir"],
            ["We aren't going to wait", "Nós não vamos esperar"],
            ["It isn't going to work", "Não vai dar certo"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **cry** = chorar · **come** = vir · **wait** = esperar · **work** = dar certo.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He is ",
          after: " going to buy a new phone.",
          answer: "not",
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation:
            "Isso! “He is not going to buy a new phone” = “Ele não vai comprar um celular novo.”",
          correction: "A palavra certa é **not**: is not = isn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " going to watch the game.",
          options: ["don't", "isn't", "aren't"],
          correctAnswer: "aren't",
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation:
            "Mandou bem! “They aren't going to watch the game” = “Eles não vão assistir o jogo.”",
          correction: "Quase! Com “they”: **They aren't going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não vou desistir!",
          answer: ["I'm", "not", "going", "to", "give", "up"],
          bank: ["going", "to", "I'm", "not", "give", "up", "don't"],
          hint: "“Desistir” = **give up**. Negativa: I'm not going to…",
          explanation: "Muito bem! “I'm not going to give up!” = “Eu não vou desistir!”",
          correction: "O certo é **I'm not going to give up!** Desistir = give up.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We aren't going to ",
          after: " (sell) the car.",
          answer: "sell",
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation:
            "Isso! “We aren't going to sell the car” = “Nós não vamos vender o carro.”",
          correction: "A resposta é **sell**: depois de going to, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She isn't going to like it.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm111S9.mp3"),
          options: [
            "She's going to like it.",
            "He isn't going to like it.",
            "She isn't going to like it.",
          ],
          correctAnswer: "She isn't going to like it.",
          hint: "Escute **isn't** ou **'s**, e **She** ou **He**.",
          explanation: "Perfeito! “She isn't going to like it” = “Ela não vai gostar.”",
          correction:
            "A frase é **She isn't going to like it.** Use o botão 0.5× para ouvir “isn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad ",
          after: " going to retire this year.",
          options: ["aren't", "isn't", "don't"],
          correctAnswer: "isn't",
          hint: "My dad = he → **isn't**.",
          explanation:
            "Mandou bem! “My dad isn't going to retire this year” = “Meu pai não vai se aposentar este ano.” Lição completa! 🎉",
          correction: "Quase lá! My dad = he → **isn't going to.**",
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
