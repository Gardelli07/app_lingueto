import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 1 (Present perfect form): have /
// has + particípio (verbos regulares). Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " visited Rome.",
          options: ["have", "has", "am"],
          correctAnswer: "have",
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation: "Isso aí! “I have visited Rome” = “Eu já visitei Roma.”",
          correction: "Quase! Com I → **have + particípio.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She has ",
          after: " (live) in three different countries.",
          answer: "lived",
          hint:
            "Verbos regulares: o particípio é igual ao passado com **-ed** (work → worked → worked).",
          explanation:
            "Isso! “She has lived in three different countries” = “Ela já morou em três países diferentes.”",
          correction: "A palavra certa é **lived**: live + d (particípio regular).",
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
            ["I have worked", "Eu já trabalhei"],
            ["She has travelled", "Ela já viajou"],
            ["We have tried", "Nós já experimentamos"],
            ["They have finished", "Eles já terminaram"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **worked** = trabalhei · **travelled** = viajou · **tried** = experimentamos · **finished** = terminaram.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He has visited many countries.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm144S4.mp3"),
          options: [
            "He visited many countries.",
            "He has visited many countries.",
            "He has visited many cities.",
          ],
          correctAnswer: "He has visited many countries.",
          hint:
            "Escute **has visited** (present perfect) ou **visited**, e o final: **countries** ou **cities**.",
          explanation:
            "Ótimo ouvido! “He has visited many countries” = “Ele já visitou muitos países.”",
          correction:
            "A frase é **He has visited many countries.** Use o botão 0.5× para ouvir “has”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós já mudamos de casa três vezes.",
          answer: ["We", "have", "moved", "house", "three", "times"],
          bank: ["We", "have", "moved", "house", "three", "times", "has", "move"],
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation: "Perfeito! “We have moved house three times.”",
          correction: "O certo é **We have moved house three times.** We → have + moved.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My sister ",
          after: " studied in Canada.",
          options: ["has", "have", "is"],
          correctAnswer: "has",
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation:
            "Mandou bem! “My sister has studied in Canada” = “Minha irmã já estudou no Canadá.”",
          correction: "Quase! My sister = she → **has.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They ",
          after: " played this game before.",
          answer: "have",
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation:
            "Isso! “They have played this game before” = “Eles já jogaram esse jogo antes.”",
          correction: "A resposta é **have**: they → have.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela já cozinhou para cem pessoas.",
          answer: ["She", "has", "cooked", "for", "a", "hundred", "people"],
          bank: ["She", "has", "cooked", "for", "a", "hundred", "people", "have", "cook"],
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation: "Muito bem! “She has cooked for a hundred people.”",
          correction:
            "O certo é **She has cooked for a hundred people.** She → has + cooked.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We've tried Indian food.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm144S9.mp3"),
          options: [
            "We tried Indian food.",
            "We've tried Italian food.",
            "We've tried Indian food.",
          ],
          correctAnswer: "We've tried Indian food.",
          hint: "Escute o **'ve** depois de We, e **Indian** ou **Italian**.",
          explanation:
            "Perfeito! “We've tried Indian food” = “Já experimentamos comida indiana.”",
          correction: "A frase é **We've tried Indian food.** We've = we have.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It ",
          after: " rained a lot this year.",
          options: ["have", "has", "is"],
          correctAnswer: "has",
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation:
            "Mandou bem! “It has rained a lot this year” = “Choveu muito este ano.” Lição completa! 🎉",
          correction: "Quase lá! It → **has rained.**",
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
