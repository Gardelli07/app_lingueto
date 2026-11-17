import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 2 (He / She / It is): he, she, it → is +
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
          before: "She ",
          after: " cooking dinner.",
          options: ["am", "is", "are"],
          correctAnswer: "is",
          hint: "he, she, it → **is + verbo-ing**: She is cooking.",
          explanation: "Isso aí! “She is cooking dinner” = “Ela está fazendo o jantar.”",
          correction: "Quase! Com “she”, usamos is: **She is cooking.**",
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
          after: " (play) soccer.",
          answer: "playing",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “He is playing soccer” = “Ele está jogando futebol.”",
          correction: "A palavra certa é **playing**: play + ing.",
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
            ["She is singing", "Ela está cantando"],
            ["He is running", "Ele está correndo"],
            ["It is raining", "Está chovendo"],
            ["Ana is dancing", "A Ana está dançando"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Olhe o verbo: **sing** = cantar, **run** = correr, **rain** = chover, **dance** = dançar.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **singing** = cantando · **running** = correndo · **raining** = chovendo · **dancing** = dançando.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He is reading a book.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm44S4.mp3"),
          options: [
            "He is reading a book.",
            "She is reading a book.",
            "He is reading a letter.",
          ],
          correctAnswer: "He is reading a book.",
          hint:
            "Escute **He** ou **She**, e o final: **book** (livro) ou **letter** (carta).",
          explanation:
            "Ótimo ouvido! “He is reading a book” = “Ele está lendo um livro.”",
          correction:
            "A frase é **He is reading a book.** Use o botão 0.5× para ouvir “He”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A minha mãe está trabalhando.",
          answer: ["My", "mom", "is", "working"],
          bank: ["working", "is", "My", "mom", "are", "works"],
          hint: "My mom = she → **is working**.",
          explanation: "Perfeito! “My mom is working” = “Minha mãe está trabalhando.”",
          correction: "O certo é **My mom is working.** My mom = she → is.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The baby ",
          after: " crying.",
          options: ["is", "are", "am"],
          correctAnswer: "is",
          hint: "The baby = he / she → **is**.",
          explanation: "Mandou bem! “The baby is crying” = “O bebê está chorando.”",
          correction: "Quase! The baby = um só → **is.**",
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
          after: " raining.",
          answer: "is",
          hint: "he, she, it → **is + verbo-ing**: She is cooking.",
          explanation: "Isso! “It is raining” = “Está chovendo.”",
          correction: "A resposta é **is**: It is raining.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O cachorro está dormindo no sofá.",
          answer: ["The", "dog", "is", "sleeping", "on", "the", "sofa"],
          bank: ["sleeping", "the", "The", "is", "dog", "on", "sofa", "sleeps", "are"],
          hint: "The dog = it → **is sleeping**.",
          explanation:
            "Muito bem! “The dog is sleeping on the sofa” = “O cachorro está dormindo no sofá.”",
          correction: "O certo é **The dog is sleeping on the sofa.** The dog = it → is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She is talking on the phone.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm44S9.mp3"),
          options: [
            "She talks on the phone.",
            "He is talking on the phone.",
            "She is talking on the phone.",
          ],
          correctAnswer: "She is talking on the phone.",
          hint: "Escute **She** ou **He**, e **is talking** ou **talks**.",
          explanation:
            "Perfeito! “She is talking on the phone” = “Ela está falando no telefone.”",
          correction:
            "A frase é **She is talking on the phone.** Use o botão 0.5× para ouvir “is talking”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look! Pedro ",
          after: " swimming.",
          options: ["are", "am", "is"],
          correctAnswer: "is",
          hint: "Pedro = he → **is**.",
          explanation:
            "Mandou bem! “Pedro is swimming” = “O Pedro está nadando.” Lição completa! 🎉",
          correction: "Quase lá! Pedro = he → **is swimming.**",
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
