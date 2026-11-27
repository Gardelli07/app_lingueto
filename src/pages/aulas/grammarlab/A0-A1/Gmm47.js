import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 5 (-ing: dobrar a letra): run → running · swim →
// swimming · sit → sitting · lie → lying. Os 5 tipos do Grammar Lab
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
          before: "He is ",
          after: " in the park.",
          options: ["runing", "running", "runnning"],
          correctAnswer: "running",
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Isso aí! “He is running in the park” = “Ele está correndo no parque.”",
          correction: "Quase! Run dobra o “n”: **running.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The kids are ",
          after: " (swim) in the pool.",
          answer: "swimming",
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Isso! “The kids are swimming in the pool” = “As crianças estão nadando na piscina.”",
          correction: "A palavra certa é **swimming**: swim dobra o “m”.",
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
            ["run", "running"],
            ["sit", "sitting"],
            ["stop", "stopping"],
            ["lie", "lying"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its -ing form.",
          hint:
            "**Dobre a última letra** em run, sit, stop. E **-ie** vira **-ying**: lie → lying.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. run → **running** · sit → **sitting** · stop → **stopping** · lie → **lying**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She is sitting next to me.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm47S4.mp3"),
          options: [
            "She is sitting next to me.",
            "She is sitting next to him.",
            "He is sitting next to me.",
          ],
          correctAnswer: "She is sitting next to me.",
          hint: "Escute **She** ou **He**, e o final: **me** ou **him**.",
          explanation:
            "Ótimo ouvido! “She is sitting next to me” = “Ela está sentada ao meu lado.”",
          correction:
            "A frase é **She is sitting next to me.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estou cortando o pão.",
          answer: ["I", "am", "cutting", "the", "bread"],
          bank: ["cutting", "the", "I", "am", "bread", "cuting", "is"],
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation: "Perfeito! “I am cutting the bread” = “Eu estou cortando o pão.”",
          correction: "O certo é **I am cutting the bread.** Cut dobra o “t”: cutting.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Why are you ",
          after: " (lie) to me?",
          answer: "lying",
          hint: "**-ie** vira **-ying**: lie → lying.",
          explanation:
            "Isso! “Why are you lying to me?” = “Por que você está mentindo para mim?”",
          correction: "A resposta é **lying**: o “ie” vira “y” + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The bus is ",
          after: " here.",
          options: ["stopping", "stoping", "stopps"],
          correctAnswer: "stopping",
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Mandou bem! “The bus is stopping here” = “O ônibus está parando aqui.”",
          correction: "Quase! Stop dobra o “p”: **stopping.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela está planejando uma viagem.",
          answer: ["She", "is", "planning", "a", "trip"],
          bank: ["planning", "a", "She", "is", "trip", "planing", "are"],
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Muito bem! “She is planning a trip” = “Ela está planejando uma viagem.”",
          correction: "O certo é **She is planning a trip.** Plan dobra o “n”: planning.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We are ",
          after: " (shop) at the mall.",
          answer: "shopping",
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Isso! “We are shopping at the mall” = “Nós estamos fazendo compras no shopping.”",
          correction: "A resposta é **shopping**: shop dobra o “p”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They are getting ready.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm47S10.mp3"),
          options: [
            "We are getting ready.",
            "They are getting ready.",
            "They are getting late.",
          ],
          correctAnswer: "They are getting ready.",
          hint:
            "Escute **They** ou **We**, e o final: **ready** (pronto) ou **late** (tarde).",
          explanation:
            "Perfeito! “They are getting ready” = “Eles estão se arrumando.” Lição completa! 🎉",
          correction: "A frase é **They are getting ready.** Get dobra o “t”: getting.",
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
