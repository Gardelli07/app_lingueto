import createLessonScreen from "../../LessonScreen";

// I am / You are, com os 5 tipos do Grammar Lab alternados. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " Brazilian.",
          options: ["am", "is", "are"],
          correctAnswer: "am",
          hint: "Com **I** (eu), usamos sempre **am**.",
          explanation: 'Isso aí! "I am Brazilian" = "Eu sou brasileiro."',
          correction: "Quase! Com **I** usamos sempre **am**: **I am Brazilian.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você é brasileiro.",
          answer: ["You", "are", "Brazilian"],
          bank: ["Brazilian", "am", "You", "I", "are"],
          hint: '"Você" em inglês é **You**, e com **You** usamos **are**.',
          explanation: 'Perfeito! "You are" = "Você é".',
          correction:
            'Não foi dessa vez. O certo é **You are Brazilian.** Com "You" usamos "are", nunca "am".',
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I am happy.",
          options: ["I am happy.", "You are happy.", "I am hungry."],
          correctAnswer: "I am happy.",
          hint: 'Preste atenção no começo da frase: é **I am** ou **You are**?',
          explanation: 'Ótimo ouvido! "I am happy" = "Eu estou feliz."',
          correction:
            'Ouça de novo: a frase é **I am happy.** "Happy" (feliz) é diferente de "hungry" (com fome).',
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
            ["I am", "Eu sou"],
            ["You are", "Você é"],
            ["I am tired", "Eu estou cansado"],
            ["You are late", "Você está atrasado"],
          ],
          rightOrder: [2, 0, 3, 1],
          hint: 'Forme os pares, um de cada vez. Lembre: **am** e **are** podem ser "ser" ou "estar".',
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            'Esse par não combina. **I am** = Eu sou/estou, **You are** = Você é/está.',
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "You ",
          after: " a good student.",
          answer: "are",
          hint: 'Qual verbo combina com **You**?',
          explanation: 'Isso! "You are a good student" = "Você é um bom aluno."',
          correction: "A palavra certa é **are**: You are a good student.",
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
            ["I am Brazilian", "Eu sou brasileiro"],
            ["You are ready", "Você está pronto"],
            ["I am at home", "Eu estou em casa"],
            ["You are a student", "Você é estudante"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: 'Olhe primeiro para **I** ou **You**, depois para a palavra final.',
          explanation: "Excelente! Você já entende frases completas.",
          correction: 'Ops! Confira o sujeito: **I** é "Eu" e **You** é "Você".',
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu sou estudante.",
          answer: ["I", "am", "a", "student"],
          bank: ["student", "are", "I", "a", "you", "am"],
          hint: 'Em inglês, profissões levam **a** antes: "a student".',
          explanation: 'Muito bem! "I am a student" = "Eu sou estudante."',
          correction: 'O certo é **I am a student.** Não esqueça o "a" antes da profissão.',
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You are a teacher.",
          options: ["I am a teacher.", "You are a teacher.", "You are at the theater."],
          correctAnswer: "You are a teacher.",
          hint: 'Ouça com atenção: **teacher** (professor) soa parecido com **theater** (teatro).',
          explanation: 'Perfeito! "You are a teacher" = "Você é professor."',
          correction: "A frase é **You are a teacher.** Use o botão 0.5× para ouvir mais devagar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I ",
          after: " 20 years old.",
          answer: "am",
          hint: 'Em inglês, idade usa o verbo **to be**, não "have" (ter).',
          explanation: 'Isso! "I am 20 years old" = "Eu tenho 20 anos."',
          correction:
            'A resposta é **am**: I am 20 years old. Em inglês a gente "é" a idade, não "tem".',
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
          after: " am from São Paulo.",
          options: ["You", "I", "We"],
          correctAnswer: "I",
          hint: 'Qual palavra combina com **am**?',
          explanation: 'Mandou bem! "I am from São Paulo" = "Eu sou de São Paulo." Lição completa! 🎉',
          correction: 'Quase lá! Só **I** combina com **am**: **I am from São Paulo.**',
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
