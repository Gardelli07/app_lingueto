// Passos do onboarding com o Lingo (vindo do repo lingueto-onboarding).
// Textos, opcoes e qual pose do Lingo aparece ficam aqui.

export const MASCOTS = {
  pointing: require("../../../assets/lingo/lingo-pointing.png"),
  thinking: require("../../../assets/lingo/lingo-thinking.png"),
  you: require("../../../assets/lingo/lingo-you.png"),
};

// Opcoes da pergunta "Quando voce prefere estudar?" -> horario sugerido no
// pop-up de lembrete da Home (StudyTimeModal). null = sem sugestao (20:00).
export const STUDY_TIME_OPTIONS = {
  "De manhã": 8,
  "À tarde": 14,
  "À noite": 20,
  "Agora não, obrigado": null,
};

export const STEPS = [
  {
    type: "intro",
    eyebrow: "Passo 1 de 7",
    title: "Welcome!",
    body: "Eu sou o Lingo e vou ser seu guia aqui no Lingueto!",
    mascot: "pointing",
  },
  {
    type: "intro",
    eyebrow: "Passo 2 de 7",
    title: "Seu inglês vai decolar!",
    body: "Juntos, vamos fazer você falar inglês com confiança. Cada pequeno passo te leva mais longe!",
    mascot: "pointing",
  },
  {
    type: "question",
    key: "feeling",
    eyebrow: "Passo 3 de 7",
    title: "Como você se sente com o inglês?",
    hint: "Escolha a opção que mais combina com você.",
    options: [
      "Travo na hora de falar",
      "Entendo, mas não consigo falar",
      "Estou começando do zero",
      "Já me viro bem",
    ],
    mascot: "thinking",
  },
  {
    type: "question",
    key: "goal",
    eyebrow: "Passo 4 de 7",
    title: "Qual é o seu objetivo com o inglês?",
    hint: "Assim eu monto um caminho do seu jeito.",
    options: [
      "Crescer na carreira",
      "Viajar sem perrengue",
      "Estudar ou morar fora",
      "Curtir filmes, séries e músicas",
    ],
    mascot: "thinking",
  },
  {
    type: "question",
    key: "daily",
    eyebrow: "Passo 5 de 7",
    title: "Quanto tempo por dia você quer estudar?",
    hint: "Pouquinho todo dia já faz diferença. Dá pra mudar depois.",
    options: [
      "5 min por dia · Leve",
      "10 min por dia · Regular",
      "15 min por dia · Puxado",
      "20 min por dia · Intenso",
    ],
    mascot: "thinking",
  },
  {
    type: "question",
    key: "time",
    eyebrow: "Passo 6 de 7",
    title: "Quando você prefere estudar?",
    hint: "Eu te mando um lembrete na hora certa.",
    options: Object.keys(STUDY_TIME_OPTIONS),
    mascot: "thinking",
  },
  {
    type: "question",
    key: "ready",
    eyebrow: "Agora, uma última pergunta…",
    title: "Você está pronto para dominar o inglês com a gente?",
    hint: "O Lingo vai estar com você em cada passo.",
    options: ["Bora! Nasci pronto", "Com certeza, vamos nessa!"],
    mascot: "you",
  },
];

// Indice da primeira pergunta — para onde o "Pular" leva.
export const FIRST_QUESTION_INDEX = STEPS.findIndex((s) => s.type === "question");
