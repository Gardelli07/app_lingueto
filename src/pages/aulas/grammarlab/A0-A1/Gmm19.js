import createLessonScreen from "../../LessonScreen";

// Past simple, aula 5 (-ed spelling): live → lived · study → studied · stop →
// stopped · play → played. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "We ",
          after: " in London for two years.",
          options: ["liveed", "lived", "livd"],
          correctAnswer: "lived",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation:
            "Isso aí! “We lived in London for two years” = “Nós moramos em Londres por dois anos.”",
          correction: "Quase! Live já termina em “e”: só acrescente -d → **lived.**",
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
          after: " (study) for the test.",
          answer: "studied",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation: "Isso! “She studied for the test” = “Ela estudou para a prova.”",
          correction: "A palavra certa é **studied**: consoante + y → ied.",
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
            ["live", "lived"],
            ["study", "studied"],
            ["stop", "stopped"],
            ["play", "played"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past form.",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation: "Mandou bem! Todos os verbos certos.",
          correction:
            "Esse par não combina. live → **lived** · study → **studied** · stop → **stopped** · play → **played**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The bus stopped here.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm19S4.mp3"),
          options: [
            "The bus stops here.",
            "The bus stopped here.",
            "The bus stopped there.",
          ],
          correctAnswer: "The bus stopped here.",
          hint:
            "Escute **stopped** (passado, som de “t”) ou **stops**, e **here** ou **there**.",
          explanation: "Ótimo ouvido! “The bus stopped here” = “O ônibus parou aqui.”",
          correction:
            "A frase é **The bus stopped here.** Use o botão 0.5× para ouvir “stopped”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu tentei de novo.",
          answer: ["I", "tried", "again"],
          bank: ["tried", "I", "again", "tryed", "try"],
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation: "Perfeito! “I tried again” = “Eu tentei de novo.”",
          correction: "O certo é **I tried again.** Try → tried.",
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
          after: " (dance) all night.",
          answer: "danced",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation: "Isso! “They danced all night” = “Eles dançaram a noite toda.”",
          correction: "A resposta é **danced**: dance + d.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "He ",
          after: " his phone in the street.",
          options: ["dropped", "droped", "drops"],
          correctAnswer: "dropped",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation:
            "Mandou bem! “He dropped his phone in the street” = “Ele derrubou o celular na rua.”",
          correction: "Quase! Drop dobra o “p”: **dropped.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "O bebê chorou muito.",
          answer: ["The", "baby", "cried", "a", "lot"],
          bank: ["cried", "a", "The", "lot", "baby", "cryed", "cries"],
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation: "Muito bem! “The baby cried a lot” = “O bebê chorou muito.”",
          correction: "O certo é **The baby cried a lot.** Cry → cried.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We ",
          after: " (plan) a trip to Bahia.",
          answer: "planned",
          hint:
            "Terminou em e → **só -d** (live → lived) · consoante + y → **-ied** (study → studied) · verbo curto CVC → **dobra a letra** (stop → stopped).",
          explanation:
            "Isso! “We planned a trip to Bahia” = “Nós planejamos uma viagem para a Bahia.”",
          correction: "A resposta é **planned**: plan dobra o “n”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She smiled at me.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm19S10.mp3"),
          options: ["She smiled at him.", "She smiles at me.", "She smiled at me."],
          correctAnswer: "She smiled at me.",
          hint:
            "Escute **smiled** (passado) ou **smiles**, e o final: **me** ou **him**.",
          explanation:
            "Perfeito! “She smiled at me” = “Ela sorriu para mim.” Lição completa! 🎉",
          correction:
            "A frase é **She smiled at me.** Use o botão 0.5× para ouvir o final.",
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
