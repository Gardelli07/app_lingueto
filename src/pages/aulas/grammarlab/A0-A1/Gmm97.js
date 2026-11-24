import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 4 (Contractions): Contrações: I'm, you're, he's, she's,
// it's, we're, they're. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " a teacher.",
          options: ["Shes", "She's", "She're"],
          correctAnswer: "She's",
          instruction: "Choose the short form of “She is”.",
          hint: "She is vira **She's**: o apóstrofo entra no lugar do “i”.",
          explanation: "Isso aí! “She's a teacher” = “Ela é professora.”",
          correction: "Quase! “She is” vira She's, com apóstrofo: **She's a teacher.**",
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
            ["I am", "I'm"],
            ["You are", "You're"],
            ["He is", "He's"],
            ["They are", "They're"],
          ],
          rightOrder: [3, 0, 1, 2],
          instruction: "Tap the full form, then its short form.",
          hint: "**am** vira **'m**, **is** vira **'s** e **are** vira **'re**.",
          explanation: "Mandou bem! Todas as contrações certas.",
          correction: "Esse par não combina. am → **'m** · is → **'s** · are → **'re**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's my friend.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm97S3.mp3"),
          options: ["She's my friend.", "He's my friend.", "She's a friend."],
          correctAnswer: "She's my friend.",
          hint:
            "“**He's**” e “**She's**” soam parecidos. Escute se tem o som de “sh” no começo.",
          explanation: "Ótimo ouvido! “She's my friend” = “Ela é minha amiga.”",
          correction:
            "A frase é **She's my friend.** Use o botão 0.5× para ouvir o “sh” de “She's”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós estamos atrasados.",
          answer: ["We're", "late"],
          bank: ["late", "They're", "is", "We're", "You're"],
          instruction: "Translate it using the short form.",
          hint: "“Nós estamos” = We are = **We're**.",
          explanation: "Perfeito! “We're late” = “Nós estamos atrasados.”",
          correction: "O certo é **We're late.** “We're” = we are = nós estamos.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "You're = You ",
          after: ".",
          answer: "are",
          hint: "O **'re** da contração vem de qual verbo?",
          explanation: "Isso! “You're” é a forma curta de “You are”.",
          correction:
            "A resposta é **are**: You're = You are. O “'re” sempre vem de “are”.",
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
          after: " at home now.",
          options: ["Their", "They're", "There"],
          correctAnswer: "They're",
          hint: "**They're** = they are (eles estão). **Their** = deles. **There** = lá.",
          explanation: "Mandou bem! “They're at home now” = “Eles estão em casa agora.”",
          correction:
            "Quase! Aqui precisamos de “they are”: **They're at home now.** “Their” = deles e “there” = lá.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele é meu irmão.",
          answer: ["He's", "my", "brother"],
          bank: ["brother", "She's", "my", "He's", "is", "his"],
          hint: "“Ele é” = He is = **He's**.",
          explanation: "Muito bem! “He's my brother” = “Ele é meu irmão.”",
          correction: "O certo é **He's my brother.** “He's” = ele é; “She's” = ela é.",
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
            ["It's cold", "Está frio"],
            ["I'm tired", "Estou cansado"],
            ["You're late", "Você está atrasado"],
            ["We're friends", "Somos amigos"],
          ],
          rightOrder: [2, 3, 0, 1],
          hint:
            "Olhe a contração: **I'm** = eu, **You're** = você, **We're** = nós, **It's** = coisa ou clima.",
          explanation: "Excelente! Você já entende frases com contração.",
          correction:
            "Ops! Confira a contração: **I'm** = eu estou, **You're** = você está, **We're** = nós somos.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They're at school.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm97S9.mp3"),
          options: ["We're at school.", "They're at home.", "They're at school."],
          correctAnswer: "They're at school.",
          hint:
            "Ouça o começo (**They're** ou **We're**) e o final (**school** ou **home**).",
          explanation: "Perfeito! “They're at school” = “Eles estão na escola.”",
          correction:
            "A frase é **They're at school.** Escute o começo e o final com o botão 0.5×.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It's = It ",
          after: ".",
          answer: "is",
          hint: "O **'s** da contração vem de qual verbo?",
          explanation: "Isso! “It's” = “It is”. Lição completa! 🎉",
          correction:
            "A resposta é **is**: It's = It is. Depois de he, she e it, o “'s” vem de “is”.",
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
