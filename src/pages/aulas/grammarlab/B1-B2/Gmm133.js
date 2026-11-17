import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 4 (While & during): while + ação em
// andamento · during + substantivo. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " I was studying, my brother was playing video games.",
          options: ["While", "During", "Then"],
          correctAnswer: "While",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Isso aí! “While I was studying…” = “Enquanto eu estudava…”",
          correction:
            "Quase! Antes de sujeito + verbo, use **While.** “During” vem antes de substantivo.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "While she was ",
          after: " (cook), he was setting the table.",
          answer: "cooking",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Isso! “While she was cooking, he was setting the table.”",
          correction:
            "A palavra certa é **cooking**: duas ações em andamento ao mesmo tempo.",
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
            ["while", "enquanto"],
            ["during", "durante"],
            ["when", "quando"],
            ["as soon as", "assim que"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **while** = enquanto · **during** = durante · **when** = quando · **as soon as** = assim que.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "While I was waiting, I read a magazine.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm133S4.mp3"),
          options: [
            "While I was waiting, I read a magazine.",
            "While I was waiting, I read a message.",
            "While I waited, I wrote a message.",
          ],
          correctAnswer: "While I was waiting, I read a magazine.",
          hint:
            "Escute o final: **magazine** (revista) ou **message** (mensagem), e **read** ou **wrote**.",
          explanation:
            "Ótimo ouvido! “While I was waiting, I read a magazine” = “Enquanto esperava, li uma revista.”",
          correction:
            "A frase é **While I was waiting, I read a magazine.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Enquanto eles conversavam, eu estava lavando a louça.",
          answer: [
            "While",
            "they",
            "were",
            "talking,",
            "I",
            "was",
            "washing",
            "the",
            "dishes",
          ],
          bank: [
            "While",
            "they",
            "were",
            "talking,",
            "I",
            "was",
            "washing",
            "the",
            "dishes",
            "talked",
            "washed",
          ],
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Perfeito! “While they were talking, I was washing the dishes.”",
          correction:
            "O certo é **While they were talking, I was washing the dishes.** Duas ações em andamento → past continuous nas duas.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Someone stole my bag ",
          after: " I was having lunch.",
          options: ["during", "while", "for"],
          correctAnswer: "while",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Mandou bem! “Someone stole my bag while I was having lunch.”",
          correction: "Quase! Antes de “I was having”, use **while.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I fell asleep ",
          after: " the film.",
          answer: "during",
          hint: "the film é um substantivo → use **during**.",
          explanation:
            "Isso! “I fell asleep during the film” = “Eu dormi durante o filme.”",
          correction: "A resposta é **during**: during + substantivo.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela quebrou o braço durante o jogo.",
          answer: ["She", "broke", "her", "arm", "during", "the", "match"],
          bank: [
            "She",
            "broke",
            "her",
            "arm",
            "during",
            "the",
            "match",
            "while",
            "breaks",
          ],
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Muito bem! “She broke her arm during the match.”",
          correction:
            "O certo é **She broke her arm during the match.** During + the match (substantivo).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The phone rang while I was having a bath.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm133S9.mp3"),
          options: [
            "The doorbell rang while I was having a bath.",
            "The phone rang while I was having a bath.",
            "The phone rang when I had a bath.",
          ],
          correctAnswer: "The phone rang while I was having a bath.",
          hint:
            "Escute **phone** (telefone) ou **doorbell** (campainha), e **while I was having**.",
          explanation: "Perfeito! “The phone rang while I was having a bath.”",
          correction:
            "A frase é **The phone rang while I was having a bath.** Use o botão 0.5× para ouvir o começo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " the summer, we visited three countries.",
          options: ["While", "During", "When"],
          correctAnswer: "During",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation:
            "Mandou bem! “During the summer, we visited three countries.” Lição completa! 🎉",
          correction: "Quase lá! “The summer” é substantivo → **During.**",
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
