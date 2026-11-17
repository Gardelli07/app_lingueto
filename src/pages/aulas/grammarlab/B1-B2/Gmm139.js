import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 2 (Didn't use to / Did you use to?): Negativa
// e pergunta: didn't use to · Did you use to…? (use sem -d). Os 5 tipos do
// Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de um
// slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " like coffee, but now I love it.",
          options: ["didn't use to", "didn't used to", "don't use to"],
          correctAnswer: "didn't use to",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation:
            "Isso aí! “I didn't use to like coffee” = “Eu não gostava de café.”",
          correction: "Quase! Depois de didn't, use fica sem -d: **didn't use to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Did you ",
          after: " to play an instrument?",
          answer: "use",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation:
            "Isso! “Did you use to play an instrument?” = “Você tocava algum instrumento?”",
          correction: "A palavra certa é **use**: depois de Did, sem -d.",
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
            ["Did you use to…?", "Você costumava…?"],
            ["I didn't use to…", "Eu não costumava…"],
            ["She used to…", "Ela costumava…"],
            ["Yes, I did.", "Sim, costumava."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **Did you use to** = você costumava? · **didn't use to** = não costumava · **used to** = costumava.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Did you use to live here?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm139S4.mp3"),
          options: [
            "Do you live here?",
            "Did you use to live here?",
            "Did you use to leave here?",
          ],
          correctAnswer: "Did you use to live here?",
          hint:
            "Escute **Did you use to** e o verbo: **live** (morar) ou **leave** (sair).",
          explanation: "Ótimo ouvido! “Did you use to live here?” = “Você morava aqui?”",
          correction:
            "A frase é **Did you use to live here?** Use o botão 0.5× para ouvir “live”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não costumava acordar cedo.",
          answer: ["She", "didn't", "use", "to", "wake", "up", "early"],
          bank: ["She", "didn't", "use", "to", "wake", "up", "early", "used", "doesn't"],
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation: "Perfeito! “She didn't use to wake up early.”",
          correction:
            "O certo é **She didn't use to wake up early.** Didn't + use (sem -d).",
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
          after: " you use to go on holiday?",
          options: ["do", "did", "were"],
          correctAnswer: "did",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation:
            "Mandou bem! “Where did you use to go on holiday?” = “Aonde você costumava ir nas férias?”",
          correction: "Quase! Pergunta no passado → **did you use to?**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We didn't ",
          after: " to have a car.",
          answer: "use",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation: "Isso! “We didn't use to have a car” = “Nós não tínhamos carro.”",
          correction: "A resposta é **use**: didn't use to (sem -d).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Vocês costumavam brigar quando eram crianças?",
          answer: ["Did", "you", "use", "to", "fight", "when", "you", "were", "children"],
          bank: [
            "Did",
            "you",
            "use",
            "to",
            "fight",
            "when",
            "you",
            "were",
            "children",
            "used",
            "fought",
          ],
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation: "Muito bem! “Did you use to fight when you were children?”",
          correction:
            "O certo é **Did you use to fight when you were children?** Did + you + use to + fight.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I didn't use to have so many friends.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm139S9.mp3"),
          options: [
            "I don't have so many friends.",
            "I didn't use to have so much free time.",
            "I didn't use to have so many friends.",
          ],
          correctAnswer: "I didn't use to have so many friends.",
          hint:
            "Escute **didn't use to** e o final: **so many friends** ou **so much free time**.",
          explanation:
            "Perfeito! “I didn't use to have so many friends” = “Eu não tinha tantos amigos.”",
          correction:
            "A frase é **I didn't use to have so many friends.** Use o botão 0.5× para ouvir o final.",
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
          after: " your grandparents use to live in the country? – Yes, they did.",
          options: ["Did", "Do", "Were"],
          correctAnswer: "Did",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation:
            "Mandou bem! “Did your grandparents use to live in the country?” Lição completa! 🎉",
          correction:
            "Quase lá! A resposta usa “did” → **Did your grandparents use to…?**",
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
