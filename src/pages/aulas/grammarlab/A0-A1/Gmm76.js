import createLessonScreen from "../../LessonScreen";

// Present simple, aula 18 (Review 1): Revisão: aulas 1 a 8 (afirmativa, -s /
// -es / -ies, have / has, negativas). Os 5 tipos do Grammar Lab alternados,
// uma pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " in an office.",
          options: ["work", "works", "working"],
          correctAnswer: "works",
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation:
            "Isso aí! “He works in an office” = “Ele trabalha num escritório.”",
          correction: "Quase! Com “he”, o verbo ganha -s: **works.**",
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
          after: " (watch) TV every night.",
          answer: "watches",
          hint:
            "Verbos que terminam em **s, sh, ch, x, o** ganham **-es** com he / she / it: watch → watches, go → goes.",
          explanation:
            "Isso! “She watches TV every night” = “Ela assiste TV toda noite.”",
          correction: "A palavra certa é **watches**: watch termina em “ch” → -es.",
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
            ["have", "has"],
            ["go", "goes"],
            ["play", "plays"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its he / she / it form.",
          hint: "Lembre: **-ies, has, -es** e **-s**.",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. study → **studies** · have → **has** · go → **goes** · play → **plays**.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não como carne.",
          answer: ["I", "don't", "eat", "meat"],
          bank: ["eat", "meat", "I", "don't", "doesn't", "eats"],
          hint: "Negativa com I, you, we, they: **don't + verbo normal**.",
          explanation: "Perfeito! “I don't eat meat” = “Eu não como carne.”",
          correction: "O certo é **I don't eat meat.** I → don't + eat.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My sister doesn't drink coffee.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm76S5.mp3"),
          options: [
            "My sister doesn't drink coffee.",
            "My sister drinks coffee.",
            "My brother doesn't drink coffee.",
          ],
          correctAnswer: "My sister doesn't drink coffee.",
          hint: "Escute **sister** ou **brother**, e se tem **doesn't**.",
          explanation:
            "Ótimo ouvido! “My sister doesn't drink coffee” = “Minha irmã não bebe café.”",
          correction:
            "A frase é **My sister doesn't drink coffee.** Use o botão 0.5× para ouvir “doesn't”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " a big family.",
          options: ["have", "has", "haves"],
          correctAnswer: "have",
          hint: "I, you, we, they → **have** · he, she, it → **has**.",
          explanation:
            "Mandou bem! “We have a big family” = “Nós temos uma família grande.”",
          correction: "Quase! Com “we”, use **have.**",
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
          after: " (speak) Spanish.",
          answer: "speak",
          hint: "Negativa com he, she, it: **doesn't + verbo sem -s**.",
          explanation: "Isso! “He doesn't speak Spanish” = “Ele não fala espanhol.”",
          correction: "A resposta é **speak**: depois de doesn't, sem -s.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Meu pai acorda às 5.",
          answer: ["My", "dad", "wakes", "up", "at", "5"],
          bank: ["wakes", "up", "My", "at", "dad", "5", "wake"],
          hint: "Com he, she, it, o verbo ganha **-s**: she works, he lives.",
          explanation: "Muito bem! “My dad wakes up at 5” = “Meu pai acorda às 5.”",
          correction: "O certo é **My dad wakes up at 5.** My dad = he → wakes.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They don't work on Sundays.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm76S9.mp3"),
          options: [
            "They work on Sundays.",
            "They don't walk on Sundays.",
            "They don't work on Sundays.",
          ],
          correctAnswer: "They don't work on Sundays.",
          hint: "Escute se tem **don't**, e **work** (trabalhar) ou **walk** (caminhar).",
          explanation:
            "Perfeito! “They don't work on Sundays” = “Eles não trabalham aos domingos.”",
          correction:
            "A frase é **They don't work on Sundays.** Use o botão 0.5× para ouvir “work”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My mom ",
          after: " English every day.",
          options: ["studys", "studies", "study"],
          correctAnswer: "studies",
          hint:
            "consoante + y → **ies** (study → studies) · vogal + y → **só s** (play → plays).",
          explanation:
            "Mandou bem! “My mom studies English every day” = “Minha mãe estuda inglês todo dia.” Revisão 1 completa! 🎉",
          correction: "Quase lá! Study → **studies** com he / she.",
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
