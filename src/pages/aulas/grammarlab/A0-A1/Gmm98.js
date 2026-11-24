import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 5 (Negatives): Negativas: am not, isn't (is not), aren't
// (are not). Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
// combo e o XP seguem de um slide para o outro (ComboSlide). `explanation` e
// o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " tired.",
          options: ["aren't", "isn't", "am not"],
          correctAnswer: "isn't",
          hint:
            "Para negar, coloque **not** depois do verbo: is not = **isn't**, are not = **aren't**.",
          explanation: "Isso aí! “He isn't tired” = “Ele não está cansado.”",
          correction: "Quase! Com “He” usamos isn't (is not): **He isn't tired.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não sou médico.",
          answer: ["I", "am", "not", "a", "doctor"],
          bank: ["not", "a", "I", "isn't", "doctor", "am"],
          hint: "Com I, a negativa é **am not**. Não existe “amn't”.",
          explanation: "Perfeito! “I am not a doctor” = “Eu não sou médico.”",
          correction:
            "O certo é **I am not a doctor.** Com “I”, a negativa é sempre “am not”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We aren't hungry.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm98S3.mp3"),
          options: ["We are hungry.", "We aren't angry.", "We aren't hungry."],
          correctAnswer: "We aren't hungry.",
          hint:
            "Escute se tem **aren't** (negativa) e se é **hungry** (com fome) ou **angry** (bravo).",
          explanation: "Ótimo ouvido! “We aren't hungry” = “Nós não estamos com fome.”",
          correction:
            "A frase é **We aren't hungry.** Use o botão 0.5× para ouvir o “n't” no fim de “aren't”.",
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
            ["He isn't sad", "Ele não está triste"],
            ["They aren't here", "Eles não estão aqui"],
            ["I'm not ready", "Eu não estou pronto"],
            ["It isn't cold", "Não está frio"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint: "Olhe o sujeito: **He**, **They**, **I** ou **It**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **isn't** vai com he/she/it, **aren't** com we/you/they e **am not** com I.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I am ",
          after: " hungry.",
          answer: "not",
          hint: "Qual palavra deixa a frase negativa?",
          explanation: "Isso! “I am not hungry” = “Eu não estou com fome.”",
          correction:
            "A palavra certa é **not**: I am not hungry. O “not” vem depois do verbo.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " at school today.",
          options: ["isn't", "not", "aren't"],
          correctAnswer: "aren't",
          hint: "They usa are, então a negativa é **aren't**.",
          explanation:
            "Mandou bem! “They aren't at school today” = “Eles não estão na escola hoje.”",
          correction:
            "Quase! Com “They” usamos aren't (are not): **They aren't at school today.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A pizza não está quente.",
          answer: ["The", "pizza", "isn't", "hot"],
          bank: ["hot", "aren't", "The", "isn't", "pizza", "cold"],
          hint:
            "“A pizza” é uma coisa só, como it. Negativa: **isn't**. “Quente” é **hot**.",
          explanation: "Muito bem! “The pizza isn't hot” = “A pizza não está quente.”",
          correction:
            "O certo é **The pizza isn't hot.** Uma coisa só leva “isn't”, e “cold” significa frio.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It isn't my car.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm98S8.mp3"),
          options: ["It is my car.", "It isn't my car.", "It isn't my cat."],
          correctAnswer: "It isn't my car.",
          hint: "Escute se tem **isn't** e se é **car** (carro) ou **cat** (gato).",
          explanation: "Perfeito! “It isn't my car” = “Não é o meu carro.”",
          correction:
            "A frase é **It isn't my car.** Use o botão 0.5× para ouvir o final: car ou cat.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She is ",
          after: " at home.",
          answer: "not",
          hint: "Para negar, coloque uma palavra depois de is.",
          explanation: "Isso! “She is not at home” = “Ela não está em casa.”",
          correction:
            "A resposta é **not**: She is not at home. É o mesmo que “She isn't at home”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " old.",
          options: ["isn't", "aren't", "am not"],
          correctAnswer: "aren't",
          hint: "My parents = eles (they). Qual negativa combina com they?",
          explanation:
            "Mandou bem! “My parents aren't old” = “Meus pais não são velhos.” Lição completa! 🎉",
          correction:
            "Quase lá! “My parents” = they, então usamos aren't: **My parents aren't old.**",
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
