import createLessonScreen from "../../LessonScreen";

// Possessives, aula 3 (Our / Their): our (nosso/nossa) e their (deles/delas)
// · their, they're e there. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We have a house. ",
          after: " house is big.",
          options: ["Our", "Their", "We"],
          correctAnswer: "Our",
          hint: "we → **our** (nosso / nossa).",
          explanation: "Isso aí! “Our house is big” = “Nossa casa é grande.”",
          correction: "Quase! A casa é nossa (we), então usamos **Our.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A casa deles é nova.",
          answer: ["Their", "house", "is", "new"],
          bank: ["house", "Our", "new", "is", "Their", "They"],
          hint: "“Deles” = **their**, e vem antes de house.",
          explanation: "Perfeito! “Their house is new” = “A casa deles é nova.”",
          correction: "O certo é **Their house is new.** “Deles” = their.",
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
            ["our car", "nosso carro"],
            ["their car", "o carro deles"],
            ["our kids", "nossos filhos"],
            ["their kids", "os filhos deles"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint: "**our** = nosso · **their** = deles / delas.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **our** = nosso e **their** = deles.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Our teacher is nice.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm37S4.mp3"),
          options: [
            "Their teacher is nice.",
            "Our teacher is nice.",
            "Our teachers are nice.",
          ],
          correctAnswer: "Our teacher is nice.",
          hint: "Escute **our** (“áuer”) ou **their** (“dér”), e **is** ou **are**.",
          explanation: "Ótimo ouvido! “Our teacher is nice” = “Nosso professor é legal.”",
          correction:
            "A frase é **Our teacher is nice.** Use o botão 0.5× para ouvir “our”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Tom and Lucy have a dog. ",
          after: " dog is brown.",
          answer: "Their",
          hint: "Tom e Lucy = they. Qual é o possessivo de they?",
          explanation: "Isso! “Their dog is brown” = “O cachorro deles é marrom.”",
          correction: "A palavra certa é **Their**: o cachorro é de Tom e Lucy (they).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Leo and I are brothers. ",
          after: " parents are at work.",
          options: ["Their", "Our", "They're"],
          correctAnswer: "Our",
          hint: "Leo and I = nós (we) → **our**.",
          explanation:
            "Mandou bem! “Our parents are at work” = “Nossos pais estão no trabalho.”",
          correction: "Quase! Leo e eu = we, então usamos **Our.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nossos amigos estão aqui.",
          answer: ["Our", "friends", "are", "here"],
          bank: ["friends", "here", "Our", "are", "Their", "is", "We"],
          hint: "“Nossos” = **Our** (não muda no plural).",
          explanation: "Muito bem! “Our friends are here” = “Nossos amigos estão aqui.”",
          correction:
            "O certo é **Our friends are here.** “Our” serve para nosso e nossos.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We love ",
          after: " city.",
          answer: "our",
          hint:
            "I → **my** · you → **your** · he → **his** · she → **her** · it → **its** · we → **our** · they → **their**",
          explanation: "Isso! “We love our city” = “Nós amamos a nossa cidade.”",
          correction: "A resposta é **our**: we → our.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Their kids are at school.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm37S9.mp3"),
          options: [
            "Our kids are at school.",
            "They're at school.",
            "Their kids are at school.",
          ],
          correctAnswer: "Their kids are at school.",
          hint: "Escute se tem **kids** depois e se começa com **their** ou **our**.",
          explanation:
            "Perfeito! “Their kids are at school” = “Os filhos deles estão na escola.”",
          correction:
            "A frase é **Their kids are at school.** Use o botão 0.5× para ouvir “their kids”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at the girls! ",
          after: " shoes are pink.",
          options: ["They're", "There", "Their"],
          correctAnswer: "Their",
          hint: "**their** = delas / deles · **they're** = they are · **there** = lá.",
          explanation:
            "Mandou bem! “Their shoes are pink” = “Os sapatos delas são rosa.” Lição completa! 🎉",
          correction:
            "Quase lá! Os sapatos são das meninas, então é **Their.** “They're” = they are.",
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
