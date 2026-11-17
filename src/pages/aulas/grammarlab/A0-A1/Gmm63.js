import createLessonScreen from "../../LessonScreen";

// Present simple, aula 5 (Have / Has): I / you / we / they have · he / she /
// it has. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " two brothers.",
          options: ["has", "have", "haves"],
          correctAnswer: "have",
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation: "Isso aí! “I have two brothers” = “Eu tenho dois irmãos.”",
          correction: "Quase! Com “I” usamos **have.**",
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
            ["I have", "Eu tenho"],
            ["She has", "Ela tem"],
            ["We have", "Nós temos"],
            ["It has", "Tem (coisa ou animal)"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **have** com I / we · **has** com she / it.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She ",
          after: " a beautiful house.",
          answer: "has",
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation: "Isso! “She has a beautiful house” = “Ela tem uma casa linda.”",
          correction: "A palavra certa é **has**: com she, have vira has.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He has a new car.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm63S4.mp3"),
          options: ["He has a new car.", "He has a blue car.", "We have a new car."],
          correctAnswer: "He has a new car.",
          hint: "Escute **He has** ou **We have**, e **new** (novo) ou **blue** (azul).",
          explanation: "Ótimo ouvido! “He has a new car” = “Ele tem um carro novo.”",
          correction:
            "A frase é **He has a new car.** Use o botão 0.5× para ouvir “new”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós temos um cachorro.",
          answer: ["We", "have", "a", "dog"],
          bank: ["have", "a", "We", "dog", "has", "They"],
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation: "Perfeito! “We have a dog” = “Nós temos um cachorro.”",
          correction: "O certo é **We have a dog.** Com we, use have.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My sister ",
          after: " long hair.",
          options: ["has", "have", "haves"],
          correctAnswer: "has",
          hint: "My sister = she → **has**.",
          explanation:
            "Mandou bem! “My sister has long hair” = “Minha irmã tem cabelo comprido.”",
          correction: "Quase! My sister = she → **has.**",
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
          after: " breakfast at 7.",
          answer: "have",
          hint: "**have breakfast** = tomar café da manhã. Com they → **have**.",
          explanation:
            "Isso! “They have breakfast at 7” = “Eles tomam café da manhã às 7.”",
          correction: "A resposta é **have**: they → have.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O meu gato tem olhos verdes.",
          answer: ["My", "cat", "has", "green", "eyes"],
          bank: ["has", "green", "My", "eyes", "cat", "have"],
          hint: "My cat = it → **has**. A cor vem antes: **green eyes**.",
          explanation:
            "Muito bem! “My cat has green eyes” = “Meu gato tem olhos verdes.”",
          correction:
            "O certo é **My cat has green eyes.** It → has, e a cor vem antes de eyes.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We have English class on Monday.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm63S9.mp3"),
          options: [
            "He has English class on Monday.",
            "We have English class on Friday.",
            "We have English class on Monday.",
          ],
          correctAnswer: "We have English class on Monday.",
          hint: "Escute **We have** ou **He has**, e o dia: **Monday** ou **Friday**.",
          explanation:
            "Perfeito! “We have English class on Monday” = “Nós temos aula de inglês na segunda.”",
          correction:
            "A frase é **We have English class on Monday.** Use o botão 0.5× para ouvir o dia.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Paulo ",
          after: " lunch at noon.",
          options: ["have", "has", "haves"],
          correctAnswer: "has",
          hint: "Paulo = he → **has**. (have lunch = almoçar)",
          explanation:
            "Mandou bem! “Paulo has lunch at noon” = “O Paulo almoça ao meio-dia.” Lição completa! 🎉",
          correction: "Quase lá! Paulo = he → **has lunch.**",
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
