import createLessonScreen from "../../LessonScreen";

const LESSON_SLIDES = [
  {
    component: "Exercise28",
    activity: {
      questions: [
        {
          question: "O que a Sarah diz?",
          lines: [
            { who: "A", speaker: 0, text: "Hey, Sarah. Are you coming to the party tonight?" },
            { who: "Sarah", speaker: 1, text: "I don't think so. I have to work until nine." },
            { who: "A", speaker: 0, text: "Oh, that's too bad." },
          ],
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S1.mp3"),
          options: ["She's going to the party.", "She has to work.", "She's going home."],
          correctAnswer: "She has to work.",
          hint: "Preste atenção na segunda fala: o que a Sarah tem que fazer até as nove?",
          explanation: "Isso! Sarah disse **“I have to work until nine”**: ela tem que trabalhar.",
          correction:
            "Sarah said: “I don't think so. **I have to work until nine.**” Ela tem que trabalhar até as nove.",
        },
      ],
    },
  },
  {
    component: "Exercise29",
    activity: {
      questions: [
        {
          say: "I usually go to the gym after work.",
          transcript: "I usually go to the **gym** after work.",
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S2.mp3"),
          options: ["job", "gym", "home"],
          correctAnswer: "gym",
          hint: "Escute o que vem logo depois de “go to the…”. É um lugar aonde a pessoa vai depois do trabalho.",
          explanation: "Boa! **“Gym”** = academia. Você pegou a palavra certa.",
          correction: "You heard: “I usually go to the **gym** after work.” Gym = academia.",
        },
      ],
    },
  },
  {
    component: "Exercise32",
    activity: {
      questions: [
        {
          kicker: "WHAT DID THEY SAY?",
          title: "O que eles disseram?",
          instruction: "Ouça a frase e escolha o que você ouviu.",
          say: "Could you send me the file?",
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S3.mp3"),
          options: [
            "Could you send me the photo?",
            "Could you send me the file?",
            "Could you send me the link?",
          ],
          correctAnswer: "Could you send me the file?",
          hint: "As três frases só mudam no final. Ouça com atenção a última palavra.",
          explanation: "Isso! **“Could you send me the file?”** = Você pode me mandar o arquivo?",
          correction: "You heard: “Could you send me the **file**?” File = arquivo.",
        },
      ],
    },
  },
  {
    component: "Exercise28",
    activity: {
      questions: [
        {
          variant: "situation",
          question: "Onde eles estão?",
          lines: [
            { who: "A", speaker: 0, text: "Excuse me, where's gate 14?" },
            { who: "B", speaker: 1, text: "It's on your left, next to the coffee shop." },
          ],
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S4.mp3"),
          options: ["At a hotel", "At an airport", "At a restaurant"],
          correctAnswer: "At an airport",
          hint: "Procure a palavra-chave: “gate” = portão de embarque. Onde existem portões assim?",
          explanation: "Exato! **“Gate 14”** = portão 14, então eles estão num aeroporto.",
          correction: "They are **at an airport**. A pista é “gate 14” (portão de embarque 14).",
        },
      ],
    },
  },
  {
    component: "Exercise30",
    activity: {
      questions: [
        {
          friend: "Friend",
          say: "Hey, what are you doing tonight?",
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S5.mp3"),
          options: ["I'm going to the movies.", "Yesterday was great.", "It's very expensive."],
          correctAnswer: "I'm going to the movies.",
          hint: "A pergunta é sobre hoje à noite (tonight). Escolha a resposta que fala de um plano.",
          explanation: "Perfeito! **“I'm going to the movies”** responde o que você vai fazer hoje à noite.",
          correction:
            "The best reply is **“I'm going to the movies.”** A pergunta é sobre hoje à noite, não sobre ontem nem sobre preço.",
        },
      ],
    },
  },
  {
    component: "Exercise31",
    activity: {
      questions: [
        {
          normal: "What are you going to do this weekend?",
          real: "Whaddaya gonna do this weekend?",
          audioSource: require("../../../../../mp3/LS/A0-A1/Lsn01S6.mp3"),
          audioSourceReal: require("../../../../../mp3/LS/A0-A1/Lsn01S6R.mp3"),
          options: [
            "What are you doing this weekend?",
            "What are you going to do this weekend?",
            "Where are you going this weekend?",
          ],
          correctAnswer: "What are you going to do this weekend?",
          reductions: [
            ["what are you", "whaddaya"],
            ["going to", "gonna"],
          ],
          hint: "Na fala rápida, as palavras se juntam. Compare as duas versões: a frase é a mesma.",
          explanation: "Isso! Você entendeu inglês na velocidade real.",
          correction: "You heard: **“What are you going to do this weekend?”**",
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
  storageKey: "@curso_progress_listening_A0-A1",
  nextRouteName: "Listening",
  screenName: "ListeningA0A1LessonScreen",
});
