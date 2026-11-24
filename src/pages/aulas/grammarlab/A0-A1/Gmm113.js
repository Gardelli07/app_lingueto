import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 10 (Wh-questions): What are you going to…? · Where is
// she going to…? · When will…?. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What ",
          after: " you going to do this weekend?",
          options: ["is", "are", "do"],
          correctAnswer: "are",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Isso aí! “What are you going to do this weekend?” = “O que você vai fazer neste fim de semana?”",
          correction: "Quase! Com “you”: **What are you going to do?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde você vai morar?",
          answer: ["Where", "are", "you", "going", "to", "live"],
          bank: ["going", "to", "Where", "are", "you", "live", "is", "will"],
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Perfeito! “Where are you going to live?” = “Onde você vai morar?”",
          correction:
            "O certo é **Where are you going to live?** Where + are + you + going to + live.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "When will you be back?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm113S3.mp3"),
          options: [
            "When will you be back?",
            "Where will you be back?",
            "When were you back?",
          ],
          correctAnswer: "When will you be back?",
          hint: "Escute **When** (quando) ou **Where** (onde), e **will** ou **were**.",
          explanation: "Ótimo ouvido! “When will you be back?” = “Quando você volta?”",
          correction:
            "A frase é **When will you be back?** Use o botão 0.5× para ouvir “When will”.",
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
            ["What are you going to eat?", "O que você vai comer?"],
            ["Where is she going to stay?", "Onde ela vai ficar?"],
            ["When will you come?", "Quando você vai vir?"],
            ["Who is going to help?", "Quem vai ajudar?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**What** = o que · **Where** = onde · **When** = quando · **Who** = quem.",
          explanation: "Mandou bem! Todas as perguntas certas.",
          correction:
            "Esse par não combina. **What** = o que · **Where** = onde · **When** = quando · **Who** = quem.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What are you going ",
          after: " wear to the party?",
          answer: "to",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Isso! “What are you going to wear to the party?” = “O que você vai vestir na festa?”",
          correction: "A palavra certa é **to**: going to + verbo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " they going to stay?",
          options: ["will", "is", "are"],
          correctAnswer: "are",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Mandou bem! “Where are they going to stay?” = “Onde eles vão ficar?”",
          correction: "Quase! Com “they”: **Where are they going to stay?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Quando você vai voltar?",
          answer: ["When", "will", "you", "come", "back"],
          bank: ["will", "you", "When", "come", "back", "do", "comes"],
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Muito bem! “When will you come back?” = “Quando você vai voltar?”",
          correction:
            "O certo é **When will you come back?** When + will + you + come back.",
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
          after: " you going to cook?",
          answer: "are",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation: "Isso! “What are you going to cook?” = “O que você vai cozinhar?”",
          correction: "A resposta é **are**: What are you going to…?",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Who is going to drive?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm113S9.mp3"),
          options: [
            "Who is going to drive?",
            "Who is going to drink?",
            "Where are you going to drive?",
          ],
          correctAnswer: "Who is going to drive?",
          hint:
            "Escute **Who** ou **Where**, e **drive** (dirigir) ou **drink** (beber).",
          explanation: "Perfeito! “Who is going to drive?” = “Quem vai dirigir?”",
          correction:
            "A frase é **Who is going to drive?** Use o botão 0.5× para ouvir “drive”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "How long ",
          after: " you be in Paris? – Two weeks.",
          options: ["will", "are", "do"],
          correctAnswer: "will",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Mandou bem! “How long will you be in Paris?” = “Quanto tempo você vai ficar em Paris?” Lição completa! 🎉",
          correction: "Quase lá! Antes de “be”, use will: **How long will you be…?**",
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
