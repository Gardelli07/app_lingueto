import createLessonScreen from "../../LessonScreen";

const LESSON_SLIDES = [
  {
    component: "Exercise23",
    activity: {
      expressions: [
        {
          id: "break-the-ice",
          phrase: "Break the ice",
          meaning: "Make people feel relaxed when things are awkward.",
          meaningPt: "Deixar as pessoas à vontade quando o clima está estranho.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex01.mp3"),
          image: require("../../../../../assets/EX/A0-A1/break-the-ice.jpg"),
          meaningCheck: {
            options: [
              { text: "Esfriar uma bebida" },
              { text: "Deixar as pessoas à vontade", correct: true },
              { text: "Terminar uma amizade" },
            ],
            answer: "deixar as pessoas à vontade",
            correctExplanation: "É isso: {answer}, igual a “quebrar o gelo”.",
            wrongExplanation:
              "É {answer}, como “quebrar o gelo” em português. Não é gelo de verdade.",
          },
          fillBlank: {
            before: "This party is so quiet. Let’s play a game to",
            after: ".",
            translation: "Essa festa está muito parada. Vamos jogar um jogo pra ___.",
            distractors: ["hit the sack", "spill the beans", "call it a day"],
            correctExplanation: "Perfeito! Um jogo ajuda a {answer}.",
            wrongExplanation:
              "O certo é {answer}: um jogo deixa todo mundo à vontade.",
          },
        },
        {
          id: "call-it-a-day",
          phrase: "Call it a day",
          meaning: "Stop working on something for today.",
          meaningPt: "Parar de trabalhar em algo por hoje.",
          audio: require("../../../../../mp3/EX/A0-A1/Ex01B.mp3"),
          image: require("../../../../../assets/EX/A0-A1/call-it-a-day.webp"),
          meaningCheck: {
            options: [
              { text: "Ligar para alguém" },
              { text: "Encerrar por hoje", correct: true },
              { text: "Marcar um encontro" },
            ],
            answer: "encerrar por hoje",
            correctExplanation: "Isso! Significa {answer}.",
            wrongExplanation:
              "Significa {answer}: parar de trabalhar e descansar.",
          },
          fillBlank: {
            before: "We’ve been working for ten hours. Let’s",
            after: "!",
            translation: "Estamos trabalhando há dez horas. Vamos ___!",
            distractors: ["break the ice", "hit the sack", "spill the beans"],
            correctExplanation:
              "Mandou bem! Depois de 10 horas, é hora de {answer}.",
            wrongExplanation: "O certo é {answer}: parar o trabalho por hoje.",
          },
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
  storageKey: "@curso_progress_expressions_A0-A1",
  nextRouteName: "Expressions",
  screenName: "ExpressionsA0A1LessonScreen",
});
