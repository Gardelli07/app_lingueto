import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 05 Travel Smart · Aula 1 — "Your Documents" (A2).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-05).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Saber quais documentos levar, como agir na imigração e por que levar seguro saúde e a carteira de motorista física.
// Audios em mp3/FL/A0-A1: listens (Fl05L*) conferidos com o Vibe em
// 2026-11-16; partes (Fl05P1-3) geradas e conferidas em 2026-11-19. Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "Your Documents",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "Your Documents",
          "imageDescription": "o visto e o passaporte",
          "image": FLA1.Fl05P1,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl05P1.mp3"),
          "audioDurationMs": 23440,
          "blocks": [
            {
              "kind": "p",
              "text": "The most important step comes first: your documents. Brazilian citizens need a US tourist_visa to visit Florida. You apply online, pay a fee and then go to an interview at the US Embassy or a US Consulate in Brazil. Do it early, because sometimes the wait for an interview is long."
            },
            {
              "kind": "p",
              "text": "Your passport must be valid for your whole trip. Check the date before you buy your flight!"
            }
          ],
          "glossary": {
            "tourist visa": "visto de turista"
          },
          "dictionary": {
            "tourist visa": "visto de turista",
            "the": "o / a / os / as",
            "most": "a maioria / mais",
            "important": "importante",
            "step": "passo / etapa",
            "comes": "vem",
            "first": "primeiro / primeira",
            "your": "seu / sua",
            "documents": "documentos",
            "brazilian": "brasileiro / brasileira",
            "citizens": "cidadãos",
            "need": "precisar",
            "a": "um / uma",
            "us": "nós / nos",
            "tourist": "turista / turísticas",
            "visa": "visto",
            "to": "para / a",
            "visit": "visitar",
            "florida": "Flórida",
            "you": "você / vocês / te",
            "apply": "candidatar-se",
            "online": "on-line / pela internet",
            "pay": "pagar",
            "fee": "taxa",
            "and": "e",
            "then": "então / depois",
            "go": "ir",
            "an": "um / uma",
            "interview": "entrevista",
            "at": "em / às · no e-mail: @ (arroba)",
            "embassy": "embaixada",
            "or": "ou",
            "consulate": "consulado",
            "in": "em / no / na",
            "brazil": "Brasil",
            "do": "fazer · nas perguntas (do you…?) é auxiliar, sem tradução",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "early": "cedo",
            "because": "porque",
            "sometimes": "às vezes",
            "wait": "esperar",
            "for": "para / por",
            "is": "é / está",
            "long": "longo / muito tempo",
            "passport": "passaporte",
            "must": "deve (obrigatório)",
            "be": "ser / estar",
            "valid": "válido",
            "whole": "inteira / toda",
            "trip": "viagem",
            "check": "verifique",
            "date": "data",
            "before": "antes (de)",
            "buy": "comprar",
            "flight": "voo"
          }
        },
        {
          "title": "Your Documents",
          "imageDescription": "a imigração: o que levar e o que dizer",
          "image": FLA1.Fl05P2,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl05P2.mp3"),
          "audioDurationMs": 23680,
          "blocks": [
            {
              "kind": "p",
              "text": "At the airport in the US, an immigration officer decides if you can enter. Have these things ready: your passport, your return_ticket and the address of your hotel. Answer the questions clearly and honestly."
            },
            {
              "kind": "p",
              "text": "Be careful with your words. If you are a tourist, say you are on vacation. Don't say you are going to work, because a tourist_visa doesn't allow work. And never make jokes at immigration."
            }
          ],
          "glossary": {
            "return ticket": "passagem de volta",
            "tourist visa": "visto de turista"
          },
          "dictionary": {
            "return ticket": "passagem de volta",
            "at": "em / às · no e-mail: @ (arroba)",
            "the": "o / a / os / as",
            "airport": "aeroporto",
            "in": "em / no / na",
            "us": "nós / nos",
            "an": "um / uma",
            "immigration": "imigração",
            "officer": "oficial / agente",
            "decides": "decide",
            "if": "se",
            "you": "você / vocês / te",
            "can": "pode / consegue",
            "enter": "entrar",
            "have": "ter / temos",
            "these": "estas / estes",
            "things": "coisas",
            "ready": "prontos / em mãos",
            "your": "seu / sua",
            "passport": "passaporte",
            "return": "volta / retorno",
            "ticket": "passagem / bilhete",
            "and": "e",
            "address": "endereço",
            "of": "de",
            "hotel": "hotel",
            "answer": "atender / responder",
            "questions": "perguntas",
            "clearly": "claramente",
            "honestly": "honestamente",
            "tourist visa": "visto de turista",
            "be": "ser / estar",
            "careful": "cuidadoso / com cuidado",
            "with": "com",
            "words": "palavras",
            "are": "são / estão",
            "a": "um / uma",
            "tourist": "turista / turísticas",
            "say": "dizer",
            "on": "em / no / na",
            "vacation": "férias",
            "don't": "não",
            "going": "indo / vai (futuro)",
            "to": "para / a",
            "work": "trabalho / trabalhar",
            "because": "porque",
            "visa": "visto",
            "doesn't": "não",
            "allow": "permite",
            "never": "nunca",
            "make": "fazer / tomar",
            "jokes": "piadas"
          }
        },
        {
          "title": "Your Documents",
          "imageDescription": "seguro saúde e carteira de motorista",
          "image": FLA1.Fl05P3,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl05P3.mp3"),
          "audioDurationMs": 24000,
          "blocks": [
            {
              "kind": "p",
              "text": "Health care in the United States is very expensive. A simple visit to a clinic can cost hundreds of dollars, so travel health_insurance is strongly recommended. Keep a copy of your insurance card on your phone."
            },
            {
              "kind": "p",
              "text": "Planning to rent a car? You can usually drive in Florida with your Brazilian driver's_license, but an International_Driving_Permit is recommended. Take your physical license with you, not only a digital one."
            }
          ],
          "glossary": {
            "health insurance": "seguro saúde",
            "driver's license": "carteira de motorista",
            "international driving permit": "Permissão Internacional para Dirigir (PID)"
          },
          "dictionary": {
            "health insurance": "seguro saúde",
            "health": "saúde",
            "care": "cuidado",
            "in": "em / no / na",
            "the": "o / a / os / as",
            "united": "unidos (United States)",
            "states": "estados",
            "is": "é / está",
            "very": "muito",
            "expensive": "caro",
            "a": "um / uma",
            "simple": "simples",
            "visit": "visitar",
            "to": "para / a",
            "clinic": "clínica",
            "can": "pode / consegue",
            "cost": "custar",
            "hundreds": "centenas",
            "of": "de",
            "dollars": "dólares",
            "so": "então / tão",
            "travel": "viajar",
            "insurance": "seguro",
            "strongly": "fortemente",
            "recommended": "recomendou",
            "keep": "continuar",
            "copy": "cópia",
            "your": "seu / sua",
            "card": "cartão",
            "on": "em / no / na",
            "phone": "celular / telefone",
            "driver's license": "carteira de motorista",
            "international driving permit": "Permissão Internacional para Dirigir (PID)",
            "planning": "planejando",
            "rent": "alugar",
            "car": "carro",
            "you": "você / vocês / te",
            "usually": "geralmente",
            "drive": "dirigir",
            "florida": "Flórida",
            "with": "com",
            "brazilian": "brasileiro / brasileira",
            "driver's": "do motorista",
            "license": "carteira (habilitação)",
            "but": "mas",
            "an": "um / uma",
            "international": "internacional",
            "driving": "de direção",
            "permit": "permissão / licença",
            "take": "tirar (fotos) / levar / tomar",
            "physical": "física",
            "not": "não",
            "only": "só / apenas",
            "digital": "digital",
            "one": "um / uma"
          }
        }
      ],
      "questions": [
        {
          "id": "F05-E01",
          "part": 0,
          "type": "choice",
          "before": "Brazilian citizens need a US tourist ",
          "after": " to visit Florida.",
          "options": [
            "visa",
            "ticket",
            "card"
          ],
          "correctAnswer": "visa",
          "hint": "Brazilian citizens need a US tourist visa to visit Florida.",
          "explanation": "Brazilians need a tourist visa for the United States.",
          "correction": "It's visa — Brazilians need a tourist visa."
        },
        {
          "id": "F05-E02",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "visa",
              "visto"
            ],
            [
              "fee",
              "taxa"
            ],
            [
              "interview",
              "entrevista"
            ],
            [
              "passport",
              "passaporte"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "You apply online, pay a fee and then go to an interview",
          "explanation": "Now you know the visa words.",
          "correction": "visa = visto, fee = taxa, interview = entrevista, passport = passaporte."
        },
        {
          "id": "F05-E03",
          "part": 0,
          "type": "choice",
          "before": "Your passport must be ",
          "after": " for your whole trip.",
          "options": [
            "new",
            "valid",
            "red"
          ],
          "correctAnswer": "valid",
          "hint": "Your passport must be valid for your whole trip.",
          "explanation": "Valid means it is not expired.",
          "correction": "It's valid — valid means it is not expired."
        },
        {
          "id": "F05-E04",
          "part": 0,
          "type": "listen",
          "say": "Do it early, because sometimes the wait is long.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl05L1.mp3"),
          "options": [
            "Do it early, because sometimes the wait is short.",
            "Do it later, because sometimes the wait is long.",
            "Do it early, because sometimes the wait is long."
          ],
          "correctAnswer": "Do it early, because sometimes the wait is long.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "Do it early, because sometimes the wait for an interview is long.",
          "explanation": "Apply early: the wait can be long.",
          "correction": "It's Do it early, because sometimes the wait is long — listen again for early and long."
        },
        {
          "id": "F05-E05",
          "part": 1,
          "type": "choice",
          "before": "An immigration ",
          "after": " decides if you can enter.",
          "options": [
            "waiter",
            "officer",
            "pilot"
          ],
          "correctAnswer": "officer",
          "hint": "an immigration officer decides if you can enter.",
          "explanation": "The immigration officer decides if you can enter.",
          "correction": "It's officer — the immigration officer decides."
        },
        {
          "id": "F05-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "return ticket",
              "passagem de volta"
            ],
            [
              "address",
              "endereço"
            ],
            [
              "clearly",
              "claramente"
            ],
            [
              "honestly",
              "honestamente"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "your passport, your return ticket and the address of your hotel.",
          "explanation": "Have these things ready at immigration.",
          "correction": "return ticket = passagem de volta, address = endereço, clearly = claramente, honestly = honestamente."
        },
        {
          "id": "F05-E07",
          "part": 1,
          "type": "choice",
          "before": "A tourist visa doesn't allow ",
          "after": ".",
          "options": [
            "travel",
            "shopping",
            "work"
          ],
          "correctAnswer": "work",
          "hint": "a tourist visa doesn't allow work.",
          "explanation": "With a tourist visa, you can't work in the US.",
          "correction": "It's work — a tourist visa is for vacation, not for work."
        },
        {
          "id": "F05-E08",
          "part": 1,
          "type": "listen",
          "say": "I am a tourist on vacation.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl05L2.mp3"),
          "options": [
            "I am a tourist on vacation.",
            "I am a student on vacation.",
            "I am a tourist at work."
          ],
          "correctAnswer": "I am a tourist on vacation.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "If you are a tourist, say you are on vacation.",
          "explanation": "This is a clear and honest answer at immigration.",
          "correction": "It's I am a tourist on vacation — listen again for tourist and vacation."
        },
        {
          "id": "F05-E09",
          "part": 2,
          "type": "choice",
          "before": "Health care in the United States is very ",
          "after": ".",
          "options": [
            "cheap",
            "free",
            "expensive"
          ],
          "correctAnswer": "expensive",
          "hint": "Health care in the United States is very expensive.",
          "explanation": "Health care is very expensive in the US.",
          "correction": "It's expensive — a simple visit can cost hundreds of dollars."
        },
        {
          "id": "F05-E10",
          "part": 2,
          "type": "match",
          "pairs": [
            [
              "health insurance",
              "seguro saúde"
            ],
            [
              "clinic",
              "clínica"
            ],
            [
              "driver's license",
              "carteira de motorista"
            ],
            [
              "recommended",
              "recomendado"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "travel health insurance is strongly recommended.",
          "explanation": "Now you know the words for insurance and driving.",
          "correction": "health insurance = seguro saúde, clinic = clínica, driver's license = carteira de motorista, recommended = recomendado."
        },
        {
          "id": "F05-E11",
          "part": 2,
          "type": "type",
          "before": "Keep a copy of your insurance ",
          "after": " on your phone.",
          "answer": "card",
          "hint": "Keep a copy of your insurance card on your phone.",
          "explanation": "Keep your insurance card on your phone.",
          "correction": "It's card — keep a copy of your insurance card."
        },
        {
          "id": "F05-E12",
          "part": 2,
          "type": "build",
          "prompt": "Eu preciso de seguro saúde.",
          "answer": [
            "I",
            "need",
            "health",
            "insurance"
          ],
          "bank": [
            "insurance",
            "I",
            "need",
            "am",
            "health",
            "needs"
          ],
          "hint": "travel health insurance is strongly recommended.",
          "explanation": "I need health insurance is a sentence for your trip planning.",
          "correction": "It's I need health insurance — with I, we say need, without s."
        },
        {
          "id": "F05-E13",
          "part": 2,
          "review": true,
          "type": "choice",
          "before": "An International Driving ",
          "after": " is recommended.",
          "options": [
            "Passport",
            "Permit",
            "Visa"
          ],
          "correctAnswer": "Permit",
          "hint": "an International Driving Permit is recommended.",
          "explanation": "An International Driving Permit helps when you rent a car.",
          "correction": "It's Permit — it is called an International Driving Permit."
        },
        {
          "id": "F05-E14",
          "part": 2,
          "review": true,
          "type": "build",
          "prompt": "Eu estou de férias.",
          "answer": [
            "I'm",
            "on",
            "vacation"
          ],
          "bank": [
            "I'm",
            "on",
            "vacation",
            "am",
            "in"
          ],
          "hint": "If you are a tourist, say you are on vacation.",
          "explanation": "I'm on vacation is the perfect answer for a tourist.",
          "correction": "It's I'm on vacation — we say on vacation, not in vacation."
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
  nextRouteParams: { topicNum: "05" },
  screenName: "FloridaLessonScreen",
});
