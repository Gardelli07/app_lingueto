import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 9 (Rules): O que pode e o que não pode: You can park here / You can't smoke here.
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You ",
          after: " smoke here. It's not allowed.",
          options: ["can", "can't", "cans"],
          correctAnswer: "can't",
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation: "Isso aí! “You can't smoke here” = “Não pode fumar aqui.”",
          correction: "Quase! “Not allowed” = proibido → **You can't smoke here.**",
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
            ["You can park here", "Pode estacionar aqui"],
            ["You can't park here", "Não pode estacionar aqui"],
            ["You can't take photos", "Não pode tirar fotos"],
            ["You can sit here", "Pode sentar aqui"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation: "Mandou bem! Todas as regras certas.",
          correction: "Esse par não combina. **can** = pode · **can't** = não pode.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You can't use your phone in class.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm12S3.mp3"),
          options: [
            "You can use your phone in class.",
            "You can't use your phone in class.",
            "You can't use your phone at home.",
          ],
          correctAnswer: "You can't use your phone in class.",
          hint:
            "Na fala, **can** é curtinho (“kən”) e **can't** é mais forte e longo (“ként”). Escute o “t” no final.",
          explanation:
            "Ótimo ouvido! “You can't use your phone in class” = “Não pode usar o celular na aula.”",
          correction:
            "A frase é **You can't use your phone in class.** Escute o “t” de can't.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "In Brazil, you ",
          after: " drive at 18.",
          answer: "can",
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation:
            "Isso! “In Brazil, you can drive at 18” = “No Brasil, você pode dirigir aos 18.”",
          correction: "A palavra certa é **can**: aos 18 é permitido dirigir.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Dá para ver o mar daqui.",
          answer: ["You", "can", "see", "the", "sea", "from", "here"],
          bank: ["see", "the", "You", "sea", "from", "can", "here", "sees"],
          hint: "Em inglês, “dá para…” = **You can…**",
          explanation:
            "Perfeito! “You can see the sea from here” = “Dá para ver o mar daqui.”",
          correction: "O certo é **You can see the sea from here.** “Dá para” = you can.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You ",
          after: " swim here. It's dangerous!",
          options: ["can't", "can", "cans"],
          correctAnswer: "can't",
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation: "Mandou bem! “You can't swim here” = “Não pode nadar aqui.”",
          correction: "Quase! É perigoso → **You can't swim here.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Children under 12 ",
          after: " watch this movie.",
          answer: "cannot",
          instruction: "Type the long form of “can't”.",
          hint: "A forma longa de can't é **cannot** (tudo junto).",
          explanation:
            "Isso! “Children under 12 cannot watch this movie” = “Crianças com menos de 12 anos não podem ver este filme.”",
          correction: "A resposta é **cannot**: can't = cannot.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você não pode comer aqui.",
          answer: ["You", "can't", "eat", "here"],
          bank: ["eat", "here", "You", "can't", "don't", "eats"],
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation: "Muito bem! “You can't eat here” = “Não pode comer aqui.”",
          correction: "O certo é **You can't eat here.** Regra → can't.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "You can pay at the door.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm12S9.mp3"),
          options: [
            "You can pay at the door.",
            "You can't pay at the door.",
            "You can play at the door.",
          ],
          correctAnswer: "You can pay at the door.",
          hint:
            "Escute se tem o “t” de **can't**, e **pay** (pagar) ou **play** (jogar).",
          explanation:
            "Perfeito! “You can pay at the door” = “Você pode pagar na porta.”",
          correction:
            "A frase é **You can pay at the door.** Use o botão 0.5× para ouvir “pay”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It's free! You ",
          after: " come in.",
          options: ["can't", "can", "cans"],
          correctAnswer: "can",
          hint: "**can** = pode / é permitido · **can't** = não pode / é proibido.",
          explanation:
            "Mandou bem! “It's free! You can come in” = “É de graça! Pode entrar.” Lição completa! 🎉",
          correction: "Quase lá! É de graça → **You can come in.**",
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
