import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 2 (Irregular participles 1):
// been, seen, done, eaten, gone, had, made. Os 5 tipos do Grammar Lab
// alternados, uma pergunta por slide. O combo e o XP seguem de um slide para
// o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o painel
// de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["be", "been"],
            ["see", "seen"],
            ["do", "done"],
            ["eat", "eaten"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past participle.",
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation: "Mandou bem! Todos os particípios certos.",
          correction:
            "Esse par não combina. be → **been** · see → **seen** · do → **done** · eat → **eaten**.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I have ",
          after: " that film three times.",
          options: ["saw", "seen", "see"],
          correctAnswer: "seen",
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation:
            "Isso aí! “I have seen that film three times” = “Já vi esse filme três vezes.”",
          correction:
            "Quase! Depois de have, use o particípio: **seen** (saw é o passado).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Have you ",
          after: " (eat) sushi?",
          answer: "eaten",
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation: "Isso! “Have you eaten sushi?” = “Você já comeu sushi?”",
          correction: "A palavra certa é **eaten**: eat → ate → eaten.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's done her homework.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm145S4.mp3"),
          options: [
            "She did her homework.",
            "She's done her homework.",
            "She's done her housework.",
          ],
          correctAnswer: "She's done her homework.",
          hint:
            "Escute **She's done** ou **did**, e **homework** (lição) ou **housework** (tarefas de casa).",
          explanation: "Ótimo ouvido! “She's done her homework” = “Ela já fez a lição.”",
          correction: "A frase é **She's done her homework.** She's done = she has done.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu já estive em Londres.",
          answer: ["I", "have", "been", "to", "London"],
          bank: ["I", "have", "been", "to", "London", "was", "went", "gone"],
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation: "Perfeito! “I have been to London” = “Eu já estive em Londres.”",
          correction: "O certo é **I have been to London.** Experiência → have been to.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We have ",
          after: " a lot of new friends here.",
          options: ["made", "maked", "make"],
          correctAnswer: "made",
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation: "Mandou bem! “We have made a lot of new friends here.”",
          correction: "Quase! make → made → **made.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He has ",
          after: " (have) three different jobs.",
          answer: "had",
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation:
            "Isso! “He has had three different jobs” = “Ele já teve três empregos diferentes.”",
          correction: "A resposta é **had**: have → had → had.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você já fez isso antes?",
          answer: ["Have", "you", "done", "this", "before"],
          bank: ["Have", "you", "done", "this", "before", "did", "Did"],
          hint:
            "Particípios irregulares: be → **been** · see → **seen** · do → **done** · eat → **eaten** · go → **gone** · have → **had** · make → **made**.",
          explanation: "Muito bem! “Have you done this before?”",
          correction: "O certo é **Have you done this before?** Have + you + done.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Have you seen my keys?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm145S9.mp3"),
          options: [
            "Did you see my keys?",
            "Have you seen my kids?",
            "Have you seen my keys?",
          ],
          correctAnswer: "Have you seen my keys?",
          hint:
            "Escute **Have you seen** ou **Did you see**, e **keys** (chaves) ou **kids**.",
          explanation: "Perfeito! “Have you seen my keys?” = “Você viu minhas chaves?”",
          correction:
            "A frase é **Have you seen my keys?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents have ",
          after: " to Japan twice.",
          options: ["went", "gone", "been"],
          correctAnswer: "been",
          hint: "Experiência (foram e voltaram) → **been to**.",
          explanation:
            "Mandou bem! “My parents have been to Japan twice.” Lição completa! 🎉",
          correction: "Quase lá! Foram e voltaram (experiência) → **been to.**",
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
