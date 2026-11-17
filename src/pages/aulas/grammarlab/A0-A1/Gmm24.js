import createLessonScreen from "../../LessonScreen";

// Past simple, aula 10 (Questions: Did…?): Did + sujeito + verbo normal? (Did
// you go? / Did she call?). Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you go out last night?",
          options: ["Did", "Were", "Do"],
          correctAnswer: "Did",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation:
            "Isso aí! “Did you go out last night?” = “Você saiu ontem à noite?”",
          correction: "Quase! Ação no passado → **Did you go out?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você gostou do filme?",
          answer: ["Did", "you", "like", "the", "movie"],
          bank: ["like", "the", "Did", "you", "movie", "liked", "Do"],
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Perfeito! “Did you like the movie?” = “Você gostou do filme?”",
          correction: "O certo é **Did you like the movie?** Did + you + like (sem -ed).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Did she call you?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm24S3.mp3"),
          options: ["Does she call you?", "Did he call you?", "Did she call you?"],
          correctAnswer: "Did she call you?",
          hint: "Escute **Did** (passado) ou **Does**, e **she** ou **he**.",
          explanation: "Ótimo ouvido! “Did she call you?” = “Ela te ligou?”",
          correction:
            "A frase é **Did she call you?** Use o botão 0.5× para ouvir “Did she”.",
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
            ["Did you sleep well?", "Você dormiu bem?"],
            ["Did he win?", "Ele ganhou?"],
            ["Did they come?", "Eles vieram?"],
            ["Did it rain?", "Choveu?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **sleep** = dormir · **win** = ganhar · **come** = vir · **rain** = chover.",
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
          after: " (see) the news?",
          answer: "see",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Isso! “Did you see the news?” = “Você viu as notícias?”",
          correction: "A palavra certa é **see**: depois de Did + sujeito, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did they ",
          after: " the game?",
          options: ["won", "win", "wins"],
          correctAnswer: "win",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Mandou bem! “Did they win the game?” = “Eles ganharam o jogo?”",
          correction: "Quase! Depois de Did, verbo normal: **win** (e não “won”).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela comprou um carro?",
          answer: ["Did", "she", "buy", "a", "car"],
          bank: ["buy", "a", "Did", "she", "car", "bought", "Does"],
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Muito bem! “Did she buy a car?” = “Ela comprou um carro?”",
          correction: "O certo é **Did she buy a car?** Did + she + buy (não “bought”).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " your parents travel last year?",
          answer: "Did",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation:
            "Isso! “Did your parents travel last year?” = “Seus pais viajaram ano passado?”",
          correction: "A resposta é **Did**: pergunta de ação no passado.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Did you have fun?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm24S9.mp3"),
          options: ["Do you have fun?", "Did you have fun?", "Did you have food?"],
          correctAnswer: "Did you have fun?",
          hint:
            "Escute **Did** ou **Do**, e o final: **fun** (diversão) ou **food** (comida).",
          explanation: "Perfeito! “Did you have fun?” = “Você se divertiu?”",
          correction:
            "A frase é **Did you have fun?** Use o botão 0.5× para ouvir “fun”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did he ",
          after: " to you?",
          options: ["spoke", "speak", "speaks"],
          correctAnswer: "speak",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation:
            "Mandou bem! “Did he speak to you?” = “Ele falou com você?” Lição completa! 🎉",
          correction: "Quase lá! Depois de Did, verbo normal: **speak.**",
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
