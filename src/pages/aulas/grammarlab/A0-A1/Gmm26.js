import createLessonScreen from "../../LessonScreen";

// Past simple, aula 12 (Wh-questions): What / Where / When / Why / Who + did
// + sujeito + verbo normal?. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " you go last summer?",
          options: ["did", "were", "do"],
          correctAnswer: "did",
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation:
            "Isso aí! “Where did you go last summer?” = “Aonde você foi no verão passado?”",
          correction: "Quase! Ação no passado: **Where did you go?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que você fez ontem?",
          answer: ["What", "did", "you", "do", "yesterday"],
          bank: ["do", "you", "What", "did", "yesterday", "does", "Where"],
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation: "Perfeito! “What did you do yesterday?” = “O que você fez ontem?”",
          correction: "O certo é **What did you do yesterday?** What + did + you + do.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What time did you wake up?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm26S3.mp3"),
          options: [
            "What time did you wake up?",
            "What time do you wake up?",
            "What time did he wake up?",
          ],
          correctAnswer: "What time did you wake up?",
          hint: "Escute **did** ou **do**, e **you** ou **he**.",
          explanation:
            "Ótimo ouvido! “What time did you wake up?” = “Que horas você acordou?”",
          correction:
            "A frase é **What time did you wake up?** Use o botão 0.5× para ouvir “did you”.",
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
            ["Where did you go?", "Aonde você foi?"],
            ["What did you eat?", "O que você comeu?"],
            ["When did they arrive?", "Quando eles chegaram?"],
            ["Why did she cry?", "Por que ela chorou?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**Where** = onde · **What** = o que · **When** = quando · **Why** = por que.",
          explanation: "Mandou bem! Todas as perguntas certas.",
          correction:
            "Esse par não combina. **Where** = aonde · **What** = o que · **When** = quando · **Why** = por que.",
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
          after: " she say?",
          answer: "did",
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation: "Isso! “What did she say?” = “O que ela disse?”",
          correction: "A palavra certa é **did**: What did she say?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "When did you ",
          after: " English?",
          options: ["start", "started", "starts"],
          correctAnswer: "start",
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation:
            "Mandou bem! “When did you start English?” = “Quando você começou o inglês?”",
          correction: "Quase! Depois de did + sujeito, verbo normal: **start.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Por que você não veio?",
          answer: ["Why", "didn't", "you", "come"],
          bank: ["come", "you", "Why", "didn't", "came", "What"],
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation: "Muito bem! “Why didn't you come?” = “Por que você não veio?”",
          correction: "O certo é **Why didn't you come?** Why + didn't + you + come.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Where did you ",
          after: " (buy) that jacket?",
          answer: "buy",
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation:
            "Isso! “Where did you buy that jacket?” = “Onde você comprou essa jaqueta?”",
          correction: "A resposta é **buy**: depois de did, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Who did you see at the party?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm26S9.mp3"),
          options: [
            "Who saw you at the party?",
            "Who did you see at the party?",
            "Who did you meet at the party?",
          ],
          correctAnswer: "Who did you see at the party?",
          hint: "Escute **did you see** ou **saw you**, e **see** ou **meet**.",
          explanation:
            "Perfeito! “Who did you see at the party?” = “Quem você viu na festa?”",
          correction:
            "A frase é **Who did you see at the party?** Use o botão 0.5× para ouvir “did you see”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "How ",
          after: " the trip?",
          options: ["did", "was", "were"],
          correctAnswer: "was",
          hint: "Para pedir opinião sobre algo (how was…?), use **was**, não did.",
          explanation:
            "Mandou bem! “How was the trip?” = “Como foi a viagem?” Lição completa! 🎉",
          correction: "Quase lá! Para opinião: **How was the trip?**",
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
