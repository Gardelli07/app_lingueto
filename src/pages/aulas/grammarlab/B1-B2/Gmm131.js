import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 2 (Negatives & questions): wasn't /
// weren't + -ing · Was…? / Were…? · respostas curtas. Os 5 tipos do Grammar
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
          after: " paying attention, sorry.",
          options: ["wasn't", "weren't", "didn't"],
          correctAnswer: "wasn't",
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation:
            "Isso aí! “I wasn't paying attention, sorry” = “Eu não estava prestando atenção, desculpa.”",
          correction: "Quase! Com I + -ing → **wasn't paying.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles não estavam ouvindo.",
          answer: ["They", "weren't", "listening"],
          bank: ["They", "weren't", "listening", "wasn't", "didn't", "listen"],
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Perfeito! “They weren't listening” = “Eles não estavam ouvindo.”",
          correction: "O certo é **They weren't listening.** They → weren't + -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Were you sleeping when I called?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm131S3.mp3"),
          options: [
            "Did you sleep when I called?",
            "Were you sleeping when I called?",
            "Were you sleeping when I came?",
          ],
          correctAnswer: "Were you sleeping when I called?",
          hint:
            "Escute **Were you sleeping** ou **Did you sleep**, e o final: **called** ou **came**.",
          explanation:
            "Ótimo ouvido! “Were you sleeping when I called?” = “Você estava dormindo quando eu liguei?”",
          correction:
            "A frase é **Were you sleeping when I called?** Use o botão 0.5× para ouvir o começo.",
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
            ["Was it raining?", "Yes, it was."],
            ["Were they working?", "No, they weren't."],
            ["Was she driving?", "No, she wasn't."],
            ["Were you waiting?", "Yes, I was."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta repete o sujeito: **it → it** · **they → they** · **she → she** · **you → I**.",
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
          after: " he wearing a jacket? – Yes, a black one.",
          answer: "Was",
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Isso! “Was he wearing a jacket?” = “Ele estava de jaqueta?”",
          correction: "A palavra certa é **Was**: he → was.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What ",
          after: " you doing at the station?",
          options: ["was", "were", "did"],
          correctAnswer: "were",
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation:
            "Mandou bem! “What were you doing at the station?” = “O que você estava fazendo na estação?”",
          correction: "Quase! Com you + -ing → **were.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We were ",
          after: " expecting so many people.",
          answer: "not",
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation:
            "Isso! “We were not expecting so many people” = “Não esperávamos tanta gente.”",
          correction: "A resposta é **not**: were not = weren't.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela estava chorando? Não, estava rindo.",
          answer: ["No,", "she", "was", "laughing"],
          bank: ["No,", "she", "was", "laughing", "Yes,", "were", "laughed"],
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Muito bem! “No, she was laughing” = “Não, ela estava rindo.”",
          correction: "O certo é **No, she was laughing.** She → was + laughing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She wasn't feeling well.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm131S9.mp3"),
          options: [
            "She wasn't feeling well.",
            "She was feeling well.",
            "She wasn't feeling cold.",
          ],
          correctAnswer: "She wasn't feeling well.",
          hint: "Escute **wasn't** e o final: **well** (bem) ou **cold**.",
          explanation:
            "Perfeito! “She wasn't feeling well” = “Ela não estava se sentindo bem.”",
          correction:
            "A frase é **She wasn't feeling well.** Use o botão 0.5× para ouvir “wasn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Why ",
          after: " the kids shouting?",
          options: ["was", "did", "were"],
          correctAnswer: "were",
          hint: "The kids = they → **were**.",
          explanation:
            "Mandou bem! “Why were the kids shouting?” = “Por que as crianças estavam gritando?” Lição completa! 🎉",
          correction: "Quase lá! The kids = they → **Why were the kids shouting?**",
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
