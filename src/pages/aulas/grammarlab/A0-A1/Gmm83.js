import createLessonScreen from "../../LessonScreen";

// There is / There are, aula 6 (Questions): Is there…? / Are there any…?. Os
// 5 tipos do Grammar Lab alternados, uma pergunta por slide. O combo e o XP
// seguem de um slide para o outro (ComboSlide). `explanation` e o texto do
// acerto (guardado, o painel de acerto nao mostra texto); `correction` e o do
// erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "",
          after: " a bank near here?",
          options: ["Are there", "Is there", "There is"],
          correctAnswer: "Is there",
          hint: "Pergunta: **troque a ordem** → Is there…? / Are there…?",
          explanation:
            "Isso aí! “Is there a bank near here?” = “Tem um banco perto daqui?”",
          correction: "Quase! Pergunta com uma coisa → **Is there a bank…?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem um banheiro aqui?",
          answer: ["Is", "there", "a", "bathroom", "here"],
          bank: ["bathroom", "there", "Is", "here", "a", "Are", "There", "is"],
          hint: "Pergunta: **troque a ordem** → Is there…? / Are there…?",
          explanation: "Perfeito! “Is there a bathroom here?” = “Tem um banheiro aqui?”",
          correction:
            "O certo é **Is there a bathroom here?** Na pergunta, “is” vem primeiro.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Are there any chairs?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm83S3.mp3"),
          options: [
            "There are some chairs.",
            "Are there any chairs?",
            "Is there a chair?",
          ],
          correctAnswer: "Are there any chairs?",
          hint: "Escute o começo: **Are there** (pergunta) ou **There are** (afirmação)?",
          explanation: "Ótimo ouvido! “Are there any chairs?” = “Tem cadeiras?”",
          correction:
            "A frase é **Are there any chairs?** Ela começa com “Are”, por isso é pergunta.",
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
            ["Is there a park?", "Tem um parque?"],
            ["Are there any parks?", "Tem parques?"],
            ["Is there any milk?", "Tem leite?"],
            ["Are there any eggs?", "Tem ovos?"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint:
            "**Is there** = uma coisa ou algo que não se conta · **Are there any** = várias.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction:
            "Esse par não combina. **Is there a park?** = um parque · **Are there any parks?** = parques.",
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
          after: " there a hotel in your city?",
          answer: "Is",
          hint: "Pergunta: **troque a ordem** → Is there…? / Are there…?",
          explanation:
            "Isso! “Is there a hotel in your city?” = “Tem um hotel na sua cidade?”",
          correction: "A palavra certa é **Is**: um hotel → Is there…?",
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
          after: " there any students in the room?",
          options: ["Are", "Is", "Am"],
          correctAnswer: "Are",
          hint: "Pergunta: **troque a ordem** → Is there…? / Are there…?",
          explanation:
            "Mandou bem! “Are there any students in the room?” = “Tem alunos na sala?”",
          correction: "Quase! Students é plural → **Are there…?**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Tem ovos?",
          answer: ["Are", "there", "any", "eggs"],
          bank: ["eggs", "there", "any", "Are", "Is", "some"],
          hint: "Plural → **Are there any…?** Na pergunta usamos any.",
          explanation: "Muito bem! “Are there any eggs?” = “Tem ovos?”",
          correction: "O certo é **Are there any eggs?** Na pergunta, use “any”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Are there ",
          after: " good restaurants here?",
          answer: "any",
          hint: "Na pergunta com plural, usamos **any**.",
          explanation:
            "Isso! “Are there any good restaurants here?” = “Tem restaurantes bons aqui?”",
          correction: "A resposta é **any**: Are there any…?",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Is there a supermarket near your house?",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm83S9.mp3"),
          options: [
            "There is a supermarket near your house.",
            "Is there a supermarket near my house?",
            "Is there a supermarket near your house?",
          ],
          correctAnswer: "Is there a supermarket near your house?",
          hint: "Escute o começo (**Is there** ou **There is**) e **your** ou **my**.",
          explanation:
            "Perfeito! “Is there a supermarket near your house?” = “Tem um supermercado perto da sua casa?”",
          correction:
            "A frase é **Is there a supermarket near your house?** Use o botão 0.5× para ouvir “your”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Is there ",
          after: " water in the bottle?",
          options: ["a", "any", "many"],
          correctAnswer: "any",
          hint: "Água não se conta. Na pergunta: **Is there any water?**",
          explanation:
            "Mandou bem! “Is there any water in the bottle?” = “Tem água na garrafa?” Lição completa! 🎉",
          correction:
            "Quase lá! Água não se conta, e na pergunta usamos any: **Is there any water?**",
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
