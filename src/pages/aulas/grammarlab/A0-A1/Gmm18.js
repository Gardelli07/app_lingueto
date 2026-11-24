import createLessonScreen from "../../LessonScreen";

// Past simple, aula 4 (Regular verbs (-ed)): Verbos regulares: verbo + -ed
// (work → worked), igual para todos. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " soccer yesterday.",
          options: ["play", "played", "playing"],
          correctAnswer: "played",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Isso aí! “I played soccer yesterday” = “Eu joguei futebol ontem.”",
          correction: "Quase! “Yesterday” = passado → **played.**",
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
          after: " (watch) a movie last night.",
          answer: "watched",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Isso! “She watched a movie last night” = “Ela assistiu um filme ontem à noite.”",
          correction: "A palavra certa é **watched**: watch + ed.",
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
            ["work", "worked"],
            ["play", "played"],
            ["watch", "watched"],
            ["clean", "cleaned"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. work → **worked** · play → **played** · watch → **watched** · clean → **cleaned**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We visited my grandma.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm18S4.mp3"),
          options: [
            "We visit my grandma.",
            "We visited my grandma.",
            "We visited my grandpa.",
          ],
          correctAnswer: "We visited my grandma.",
          hint:
            "Escute o **-ed** de visited e o final: **grandma** (avó) ou **grandpa** (avô).",
          explanation:
            "Ótimo ouvido! “We visited my grandma” = “Nós visitamos minha avó.”",
          correction:
            "A frase é **We visited my grandma.** Use o botão 0.5× para ouvir “visited”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele trabalhou muito ontem.",
          answer: ["He", "worked", "a", "lot", "yesterday"],
          bank: ["worked", "a", "He", "lot", "yesterday", "works", "work"],
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Perfeito! “He worked a lot yesterday” = “Ele trabalhou muito ontem.”",
          correction: "O certo é **He worked a lot yesterday.** Passado → worked.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " to music all night last Saturday.",
          options: ["listened", "listen", "listens"],
          correctAnswer: "listened",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Mandou bem! “They listened to music all night” = “Eles ouviram música a noite toda.”",
          correction: "Quase! “Last Saturday” = passado → **listened.**",
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
          after: " (call) you this morning.",
          answer: "called",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Isso! “I called you this morning” = “Eu te liguei hoje de manhã.”",
          correction: "A resposta é **called**: call + ed.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós limpamos a casa.",
          answer: ["We", "cleaned", "the", "house"],
          bank: ["cleaned", "the", "We", "house", "clean", "cleans"],
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation: "Muito bem! “We cleaned the house” = “Nós limpamos a casa.”",
          correction: "O certo é **We cleaned the house.** Passado → cleaned.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She opened the door.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm18S9.mp3"),
          options: [
            "She opens the door.",
            "She closed the door.",
            "She opened the door.",
          ],
          correctAnswer: "She opened the door.",
          hint: "Escute **opened** (abriu) ou **closed** (fechou), e se tem **-ed**.",
          explanation: "Perfeito! “She opened the door” = “Ela abriu a porta.”",
          correction:
            "A frase é **She opened the door.** Use o botão 0.5× para ouvir “opened”.",
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
          after: " me with my homework yesterday.",
          options: ["helps", "helped", "help"],
          correctAnswer: "helped",
          hint:
            "Verbos regulares no passado: **verbo + -ed** (work → worked). É igual para todos: I worked, she worked.",
          explanation:
            "Mandou bem! “My dad helped me with my homework yesterday” = “Meu pai me ajudou com a lição ontem.” Lição completa! 🎉",
          correction: "Quase lá! “Yesterday” = passado → **helped.**",
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
