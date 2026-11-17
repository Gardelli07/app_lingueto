import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 1 (Present simple): Hábitos, fatos,
// verdades gerais e horários fixos. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Water ",
          after: " at 100 degrees Celsius.",
          options: ["is boiling", "boils", "boil"],
          correctAnswer: "boils",
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation:
            "Isso aí! “Water boils at 100 degrees Celsius” = “A água ferve a 100 graus.” É um fato.",
          correction: "Quase! Fato científico → present simple: **Water boils.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The sun ",
          after: " (rise) in the east.",
          answer: "rises",
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation: "Isso! “The sun rises in the east” = “O sol nasce no leste.”",
          correction:
            "A palavra certa é **rises**: é um fato, e the sun = it → rise + s.",
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
            ["I usually walk to work.", "hábito"],
            ["Water freezes at 0°C.", "fato científico"],
            ["The train leaves at 6:15.", "horário fixo"],
            ["She lives in Lisbon.", "situação permanente"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then why it's in the present simple.",
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation: "Mandou bem! Você já conhece os usos do present simple.",
          correction:
            "Esse par não combina. **usually** = hábito · **freezes at 0°C** = fato · **leaves at 6:15** = horário · **lives** = permanente.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He rarely eats breakfast.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm119S4.mp3"),
          options: [
            "He rarely eats breakfast.",
            "He really eats breakfast.",
            "He rarely ate breakfast.",
          ],
          correctAnswer: "He rarely eats breakfast.",
          hint: "Escute **rarely** (raramente) ou **really**, e **eats** ou **ate**.",
          explanation:
            "Ótimo ouvido! “He rarely eats breakfast” = “Ele raramente toma café da manhã.”",
          correction:
            "A frase é **He rarely eats breakfast.** Use o botão 0.5× para ouvir “rarely”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela raramente bebe café à noite.",
          answer: ["She", "rarely", "drinks", "coffee", "at", "night"],
          bank: ["rarely", "drinks", "She", "coffee", "at", "night", "drink", "is"],
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation:
            "Perfeito! “She rarely drinks coffee at night” = “Ela raramente bebe café à noite.”",
          correction:
            "O certo é **She rarely drinks coffee at night.** A frequência vem antes do verbo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "How often ",
          after: " you go to the gym?",
          options: ["do", "are", "does"],
          correctAnswer: "do",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Mandou bem! “How often do you go to the gym?” = “Com que frequência você vai à academia?”",
          correction: "Quase! Pergunta sobre hábito com you → **do.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My grandparents do ",
          after: " use social media.",
          answer: "not",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Isso! “My grandparents do not use social media” = “Meus avós não usam redes sociais.”",
          correction: "A resposta é **not**: do not = don't.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O trem sai às 7h todos os dias.",
          answer: ["The", "train", "leaves", "at", "7", "every", "day"],
          bank: ["train", "The", "leaves", "at", "7", "every", "day", "is", "leaving"],
          hint: "Horário fixo → **present simple**: The train leaves…",
          explanation:
            "Muito bem! “The train leaves at 7 every day” = “O trem sai às 7h todos os dias.”",
          correction:
            "O certo é **The train leaves at 7 every day.** Horário fixo → present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Does she speak German at work?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm119S9.mp3"),
          options: [
            "Is she speaking German at work?",
            "Does she speak German at home?",
            "Does she speak German at work?",
          ],
          correctAnswer: "Does she speak German at work?",
          hint:
            "Escute **Does she speak** (hábito) ou **Is she speaking** (agora), e **work** ou **home**.",
          explanation:
            "Perfeito! “Does she speak German at work?” = “Ela fala alemão no trabalho?”",
          correction:
            "A frase é **Does she speak German at work?** Use o botão 0.5× para ouvir o começo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Most cats ",
          after: " water.",
          options: ["hate", "are hating", "hates"],
          correctAnswer: "hate",
          hint:
            "**Present simple** = rotina, hábito, fato e horário fixo: She works in a bank. Water boils at 100°C.",
          explanation:
            "Mandou bem! “Most cats hate water” = “A maioria dos gatos odeia água.” Lição completa! 🎉",
          correction: "Quase lá! Verdade geral + plural → **hate.**",
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
