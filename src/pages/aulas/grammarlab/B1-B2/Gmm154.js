import createLessonScreen from "../../LessonScreen";

// Just, already, yet, still (B1-B2), aula 3 (Yet): yet = ainda não (negativa)
// / já? (pergunta) · vai no final da frase. Os 5 tipos do Grammar Lab
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
          before: "I haven't finished my essay ",
          after: ".",
          options: ["yet", "already", "just"],
          correctAnswer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Isso aí! “I haven't finished my essay yet” = “Ainda não terminei minha redação.”",
          correction: "Quase! Negativa + “ainda” no final → **yet.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Have you called the doctor ",
          after: "?",
          answer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Isso! “Have you called the doctor yet?” = “Você já ligou para o médico?”",
          correction: "A palavra certa é **yet**: pergunta + “já” no final.",
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
            ["I haven't eaten yet.", "Ainda não comi."],
            ["Have you eaten yet?", "Você já comeu?"],
            ["She hasn't replied yet.", "Ela ainda não respondeu."],
            ["Has he arrived yet?", "Ele já chegou?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation: "Mandou bem! Yet = ainda (negativa) / já (pergunta).",
          correction:
            "Esse par não combina. Negativa + **yet** = ainda não · pergunta + **yet** = já?",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Have you met my sister yet?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm154S4.mp3"),
          options: [
            "Have you met my sister before?",
            "Did you meet my sister?",
            "Have you met my sister yet?",
          ],
          correctAnswer: "Have you met my sister yet?",
          hint: "Escute o final: **yet** ou **before**.",
          explanation:
            "Ótimo ouvido! “Have you met my sister yet?” = “Você já conheceu minha irmã?”",
          correction:
            "A frase é **Have you met my sister yet?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eles ainda não chegaram.",
          answer: ["They", "haven't", "arrived", "yet"],
          bank: ["They", "haven't", "arrived", "yet", "already", "didn't"],
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Perfeito! “They haven't arrived yet” = “Eles ainda não chegaram.”",
          correction: "O certo é **They haven't arrived yet.** Yet vai no final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Has the package arrived ",
          after: "?",
          options: ["already", "yet", "just"],
          correctAnswer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Mandou bem! “Has the package arrived yet?” = “O pacote já chegou?”",
          correction: "Quase! Pergunta com “já” no final → **yet.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We haven't decided ",
          after: ".",
          answer: "yet",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation: "Isso! “We haven't decided yet” = “Ainda não decidimos.”",
          correction: "A resposta é **yet**: negativa + ainda.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você já terminou?",
          answer: ["Have", "you", "finished", "yet"],
          bank: ["Have", "you", "finished", "yet", "Did", "finish"],
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation: "Muito bem! “Have you finished yet?” = “Você já terminou?”",
          correction:
            "O certo é **Have you finished yet?** Yet vai no final da pergunta.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I haven't seen it yet.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm154S9.mp3"),
          options: [
            "I've already seen it.",
            "I haven't seen it yet.",
            "I haven't seen him yet.",
          ],
          correctAnswer: "I haven't seen it yet.",
          hint: "Escute **haven't … yet** ou **already**, e **it** ou **him**.",
          explanation: "Perfeito! “I haven't seen it yet” = “Ainda não vi.”",
          correction:
            "A frase é **I haven't seen it yet.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She hasn't ",
          after: " her new job yet.",
          options: ["start", "started", "starts"],
          correctAnswer: "started",
          hint:
            "**yet** = ainda (na negativa) / já (na pergunta). Vai no final da frase: I haven't finished yet. · Have you finished yet?",
          explanation:
            "Mandou bem! “She hasn't started her new job yet.” Lição completa! 🎉",
          correction: "Quase lá! Hasn't + particípio: **started.**",
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
