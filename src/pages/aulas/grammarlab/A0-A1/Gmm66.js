import createLessonScreen from "../../LessonScreen";

// Present simple, aula 8 (Negatives: doesn't): he / she / it + doesn't +
// verbo SEM -s. Os 5 tipos do Grammar Lab alternados, uma pergunta por slide.
// O combo e o XP seguem de um slide para o outro (ComboSlide). `explanation`
// e o texto do acerto (guardado, o painel de acerto nao mostra texto);
// `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " eat meat.",
          options: ["don't", "doesn't", "isn't"],
          correctAnswer: "doesn't",
          hint: "Negativa com he, she, it: **doesn't + verbo sem -s**.",
          explanation: "Isso aí! “She doesn't eat meat” = “Ela não come carne.”",
          correction: "Quase! Com “she”, a negativa é **doesn't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He doesn't ",
          after: " (work) on Sundays.",
          answer: "work",
          hint: "Depois de **doesn't**, o verbo perde o -s.",
          explanation:
            "Isso! “He doesn't work on Sundays” = “Ele não trabalha aos domingos.”",
          correction: "A palavra certa é **work**: o -s já está no doesn't.",
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
            ["She doesn't cook", "Ela não cozinha"],
            ["He doesn't drive", "Ele não dirige"],
            ["It doesn't work", "Não funciona"],
            ["Ana doesn't smoke", "A Ana não fuma"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Olhe o verbo: **cook** = cozinhar, **drive** = dirigir, **work** = funcionar, **smoke** = fumar.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **cook** = cozinha · **drive** = dirige · **work** = funciona · **smoke** = fuma.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He doesn't play soccer.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm66S4.mp3"),
          options: [
            "He plays soccer.",
            "He doesn't play soccer.",
            "He doesn't play tennis.",
          ],
          correctAnswer: "He doesn't play soccer.",
          hint: "Escute se tem **doesn't** e o esporte: **soccer** ou **tennis**.",
          explanation: "Ótimo ouvido! “He doesn't play soccer” = “Ele não joga futebol.”",
          correction:
            "A frase é **He doesn't play soccer.** Use o botão 0.5× para ouvir “doesn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu irmão não gosta de peixe.",
          answer: ["My", "brother", "doesn't", "like", "fish"],
          bank: ["like", "fish", "My", "doesn't", "brother", "likes", "don't"],
          hint: "Negativa com he, she, it: **doesn't + verbo sem -s**.",
          explanation:
            "Perfeito! “My brother doesn't like fish” = “Meu irmão não gosta de peixe.”",
          correction:
            "O certo é **My brother doesn't like fish.** Doesn't + like (sem -s).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She doesn't ",
          after: " in Rio.",
          options: ["live", "lives", "living"],
          correctAnswer: "live",
          hint: "Negativa com he, she, it: **doesn't + verbo sem -s**.",
          explanation: "Mandou bem! “She doesn't live in Rio” = “Ela não mora no Rio.”",
          correction: "Quase! Depois de doesn't, o verbo fica normal: **live.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My dad does ",
          after: " watch TV.",
          answer: "not",
          hint: "**doesn't** = does not.",
          explanation: "Isso! “My dad does not watch TV” = “Meu pai não assiste TV.”",
          correction: "A resposta é **not**: does not = doesn't.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O celular não funciona.",
          answer: ["The", "phone", "doesn't", "work"],
          bank: ["work", "The", "doesn't", "phone", "works", "don't"],
          hint: "The phone = it → **doesn't + work**.",
          explanation: "Muito bem! “The phone doesn't work” = “O celular não funciona.”",
          correction:
            "O certo é **The phone doesn't work.** It → doesn't + work (sem -s).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She doesn't have a car.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm66S9.mp3"),
          options: [
            "She has a car.",
            "She doesn't have a cat.",
            "She doesn't have a car.",
          ],
          correctAnswer: "She doesn't have a car.",
          hint: "Escute **doesn't have** ou **has**, e o final: **car** ou **cat**.",
          explanation: "Perfeito! “She doesn't have a car” = “Ela não tem carro.”",
          correction: "A frase é **She doesn't have a car.** Com doesn't, has vira have.",
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
          after: " speak French.",
          options: ["don't", "doesn't", "not"],
          correctAnswer: "doesn't",
          hint: "Lucas = he → **doesn't**.",
          explanation:
            "Mandou bem! “Lucas doesn't speak French” = “O Lucas não fala francês.” Lição completa! 🎉",
          correction: "Quase lá! Lucas = he → **doesn't.**",
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
