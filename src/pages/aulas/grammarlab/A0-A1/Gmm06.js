import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 3 (Can't): can't / cannot + verbo normal (não sei / não consigo / não posso).
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " swim. I'm afraid of water.",
          options: ["can", "can't", "cans"],
          correctAnswer: "can't",
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Isso aí! “I can't swim” = “Eu não sei nadar.”",
          correction: "Quase! Quem tem medo de água não sabe nadar: **I can't swim.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não sabe dirigir.",
          answer: ["She", "can't", "drive"],
          bank: ["drive", "She", "can't", "don't", "drives", "doesn't"],
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Perfeito! “She can't drive” = “Ela não sabe dirigir.”",
          correction:
            "O certo é **She can't drive.** Com can, a negativa é can't (não doesn't).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I can't come today.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm06S3.mp3"),
          options: ["I can come today.", "I can't come today.", "I can't come tomorrow."],
          correctAnswer: "I can't come today.",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation: "Ótimo ouvido! “I can't come today” = “Eu não posso vir hoje.”",
          correction:
            "A frase é **I can't come today.** Escute o “t” forte de can't com o botão 0.5×.",
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
            ["I can't cook", "Eu não sei cozinhar"],
            ["He can't see", "Ele não consegue ver"],
            ["We can't stay", "Nós não podemos ficar"],
            ["They can't hear", "Eles não conseguem ouvir"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**can't** = não sei / não consigo / não posso. Olhe o verbo.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **cook** = cozinhar · **see** = ver · **stay** = ficar · **hear** = ouvir.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He ",
          after: " speak French.",
          answer: "cannot",
          instruction: "Type the long form of “can't”.",
          hint: "A forma longa de can't é uma palavra só: **cannot**.",
          explanation: "Isso! “He cannot speak French” = “Ele não sabe falar francês.”",
          correction: "A palavra certa é **cannot**: can't = cannot (tudo junto).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My baby brother can't ",
          after: " yet.",
          options: ["walk", "walks", "walking"],
          correctAnswer: "walk",
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation:
            "Mandou bem! “My baby brother can't walk yet” = “Meu irmãozinho ainda não sabe andar.”",
          correction: "Quase! Depois de can't, o verbo fica normal: **walk.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não consigo dormir.",
          answer: ["I", "can't", "sleep"],
          bank: ["sleep", "I", "can't", "don't", "sleeping"],
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Muito bem! “I can't sleep” = “Eu não consigo dormir.”",
          correction: "O certo é **I can't sleep.** “Não consigo” = can't.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Fish can't ",
          after: " (walk).",
          answer: "walk",
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation: "Isso! “Fish can't walk” = “Peixes não conseguem andar.”",
          correction: "A resposta é **walk**: depois de can't, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We can't hear you.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm06S9.mp3"),
          options: ["We can hear you.", "They can't hear you.", "We can't hear you."],
          correctAnswer: "We can't hear you.",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation: "Perfeito! “We can't hear you” = “Nós não conseguimos te ouvir.”",
          correction: "A frase é **We can't hear you.** Escute o “t” de can't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Sorry, I ",
          after: " help you now. I'm busy.",
          options: ["can", "don't can", "can't"],
          correctAnswer: "can't",
          hint: "Negativa: **can't** (= cannot) + verbo normal. Não existe “don't can”.",
          explanation:
            "Mandou bem! “Sorry, I can't help you now” = “Desculpa, não posso te ajudar agora.” Lição completa! 🎉",
          correction: "Quase lá! Não existe “don't can”. O certo é **I can't help you.**",
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
