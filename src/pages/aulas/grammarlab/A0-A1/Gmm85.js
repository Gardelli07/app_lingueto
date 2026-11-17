import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 8 (How many…?): How many + plural + are there? ·
// respostas com there is / there are. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " students are there?",
          options: ["How much", "How many", "How old"],
          correctAnswer: "How many",
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation: "Isso aí! “How many students are there?” = “Quantos alunos tem?”",
          correction: "Quase! Para perguntar “quantos”, usamos **How many.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Quantos quartos tem na sua casa?",
          answer: ["How", "many", "bedrooms", "are", "there", "in", "your", "house"],
          bank: [
            "bedrooms",
            "How",
            "there",
            "in",
            "many",
            "your",
            "are",
            "is",
            "house",
            "much",
          ],
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation:
            "Perfeito! “How many bedrooms are there in your house?” = “Quantos quartos tem na sua casa?”",
          correction:
            "O certo é **How many bedrooms are there in your house?** Ordem: How many + bedrooms + are there.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "How many cats are there?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm85S3.mp3"),
          options: [
            "How many cats are there?",
            "How many cars are there?",
            "Are there any cats?",
          ],
          correctAnswer: "How many cats are there?",
          hint: "Escute o começo (**How many** ou **Are there**) e **cats** ou **cars**.",
          explanation: "Ótimo ouvido! “How many cats are there?” = “Quantos gatos tem?”",
          correction:
            "A frase é **How many cats are there?** Use o botão 0.5× para ouvir “cats”.",
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
            ["How many…?", "Quantos / quantas…?"],
            ["There is one.", "Tem um."],
            ["There are two.", "Tem dois."],
            ["There aren't any.", "Não tem nenhum."],
          ],
          rightOrder: [2, 3, 0, 1],
          hint: "one → **there is** · two ou mais → **there are**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **There is one** = tem um · **There are two** = tem dois · **There aren't any** = não tem nenhum.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How many people ",
          after: " there in your family?",
          answer: "are",
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation:
            "Isso! “How many people are there in your family?” = “Quantas pessoas tem na sua família?”",
          correction: "A palavra certa é **are**: How many … are there?",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "How many ",
          after: " are there in the box?",
          options: ["apples", "apple", "an apple"],
          correctAnswer: "apples",
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation:
            "Mandou bem! “How many apples are there in the box?” = “Quantas maçãs tem na caixa?”",
          correction: "Quase! Depois de How many, use o plural: **apples.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem quatro pessoas na minha família.",
          answer: ["There", "are", "four", "people", "in", "my", "family"],
          bank: ["people", "four", "There", "my", "are", "in", "is", "family"],
          hint: "Quatro pessoas → **There are four people**.",
          explanation:
            "Muito bem! “There are four people in my family” = “Tem quatro pessoas na minha família.”",
          correction:
            "O certo é **There are four people in my family.** Plural → there are.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How ",
          after: " chairs are there?",
          answer: "many",
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation: "Isso! “How many chairs are there?” = “Quantas cadeiras tem?”",
          correction: "A resposta é **many**: How many = quantos / quantas.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There are twelve months in a year.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm85S9.mp3"),
          options: [
            "There are twelve weeks in a year.",
            "There are twelve months in a year.",
            "There are twenty months in a year.",
          ],
          correctAnswer: "There are twelve months in a year.",
          hint:
            "Escute o número (**twelve** = 12 ou **twenty** = 20) e **months** (meses) ou **weeks** (semanas).",
          explanation:
            "Perfeito! “There are twelve months in a year” = “Tem doze meses em um ano.”",
          correction:
            "A frase é **There are twelve months in a year.** Use o botão 0.5× para ouvir “twelve months”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "How many days are there in a week? – There ",
          after: " seven.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "Sete dias → plural → **There are**.",
          explanation: "Mandou bem! “There are seven” = “Tem sete.” Lição completa! 🎉",
          correction: "Quase lá! Sete é plural → **There are seven.**",
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
