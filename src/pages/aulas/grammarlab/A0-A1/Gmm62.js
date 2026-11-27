import createLessonScreen from "../../LessonScreen";

// Present simple, aula 4 (-ies / -ys): consoante + y → ies (study → studies)
// · vogal + y → s (play → plays). Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " English every day.",
          options: ["studys", "studies", "study"],
          correctAnswer: "studies",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation:
            "Isso aí! “She studies English every day” = “Ela estuda inglês todo dia.”",
          correction: "Quase! Study termina em consoante + y → **studies.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "He ",
          after: " (play) the guitar.",
          answer: "plays",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation: "Isso! “He plays the guitar” = “Ele toca violão.”",
          correction:
            "A palavra certa é **plays**: play tem vogal antes do y, então é só -s.",
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
            ["study", "studies"],
            ["cry", "cries"],
            ["play", "plays"],
            ["buy", "buys"],
          ],
          rightOrder: [2, 3, 0, 1],
          instruction: "Tap a verb, then its he / she / it form.",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. study → **studies** · cry → **cries** · play → **plays** · buy → **buys**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The baby cries at night.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm62S4.mp3"),
          options: [
            "The baby cries at night.",
            "The babies cry at night.",
            "The baby cries at noon.",
          ],
          correctAnswer: "The baby cries at night.",
          hint:
            "Escute **baby cries** (um) ou **babies cry** (vários), e **night** ou **noon**.",
          explanation:
            "Ótimo ouvido! “The baby cries at night” = “O bebê chora à noite.”",
          correction:
            "A frase é **The baby cries at night.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela tenta de novo.",
          answer: ["She", "tries", "again"],
          bank: ["tries", "She", "again", "try", "trys"],
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation: "Perfeito! “She tries again” = “Ela tenta de novo.”",
          correction: "O certo é **She tries again.** Try → tries.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My brother ",
          after: " (fly) to Rio every month.",
          answer: "flies",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation:
            "Isso! “My brother flies to Rio every month” = “Meu irmão voa para o Rio todo mês.”",
          correction: "A resposta é **flies**: fly → flies.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " a lot of money for his car.",
          options: ["paies", "pay", "pays"],
          correctAnswer: "pays",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation:
            "Mandou bem! “He pays a lot of money for his car” = “Ele paga muito dinheiro pelo carro.”",
          correction: "Quase! Pay tem vogal antes do y → **pays.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu pai compra pão todo dia.",
          answer: ["My", "dad", "buys", "bread", "every", "day"],
          bank: ["buys", "bread", "My", "every", "dad", "day", "buies", "buy"],
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation:
            "Muito bem! “My dad buys bread every day” = “Meu pai compra pão todo dia.”",
          correction:
            "O certo é **My dad buys bread every day.** Buy tem vogal antes do y → buys.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She ",
          after: " (carry) a big bag.",
          answer: "carries",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation: "Isso! “She carries a big bag” = “Ela carrega uma bolsa grande.”",
          correction: "A resposta é **carries**: carry → carries.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He stays at home on Mondays.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm62S10.mp3"),
          options: [
            "He studies at home on Mondays.",
            "He stays at home on Mondays.",
            "He stays at home on Sundays.",
          ],
          correctAnswer: "He stays at home on Mondays.",
          hint: "Escute **stays** (fica) ou **studies** (estuda), e o dia.",
          explanation:
            "Perfeito! “He stays at home on Mondays” = “Ele fica em casa às segundas.” Lição completa! 🎉",
          correction:
            "A frase é **He stays at home on Mondays.** Use o botão 0.5× para ouvir “stays”.",
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
