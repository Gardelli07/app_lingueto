import createLessonScreen from "../../LessonScreen";

// Present simple, aula 12 (Wh-questions): Where / What / When / What time +
// do / does + sujeito + verbo?. Os 5 tipos do Grammar Lab alternados, uma
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
          after: " you live?",
          options: ["do", "does", "are"],
          correctAnswer: "do",
          hint:
            "**Palavra de pergunta + do / does + sujeito + verbo**: Where do you live?",
          explanation: "Isso aí! “Where do you live?” = “Onde você mora?”",
          correction: "Quase! Com “you”: **Where do you live?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde ela trabalha?",
          answer: ["Where", "does", "she", "work"],
          bank: ["work", "she", "Where", "does", "do", "works", "What"],
          hint:
            "**Palavra de pergunta + do / does + sujeito + verbo**: Where do you live?",
          explanation: "Perfeito! “Where does she work?” = “Onde ela trabalha?”",
          correction: "O certo é **Where does she work?** She → does + work (sem -s).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What time do you get up?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm70S3.mp3"),
          options: [
            "What time does he get up?",
            "What time do you get up?",
            "What time do you go out?",
          ],
          correctAnswer: "What time do you get up?",
          hint: "Escute **do you** ou **does he**, e o final: **get up** ou **go out**.",
          explanation:
            "Ótimo ouvido! “What time do you get up?” = “Que horas você se levanta?”",
          correction:
            "A frase é **What time do you get up?** Use o botão 0.5× para ouvir “do you”.",
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
            ["Where…?", "Onde…?"],
            ["What…?", "O que…?"],
            ["When…?", "Quando…?"],
            ["What time…?", "Que horas…?"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a question word, then its translation.",
          hint:
            "**Where** = lugar · **When** = tempo · **What time** = hora · **What** = o que / qual.",
          explanation: "Mandou bem! Todas as palavras de pergunta certas.",
          correction:
            "Esse par não combina. **Where** = onde · **What** = o que · **When** = quando · **What time** = que horas.",
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
          after: " he do on weekends?",
          answer: "does",
          hint:
            "**Palavra de pergunta + do / does + sujeito + verbo**: Where do you live?",
          explanation:
            "Isso! “What does he do on weekends?” = “O que ele faz nos fins de semana?”",
          correction: "A palavra certa é **does**: com he, use does.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What time ",
          after: " the class start?",
          options: ["do", "does", "is"],
          correctAnswer: "does",
          hint: "The class = it → **does**.",
          explanation:
            "Mandou bem! “What time does the class start?” = “Que horas a aula começa?”",
          correction: "Quase! The class = it → **does.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que você faz? (profissão)",
          answer: ["What", "do", "you", "do"],
          bank: ["do", "you", "What", "do", "does", "Where"],
          hint:
            "**What do you do?** pergunta a profissão. O primeiro do é da pergunta; o segundo é o verbo “fazer”.",
          explanation:
            "Muito bem! “What do you do?” = “O que você faz? / Qual é a sua profissão?”",
          correction:
            "O certo é **What do you do?** O primeiro “do” é da pergunta, e o segundo significa “fazer”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " your parents live?",
          answer: "do",
          hint: "Your parents = they → **do**.",
          explanation: "Isso! “Where do your parents live?” = “Onde seus pais moram?”",
          correction: "A resposta é **do**: your parents = they.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "When does she study?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm70S9.mp3"),
          options: [
            "Where does she study?",
            "When do they study?",
            "When does she study?",
          ],
          correctAnswer: "When does she study?",
          hint:
            "Escute **When** (quando) ou **Where** (onde), e **does she** ou **do they**.",
          explanation: "Perfeito! “When does she study?” = “Quando ela estuda?”",
          correction:
            "A frase é **When does she study?** Use o botão 0.5× para ouvir “When”.",
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
          after: " you have for breakfast?",
          options: ["does", "are", "do"],
          correctAnswer: "do",
          hint:
            "**Palavra de pergunta + do / does + sujeito + verbo**: Where do you live?",
          explanation:
            "Mandou bem! “What do you have for breakfast?” = “O que você come no café da manhã?” Lição completa! 🎉",
          correction: "Quase lá! Com “you”: **What do you have…?**",
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
