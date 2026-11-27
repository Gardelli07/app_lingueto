import createLessonScreen from "../../LessonScreen";

// Past simple, aula 17 (Review 2): Revisão: aulas 9 a 15 (didn't, Did…?,
// respostas curtas, wh-questions, ago / last, was × did). Os 5 tipos do
// Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de um
// slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " see you at the party last night.",
          options: ["didn't", "wasn't", "don't"],
          correctAnswer: "didn't",
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Isso aí! “I didn't see you at the party” = “Eu não te vi na festa.”",
          correction: "Quase! Ação no passado → **didn't see.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você ligou para ela?",
          answer: ["Did", "you", "call", "her"],
          bank: ["call", "her", "Did", "you", "called", "she"],
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Perfeito! “Did you call her?” = “Você ligou para ela?”",
          correction: "O certo é **Did you call her?** Did + you + call (sem -ed).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "No, she didn't.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm31S3.mp3"),
          options: ["No, she wasn't.", "No, she didn't.", "Yes, she did."],
          correctAnswer: "No, she didn't.",
          hint: "Escute **Yes** ou **No**, e o final: **didn't** ou **wasn't**.",
          explanation: "Ótimo ouvido! “No, she didn't” = “Não, ela não.”",
          correction:
            "A frase é **No, she didn't.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What did you ",
          after: " (do) last weekend?",
          answer: "do",
          hint:
            "**Palavra de pergunta + did + sujeito + verbo normal**: Where did you go?",
          explanation:
            "Isso! “What did you do last weekend?” = “O que você fez no fim de semana passado?”",
          correction: "A palavra certa é **do**: depois de did, verbo normal.",
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
            ["Where did you go?", "Aonde você foi?"],
            ["Where were you?", "Onde você estava?"],
            ["two days ago", "dois dias atrás"],
            ["After that", "Depois disso"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "**did … go** = ação (foi) · **were** = estado (estava).",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **did you go** = você foi · **were you** = você estava · **ago** = atrás · **after that** = depois disso.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did she ",
          after: " the test?",
          options: ["passed", "pass", "passes"],
          correctAnswer: "pass",
          hint:
            "Pergunta: **Did + sujeito + verbo normal?** → Did you go? (e não “Did you went?”)",
          explanation: "Mandou bem! “Did she pass the test?” = “Ela passou na prova?”",
          correction: "Quase! Depois de Did, verbo normal: **pass.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We moved to São Paulo five years ",
          after: ".",
          answer: "ago",
          hint:
            "Passado: **yesterday**, **last night / week / year**, **two days ago**, **in 2010**.",
          explanation:
            "Isso! “We moved to São Paulo five years ago” = “Nós nos mudamos para São Paulo cinco anos atrás.”",
          correction: "A resposta é **ago**: five years ago = cinco anos atrás.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele não foi trabalhar ontem.",
          answer: ["He", "didn't", "go", "to", "work", "yesterday"],
          bank: ["go", "to", "He", "didn't", "work", "yesterday", "went", "wasn't"],
          hint: "Negativa: **didn't + verbo normal**: I didn't go (e não “didn't went”).",
          explanation:
            "Muito bem! “He didn't go to work yesterday” = “Ele não foi trabalhar ontem.”",
          correction:
            "O certo é **He didn't go to work yesterday.** Didn't + go (não “went”).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Where were you last night?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm31S9.mp3"),
          options: [
            "Where were you last night?",
            "Where did you go last night?",
            "Where were you last week?",
          ],
          correctAnswer: "Where were you last night?",
          hint: "Escute **were you** ou **did you go**, e **night** ou **week**.",
          explanation:
            "Perfeito! “Where were you last night?” = “Onde você estava ontem à noite?”",
          correction:
            "A frase é **Where were you last night?** Use o botão 0.5× para ouvir “were you”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Did you have a good weekend? – Yes, I ",
          after: ".",
          options: ["was", "did", "had"],
          correctAnswer: "did",
          hint:
            "Resposta curta: **Yes, I did.** / **No, she didn't.** (com ação). Com be: **Yes, I was.**",
          explanation:
            "Mandou bem! “Yes, I did” = “Sim, tive.” Você terminou o past simple! 🎉",
          correction: "Quase lá! A pergunta usa “Did”: **Yes, I did.**",
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
