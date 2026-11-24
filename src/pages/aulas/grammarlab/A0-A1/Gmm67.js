import createLessonScreen from "../../LessonScreen";

// Present simple, aula 9 (Questions: Do…?): Do + I / you / we / they +
// verbo?. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you like pizza?",
          options: ["Do", "Does", "Are"],
          correctAnswer: "Do",
          hint: "Pergunta com I, you, we, they: **Do + sujeito + verbo?**",
          explanation: "Isso aí! “Do you like pizza?” = “Você gosta de pizza?”",
          correction: "Quase! Com “you”, a pergunta começa com **Do.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você mora aqui?",
          answer: ["Do", "you", "live", "here"],
          bank: ["live", "here", "you", "Do", "Does", "You", "lives"],
          hint: "Pergunta com I, you, we, they: **Do + sujeito + verbo?**",
          explanation: "Perfeito! “Do you live here?” = “Você mora aqui?”",
          correction: "O certo é **Do you live here?** Do + you + live.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Do they speak English?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm67S3.mp3"),
          options: [
            "They speak English.",
            "Do they speak English?",
            "Do they speak Spanish?",
          ],
          correctAnswer: "Do they speak English?",
          hint: "Escute se começa com **Do** (pergunta) e o idioma.",
          explanation: "Ótimo ouvido! “Do they speak English?” = “Eles falam inglês?”",
          correction:
            "A frase é **Do they speak English?** Ela começa com “Do”, por isso é pergunta.",
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
            ["Do you work?", "Você trabalha?"],
            ["Do they study?", "Eles estudam?"],
            ["Do we have class?", "Nós temos aula?"],
            ["Do I need a pen?", "Eu preciso de caneta?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Olhe o sujeito depois do Do: **you, they, we** ou **I**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Confira o sujeito: **you** = você · **they** = eles · **we** = nós · **I** = eu.",
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
          after: " you drink coffee?",
          answer: "Do",
          hint: "Pergunta com I, you, we, they: **Do + sujeito + verbo?**",
          explanation: "Isso! “Do you drink coffee?” = “Você bebe café?”",
          correction: "A palavra certa é **Do**: Do you…?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Do you ",
          after: " soccer?",
          options: ["plays", "play", "playing"],
          correctAnswer: "play",
          hint: "Depois de **Do + sujeito**, o verbo fica normal.",
          explanation: "Mandou bem! “Do you play soccer?” = “Você joga futebol?”",
          correction: "Quase! Na pergunta, o verbo fica normal: **Do you play…?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Seus pais trabalham?",
          answer: ["Do", "your", "parents", "work"],
          bank: ["work", "your", "Do", "parents", "Does", "works"],
          hint: "Your parents = they → **Do**.",
          explanation: "Muito bem! “Do your parents work?” = “Seus pais trabalham?”",
          correction: "O certo é **Do your parents work?** Your parents = they → Do.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Do they ",
          after: " (have) a car?",
          answer: "have",
          hint: "Pergunta com I, you, we, they: **Do + sujeito + verbo?**",
          explanation: "Isso! “Do they have a car?” = “Eles têm carro?”",
          correction: "A resposta é **have**: depois de Do + sujeito, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Do you get up early?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm67S9.mp3"),
          options: ["Do you get up early?", "Do you get up late?", "You get up early."],
          correctAnswer: "Do you get up early?",
          hint:
            "Escute o começo (**Do you** = pergunta) e o final: **early** (cedo) ou **late** (tarde).",
          explanation: "Perfeito! “Do you get up early?” = “Você se levanta cedo?”",
          correction:
            "A frase é **Do you get up early?** Use o botão 0.5× para ouvir “early”.",
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
          after: " your friends live near here?",
          options: ["Does", "Is", "Do"],
          correctAnswer: "Do",
          hint: "Your friends = they → **Do**.",
          explanation:
            "Mandou bem! “Do your friends live near here?” = “Seus amigos moram perto daqui?” Lição completa! 🎉",
          correction: "Quase lá! Your friends = they → **Do.**",
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
