import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 4 (Ever / never): Experiências de
// vida: Have you ever…? · I've never…. Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I have ",
          after: " been to Australia.",
          options: ["never", "ever", "not ever"],
          correctAnswer: "never",
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation:
            "Isso aí! “I have never been to Australia” = “Nunca estive na Austrália.”",
          correction: "Quase! Na afirmativa com sentido negativo → **never.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Have you ",
          after: " tried skydiving?",
          answer: "ever",
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation:
            "Isso! “Have you ever tried skydiving?” = “Você já fez paraquedismo?”",
          correction: "A palavra certa é **ever**: Have you ever…? = você já…?",
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
            ["Have you ever…?", "Você já… (alguma vez)?"],
            ["I've never…", "Eu nunca…"],
            ["She has never…", "Ela nunca…"],
            ["Has he ever…?", "Ele já…?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **ever** = já (na pergunta) · **never** = nunca.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Have you ever been to Mexico?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm147S4.mp3"),
          options: [
            "Have you ever been to Morocco?",
            "Have you ever been to Mexico?",
            "Did you ever go to Mexico?",
          ],
          correctAnswer: "Have you ever been to Mexico?",
          hint: "Escute **Have you ever been** e o país: **Mexico** ou **Morocco**.",
          explanation:
            "Ótimo ouvido! “Have you ever been to Mexico?” = “Você já foi ao México?”",
          correction:
            "A frase é **Have you ever been to Mexico?** Use o botão 0.5× para ouvir o país.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu nunca vi neve.",
          answer: ["I", "have", "never", "seen", "snow"],
          bank: ["I", "have", "never", "seen", "snow", "saw", "ever"],
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation: "Perfeito! “I have never seen snow” = “Eu nunca vi neve.”",
          correction: "O certo é **I have never seen snow.** Have + never + seen.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She has never ",
          after: " a plane.",
          options: ["took", "taken", "take"],
          correctAnswer: "taken",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation:
            "Mandou bem! “She has never taken a plane” = “Ela nunca andou de avião.”",
          correction: "Quase! Has never + particípio: **taken.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " eaten octopus. I'd like to try it!",
          answer: "never",
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation: "Isso! “I've never eaten octopus” = “Nunca comi polvo.”",
          correction: "A resposta é **never**: quer experimentar porque nunca comeu.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você já perdeu o celular?",
          answer: ["Have", "you", "ever", "lost", "your", "phone"],
          bank: ["Have", "you", "ever", "lost", "your", "phone", "Did", "lose"],
          hint:
            "Experiência na vida: **Have you ever…?** (já… alguma vez?) · **I've never…** (nunca). never já é negativo: não use not junto.",
          explanation: "Muito bem! “Have you ever lost your phone?”",
          correction:
            "O certo é **Have you ever lost your phone?** Have + you + ever + lost.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's never driven a car.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm147S9.mp3"),
          options: [
            "He never drove a car.",
            "She's never driven a car.",
            "He's never driven a car.",
          ],
          correctAnswer: "He's never driven a car.",
          hint: "Escute **He's** ou **She's**, e **driven** (particípio).",
          explanation:
            "Perfeito! “He's never driven a car” = “Ele nunca dirigiu um carro.”",
          correction: "A frase é **He's never driven a car.** He's = he has.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have you ever ",
          after: " a famous person?",
          options: ["met", "meet", "meeted"],
          correctAnswer: "met",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation:
            "Mandou bem! “Have you ever met a famous person?” Lição completa! 🎉",
          correction: "Quase lá! meet → met → **met.**",
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
