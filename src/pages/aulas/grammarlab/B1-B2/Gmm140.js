import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 3 (Used to or past simple?): Hábito / estado
// repetido (used to) × aconteceu uma vez (past simple). Os 5 tipos do Grammar
// Lab alternados, uma pergunta por slide. O combo e o XP seguem de um slide
// para o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o
// painel de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " to Japan in 2019.",
          options: ["used to go", "went", "use to go"],
          correctAnswer: "went",
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation: "Isso aí! “I went to Japan in 2019” = “Fui ao Japão em 2019.”",
          correction: "Quase! Aconteceu uma vez, com data → past simple: **went.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "When I was young, I used to ",
          after: " (walk) to school every day.",
          answer: "walk",
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation:
            "Isso! “I used to walk to school every day” = “Eu ia a pé para a escola todo dia.”",
          correction: "A palavra certa é **walk**: used to + verbo normal.",
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
            ["I used to swim every day.", "hábito no passado"],
            ["I swam in the lake last Sunday.", "aconteceu uma vez"],
            ["She used to be blonde.", "estado no passado (não é mais)"],
            ["She dyed her hair yesterday.", "ação única"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then what it shows.",
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation: "Mandou bem! Você já separa used to e past simple.",
          correction:
            "Esse par não combina. **used to** = hábito ou estado · **last Sunday / yesterday** = uma vez só.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We used to spend every summer by the sea.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm140S4.mp3"),
          options: [
            "We spent last summer by the sea.",
            "We used to spend every summer by the sea.",
            "We used to spend every winter by the sea.",
          ],
          correctAnswer: "We used to spend every summer by the sea.",
          hint:
            "Escute **used to spend every summer** (hábito) ou **spent last summer** (uma vez).",
          explanation: "Ótimo ouvido! “We used to spend every summer by the sea.”",
          correction:
            "A frase é **We used to spend every summer by the sea.** Use o botão 0.5× para ouvir “every summer”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele quebrou a perna uma vez, em 2015.",
          answer: ["He", "broke", "his", "leg", "once,", "in", "2015"],
          bank: [
            "He",
            "broke",
            "his",
            "leg",
            "once,",
            "in",
            "2015",
            "used",
            "to",
            "break",
          ],
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation: "Perfeito! “He broke his leg once, in 2015.”",
          correction:
            "O certo é **He broke his leg once, in 2015.** Uma vez → past simple.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My grandmother ",
          after: " me stories every night when I was little.",
          options: ["use to tell", "used to tell", "uses to tell"],
          correctAnswer: "used to tell",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Mandou bem! “My grandmother used to tell me stories every night.”",
          correction: "Quase! Na afirmativa: **used to tell.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Yesterday I ",
          after: " (meet) an old friend.",
          answer: "met",
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation:
            "Isso! “Yesterday I met an old friend” = “Ontem encontrei um velho amigo.”",
          correction: "A resposta é **met**: yesterday = uma vez → past simple.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Antigamente eu tinha cabelo comprido.",
          answer: ["I", "used", "to", "have", "long", "hair"],
          bank: ["I", "used", "to", "have", "long", "hair", "having", "use"],
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation: "Muito bem! “I used to have long hair.”",
          correction:
            "O certo é **I used to have long hair.** Estado no passado → used to have.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She moved to London last year.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm140S9.mp3"),
          options: [
            "She moved to London last year.",
            "She used to live in London.",
            "She moved to London last month.",
          ],
          correctAnswer: "She moved to London last year.",
          hint:
            "Escute **moved … last year** (uma vez) ou **used to live**, e **year** ou **month**.",
          explanation:
            "Perfeito! “She moved to London last year” = “Ela se mudou para Londres ano passado.”",
          correction:
            "A frase é **She moved to London last year.** Use o botão 0.5× para ouvir o final.",
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
          after: " a big tree in our garden, but they cut it down.",
          options: ["used to be", "use to be", "used to being"],
          correctAnswer: "used to be",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Mandou bem! “There used to be a big tree in our garden.” Lição completa! 🎉",
          correction: "Quase lá! Antigamente havia → **There used to be.**",
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
