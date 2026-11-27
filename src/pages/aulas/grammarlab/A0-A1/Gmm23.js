import createLessonScreen from "../../LessonScreen";

// Past simple, aula 9 (Negatives: didn't): didn't + verbo normal (I didn't
// go, she didn't eat). Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " go to school yesterday.",
          options: ["didn't", "wasn't", "don't"],
          correctAnswer: "didn't",
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Isso aí! “I didn't go to school yesterday” = “Eu não fui à escola ontem.”",
          correction: "Quase! Ação no passado → **didn't go.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She didn't ",
          after: " (call) me.",
          answer: "call",
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation: "Isso! “She didn't call me” = “Ela não me ligou.”",
          correction: "A palavra certa é **call**: depois de didn't, sem -ed.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós não assistimos o jogo.",
          answer: ["We", "didn't", "watch", "the", "game"],
          bank: ["watch", "the", "We", "didn't", "game", "watched", "wasn't"],
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Perfeito! “We didn't watch the game” = “Nós não assistimos o jogo.”",
          correction: "O certo é **We didn't watch the game.** Didn't + watch (sem -ed).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He didn't come to the party.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm23S4.mp3"),
          options: [
            "He came to the party.",
            "He didn't come to the party.",
            "He doesn't come to the party.",
          ],
          correctAnswer: "He didn't come to the party.",
          hint: "Escute **didn't** (passado) ou **doesn't** (presente).",
          explanation:
            "Ótimo ouvido! “He didn't come to the party” = “Ele não veio à festa.”",
          correction:
            "A frase é **He didn't come to the party.** Use o botão 0.5× para ouvir “didn't”.",
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
            ["I didn't sleep", "Eu não dormi"],
            ["She didn't eat", "Ela não comeu"],
            ["They didn't win", "Eles não ganharam"],
            ["We didn't see it", "Nós não vimos"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **sleep** = dormir · **eat** = comer · **win** = ganhar · **see** = ver.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They didn't ",
          after: " the bus.",
          options: ["took", "take", "taked"],
          correctAnswer: "take",
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Mandou bem! “They didn't take the bus” = “Eles não pegaram o ônibus.”",
          correction: "Quase! Depois de didn't, verbo normal: **take** (e não “took”).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I did ",
          after: " like the movie.",
          answer: "not",
          hint: "**didn't** = did not.",
          explanation: "Isso! “I did not like the movie” = “Eu não gostei do filme.”",
          correction: "A resposta é **not**: did not = didn't.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não fez a lição de casa.",
          answer: ["He", "didn't", "do", "his", "homework"],
          bank: ["do", "his", "He", "didn't", "homework", "did", "does"],
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Muito bem! “He didn't do his homework” = “Ele não fez a lição de casa.”",
          correction: "O certo é **He didn't do his homework.** Didn't + do.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We didn't have time.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm23S9.mp3"),
          options: ["We had time.", "We don't have time.", "We didn't have time."],
          correctAnswer: "We didn't have time.",
          hint: "Escute **didn't** (passado) ou **don't** (presente).",
          explanation: "Perfeito! “We didn't have time” = “Nós não tivemos tempo.”",
          correction:
            "A frase é **We didn't have time.** Use o botão 0.5× para ouvir “didn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My mom didn't ",
          after: " dinner last night.",
          options: ["made", "make", "makes"],
          correctAnswer: "make",
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Mandou bem! “My mom didn't make dinner last night” = “Minha mãe não fez o jantar ontem à noite.” Lição completa! 🎉",
          correction: "Quase lá! Depois de didn't, verbo normal: **make.**",
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
