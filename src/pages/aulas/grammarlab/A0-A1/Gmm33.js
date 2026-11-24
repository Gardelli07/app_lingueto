import createLessonScreen from "../../LessonScreen";

// He / She / It + is, com os 5 tipos do Grammar Lab alternados. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " a teacher.",
          options: ["am", "is", "are"],
          correctAnswer: "is",
          hint: "Com **He**, **She** e **It**, usamos sempre **is**.",
          explanation: "Isso aí! “She is a teacher” = “Ela é professora.”",
          correction: "Quase! Com “She” usamos “is”: **She is a teacher.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele é médico.",
          answer: ["He", "is", "a", "doctor"],
          bank: ["doctor", "She", "is", "a", "He", "are"],
          hint: "“Ele” é **He** e “Ela” é **She**. Não esqueça o **a** antes da profissão.",
          explanation: "Perfeito! “He is a doctor” = “Ele é médico.”",
          correction: "O certo é **He is a doctor.** “He” = ele, “She” = ela.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It is cold.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm33S3.mp3"),
          options: ["It is old.", "He is cold.", "It is cold."],
          correctAnswer: "It is cold.",
          hint: "Ouça o começo (**It** ou **He**) e o final (**cold** ou **old**).",
          explanation: "Ótimo ouvido! “It is cold” = “Está frio.”",
          correction:
            "A frase é **It is cold.** “Cold” (frio) tem o som de “c” no começo; “old” (velho) não.",
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
            ["He is", "Ele é"],
            ["She is", "Ela é"],
            ["It is big", "É grande"],
            ["Lucas is", "Lucas é"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**It** é usado para coisas, animais, clima e horas.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **He** = ele, **She** = ela, **It** = coisa ou animal.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Ana ",
          after: " at school.",
          answer: "is",
          hint: "“Ana” é uma pessoa só, como **She**. Qual verbo combina?",
          explanation: "Isso! “Ana is at school” = “Ana está na escola.”",
          correction:
            "A palavra certa é **is**: Ana is at school. Nome de uma pessoa funciona como “he” ou “she”.",
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
            ["She is happy", "Ela está feliz"],
            ["He is tired", "Ele está cansado"],
            ["It is a dog", "É um cachorro"],
            ["Maria is at home", "Maria está em casa"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "Comece pelo sujeito: **He**, **She**, **It** ou um nome.",
          explanation: "Excelente! Você já reconhece frases inteiras com “is”.",
          correction: "Ops! Confira o sujeito: **She** é ela, **He** é ele e **It** é coisa ou animal.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O gato é pequeno.",
          answer: ["The", "cat", "is", "small"],
          bank: ["small", "is", "big", "The", "are", "cat"],
          hint: "“O gato” é um animal só, então usamos **is**. “Pequeno” é **small**.",
          explanation: "Muito bem! “The cat is small” = “O gato é pequeno.”",
          correction: "O certo é **The cat is small.** Um animal só leva “is”, e “big” significa grande.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He is my friend.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm33S8.mp3"),
          options: ["He is my friend.", "She is my friend.", "He is a friend."],
          correctAnswer: "He is my friend.",
          hint: "**He** e **She** soam parecidos. Escute se tem o som de “sh” no começo.",
          explanation: "Perfeito! “He is my friend” = “Ele é meu amigo.”",
          correction:
            "A frase é **He is my friend.** Use o botão 0.5× para ouvir a diferença entre “He” e “She”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It ",
          after: " 10 o’clock.",
          answer: "is",
          hint: "Para dizer as horas em inglês, usamos **It is**.",
          explanation: "Isso! “It is 10 o’clock” = “São 10 horas.”",
          correction:
            "A resposta é **is**: It is 10 o’clock. Em inglês, as horas sempre começam com “It is”.",
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
          after: " is my mother.",
          options: ["He", "She", "It"],
          correctAnswer: "She",
          hint: "A mãe é uma mulher. Qual palavra significa “ela”?",
          explanation: "Mandou bem! “She is my mother” = “Ela é minha mãe.” Lição completa! 🎉",
          correction:
            "Quase lá! Para mulher usamos “She”: **She is my mother.** “It” é só para coisas e animais.",
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
