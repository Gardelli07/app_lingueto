import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 03 Food & Restaurants · Aula 1 — "A Taste of Florida" (A2).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-03).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Conhecer as comidas típicas da Flórida e aprender as palavras para pedir e descrever comida.
// Audios em mp3/FL/A0-A1: listens (Fl03L*) conferidos com o Vibe em
// 2026-11-16; partes (Fl03P1-3) geradas e conferidas em 2026-11-19. Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "A Taste of Florida",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "A Taste of Florida",
          "imageDescription": "Miami: Cuban sandwich e café cubano",
          "image": FLA1.Fl03P1,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl03P1.mp3"),
          "audioDurationMs": 27840,
          "blocks": [
            {
              "kind": "p",
              "text": "Florida food is a mix of the sea, the sun and Latin culture. Let's start in Miami. The most famous sandwich here is the Cuban_sandwich: Cuban bread with roast_pork, ham, Swiss_cheese, pickles and mustard, pressed until it is hot and crispy."
            },
            {
              "kind": "p",
              "text": "With it, people drink a cafecito, a very small, very strong and very sweet Cuban coffee. If you are with friends, order a colada: it comes in a cup with small plastic cups to share."
            }
          ],
          "glossary": {
            "cuban sandwich": "sanduíche cubano",
            "roast pork": "porco assado",
            "swiss cheese": "queijo suíço"
          },
          "dictionary": {
            "cuban sandwich": "sanduíche cubano",
            "roast pork": "porco assado",
            "swiss cheese": "queijo suíço",
            "florida": "Flórida",
            "food": "comida",
            "is": "é / está",
            "a": "um / uma",
            "mix": "mistura",
            "of": "de",
            "the": "o / a / os / as",
            "sea": "mar",
            "sun": "sol",
            "and": "e",
            "latin": "latina",
            "culture": "cultura",
            "let's": "vamos (let us)",
            "start": "começar",
            "in": "em / no / na",
            "miami": "Miami",
            "most": "a maioria / mais",
            "famous": "famosa",
            "sandwich": "sanduíche",
            "here": "aqui",
            "cuban": "cubano / cubana",
            "bread": "pão",
            "with": "com",
            "roast": "assado",
            "pork": "porco",
            "ham": "presunto",
            "swiss": "suíço",
            "cheese": "queijo",
            "pickles": "picles",
            "mustard": "mostarda",
            "pressed": "prensado",
            "until": "até",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "hot": "quente",
            "crispy": "crocante",
            "people": "pessoas",
            "drink": "beber / bebida",
            "cafecito": "cafezinho cubano",
            "very": "muito",
            "small": "pequeno / pequena",
            "strong": "forte",
            "sweet": "doce",
            "coffee": "café (bebida)",
            "if": "se",
            "you": "você / vocês / te",
            "are": "são / estão",
            "friends": "amigos",
            "order": "peça / pedir",
            "colada": "colada (café cubano para dividir)",
            "comes": "vem",
            "cup": "copo / xícara",
            "plastic": "plástico",
            "cups": "copinhos",
            "to": "para / a",
            "share": "dividir / compartilhar"
          }
        },
        {
          "title": "A Taste of Florida",
          "imageDescription": "frutos do mar: stone crab, grouper, conch fritters",
          "image": FLA1.Fl03P2,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl03P2.mp3"),
          "audioDurationMs": 24400,
          "blocks": [
            {
              "kind": "p",
              "text": "Florida is surrounded by water, so seafood is everywhere. Stone_crab claws are a local_favorite, served cold with mustard sauce. You can only eat them fresh from October to May, because that is the season."
            },
            {
              "kind": "p",
              "text": "In many beach restaurants, you can order a grouper_sandwich, made with a white fish from the Gulf. In the Keys, try conch_fritters: small fried balls made with a sea_snail called conch."
            }
          ],
          "glossary": {
            "stone crab": "stone crab (caranguejo típico da Flórida)",
            "local favorite": "o preferido dos moradores",
            "grouper sandwich": "sanduíche de garoupa",
            "conch fritters": "bolinhos fritos de conch",
            "sea snail": "caramujo do mar"
          },
          "dictionary": {
            "stone crab": "stone crab (caranguejo típico da Flórida)",
            "local favorite": "o preferido dos moradores",
            "florida": "Flórida",
            "is": "é / está",
            "surrounded": "cercada",
            "by": "de / por / até",
            "water": "água",
            "so": "então / tão",
            "seafood": "frutos do mar",
            "everywhere": "em todo lugar",
            "stone": "pedra",
            "crab": "caranguejo",
            "claws": "garras",
            "are": "são / estão",
            "a": "um / uma",
            "local": "local",
            "favorite": "favorito / favorita",
            "served": "serviu",
            "cold": "frio",
            "with": "com",
            "mustard": "mostarda",
            "sauce": "molho",
            "you": "você / vocês / te",
            "can": "pode / consegue",
            "only": "só / apenas",
            "eat": "comer",
            "them": "eles / os",
            "fresh": "frescas / fresco",
            "from": "de",
            "october": "outubro",
            "to": "para / a",
            "may": "maio · (verbo) pode",
            "because": "porque",
            "that": "isso / que",
            "the": "o / a / os / as",
            "season": "temporada / estação",
            "grouper sandwich": "sanduíche de garoupa",
            "conch fritters": "bolinhos fritos de conch",
            "sea snail": "caramujo do mar",
            "in": "em / no / na",
            "many": "muitos / muitas",
            "beach": "praia",
            "restaurants": "restaurantes",
            "order": "peça / pedir",
            "grouper": "garoupa",
            "sandwich": "sanduíche",
            "made": "fez / feito",
            "white": "branco",
            "fish": "peixe",
            "gulf": "golfo",
            "keys": "Keys (ilhas)",
            "try": "experimentar",
            "conch": "conch, um caramujo do mar (pronuncia-se “konk”)",
            "fritters": "bolinhos fritos",
            "small": "pequeno / pequena",
            "fried": "fritos / frito",
            "balls": "bolinhas",
            "sea": "mar",
            "snail": "caramujo",
            "called": "chamado / ligou para"
          }
        },
        {
          "title": "A Taste of Florida",
          "imageDescription": "sobremesa e curiosidades: key lime pie, suco de laranja, jacaré",
          "image": FLA1.Fl03P3,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl03P3.mp3"),
          "audioDurationMs": 23120,
          "blocks": [
            {
              "kind": "p",
              "text": "For dessert, the star is key_lime_pie. It is made with small limes from the Keys, and it is sweet, sour and creamy. Real key lime pie is yellow, not green!"
            },
            {
              "kind": "p",
              "text": "And of course, orange_juice: Florida is famous for its oranges. Feeling brave? In some places you can try gator_bites, fried pieces of alligator meat. People say it tastes like chicken!"
            }
          ],
          "glossary": {
            "key lime pie": "torta de limão típica dos Keys",
            "orange juice": "suco de laranja",
            "gator bites": "pedaços de jacaré fritos"
          },
          "dictionary": {
            "key lime pie": "torta de limão típica dos Keys",
            "for": "para / por",
            "dessert": "sobremesa",
            "the": "o / a / os / as",
            "star": "estrela",
            "is": "é / está",
            "key": "chave · Key = ilha (nos Keys)",
            "lime": "limão (verde)",
            "pie": "torta",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "made": "fez / feito",
            "with": "com",
            "small": "pequeno / pequena",
            "limes": "limões",
            "from": "de",
            "keys": "Keys (ilhas)",
            "and": "e",
            "sweet": "doce",
            "sour": "azedo",
            "creamy": "cremoso",
            "real": "real",
            "yellow": "amarela",
            "not": "não",
            "green": "verdes",
            "orange juice": "suco de laranja",
            "gator bites": "pedaços de jacaré fritos",
            "of": "de",
            "course": "curso",
            "orange": "laranja",
            "juice": "suco",
            "florida": "Flórida",
            "famous": "famosa",
            "its": "seu / sua (de coisa)",
            "oranges": "laranjas",
            "feeling": "sentindo",
            "brave": "corajoso",
            "in": "em / no / na",
            "some": "alguns / algumas / um pouco",
            "places": "lugares",
            "you": "você / vocês / te",
            "can": "pode / consegue",
            "try": "experimentar",
            "gator": "jacaré (informal)",
            "bites": "pedacinhos / mordidas",
            "fried": "fritos / frito",
            "pieces": "pedaços",
            "alligator": "jacaré",
            "meat": "carne",
            "people": "pessoas",
            "say": "dizer",
            "tastes": "tem gosto",
            "like": "como / gostar",
            "chicken": "frango"
          }
        }
      ],
      "questions": [
        {
          "id": "F03-E01",
          "part": 0,
          "type": "choice",
          "before": "The Cuban sandwich has roast pork, ham, Swiss cheese, pickles and ",
          "after": ".",
          "options": [
            "ketchup",
            "mustard",
            "mayonnaise"
          ],
          "correctAnswer": "mustard",
          "hint": "Cuban bread with roast pork, ham, Swiss cheese, pickles and mustard",
          "explanation": "A real Cuban sandwich has mustard, not ketchup or mayonnaise.",
          "correction": "It's mustard — the Cuban sandwich has mustard."
        },
        {
          "id": "F03-E02",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "bread",
              "pão"
            ],
            [
              "roast pork",
              "porco assado"
            ],
            [
              "cheese",
              "queijo"
            ],
            [
              "pickles",
              "picles"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "Cuban bread with roast pork, ham, Swiss cheese, pickles and mustard",
          "explanation": "Now you can read the ingredients of a Cuban sandwich.",
          "correction": "bread = pão, roast pork = porco assado, cheese = queijo, pickles = picles."
        },
        {
          "id": "F03-E03",
          "part": 0,
          "type": "choice",
          "before": "A cafecito is a small, strong and very ",
          "after": " Cuban coffee.",
          "options": [
            "bitter",
            "cold",
            "sweet"
          ],
          "correctAnswer": "sweet",
          "hint": "a very small, very strong and very sweet Cuban coffee.",
          "explanation": "A cafecito is small, strong and very sweet.",
          "correction": "It's sweet — a cafecito is very sweet."
        },
        {
          "id": "F03-E04",
          "part": 0,
          "type": "listen",
          "say": "A colada is coffee to share with friends.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl03L1.mp3"),
          "options": [
            "A colada is coffee to share with friends.",
            "A colada is coffee to drink alone.",
            "A cafecito is coffee to share with friends."
          ],
          "correctAnswer": "A colada is coffee to share with friends.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "it comes in a cup with small plastic cups to share.",
          "explanation": "A colada comes with small cups to share with friends.",
          "correction": "It's A colada is coffee to share with friends — listen again for colada and share."
        },
        {
          "id": "F03-E05",
          "part": 1,
          "type": "choice",
          "before": "Stone crab season is from October to ",
          "after": ".",
          "options": [
            "December",
            "May",
            "August"
          ],
          "correctAnswer": "May",
          "hint": "You can only eat them fresh from October to May, because that is the season.",
          "explanation": "Stone crab season is from October to May.",
          "correction": "It's May — the season is from October to May."
        },
        {
          "id": "F03-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "seafood",
              "frutos do mar"
            ],
            [
              "claws",
              "garras"
            ],
            [
              "fish",
              "peixe"
            ],
            [
              "fried",
              "frito"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "Florida is surrounded by water, so seafood is everywhere.",
          "explanation": "Now you know the seafood words on Florida menus.",
          "correction": "seafood = frutos do mar, claws = garras, fish = peixe, fried = frito."
        },
        {
          "id": "F03-E07",
          "part": 1,
          "type": "choice",
          "before": "Conch fritters are made with a sea ",
          "after": ".",
          "options": [
            "fish",
            "crab",
            "snail"
          ],
          "correctAnswer": "snail",
          "hint": "small fried balls made with a sea snail called conch.",
          "explanation": "Conch is a sea snail, and it's very popular in the Keys.",
          "correction": "It's snail — conch is a sea snail."
        },
        {
          "id": "F03-E08",
          "part": 1,
          "type": "type",
          "before": "A grouper sandwich is made with a white ",
          "after": " from the Gulf.",
          "answer": "fish",
          "hint": "a grouper sandwich, made with a white fish from the Gulf.",
          "explanation": "Grouper is a white fish from the Gulf.",
          "correction": "It's fish — grouper is a white fish."
        },
        {
          "id": "F03-E09",
          "part": 2,
          "type": "choice",
          "before": "Real key lime pie is ",
          "after": ", not green.",
          "options": [
            "yellow",
            "white",
            "red"
          ],
          "correctAnswer": "yellow",
          "hint": "Real key lime pie is yellow, not green!",
          "explanation": "Real key lime pie is yellow.",
          "correction": "It's yellow — real key lime pie is yellow, not green."
        },
        {
          "id": "F03-E10",
          "part": 2,
          "type": "listen",
          "say": "It is sweet, sour and creamy.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl03L2.mp3"),
          "options": [
            "It is sweet, salty and creamy.",
            "It is sweet, sour and creamy.",
            "It is sour, sweet and crispy."
          ],
          "correctAnswer": "It is sweet, sour and creamy.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "it is sweet, sour and creamy.",
          "explanation": "Key lime pie is sweet, sour and creamy.",
          "correction": "It's It is sweet, sour and creamy — listen again for sour and creamy."
        },
        {
          "id": "F03-E11",
          "part": 2,
          "type": "build",
          "prompt": "Tem gosto de frango.",
          "answer": [
            "It",
            "tastes",
            "like",
            "chicken"
          ],
          "bank": [
            "like",
            "likes",
            "It",
            "taste",
            "tastes",
            "chicken"
          ],
          "hint": "People say it tastes like chicken!",
          "explanation": "It tastes like… means tem gosto de…",
          "correction": "It's It tastes like chicken — with it, we say tastes, with s."
        },
        {
          "id": "F03-E12",
          "part": 2,
          "type": "type",
          "before": "Florida is famous for its ",
          "after": ".",
          "answer": "oranges",
          "hint": "Florida is famous for its oranges.",
          "explanation": "Florida is famous for its oranges and orange juice.",
          "correction": "It's oranges — Florida is famous for its oranges."
        },
        {
          "id": "F03-E13",
          "part": 2,
          "review": true,
          "type": "match",
          "pairs": [
            [
              "Cuban sandwich",
              "Miami"
            ],
            [
              "conch fritters",
              "the Keys"
            ],
            [
              "stone crab",
              "October to May"
            ],
            [
              "key lime pie",
              "dessert"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap an item, then its match.",
          "hint": "Let's start in Miami.",
          "explanation": "Now you know where and when to eat each one.",
          "correction": "Cuban sandwich = Miami, conch fritters = the Keys, stone crab = October to May, key lime pie = dessert."
        },
        {
          "id": "F03-E14",
          "part": 2,
          "review": true,
          "type": "build",
          "prompt": "Eu quero experimentar a torta de limão.",
          "answer": [
            "I",
            "want",
            "to",
            "try",
            "key",
            "lime",
            "pie"
          ],
          "bank": [
            "to",
            "key",
            "I",
            "lime",
            "want",
            "try",
            "tries",
            "wants",
            "pie"
          ],
          "hint": "For dessert, the star is key lime pie.",
          "explanation": "I want to try… is perfect for ordering something new.",
          "correction": "It's I want to try key lime pie — we say I want to try, with to."
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
  nextRouteParams: { topicNum: "03" },
  screenName: "FloridaLessonScreen",
});
