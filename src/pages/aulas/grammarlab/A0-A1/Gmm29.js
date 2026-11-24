import createLessonScreen from "../../LessonScreen";

// Past simple, aula 15 (Telling a story): Contar o que aconteceu: First,
// Then, After that, Finally. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["First", "Primeiro"],
            ["Then", "Depois / Então"],
            ["After that", "Depois disso"],
            ["Finally", "Por fim"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a word, then its translation.",
          hint: "Para contar uma história: **First… Then… After that… Finally…**",
          explanation: "Mandou bem! Agora você sabe organizar uma história.",
          correction:
            "Esse par não combina. **First** = primeiro · **Then** = depois · **After that** = depois disso · **Finally** = por fim.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: ", I woke up at 7. Then I had breakfast.",
          options: ["Finally", "First", "After"],
          correctAnswer: "First",
          hint: "Para contar uma história: **First… Then… After that… Finally…**",
          explanation: "Isso aí! “First, I woke up at 7” = “Primeiro, eu acordei às 7.”",
          correction: "Quase! A história começa com **First** (primeiro).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Then we went to the beach.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm29S3.mp3"),
          options: [
            "Then we went to the beach.",
            "Then we go to the beach.",
            "Then they went to the beach.",
          ],
          correctAnswer: "Then we went to the beach.",
          hint: "Escute **went** ou **go**, e **we** ou **they**.",
          explanation:
            "Ótimo ouvido! “Then we went to the beach” = “Depois nós fomos à praia.”",
          correction:
            "A frase é **Then we went to the beach.** Use o botão 0.5× para ouvir “went”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Last Saturday I ",
          after: " (wake) up late.",
          answer: "woke",
          hint: "**wake** é irregular: wake → **woke**.",
          explanation:
            "Isso! “Last Saturday I woke up late” = “Sábado passado eu acordei tarde.”",
          correction: "A palavra certa é **woke**: wake → woke.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Depois disso, nós fomos para casa.",
          answer: ["After", "that,", "we", "went", "home"],
          bank: ["After", "that,", "we", "went", "home", "go", "to"],
          hint: "“Ir para casa” = **go home** (sem “to”!). No passado: **went home**.",
          explanation:
            "Perfeito! “After that, we went home” = “Depois disso, nós fomos para casa.”",
          correction: "O certo é **After that, we went home.** Com home, não use “to”.",
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
          after: " a lot of photos on our trip last month.",
          options: ["take", "took", "taked"],
          correctAnswer: "took",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation:
            "Mandou bem! “We took a lot of photos” = “Nós tiramos muitas fotos.”",
          correction: "Quase! Take → **took.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Yesterday morning, first she ",
          after: " (make) coffee.",
          answer: "made",
          hint:
            "Verbos irregulares **não usam -ed**: cada um tem sua forma. É preciso decorar!",
          explanation: "Isso! “First she made coffee” = “Primeiro ela fez café.”",
          correction: "A resposta é **made**: make → made.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Por fim, eu fui dormir.",
          answer: ["Finally,", "I", "went", "to", "bed"],
          bank: ["Finally,", "I", "went", "to", "bed", "go", "the"],
          hint: "“Ir dormir” = **go to bed**. No passado: **went to bed**.",
          explanation: "Muito bem! “Finally, I went to bed” = “Por fim, eu fui dormir.”",
          correction: "O certo é **Finally, I went to bed.** Go → went.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "It was a perfect day.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm29S9.mp3"),
          options: [
            "It is a perfect day.",
            "It was a terrible day.",
            "It was a perfect day.",
          ],
          correctAnswer: "It was a perfect day.",
          hint: "Escute **was** ou **is**, e **perfect** ou **terrible**.",
          explanation: "Perfeito! “It was a perfect day” = “Foi um dia perfeito.”",
          correction:
            "A frase é **It was a perfect day.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Finally, we ",
          after: " home at midnight.",
          options: ["arrive", "arrived", "arriving"],
          correctAnswer: "arrived",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation:
            "Mandou bem! “Finally, we arrived home at midnight” = “Por fim, chegamos em casa à meia-noite.” Lição completa! 🎉",
          correction: "Quase lá! Arrive + d = **arrived.**",
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
