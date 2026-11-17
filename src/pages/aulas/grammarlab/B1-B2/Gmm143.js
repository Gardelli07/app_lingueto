import createLessonScreen from "../../LessonScreen";

// Used to / Would (B1-B2), aula 6 (Review): Revisão do Set 3: used to, didn't
// use to, would, be / get used to. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "When I was little, I ",
          after: " believe in monsters.",
          options: ["used to", "use to", "would to"],
          correctAnswer: "used to",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Isso aí! “I used to believe in monsters” = “Eu acreditava em monstros.”",
          correction: "Quase! Estado no passado → **used to believe.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Did you ",
          after: " to wear glasses?",
          answer: "use",
          hint:
            "Negativa e pergunta: **didn't use to** / **Did you use to…?** Depois de did, use perde o -d.",
          explanation: "Isso! “Did you use to wear glasses?” = “Você usava óculos?”",
          correction: "A palavra certa é **use**: Did you use to…? (sem -d).",
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
            ["used to", "costumava (antes, não mais)"],
            ["would", "costumava (só ações repetidas)"],
            ["be used to", "estar acostumado"],
            ["get used to", "se acostumar"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a phrase, then its meaning.",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation: "Mandou bem! Você domina as quatro formas.",
          correction:
            "Esse par não combina. **used to / would** = costumava · **be used to** = estar acostumado · **get used to** = se acostumar.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela morava em Paris.",
          answer: ["She", "used", "to", "live", "in", "Paris"],
          bank: ["She", "used", "to", "live", "in", "Paris", "living", "use"],
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation: "Perfeito! “She used to live in Paris” = “Ela morava em Paris.”",
          correction: "O certo é **She used to live in Paris.** Used to + live.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I didn't use to like jazz.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm143S5.mp3"),
          options: [
            "I don't like jazz.",
            "I didn't use to like jazz.",
            "I didn't use to like jeans.",
          ],
          correctAnswer: "I didn't use to like jazz.",
          hint: "Escute **didn't use to** e o final: **jazz** ou **jeans**.",
          explanation:
            "Ótimo ouvido! “I didn't use to like jazz” = “Eu não gostava de jazz.”",
          correction:
            "A frase é **I didn't use to like jazz.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My grandmother ",
          after: " always bake bread on Fridays.",
          options: ["used", "would", "use"],
          correctAnswer: "would",
          hint:
            "**would** = costumava, só para ações repetidas (She would sing). Para estados (have, be, live, like) use só **used to**.",
          explanation: "Mandou bem! “My grandmother would always bake bread on Fridays.”",
          correction: "Quase! Ação repetida + always → **would always bake.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I'm not used ",
          after: " eating so late.",
          answer: "to",
          hint:
            "**be used to + -ing** = estar acostumado · **get used to + -ing** = se acostumar. Não confunda com used to + verbo (costumava).",
          explanation:
            "Isso! “I'm not used to eating so late” = “Não estou acostumado a comer tão tarde.”",
          correction: "A resposta é **to**: be used to + -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós nos mudamos para cá em 2010.",
          answer: ["We", "moved", "here", "in", "2010"],
          bank: ["We", "moved", "here", "in", "2010", "used", "to", "move"],
          hint:
            "Hábito ou estado repetido no passado → **used to** · algo que aconteceu uma vez (data, quando) → **past simple**.",
          explanation: "Muito bem! “We moved here in 2010.”",
          correction:
            "O certo é **We moved here in 2010.** Uma vez, com data → past simple.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You'll soon get used to it.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm143S9.mp3"),
          options: [
            "You'll soon get used to it.",
            "You'll soon get used to him.",
            "You soon got used to it.",
          ],
          correctAnswer: "You'll soon get used to it.",
          hint: "Escute **You'll** (futuro) ou **got**, e o final: **it** ou **him**.",
          explanation:
            "Perfeito! “You'll soon get used to it” = “Você logo vai se acostumar.”",
          correction:
            "A frase é **You'll soon get used to it.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " play the piano, but I stopped when I was twelve.",
          options: ["used to", "am used to", "would to"],
          correctAnswer: "used to",
          hint:
            "**used to + verbo normal** = algo que era verdade antes e não é mais: I used to play football.",
          explanation:
            "Mandou bem! “I used to play the piano” = “Eu tocava piano.” Set 3 completo! 🎉",
          correction: "Quase lá! Algo que fazia antes e parou → **used to play.**",
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
