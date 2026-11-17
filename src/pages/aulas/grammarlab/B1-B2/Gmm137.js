import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 8 (Review): Revisão do Set 2: past
// continuous, when / while / during, cenário, irregulares. Os 5 tipos do
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
          after: " TV when the power went off.",
          options: ["watched", "was watching", "am watching"],
          correctAnswer: "was watching",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Isso aí! “I was watching TV when the power went off” = “Eu estava vendo TV quando a luz acabou.”",
          correction: "Quase! Ação longa interrompida → **was watching.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "While we were ",
          after: " (walk), it started to rain.",
          answer: "walking",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Isso! “While we were walking, it started to rain.”",
          correction: "A palavra certa é **walking**: while + ação em andamento.",
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
            ["when", "quando"],
            ["while", "enquanto"],
            ["during", "durante"],
            ["suddenly", "de repente"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "**while** + ação em andamento (while I was…) · **during** + substantivo (during the film).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **when** = quando · **while** = enquanto · **during** = durante · **suddenly** = de repente.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que vocês estavam fazendo quando eu liguei?",
          answer: ["What", "were", "you", "doing", "when", "I", "called"],
          bank: ["What", "were", "you", "doing", "when", "I", "called", "did", "was"],
          hint:
            "Negativa: **wasn't / weren't + -ing** · Pergunta: **Was she …ing?** / **Were you …ing?**",
          explanation: "Perfeito! “What were you doing when I called?”",
          correction: "O certo é **What were you doing when I called?**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She was crossing the street when she saw him.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm137S5.mp3"),
          options: [
            "She crossed the street when she saw him.",
            "She was crossing the street when she saw him.",
            "She was crossing the street when he saw her.",
          ],
          correctAnswer: "She was crossing the street when she saw him.",
          hint:
            "Escute **was crossing** e quem viu quem: **she saw him** ou **he saw her**.",
          explanation: "Ótimo ouvido! “Ela estava atravessando a rua quando o viu.”",
          correction:
            "A frase é **She was crossing the street when she saw him.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " the match because it was raining.",
          options: ["didn't finish", "weren't finishing", "wasn't finishing"],
          correctAnswer: "didn't finish",
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation:
            "Mandou bem! “They didn't finish the match because it was raining.”",
          correction:
            "Quase! O resultado final (não terminaram) → past simple: **didn't finish.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He ",
          after: " (break) his leg while he was skiing.",
          answer: "broke",
          hint:
            "Irregulares do B1: catch → **caught** · fall → **fell** · steal → **stole** · drive → **drove** · break → **broke** · ring → **rang** · choose → **chose**.",
          explanation:
            "Isso! “He broke his leg while he was skiing” = “Ele quebrou a perna enquanto esquiava.”",
          correction: "A resposta é **broke**: ação curta + irregular (break → broke).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Estava muito calor e todos estavam na praia.",
          answer: [
            "It",
            "was",
            "very",
            "hot",
            "and",
            "everyone",
            "was",
            "at",
            "the",
            "beach",
          ],
          bank: [
            "It",
            "was",
            "very",
            "hot",
            "and",
            "everyone",
            "was",
            "at",
            "the",
            "beach",
            "were",
          ],
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation: "Muito bem! “It was very hot and everyone was at the beach.”",
          correction:
            "O certo é **It was very hot and everyone was at the beach.** Everyone → was.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Were they still sleeping when you left?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm137S9.mp3"),
          options: [
            "Were they still sleeping when you left?",
            "Did they still sleep when you left?",
            "Were they still sleeping when you arrived?",
          ],
          correctAnswer: "Were they still sleeping when you left?",
          hint: "Escute **Were they still sleeping** e o final: **left** ou **arrived**.",
          explanation:
            "Perfeito! “Were they still sleeping when you left?” = “Eles ainda estavam dormindo quando você saiu?”",
          correction:
            "A frase é **Were they still sleeping when you left?** Use o botão 0.5× para ouvir o final.",
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
          after: " my old teacher while I was shopping.",
          options: ["was meeting", "met", "meet"],
          correctAnswer: "met",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Mandou bem! “I met my old teacher while I was shopping.” Set 2 completo! 🎉",
          correction: "Quase lá! Encontrar alguém é ação curta → **met.**",
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
