import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 06 Speak Like a Local · Aula 1 — "Florida Words" (A2).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-06).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Entender palavras e expressões que os moradores da Flórida usam no dia a dia.
// Audios dos listens em mp3/FL/A0-A1 (Fl06L*), conferidos com o Vibe em
// 2026-11-16. Partes ainda sem audio (o TTS le). Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "Florida Words",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "Florida Words",
          "imageDescription": "Floridians, the Sunshine State e os snowbirds",
          "image": FLA1.Fl06P1,
          "blocks": [
            {
              "kind": "p",
              "text": "Every place has its own words, and Florida is no different. Locals call themselves Floridians, and they call their home the Sunshine_State. And in winter, you will hear about snowbirds."
            },
            {
              "kind": "p",
              "text": "A snowbird is not a bird! It is a person, usually retired, from a cold state or from Canada, who spends the winter in Florida. In winter, the roads and restaurants are full of snowbirds."
            }
          ],
          "glossary": {
            "sunshine state": "o Estado do Sol (apelido da Flórida)"
          },
          "dictionary": {
            "sunshine state": "o Estado do Sol (apelido da Flórida)",
            "every": "todo / toda / cada",
            "place": "lugar",
            "has": "tem",
            "its": "seu / sua (de coisa)",
            "own": "próprio / próprios",
            "words": "palavras",
            "and": "e",
            "florida": "Flórida",
            "is": "é / está",
            "no": "não / nenhum",
            "different": "diferente",
            "locals": "moradores locais",
            "call": "ligação",
            "themselves": "a si mesmos",
            "floridians": "pessoas da Flórida",
            "they": "eles / elas",
            "their": "deles / delas",
            "home": "casa / lar",
            "the": "o / a / os / as",
            "sunshine": "sol / luz do sol",
            "state": "estado",
            "in": "em / no / na",
            "winter": "inverno",
            "you": "você / vocês / te",
            "will": "vai (futuro)",
            "hear": "ouvir",
            "about": "sobre",
            "snowbirds": "snowbirds (quem passa o inverno na Flórida)",
            "a": "um / uma",
            "snowbird": "snowbird (quem passa o inverno na Flórida)",
            "not": "não",
            "bird": "pássaro",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "person": "pessoa",
            "usually": "geralmente",
            "retired": "aposentado",
            "from": "de",
            "cold": "frio",
            "or": "ou",
            "canada": "Canadá",
            "who": "que / quem",
            "spends": "passa (o tempo)",
            "roads": "estradas",
            "restaurants": "restaurantes",
            "are": "são / estão",
            "full": "cheios",
            "of": "de"
          }
        },
        {
          "title": "Florida Words",
          "imageDescription": "falando do clima: muggy, pouring, sunburn",
          "image": FLA1.Fl06P2,
          "blocks": [
            {
              "kind": "p",
              "text": "Talking about the weather is very common. In summer, people say: It's so muggy today! Muggy means hot and humid, when the air feels heavy and wet. Afternoon storms are normal, so you'll hear: It's_pouring! It means it's raining very hard."
            },
            {
              "kind": "p",
              "text": "Be careful with the sun, or you'll get a sunburn, when your skin turns red and hurts. Locals always say: Don't forget sunscreen!"
            }
          ],
          "glossary": {
            "it's pouring": "está chovendo muito"
          },
          "dictionary": {
            "it's pouring": "está chovendo muito",
            "talking": "conversando",
            "about": "sobre",
            "the": "o / a / os / as",
            "weather": "tempo (clima)",
            "is": "é / está",
            "very": "muito",
            "common": "comum",
            "in": "em / no / na",
            "summer": "verão",
            "people": "pessoas",
            "say": "dizer",
            "it's": "é / está",
            "so": "então / tão",
            "muggy": "abafado (quente e úmido)",
            "today": "hoje",
            "means": "significa",
            "hot": "quente",
            "and": "e",
            "humid": "úmido",
            "when": "quando",
            "air": "ar",
            "feels": "se sente",
            "heavy": "pesado",
            "wet": "molhado",
            "afternoon": "tarde",
            "storms": "tempestades",
            "are": "são / estão",
            "normal": "normal",
            "you'll": "você vai (you will)",
            "hear": "ouvir",
            "pouring": "chovendo muito",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "raining": "chovendo",
            "hard": "forte / difícil",
            "be": "ser / estar",
            "careful": "cuidadoso / com cuidado",
            "with": "com",
            "sun": "sol",
            "or": "ou",
            "get": "ficar / conseguir",
            "a": "um / uma",
            "sunburn": "queimadura de sol",
            "your": "seu / sua",
            "skin": "pele",
            "turns": "fica / se torna",
            "red": "vermelho",
            "hurts": "dói",
            "locals": "moradores locais",
            "always": "sempre",
            "don't": "não",
            "forget": "esquecer",
            "sunscreen": "protetor solar"
          }
        },
        {
          "title": "Florida Words",
          "imageDescription": "sotaques e frases do dia a dia: Spanglish, y'all, the Turnpike, Have a good one!",
          "image": FLA1.Fl06P3,
          "blocks": [
            {
              "kind": "p",
              "text": "Florida is also a mix of accents. In Miami, many people speak English and Spanish together, and you'll hear Spanglish: Dale! means OK, let's go. In North Florida, which is part of the American South, you may hear y'all, short for you all."
            },
            {
              "kind": "p",
              "text": "On the road, locals talk about the Turnpike, a big highway with tolls that crosses the state. And if someone says: Have_a_good_one!, just smile and say: You_too!"
            }
          ],
          "glossary": {
            "have a good one": "tenha um bom dia (despedida informal)",
            "you too": "você também"
          },
          "dictionary": {
            "florida": "Flórida",
            "is": "é / está",
            "also": "também",
            "a": "um / uma",
            "mix": "mistura",
            "of": "de",
            "accents": "sotaques",
            "in": "em / no / na",
            "miami": "Miami",
            "many": "muitos / muitas",
            "people": "pessoas",
            "speak": "falar",
            "english": "inglês",
            "and": "e",
            "spanish": "espanhol",
            "together": "juntos",
            "you'll": "você vai (you will)",
            "hear": "ouvir",
            "spanglish": "Spanglish (mistura de inglês e espanhol)",
            "dale": "Dale! = Vamos! / OK! (espanhol de Miami)",
            "means": "significa",
            "ok": "bem / ok",
            "let's": "vamos (let us)",
            "go": "ir",
            "north": "norte",
            "which": "que / o qual",
            "part": "parte",
            "the": "o / a / os / as",
            "american": "americano / americana",
            "south": "sul",
            "you": "você / vocês / te",
            "may": "maio · (verbo) pode",
            "y'all": "vocês (you all)",
            "short": "curto",
            "for": "para / por",
            "all": "todo / todos",
            "have a good one": "tenha um bom dia (despedida informal)",
            "you too": "você também",
            "on": "em / no / na",
            "road": "estrada",
            "locals": "moradores locais",
            "talk": "conversar / falar",
            "about": "sobre",
            "turnpike": "rodovia com pedágio",
            "big": "grande",
            "highway": "rodovia",
            "with": "com",
            "tolls": "pedágios",
            "that": "isso / que",
            "crosses": "atravessa",
            "state": "estado",
            "if": "se",
            "someone": "alguém",
            "says": "diz",
            "have": "ter / temos",
            "good": "bom / boa",
            "one": "um / uma",
            "just": "só / apenas",
            "smile": "sorriso",
            "say": "dizer",
            "too": "também"
          }
        }
      ],
      "questions": [
        {
          "id": "F06-E01",
          "part": 0,
          "type": "choice",
          "before": "People from Florida are called ",
          "after": ".",
          "options": [
            "Floridos",
            "Floridians",
            "Floridanians"
          ],
          "correctAnswer": "Floridians",
          "hint": "Locals call themselves Floridians",
          "explanation": "People from Florida are Floridians.",
          "correction": "It's Floridians — locals call themselves Floridians."
        },
        {
          "id": "F06-E02",
          "part": 0,
          "type": "choice",
          "before": "A snowbird is a ",
          "after": ", not a bird.",
          "options": [
            "state",
            "car",
            "person"
          ],
          "correctAnswer": "person",
          "hint": "It is a person, usually retired, from a cold state or from Canada",
          "explanation": "A snowbird is a person who spends the winter in Florida.",
          "correction": "It's person — a snowbird is a person, usually retired."
        },
        {
          "id": "F06-E03",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "snowbird",
              "quem passa o inverno na Flórida"
            ],
            [
              "retired",
              "aposentado"
            ],
            [
              "cold",
              "frio"
            ],
            [
              "winter",
              "inverno"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "It is a person, usually retired, from a cold state or from Canada, who spends the winter in Florida.",
          "explanation": "Now you know what a snowbird is.",
          "correction": "snowbird = quem passa o inverno na Flórida, retired = aposentado, cold = frio, winter = inverno."
        },
        {
          "id": "F06-E04",
          "part": 0,
          "type": "listen",
          "say": "In winter, the roads are full of snowbirds.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl06L1.mp3"),
          "options": [
            "In summer, the roads are full of snowbirds.",
            "In winter, the roads are full of snowbirds.",
            "In winter, the beaches are full of snowbirds."
          ],
          "correctAnswer": "In winter, the roads are full of snowbirds.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "In winter, the roads and restaurants are full of snowbirds.",
          "explanation": "Snowbirds come in winter.",
          "correction": "It's In winter, the roads are full of snowbirds — listen again for winter and roads."
        },
        {
          "id": "F06-E05",
          "part": 1,
          "type": "choice",
          "before": "Muggy means hot and ",
          "after": ".",
          "options": [
            "dry",
            "cold",
            "humid"
          ],
          "correctAnswer": "humid",
          "hint": "Muggy means hot and humid, when the air feels heavy and wet.",
          "explanation": "Muggy is hot and humid, the typical Florida summer.",
          "correction": "It's humid — muggy means hot and humid."
        },
        {
          "id": "F06-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "muggy",
              "abafado"
            ],
            [
              "pouring",
              "chovendo muito"
            ],
            [
              "sunburn",
              "queimadura de sol"
            ],
            [
              "sunscreen",
              "protetor solar"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "It means it's raining very hard.",
          "explanation": "Now you can talk about Florida weather like a local.",
          "correction": "muggy = abafado, pouring = chovendo muito, sunburn = queimadura de sol, sunscreen = protetor solar."
        },
        {
          "id": "F06-E07",
          "part": 1,
          "type": "listen",
          "say": "It's so muggy today!",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl06L2.mp3"),
          "options": [
            "It's so sunny today!",
            "It's so funny today!",
            "It's so muggy today!"
          ],
          "correctAnswer": "It's so muggy today!",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "It's so muggy today!",
          "explanation": "You will hear this every day in the summer.",
          "correction": "It's It's so muggy today — listen again for muggy."
        },
        {
          "id": "F06-E08",
          "part": 1,
          "type": "type",
          "before": "Don't forget ",
          "after": "!",
          "answer": "sunscreen",
          "hint": "Locals always say: Don't forget sunscreen!",
          "explanation": "Don't forget sunscreen, or you'll get a sunburn!",
          "correction": "It's sunscreen — sunscreen protects your skin from the sun."
        },
        {
          "id": "F06-E09",
          "part": 2,
          "type": "choice",
          "before": "In Miami, Dale! means OK, let's ",
          "after": ".",
          "options": [
            "eat",
            "go",
            "stop"
          ],
          "correctAnswer": "go",
          "hint": "Dale! means OK, let's go.",
          "explanation": "Dale! means OK, let's go. You'll hear it a lot in Miami.",
          "correction": "It's go — Dale! means OK, let's go."
        },
        {
          "id": "F06-E10",
          "part": 2,
          "type": "choice",
          "before": "Y'all is short for ",
          "after": ".",
          "options": [
            "you all",
            "yes all",
            "you and I"
          ],
          "correctAnswer": "you all",
          "hint": "you may hear y'all, short for you all.",
          "explanation": "Y'all means you all. It's common in the American South.",
          "correction": "It's you all — y'all is short for you all."
        },
        {
          "id": "F06-E11",
          "part": 2,
          "type": "listen",
          "say": "Have a good one!",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl06L3.mp3"),
          "options": [
            "Have a good time!",
            "Have a good night!",
            "Have a good one!"
          ],
          "correctAnswer": "Have a good one!",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "And if someone says: Have a good one!, just smile and say: You too!",
          "explanation": "Have a good one! is a friendly goodbye.",
          "correction": "It's Have a good one — listen again for one."
        },
        {
          "id": "F06-E12",
          "part": 2,
          "type": "build",
          "prompt": "Você também!",
          "answer": [
            "You",
            "too"
          ],
          "bank": [
            "too",
            "two",
            "to",
            "You"
          ],
          "hint": "just smile and say: You too!",
          "explanation": "You too! is the answer to Have a good one!",
          "correction": "It's You too — too, with two o's, means também."
        },
        {
          "id": "F06-E13",
          "part": 2,
          "review": true,
          "type": "match",
          "pairs": [
            [
              "Dale!",
              "OK, let's go!"
            ],
            [
              "Y'all",
              "you all"
            ],
            [
              "It's pouring!",
              "It's raining very hard."
            ],
            [
              "Have a good one!",
              "Have a good day!"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap an item, then its match.",
          "hint": "Dale! means OK, let's go.",
          "explanation": "Now you understand Florida expressions.",
          "correction": "Dale! = OK, let's go!, Y'all = you all, It's pouring! = it's raining very hard, Have a good one! = have a good day!"
        },
        {
          "id": "F06-E14",
          "part": 2,
          "review": true,
          "type": "type",
          "before": "The Turnpike is a big highway with ",
          "after": ".",
          "answer": "tolls",
          "hint": "a big highway with tolls that crosses the state.",
          "explanation": "On the Turnpike, you pay tolls.",
          "correction": "It's tolls — the Turnpike is a highway with tolls."
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
  nextRouteParams: { topicNum: "06" },
  screenName: "FloridaLessonScreen",
});
