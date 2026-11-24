import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 2 (He / She can): can é igual para todos: she can sing (sem -s em can e no verbo).
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
          before: "She ",
          after: " sing very well.",
          options: ["cans", "can", "can to"],
          correctAnswer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation: "Isso aí! “She can sing very well” = “Ela sabe cantar muito bem.”",
          correction: "Quase! can não muda com she: **She can sing.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He can ",
          after: " (cook) pasta.",
          answer: "cook",
          hint: "Depois de can, o **verbo fica normal**: She can swim (e não “swims”).",
          explanation: "Isso! “He can cook pasta” = “Ele sabe fazer macarrão.”",
          correction: "A palavra certa é **cook**: depois de can, sem -s, mesmo com he.",
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
            ["She can swim", "Ela sabe nadar"],
            ["He can drive", "Ele sabe dirigir"],
            ["My dog can jump", "Meu cachorro consegue pular"],
            ["Ana can draw", "A Ana sabe desenhar"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Olhe o verbo: **swim** = nadar, **drive** = dirigir, **jump** = pular, **draw** = desenhar.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **swim** = nadar · **drive** = dirigir · **jump** = pular · **draw** = desenhar.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He can speak Spanish.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm05S4.mp3"),
          options: [
            "He can speak Spanish.",
            "She can speak Spanish.",
            "He can speak English.",
          ],
          correctAnswer: "He can speak Spanish.",
          hint: "Escute **He** ou **She**, e o idioma: **Spanish** ou **English**.",
          explanation:
            "Ótimo ouvido! “He can speak Spanish” = “Ele sabe falar espanhol.”",
          correction:
            "A frase é **He can speak Spanish.** Use o botão 0.5× para ouvir “He”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Minha irmã sabe tocar piano.",
          answer: ["My", "sister", "can", "play", "the", "piano"],
          bank: ["play", "the", "My", "can", "sister", "piano", "plays", "cans"],
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Perfeito! “My sister can play the piano” = “Minha irmã sabe tocar piano.”",
          correction: "O certo é **My sister can play the piano.** Can + play, sem -s.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad can ",
          after: " very fast.",
          options: ["type", "types", "typing"],
          correctAnswer: "type",
          hint: "Depois de can, o **verbo fica normal**: She can swim (e não “swims”).",
          explanation:
            "Mandou bem! “My dad can type very fast” = “Meu pai digita muito rápido.”",
          correction: "Quase! Depois de can, o verbo fica normal: **type.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "A cat ",
          after: " see in the dark.",
          answer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Isso! “A cat can see in the dark” = “O gato consegue enxergar no escuro.”",
          correction: "A resposta é **can**: can não muda com it.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele consegue levantar 100 quilos.",
          answer: ["He", "can", "lift", "100", "kilos"],
          bank: ["lift", "100", "He", "can", "kilos", "lifts", "cans"],
          hint: "Depois de can, o **verbo fica normal**: She can swim (e não “swims”).",
          explanation:
            "Muito bem! “He can lift 100 kilos” = “Ele consegue levantar 100 quilos.”",
          correction:
            "O certo é **He can lift 100 kilos.** Nem can nem o verbo ganham -s.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He can ride a horse.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm05S9.mp3"),
          options: [
            "He can ride a bike.",
            "She can ride a horse.",
            "He can ride a horse.",
          ],
          correctAnswer: "He can ride a horse.",
          hint:
            "Escute **He** ou **She**, e o final: **horse** (cavalo) ou **bike** (bicicleta).",
          explanation: "Perfeito! “He can ride a horse” = “Ele sabe andar a cavalo.”",
          correction:
            "A frase é **He can ride a horse.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Lucas ",
          after: " play chess.",
          options: ["cans", "can", "can to"],
          correctAnswer: "can",
          hint: "**can** é igual para todos: I can, she can, they can. Nunca “cans”.",
          explanation:
            "Mandou bem! “Lucas can play chess” = “O Lucas sabe jogar xadrez.” Lição completa! 🎉",
          correction: "Quase lá! **Lucas can play**: sem -s e sem to.",
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
