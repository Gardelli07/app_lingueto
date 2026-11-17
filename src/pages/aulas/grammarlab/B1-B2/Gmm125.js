import createLessonScreen from "../../LessonScreen";

// Simple vs continuous (B1-B2), aula 7 (Stative verbs 2): know, believe,
// understand, remember, mean, belong, seem: sem -ing. Os 5 tipos do Grammar
// Lab alternados, uma pergunta por slide. O combo e o XP seguem de um slide
// para o outro (ComboSlide). `explanation` e o texto do acerto (guardado, o
// painel de acerto nao mostra texto); `correction` e o do erro (aceita
// **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Sorry, I ",
          after: " what you mean.",
          options: ["am not understanding", "don't understand", "doesn't understand"],
          correctAnswer: "don't understand",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Isso aí! “Sorry, I don't understand what you mean” = “Desculpa, não entendo o que você quer dizer.”",
          correction: "Quase! “Understand” não usa -ing: **I don't understand.**",
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
            ["believe", "acreditar"],
            ["belong", "pertencer"],
            ["seem", "parecer"],
            ["mean", "significar / querer dizer"],
          ],
          rightOrder: [2, 3, 1, 0],
          instruction: "Tap a verb, then its translation.",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation: "Mandou bem! Esses verbos não usam -ing.",
          correction:
            "Esse par não combina. **believe** = acreditar · **belong** = pertencer · **seem** = parecer · **mean** = significar.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "This bag ",
          after: " (belong) to my sister.",
          answer: "belongs",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Isso! “This bag belongs to my sister” = “Esta bolsa é da minha irmã.”",
          correction:
            "A palavra certa é **belongs**: belong não usa -ing, e this bag = it.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "Do you remember her name?",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm125S4.mp3"),
          options: [
            "Do you remember her name?",
            "Do you remember his name?",
            "Did you remember her name?",
          ],
          correctAnswer: "Do you remember her name?",
          hint: "Escute **Do** ou **Did**, e **her** ou **his**.",
          explanation:
            "Ótimo ouvido! “Do you remember her name?” = “Você lembra o nome dela?”",
          correction:
            "A frase é **Do you remember her name?** Use o botão 0.5× para ouvir “her”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ele parece cansado hoje.",
          answer: ["He", "seems", "tired", "today"],
          bank: ["He", "seems", "tired", "today", "is", "seeming"],
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation: "Perfeito! “He seems tired today” = “Ele parece cansado hoje.”",
          correction:
            "O certo é **He seems tired today.** Mesmo com “today”, seem não usa -ing.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " you're right.",
          options: ["believe", "am believing", "believes"],
          correctAnswer: "believe",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Mandou bem! “I believe you're right” = “Acredito que você está certo.”",
          correction: "Quase! “Believe” não usa -ing: **I believe.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "What does this word ",
          after: " (mean)?",
          answer: "mean",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Isso! “What does this word mean?” = “O que esta palavra significa?”",
          correction: "A resposta é **mean**: depois de does, verbo normal.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu não conheço ninguém aqui.",
          answer: ["I", "don't", "know", "anyone", "here"],
          bank: ["I", "don't", "know", "anyone", "here", "am", "knowing", "nobody"],
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Muito bem! “I don't know anyone here” = “Não conheço ninguém aqui.”",
          correction:
            "O certo é **I don't know anyone here.** Com negativa, use “anyone” (não “nobody”).",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "She knows the answer.",
          audioSource: require("../../../../../mp3/GL/B1-B2/Gmm125S9.mp3"),
          options: [
            "He knows the answer.",
            "She knows the address.",
            "She knows the answer.",
          ],
          correctAnswer: "She knows the answer.",
          hint:
            "Escute **She** ou **He**, e o final: **answer** (resposta) ou **address** (endereço).",
          explanation: "Perfeito! “She knows the answer” = “Ela sabe a resposta.”",
          correction:
            "A frase é **She knows the answer.** Use o botão 0.5× para ouvir o final.",
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
          after: " like a good idea.",
          options: ["is seeming", "seems", "seem"],
          correctAnswer: "seems",
          hint:
            "Verbos de pensamento, posse e aparência (**know, believe, understand, remember, mean, belong, seem**) não usam -ing.",
          explanation:
            "Mandou bem! “It seems like a good idea” = “Parece uma boa ideia.” Lição completa! 🎉",
          correction: "Quase lá! “Seem” não usa -ing: **It seems.**",
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
