import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 8 (Wh-questions): Where / How old / What + be. Os 5 tipos
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
          before: "",
          after: " is Lucas? – He's at school.",
          options: ["What", "Where", "How old"],
          correctAnswer: "Where",
          hint:
            "**Where** = onde · **What** = o que / qual · **How old** = quantos anos.",
          explanation: "Isso aí! “Where is Lucas?” = “Onde está o Lucas?”",
          correction:
            "Quase! A resposta é um lugar, então a pergunta usa Where: **Where is Lucas?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Quantos anos você tem?",
          answer: ["How", "old", "are", "you"],
          bank: ["you", "old", "Where", "How", "is", "are"],
          hint:
            "Para perguntar a idade, use **How old + be**. Em inglês não usamos “have”.",
          explanation: "Perfeito! “How old are you?” = “Quantos anos você tem?”",
          correction:
            "O certo é **How old are you?** Depois de “How old” vem o verbo be (are) e depois o sujeito.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What is your name?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm101S3.mp3"),
          options: ["What is your name?", "Where is your name?", "What is her name?"],
          correctAnswer: "What is your name?",
          hint: "Escute o começo (**What** ou **Where**) e o meio (**your** ou **her**).",
          explanation: "Ótimo ouvido! “What is your name?” = “Qual é o seu nome?”",
          correction:
            "A frase é **What is your name?** Use o botão 0.5× para ouvir “What” e “your”.",
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
            ["Where", "Onde"],
            ["How old", "Quantos anos"],
            ["What", "O que / Qual"],
            ["How", "Como"],
          ],
          rightOrder: [2, 3, 0, 1],
          instruction: "Tap a question word, then its translation.",
          hint: "**How** sozinho = como. **How old** = quantos anos.",
          explanation: "Mandou bem! Todas as palavras de pergunta certas.",
          correction:
            "Esse par não combina. **Where** = onde, **What** = o que / qual, **How** = como, **How old** = quantos anos.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " my keys?",
          answer: "are",
          hint: "My keys são várias chaves, como **they**.",
          explanation: "Isso! “Where are my keys?” = “Onde estão as minhas chaves?”",
          correction: "A palavra certa é **are**: Where are my keys? Plural usa “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " is your phone number?",
          options: ["Where", "How old", "What"],
          correctAnswer: "What",
          hint: "Para pedir uma informação (nome, número, cor), use **What**.",
          explanation:
            "Mandou bem! “What is your phone number?” = “Qual é o seu número de telefone?”",
          correction:
            "Quase! Para perguntar “qual é” usamos What: **What is your phone number?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde estão as crianças?",
          answer: ["Where", "are", "the", "children"],
          bank: ["the", "are", "What", "children", "is", "Where"],
          hint: "“Onde” = **Where**. The children é plural, então use **are**.",
          explanation: "Muito bem! “Where are the children?” = “Onde estão as crianças?”",
          correction:
            "O certo é **Where are the children?** “Children” é plural e leva “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "How old is your sister?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm101S8.mp3"),
          options: [
            "How is your sister?",
            "How old is your brother?",
            "How old is your sister?",
          ],
          correctAnswer: "How old is your sister?",
          hint:
            "Escute se tem **old** depois de How, e o final: **sister** ou **brother**.",
          explanation:
            "Perfeito! “How old is your sister?” = “Quantos anos a sua irmã tem?”",
          correction:
            "A frase é **How old is your sister?** Use o botão 0.5× para ouvir “old” e “sister”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How old ",
          after: " you? – I'm 15.",
          answer: "are",
          hint: "**You** combina com **are**, também em perguntas com How old.",
          explanation: "Isso! “How old are you?” = “Quantos anos você tem?”",
          correction: "A resposta é **are**: How old are you? Com “you”, sempre “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Where ",
          after: " your parents from?",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "Your parents = eles (they). Qual verbo combina?",
          explanation:
            "Mandou bem! “Where are your parents from?” = “De onde são os seus pais?” Lição completa! 🎉",
          correction:
            "Quase lá! “Your parents” é plural, então usamos are: **Where are your parents from?**",
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
