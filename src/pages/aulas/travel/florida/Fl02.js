import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 02 Explore Florida · Aula 1 — "Welcome to Florida" (A2).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-02).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Conhecer as regiões da Flórida e o que fazer em cada uma, e aprender as palavras para falar de lugares e clima.
// Audios em mp3/FL/A0-A1 (Fl02P1-3 das partes, Fl02L* dos listens),
// conferidos com o Vibe em 2026-11-16. Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "Welcome to Florida",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "Welcome to Florida",
          "imageDescription": "onde fica a Flórida e como é o clima",
          "image": FLA1.Fl02P1,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl02P1.mp3"),
          "audioDurationMs": 29650,
          "blocks": [
            {
              "kind": "p",
              "text": "Welcome to Florida, the Sunshine_State! Florida is in the southeast of the United States. It is a peninsula: it has water on three sides. On the east, there is the Atlantic_Ocean. On the west, there is the Gulf."
            },
            {
              "kind": "p",
              "text": "The weather is warm almost all year. Summers are hot and humid, with short storms in the afternoon. Winters are mild and sunny, so many people from the north come here in winter. The capital of Florida is Tallahassee, but the most famous cities are Orlando and Miami."
            }
          ],
          "glossary": {
            "sunshine state": "o Estado do Sol (apelido da Flórida)",
            "atlantic ocean": "oceano Atlântico"
          },
          "dictionary": {
            "sunshine state": "o Estado do Sol (apelido da Flórida)",
            "atlantic ocean": "oceano Atlântico",
            "welcome": "bem-vindo",
            "to": "para / a",
            "florida": "Flórida",
            "the": "o / a / os / as",
            "sunshine": "sol / luz do sol",
            "state": "estado",
            "is": "é / está",
            "in": "em / no / na",
            "southeast": "sudeste",
            "of": "de",
            "united": "unidos (United States)",
            "states": "estados",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "a": "um / uma",
            "peninsula": "península",
            "has": "tem",
            "water": "água",
            "on": "em / no / na",
            "three": "três",
            "sides": "lados",
            "east": "leste",
            "there": "lá / há (there are)",
            "atlantic": "Atlântico",
            "ocean": "oceano",
            "west": "oeste",
            "gulf": "golfo",
            "weather": "tempo (clima)",
            "warm": "quentinho / aquecido",
            "almost": "quase",
            "all": "todo / todos",
            "year": "ano",
            "summers": "verões",
            "are": "são / estão",
            "hot": "quente",
            "and": "e",
            "humid": "úmido",
            "with": "com",
            "short": "curto",
            "storms": "tempestades",
            "afternoon": "tarde",
            "winters": "invernos",
            "mild": "ameno",
            "sunny": "ensolarado / faz sol",
            "so": "então / tão",
            "many": "muitos / muitas",
            "people": "pessoas",
            "from": "de",
            "north": "norte",
            "come": "venha / vir",
            "here": "aqui",
            "winter": "inverno",
            "capital": "capital",
            "tallahassee": "Tallahassee (capital da Flórida)",
            "but": "mas",
            "most": "a maioria / mais",
            "famous": "famosa",
            "cities": "cidades",
            "orlando": "Orlando",
            "miami": "Miami"
          }
        },
        {
          "title": "Welcome to Florida",
          "imageDescription": "Flórida Central: parques, nascentes e o Space Coast",
          "image": FLA1.Fl02P2,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl02P2.mp3"),
          "audioDurationMs": 24530,
          "blocks": [
            {
              "kind": "p",
              "text": "Central Florida is the land of theme_parks. In Orlando, you can visit Walt Disney World, Universal Orlando and SeaWorld. But there is more: about one hour away, there are natural springs with crystal-clear_water, where you can swim, kayak and see manatees in winter."
            },
            {
              "kind": "p",
              "text": "To the east, on the Space_Coast, you can visit the Kennedy Space Center and, with luck, watch a real rocket_launch."
            }
          ],
          "glossary": {
            "theme parks": "parques temáticos",
            "crystal-clear water": "água cristalina",
            "space coast": "Space Coast (a costa espacial, onde ficam os lançamentos)",
            "rocket launch": "lançamento de foguete"
          },
          "dictionary": {
            "theme parks": "parques temáticos",
            "crystal-clear water": "água cristalina",
            "central": "central",
            "florida": "Flórida",
            "is": "é / está",
            "the": "o / a / os / as",
            "land": "terra",
            "of": "de",
            "theme": "tema",
            "parks": "parques",
            "in": "em / no / na",
            "orlando": "Orlando",
            "you": "você / vocês / te",
            "can": "pode / consegue",
            "visit": "visitar",
            "walt": "Walt",
            "disney": "Disney",
            "world": "mundo",
            "universal": "Universal",
            "and": "e",
            "seaworld": "SeaWorld (parque)",
            "but": "mas",
            "there": "lá / há (there are)",
            "more": "mais",
            "about": "sobre",
            "one": "um / uma",
            "hour": "hora",
            "away": "embora / longe",
            "are": "são / estão",
            "natural": "naturais",
            "springs": "nascentes",
            "with": "com",
            "crystal-clear": "cristalina",
            "water": "água",
            "where": "onde",
            "swim": "nadar",
            "kayak": "andar de caiaque",
            "see": "ver",
            "manatees": "peixes-boi",
            "winter": "inverno",
            "space coast": "Space Coast (a costa espacial, onde ficam os lançamentos)",
            "rocket launch": "lançamento de foguete",
            "to": "para / a",
            "east": "leste",
            "on": "em / no / na",
            "space": "espaço",
            "coast": "costa / litoral",
            "kennedy": "Kennedy",
            "center": "centro",
            "luck": "sorte",
            "watch": "assistir / observar",
            "a": "um / uma",
            "real": "real",
            "rocket": "foguete",
            "launch": "lançamento"
          }
        },
        {
          "title": "Welcome to Florida",
          "imageDescription": "Miami, Everglades, Keys, a costa do Golfo e St. Augustine",
          "image": FLA1.Fl02P3,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl02P3.mp3"),
          "audioDurationMs": 31400,
          "blocks": [
            {
              "kind": "p",
              "text": "South Florida is very different. Miami is a big international city, with famous beaches, art and Latin culture. Near Miami, the Everglades is a huge wetland with alligators and birds. From Miami, a long road over the sea takes you to the Florida_Keys and Key West."
            },
            {
              "kind": "p",
              "text": "On the Gulf_coast, cities like Tampa, St. Petersburg and Clearwater have calm water and beautiful sunsets. In the north, St. Augustine is the oldest city in the United States. Florida has something for everyone!"
            }
          ],
          "glossary": {
            "florida keys": "Florida Keys (as ilhas do sul da Flórida)",
            "gulf coast": "costa do Golfo"
          },
          "dictionary": {
            "florida keys": "Florida Keys (as ilhas do sul da Flórida)",
            "south": "sul",
            "florida": "Flórida",
            "is": "é / está",
            "very": "muito",
            "different": "diferente",
            "miami": "Miami",
            "a": "um / uma",
            "big": "grande",
            "international": "internacional",
            "city": "cidade",
            "with": "com",
            "famous": "famosa",
            "beaches": "praias",
            "art": "arte",
            "and": "e",
            "latin": "latina",
            "culture": "cultura",
            "near": "perto de",
            "the": "o / a / os / as",
            "everglades": "Everglades (pântanos do sul da Flórida)",
            "huge": "enorme",
            "wetland": "área alagada / pântano",
            "alligators": "jacarés",
            "birds": "pássaros",
            "from": "de",
            "long": "longo / muito tempo",
            "road": "estrada",
            "over": "terminado / sobre / ao longo de",
            "sea": "mar",
            "takes": "toma (a deep breath = respira fundo) / leva",
            "you": "você / vocês / te",
            "to": "para / a",
            "keys": "Keys (ilhas)",
            "key": "chave · Key = ilha (nos Keys)",
            "west": "oeste",
            "gulf coast": "costa do Golfo",
            "on": "em / no / na",
            "gulf": "golfo",
            "coast": "costa / litoral",
            "cities": "cidades",
            "like": "como / gostar",
            "tampa": "Tampa",
            "st": "São (St. = Saint)",
            "petersburg": "Petersburg",
            "clearwater": "Clearwater",
            "have": "ter / temos",
            "calm": "calmo",
            "water": "água",
            "beautiful": "lindo / lindos",
            "sunsets": "pores do sol",
            "in": "em / no / na",
            "north": "norte",
            "augustine": "Augustine (St. Augustine = Santo Agostinho)",
            "oldest": "mais antiga",
            "united": "unidos (United States)",
            "states": "estados",
            "has": "tem",
            "something": "algo / alguma coisa",
            "for": "para / por",
            "everyone": "todo mundo"
          }
        }
      ],
      "questions": [
        {
          "id": "F02-E01",
          "part": 0,
          "type": "choice",
          "before": "Florida's nickname is the ",
          "after": " State.",
          "options": [
            "Orange",
            "Sunshine",
            "Ocean"
          ],
          "correctAnswer": "Sunshine",
          "hint": "Welcome to Florida, the Sunshine State!",
          "explanation": "Florida is the Sunshine State: it is sunny almost all year.",
          "correction": "It's Sunshine — Florida's nickname is the Sunshine State."
        },
        {
          "id": "F02-E02",
          "part": 0,
          "type": "choice",
          "before": "Florida is a peninsula: it has water on ",
          "after": " sides.",
          "options": [
            "two",
            "four",
            "three"
          ],
          "correctAnswer": "three",
          "hint": "It is a peninsula: it has water on three sides.",
          "explanation": "A peninsula has water on three sides.",
          "correction": "It's three — it has water on three sides: east, west and south."
        },
        {
          "id": "F02-E03",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "peninsula",
              "península"
            ],
            [
              "humid",
              "úmido"
            ],
            [
              "mild",
              "ameno"
            ],
            [
              "storm",
              "tempestade"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "Summers are hot and humid, with short storms in the afternoon.",
          "explanation": "Now you can describe Florida's weather.",
          "correction": "peninsula = península, humid = úmido, mild = ameno, storm = tempestade."
        },
        {
          "id": "F02-E04",
          "part": 0,
          "type": "choice",
          "before": "The capital of Florida is ",
          "after": ".",
          "options": [
            "Tallahassee",
            "Miami",
            "Orlando"
          ],
          "correctAnswer": "Tallahassee",
          "hint": "The capital of Florida is Tallahassee",
          "explanation": "Tallahassee is the capital, but Orlando and Miami are more famous.",
          "correction": "It's Tallahassee — Orlando and Miami are famous, but the capital is Tallahassee."
        },
        {
          "id": "F02-E05",
          "part": 1,
          "type": "listen",
          "say": "In Orlando, you can visit Walt Disney World.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl02L1.mp3"),
          "options": [
            "In Miami, you can visit Walt Disney World.",
            "In Orlando, you can visit Walt Disney World.",
            "In Orlando, you can't visit Walt Disney World."
          ],
          "correctAnswer": "In Orlando, you can visit Walt Disney World.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "In Orlando, you can visit Walt Disney World, Universal Orlando and SeaWorld.",
          "explanation": "The big theme parks are in Orlando.",
          "correction": "It's In Orlando, you can visit Walt Disney World — listen again for Orlando and can."
        },
        {
          "id": "F02-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "theme park",
              "parque temático"
            ],
            [
              "spring",
              "nascente"
            ],
            [
              "crystal-clear",
              "cristalina"
            ],
            [
              "manatee",
              "peixe-boi"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "there are natural springs with crystal-clear water",
          "explanation": "Now you know the words for Central Florida.",
          "correction": "theme park = parque temático, spring = nascente, crystal-clear = cristalina, manatee = peixe-boi."
        },
        {
          "id": "F02-E07",
          "part": 1,
          "type": "choice",
          "before": "In the springs, you can see manatees in ",
          "after": ".",
          "options": [
            "summer",
            "winter",
            "the night"
          ],
          "correctAnswer": "winter",
          "hint": "where you can swim, kayak and see manatees in winter.",
          "explanation": "Manatees come to the warm springs in winter.",
          "correction": "It's winter — the manatees come to the springs in winter."
        },
        {
          "id": "F02-E08",
          "part": 1,
          "type": "type",
          "before": "On the Space Coast, you can watch a real rocket ",
          "after": ".",
          "answer": "launch",
          "hint": "with luck, watch a real rocket launch.",
          "explanation": "A rocket launch is the moment a rocket goes up.",
          "correction": "It's launch — a launch is when a rocket goes up into space."
        },
        {
          "id": "F02-E09",
          "part": 2,
          "type": "choice",
          "before": "The Everglades is a huge ",
          "after": " with alligators and birds.",
          "options": [
            "city",
            "wetland",
            "beach"
          ],
          "correctAnswer": "wetland",
          "hint": "the Everglades is a huge wetland with alligators and birds.",
          "explanation": "A wetland is land with a lot of water, like a swamp.",
          "correction": "It's wetland — the Everglades is a wetland, land with a lot of water."
        },
        {
          "id": "F02-E10",
          "part": 2,
          "type": "listen",
          "say": "St. Augustine is the oldest city in the country.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl02L2.mp3"),
          "options": [
            "St. Augustine is the newest city in the country.",
            "St. Augustine is the biggest city in the country.",
            "St. Augustine is the oldest city in the country."
          ],
          "correctAnswer": "St. Augustine is the oldest city in the country.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "In the north, St. Augustine is the oldest city in the United States.",
          "explanation": "St. Augustine is the oldest city in the country.",
          "correction": "It's St. Augustine is the oldest city in the country — listen again for oldest."
        },
        {
          "id": "F02-E11",
          "part": 2,
          "type": "build",
          "prompt": "A Flórida tem algo para todo mundo.",
          "answer": [
            "Florida",
            "has",
            "something",
            "for",
            "everyone"
          ],
          "bank": [
            "have",
            "Florida",
            "has",
            "something",
            "for",
            "anything",
            "everyone"
          ],
          "hint": "Florida has something for everyone!",
          "explanation": "Florida has something for everyone.",
          "correction": "It's Florida has something for everyone — with Florida, we say has, not have."
        },
        {
          "id": "F02-E12",
          "part": 2,
          "type": "type",
          "before": "Miami is a big international ",
          "after": ".",
          "answer": "city",
          "hint": "Miami is a big international city, with famous beaches, art and Latin culture.",
          "explanation": "Miami is a big international city.",
          "correction": "It's city — Miami is a big international city."
        },
        {
          "id": "F02-E13",
          "part": 2,
          "review": true,
          "type": "match",
          "pairs": [
            [
              "Orlando",
              "theme parks"
            ],
            [
              "Space Coast",
              "rocket launches"
            ],
            [
              "Everglades",
              "alligators"
            ],
            [
              "Gulf coast",
              "calm water and sunsets"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap an item, then its match.",
          "hint": "Central Florida is the land of theme parks.",
          "explanation": "Now you know what each region is famous for.",
          "correction": "Orlando = theme parks, Space Coast = rocket launches, Everglades = alligators, Gulf coast = calm water and sunsets."
        },
        {
          "id": "F02-E14",
          "part": 2,
          "review": true,
          "type": "build",
          "prompt": "Os verões são quentes e úmidos.",
          "answer": [
            "Summers",
            "are",
            "hot",
            "and",
            "humid"
          ],
          "bank": [
            "Summers",
            "humid",
            "cold",
            "is",
            "hot",
            "are",
            "and"
          ],
          "hint": "Summers are hot and humid, with short storms in the afternoon.",
          "explanation": "Summers in Florida are hot and humid.",
          "correction": "It's Summers are hot and humid — with summers, we use are."
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
  ptToggle: true,
  nextRouteName: "FloridaClasses",
  nextRouteParams: { topicNum: "02" },
  screenName: "FloridaLessonScreen",
});
