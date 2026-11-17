import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 9 (Always + -ing): Reclamar de hábitos
// irritantes: You're always losing your keys!. Os 5 tipos do Grammar Lab
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
          before: "My brother ",
          after: " my clothes without asking!",
          options: ["take always", "is always taking", "always is taking"],
          correctAnswer: "is always taking",
          instruction: "Choose the complaint form.",
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation:
            "Isso aí! “My brother is always taking my clothes!” = “Meu irmão vive pegando minhas roupas!”",
          correction:
            "Quase! Reclamação → **is always taking** (always entre is e -ing).",
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
            ["You're always losing your keys!", "Você vive perdendo suas chaves!"],
            ["He's always complaining.", "Ele vive reclamando."],
            ["She's always interrupting me.", "Ela vive me interrompendo."],
            ["They're always arriving late.", "Eles vivem chegando atrasados."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation: "Mandou bem! “Always + -ing” = “vive + -ando / -endo”.",
          correction:
            "Esse par não combina. **losing** = perdendo · **complaining** = reclamando · **interrupting** = interrompendo · **arriving** = chegando.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "You're always ",
          after: " (forget) my birthday!",
          answer: "forgetting",
          hint:
            "forget termina em vogal + consoante (sílaba forte): dobre o t → **forgetting**.",
          explanation:
            "Isso! “You're always forgetting my birthday!” = “Você vive esquecendo meu aniversário!”",
          correction: "A palavra certa é **forgetting**: dobre o “t”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's always talking on the phone!",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm127S4.mp3"),
          options: [
            "He always talks on the phone.",
            "He's always talking on the phone!",
            "She's always talking on the phone!",
          ],
          correctAnswer: "He's always talking on the phone!",
          hint:
            "Escute **He's always talking** (reclamação) ou **always talks** (neutro), e **He** ou **She**.",
          explanation:
            "Ótimo ouvido! “He's always talking on the phone!” = “Ele vive falando no telefone!”",
          correction: "A frase é **He's always talking on the phone!** É uma reclamação.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu vizinho vive fazendo barulho!",
          answer: ["My", "neighbor", "is", "always", "making", "noise"],
          bank: ["My", "neighbor", "is", "always", "making", "noise", "makes", "does"],
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation:
            "Perfeito! “My neighbor is always making noise!” = “Meu vizinho vive fazendo barulho!”",
          correction:
            "O certo é **My neighbor is always making noise!** Ordem: is + always + making.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I always ",
          after: " my coffee black. I don't like milk.",
          options: ["drink", "am drinking", "drinks"],
          correctAnswer: "drink",
          instruction: "No complaint here — choose the normal habit.",
          hint:
            "Hábito neutro (sem reclamação) → **present simple** normal: I always drink.",
          explanation:
            "Mandou bem! “I always drink my coffee black” = “Eu sempre tomo café puro.”",
          correction: "Quase! Hábito neutro → **I always drink.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She's always ",
          after: " (leave) the lights on!",
          answer: "leaving",
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation:
            "Isso! “She's always leaving the lights on!” = “Ela vive deixando as luzes acesas!”",
          correction: "A resposta é **leaving**: leave perde o “e” antes do -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Por que você vive me interrompendo?",
          answer: ["Why", "are", "you", "always", "interrupting", "me"],
          bank: ["Why", "are", "you", "always", "interrupting", "me", "do", "interrupt"],
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation:
            "Muito bem! “Why are you always interrupting me?” = “Por que você vive me interrompendo?”",
          correction:
            "O certo é **Why are you always interrupting me?** Why + are + you + always + -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They're always arguing about money.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm127S9.mp3"),
          options: [
            "They always argue about money.",
            "They're always arguing about time.",
            "They're always arguing about money.",
          ],
          correctAnswer: "They're always arguing about money.",
          hint:
            "Escute **They're always arguing** (reclamação) e o final: **money** ou **time**.",
          explanation:
            "Perfeito! “They're always arguing about money” = “Eles vivem discutindo por dinheiro.”",
          correction:
            "A frase é **They're always arguing about money.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My phone ",
          after: " when I'm busy! It's so annoying.",
          options: ["is always ringing", "ring always", "always is ringing"],
          correctAnswer: "is always ringing",
          instruction: "Choose the complaint form.",
          hint:
            "**always + present continuous** = reclamação de um hábito irritante: You're always losing your keys!",
          explanation:
            "Mandou bem! “My phone is always ringing when I'm busy!” = “Meu celular vive tocando quando estou ocupado!” Lição completa! 🎉",
          correction: "Quase lá! Reclamação → **is always ringing.**",
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
