import createLessonScreen from "../../LessonScreen";

// Can / Can't, aula 4 (Questions): Can + sujeito + verbo? (Can you swim? / Can she cook?).
// Os 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o
// XP seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o
// do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " you swim? – Yes, I can.",
          options: ["Do", "Can", "Are"],
          correctAnswer: "Can",
          hint: "Pergunta: **Can + sujeito + verbo?** → Can you swim?",
          explanation: "Isso aí! “Can you swim?” = “Você sabe nadar?”",
          correction: "Quase! A resposta usa “can”, então a pergunta é **Can you swim?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você sabe cozinhar?",
          answer: ["Can", "you", "cook"],
          bank: ["cook", "you", "Can", "You", "can", "to"],
          hint: "Pergunta: **Can + sujeito + verbo?** → Can you swim?",
          explanation: "Perfeito! “Can you cook?” = “Você sabe cozinhar?”",
          correction: "O certo é **Can you cook?** Na pergunta, “can” vem primeiro.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can she dance?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm07S3.mp3"),
          options: ["She can dance.", "Can she dance?", "Can he dance?"],
          correctAnswer: "Can she dance?",
          hint: "Escute o começo: **Can she** (pergunta) ou **She can** (afirmação)?",
          explanation: "Ótimo ouvido! “Can she dance?” = “Ela sabe dançar?”",
          correction:
            "A frase é **Can she dance?** Ela começa com “Can”, por isso é pergunta.",
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
            ["Can you sing?", "Você sabe cantar?"],
            ["Can he drive?", "Ele sabe dirigir?"],
            ["Can they come?", "Eles podem vir?"],
            ["Can we go?", "Nós podemos ir?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint: "Olhe o sujeito depois de Can: **you, he, they** ou **we**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **you** = você · **he** = ele · **they** = eles · **we** = nós.",
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
          after: " your brother play the guitar? – Yes, he can.",
          answer: "Can",
          hint: "Pergunta: **Can + sujeito + verbo?** → Can you swim?",
          explanation:
            "Isso! “Can your brother play the guitar?” = “Seu irmão sabe tocar violão?”",
          correction: "A palavra certa é **Can**: a resposta usa “can”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Can you ",
          after: " me?",
          options: ["helps", "to help", "help"],
          correctAnswer: "help",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation: "Mandou bem! “Can you help me?” = “Você pode me ajudar?”",
          correction: "Quase! Depois de can + sujeito, o verbo fica normal: **help.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Seus pais sabem falar inglês?",
          answer: ["Can", "your", "parents", "speak", "English"],
          bank: ["speak", "your", "Can", "English", "parents", "speaks", "to"],
          hint: "Pergunta: **Can + sujeito + verbo?** → Can you swim?",
          explanation:
            "Muito bem! “Can your parents speak English?” = “Seus pais sabem falar inglês?”",
          correction:
            "O certo é **Can your parents speak English?** Can + your parents + speak.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Can she ",
          after: " (ride) a bike?",
          answer: "ride",
          hint: "**can + verbo normal**: I can swim. Sem **to** e sem **-s**.",
          explanation: "Isso! “Can she ride a bike?” = “Ela sabe andar de bicicleta?”",
          correction: "A resposta é **ride**: verbo normal depois de can + sujeito.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Can I sit here?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm07S9.mp3"),
          options: ["Can I sit here?", "Can I eat here?", "Can we sit here?"],
          correctAnswer: "Can I sit here?",
          hint: "Escute **I** ou **we**, e o verbo: **sit** (sentar) ou **eat** (comer).",
          explanation: "Perfeito! “Can I sit here?” = “Posso sentar aqui?”",
          correction: "A frase é **Can I sit here?** Use o botão 0.5× para ouvir “sit”.",
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
          after: " you speak Japanese? – No, I can't.",
          options: ["Can", "Do", "Are"],
          correctAnswer: "Can",
          hint: "Pergunta: **Can + sujeito + verbo?** → Can you swim?",
          explanation:
            "Mandou bem! “Can you speak Japanese?” = “Você sabe falar japonês?” Lição completa! 🎉",
          correction:
            "Quase lá! A resposta usa “can't”, então a pergunta é **Can you…?**",
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
