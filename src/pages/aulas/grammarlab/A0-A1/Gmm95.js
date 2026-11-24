import createLessonScreen from "../../LessonScreen";

// Plural nouns, aula 8 (Review): Revisão: uma mistura das aulas 1 a 7. Os 5
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
          before: "One bus, two ",
          after: ".",
          options: ["buss", "buses", "busies"],
          correctAnswer: "buses",
          hint:
            "Palavras que terminam em **s, ss, sh, ch, x** ganham **-es**: box → boxes, watch → watches.",
          explanation: "Isso aí! “Two buses” = “Dois ônibus.”",
          correction: "Quase! Bus termina em “s”, então ganha -es: **buses.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "As crianças estão felizes.",
          answer: ["The", "children", "are", "happy"],
          bank: ["children", "happy", "The", "childs", "is", "are"],
          hint: "Child → **children** (irregular). Plural usa **are**.",
          explanation:
            "Perfeito! “The children are happy” = “As crianças estão felizes.”",
          correction:
            "O certo é **The children are happy.** Child é irregular: children.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One city, two ",
          after: ".",
          answer: "cities",
          hint:
            "consoante + y → **ies** (baby → babies) · vogal + y → **só s** (boy → boys).",
          explanation: "Isso! “Two cities” = “Duas cidades.”",
          correction: "A palavra certa é **cities**: consoante + y vira “ies”.",
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
            ["box", "boxes"],
            ["baby", "babies"],
            ["knife", "knives"],
            ["man", "men"],
          ],
          rightOrder: [3, 2, 0, 1],
          instruction: "Tap a singular word, then its plural.",
          hint: "Lembre das regras: **-es, -ies, -ves** e os **irregulares**.",
          explanation: "Mandou bem! Todos os plurais certos.",
          correction:
            "Esse par não combina. box → **boxes** · baby → **babies** · knife → **knives** · man → **men**.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "The women are tall.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm95S5.mp3"),
          options: ["The woman is tall.", "The men are tall.", "The women are tall."],
          correctAnswer: "The women are tall.",
          hint:
            "**Woman** (“wúman”) e **women** (“wímin”) soam diferentes. Escute também **is** ou **are**.",
          explanation: "Ótimo ouvido! “The women are tall” = “As mulheres são altas.”",
          correction:
            "A frase é **The women are tall.** Use o botão 0.5× para ouvir “women” (wímin).",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "Those ",
          after: " are white.",
          options: ["sheep", "sheeps", "sheepes"],
          correctAnswer: "sheep",
          hint: "**Sheep** não muda no plural.",
          explanation:
            "Mandou bem! “Those sheep are white” = “Aquelas ovelhas são brancas.”",
          correction: "Quase! Sheep é igual no plural: **Those sheep are white.**",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "One foot, two ",
          after: ".",
          answer: "feet",
          hint: "Foot é irregular, igual a **tooth → teeth**.",
          explanation: "Isso! “Two feet” = “Dois pés.”",
          correction: "A resposta é **feet**: foot é irregular.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Estes tomates são vermelhos.",
          answer: ["These", "tomatoes", "are", "red"],
          bank: ["tomatoes", "red", "These", "tomatos", "are", "This", "is"],
          hint: "“Estes” = **These**. Tomato ganha -es: **tomatoes**.",
          explanation:
            "Muito bem! “These tomatoes are red” = “Estes tomates são vermelhos.”",
          correction:
            "O certo é **These tomatoes are red.** Tomato → tomatoes, e these leva “are”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "I have three keys.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm95S9.mp3"),
          options: ["I have three keys.", "I have three kids.", "I have a key."],
          correctAnswer: "I have three keys.",
          hint: "Escute o número e a palavra: **keys** ou **kids**.",
          explanation: "Perfeito! “I have three keys” = “Eu tenho três chaves.”",
          correction:
            "A frase é **I have three keys.** Use o botão 0.5× para ouvir “keys”.",
        },
      ],
    },
  },
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "One leaf, two ",
          after: ".",
          options: ["leaves", "leafs", "leafes"],
          correctAnswer: "leaves",
          hint: "**f / fe → ves**: knife → knives, leaf → leaves.",
          explanation:
            "Mandou bem! “Two leaves” = “Duas folhas.” Você terminou plural nouns! 🎉",
          correction: "Quase lá! Leaf vira **leaves**: o “f” vira “ves”.",
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
