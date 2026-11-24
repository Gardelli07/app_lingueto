import createLessonScreen from "../../LessonScreen";

// Past simple, aula 7 (Irregular verbs 2): get → got · make → made · come →
// came · buy → bought · take → took · give → gave. Os 5 tipos do Grammar Lab
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
          before: "She ",
          after: " a cake for my birthday.",
          options: ["maked", "made", "make"],
          correctAnswer: "made",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso aí! “She made a cake for my birthday” = “Ela fez um bolo para o meu aniversário.”",
          correction: "Quase! Make → **made.**",
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
            ["get", "got"],
            ["make", "made"],
            ["buy", "bought"],
            ["take", "took"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. get → **got** · make → **made** · buy → **bought** · take → **took**.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I ",
          after: " (buy) new shoes yesterday.",
          answer: "bought",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “I bought new shoes yesterday” = “Eu comprei sapatos novos ontem.”",
          correction: "A palavra certa é **bought**: buy → bought.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He came home late.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm21S4.mp3"),
          options: ["He comes home late.", "He came home late.", "She came home late."],
          correctAnswer: "He came home late.",
          hint: "Escute **came** (passado) ou **comes**, e **He** ou **She**.",
          explanation: "Ótimo ouvido! “He came home late” = “Ele chegou em casa tarde.”",
          correction:
            "A frase é **He came home late.** Use o botão 0.5× para ouvir “came”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela me deu um presente.",
          answer: ["She", "gave", "me", "a", "present"],
          bank: ["gave", "me", "She", "a", "present", "gived", "give"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Perfeito! “She gave me a present” = “Ela me deu um presente.”",
          correction: "O certo é **She gave me a present.** Give → gave.",
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
          after: " a taxi to the airport last night.",
          options: ["took", "taked", "take"],
          correctAnswer: "took",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “We took a taxi to the airport” = “Nós pegamos um táxi para o aeroporto.”",
          correction: "Quase! Take → **took.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My brother ",
          after: " (get) a new job last month.",
          answer: "got",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “My brother got a new job last month” = “Meu irmão conseguiu um emprego novo mês passado.”",
          correction: "A resposta é **got**: get → got.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles vieram para a festa.",
          answer: ["They", "came", "to", "the", "party"],
          bank: ["came", "to", "They", "the", "party", "comed", "come"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Muito bem! “They came to the party” = “Eles vieram para a festa.”",
          correction: "O certo é **They came to the party.** Come → came.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I bought a new phone.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm21S9.mp3"),
          options: [
            "I brought a new phone.",
            "I buy a new phone.",
            "I bought a new phone.",
          ],
          correctAnswer: "I bought a new phone.",
          hint:
            "**bought** (comprei) e **brought** (trouxe) são parecidos. Escute se tem o “r”.",
          explanation: "Perfeito! “I bought a new phone” = “Eu comprei um celular novo.”",
          correction:
            "A frase é **I bought a new phone.** Bought (comprei) não tem “r”; brought (trouxe) tem.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " up at 6 this morning.",
          options: ["gets", "getted", "got"],
          correctAnswer: "got",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “He got up at 6 this morning” = “Ele se levantou às 6 hoje de manhã.” Lição completa! 🎉",
          correction: "Quase lá! Get → **got.**",
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
