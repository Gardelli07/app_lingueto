import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 1 (Past continuous): was / were +
// -ing: ação em andamento num momento do passado. Os 5 tipos do Grammar Lab
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
          before: "At 8 p.m. yesterday, I ",
          after: " dinner.",
          options: ["were having", "was having", "had having"],
          correctAnswer: "was having",
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation:
            "Isso aí! “At 8 p.m. yesterday, I was having dinner” = “Ontem às 20h eu estava jantando.”",
          correction: "Quase! Com I → **was + having.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They were ",
          after: " (watch) a film when I arrived.",
          answer: "watching",
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation:
            "Isso! “They were watching a film when I arrived” = “Eles estavam vendo um filme quando eu cheguei.”",
          correction: "A palavra certa é **watching**: were + verbo-ing.",
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
            ["I was sleeping", "Eu estava dormindo"],
            ["She was driving", "Ela estava dirigindo"],
            ["We were waiting", "Nós estávamos esperando"],
            ["They were laughing", "Eles estavam rindo"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation: "Mandou bem! Past continuous = “estava + -ando / -endo”.",
          correction:
            "Esse par não combina. **sleeping** = dormindo · **driving** = dirigindo · **waiting** = esperando · **laughing** = rindo.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We were walking along the beach.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm130S4.mp3"),
          options: [
            "We walked along the beach.",
            "We were walking along the beach.",
            "We were walking along the river.",
          ],
          correctAnswer: "We were walking along the beach.",
          hint:
            "Escute **were walking** (em andamento) ou **walked**, e o final: **beach** ou **river**.",
          explanation:
            "Ótimo ouvido! “We were walking along the beach” = “Estávamos caminhando pela praia.”",
          correction:
            "A frase é **We were walking along the beach.** Use o botão 0.5× para ouvir “were walking”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela estava falando ao telefone às 10h.",
          answer: ["She", "was", "talking", "on", "the", "phone", "at", "10"],
          bank: [
            "She",
            "was",
            "talking",
            "on",
            "the",
            "phone",
            "at",
            "10",
            "were",
            "talked",
          ],
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation: "Perfeito! “She was talking on the phone at 10.”",
          correction:
            "O certo é **She was talking on the phone at 10.** She → was + talking.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " in the garden all afternoon.",
          options: ["were working", "was working", "worked working"],
          correctAnswer: "were working",
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation:
            "Mandou bem! “My parents were working in the garden all afternoon.”",
          correction: "Quase! My parents = they → **were working.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "At midnight, the baby ",
          after: " still crying.",
          answer: "was",
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation:
            "Isso! “At midnight, the baby was still crying” = “À meia-noite o bebê ainda estava chorando.”",
          correction: "A resposta é **was**: the baby = he / she.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que você estava fazendo ontem às 9h?",
          answer: ["What", "were", "you", "doing", "at", "9", "yesterday"],
          bank: ["What", "were", "you", "doing", "at", "9", "yesterday", "did", "was"],
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Muito bem! “What were you doing at 9 yesterday?”",
          correction:
            "O certo é **What were you doing at 9 yesterday?** What + were + you + doing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It was snowing when we left.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm130S9.mp3"),
          options: [
            "It snowed when we left.",
            "It was snowing when we arrived.",
            "It was snowing when we left.",
          ],
          correctAnswer: "It was snowing when we left.",
          hint:
            "Escute **was snowing** ou **snowed**, e o final: **left** (saímos) ou **arrived** (chegamos).",
          explanation:
            "Perfeito! “It was snowing when we left” = “Estava nevando quando saímos.”",
          correction:
            "A frase é **It was snowing when we left.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This time last year, I ",
          after: " in Canada.",
          options: ["was living", "were living", "lived living"],
          correctAnswer: "was living",
          hint:
            "**Past continuous** = was / were + verbo-ing: I was working · they were playing.",
          explanation:
            "Mandou bem! “This time last year, I was living in Canada.” Lição completa! 🎉",
          correction: "Quase lá! Com I → **was living.**",
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
