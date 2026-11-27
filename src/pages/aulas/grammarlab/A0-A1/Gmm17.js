import createLessonScreen from "../../LessonScreen";

// Past simple, aula 3 (Was / Were questions): Was he…? / Were you…? · Yes, I
// was. / No, they weren't. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you at home last night?",
          options: ["Was", "Were", "Did"],
          correctAnswer: "Were",
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation:
            "Isso aí! “Were you at home last night?” = “Você estava em casa ontem à noite?”",
          correction: "Quase! Com “you”: **Were you…?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela estava cansada?",
          answer: ["Was", "she", "tired"],
          bank: ["tired", "she", "Was", "Were", "She", "was"],
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Perfeito! “Was she tired?” = “Ela estava cansada?”",
          correction: "O certo é **Was she tired?** Na pergunta, “was” vem primeiro.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Were they happy?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm17S3.mp3"),
          options: ["They were happy.", "Were they happy?", "Was he happy?"],
          correctAnswer: "Were they happy?",
          hint: "Escute o começo: **Were they** (pergunta) ou **They were** (afirmação)?",
          explanation: "Ótimo ouvido! “Were they happy?” = “Eles estavam felizes?”",
          correction:
            "A frase é **Were they happy?** Ela começa com “Were”, por isso é pergunta.",
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
            ["Was he late?", "Yes, he was."],
            ["Were you OK?", "Yes, I was."],
            ["Was it cold?", "No, it wasn't."],
            ["Were they there?", "No, they weren't."],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question, then its answer.",
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. A resposta repete o sujeito: **he → he** · **you → I** · **it → it** · **they → they**.",
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
          after: " the party good? – Yes, it was.",
          answer: "Was",
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Isso! “Was the party good?” = “A festa foi boa?”",
          correction: "A palavra certa é **Was**: the party = it.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Were you at school? – No, I ",
          after: ".",
          options: ["wasn't", "weren't", "didn't"],
          correctAnswer: "wasn't",
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Mandou bem! “No, I wasn't” = “Não, não estava.”",
          correction: "Quase! Na resposta, I → **wasn't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde você estava?",
          answer: ["Where", "were", "you"],
          bank: ["were", "you", "Where", "was", "What", "did"],
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Muito bem! “Where were you?” = “Onde você estava?”",
          correction: "O certo é **Where were you?** Where + were + you.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Was your mom at home? – Yes, she ",
          after: ".",
          answer: "was",
          hint:
            "Pergunta: **Was he…?** / **Were you…?** · Resposta: **Yes, I was.** / **No, they weren't.**",
          explanation: "Isso! “Yes, she was” = “Sim, estava.”",
          correction: "A resposta é **was**: Yes, she was.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Where was he yesterday?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm17S9.mp3"),
          options: [
            "Where were you yesterday?",
            "Where was he today?",
            "Where was he yesterday?",
          ],
          correctAnswer: "Where was he yesterday?",
          hint: "Escute **was he** ou **were you**, e **yesterday** ou **today**.",
          explanation: "Perfeito! “Where was he yesterday?” = “Onde ele estava ontem?”",
          correction:
            "A frase é **Where was he yesterday?** Use o botão 0.5× para ouvir o final.",
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
          after: " the kids at the park?",
          options: ["Was", "Did", "Were"],
          correctAnswer: "Were",
          hint: "The kids = they → **Were**.",
          explanation:
            "Mandou bem! “Were the kids at the park?” = “As crianças estavam no parque?” Lição completa! 🎉",
          correction: "Quase lá! The kids = they → **Were.**",
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
