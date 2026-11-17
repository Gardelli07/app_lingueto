import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 7 (Negatives): I'm not · isn't · aren't +
// verbo-ing. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O
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
          after: " working today.",
          options: ["am not", "isn't", "aren't"],
          correctAnswer: "am not",
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation:
            "Isso aí! “I am not working today” = “Eu não estou trabalhando hoje.”",
          correction: "Quase! Com “I”, a negativa é **am not.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela não está ouvindo.",
          answer: ["She", "isn't", "listening"],
          bank: ["listening", "She", "isn't", "aren't", "listen", "don't"],
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation: "Perfeito! “She isn't listening” = “Ela não está ouvindo.”",
          correction: "O certo é **She isn't listening.** She → isn't + listening.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They aren't watching TV.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm49S3.mp3"),
          options: [
            "They are watching TV.",
            "They aren't watching TV.",
            "We aren't watching TV.",
          ],
          correctAnswer: "They aren't watching TV.",
          hint: "Escute se tem **aren't** e se é **They** ou **We**.",
          explanation:
            "Ótimo ouvido! “They aren't watching TV” = “Eles não estão assistindo TV.”",
          correction:
            "A frase é **They aren't watching TV.** Use o botão 0.5× para ouvir o “n't”.",
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
            ["I'm not sleeping", "Eu não estou dormindo"],
            ["He isn't working", "Ele não está trabalhando"],
            ["We aren't eating", "Nós não estamos comendo"],
            ["It isn't raining", "Não está chovendo"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **I'm not** = eu não estou · **isn't** = não está · **aren't** = não estamos / não estão.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He is ",
          after: " studying. He's playing.",
          answer: "not",
          hint: "Qual palavra deixa a frase negativa?",
          explanation: "Isso! “He is not studying” = “Ele não está estudando.”",
          correction: "A palavra certa é **not**: is not = isn't.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " going to the beach today.",
          options: ["not", "isn't", "aren't"],
          correctAnswer: "aren't",
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation:
            "Mandou bem! “We aren't going to the beach today” = “Nós não vamos à praia hoje.”",
          correction: "Quase! Com “we”, a negativa é **aren't.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não estou brincando!",
          answer: ["I'm", "not", "joking"],
          bank: ["joking", "not", "I'm", "don't", "am", "isn't"],
          hint: "Com I: **I'm not + verbo-ing**. Não use don't.",
          explanation: "Muito bem! “I'm not joking!” = “Eu não estou brincando!”",
          correction: "O certo é **I'm not joking!** Com I, a negativa é I'm not.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It isn't ",
          after: " (snow).",
          answer: "snowing",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “It isn't snowing” = “Não está nevando.”",
          correction: "A resposta é **snowing**: snow + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She isn't wearing a jacket.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm49S9.mp3"),
          options: [
            "She is wearing a jacket.",
            "He isn't wearing a jacket.",
            "She isn't wearing a jacket.",
          ],
          correctAnswer: "She isn't wearing a jacket.",
          hint: "Escute **isn't** ou **is**, e **She** ou **He**.",
          explanation:
            "Perfeito! “She isn't wearing a jacket” = “Ela não está usando jaqueta.”",
          correction:
            "A frase é **She isn't wearing a jacket.** Use o botão 0.5× para ouvir “isn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The kids ",
          after: " sleeping. They're playing!",
          options: ["isn't", "aren't", "don't"],
          correctAnswer: "aren't",
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation:
            "Mandou bem! “The kids aren't sleeping” = “As crianças não estão dormindo.” Lição completa! 🎉",
          correction:
            "Quase lá! The kids = they → **aren't.** Don't não combina com -ing.",
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
