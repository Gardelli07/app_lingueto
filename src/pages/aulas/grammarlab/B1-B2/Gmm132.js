import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 3 (When: interrupted actions): Ação
// longa (past continuous) interrompida por ação curta (past simple). Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I was taking a shower when the phone ",
          after: ".",
          options: ["rings", "rang", "was ringing"],
          correctAnswer: "rang",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Isso aí! “I was taking a shower when the phone rang” = “Eu estava tomando banho quando o telefone tocou.”",
          correction:
            "Quase! A interrupção (curta) vai no past simple: **the phone rang.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We were having dinner when the lights ",
          after: " (go) out.",
          answer: "went",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation: "Isso! “The lights went out” = “As luzes se apagaram.”",
          correction: "A palavra certa é **went**: ação curta → past simple (go → went).",
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
            ["when the phone rang", "quando o telefone tocou"],
            ["when it started to rain", "quando começou a chover"],
            ["when she saw me", "quando ela me viu"],
            ["when the bus arrived", "quando o ônibus chegou"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation: "Mandou bem! Depois de when, a ação curta vai no past simple.",
          correction:
            "Esse par não combina. **rang** = tocou · **started to rain** = começou a chover · **saw** = viu · **arrived** = chegou.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I was reading when I heard a noise.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm132S4.mp3"),
          options: [
            "I read when I heard a noise.",
            "I was reading when I heard a noise.",
            "I was reading when I heard a voice.",
          ],
          correctAnswer: "I was reading when I heard a noise.",
          hint:
            "Escute **was reading** e o final: **noise** (barulho) ou **voice** (voz).",
          explanation:
            "Ótimo ouvido! “I was reading when I heard a noise” = “Eu estava lendo quando ouvi um barulho.”",
          correction:
            "A frase é **I was reading when I heard a noise.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele estava dirigindo quando o celular tocou.",
          answer: ["He", "was", "driving", "when", "his", "phone", "rang"],
          bank: [
            "He",
            "was",
            "driving",
            "when",
            "his",
            "phone",
            "rang",
            "drove",
            "ringing",
          ],
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation: "Perfeito! “He was driving when his phone rang.”",
          correction:
            "O certo é **He was driving when his phone rang.** Longa → was driving · curta → rang.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "When I arrived, they ",
          after: " for me.",
          options: ["were waiting", "waited", "are waiting"],
          correctAnswer: "were waiting",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Mandou bem! “When I arrived, they were waiting for me” = “Quando cheguei, eles estavam me esperando.”",
          correction:
            "Quase! Eles já estavam esperando (ação em andamento) → **were waiting.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She ",
          after: " (fall) when she was running down the stairs.",
          answer: "fell",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Isso! “She fell when she was running down the stairs” = “Ela caiu quando estava descendo a escada correndo.”",
          correction: "A resposta é **fell**: ação curta → past simple (fall → fell).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estava dormindo quando você ligou.",
          answer: ["I", "was", "sleeping", "when", "you", "called"],
          bank: ["I", "was", "sleeping", "when", "you", "called", "slept", "were"],
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation: "Muito bem! “I was sleeping when you called.”",
          correction:
            "O certo é **I was sleeping when you called.** Longa → was sleeping · curta → called.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It was raining when the match started.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm132S9.mp3"),
          options: [
            "It rained when the match started.",
            "It was raining when the match ended.",
            "It was raining when the match started.",
          ],
          correctAnswer: "It was raining when the match started.",
          hint:
            "Escute **was raining** e o final: **started** (começou) ou **ended** (terminou).",
          explanation:
            "Perfeito! “It was raining when the match started” = “Estava chovendo quando o jogo começou.”",
          correction:
            "A frase é **It was raining when the match started.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My laptop ",
          after: " while I was working on my essay.",
          options: ["was crashing", "crashed", "crashes"],
          correctAnswer: "crashed",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation:
            "Mandou bem! “My laptop crashed while I was working” = “Meu notebook travou enquanto eu trabalhava.” Lição completa! 🎉",
          correction: "Quase lá! A interrupção é curta → **my laptop crashed.**",
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
