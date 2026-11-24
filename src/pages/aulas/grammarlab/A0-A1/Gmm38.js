import createLessonScreen from "../../LessonScreen";

// Possessives, aula 4 ('s possessive): pessoa + 's: Ana's bag (a bolsa da
// Ana), my mom's car. Os 5 tipos do Grammar Lab alternados, uma pergunta por
// slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "This is ",
          after: " bag.",
          options: ["Anas", "Ana's", "Anas'"],
          correctAnswer: "Ana's",
          hint: "Para dizer de quem é, use **pessoa + 's**: Ana's bag = a bolsa da Ana.",
          explanation: "Isso aí! “This is Ana's bag” = “Esta é a bolsa da Ana.”",
          correction: "Quase! Para dizer “da Ana”, usamos **Ana's**, com apóstrofo + s.",
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
            ["Ana's car", "o carro da Ana"],
            ["Lucas's dog", "o cachorro do Lucas"],
            ["my mom's house", "a casa da minha mãe"],
            ["my dad's phone", "o celular do meu pai"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "A ordem é invertida: **dono + 's + coisa**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. Leia assim: dono 's coisa → **Ana's car** = o carro da Ana.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O carro do Pedro é vermelho.",
          answer: ["Pedro's", "car", "is", "red"],
          bank: ["car", "Pedro", "red", "Pedro's", "is", "of"],
          hint: "Em inglês, o dono vem primeiro: **Pedro's car**.",
          explanation: "Perfeito! “Pedro's car is red” = “O carro do Pedro é vermelho.”",
          correction:
            "O certo é **Pedro's car is red.** Primeiro o dono com 's, depois a coisa.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "This is my sister's room.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm38S4.mp3"),
          options: [
            "This is my sister's room.",
            "This is my brother's room.",
            "This is my sister's book.",
          ],
          correctAnswer: "This is my sister's room.",
          hint:
            "Escute de quem é (**sister** ou **brother**) e o que é (**room** ou **book**).",
          explanation:
            "Ótimo ouvido! “This is my sister's room” = “Este é o quarto da minha irmã.”",
          correction:
            "A frase é **This is my sister's room.** Use o botão 0.5× para ouvir “sister's room”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Ana's dog = the dog of ",
          after: ".",
          answer: "Ana",
          hint: "Quem vem antes do **'s** é o dono.",
          explanation: "Isso! “Ana's dog” = o cachorro da Ana.",
          correction: "A palavra certa é **Ana**: Ana's dog = o cachorro da Ana.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It's ",
          after: " birthday today.",
          options: ["Marias", "Maria", "Maria's"],
          correctAnswer: "Maria's",
          hint: "Para dizer de quem é, use **pessoa + 's**: Ana's bag = a bolsa da Ana.",
          explanation:
            "Mandou bem! “It's Maria's birthday today” = “Hoje é aniversário da Maria.”",
          correction: "Quase! O aniversário é da Maria: **Maria's birthday.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "A casa da minha avó é grande.",
          answer: ["My", "grandma's", "house", "is", "big"],
          bank: ["house", "big", "My", "grandma's", "is", "grandma", "the"],
          hint: "“Da minha avó” = **my grandma's**, e vem antes de house.",
          explanation:
            "Muito bem! “My grandma's house is big” = “A casa da minha avó é grande.”",
          correction:
            "O certo é **My grandma's house is big.** O dono (my grandma) vem primeiro, com 's.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My dad's car = ",
          after: " car.",
          answer: "his",
          hint: "O carro é do meu pai, um homem. Qual possessivo usamos?",
          explanation: "Isso! “My dad's car” = “his car” (o carro dele).",
          correction: "A resposta é **his**: o carro do meu pai = o carro dele.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is that Paulo's phone?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm38S9.mp3"),
          options: [
            "Is that Paulo's phone?",
            "Is that Paula's phone?",
            "Is that Paulo's photo?",
          ],
          correctAnswer: "Is that Paulo's phone?",
          hint:
            "Escute o nome (**Paulo** ou **Paula**) e o final (**phone** ou **photo**).",
          explanation:
            "Perfeito! “Is that Paulo's phone?” = “Aquele é o celular do Paulo?”",
          correction:
            "A frase é **Is that Paulo's phone?** Use o botão 0.5× para ouvir o nome e “phone”.",
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
          after: " name is Carla.",
          options: ["mother's", "mothers", "mother"],
          correctAnswer: "mother's",
          hint: "Para dizer de quem é, use **pessoa + 's**: Ana's bag = a bolsa da Ana.",
          explanation:
            "Mandou bem! “My mother's name is Carla” = “O nome da minha mãe é Carla.” Lição completa! 🎉",
          correction: "Quase lá! O nome é da minha mãe: **my mother's name.**",
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
