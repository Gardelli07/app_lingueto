import createLessonScreen from "../../LessonScreen";

// Past simple, aula 16 (Review 1): Revisão: aulas 1 a 8 (was / were, -ed,
// irregulares). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation`
// e o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " at the cinema last night.",
          options: ["was", "were", "are"],
          correctAnswer: "were",
          hint: "**I, he, she, it → was** · **you, we, they → were**.",
          explanation:
            "Isso aí! “They were at the cinema last night” = “Eles estavam no cinema ontem à noite.”",
          correction: "Quase! They → **were.**",
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
          after: " (study) for three hours yesterday.",
          answer: "studied",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation:
            "Isso! “I studied for three hours yesterday” = “Eu estudei por três horas ontem.”",
          correction: "A palavra certa é **studied**: study → studied.",
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
            ["buy", "bought"],
            ["stop", "stopped"],
            ["write", "wrote"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Alguns são irregulares (**went, bought, wrote**) e um é regular com letra dobrada (**stopped**).",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. go → **went** · buy → **bought** · stop → **stopped** · write → **wrote**.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não estava doente.",
          answer: ["She", "wasn't", "sick"],
          bank: ["wasn't", "sick", "She", "weren't", "didn't"],
          hint: "Negativa: **wasn't** (was not) · **weren't** (were not).",
          explanation: "Perfeito! “She wasn't sick” = “Ela não estava doente.”",
          correction: "O certo é **She wasn't sick.** She → wasn't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We ate at a nice restaurant.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm30S5.mp3"),
          options: [
            "We eat at a nice restaurant.",
            "We ate at a nice restaurant.",
            "We ate at a new restaurant.",
          ],
          correctAnswer: "We ate at a nice restaurant.",
          hint: "Escute **ate** (passado) ou **eat**, e **nice** ou **new**.",
          explanation:
            "Ótimo ouvido! “We ate at a nice restaurant” = “Nós comemos num restaurante legal.”",
          correction:
            "A frase é **We ate at a nice restaurant.** Use o botão 0.5× para ouvir “ate”.",
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
          after: " me a funny story yesterday.",
          options: ["told", "telled", "tells"],
          correctAnswer: "told",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “He told me a funny story yesterday” = “Ele me contou uma história engraçada ontem.”",
          correction: "Quase! Tell → **told.**",
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
          after: " (go) to the doctor yesterday.",
          answer: "went",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Isso! “She went to the doctor yesterday” = “Ela foi ao médico ontem.”",
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
          prompt: "Nós visitamos o museu.",
          answer: ["We", "visited", "the", "museum"],
          bank: ["visited", "the", "We", "museum", "visit", "visitted"],
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation: "Muito bem! “We visited the museum” = “Nós visitamos o museu.”",
          correction: "O certo é **We visited the museum.** Visit + ed (sem dobrar).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The weather was terrible.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm30S9.mp3"),
          options: [
            "The weather is terrible.",
            "The water was terrible.",
            "The weather was terrible.",
          ],
          correctAnswer: "The weather was terrible.",
          hint: "Escute **weather** (tempo) ou **water** (água), e **was** ou **is**.",
          explanation:
            "Perfeito! “The weather was terrible” = “O tempo estava horrível.”",
          correction:
            "A frase é **The weather was terrible.** Use o botão 0.5× para ouvir “weather”.",
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
          after: " a new phone last week.",
          options: ["buyed", "bought", "buys"],
          correctAnswer: "bought",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “I bought a new phone last week” = “Eu comprei um celular novo semana passada.” Revisão 1 completa! 🎉",
          correction: "Quase lá! Buy → **bought.**",
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
