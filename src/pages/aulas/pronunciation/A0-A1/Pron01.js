import createLessonScreen from "../../LessonScreen";

// Pronunciation Lab · Module 1 (The TH Sounds) · Lesson 1: The Voiceless TH /θ/.
// Veio de C:\DEV\lingueto-pronunciation-lab (src/course.ts). Cada etapa e um
// slide: Exercise34 (discover), 35 (understand), 36 (sound practice),
// 37 (minimal pairs) e 38 (sentence practice). Sem audio gravado ainda: a
// voz de referencia e a do celular (en-US); para trocar, ponha `audioSource`
// nos audios/itens.

const LESSON_TAG = "/θ/ · Lesson 1";

const PRACTICE_TIP =
  "Ouça o áudio original e depois a sua gravação. Compare os dois: o TH deve soar como um sopro de ar, sem virar T ou F. Grave de novo quantas vezes quiser até ficar parecido.";

const LESSON_SLIDES = [
  {
    component: "Exercise34",
    activity: {
      stage: 1,
      lessonTag: LESSON_TAG,
      title: "Can you hear the difference?",
      instruction: "Listen carefully to the two pronunciations.",
      word: "THINK",
      audios: [
        { label: "Audio 1", say: "think" },
        { label: "Audio 2", say: "tink" },
      ],
      question: "Do they sound the same?",
      options: ["Yes, they sound the same.", "No, they sound different."],
      answer: 1,
      right:
        "Exactly! The first word has a special English sound that doesn’t exist in the same way in Portuguese.",
      wrong:
        "Listen again: the first word has a special English sound that doesn’t exist in the same way in Portuguese. They sound different.",
    },
  },
  {
    component: "Exercise35",
    activity: {
      stage: 2,
      lessonTag: LESSON_TAG,
      caption: "Vista lateral da boca ao produzir /θ/",
      steps: [
        "Coloque a ponta da língua levemente entre os dentes.",
        "Solte o ar.",
        "Não transforme o som em T ou F.",
      ],
      tip: "Coloque a mão na garganta e faça o som /θ/ (“thhhh”) por alguns segundos. Se sentir a garganta vibrar, você está fazendo errado. Se não vibrar, parabéns: é assim mesmo!",
    },
  },
  {
    component: "Exercise36",
    activity: {
      stage: 3,
      lessonTag: LESSON_TAG,
      title: "Let’s practice the sound!",
      items: [
        { text: "THINK", pt: "Pensar" },
        { text: "THREE", pt: "Três" },
        { text: "THANK", pt: "Agradecer" },
        { text: "THURSDAY", pt: "Quinta-feira" },
        { text: "THOUSAND", pt: "Mil" },
      ],
      tip: PRACTICE_TIP,
      // Fonema treinado (ARPAbet), para a dica do feedback instantaneo.
      foco: "th",
    },
  },
  {
    component: "Exercise37",
    activity: {
      stage: 4,
      lessonTag: LESSON_TAG,
      title: "Can you hear the difference?",
      instruction: "Listen and choose the word you heard.",
      pairs: [
        ["THINK", "TINK"],
        ["THREE", "TREE"],
        ["THIN", "TIN"],
      ],
      right: "Great! You identified the TH sound!",
      wrong: "Not quite! Listen again and focus on the position of your tongue.",
    },
  },
  {
    component: "Exercise38",
    activity: {
      stage: 5,
      lessonTag: LESSON_TAG,
      title: "Time to use it in real sentences!",
      items: [
        { text: "I think it’s a good idea.", pt: "Eu acho que é uma boa ideia." },
        { text: "Thank you for your help.", pt: "Obrigado pela sua ajuda." },
        { text: "Thursday is my favorite day.", pt: "Quinta-feira é meu dia favorito." },
        { text: "I think three things are important.", pt: "Eu acho que três coisas são importantes." },
      ],
      tip: PRACTICE_TIP,
      // Fonema treinado (ARPAbet), para a dica do feedback instantaneo.
      foco: "th",
      finishLabel: "Finish lesson",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@curso_progress_pronunciation_A0-A1",
  nextRouteName: "Pronunciation",
  screenName: "PronunciationA0A1LessonScreen",
});
