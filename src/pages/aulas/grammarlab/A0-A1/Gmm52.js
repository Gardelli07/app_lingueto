import createLessonScreen from "../../LessonScreen";

// Present continuous, aula 10 (Wh-questions): What / Where / Why / Who + am /
// is / are + sujeito + verbo-ing?. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What ",
          after: " you doing?",
          options: ["is", "are", "do"],
          correctAnswer: "are",
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation: "Isso aí! “What are you doing?” = “O que você está fazendo?”",
          correction: "Quase! Com “you”: **What are you doing?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Aonde você está indo?",
          answer: ["Where", "are", "you", "going"],
          bank: ["going", "you", "Where", "are", "do", "go", "What"],
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation: "Perfeito! “Where are you going?” = “Aonde você está indo?”",
          correction: "O certo é **Where are you going?** Where + are + you + going.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "What is she eating?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm52S3.mp3"),
          options: ["What is she eating?", "What is he eating?", "Where is she eating?"],
          correctAnswer: "What is she eating?",
          hint: "Escute **What** ou **Where**, e **she** ou **he**.",
          explanation: "Ótimo ouvido! “What is she eating?” = “O que ela está comendo?”",
          correction:
            "A frase é **What is she eating?** Use o botão 0.5× para ouvir “What”.",
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
            ["What are you doing?", "O que você está fazendo?"],
            ["Where are you going?", "Aonde você está indo?"],
            ["Why are you crying?", "Por que você está chorando?"],
            ["Who are you talking to?", "Com quem você está falando?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "**What** = o que · **Where** = onde · **Why** = por que · **Who** = quem.",
          explanation: "Mandou bem! Todas as perguntas certas.",
          correction:
            "Esse par não combina. **What** = o que · **Where** = aonde · **Why** = por que · **Who** = quem.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Why ",
          after: " he laughing?",
          answer: "is",
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation: "Isso! “Why is he laughing?” = “Por que ele está rindo?”",
          correction: "A palavra certa é **is**: com he, use is.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Who ",
          after: " they waiting for?",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation:
            "Mandou bem! “Who are they waiting for?” = “Quem eles estão esperando?”",
          correction: "Quase! Com “they”: **Who are they waiting for?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O que eles estão assistindo?",
          answer: ["What", "are", "they", "watching"],
          bank: ["watching", "they", "What", "are", "is", "Where", "watch"],
          hint:
            "**Palavra de pergunta + am / is / are + sujeito + verbo-ing**: What are you doing?",
          explanation:
            "Muito bem! “What are they watching?” = “O que eles estão assistindo?”",
          correction:
            "O certo é **What are they watching?** What + are + they + watching.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Where are you ",
          after: " (go)?",
          answer: "going",
          hint: "Present continuous = **am / is / are + verbo com -ing**: I am working.",
          explanation: "Isso! “Where are you going?” = “Aonde você está indo?”",
          correction: "A resposta é **going**: go + ing.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Why are you wearing a coat?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm52S9.mp3"),
          options: [
            "Why are you wearing a hat?",
            "Why are you wearing a coat?",
            "Where are you wearing a coat?",
          ],
          correctAnswer: "Why are you wearing a coat?",
          hint:
            "Escute **Why** ou **Where**, e o final: **coat** (casaco) ou **hat** (chapéu).",
          explanation:
            "Perfeito! “Why are you wearing a coat?” = “Por que você está usando casaco?”",
          correction:
            "A frase é **Why are you wearing a coat?** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "What ",
          after: " your sister studying?",
          options: ["are", "is", "does"],
          correctAnswer: "is",
          hint: "Your sister = she → **is**.",
          explanation:
            "Mandou bem! “What is your sister studying?” = “O que sua irmã está estudando?” Lição completa! 🎉",
          correction: "Quase lá! Your sister = she → **What is your sister studying?**",
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
