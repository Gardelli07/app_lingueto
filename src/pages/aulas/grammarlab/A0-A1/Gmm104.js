import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 1 (Will): will + verbo normal (igual para todos: I
// will, she will, they will). Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " help you tomorrow.",
          options: ["will", "wills", "am"],
          correctAnswer: "will",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation: "Isso aí! “I will help you tomorrow” = “Eu vou te ajudar amanhã.”",
          correction: "Quase! Para o futuro: **I will help you.**",
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
            ["I will call", "Eu vou ligar"],
            ["She will come", "Ela vai vir"],
            ["We will win", "Nós vamos ganhar"],
            ["They will travel", "Eles vão viajar"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**will** = vai / vou / vamos. Olhe o verbo: **call, come, win, travel**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **call** = ligar · **come** = vir · **win** = ganhar · **travel** = viajar.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It will be fun.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm104S3.mp3"),
          options: ["It was fun.", "It will be fun.", "It will be fine."],
          correctAnswer: "It will be fun.",
          hint:
            "Escute **will be** (futuro) ou **was** (passado), e **fun** ou **fine**.",
          explanation: "Ótimo ouvido! “It will be fun” = “Vai ser divertido.”",
          correction:
            "A frase é **It will be fun.** Use o botão 0.5× para ouvir “will be”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She will ",
          after: " (love) the present.",
          answer: "love",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation: "Isso! “She will love the present” = “Ela vai amar o presente.”",
          correction: "A palavra certa é **love**: depois de will, sem -s.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu vou te ligar amanhã.",
          answer: ["I", "will", "call", "you", "tomorrow"],
          bank: ["call", "you", "I", "will", "tomorrow", "to", "calls"],
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation: "Perfeito! “I will call you tomorrow” = “Eu vou te ligar amanhã.”",
          correction: "O certo é **I will call you tomorrow.** Will + call, sem “to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He will ",
          after: " late.",
          options: ["is", "be", "being"],
          correctAnswer: "be",
          hint: "Depois de will, o verbo be fica **be**: will be.",
          explanation: "Mandou bem! “He will be late” = “Ele vai se atrasar.”",
          correction: "Quase! Depois de will, use be: **He will be late.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They ",
          after: " arrive at 8 tomorrow.",
          answer: "will",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation:
            "Isso! “They will arrive at 8 tomorrow” = “Eles vão chegar às 8 amanhã.”",
          correction: "A resposta é **will**: they will arrive.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela vai ser médica.",
          answer: ["She", "will", "be", "a", "doctor"],
          bank: ["be", "a", "She", "will", "doctor", "is", "wills"],
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation: "Muito bem! “She will be a doctor” = “Ela vai ser médica.”",
          correction: "O certo é **She will be a doctor.** Will + be.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We will see you soon.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm104S9.mp3"),
          options: [
            "We will see you tomorrow.",
            "He will see you soon.",
            "We will see you soon.",
          ],
          correctAnswer: "We will see you soon.",
          hint:
            "Escute **We** ou **He**, e o final: **soon** (em breve) ou **tomorrow**.",
          explanation: "Perfeito! “We will see you soon” = “Nós vamos te ver em breve.”",
          correction:
            "A frase é **We will see you soon.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My team ",
          after: " win the game!",
          options: ["wills", "will", "will to"],
          correctAnswer: "will",
          hint:
            "**will + verbo normal**: I will help. É igual para todos: she will, they will. Sem to e sem -s.",
          explanation:
            "Mandou bem! “My team will win the game!” = “Meu time vai ganhar o jogo!” Lição completa! 🎉",
          correction: "Quase lá! will não muda e não leva to: **My team will win.**",
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
