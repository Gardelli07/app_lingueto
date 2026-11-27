import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 15 (Review 1): Revisão: aulas 1 a 7 (am / is / are
// + -ing, ortografia, contrações, negativas). Os 5 tipos do Grammar Lab
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
          before: "She ",
          after: " reading a book.",
          options: ["are", "is", "am"],
          correctAnswer: "is",
          hint:
            "I → **am** · he / she / it → **is** · you / we / they → **are** + verbo-ing.",
          explanation: "Isso aí! “She is reading a book” = “Ela está lendo um livro.”",
          correction: "Quase! Com “she”: **She is reading.**",
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
          after: " (run) in the park.",
          answer: "running",
          hint:
            "Verbos curtos com consoante + vogal + consoante (run, swim, sit): **dobre a última letra** → running, swimming.",
          explanation:
            "Isso! “He is running in the park” = “Ele está correndo no parque.”",
          correction: "A palavra certa é **running**: run dobra o “n”.",
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
            ["make", "making"],
            ["swim", "swimming"],
            ["play", "playing"],
            ["lie", "lying"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its -ing form.",
          hint: "Lembre: tirar o e, dobrar a letra, só -ing, e **-ie → -ying**.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. make → **making** · swim → **swimming** · play → **playing** · lie → **lying**.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós estamos assistindo um filme.",
          answer: ["We", "are", "watching", "a", "movie"],
          bank: ["watching", "a", "We", "are", "movie", "is", "watch"],
          hint:
            "I → **am** · he / she / it → **is** · you / we / they → **are** + verbo-ing.",
          explanation:
            "Perfeito! “We are watching a movie” = “Nós estamos assistindo um filme.”",
          correction: "O certo é **We are watching a movie.** We + are + watching.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I'm not working today.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm57S5.mp3"),
          options: [
            "I'm working today.",
            "I'm not working today.",
            "I'm not walking today.",
          ],
          correctAnswer: "I'm not working today.",
          hint: "Escute se tem **not**, e **working** ou **walking**.",
          explanation:
            "Ótimo ouvido! “I'm not working today” = “Eu não estou trabalhando hoje.”",
          correction:
            "A frase é **I'm not working today.** Use o botão 0.5× para ouvir “not”.",
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
          after: " playing outside.",
          options: ["aren't", "isn't", "not"],
          correctAnswer: "aren't",
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation:
            "Mandou bem! “They aren't playing outside” = “Eles não estão brincando lá fora.”",
          correction: "Quase! Com “they”, a negativa é **aren't.**",
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
          after: " (write) a letter.",
          answer: "writing",
          hint:
            "Verbo terminado em -e: **tire o e** e coloque **-ing** (make → making, write → writing).",
          explanation: "Isso! “I am writing a letter” = “Eu estou escrevendo uma carta.”",
          correction: "A resposta é **writing**: tire o “e” de write.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não está dormindo.",
          answer: ["He", "isn't", "sleeping"],
          bank: ["sleeping", "He", "isn't", "doesn't", "sleep", "aren't"],
          hint: "Negativa: **am not / isn't / aren't + verbo-ing**. Não use don't aqui!",
          explanation: "Muito bem! “He isn't sleeping” = “Ele não está dormindo.”",
          correction:
            "O certo é **He isn't sleeping.** Com -ing, use isn't (não doesn't).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It's raining again.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm57S9.mp3"),
          options: ["It's raining today.", "It's snowing again.", "It's raining again."],
          correctAnswer: "It's raining again.",
          hint:
            "Escute **raining** (chovendo) ou **snowing** (nevando), e **again** ou **today**.",
          explanation: "Perfeito! “It's raining again” = “Está chovendo de novo.”",
          correction:
            "A frase é **It's raining again.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My friends ",
          after: " waiting for me.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint:
            "I → **am** · he / she / it → **is** · you / we / they → **are** + verbo-ing.",
          explanation:
            "Mandou bem! “My friends are waiting for me” = “Meus amigos estão me esperando.” Revisão 1 completa! 🎉",
          correction: "Quase lá! My friends = they → **are.**",
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
