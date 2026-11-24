import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 4 (-ing: tirar o e): Verbos com -e: make → making,
// write → writing, dance → dancing. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She is ",
          after: " a cake.",
          options: ["makeing", "making", "maked"],
          correctAnswer: "making",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Isso aí! “She is making a cake” = “Ela está fazendo um bolo.”",
          correction: "Quase! Make perde o “e”: **making.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I am ",
          after: " (write) an email.",
          answer: "writing",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Isso! “I am writing an email” = “Eu estou escrevendo um e-mail.”",
          correction: "A palavra certa é **writing**: tire o “e” de write.",
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
            ["make", "making"],
            ["write", "writing"],
            ["dance", "dancing"],
            ["come", "coming"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its -ing form.",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. make → **making** · write → **writing** · dance → **dancing** · come → **coming**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He is driving to work.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm46S4.mp3"),
          options: [
            "He is driving to work.",
            "He is diving to work.",
            "He drives to work.",
          ],
          correctAnswer: "He is driving to work.",
          hint: "Escute **driving** (dirigindo) com “r”, e **is driving** ou **drives**.",
          explanation:
            "Ótimo ouvido! “He is driving to work” = “Ele está dirigindo para o trabalho.”",
          correction:
            "A frase é **He is driving to work.** Use o botão 0.5× para ouvir o “r” de driving.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós estamos dançando.",
          answer: ["We", "are", "dancing"],
          bank: ["dancing", "are", "We", "danceing", "is"],
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Perfeito! “We are dancing” = “Nós estamos dançando.”",
          correction: "O certo é **We are dancing.** Dance perde o “e”: dancing.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They are ",
          after: " (ride) their bikes.",
          answer: "riding",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation:
            "Isso! “They are riding their bikes” = “Eles estão andando de bicicleta.”",
          correction: "A resposta é **riding**: tire o “e” de ride.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Ana is ",
          after: " a photo.",
          options: ["taking", "takeing", "takking"],
          correctAnswer: "taking",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation:
            "Mandou bem! “Ana is taking a photo” = “A Ana está tirando uma foto.”",
          correction: "Quase! Take perde o “e”: **taking.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele está usando o meu celular.",
          answer: ["He", "is", "using", "my", "phone"],
          bank: ["using", "my", "He", "is", "phone", "useing", "me"],
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation:
            "Muito bem! “He is using my phone” = “Ele está usando o meu celular.”",
          correction: "O certo é **He is using my phone.** Use perde o “e”: using.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Are you ",
          after: " (come) to the party?",
          answer: "coming",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Isso! “Are you coming to the party?” = “Você vem para a festa?”",
          correction: "A resposta é **coming**: tire o “e” de come.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She is smiling at me.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm46S10.mp3"),
          options: [
            "He is smiling at me.",
            "She is smiling at him.",
            "She is smiling at me.",
          ],
          correctAnswer: "She is smiling at me.",
          hint: "Escute **She** ou **He**, e o final: **me** ou **him**.",
          explanation:
            "Perfeito! “She is smiling at me” = “Ela está sorrindo para mim.” Lição completa! 🎉",
          correction:
            "A frase é **She is smiling at me.** Use o botão 0.5× para ouvir o final.",
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
