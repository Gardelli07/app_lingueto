import createLessonScreen from "../../LessonScreen";

// Present perfect: experience (B1-B2), aula 3 (Irregular participles 2):
// written, taken, broken, flown, ridden, met, bought, given, read. Os 5 tipos
// do Grammar Lab alternados, uma pergunta por slide. O combo e o XP seguem de
// um slide para o outro (ComboSlide). `explanation` e o texto do acerto
// (guardado, o painel de acerto nao mostra texto); `correction` e o do erro
// (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise26",
    activity: {
      questions: [
        {
          pairs: [
            ["write", "written"],
            ["take", "taken"],
            ["break", "broken"],
            ["fly", "flown"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its past participle.",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation: "Mandou bem! Todos os particípios certos.",
          correction:
            "Esse par não combina. write → **written** · take → **taken** · break → **broken** · fly → **flown**.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "She has ",
          after: " three books.",
          options: ["wrote", "written", "writed"],
          correctAnswer: "written",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation:
            "Isso aí! “She has written three books” = “Ela já escreveu três livros.”",
          correction: "Quase! write → wrote → **written.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "I have ",
          after: " (meet) her parents.",
          answer: "met",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation: "Isso! “I have met her parents” = “Já conheci os pais dela.”",
          correction: "A palavra certa é **met**: meet → met → met.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "They've bought a new house.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm146S4.mp3"),
          options: [
            "They bought a new house.",
            "They've bought a new house.",
            "They've built a new house.",
          ],
          correctAnswer: "They've bought a new house.",
          hint: "Escute **They've bought** (compraram) ou **built** (construíram).",
          explanation:
            "Ótimo ouvido! “They've bought a new house” = “Eles compraram uma casa nova.”",
          correction:
            "A frase é **They've bought a new house.** Use o botão 0.5× para ouvir “bought”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele já quebrou o braço duas vezes.",
          answer: ["He", "has", "broken", "his", "arm", "twice"],
          bank: ["He", "has", "broken", "his", "arm", "twice", "broke", "have"],
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation: "Perfeito! “He has broken his arm twice.”",
          correction:
            "O certo é **He has broken his arm twice.** Has + broken (particípio).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Have you ever ",
          after: " a horse?",
          options: ["ridden", "rode", "ride"],
          correctAnswer: "ridden",
          hint: "ride → rode → **ridden**.",
          explanation:
            "Mandou bem! “Have you ever ridden a horse?” = “Você já andou a cavalo?”",
          correction: "Quase! ride → rode → **ridden.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "We have ",
          after: " (take) lots of photos.",
          answer: "taken",
          hint:
            "Particípios irregulares: write → **written** · take → **taken** · break → **broken** · fly → **flown** · meet → **met** · buy → **bought** · read → **read**.",
          explanation:
            "Isso! “We have taken lots of photos” = “Já tiramos muitas fotos.”",
          correction: "A resposta é **taken**: take → took → taken.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela já me deu muitos conselhos.",
          answer: ["She", "has", "given", "me", "a", "lot", "of", "advice"],
          bank: [
            "She",
            "has",
            "given",
            "me",
            "a",
            "lot",
            "of",
            "advice",
            "gave",
            "advices",
          ],
          hint: "give → gave → **given**. **advice** não tem plural.",
          explanation: "Muito bem! “She has given me a lot of advice.”",
          correction:
            "O certo é **She has given me a lot of advice.** Advice não vai para o plural.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I've never flown in a helicopter.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm146S9.mp3"),
          options: [
            "I've never flown in a helicopter.",
            "I've never flown in a plane.",
            "I never flew in a helicopter.",
          ],
          correctAnswer: "I've never flown in a helicopter.",
          hint: "Escute **I've never flown** e o final: **helicopter** ou **plane**.",
          explanation:
            "Perfeito! “I've never flown in a helicopter” = “Nunca voei de helicóptero.”",
          correction:
            "A frase é **I've never flown in a helicopter.** fly → flew → flown.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I've ",
          after: " that book. It was amazing.",
          options: ["read", "readed", "red"],
          correctAnswer: "read",
          hint:
            "read → read → **read**: escreve igual, mas no passado e particípio se fala “red”.",
          explanation:
            "Mandou bem! “I've read that book” = “Já li esse livro.” Lição completa! 🎉",
          correction: "Quase lá! O particípio de read é **read** (pronúncia “red”).",
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
