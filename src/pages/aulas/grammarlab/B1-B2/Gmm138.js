import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 1 (Used to): used to + verbo: hábitos e
// estados no passado que não existem mais. Os 5 tipos do Grammar Lab
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
          before: "When I was a child, I ",
          after: " climb trees.",
          options: ["used to", "use to", "was used to"],
          correctAnswer: "used to",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Isso aí! “I used to climb trees” = “Eu subia em árvores (quando criança).”",
          correction: "Quase! Na afirmativa é **used to** (com -d).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We used ",
          after: " live in a small village.",
          answer: "to",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Isso! “We used to live in a small village” = “Nós morávamos numa vila pequena.”",
          correction: "A palavra certa é **to**: used to + verbo.",
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
            ["I used to play football.", "Eu jogava futebol."],
            ["She used to have long hair.", "Ela tinha cabelo comprido."],
            ["They used to live here.", "Eles moravam aqui."],
            ["We used to be friends.", "Nós éramos amigos."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**used to** = o imperfeito do português: jogava, tinha, morava, éramos.",
          explanation: "Mandou bem! Used to = “eu fazia / eu era” (antigamente).",
          correction:
            "Esse par não combina. **play** = jogava · **have** = tinha · **live** = moravam · **be** = éramos.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I used to hate vegetables.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm138S4.mp3"),
          options: [
            "I used to hate vegetables.",
            "I used to eat vegetables.",
            "I used to hate vacations.",
          ],
          correctAnswer: "I used to hate vegetables.",
          hint:
            "Escute o verbo (**hate** ou **eat**) e o final (**vegetables** ou **vacations**).",
          explanation: "Ótimo ouvido! “I used to hate vegetables” = “Eu odiava legumes.”",
          correction:
            "A frase é **I used to hate vegetables.** Use o botão 0.5× para ouvir “hate”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu avô fumava muito.",
          answer: ["My", "grandfather", "used", "to", "smoke", "a", "lot"],
          bank: ["My", "grandfather", "used", "to", "smoke", "a", "lot", "use", "smokes"],
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation: "Perfeito! “My grandfather used to smoke a lot.”",
          correction:
            "O certo é **My grandfather used to smoke a lot.** Used to + smoke (normal).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " to be a cinema on this street.",
          options: ["use", "used", "was"],
          correctAnswer: "used",
          hint: "**There used to be** = antigamente havia.",
          explanation:
            "Mandou bem! “There used to be a cinema on this street” = “Antigamente havia um cinema nesta rua.”",
          correction: "Quase! **There used to be** = antigamente havia.",
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
          after: " to work in a bank, but now she's a teacher.",
          answer: "used",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation: "Isso! “She used to work in a bank” = “Ela trabalhava num banco.”",
          correction: "A resposta é **used**: era verdade antes, agora não é mais.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós íamos à praia todo verão.",
          answer: ["We", "used", "to", "go", "to", "the", "beach", "every", "summer"],
          bank: [
            "We",
            "used",
            "to",
            "go",
            "to",
            "the",
            "beach",
            "every",
            "summer",
            "going",
            "use",
          ],
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation: "Muito bem! “We used to go to the beach every summer.”",
          correction:
            "O certo é **We used to go to the beach every summer.** Used to + go.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He used to be really shy.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm138S9.mp3"),
          options: [
            "He used to be really tired.",
            "He used to be really shy.",
            "She used to be really shy.",
          ],
          correctAnswer: "He used to be really shy.",
          hint: "Escute **He** ou **She**, e o final: **shy** (tímido) ou **tired**.",
          explanation: "Perfeito! “He used to be really shy” = “Ele era muito tímido.”",
          correction:
            "A frase é **He used to be really shy.** Use o botão 0.5× para ouvir o final.",
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
          after: " to have a motorbike when he was young.",
          options: ["used", "uses", "was used"],
          correctAnswer: "used",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Mandou bem! “My dad used to have a motorbike” = “Meu pai tinha uma moto.” Lição completa! 🎉",
          correction: "Quase lá! Algo do passado → **My dad used to have.**",
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
