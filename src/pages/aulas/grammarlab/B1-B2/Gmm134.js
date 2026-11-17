import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 5 (Simple or continuous?): Ações em
// sequência (past simple) × ação em andamento (past continuous). Os 5 tipos
// do Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de
// um slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I got up, ",
          after: " a shower and left the house.",
          options: ["had", "was having", "have"],
          correctAnswer: "had",
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation:
            "Isso aí! “I got up, had a shower and left” = “Levantei, tomei banho e saí.”",
          correction: "Quase! Ações em sequência → past simple: **had.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "At 7 a.m., I was ",
          after: " (drive) to work.",
          answer: "driving",
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation: "Isso! “At 7 a.m., I was driving to work.”",
          correction: "A palavra certa é **driving**: em andamento às 7h.",
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
            ["I got up, had breakfast and left.", "ações em sequência"],
            ["I was having breakfast when he called.", "ação interrompida"],
            ["While I was cooking, she was reading.", "duas ações ao mesmo tempo"],
            ["It was a cold night and it was raining.", "cenário"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then what it shows.",
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation: "Mandou bem! Você já sabe quando usar cada tempo.",
          correction:
            "Esse par não combina. Lista de ações → **sequência** · when → **interrupção** · while → **ao mesmo tempo** · clima → **cenário**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "When she arrived, we had dinner.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm134S4.mp3"),
          options: [
            "When she arrived, we had dinner.",
            "When she arrived, we were having dinner.",
            "When she left, we had dinner.",
          ],
          correctAnswer: "When she arrived, we had dinner.",
          hint:
            "**we had dinner** = jantamos depois que ela chegou · **we were having** = já estávamos jantando.",
          explanation:
            "Ótimo ouvido! “When she arrived, we had dinner” = “Quando ela chegou, nós jantamos.”",
          correction:
            "A frase é **When she arrived, we had dinner.** Ou seja: ela chegou e depois jantamos.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Quando o professor entrou, os alunos estavam conversando.",
          answer: [
            "When",
            "the",
            "teacher",
            "came",
            "in,",
            "the",
            "students",
            "were",
            "talking",
          ],
          bank: [
            "When",
            "the",
            "teacher",
            "came",
            "in,",
            "students",
            "were",
            "talking",
            "the",
            "talked",
            "was",
          ],
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation: "Perfeito! “When the teacher came in, the students were talking.”",
          correction:
            "O certo é **When the teacher came in, the students were talking.** Ele entrou (curta) · eles conversavam (em andamento).",
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
          after: " my keys while I was walking home.",
          options: ["was losing", "lost", "lose"],
          correctAnswer: "lost",
          hint:
            "**Ação longa** (past continuous) interrompida por **ação curta** (past simple): I was cooking when the phone rang.",
          explanation: "Mandou bem! “I lost my keys while I was walking home.”",
          correction: "Quase! Perder é ação curta → **lost.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Yesterday I ",
          after: " (wake) up at six, ate breakfast and went to the gym.",
          answer: "woke",
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation:
            "Isso! “Yesterday I woke up at six, ate breakfast and went to the gym.”",
          correction:
            "A resposta é **woke**: sequência de ações → past simple (wake → woke).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela estava tomando banho, então não ouviu a campainha.",
          answer: [
            "She",
            "was",
            "having",
            "a",
            "shower,",
            "so",
            "she",
            "didn't",
            "hear",
            "the",
            "doorbell",
          ],
          bank: [
            "She",
            "was",
            "having",
            "a",
            "shower,",
            "so",
            "she",
            "didn't",
            "hear",
            "the",
            "doorbell",
            "had",
            "wasn't",
          ],
          hint:
            "Ações em sequência → **past simple** (I got up, had a shower and left) · ação em andamento → **past continuous**.",
          explanation:
            "Muito bem! “She was having a shower, so she didn't hear the doorbell.”",
          correction:
            "O certo é **She was having a shower, so she didn't hear the doorbell.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I was driving home when I saw the accident.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm134S9.mp3"),
          options: [
            "I drove home when I saw the accident.",
            "I was driving home when I saw the actor.",
            "I was driving home when I saw the accident.",
          ],
          correctAnswer: "I was driving home when I saw the accident.",
          hint: "Escute **was driving** e o final: **accident** ou **actor**.",
          explanation: "Perfeito! “I was driving home when I saw the accident.”",
          correction:
            "A frase é **I was driving home when I saw the accident.** Use o botão 0.5× para ouvir o final.",
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
          after: " when the fire started?",
          options: ["did you do", "were you doing", "you were doing"],
          correctAnswer: "were you doing",
          hint: "O que você estava fazendo (em andamento) quando o incêndio começou?",
          explanation:
            "Mandou bem! “What were you doing when the fire started?” Lição completa! 🎉",
          correction: "Quase lá! Ação em andamento → **What were you doing?**",
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
