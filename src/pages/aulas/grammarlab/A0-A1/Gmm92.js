import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 5 (Irregular plurals): Plurais irregulares: men, women,
// children, people, feet, teeth, mice. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One man, two ",
          after: ".",
          options: ["mans", "men", "mens"],
          correctAnswer: "men",
          hint: "Alguns plurais **não usam -s**: man → men, woman → women.",
          explanation: "Isso aí! “Two men” = “Dois homens.”",
          correction: "Quase! Man é irregular: o plural é **men.**",
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
            ["child", "children"],
            ["woman", "women"],
            ["person", "people"],
            ["foot", "feet"],
          ],
          rightOrder: [2, 3, 0, 1],
          instruction: "Tap a singular word, then its plural.",
          hint: "Esses plurais **mudam a palavra**: child → children, person → people.",
          explanation: "Mandou bem! Todos os plurais irregulares certos.",
          correction:
            "Esse par não combina. child → **children** · woman → **women** · person → **people** · foot → **feet**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The children are at school.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm92S3.mp3"),
          options: [
            "The child is at school.",
            "The children are at school.",
            "The kids are at home.",
          ],
          correctAnswer: "The children are at school.",
          hint: "Escute **child is** (um) ou **children are** (vários).",
          explanation:
            "Ótimo ouvido! “The children are at school” = “As crianças estão na escola.”",
          correction:
            "A frase é **The children are at school.** Children = plural de child.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One tooth, two ",
          after: ".",
          answer: "teeth",
          hint: "Tooth muda as vogais, igual a **foot → feet**.",
          explanation: "Isso! “Two teeth” = “Dois dentes.”",
          correction: "A palavra certa é **teeth**: oo vira ee, igual a foot → feet.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As mulheres são altas.",
          answer: ["The", "women", "are", "tall"],
          bank: ["women", "are", "The", "tall", "womans", "is", "woman"],
          hint: "Woman → **women** (sem -s). Plural usa **are**.",
          explanation: "Perfeito! “The women are tall” = “As mulheres são altas.”",
          correction: "O certo é **The women are tall.** Woman é irregular: women.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Many ",
          after: " are here.",
          options: ["people", "person", "peoples"],
          correctAnswer: "people",
          hint: "O plural comum de person é **people**.",
          explanation:
            "Mandou bem! “Many people are here” = “Muitas pessoas estão aqui.”",
          correction: "Quase! O plural de person é **people.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One mouse, two ",
          after: ".",
          answer: "mice",
          hint: "Mouse é irregular: muda quase a palavra toda.",
          explanation: "Isso! “Two mice” = “Dois ratos.”",
          correction: "A resposta é **mice**: mouse → mice.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My feet are cold.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm92S8.mp3"),
          options: ["My foot is cold.", "My feet are old.", "My feet are cold."],
          correctAnswer: "My feet are cold.",
          hint: "Escute **foot is** ou **feet are**, e **cold** ou **old**.",
          explanation: "Perfeito! “My feet are cold” = “Meus pés estão frios.”",
          correction: "A frase é **My feet are cold.** Feet = plural de foot.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Os homens estão aqui.",
          answer: ["The", "men", "are", "here"],
          bank: ["men", "here", "The", "mans", "are", "is"],
          hint: "Man → **men**. Não existe “mans”.",
          explanation: "Muito bem! “The men are here” = “Os homens estão aqui.”",
          correction: "O certo é **The men are here.** Man é irregular: men.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My ",
          after: " are happy.",
          options: ["childs", "children", "childrens"],
          correctAnswer: "children",
          hint: "Child → **children**. Não acrescente mais nenhum -s.",
          explanation:
            "Mandou bem! “My children are happy” = “Meus filhos estão felizes.” Lição completa! 🎉",
          correction: "Quase lá! O plural de child é **children**: sem “s”.",
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
