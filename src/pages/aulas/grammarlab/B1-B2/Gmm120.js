import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 2 (Present continuous): Agora, situações
// temporárias, tendências e planos combinados. Os 5 tipos do Grammar Lab
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
          before: "Shh! The baby ",
          after: ".",
          options: ["sleeps", "is sleeping", "sleep"],
          correctAnswer: "is sleeping",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Isso aí! “Shh! The baby is sleeping” = “Shh! O bebê está dormindo.”",
          correction: "Quase! “Shh!” mostra que é agora → **is sleeping.**",
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
            ["I'm working from home this week.", "situação temporária"],
            ["Look! It's snowing.", "acontecendo agora"],
            ["More people are cycling these days.", "tendência / mudança"],
            ["I'm meeting Tom tomorrow.", "plano combinado"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a sentence, then why it's in the present continuous.",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation: "Mandou bem! Você já conhece os usos do present continuous.",
          correction:
            "Esse par não combina. **this week** = temporário · **Look!** = agora · **these days** = tendência · **tomorrow** = plano.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I'm ",
          after: " (read) a great book at the moment.",
          answer: "reading",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Isso! “I'm reading a great book at the moment” = “Estou lendo um ótimo livro no momento.”",
          correction: "A palavra certa é **reading**: read + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's staying with her cousins this summer.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm120S4.mp3"),
          options: [
            "She stays with her cousins every summer.",
            "She's staying with her cousins this summer.",
            "She's staying with her cousin this summer.",
          ],
          correctAnswer: "She's staying with her cousins this summer.",
          hint:
            "Escute **She's staying … this summer** (temporário) ou **stays … every summer** (hábito), e **cousins** ou **cousin**.",
          explanation:
            "Ótimo ouvido! “She's staying with her cousins this summer” = “Ela vai ficar com os primos neste verão.”",
          correction:
            "A frase é **She's staying with her cousins this summer.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os preços estão subindo muito.",
          answer: ["Prices", "are", "rising", "a", "lot"],
          bank: ["Prices", "are", "rising", "a", "lot", "rise", "is"],
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Perfeito! “Prices are rising a lot” = “Os preços estão subindo muito.”",
          correction:
            "O certo é **Prices are rising a lot.** Mudança em andamento → present continuous.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " a new kitchen, so we're eating out a lot.",
          options: ["are building", "build", "builds"],
          correctAnswer: "are building",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Mandou bem! “We are building a new kitchen” = “Estamos construindo uma cozinha nova.”",
          correction: "Quase! Situação temporária em andamento → **are building.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Why ",
          after: " you wearing a coat? It's hot!",
          answer: "are",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Isso! “Why are you wearing a coat?” = “Por que você está de casaco?”",
          correction: "A resposta é **are**: Why are you wearing…?",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele está estudando para as provas este mês.",
          answer: ["He", "is", "studying", "for", "his", "exams", "this", "month"],
          bank: [
            "He",
            "is",
            "studying",
            "for",
            "his",
            "exams",
            "this",
            "month",
            "studies",
            "does",
          ],
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Muito bem! “He is studying for his exams this month” = “Ele está estudando para as provas este mês.”",
          correction:
            "O certo é **He is studying for his exams this month.** “This month” = temporário.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The climate is getting warmer.",
          options: [
            "The climate gets warmer.",
            "The climate is getting worse.",
            "The climate is getting warmer.",
          ],
          correctAnswer: "The climate is getting warmer.",
          hint:
            "Escute **is getting** (mudança) e o final: **warmer** (mais quente) ou **worse** (pior).",
          explanation:
            "Perfeito! “The climate is getting warmer” = “O clima está ficando mais quente.”",
          correction:
            "A frase é **The climate is getting warmer.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Listen! Someone ",
          after: " at the door.",
          options: ["knocks", "knock", "is knocking"],
          correctAnswer: "is knocking",
          hint:
            "**Present continuous** = agora, situação temporária ou mudança: She's working from home this week.",
          explanation:
            "Mandou bem! “Someone is knocking at the door” = “Alguém está batendo na porta.” Lição completa! 🎉",
          correction: "Quase lá! “Listen!” mostra que é agora → **is knocking.**",
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
