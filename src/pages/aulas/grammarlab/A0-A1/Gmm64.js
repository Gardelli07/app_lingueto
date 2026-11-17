import createLessonScreen from "../../LessonScreen";

// Present simple, aula 6 (Daily routine): Rotina: wake up, get up, take a
// shower, have breakfast, go to work, get home, go to bed. Os 5 tipos do
// Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de um
// slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["wake up", "acordar"],
            ["take a shower", "tomar banho"],
            ["have breakfast", "tomar café da manhã"],
            ["go to bed", "ir dormir"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Essas expressões são usadas juntas: **take a shower, have breakfast, go to bed**.",
          explanation: "Mandou bem! Você já sabe falar da rotina.",
          correction:
            "Esse par não combina. **wake up** = acordar · **take a shower** = tomar banho · **go to bed** = ir dormir.",
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
          after: " up at 6 a.m.",
          options: ["wake", "wakes", "waking"],
          correctAnswer: "wake",
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation: "Isso aí! “I wake up at 6 a.m.” = “Eu acordo às 6 da manhã.”",
          correction: "Quase! Com “I”, o verbo fica normal: **I wake up.**",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She takes a shower in the morning.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm64S3.mp3"),
          options: [
            "She takes a shower at night.",
            "She takes a shower in the morning.",
            "She takes a picture in the morning.",
          ],
          correctAnswer: "She takes a shower in the morning.",
          hint:
            "Escute **shower** (banho) ou **picture** (foto), e **morning** ou **night**.",
          explanation:
            "Ótimo ouvido! “She takes a shower in the morning” = “Ela toma banho de manhã.”",
          correction:
            "A frase é **She takes a shower in the morning.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He ",
          after: " (have) breakfast at 7.",
          answer: "has",
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation: "Isso! “He has breakfast at 7” = “Ele toma café da manhã às 7.”",
          correction: "A palavra certa é **has**: com he, have vira has.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu vou dormir às 11.",
          answer: ["I", "go", "to", "bed", "at", "11"],
          bank: ["go", "to", "I", "bed", "at", "11", "goes", "the"],
          hint: "“Ir dormir” = **go to bed** (sem “the”).",
          explanation: "Perfeito! “I go to bed at 11” = “Eu vou dormir às 11.”",
          correction:
            "O certo é **I go to bed at 11.** “Ir dormir” = go to bed, sem “the”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad ",
          after: " home at 6 p.m.",
          options: ["get", "gets", "getting"],
          correctAnswer: "gets",
          hint: "**get home** = chegar em casa. My dad = he → **gets**.",
          explanation:
            "Mandou bem! “My dad gets home at 6 p.m.” = “Meu pai chega em casa às 18h.”",
          correction: "Quase! My dad = he → **gets home.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela almoça ao meio-dia.",
          answer: ["She", "has", "lunch", "at", "noon"],
          bank: ["has", "lunch", "She", "at", "noon", "have", "the"],
          hint: "“Almoçar” = **have lunch**. Com she → **has lunch**.",
          explanation: "Muito bem! “She has lunch at noon” = “Ela almoça ao meio-dia.”",
          correction:
            "O certo é **She has lunch at noon.** Almoçar = have lunch, e she → has.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We ",
          after: " (go) to work by car.",
          answer: "go",
          hint: "Com I, you, we, they, o **verbo fica normal**: I work, they live.",
          explanation:
            "Isso! “We go to work by car” = “Nós vamos de carro para o trabalho.”",
          correction: "A resposta é **go**: com we, o verbo fica normal.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He gets up at seven.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm64S9.mp3"),
          options: [
            "He gets up at eleven.",
            "He gets up at seven.",
            "He goes up at seven.",
          ],
          correctAnswer: "He gets up at seven.",
          hint:
            "Escute o número (**seven** = 7 ou **eleven** = 11) e **gets** ou **goes**.",
          explanation: "Perfeito! “He gets up at seven” = “Ele se levanta às sete.”",
          correction:
            "A frase é **He gets up at seven.** Use o botão 0.5× para ouvir “seven”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My mom ",
          after: " to work at 8.",
          options: ["goes", "go", "gos"],
          correctAnswer: "goes",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Mandou bem! “My mom goes to work at 8” = “Minha mãe vai trabalhar às 8.” Lição completa! 🎉",
          correction: "Quase lá! My mom = she, e go ganha -es: **goes.**",
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
