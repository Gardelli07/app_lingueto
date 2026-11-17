import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 01 The English Journey · Aula 1 — "Episode 1: The Big Decision" (A1).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-01).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Falar sobre planos de viagem: para onde, quando e por quanto tempo, e dizer o que você sabe ou não sabe fazer.
// Audios em mp3/FL/A0-A1 (Fl01P1-3 das partes, Fl01L* dos listens),
// conferidos com o Vibe em 2026-11-16. Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "Episode 1: The Big Decision",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "Episode 1: The Big Decision",
          "imageDescription": "a ideia da viagem e a mensagem para a Bia",
          "image": FLA1.Fl01P1,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl01P1.mp3"),
          "audioDurationMs": 27790,
          "blocks": [
            {
              "kind": "p",
              "text": "It's Sunday night in São Paulo. Lucas Souza is 28 years old, and he is a graphic_designer. He works a lot, and he is tired. He wants a vacation. He looks at his savings_app and smiles. He has money for a big trip!"
            },
            {
              "kind": "p",
              "text": "Lucas sends a message to his girlfriend, Bia: “Bia, I have a surprise. Let's travel in July!” Bia answers fast: “Where?!” Lucas writes: “I want to go to the United States. To Florida!”"
            }
          ],
          "glossary": {
            "graphic designer": "designer gráfico",
            "savings app": "app das economias"
          },
          "dictionary": {
            "28": "28",
            "graphic designer": "designer gráfico",
            "savings app": "app das economias",
            "it's": "é / está",
            "sunday": "domingo",
            "night": "noite",
            "in": "em / no / na",
            "são": "São (São Paulo)",
            "paulo": "Paulo (São Paulo)",
            "lucas": "Lucas",
            "souza": "Souza",
            "is": "é / está",
            "years": "anos",
            "old": "velho / de idade",
            "and": "e",
            "he": "ele",
            "a": "um / uma",
            "graphic": "gráfico",
            "designer": "designer (cria as artes)",
            "works": "trabalha",
            "lot": "a lot of = muito / muitos",
            "tired": "cansado / cansada",
            "wants": "quer",
            "vacation": "férias",
            "looks": "olha",
            "at": "em / às · no e-mail: @ (arroba)",
            "his": "dele / seu",
            "savings": "economias / poupança",
            "app": "aplicativo",
            "smiles": "sorri",
            "has": "tem",
            "money": "dinheiro",
            "for": "para / por",
            "big": "grande",
            "trip": "viagem",
            "sends": "envia",
            "message": "mensagem",
            "to": "para / a",
            "girlfriend": "namorada",
            "bia": "Bia",
            "i": "eu",
            "have": "ter / temos",
            "surprise": "surpresa",
            "let's": "vamos (let us)",
            "travel": "viajar",
            "july": "julho",
            "answers": "atende / responde",
            "fast": "rápido",
            "where": "onde",
            "writes": "escreve / anota",
            "want": "querer",
            "go": "ir",
            "the": "o / a / os / as",
            "united": "unidos (United States)",
            "states": "estados",
            "florida": "Flórida"
          }
        },
        {
          "title": "Episode 1: The Big Decision",
          "imageDescription": "Flórida em julho: verão, calor, duas semanas",
          "image": FLA1.Fl01P2,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl01P2.mp3"),
          "audioDurationMs": 24190,
          "blocks": [
            {
              "kind": "p",
              "text": "Bia calls him. She is very happy. “Florida! Orlando, the beaches, Miami… I love it!” she says. “Yes,” Lucas says. “We can go for two_weeks.”"
            },
            {
              "kind": "p",
              "text": "In Brazil, July is winter, but in Florida, July is summer. It's hot and sunny. Then Bia asks, “But Lucas… we need to speak English there. I can't speak English.”"
            }
          ],
          "glossary": {
            "two weeks": "duas semanas"
          },
          "dictionary": {
            "two weeks": "duas semanas",
            "bia": "Bia",
            "calls": "liga / ligações",
            "him": "ele / o",
            "she": "ela",
            "is": "é / está",
            "very": "muito",
            "happy": "feliz",
            "florida": "Flórida",
            "orlando": "Orlando",
            "the": "o / a / os / as",
            "beaches": "praias",
            "miami": "Miami",
            "i": "eu",
            "love": "amar / adorar",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "says": "diz",
            "yes": "sim",
            "lucas": "Lucas",
            "we": "nós",
            "can": "pode / consegue",
            "go": "ir",
            "for": "para / por",
            "two": "dois / duas",
            "weeks": "semanas",
            "in": "em / no / na",
            "brazil": "Brasil",
            "july": "julho",
            "winter": "inverno",
            "but": "mas",
            "summer": "verão",
            "it's": "é / está",
            "hot": "quente",
            "and": "e",
            "sunny": "ensolarado / faz sol",
            "then": "então / depois",
            "asks": "pergunta",
            "need": "precisar",
            "to": "para / a",
            "speak": "falar",
            "english": "inglês",
            "there": "lá / há (there are)",
            "can't": "não pode / não consegue"
          }
        },
        {
          "title": "Episode 1: The Big Decision",
          "imageDescription": "o medo de falar inglês e a decisão de aprender",
          "image": FLA1.Fl01P3,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl01P3.mp3"),
          "audioDurationMs": 38920,
          "blocks": [
            {
              "kind": "p",
              "text": "Lucas stops. His English is basic. He can read a little, but he is scared to speak. “I can't speak English very well,” he says. “But I can learn. I have six months!” Bia laughs. “OK. You speak for us!”"
            },
            {
              "kind": "p",
              "text": "That night, Lucas downloads an English app. His first lesson is I want to travel. He repeats it again and again: “I want to travel. I want to travel to Florida.” He is scared, but he is happy."
            }
          ],
          "glossary": {},
          "dictionary": {
            "lucas": "Lucas",
            "stops": "para",
            "his": "dele / seu",
            "english": "inglês",
            "is": "é / está",
            "basic": "básico",
            "he": "ele",
            "can": "pode / consegue",
            "read": "ler",
            "a": "um / uma",
            "little": "pequeno / pouco",
            "but": "mas",
            "scared": "com medo",
            "to": "para / a",
            "speak": "falar",
            "i": "eu",
            "can't": "não pode / não consegue",
            "very": "muito",
            "well": "bem",
            "says": "diz",
            "learn": "aprender",
            "have": "ter / temos",
            "six": "seis",
            "months": "meses",
            "bia": "Bia",
            "laughs": "ri",
            "ok": "bem / ok",
            "you": "você / vocês / te",
            "for": "para / por",
            "us": "nós / nos",
            "that": "isso / que",
            "night": "noite",
            "downloads": "baixa (um app)",
            "an": "um / uma",
            "app": "aplicativo",
            "first": "primeiro / primeira",
            "lesson": "lição / aula",
            "want": "querer",
            "travel": "viajar",
            "repeats": "repete",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "again": "de novo",
            "and": "e",
            "florida": "Flórida",
            "happy": "feliz"
          }
        }
      ],
      "questions": [
        {
          "id": "F01-E01",
          "part": 0,
          "type": "choice",
          "before": "Lucas is a graphic ",
          "after": ".",
          "options": [
            "designer",
            "waiter",
            "nurse"
          ],
          "correctAnswer": "designer",
          "hint": "Lucas Souza is 28 years old, and he is a graphic designer.",
          "explanation": "Lucas is a graphic designer from São Paulo.",
          "correction": "It's designer — Lucas works as a graphic designer."
        },
        {
          "id": "F01-E02",
          "part": 0,
          "type": "choice",
          "before": "Lucas wants to travel in ",
          "after": ".",
          "options": [
            "January",
            "July",
            "June"
          ],
          "correctAnswer": "July",
          "hint": "Let's travel in July!",
          "explanation": "Lucas wants to travel in July.",
          "correction": "It's July — Lucas says, Let's travel in July!"
        },
        {
          "id": "F01-E03",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "trip",
              "viagem"
            ],
            [
              "vacation",
              "férias"
            ],
            [
              "surprise",
              "surpresa"
            ],
            [
              "money",
              "dinheiro"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "He has money for a big trip!",
          "explanation": "These are your first travel words.",
          "correction": "trip = viagem, vacation = férias, surprise = surpresa, money = dinheiro."
        },
        {
          "id": "F01-E04",
          "part": 0,
          "type": "listen",
          "say": "I want to go to the United States.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl01L1.mp3"),
          "options": [
            "I want to go to the United Kingdom.",
            "I want to go to the United States.",
            "I want to live in the United States."
          ],
          "correctAnswer": "I want to go to the United States.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "I want to go to the United States.",
          "explanation": "I want to go to… is how you talk about a trip.",
          "correction": "It's I want to go to the United States — listen again for go to and States."
        },
        {
          "id": "F01-E05",
          "part": 1,
          "type": "choice",
          "before": "In July, it's ",
          "after": " in Florida.",
          "options": [
            "winter",
            "summer",
            "spring"
          ],
          "correctAnswer": "summer",
          "hint": "In Brazil, July is winter, but in Florida, July is summer.",
          "explanation": "July is winter in Brazil, but summer in Florida.",
          "correction": "It's summer — in Florida, July is summer."
        },
        {
          "id": "F01-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "hot",
              "quente"
            ],
            [
              "sunny",
              "ensolarado"
            ],
            [
              "beach",
              "praia"
            ],
            [
              "two weeks",
              "duas semanas"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "It's hot and sunny.",
          "explanation": "Now you can talk about the weather and the trip.",
          "correction": "hot = quente, sunny = ensolarado, beach = praia, two weeks = duas semanas."
        },
        {
          "id": "F01-E07",
          "part": 1,
          "type": "build",
          "prompt": "Nós podemos ir por duas semanas.",
          "answer": [
            "We",
            "can",
            "go",
            "for",
            "two",
            "weeks"
          ],
          "bank": [
            "two",
            "go",
            "weeks",
            "goes",
            "cans",
            "can",
            "We",
            "for"
          ],
          "hint": "We can go for two weeks.",
          "explanation": "We can + verb: We can go.",
          "correction": "It's We can go for two weeks — after can, the verb has no s: we can go."
        },
        {
          "id": "F01-E08",
          "part": 1,
          "type": "choice",
          "before": "Bia says: I ",
          "after": " speak English.",
          "options": [
            "can't",
            "can",
            "am"
          ],
          "correctAnswer": "can't",
          "hint": "I can't speak English.",
          "explanation": "Bia can't speak English. Can't means não consigo.",
          "correction": "It's can't — Bia doesn't speak English, so she says can't."
        },
        {
          "id": "F01-E09",
          "part": 2,
          "type": "listen",
          "say": "I can't speak English very well.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl01L2.mp3"),
          "options": [
            "I can speak English very well.",
            "I can't speak Spanish very well.",
            "I can't speak English very well."
          ],
          "correctAnswer": "I can't speak English very well.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "I can't speak English very well, he says.",
          "explanation": "This is how Lucas feels, and maybe how you feel too.",
          "correction": "It's I can't speak English very well — listen again for can't and English."
        },
        {
          "id": "F01-E10",
          "part": 2,
          "type": "type",
          "before": "I can't speak English very well, but I can ",
          "after": "!",
          "answer": "learn",
          "hint": "But I can learn.",
          "explanation": "Lucas can learn, and you can too!",
          "correction": "It's learn — Lucas says, But I can learn."
        },
        {
          "id": "F01-E11",
          "part": 2,
          "type": "build",
          "prompt": "Eu quero viajar para a Flórida.",
          "answer": [
            "I",
            "want",
            "to",
            "travel",
            "to",
            "Florida"
          ],
          "bank": [
            "wants",
            "want",
            "to",
            "to",
            "I",
            "Florida",
            "travel",
            "goes"
          ],
          "hint": "I want to travel to Florida.",
          "explanation": "I want to + verb: I want to travel.",
          "correction": "It's I want to travel to Florida — we say I want to travel, with to."
        },
        {
          "id": "F01-E12",
          "part": 2,
          "type": "type",
          "before": "Lucas is scared, but he is ",
          "after": ".",
          "answer": "happy",
          "hint": "He is scared, but he is happy.",
          "explanation": "Lucas is scared, but he is happy.",
          "correction": "It's happy — Lucas is scared, but happy."
        },
        {
          "id": "F01-E13",
          "part": 2,
          "review": true,
          "type": "choice",
          "before": "Let's ",
          "after": " in July!",
          "options": [
            "travels",
            "travel",
            "traveling"
          ],
          "correctAnswer": "travel",
          "hint": "Let's travel in July!",
          "explanation": "Let's + verb: Let's travel!",
          "correction": "It's travel — after Let's, the verb has no s and no ing."
        },
        {
          "id": "F01-E14",
          "part": 2,
          "review": true,
          "type": "build",
          "prompt": "Você fala por nós!",
          "answer": [
            "You",
            "speak",
            "for",
            "us"
          ],
          "bank": [
            "speak",
            "for",
            "us",
            "we",
            "speaks",
            "You"
          ],
          "hint": "You speak for us!",
          "explanation": "Bia says this to Lucas, and now he must speak English.",
          "correction": "It's You speak for us — we say for us, not for we."
        }
      ]
    }
  },
  {
    "key": "lesson-finish",
    "type": "finish"
  }
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: TRAVEL_STORAGE_KEY,
  nextRouteName: "FloridaClasses",
  nextRouteParams: { topicNum: "01" },
  screenName: "FloridaLessonScreen",
});
