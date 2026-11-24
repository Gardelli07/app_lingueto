import createLessonScreen from "../../LessonScreen";

// Verb to be, aula 9 (Be in real life): Be no dia a dia: idade, profissões,
// sentimentos, lugares. Os 5 tipos do Grammar Lab alternados, uma pergunta
// por slide. O combo e o XP seguem de um slide para o outro (ComboSlide).
// `explanation` e o texto do acerto (guardado, o painel de acerto nao mostra
// texto); `correction` e o do erro (aceita **destaque**).
const LESSON_SLIDES = [
  {
    component: "Exercise22",
    activity: {
      questions: [
        {
          before: "I ",
          after: " 20 years old.",
          options: ["have", "am", "is"],
          correctAnswer: "am",
          hint: "Em inglês, idade usa o verbo **be**, não have: I am 20.",
          explanation: "Isso aí! “I am 20 years old” = “Eu tenho 20 anos.”",
          correction:
            "Quase! Idade em inglês usa be: **I am 20 years old.** Não usamos “have”.",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Ela tem 30 anos.",
          answer: ["She", "is", "30", "years", "old"],
          bank: ["30", "has", "She", "old", "is", "years"],
          hint: "Português usa “ter”, inglês usa **be**: She is 30 years old.",
          explanation: "Perfeito! “She is 30 years old” = “Ela tem 30 anos.”",
          correction:
            "O certo é **She is 30 years old.** Para idade, use “is”, não “has”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "My brother is a nurse.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm102S3.mp3"),
          options: [
            "My mother is a nurse.",
            "My brother is a doctor.",
            "My brother is a nurse.",
          ],
          correctAnswer: "My brother is a nurse.",
          hint:
            "Escute quem é (**brother** ou **mother**) e a profissão (**nurse** ou **doctor**).",
          explanation:
            "Ótimo ouvido! “My brother is a nurse” = “Meu irmão é enfermeiro.”",
          correction:
            "A frase é **My brother is a nurse.** Use o botão 0.5× para ouvir “brother” e “nurse”.",
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
            ["I'm hungry", "Estou com fome"],
            ["I'm cold", "Estou com frio"],
            ["I'm thirsty", "Estou com sede"],
            ["I'm afraid", "Estou com medo"],
          ],
          rightOrder: [1, 3, 0, 2],
          hint:
            "Em português é “estar com”; em inglês é só **be**: I'm hungry, I'm cold.",
          explanation: "Mandou bem! Todos os sentimentos certos.",
          correction:
            "Esse par não combina. **hungry** = fome, **cold** = frio, **thirsty** = sede, **afraid** = medo.",
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
          after: " an engineer.",
          answer: "is",
          hint: "Profissão também usa **be**. Com she, qual verbo?",
          explanation: "Isso! “She is an engineer” = “Ela é engenheira.”",
          correction:
            "A palavra certa é **is**: She is an engineer. Com “she”, sempre “is”.",
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
          after: " in Rio.",
          options: ["is", "are", "am"],
          correctAnswer: "are",
          hint: "Para dizer onde alguém está, use **be**. My parents = they.",
          explanation: "Mandou bem! “My parents are in Rio” = “Meus pais estão no Rio.”",
          correction:
            "Quase! “My parents” é plural, então usamos are: **My parents are in Rio.**",
        },
      ],
    },
  },
  {
    component: "Exercise24",
    activity: {
      questions: [
        {
          prompt: "Eu estou com sede.",
          answer: ["I", "am", "thirsty"],
          bank: ["thirsty", "have", "I", "thirst", "am", "is"],
          hint: "“Estar com sede” = **be thirsty**. Não use “have”.",
          explanation: "Muito bem! “I am thirsty” = “Eu estou com sede.”",
          correction:
            "O certo é **I am thirsty.** Em inglês é “be thirsty”, não “have thirst”.",
        },
      ],
    },
  },
  {
    component: "Exercise25",
    activity: {
      questions: [
        {
          say: "We're at the airport.",
          audioSource: require("../../../../../mp3/GL/A0-A1/Gmm102S8.mp3"),
          options: [
            "We're at the airport.",
            "They're at the airport.",
            "We're at the park.",
          ],
          correctAnswer: "We're at the airport.",
          hint:
            "Escute o começo (**We're** ou **They're**) e o lugar (**airport** ou **park**).",
          explanation: "Perfeito! “We're at the airport” = “Nós estamos no aeroporto.”",
          correction:
            "A frase é **We're at the airport.** Use o botão 0.5× para ouvir “We're” e “airport”.",
        },
      ],
    },
  },
  {
    component: "Exercise27",
    activity: {
      questions: [
        {
          before: "How old is he? – He ",
          after: " 12.",
          answer: "is",
          hint: "A resposta de idade usa **be**. Com he, qual verbo?",
          explanation: "Isso! “He is 12” = “Ele tem 12 anos.”",
          correction:
            "A resposta é **is**: He is 12. Idade em inglês usa “be”, não “has”.",
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
          after: " hot today.",
          options: ["has", "are", "is"],
          correctAnswer: "is",
          hint: "Para falar do tempo (clima), use **It is**. Não use “has”.",
          explanation:
            "Mandou bem! “It is hot today” = “Está calor hoje.” Lição completa! 🎉",
          correction:
            "Quase lá! Clima usa It is: **It is hot today.** Em inglês não dizemos “It has hot”.",
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
