import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 3 (Simple or continuous?): Rotina e
// fatos × agora e temporário. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I usually ",
          after: " the bus, but today I'm walking.",
          options: ["take", "am taking", "takes"],
          correctAnswer: "take",
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation:
            "Isso aí! “I usually take the bus” = “Eu geralmente pego o ônibus.”",
          correction: "Quase! “Usually” = rotina → present simple: **I take.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What ",
          after: " you do? – I'm a nurse.",
          answer: "do",
          hint: "**What do you do?** pergunta a profissão (algo permanente).",
          explanation: "Isso! “What do you do?” = “Qual é a sua profissão?”",
          correction:
            "A palavra certa é **do**: What do you do? = qual é a sua profissão.",
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
            ["What do you do?", "Qual é a sua profissão?"],
            ["What are you doing?", "O que você está fazendo?"],
            ["Where do you live?", "Onde você mora?"],
            ["Where are you living now?", "Onde você está morando agora?"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation: "Mandou bem! Você já percebe a diferença de sentido.",
          correction:
            "Esse par não combina. **do you do** = profissão · **are you doing** = agora · **are you living now** = situação atual.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He usually works late, but this week he's leaving early.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm121S4.mp3"),
          options: [
            "He usually works late, but this week he's leaving early.",
            "He usually leaves early, but this week he's working late.",
            "He's working late this week.",
          ],
          correctAnswer: "He usually works late, but this week he's leaving early.",
          hint:
            "Escute o que é rotina (**usually works late**) e o que é desta semana (**leaving early**).",
          explanation:
            "Ótimo ouvido! “Ele geralmente trabalha até tarde, mas esta semana está saindo cedo.”",
          correction:
            "A frase é **He usually works late, but this week he's leaving early.** Rotina → simple · esta semana → continuous.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela geralmente dirige, mas hoje está pegando um táxi.",
          answer: [
            "She",
            "usually",
            "drives,",
            "but",
            "today",
            "she's",
            "taking",
            "a",
            "taxi",
          ],
          bank: [
            "She",
            "usually",
            "drives,",
            "but",
            "today",
            "she's",
            "taking",
            "a",
            "taxi",
            "drive",
            "takes",
          ],
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation: "Perfeito! “She usually drives, but today she's taking a taxi.”",
          correction:
            "O certo é **She usually drives, but today she's taking a taxi.** Rotina → drives · hoje → she's taking.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Right now, my brother ",
          after: " a shower.",
          options: ["has", "is having", "have"],
          correctAnswer: "is having",
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation:
            "Mandou bem! “My brother is having a shower” = “Meu irmão está tomando banho.”",
          correction: "Quase! “Right now” = agora → **is having a shower.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Tom ",
          after: " (play) tennis every Saturday.",
          answer: "plays",
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation:
            "Isso! “Tom plays tennis every Saturday” = “O Tom joga tênis todo sábado.”",
          correction: "A resposta é **plays**: “every Saturday” = rotina.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Você está trabalhando agora?",
          answer: ["Are", "you", "working", "right", "now"],
          bank: ["Are", "you", "working", "right", "now", "Do", "work"],
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation:
            "Muito bem! “Are you working right now?” = “Você está trabalhando agora?”",
          correction: "O certo é **Are you working right now?** Agora → Are + working.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Do you often eat out?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm121S9.mp3"),
          options: [
            "Are you eating out?",
            "Do you often eat out?",
            "Do you often go out?",
          ],
          correctAnswer: "Do you often eat out?",
          hint:
            "Escute **Do you often** (hábito) ou **Are you** (agora), e **eat out** ou **go out**.",
          explanation: "Perfeito! “Do you often eat out?” = “Você costuma comer fora?”",
          correction:
            "A frase é **Do you often eat out?** Use o botão 0.5× para ouvir “eat out”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My dad ",
          after: " dinner. It smells great!",
          options: ["is cooking", "cooks", "cook"],
          correctAnswer: "is cooking",
          hint:
            "Rotina / fato / sempre → **present simple** · agora / temporário / mudança → **present continuous**.",
          explanation:
            "Mandou bem! “My dad is cooking dinner” = “Meu pai está fazendo o jantar.” Lição completa! 🎉",
          correction: "Quase lá! “It smells great!” mostra que é agora → **is cooking.**",
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
