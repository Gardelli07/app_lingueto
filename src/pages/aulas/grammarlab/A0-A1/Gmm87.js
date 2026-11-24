import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 10 (Review): Revisão: uma mistura das aulas 1 a
// 9. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e
// o XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto
// do acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " a dog in the garden.",
          options: ["are", "is", "am"],
          correctAnswer: "is",
          hint: "Uma coisa → **There is** · duas ou mais → **There are**.",
          explanation:
            "Isso aí! “There is a dog in the garden” = “Tem um cachorro no jardim.”",
          correction: "Quase! Um cachorro só → **There is.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem três quartos na casa.",
          answer: ["There", "are", "three", "bedrooms", "in", "the", "house"],
          bank: ["bedrooms", "three", "There", "the", "are", "in", "is", "house"],
          hint: "Uma coisa → **There is** · duas ou mais → **There are**.",
          explanation:
            "Perfeito! “There are three bedrooms in the house” = “Tem três quartos na casa.”",
          correction:
            "O certo é **There are three bedrooms in the house.** Três quartos → there are.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is there any coffee?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm87S3.mp3"),
          options: [
            "Is there any coffee?",
            "There is some coffee.",
            "Is there any toffee?",
          ],
          correctAnswer: "Is there any coffee?",
          hint:
            "Escute o começo (**Is there** = pergunta) e o final: **coffee** (café) ou **toffee** (bala).",
          explanation: "Ótimo ouvido! “Is there any coffee?” = “Tem café?”",
          correction:
            "A frase é **Is there any coffee?** Ela começa com “Is there”, então é pergunta.",
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
            ["There is", "Tem (um)"],
            ["There are", "Tem (vários)"],
            ["There isn't", "Não tem (um)"],
            ["There aren't", "Não tem (vários)"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**is / isn't** = um · **are / aren't** = vários.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **is** = um · **are** = vários · **n't** = negativa.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There aren't ",
          after: " buses today.",
          answer: "any",
          hint: "Negativa: **There isn't** (uma coisa) · **There aren't any** (várias).",
          explanation: "Isso! “There aren't any buses today” = “Não tem ônibus hoje.”",
          correction: "A palavra certa é **any**: na negativa, use any.",
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
          after: " there any windows in the room?",
          options: ["Am", "Is", "Are"],
          correctAnswer: "Are",
          hint: "Pergunta: **troque a ordem** → Is there…? / Are there…?",
          explanation:
            "Mandou bem! “Are there any windows in the room?” = “Tem janelas no quarto?”",
          correction: "Quase! Windows é plural → **Are there…?**",
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
          after: " students are there?",
          answer: "many",
          hint: "**How many** (quantos) + **palavra no plural** + **are there?**",
          explanation: "Isso! “How many students are there?” = “Quantos alunos tem?”",
          correction: "A resposta é **many**: How many = quantos.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um ovo? Sim, tem.",
          answer: ["Yes,", "there", "is"],
          bank: ["there", "is", "No,", "Yes,", "there's", "are"],
          instruction: "Build the short answer.",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Muito bem! “Yes, there is” = “Sim, tem.”",
          correction: "O certo é **Yes, there is.** Um ovo → is, sem contração no final.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There aren't any trees in my street.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm87S9.mp3"),
          options: [
            "There are some trees in my street.",
            "There aren't any trees in my street.",
            "There aren't any trees in my garden.",
          ],
          correctAnswer: "There aren't any trees in my street.",
          hint:
            "Escute **aren't any** ou **are some**, e o final: **street** (rua) ou **garden** (jardim).",
          explanation:
            "Perfeito! “There aren't any trees in my street” = “Não tem árvores na minha rua.”",
          correction:
            "A frase é **There aren't any trees in my street.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " some milk in the fridge.",
          options: ["are", "is", "am"],
          correctAnswer: "is",
          hint:
            "Coisas que não dá para contar (milk, water, rice, bread, sugar) usam **There is**.",
          explanation:
            "Mandou bem! “There is some milk in the fridge” = “Tem leite na geladeira.” Você terminou There is / There are! 🎉",
          correction: "Quase lá! Milk não se conta → **There is some milk.**",
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
