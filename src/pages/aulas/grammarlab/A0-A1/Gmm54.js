import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 12 (Future plans): Planos combinados: I'm meeting
// Ana tomorrow · tonight, next week, this weekend. Os 5 tipos do Grammar Lab
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
          before: "I ",
          after: " meeting Ana tomorrow.",
          options: ["am", "is", "do"],
          correctAnswer: "am",
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Isso aí! “I am meeting Ana tomorrow” = “Vou me encontrar com a Ana amanhã.”",
          correction: "Quase! Com “I”: **I am meeting Ana tomorrow.**",
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
            ["tomorrow", "amanhã"],
            ["tonight", "hoje à noite"],
            ["next week", "semana que vem"],
            ["this weekend", "neste fim de semana"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation: "Mandou bem! Todas as expressões certas.",
          correction:
            "Esse par não combina. **tomorrow** = amanhã · **tonight** = hoje à noite · **next week** = semana que vem · **this weekend** = neste fim de semana.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós vamos viajar no sábado.",
          answer: ["We", "are", "traveling", "on", "Saturday"],
          bank: ["traveling", "on", "We", "Saturday", "are", "travel", "in"],
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Perfeito! “We are traveling on Saturday” = “Nós vamos viajar no sábado.”",
          correction:
            "O certo é **We are traveling on Saturday.** Plano combinado → are + traveling.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She's flying to Paris next week.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm54S4.mp3"),
          options: [
            "She's flying to Paris this week.",
            "She's flying to Paris next week.",
            "He's flying to Paris next week.",
          ],
          correctAnswer: "She's flying to Paris next week.",
          hint: "Escute **She's** ou **He's**, e **next week** ou **this week**.",
          explanation:
            "Ótimo ouvido! “She's flying to Paris next week” = “Ela vai voar para Paris semana que vem.”",
          correction:
            "A frase é **She's flying to Paris next week.** Use o botão 0.5× para ouvir “next”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What are you ",
          after: " (do) this weekend?",
          answer: "doing",
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Isso! “What are you doing this weekend?” = “O que você vai fazer neste fim de semana?”",
          correction: "A palavra certa é **doing**: do + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "They ",
          after: " having a party on Friday.",
          options: ["are", "is", "am"],
          correctAnswer: "are",
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Mandou bem! “They are having a party on Friday” = “Eles vão dar uma festa na sexta.”",
          correction: "Quase! Com “they”: **They are having a party.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I'm ",
          after: " (see) the doctor tomorrow.",
          answer: "seeing",
          hint: "**see** termina em ee: só coloque -ing → **seeing**.",
          explanation: "Isso! “I'm seeing the doctor tomorrow” = “Vou ao médico amanhã.”",
          correction: "A resposta é **seeing**: see + ing (o “ee” fica).",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele vai jantar com a gente hoje à noite.",
          answer: ["He", "is", "having", "dinner", "with", "us", "tonight"],
          bank: ["having", "dinner", "He", "with", "is", "us", "tonight", "has", "we"],
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Muito bem! “He is having dinner with us tonight” = “Ele vai jantar com a gente hoje à noite.”",
          correction:
            "O certo é **He is having dinner with us tonight.** “Com a gente” = with us.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are you coming tomorrow?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm54S9.mp3"),
          options: [
            "Are you coming today?",
            "Is he coming tomorrow?",
            "Are you coming tomorrow?",
          ],
          correctAnswer: "Are you coming tomorrow?",
          hint: "Escute **Are you** ou **Is he**, e **tomorrow** ou **today**.",
          explanation: "Perfeito! “Are you coming tomorrow?” = “Você vem amanhã?”",
          correction:
            "A frase é **Are you coming tomorrow?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " visiting us next month.",
          options: ["is", "are", "does"],
          correctAnswer: "are",
          hint:
            "Plano já combinado para o futuro também usa o **present continuous**: I'm meeting Ana tomorrow.",
          explanation:
            "Mandou bem! “My parents are visiting us next month” = “Meus pais vêm nos visitar mês que vem.” Lição completa! 🎉",
          correction: "Quase lá! My parents = they → **are visiting.**",
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
