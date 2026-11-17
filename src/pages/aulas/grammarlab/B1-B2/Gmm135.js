import createLessonScreen from "../../LessonScreen";

// Past simple vs continuous (B1-B2), aula 6 (Setting the scene): Contar
// histórias: cenário (past continuous) + acontecimentos (past simple). Os 5
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
          before: "It was a beautiful morning. The sun ",
          after: " and the birds were singing.",
          options: ["shone", "was shining", "shines"],
          correctAnswer: "was shining",
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation:
            "Isso aí! “The sun was shining and the birds were singing” = “O sol brilhava e os pássaros cantavam.”",
          correction: "Quase! Cenário → past continuous: **the sun was shining.**",
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
            ["The wind was blowing.", "Estava ventando."],
            ["People were dancing.", "As pessoas estavam dançando."],
            ["Nobody was listening.", "Ninguém estava ouvindo."],
            ["The kids were playing outside.", "As crianças brincavam lá fora."],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation: "Mandou bem! Esse é o vocabulário de cenário.",
          correction:
            "Esse par não combina. **blowing** = ventando · **dancing** = dançando · **listening** = ouvindo · **playing** = brincando.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "It was late, and everyone was ",
          after: " (get) tired.",
          answer: "getting",
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation:
            "Isso! “Everyone was getting tired” = “Todos estavam ficando cansados.”",
          correction: "A palavra certa é **getting**: get dobra o “t”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The streets were empty and it was getting dark.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm135S4.mp3"),
          options: [
            "The streets were empty and it was getting dark.",
            "The streets were empty and it got dark.",
            "The streets were busy and it was getting dark.",
          ],
          correctAnswer: "The streets were empty and it was getting dark.",
          hint: "Escute **empty** (vazias) ou **busy**, e **was getting** ou **got**.",
          explanation: "Ótimo ouvido! “As ruas estavam vazias e estava escurecendo.”",
          correction:
            "A frase é **The streets were empty and it was getting dark.** Use o botão 0.5× para ouvir o começo.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Estava chovendo e ninguém estava na rua.",
          answer: ["It", "was", "raining", "and", "nobody", "was", "in", "the", "street"],
          bank: [
            "It",
            "was",
            "raining",
            "and",
            "nobody",
            "was",
            "in",
            "the",
            "street",
            "rained",
            "were",
          ],
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation: "Perfeito! “It was raining and nobody was in the street.”",
          correction:
            "O certo é **It was raining and nobody was in the street.** Nobody → was (singular).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Suddenly, someone ",
          after: " on the door.",
          options: ["knocked", "was knocking", "knocks"],
          correctAnswer: "knocked",
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation:
            "Mandou bem! “Suddenly, someone knocked on the door” = “De repente, alguém bateu na porta.”",
          correction: "Quase! “Suddenly” = algo que acontece de repente → **knocked.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "The music was loud and people were ",
          after: " (dance) everywhere.",
          answer: "dancing",
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation: "Isso! “People were dancing everywhere.”",
          correction: "A resposta é **dancing**: dance perde o “e”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Enquanto todos dormiam, o ladrão entrou.",
          answer: ["While", "everyone", "was", "sleeping,", "the", "thief", "came", "in"],
          bank: [
            "While",
            "everyone",
            "was",
            "sleeping,",
            "the",
            "thief",
            "came",
            "in",
            "slept",
            "were",
          ],
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation: "Muito bem! “While everyone was sleeping, the thief came in.”",
          correction:
            "O certo é **While everyone was sleeping, the thief came in.** Everyone → was.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Then, suddenly, the lights went out.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm135S9.mp3"),
          options: [
            "Then, suddenly, the lights went on.",
            "Then, suddenly, the kids went out.",
            "Then, suddenly, the lights went out.",
          ],
          correctAnswer: "Then, suddenly, the lights went out.",
          hint:
            "Escute **lights** ou **kids**, e **went out** (apagaram) ou **went on** (acenderam).",
          explanation:
            "Perfeito! “Then, suddenly, the lights went out” = “Então, de repente, as luzes se apagaram.”",
          correction:
            "A frase é **Then, suddenly, the lights went out.** Use o botão 0.5× para ouvir o final.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It was a dark night. I ",
          after: " home alone when I heard footsteps behind me.",
          options: ["walked", "was walking", "walk"],
          correctAnswer: "was walking",
          hint:
            "Cenário da história → **past continuous** (The sun was shining) · o que acontece de repente → **past simple** (Suddenly, someone knocked).",
          explanation:
            "Mandou bem! “I was walking home alone when I heard footsteps.” Lição completa! 🎉",
          correction: "Quase lá! Ação em andamento interrompida → **I was walking.**",
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
