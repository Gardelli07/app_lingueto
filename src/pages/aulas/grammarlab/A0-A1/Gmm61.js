import createLessonScreen from "../../LessonScreen";

// Present simple, aula 3 (-es endings): Com he / she / it: go → goes, do →
// does, watch → watches, fix → fixes. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " TV every night.",
          options: ["watchs", "watches", "watch"],
          correctAnswer: "watches",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Isso aí! “He watches TV every night” = “Ele assiste TV toda noite.”",
          correction: "Quase! Watch termina em “ch”, então ganha -es: **watches.**",
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
          after: " (go) to school by bus.",
          answer: "goes",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Isso! “She goes to school by bus” = “Ela vai para a escola de ônibus.”",
          correction: "A palavra certa é **goes**: go termina em “o”, então ganha -es.",
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
            ["go", "goes"],
            ["do", "does"],
            ["watch", "watches"],
            ["fix", "fixes"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its he / she / it form.",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. go → **goes** · do → **does** · watch → **watches** · fix → **fixes**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She goes to the gym.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm61S4.mp3"),
          options: [
            "She goes to the gym.",
            "She goes to the beach.",
            "We go to the gym.",
          ],
          correctAnswer: "She goes to the gym.",
          hint:
            "Escute **goes** ou **go**, e o lugar: **gym** (academia) ou **beach** (praia).",
          explanation: "Ótimo ouvido! “She goes to the gym” = “Ela vai à academia.”",
          correction:
            "A frase é **She goes to the gym.** Use o botão 0.5× para ouvir “gym”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele lava o carro aos sábados.",
          answer: ["He", "washes", "the", "car", "on", "Saturdays"],
          bank: ["washes", "the", "He", "car", "on", "Saturdays", "wash", "washs"],
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Perfeito! “He washes the car on Saturdays” = “Ele lava o carro aos sábados.”",
          correction:
            "O certo é **He washes the car on Saturdays.** Wash termina em “sh” → washes.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My mom ",
          after: " (do) the dishes.",
          answer: "does",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation: "Isso! “My mom does the dishes” = “Minha mãe lava a louça.”",
          correction: "A resposta é **does**: do + es.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The teacher ",
          after: " the class at 8.",
          options: ["finishes", "finish", "finishs"],
          correctAnswer: "finishes",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Mandou bem! “The teacher finishes the class at 8” = “O professor termina a aula às 8.”",
          correction: "Quase! Finish termina em “sh” → **finishes.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela beija os filhos.",
          answer: ["She", "kisses", "her", "kids"],
          bank: ["kisses", "her", "She", "kids", "kiss", "kisss"],
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation: "Muito bem! “She kisses her kids” = “Ela beija os filhos.”",
          correction: "O certo é **She kisses her kids.** Kiss termina em “ss” → kisses.",
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
          after: " (fix) computers.",
          answer: "fixes",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation: "Isso! “He fixes computers” = “Ele conserta computadores.”",
          correction: "A resposta é **fixes**: fix termina em “x” → fixes.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He brushes his teeth.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm61S10.mp3"),
          options: [
            "He washes his teeth.",
            "He brushes her teeth.",
            "He brushes his teeth.",
          ],
          correctAnswer: "He brushes his teeth.",
          hint: "Escute **brushes** (escova) ou **washes** (lava), e **his** ou **her**.",
          explanation:
            "Perfeito! “He brushes his teeth” = “Ele escova os dentes.” Lição completa! 🎉",
          correction:
            "A frase é **He brushes his teeth.** Use o botão 0.5× para ouvir “brushes”.",
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
