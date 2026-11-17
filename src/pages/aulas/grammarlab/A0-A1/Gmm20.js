import createLessonScreen from "../../LessonScreen";

// Past simple, aula 6 (Irregular verbs 1): go → went · have → had · do → did
// · see → saw · eat → ate. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " to the beach last weekend.",
          options: ["goed", "went", "go"],
          correctAnswer: "went",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso aí! “I went to the beach last weekend” = “Eu fui à praia no fim de semana passado.”",
          correction: "Quase! Go é irregular: o passado é **went.**",
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
            ["go", "went"],
            ["have", "had"],
            ["see", "saw"],
            ["eat", "ate"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. go → **went** · have → **had** · see → **saw** · eat → **ate**.",
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
          after: " (have) a party yesterday.",
          answer: "had",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Isso! “She had a party yesterday” = “Ela deu uma festa ontem.”",
          correction: "A palavra certa é **had**: have → had.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We saw a great movie.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm20S4.mp3"),
          options: [
            "We see a great movie.",
            "We saw a great movie.",
            "We saw a great show.",
          ],
          correctAnswer: "We saw a great movie.",
          hint: "Escute **saw** (passado) ou **see**, e o final: **movie** ou **show**.",
          explanation:
            "Ótimo ouvido! “We saw a great movie” = “Nós vimos um filme ótimo.”",
          correction:
            "A frase é **We saw a great movie.** Use o botão 0.5× para ouvir “saw”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu comi pizza ontem.",
          answer: ["I", "ate", "pizza", "yesterday"],
          bank: ["ate", "pizza", "I", "yesterday", "eated", "eat"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Perfeito! “I ate pizza yesterday” = “Eu comi pizza ontem.”",
          correction:
            "O certo é **I ate pizza yesterday.** Eat → ate (não existe “eated”).",
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
          after: " his homework last night.",
          options: ["did", "doed", "does"],
          correctAnswer: "did",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “He did his homework last night” = “Ele fez a lição ontem à noite.”",
          correction: "Quase! Do → **did.**",
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
          after: " (go) to Rio last year.",
          answer: "went",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “They went to Rio last year” = “Eles foram ao Rio ano passado.”",
          correction: "A resposta é **went**: go → went.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós tivemos uma aula ótima.",
          answer: ["We", "had", "a", "great", "class"],
          bank: ["had", "a", "We", "great", "class", "haved", "have"],
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Muito bem! “We had a great class” = “Nós tivemos uma aula ótima.”",
          correction: "O certo é **We had a great class.** Have → had.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She went home early.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm20S9.mp3"),
          options: [
            "She goes home early.",
            "She went home late.",
            "She went home early.",
          ],
          correctAnswer: "She went home early.",
          hint:
            "Escute **went** ou **goes**, e o final: **early** (cedo) ou **late** (tarde).",
          explanation: "Perfeito! “She went home early” = “Ela foi para casa cedo.”",
          correction:
            "A frase é **She went home early.** Use o botão 0.5× para ouvir o final.",
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
          after: " my friends at the mall yesterday.",
          options: ["seed", "saw", "see"],
          correctAnswer: "saw",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “I saw my friends at the mall yesterday” = “Eu vi meus amigos no shopping ontem.” Lição completa! 🎉",
          correction: "Quase lá! See → **saw.**",
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
