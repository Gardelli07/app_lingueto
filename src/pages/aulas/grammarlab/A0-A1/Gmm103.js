import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 10 (Review): Revisão: uma mistura das aulas 1 a 9. Os 5
// tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "You ",
          after: " my best friend.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "I → **am** · he / she / it → **is** · you / we / they → **are**",
          explanation: "Isso aí! “You are my best friend” = “Você é meu melhor amigo.”",
          correction: "Quase! Com “You” usamos are: **You are my best friend.**",
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
            ["She isn't", "Ela não é"],
            ["Are they?", "Eles são?"],
            ["We're", "Nós somos"],
            ["Where is", "Onde está"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Procure as pistas: **n't** = negativa, **?** = pergunta, **'re** = are.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **isn't** = não é, **Are they?** = eles são?, **We're** = nós somos, **Where** = onde.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não está cansado.",
          answer: ["He", "isn't", "tired"],
          bank: ["tired", "aren't", "He", "She", "isn't", "is"],
          hint: "“Ele” = **He**. Negativa com he: **isn't**.",
          explanation: "Perfeito! “He isn't tired” = “Ele não está cansado.”",
          correction: "O certo é **He isn't tired.** Com “He”, a negativa é “isn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is she twenty years old?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm103S4.mp3"),
          options: [
            "She is twenty years old.",
            "Is she twenty years old?",
            "Is she twelve years old?",
          ],
          correctAnswer: "Is she twenty years old?",
          hint:
            "Escute o começo (**Is she** = pergunta) e o número (**twenty** ou **twelve**).",
          explanation: "Ótimo ouvido! “Is she twenty years old?” = “Ela tem vinte anos?”",
          correction:
            "A frase é **Is she twenty years old?** Use o botão 0.5× para ouvir “twenty” (20) e não “twelve” (12).",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My friends ",
          after: " from Brazil.",
          answer: "are",
          hint: "My friends = eles (**they**).",
          explanation:
            "Isso! “My friends are from Brazil” = “Meus amigos são do Brasil.”",
          correction:
            "A palavra certa é **are**: My friends are from Brazil. Plural usa “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Are you hungry? – No, I'm ",
          after: ".",
          options: ["isn't", "not", "aren't"],
          correctAnswer: "not",
          hint: "Com I, a negativa é **I'm not**. Não existe “I'm isn't”.",
          explanation: "Mandou bem! “No, I'm not” = “Não, não estou.”",
          correction: "Quase! Com “I” a negativa é not: **No, I'm not.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Onde está a sua mãe?",
          answer: ["Where", "is", "your", "mother"],
          bank: ["mother", "is", "What", "your", "Where", "are"],
          hint: "“Onde” = **Where**. Your mother é uma pessoa só: use **is**.",
          explanation: "Muito bem! “Where is your mother?” = “Onde está a sua mãe?”",
          correction: "O certo é **Where is your mother?** Uma pessoa só leva “is”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They aren't at home.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm103S8.mp3"),
          options: ["They are at home.", "We aren't at home.", "They aren't at home."],
          correctAnswer: "They aren't at home.",
          hint: "Escute o sujeito (**They** ou **We**) e se tem **aren't** (negativa).",
          explanation: "Perfeito! “They aren't at home” = “Eles não estão em casa.”",
          correction:
            "A frase é **They aren't at home.** Use o botão 0.5× para ouvir o “n't” de “aren't”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "",
          after: " is your name?",
          answer: "What",
          hint: "Para perguntar o nome, qual palavra usamos? (o que / qual)",
          explanation: "Isso! “What is your name?” = “Qual é o seu nome?”",
          correction: "A resposta é **What**: What is your name? “Where” seria “onde”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It ",
          after: " 3 o'clock.",
          options: ["are", "is", "am"],
          correctAnswer: "is",
          hint: "Para dizer as horas, usamos **It is**.",
          explanation:
            "Mandou bem! “It is 3 o'clock” = “São 3 horas.” Você terminou o verbo to be! 🎉",
          correction: "Quase lá! As horas usam It is: **It is 3 o'clock.**",
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
