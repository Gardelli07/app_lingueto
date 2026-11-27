import createLessonScreen from "../../LessonScreen";

// Possessives, aula 2 (His / Her / Its): his (dele), her (dela), its (de
// coisa/animal): o possessivo segue o dono. Os 5 tipos do Grammar Lab
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
          before: "This is Pedro. ",
          after: " car is blue.",
          options: ["Her", "His", "Its"],
          correctAnswer: "His",
          hint:
            "O possessivo segue o **dono**: homem → **his**, mulher → **her**. A coisa não importa.",
          explanation: "Isso aí! “His car is blue” = “O carro dele é azul.”",
          correction: "Quase! Pedro é homem, então usamos His: **His car is blue.**",
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
            ["his brother", "o irmão dele"],
            ["her brother", "o irmão dela"],
            ["his sister", "a irmã dele"],
            ["her sister", "a irmã dela"],
          ],
          rightOrder: [3, 2, 0, 1],
          hint:
            "O possessivo segue o **dono**: homem → **his**, mulher → **her**. A coisa não importa.",
          explanation: "Mandou bem! Você entendeu: o possessivo segue o dono.",
          correction:
            "Esse par não combina. **his** = dele e **her** = dela, não importa se é irmão ou irmã.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Her name is Julia.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm36S3.mp3"),
          options: ["His name is Julia.", "Her name is Julia.", "Her name is Julie."],
          correctAnswer: "Her name is Julia.",
          hint: "Escute o começo: **his** (“hiz”) ou **her** (“hêr”).",
          explanation: "Ótimo ouvido! “Her name is Julia” = “O nome dela é Julia.”",
          correction:
            "A frase é **Her name is Julia.** Use o botão 0.5× para ouvir “her”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Maria has a phone. ",
          after: " phone is new.",
          answer: "Her",
          hint:
            "O possessivo segue o **dono**: homem → **his**, mulher → **her**. A coisa não importa.",
          explanation: "Isso! “Her phone is new” = “O celular dela é novo.”",
          correction:
            "A palavra certa é **Her**: Maria é mulher, então é o celular dela.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O cachorro dela é pequeno.",
          answer: ["Her", "dog", "is", "small"],
          bank: ["dog", "His", "small", "Her", "is", "She"],
          hint: "“Dela” = **her**. Em inglês, o possessivo vem antes da coisa.",
          explanation: "Perfeito! “Her dog is small” = “O cachorro dela é pequeno.”",
          correction:
            "O certo é **Her dog is small.** “Dela” = her, e vem antes de “dog”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "The tree is old. ",
          after: " leaves are yellow.",
          options: ["It's", "Its", "Her"],
          correctAnswer: "Its",
          hint: "Para coisas e animais: **its** (sem apóstrofo). It's = it is.",
          explanation:
            "Mandou bem! “Its leaves are yellow” = “As folhas dela (da árvore) são amarelas.”",
          correction:
            "Quase! A árvore é uma coisa, então usamos **Its**, sem apóstrofo. “It's” = it is.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Mr. Silva is a teacher. ",
          after: " students like him.",
          answer: "His",
          hint:
            "O possessivo segue o **dono**: homem → **his**, mulher → **her**. A coisa não importa.",
          explanation: "Isso! “His students like him” = “Os alunos dele gostam dele.”",
          correction:
            "A resposta é **His**: Mr. Silva é homem, então são os alunos dele.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A mãe dele é médica.",
          answer: ["His", "mother", "is", "a", "doctor"],
          bank: ["mother", "a", "Her", "doctor", "His", "is", "He"],
          hint: "“Dele” = **his**, mesmo falando da mãe. Quem importa é o dono.",
          explanation: "Muito bem! “His mother is a doctor” = “A mãe dele é médica.”",
          correction:
            "O certo é **His mother is a doctor.** “Dele” = his, mesmo sendo a mãe.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "His sister is tall.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm36S9.mp3"),
          options: ["His sister is small.", "Her sister is tall.", "His sister is tall."],
          correctAnswer: "His sister is tall.",
          hint:
            "Escute **his** ou **her**, e o final: **tall** (alta) ou **small** (pequena).",
          explanation: "Perfeito! “His sister is tall” = “A irmã dele é alta.”",
          correction:
            "A frase é **His sister is tall.** Use o botão 0.5× para ouvir “his” e “tall”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Look at Ana. ",
          after: " dress is red.",
          options: ["Her", "His", "Its"],
          correctAnswer: "Her",
          hint:
            "O possessivo segue o **dono**: homem → **his**, mulher → **her**. A coisa não importa.",
          explanation:
            "Mandou bem! “Her dress is red” = “O vestido dela é vermelho.” Lição completa! 🎉",
          correction: "Quase lá! Ana é mulher, então usamos Her: **Her dress is red.**",
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
