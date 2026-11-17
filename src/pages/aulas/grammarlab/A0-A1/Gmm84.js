import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 7 (Short answers): Yes, there is. / No, there
// isn't. · Yes, there are. / No, there aren't. Os 5 tipos do Grammar Lab
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
          before: "Is there a pool? – Yes, there ",
          after: ".",
          options: ["is", "are", "isn't"],
          correctAnswer: "is",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Isso aí! “Yes, there is” = “Sim, tem.”",
          correction:
            "Quase! A pergunta usa “is”, e a resposta é sim: **Yes, there is.**",
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
            ["Yes, there is.", "Sim, tem (um)."],
            ["Yes, there are.", "Sim, tem (vários)."],
            ["No, there isn't.", "Não, não tem (um)."],
            ["No, there aren't.", "Não, não tem (vários)."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**is / isn't** = uma coisa · **are / aren't** = várias.",
          explanation: "Mandou bem! Todas as respostas certas.",
          correction:
            "Esse par não combina. **is / isn't** = um · **are / aren't** = vários.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, there aren't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm84S3.mp3"),
          options: ["No, there isn't.", "No, there aren't.", "Yes, there are."],
          correctAnswer: "No, there aren't.",
          hint:
            "Escute o começo (**Yes** ou **No**) e o final (**isn't** ou **aren't**).",
          explanation: "Ótimo ouvido! “No, there aren't” = “Não, não tem.”",
          correction:
            "A frase é **No, there aren't.** Use o botão 0.5× para ouvir “aren't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Are there any chairs? – Yes, there ",
          after: ".",
          answer: "are",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Isso! “Yes, there are” = “Sim, tem.”",
          correction:
            "A palavra certa é **are**: a pergunta usa “are”, então a resposta também.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um banheiro? Não, não tem.",
          answer: ["No,", "there", "isn't"],
          bank: ["isn't", "there", "Yes,", "No,", "aren't", "is"],
          instruction: "Build the short answer.",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Perfeito! “No, there isn't” = “Não, não tem.”",
          correction: "O certo é **No, there isn't.** Um banheiro → isn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are there any eggs? – No, there ",
          after: ".",
          options: ["isn't", "aren't", "are"],
          correctAnswer: "aren't",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Mandou bem! “No, there aren't” = “Não, não tem.”",
          correction:
            "Quase! A pergunta usa “are” e a resposta é não: **No, there aren't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Is there a park here? – Yes, there ",
          after: ".",
          answer: "is",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation: "Isso! “Yes, there is” = “Sim, tem.”",
          correction: "A resposta é **is**: a pergunta usa “is”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem livros? Sim, tem.",
          answer: ["Yes,", "there", "are"],
          bank: ["are", "Yes,", "there", "No,", "is", "there's"],
          instruction: "Build the short answer.",
          hint: "Livros = vários → **are**. Na resposta curta com Yes, não use there's.",
          explanation: "Muito bem! “Yes, there are” = “Sim, tem.”",
          correction: "O certo é **Yes, there are.** Livros é plural → are.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Yes, there is.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm84S9.mp3"),
          options: ["Yes, there are.", "No, there isn't.", "Yes, there is."],
          correctAnswer: "Yes, there is.",
          hint: "Escute o começo (**Yes** ou **No**) e o final (**is** ou **are**).",
          explanation: "Perfeito! “Yes, there is” = “Sim, tem.”",
          correction: "A frase é **Yes, there is.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is there any juice? – No, there ",
          after: ".",
          options: ["aren't", "isn't", "is"],
          correctAnswer: "isn't",
          hint:
            "Na resposta curta, **repita o verbo da pergunta**: Is there…? → Yes, there is. / No, there isn't.",
          explanation:
            "Mandou bem! “No, there isn't” = “Não, não tem.” Lição completa! 🎉",
          correction:
            "Quase lá! A pergunta usa “is” e a resposta é não: **No, there isn't.**",
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
