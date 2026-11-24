import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 6 (I'm going to): I am going to + verbo normal (plano
// já decidido). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation`
// e o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'm going ",
          after: " visit my grandma on Sunday.",
          options: ["to", "for", "at"],
          correctAnswer: "to",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Isso aí! “I'm going to visit my grandma on Sunday” = “Vou visitar minha avó no domingo.”",
          correction: "Quase! A expressão é **going to + verbo.**",
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
            ["I'm going to eat", "Eu vou comer"],
            ["I'm going to sleep", "Eu vou dormir"],
            ["I'm going to study", "Eu vou estudar"],
            ["I'm going to travel", "Eu vou viajar"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **eat** = comer · **sleep** = dormir · **study** = estudar · **travel** = viajar.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm going to buy a car.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm109S3.mp3"),
          options: [
            "I'm going to buy a card.",
            "I'm going to sell a car.",
            "I'm going to buy a car.",
          ],
          correctAnswer: "I'm going to buy a car.",
          hint: "Escute **buy** (comprar) ou **sell** (vender), e **car** ou **card**.",
          explanation: "Ótimo ouvido! “I'm going to buy a car” = “Vou comprar um carro.”",
          correction:
            "A frase é **I'm going to buy a car.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I am going to ",
          after: " (watch) a movie tonight.",
          answer: "watch",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Isso! “I am going to watch a movie tonight” = “Vou assistir um filme hoje à noite.”",
          correction: "A palavra certa é **watch**: depois de going to, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu vou aprender a dirigir.",
          answer: ["I", "am", "going", "to", "learn", "to", "drive"],
          bank: ["going", "to", "learn", "I", "am", "to", "drive", "will", "learning"],
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Perfeito! “I am going to learn to drive” = “Eu vou aprender a dirigir.”",
          correction:
            "O certo é **I am going to learn to drive.** Am + going to + learn.",
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
          after: " going to cook dinner.",
          options: ["is", "am", "are"],
          correctAnswer: "am",
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation: "Mandou bem! “I am going to cook dinner” = “Vou fazer o jantar.”",
          correction: "Quase! Com “I”: **I am going to.**",
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
          after: " to start a new job next month.",
          answer: "going",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Isso! “I'm going to start a new job next month” = “Vou começar num emprego novo mês que vem.”",
          correction: "A resposta é **going**: I'm going to…",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu vou ligar para o meu pai.",
          answer: ["I'm", "going", "to", "call", "my", "dad"],
          bank: ["going", "to", "I'm", "call", "my", "dad", "calling", "for"],
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Muito bem! “I'm going to call my dad” = “Vou ligar para o meu pai.”",
          correction:
            "O certo é **I'm going to call my dad.** Call não precisa de “to” antes de “my dad”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm going to take a shower.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm109S9.mp3"),
          options: [
            "I'm taking a shower.",
            "I'm going to take a shower.",
            "I'm going to take a show.",
          ],
          correctAnswer: "I'm going to take a shower.",
          hint: "Escute **going to take** (vou tomar) ou **taking** (estou tomando).",
          explanation: "Perfeito! “I'm going to take a shower” = “Vou tomar banho.”",
          correction:
            "A frase é **I'm going to take a shower.** Use o botão 0.5× para ouvir “going to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I'm going to ",
          after: " my room this weekend.",
          options: ["cleaning", "clean", "cleans"],
          correctAnswer: "clean",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Mandou bem! “I'm going to clean my room this weekend” = “Vou arrumar meu quarto neste fim de semana.” Lição completa! 🎉",
          correction: "Quase lá! Depois de going to, verbo normal: **clean.**",
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
  ptToggle: true,
  nextRouteName: "GrammarLab",
  screenName: "GrammarLabA0A1LessonScreen",
});
