import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 10 (Questions & negatives): do / does /
// don't / doesn't × am / is / are (not) + -ing. Os 5 tipos do Grammar Lab
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
          before: "",
          after: " you usually take the bus?",
          options: ["Do", "Are", "Does"],
          correctAnswer: "Do",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Isso aí! “Do you usually take the bus?” = “Você costuma pegar o ônibus?”",
          correction: "Quase! Hábito → present simple: **Do you…?**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " she working today? – No, it's her day off.",
          answer: "Is",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation: "Isso! “Is she working today?” = “Ela está trabalhando hoje?”",
          correction: "A palavra certa é **Is**: working (-ing) → Is she working?",
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
            ["Do you like it?", "Yes, I do."],
            ["Are you enjoying it?", "Yes, I am."],
            ["Does he know?", "No, he doesn't."],
            ["Is he coming?", "No, he isn't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. Do / Does → **do / doesn't** · Are / Is → **am / isn't**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are you waiting for someone?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm128S4.mp3"),
          options: [
            "Do you wait for someone?",
            "Are you waiting for someone?",
            "Are you waiting for Simon?",
          ],
          correctAnswer: "Are you waiting for someone?",
          hint:
            "Escute **Are you waiting** e o final: **someone** (alguém) ou **Simon**.",
          explanation:
            "Ótimo ouvido! “Are you waiting for someone?” = “Você está esperando alguém?”",
          correction:
            "A frase é **Are you waiting for someone?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não está trabalhando esta semana.",
          answer: ["She", "isn't", "working", "this", "week"],
          bank: ["She", "isn't", "working", "this", "week", "doesn't", "works"],
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Perfeito! “She isn't working this week” = “Ela não está trabalhando esta semana.”",
          correction:
            "O certo é **She isn't working this week.** Com -ing, use isn't (não doesn't).",
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
          after: " eat meat. He's a vegetarian.",
          options: ["isn't", "doesn't", "don't"],
          correctAnswer: "doesn't",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation: "Mandou bem! “He doesn't eat meat” = “Ele não come carne.”",
          correction: "Quase! Hábito → present simple: **He doesn't eat.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What ",
          after: " this word mean?",
          answer: "does",
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Isso! “What does this word mean?” = “O que esta palavra significa?”",
          correction: "A resposta é **does**: this word = it, e mean não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você entende o que eu quero dizer?",
          answer: ["Do", "you", "understand", "what", "I", "mean"],
          bank: ["Do", "you", "understand", "what", "I", "mean", "Are", "understanding"],
          hint:
            "Present simple → **do / does / don't / doesn't** · present continuous → **am / is / are (not) + -ing**.",
          explanation:
            "Muito bem! “Do you understand what I mean?” = “Você entende o que eu quero dizer?”",
          correction:
            "O certo é **Do you understand what I mean?** Understand não usa -ing → Do.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Why isn't he answering his phone?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm128S9.mp3"),
          options: [
            "Why isn't he answering his phone?",
            "Why doesn't he answer his phone?",
            "Why isn't she answering her phone?",
          ],
          correctAnswer: "Why isn't he answering his phone?",
          hint:
            "Escute **isn't … answering** (agora) ou **doesn't answer** (nunca atende), e **he** ou **she**.",
          explanation:
            "Perfeito! “Why isn't he answering his phone?” = “Por que ele não está atendendo o celular?”",
          correction:
            "A frase é **Why isn't he answering his phone?** Use o botão 0.5× para ouvir “isn't”.",
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
          after: " feel like going out tonight.",
          options: ["am not", "don't", "doesn't"],
          correctAnswer: "don't",
          hint: "**feel like** (estar a fim de) usa present simple: I don't feel like…",
          explanation:
            "Mandou bem! “I don't feel like going out tonight” = “Não estou a fim de sair hoje.” Lição completa! 🎉",
          correction: "Quase lá! Com I + verbo normal → **I don't feel like…**",
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
