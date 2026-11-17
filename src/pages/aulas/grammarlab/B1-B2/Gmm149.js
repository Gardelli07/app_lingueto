import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 6 (Been to × gone to): been to
// (foi e voltou) × gone to (foi e ainda está lá). Os 5 tipos do Grammar Lab
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
          before: "Tom isn't here. He's ",
          after: " to the bank.",
          options: ["been", "gone", "went"],
          correctAnswer: "gone",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation:
            "Isso aí! “He's gone to the bank” = “Ele foi ao banco (e ainda está lá).”",
          correction: "Quase! Ele não está aqui, ainda está no banco → **gone.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " to Italy three times. I love it there!",
          answer: "been",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation:
            "Isso! “I've been to Italy three times” = “Já fui à Itália três vezes.”",
          correction: "A palavra certa é **been**: foi e voltou (experiência).",
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
            ["She's been to Paris.", "Ela já foi a Paris (e voltou)."],
            ["She's gone to Paris.", "Ela foi para Paris (está lá agora)."],
            ["Where have you been?", "Onde você esteve?"],
            ["Where has he gone?", "Para onde ele foi?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation: "Mandou bem! Você já separa been e gone.",
          correction:
            "Esse par não combina. **been** = foi e voltou / esteve · **gone** = foi e não voltou ainda.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They've gone to the beach.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm149S4.mp3"),
          options: [
            "They've been to the beach.",
            "They've gone to the beach.",
            "They went to the beach.",
          ],
          correctAnswer: "They've gone to the beach.",
          hint: "Escute **gone** (estão lá agora) ou **been** (foram e voltaram).",
          explanation:
            "Ótimo ouvido! “They've gone to the beach” = “Eles foram à praia (estão lá).”",
          correction:
            "A frase é **They've gone to the beach.** Use o botão 0.5× para ouvir “gone”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Minha mãe foi ao supermercado. (ainda não voltou)",
          answer: ["My", "mom", "has", "gone", "to", "the", "supermarket"],
          bank: ["My", "mom", "has", "gone", "to", "the", "supermarket", "been", "went"],
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation: "Perfeito! “My mom has gone to the supermarket.”",
          correction:
            "O certo é **My mom has gone to the supermarket.** Ainda não voltou → gone.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have you ever ",
          after: " to Japan?",
          options: ["been", "gone", "went"],
          correctAnswer: "been",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation:
            "Mandou bem! “Have you ever been to Japan?” = “Você já foi ao Japão?”",
          correction: "Quase! Experiência (ever) → **been to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Sorry I'm late. – Where have you ",
          after: "? – At the dentist.",
          answer: "been",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation: "Isso! “Where have you been?” = “Onde você esteve?”",
          correction: "A resposta é **been**: a pessoa já voltou.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu nunca estive na Ásia.",
          answer: ["I", "have", "never", "been", "to", "Asia"],
          bank: ["I", "have", "never", "been", "to", "Asia", "gone", "went"],
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation: "Muito bem! “I have never been to Asia.”",
          correction: "O certo é **I have never been to Asia.** Experiência → been to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's been to the doctor.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm149S9.mp3"),
          options: [
            "She's gone to the doctor.",
            "She went to the doctor.",
            "She's been to the doctor.",
          ],
          correctAnswer: "She's been to the doctor.",
          hint: "Escute **been** (já voltou) ou **gone** (ainda está lá).",
          explanation:
            "Perfeito! “She's been to the doctor” = “Ela foi ao médico (e já voltou).”",
          correction:
            "A frase é **She's been to the doctor.** Use o botão 0.5× para ouvir “been”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Dad isn't home yet. He's ",
          after: " to work.",
          options: ["been", "gone", "go"],
          correctAnswer: "gone",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation:
            "Mandou bem! “He's gone to work” = “Ele foi trabalhar (ainda não voltou).” Lição completa! 🎉",
          correction: "Quase lá! Ainda não voltou → **gone.**",
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
