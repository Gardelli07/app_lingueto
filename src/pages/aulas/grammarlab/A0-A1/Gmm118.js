import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 15 (Review 2): Revisão: aulas 6 a 13 (going to,
// perguntas, sinais, will × going to, expressões de tempo). Os 5 tipos do
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
          before: "I'm going ",
          after: " study tonight.",
          options: ["to", "for", "at"],
          correctAnswer: "to",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Isso aí! “I'm going to study tonight” = “Vou estudar hoje à noite.”",
          correction: "Quase! **going to + verbo.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela vai comprar um carro.",
          answer: ["She", "is", "going", "to", "buy", "a", "car"],
          bank: ["going", "to", "She", "is", "buy", "a", "car", "are", "buys"],
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation:
            "Perfeito! “She is going to buy a car” = “Ela vai comprar um carro.”",
          correction: "O certo é **She is going to buy a car.** She → is going to.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are you going to call her?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm118S3.mp3"),
          options: [
            "Are you going to call her?",
            "Are you going to call him?",
            "Did you call her?",
          ],
          correctAnswer: "Are you going to call her?",
          hint: "Escute **Are you going to** ou **Did you**, e **her** ou **him**.",
          explanation:
            "Ótimo ouvido! “Are you going to call her?” = “Você vai ligar para ela?”",
          correction:
            "A frase é **Are you going to call her?** Use o botão 0.5× para ouvir o final.",
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
          after: " going to move next year.",
          answer: "are",
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation:
            "Isso! “They are going to move next year” = “Eles vão se mudar ano que vem.”",
          correction: "A palavra certa é **are**: they are going to.",
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
            ["Look at the clouds!", "It's going to rain."],
            ["I've decided!", "I'm going to quit."],
            ["Your bag is heavy.", "I'll help you."],
            ["next week", "semana que vem"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Sinais ou plano → **going to** · oferta → **will** · **next week** = semana que vem.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " going to come. He's sick.",
          options: ["aren't", "isn't", "won't"],
          correctAnswer: "isn't",
          hint: "Negativa: **'m not / isn't / aren't** + going to + verbo normal.",
          explanation: "Mandou bem! “He isn't going to come” = “Ele não vai vir.”",
          correction: "Quase! He → **isn't going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What are you going to ",
          after: " (do) tomorrow?",
          answer: "do",
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Isso! “What are you going to do tomorrow?” = “O que você vai fazer amanhã?”",
          correction: "A resposta é **do**: going to + verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde vocês vão ficar?",
          answer: ["Where", "are", "you", "going", "to", "stay"],
          bank: ["going", "to", "Where", "are", "you", "stay", "is", "will"],
          hint:
            "**What / Where / When** + are you going to + verbo? · **What / When** + will + sujeito + verbo?",
          explanation:
            "Muito bem! “Where are you going to stay?” = “Onde vocês vão ficar?”",
          correction:
            "O certo é **Where are you going to stay?** Where + are + you + going to + stay.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It's going to be a great year.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm118S9.mp3"),
          options: [
            "It was a great year.",
            "It's going to be a great year.",
            "It's going to be a great day.",
          ],
          correctAnswer: "It's going to be a great year.",
          hint: "Escute **going to be** (futuro) ou **was**, e **year** ou **day**.",
          explanation:
            "Perfeito! “It's going to be a great year” = “Vai ser um ano ótimo.”",
          correction:
            "A frase é **It's going to be a great year.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "A: I'm hungry. B: I ",
          after: " make you a sandwich.",
          options: ["am going to", "will", "going"],
          correctAnswer: "will",
          hint:
            "Plano já decidido → **going to** · decisão na hora, oferta ou promessa → **will**.",
          explanation:
            "Mandou bem! “I will make you a sandwich” = “Eu faço um sanduíche para você.” Você terminou will / going to! 🎉",
          correction:
            "Quase lá! Oferta / decisão na hora → **I will make you a sandwich.**",
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
