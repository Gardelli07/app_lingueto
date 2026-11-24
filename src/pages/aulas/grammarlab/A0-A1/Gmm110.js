import createLessonScreen from "../../LessonScreen";

// Will / Going to, aula 7 (Is / Are going to): he / she / it is going to ·
// you / we / they are going to. Os 5 tipos do Grammar Lab alternados, uma
// pergunta por slide. O combo e o XP seguem de um slide para o outro
// (ComboSlide). `explanation` e o texto do acerto (guardado, o painel de
// acerto nao mostra texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She ",
          after: " going to have a baby.",
          options: ["am", "is", "are"],
          correctAnswer: "is",
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation: "Isso aí! “She is going to have a baby” = “Ela vai ter um bebê.”",
          correction: "Quase! Com “she”: **She is going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "They ",
          after: " going to move to Rio.",
          answer: "are",
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation:
            "Isso! “They are going to move to Rio” = “Eles vão se mudar para o Rio.”",
          correction: "A palavra certa é **are**: they are going to.",
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
            ["She is going to", "Ela vai"],
            ["He is going to", "Ele vai"],
            ["We are going to", "Nós vamos"],
            ["They are going to", "Eles vão"],
          ],
          rightOrder: [2, 3, 1, 0],
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation: "Mandou bem! Todos os pares certos.",
          correction: "Esse par não combina. **is** = she / he · **are** = we / they.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "He's going to play tennis.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm110S4.mp3"),
          options: [
            "He's going to play tennis.",
            "She's going to play tennis.",
            "He's going to play soccer.",
          ],
          correctAnswer: "He's going to play tennis.",
          hint: "Escute **He's** ou **She's**, e o esporte.",
          explanation:
            "Ótimo ouvido! “He's going to play tennis” = “Ele vai jogar tênis.”",
          correction:
            "A frase é **He's going to play tennis.** Use o botão 0.5× para ouvir “He's”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Nós vamos jantar fora.",
          answer: ["We", "are", "going", "to", "eat", "out"],
          bank: ["going", "to", "We", "are", "eat", "out", "is", "eating"],
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation: "Perfeito! “We are going to eat out” = “Nós vamos jantar fora.”",
          correction: "O certo é **We are going to eat out.** We → are going to.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "My parents ",
          after: " going to sell the house.",
          options: ["is", "am", "are"],
          correctAnswer: "are",
          hint: "My parents = they → **are**.",
          explanation:
            "Mandou bem! “My parents are going to sell the house” = “Meus pais vão vender a casa.”",
          correction: "Quase! My parents = they → **are going to.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "Ana is going ",
          after: " study medicine.",
          answer: "to",
          hint:
            "**going to** = plano já decidido: am / is / are + going to + verbo normal.",
          explanation:
            "Isso! “Ana is going to study medicine” = “A Ana vai estudar medicina.”",
          correction: "A resposta é **to**: going to + verbo.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O meu irmão vai se casar.",
          answer: ["My", "brother", "is", "going", "to", "get", "married"],
          bank: ["going", "to", "My", "is", "get", "brother", "married", "are", "marry"],
          hint: "“Casar” = **get married**. My brother = he → **is going to**.",
          explanation:
            "Muito bem! “My brother is going to get married” = “Meu irmão vai se casar.”",
          correction:
            "O certo é **My brother is going to get married.** Casar = get married.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They're going to be late.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm110S9.mp3"),
          options: [
            "They were late.",
            "They're going to be late.",
            "We're going to be late.",
          ],
          correctAnswer: "They're going to be late.",
          hint:
            "Escute **They're going to** (futuro) ou **were** (passado), e **They** ou **We**.",
          explanation: "Perfeito! “They're going to be late” = “Eles vão se atrasar.”",
          correction:
            "A frase é **They're going to be late.** Use o botão 0.5× para ouvir “going to”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "It ",
          after: " going to be a long day.",
          options: ["are", "am", "is"],
          correctAnswer: "is",
          hint:
            "I → **am going to** · he / she / it → **is going to** · you / we / they → **are going to**.",
          explanation:
            "Mandou bem! “It is going to be a long day” = “Vai ser um dia longo.” Lição completa! 🎉",
          correction: "Quase lá! Com “it”: **It is going to.**",
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
