import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 16 (Review 2): Revisão: aulas 8 a 14 (perguntas,
// respostas curtas, now, futuro, simple × continuous, stative verbs). Os 5
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
          before: "",
          after: " you listening to me?",
          options: ["Do", "Are", "Is"],
          correctAnswer: "Are",
          hint: "Pergunta: **troque a ordem** → Are you working? / Is she working?",
          explanation: "Isso aí! “Are you listening to me?” = “Você está me ouvindo?”",
          correction: "Quase! Com -ing, a pergunta usa be: **Are you listening?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que você está fazendo?",
          answer: ["What", "are", "you", "doing"],
          bank: ["doing", "you", "What", "are", "do", "Where"],
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation: "Perfeito! “What are you doing?” = “O que você está fazendo?”",
          correction: "O certo é **What are you doing?** What + are + you + doing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, she isn't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm58S3.mp3"),
          options: ["No, she doesn't.", "No, she isn't.", "Yes, she is."],
          correctAnswer: "No, she isn't.",
          hint: "Escute **Yes** ou **No**, e o final: **isn't** ou **doesn't**.",
          explanation: "Ótimo ouvido! “No, she isn't” = “Não, não está.”",
          correction: "A frase é **No, she isn't.** Use o botão 0.5× para ouvir “isn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Where is she ",
          after: " (go)?",
          answer: "going",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “Where is she going?” = “Aonde ela está indo?”",
          correction: "A palavra certa é **going**: go + ing.",
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
            ["I work every day", "Eu trabalho todo dia"],
            ["I'm working now", "Estou trabalhando agora"],
            ["I'm working tomorrow", "Vou trabalhar amanhã"],
            ["I want to work", "Eu quero trabalhar"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Olhe as pistas: **every day** = rotina · **now** = agora · **tomorrow** = plano · **want** = sem -ing.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **every day** = todo dia · **now** = agora · **tomorrow** = amanhã · **want** = quero.",
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
          after: " my keys. Where are they?",
          options: ["am needing", "need", "needs"],
          correctAnswer: "need",
          hint:
            "Verbos de sentir, querer, saber e ter (**like, love, want, need, know, understand, have** = ter) **não usam -ing**.",
          explanation: "Mandou bem! “I need my keys” = “Eu preciso das minhas chaves.”",
          correction: "Quase! “Need” não usa -ing: **I need.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Is it ",
          after: " (rain)?",
          answer: "raining",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “Is it raining?” = “Está chovendo?”",
          correction: "A resposta é **raining**: rain + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós vamos jantar fora hoje à noite.",
          answer: ["We", "are", "eating", "out", "tonight"],
          bank: ["eating", "out", "We", "are", "tonight", "eat", "do"],
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Muito bem! “We are eating out tonight” = “Nós vamos jantar fora hoje à noite.”",
          correction:
            "O certo é **We are eating out tonight.** Plano combinado → are + eating.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are they coming to the party?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm58S9.mp3"),
          options: [
            "Are they coming to the party?",
            "They are coming to the party.",
            "Are they going to the party?",
          ],
          correctAnswer: "Are they coming to the party?",
          hint: "Escute o começo (**Are they** = pergunta) e **coming** ou **going**.",
          explanation:
            "Perfeito! “Are they coming to the party?” = “Eles vêm para a festa?”",
          correction:
            "A frase é **Are they coming to the party?** Use o botão 0.5× para ouvir “coming”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She usually ",
          after: " the bus, but today she's walking.",
          options: ["takes", "is taking", "take"],
          correctAnswer: "takes",
          hint:
            "**every day / usually / always** → present simple (I work) · **now / at the moment / Look!** → present continuous (I'm working).",
          explanation:
            "Mandou bem! “She usually takes the bus” = “Ela geralmente pega o ônibus.” Você terminou o present continuous! 🎉",
          correction: "Quase lá! “Usually” é rotina → present simple: **she takes.**",
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
