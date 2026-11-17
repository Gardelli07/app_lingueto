import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 3 (You / We / They are): you, we, they → are +
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
          before: "They ",
          after: " playing video games.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "you, we, they → **are + verbo-ing**: They are playing.",
          explanation:
            "Isso aí! “They are playing video games” = “Eles estão jogando videogame.”",
          correction: "Quase! Com “they”, usamos **are.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós estamos estudando inglês.",
          answer: ["We", "are", "studying", "English"],
          bank: ["studying", "English", "We", "are", "is", "study"],
          hint: "you, we, they → **are + verbo-ing**: They are playing.",
          explanation:
            "Perfeito! “We are studying English” = “Nós estamos estudando inglês.”",
          correction: "O certo é **We are studying English.** We + are + studying.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You are doing great!",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm45S3.mp3"),
          options: [
            "You are doing great!",
            "We are doing great!",
            "You are looking great!",
          ],
          correctAnswer: "You are doing great!",
          hint: "Escute **You** ou **We**, e **doing** ou **looking**.",
          explanation:
            "Ótimo ouvido! “You are doing great!” = “Você está indo muito bem!”",
          correction:
            "A frase é **You are doing great!** Use o botão 0.5× para ouvir “doing”.",
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
            ["We are eating", "Nós estamos comendo"],
            ["They are working", "Eles estão trabalhando"],
            ["You are learning", "Você está aprendendo"],
            ["The kids are playing", "As crianças estão brincando"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Comece pelo sujeito: **We**, **They**, **You** ou **The kids**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **eating** = comendo · **working** = trabalhando · **learning** = aprendendo · **playing** = brincando.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My friends ",
          after: " waiting for me.",
          answer: "are",
          hint: "My friends = they → **are**.",
          explanation:
            "Isso! “My friends are waiting for me” = “Meus amigos estão me esperando.”",
          correction: "A palavra certa é **are**: my friends = they.",
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
          after: " watching a movie.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "you, we, they → **are + verbo-ing**: They are playing.",
          explanation:
            "Mandou bem! “We are watching a movie” = “Nós estamos assistindo um filme.”",
          correction: "Quase! Com “we”, usamos **are.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They are ",
          after: " (talk) about the game.",
          answer: "talking",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation:
            "Isso! “They are talking about the game” = “Eles estão falando sobre o jogo.”",
          correction: "A resposta é **talking**: talk + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os alunos estão escrevendo.",
          answer: ["The", "students", "are", "writing"],
          bank: ["writing", "are", "The", "students", "is", "write"],
          hint: "The students = they → **are writing**.",
          explanation:
            "Muito bem! “The students are writing” = “Os alunos estão escrevendo.”",
          correction: "O certo é **The students are writing.** Plural → are.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We are having lunch.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm45S9.mp3"),
          options: ["We have lunch.", "We are having lunch.", "They are having lunch."],
          correctAnswer: "We are having lunch.",
          hint: "Escute **We** ou **They**, e **are having** ou **have**.",
          explanation: "Perfeito! “We are having lunch” = “Nós estamos almoçando.”",
          correction:
            "A frase é **We are having lunch.** Use o botão 0.5× para ouvir “are having”.",
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
          after: " traveling this week.",
          options: ["are", "is", "am"],
          correctAnswer: "are",
          hint: "My parents = they → **are**.",
          explanation:
            "Mandou bem! “My parents are traveling this week” = “Meus pais estão viajando esta semana.” Lição completa! 🎉",
          correction: "Quase lá! My parents = they → **are.**",
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
