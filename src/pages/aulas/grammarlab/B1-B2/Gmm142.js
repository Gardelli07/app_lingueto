import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 5 (Be / get used to): be used to + -ing
// (estar acostumado) · get used to + -ing (se acostumar). Os 5 tipos do
// Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de um
// slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'm used to ",
          after: " early. I do it every day.",
          options: ["get up", "getting up", "got up"],
          correctAnswer: "getting up",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation:
            "Isso aí! “I'm used to getting up early” = “Estou acostumado a acordar cedo.”",
          correction:
            "Quase! Depois de be used to, o verbo vem com -ing: **getting up.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She isn't used to ",
          after: " (drive) on the left.",
          answer: "driving",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation:
            "Isso! “She isn't used to driving on the left” = “Ela não está acostumada a dirigir pela esquerda.”",
          correction: "A palavra certa é **driving**: be used to + -ing.",
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
            ["I used to live alone.", "Eu morava sozinho (antes)."],
            ["I'm used to living alone.", "Estou acostumado a morar sozinho."],
            ["I'm getting used to it.", "Estou me acostumando."],
            ["I'll get used to it.", "Vou me acostumar."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation: "Mandou bem! Você já separa used to e be / get used to.",
          correction:
            "Esse par não combina. **used to live** = morava · **I'm used to** = estou acostumado · **getting used to** = me acostumando · **get used to** = me acostumar.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm getting used to the cold.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm142S4.mp3"),
          options: [
            "I used to like the cold.",
            "I'm getting used to the cold.",
            "I'm getting used to the noise.",
          ],
          correctAnswer: "I'm getting used to the cold.",
          hint: "Escute **I'm getting used to** e o final: **cold** ou **noise**.",
          explanation:
            "Ótimo ouvido! “I'm getting used to the cold” = “Estou me acostumando com o frio.”",
          correction:
            "A frase é **I'm getting used to the cold.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele está acostumado a trabalhar à noite.",
          answer: ["He", "is", "used", "to", "working", "at", "night"],
          bank: ["He", "is", "used", "to", "working", "at", "night", "work", "uses"],
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation: "Perfeito! “He is used to working at night.”",
          correction:
            "O certo é **He is used to working at night.** Be used to + working.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It took me months to ",
          after: " used to the new job.",
          options: ["be", "get", "use"],
          correctAnswer: "get",
          hint:
            "**get used to** = se acostumar (processo). Levou meses para se acostumar.",
          explanation: "Mandou bem! “It took me months to get used to the new job.”",
          correction: "Quase! Processo de se acostumar → **get used to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Are you used to ",
          after: " (live) in a big city?",
          answer: "living",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation:
            "Isso! “Are you used to living in a big city?” = “Você está acostumado a morar numa cidade grande?”",
          correction: "A resposta é **living**: live perde o “e” + -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você vai se acostumar.",
          answer: ["You'll", "get", "used", "to", "it"],
          bank: ["You'll", "get", "used", "to", "it", "use", "getting"],
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation: "Muito bem! “You'll get used to it” = “Você vai se acostumar.”",
          correction: "O certo é **You'll get used to it.** Se acostumar = get used to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She was used to working long hours.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm142S9.mp3"),
          options: [
            "She used to work long hours.",
            "She was used to walking long hours.",
            "She was used to working long hours.",
          ],
          correctAnswer: "She was used to working long hours.",
          hint:
            "**was used to working** = estava acostumada a trabalhar · **used to work** = trabalhava. Escute também **working** ou **walking**.",
          explanation:
            "Perfeito! “She was used to working long hours” = “Ela estava acostumada a trabalhar muitas horas.”",
          correction:
            "A frase é **She was used to working long hours.** Use o botão 0.5× para ouvir “was used to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "When I moved to Canada, I couldn't ",
          after: " used to the winters.",
          options: ["get", "be", "getting"],
          correctAnswer: "get",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation:
            "Mandou bem! “I couldn't get used to the winters” = “Eu não conseguia me acostumar com os invernos.” Lição completa! 🎉",
          correction: "Quase lá! Depois de couldn't, verbo normal: **get used to.**",
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
