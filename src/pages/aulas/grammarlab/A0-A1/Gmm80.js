import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 3 (Is or are?): Escolher there is / there are ·
// coisas incontáveis (milk, water, rice) usam is. Os 5 tipos do Grammar Lab
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
          before: "There ",
          after: " a bank on this street.",
          options: ["are", "is", "am"],
          correctAnswer: "is",
          hint: "Uma coisa → **There is** · duas ou mais → **There are**.",
          explanation:
            "Isso aí! “There is a bank on this street” = “Tem um banco nesta rua.”",
          correction: "Quase! Um banco só → **There is.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem leite na geladeira.",
          answer: ["There", "is", "milk", "in", "the", "fridge"],
          bank: ["milk", "There", "the", "is", "in", "are", "fridge"],
          hint:
            "Coisas que não dá para contar (milk, water, rice, bread, sugar) usam **There is**.",
          explanation:
            "Perfeito! “There is milk in the fridge” = “Tem leite na geladeira.”",
          correction:
            "O certo é **There is milk in the fridge.** Leite não se conta → there is.",
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
            ["There is water", "Tem água"],
            ["There are eggs", "Tem ovos"],
            ["There is rice", "Tem arroz"],
            ["There are oranges", "Tem laranjas"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Coisas que não dá para contar (milk, water, rice, bread, sugar) usam **There is**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **water** = água, **rice** = arroz (is) · **eggs** = ovos, **oranges** = laranjas (are).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There is some water.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm80S4.mp3"),
          options: [
            "There is some wine.",
            "There is some water.",
            "There are some waiters.",
          ],
          correctAnswer: "There is some water.",
          hint:
            "Escute o final: **water** (água), **wine** (vinho) ou **waiters** (garçons).",
          explanation: "Ótimo ouvido! “There is some water” = “Tem um pouco de água.”",
          correction:
            "A frase é **There is some water.** Use o botão 0.5× para ouvir “water”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There ",
          after: " some bread on the table.",
          answer: "is",
          hint:
            "Coisas que não dá para contar (milk, water, rice, bread, sugar) usam **There is**.",
          explanation: "Isso! “There is some bread on the table” = “Tem pão na mesa.”",
          correction: "A palavra certa é **is**: bread (pão) não se conta → There is.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " some juice in the glass.",
          options: ["is", "are", "am"],
          correctAnswer: "is",
          hint:
            "Coisas que não dá para contar (milk, water, rice, bread, sugar) usam **There is**.",
          explanation:
            "Mandou bem! “There is some juice in the glass” = “Tem um pouco de suco no copo.”",
          correction: "Quase! Juice (suco) não se conta → **There is.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Há duas janelas no quarto.",
          answer: ["There", "are", "two", "windows", "in", "the", "bedroom"],
          bank: ["windows", "the", "There", "two", "is", "in", "are", "bedroom"],
          hint: "Uma coisa → **There is** · duas ou mais → **There are**.",
          explanation:
            "Muito bem! “There are two windows in the bedroom” = “Há duas janelas no quarto.”",
          correction:
            "O certo é **There are two windows in the bedroom.** Duas janelas → there are.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "There ",
          after: " a lot of sugar in my coffee.",
          answer: "is",
          hint:
            "**a lot of** (muito) não muda nada. Olhe a palavra sugar: dá para contar?",
          explanation:
            "Isso! “There is a lot of sugar in my coffee” = “Tem muito açúcar no meu café.”",
          correction: "A resposta é **is**: sugar (açúcar) não se conta → There is.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "There are some eggs in the fridge.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm80S9.mp3"),
          options: [
            "There is an egg in the fridge.",
            "There are some eggs in the box.",
            "There are some eggs in the fridge.",
          ],
          correctAnswer: "There are some eggs in the fridge.",
          hint:
            "Escute **an egg** ou **some eggs**, e o final: **fridge** (geladeira) ou **box** (caixa).",
          explanation:
            "Perfeito! “There are some eggs in the fridge” = “Tem alguns ovos na geladeira.”",
          correction:
            "A frase é **There are some eggs in the fridge.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "There ",
          after: " a lot of people at the party.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "**a lot of** não muda nada. People é plural → **are**.",
          explanation:
            "Mandou bem! “There are a lot of people at the party” = “Tem muita gente na festa.” Lição completa! 🎉",
          correction: "Quase lá! People é plural → **There are a lot of people.**",
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
