import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 13 (Simple or continuous?): Rotina (every day → I
// work) × agora (now → I'm working). Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " to work every day.",
          options: ["go", "am going", "goes"],
          correctAnswer: "go",
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation: "Isso aí! “I go to work every day” = “Eu vou trabalhar todo dia.”",
          correction: "Quase! “Every day” é rotina → present simple: **I go.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She usually ",
          after: " (walk) to school.",
          answer: "walks",
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation:
            "Isso! “She usually walks to school” = “Ela geralmente vai a pé para a escola.”",
          correction: "A palavra certa é **walks**: “usually” é rotina, e she → walks.",
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
            ["I work", "Eu trabalho (sempre)"],
            ["I'm working", "Eu estou trabalhando (agora)"],
            ["She cooks", "Ela cozinha (sempre)"],
            ["She's cooking", "Ela está cozinhando (agora)"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation: "Mandou bem! Você já separa rotina e agora.",
          correction:
            "Esse par não combina. **Sem -ing** = rotina (sempre) · **com -ing** = agora.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's playing the guitar now.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm55S4.mp3"),
          options: [
            "He plays the guitar.",
            "He's playing the guitar now.",
            "She's playing the guitar now.",
          ],
          correctAnswer: "He's playing the guitar now.",
          hint: "Escute **He's playing … now** (agora) ou **He plays** (sempre).",
          explanation:
            "Ótimo ouvido! “He's playing the guitar now” = “Ele está tocando violão agora.”",
          correction:
            "A frase é **He's playing the guitar now.** Use o botão 0.5× para ouvir “now”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela está estudando agora.",
          answer: ["She", "is", "studying", "now"],
          bank: ["studying", "now", "She", "is", "studies", "does"],
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation: "Perfeito! “She is studying now” = “Ela está estudando agora.”",
          correction: "O certo é **She is studying now.** “Now” → is + studying.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Right now, we ",
          after: " English.",
          options: ["study", "are studying", "studies"],
          correctAnswer: "are studying",
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation:
            "Mandou bem! “Right now, we are studying English” = “Agora, nós estamos estudando inglês.”",
          correction: "Quase! “Right now” = agora → **are studying.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My dad ",
          after: " (watch) TV every night.",
          answer: "watches",
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation:
            "Isso! “My dad watches TV every night” = “Meu pai assiste TV toda noite.”",
          correction:
            "A resposta é **watches**: “every night” é rotina → present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles jogam futebol aos sábados.",
          answer: ["They", "play", "soccer", "on", "Saturdays"],
          bank: ["play", "soccer", "They", "on", "Saturdays", "plays", "are"],
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation:
            "Muito bem! “They play soccer on Saturdays” = “Eles jogam futebol aos sábados.”",
          correction:
            "O certo é **They play soccer on Saturdays.** Rotina (aos sábados) → present simple.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I usually drink tea, but today I'm drinking coffee.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm55S9.mp3"),
          options: [
            "I usually drink coffee, but today I'm drinking tea.",
            "I always drink tea, but today I'm drinking coffee.",
            "I usually drink tea, but today I'm drinking coffee.",
          ],
          correctAnswer: "I usually drink tea, but today I'm drinking coffee.",
          hint:
            "Escute **usually** ou **always**, e o que é de costume: **tea** ou **coffee**.",
          explanation: "Perfeito! “Eu geralmente bebo chá, mas hoje estou bebendo café.”",
          correction:
            "A frase é **I usually drink tea, but today I'm drinking coffee.** Rotina → drink · hoje → I'm drinking.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Shh! The baby ",
          after: ".",
          options: ["sleeps", "is sleeping", "sleep"],
          correctAnswer: "is sleeping",
          hint: "**Shh!** mostra que é agora → present continuous.",
          explanation:
            "Mandou bem! “Shh! The baby is sleeping” = “Shh! O bebê está dormindo.” Lição completa! 🎉",
          correction: "Quase lá! “Shh!” = agora → **The baby is sleeping.**",
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
