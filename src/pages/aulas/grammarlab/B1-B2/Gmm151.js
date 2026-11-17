import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 8 (Review): Revisão do Set 4:
// particípios, ever / never, respostas curtas, been × gone, first time. Os 5
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
          before: "I have ",
          after: " been to a concert.",
          options: ["never", "ever", "not ever"],
          correctAnswer: "never",
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation:
            "Isso aí! “I have never been to a concert” = “Nunca fui a um show.”",
          correction: "Quase! Nunca → **never.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "She has ",
          after: " (write) a novel.",
          answer: "written",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation: "Isso! “She has written a novel” = “Ela já escreveu um romance.”",
          correction: "A palavra certa é **written**: write → wrote → written.",
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
            ["go", "gone"],
            ["see", "seen"],
            ["take", "taken"],
            ["buy", "bought"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past participle.",
          hint: "Lembre os particípios: **gone, seen, taken, bought**.",
          explanation: "Mandou bem! Todos os particípios certos.",
          correction:
            "Esse par não combina. go → **gone** · see → **seen** · take → **taken** · buy → **bought**.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você já comeu comida tailandesa?",
          answer: ["Have", "you", "ever", "eaten", "Thai", "food"],
          bank: ["Have", "you", "ever", "eaten", "Thai", "food", "ate", "Did"],
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation: "Perfeito! “Have you ever eaten Thai food?”",
          correction:
            "O certo é **Have you ever eaten Thai food?** Have + you + ever + eaten.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We've never met before.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm151S5.mp3"),
          options: [
            "We never met before.",
            "We've never met before.",
            "We've never been here before.",
          ],
          correctAnswer: "We've never met before.",
          hint: "Escute **We've never met** e o final.",
          explanation:
            "Ótimo ouvido! “We've never met before” = “Nunca nos conhecemos antes.”",
          correction:
            "A frase é **We've never met before.** Use o botão 0.5× para ouvir “met”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Has he ever ridden a horse? – No, he ",
          after: ".",
          options: ["hasn't", "didn't", "haven't"],
          correctAnswer: "hasn't",
          hint:
            "Resposta curta: **Yes, I have.** / **No, I haven't.** · **Yes, she has.** / **No, she hasn't.**",
          explanation: "Mandou bem! “No, he hasn't” = “Não, nunca.”",
          correction: "Quase! He → **No, he hasn't.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "My best friend has ",
          after: " to Canada. He's living there now.",
          answer: "gone",
          hint:
            "**been to** = foi e já voltou (experiência) · **gone to** = foi e ainda está lá.",
          explanation:
            "Isso! “My best friend has gone to Canada” = “Meu melhor amigo foi para o Canadá (e está lá).”",
          correction: "A resposta é **gone**: ele ainda está lá.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "É o melhor livro que eu já li.",
          answer: ["It's", "the", "best", "book", "I've", "ever", "read"],
          bank: [
            "It's",
            "the",
            "best",
            "book",
            "I've",
            "ever",
            "read",
            "never",
            "readed",
          ],
          hint:
            "**It's the first time I've** + particípio · **the best / worst / most … I've ever** + particípio.",
          explanation: "Muito bem! “It's the best book I've ever read.”",
          correction:
            "O certo é **It's the best book I've ever read.** The best … I've ever + read.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Have you ever been to a wedding?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm151S9.mp3"),
          options: [
            "Have you ever been to a wedding?",
            "Have you ever been to a meeting?",
            "Did you go to a wedding?",
          ],
          correctAnswer: "Have you ever been to a wedding?",
          hint:
            "Escute **Have you ever been** e o final: **wedding** (casamento) ou **meeting**.",
          explanation:
            "Perfeito! “Have you ever been to a wedding?” = “Você já foi a um casamento?”",
          correction:
            "A frase é **Have you ever been to a wedding?** Use o botão 0.5× para ouvir o final.",
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
          after: " bought a new car.",
          options: ["has", "have", "are"],
          correctAnswer: "have",
          hint:
            "**Present perfect** = have / has + particípio: I have worked · she has visited. Usamos para experiências de vida, sem dizer quando.",
          explanation: "Mandou bem! “They have bought a new car.” Set 4 completo! 🎉",
          correction: "Quase lá! They → **have bought.**",
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
