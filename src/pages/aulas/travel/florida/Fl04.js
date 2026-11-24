import createLessonScreen from "../../LessonScreen";
import { TRAVEL_STORAGE_KEY } from "../storage";
import { FLA1 } from "../../../../util/images";

// My Trip to Florida · 04 Culture & Local Life · Aula 1 — "The Price on the Tag" (A2).
// Veio de C:\DEV\my-trip-to-florida (src/lessons/florida.ts, florida-04).
// Motor do Business (Exercise33); cada parte traz o proprio glossary e
// dictionary. Objetivo: Entender por que o preço muda no caixa (sales tax) e como funciona a gorjeta na Flórida.
// Audios em mp3/FL/A0-A1: listens (Fl04L*) conferidos com o Vibe em
// 2026-11-16; partes (Fl04P1-3) geradas e conferidas em 2026-11-19. Imagens em assets/FL/A0-A1
// (FlNNP1-3, mapa FLA1 em util/images.js).

const LESSON_SLIDES = [
  {
    "component": "Exercise33",
    "activity": {
      "title": "The Price on the Tag",
      "glossary": {},
      "dictionary": {},
      "parts": [
        {
          "title": "The Price on the Tag",
          "imageDescription": "o imposto que aparece só no caixa",
          "image": FLA1.Fl04P1,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl04P1.mp3"),
          "audioDurationMs": 26400,
          "blocks": [
            {
              "kind": "p",
              "text": "In Florida, the price on the tag is not always the price you pay. Why? Sales_tax. In most stores, the tax is not included on the shelf. The cashier adds it at the register."
            },
            {
              "kind": "p",
              "text": "The Florida state sales tax is 6 percent, and many counties add a little more, so you usually pay between 6 and 8 percent extra. A T-shirt with a price_tag of $20.00 can cost about $21.30 at the register."
            }
          ],
          "glossary": {
            "sales tax": "imposto sobre vendas",
            "price tag": "etiqueta de preço"
          },
          "dictionary": {
            "6": "6",
            "8": "8",
            "in": "em / no / na",
            "florida": "Flórida",
            "the": "o / a / os / as",
            "price": "preço",
            "on": "em / no / na",
            "tag": "etiqueta",
            "is": "é / está",
            "not": "não",
            "always": "sempre",
            "you": "você / vocês / te",
            "pay": "pagar",
            "why": "por quê",
            "sales": "Vendas",
            "tax": "imposto",
            "most": "a maioria / mais",
            "stores": "lojas",
            "included": "incluído",
            "shelf": "prateleira",
            "cashier": "caixa (a pessoa)",
            "adds": "acrescenta / soma",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "at": "em / às · no e-mail: @ (arroba)",
            "register": "caixa registradora",
            "sales tax": "imposto sobre vendas",
            "price tag": "etiqueta de preço",
            "state": "estado",
            "percent": "por cento",
            "and": "e",
            "many": "muitos / muitas",
            "counties": "condados (municípios)",
            "add": "acrescentar",
            "a": "um / uma",
            "little": "pequeno / pouco",
            "more": "mais",
            "so": "então / tão",
            "usually": "geralmente",
            "between": "entre",
            "extra": "extra",
            "t-shirt": "camiseta",
            "with": "com",
            "of": "de",
            "$20.00": "20 dólares",
            "can": "pode / consegue",
            "cost": "custar",
            "about": "sobre",
            "$21.30": "21 dólares e 30 centavos"
          }
        },
        {
          "title": "The Price on the Tag",
          "imageDescription": "gorjeta: quanto e para quem",
          "image": FLA1.Fl04P2,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl04P2.mp3"),
          "audioDurationMs": 22480,
          "blocks": [
            {
              "kind": "p",
              "text": "The second surprise is tipping. In the United States, servers in restaurants earn a low salary, and tips are a big part of their income. That's why people usually leave 15 to 20 percent of the bill."
            },
            {
              "kind": "p",
              "text": "People also tip bartenders, taxi and rideshare drivers, hotel housekeepers and tour guides. In fast food restaurants and at the supermarket, you don't need to tip."
            }
          ],
          "glossary": {},
          "dictionary": {
            "15": "15",
            "20": "20",
            "the": "o / a / os / as",
            "second": "segundo / segunda",
            "surprise": "surpresa",
            "is": "é / está",
            "tipping": "dar gorjeta",
            "in": "em / no / na",
            "united": "unidos (United States)",
            "states": "estados",
            "servers": "garçons e garçonetes",
            "restaurants": "restaurantes",
            "earn": "ganham",
            "a": "um / uma",
            "low": "baixo",
            "salary": "salário",
            "and": "e",
            "tips": "dicas",
            "are": "são / estão",
            "big": "grande",
            "part": "parte",
            "of": "de",
            "their": "deles / delas",
            "income": "renda",
            "that's": "isso é",
            "why": "por quê",
            "people": "pessoas",
            "usually": "geralmente",
            "leave": "deixar",
            "to": "para / a",
            "percent": "por cento",
            "bill": "conta · nota de dinheiro",
            "also": "também",
            "tip": "dica",
            "bartenders": "bartenders (quem prepara drinks)",
            "taxi": "táxi",
            "rideshare": "carro de aplicativo",
            "drivers": "motoristas",
            "hotel": "hotel",
            "housekeepers": "camareiras",
            "tour": "passeio",
            "guides": "guias",
            "fast": "rápido",
            "food": "comida",
            "at": "em / às · no e-mail: @ (arroba)",
            "supermarket": "supermercado",
            "you": "você / vocês / te",
            "don't": "não",
            "need": "precisar"
          }
        },
        {
          "title": "The Price on the Tag",
          "imageDescription": "gorjeta já incluída e formas de pagamento",
          "image": FLA1.Fl04P3,
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl04P3.mp3"),
          "audioDurationMs": 26400,
          "blocks": [
            {
              "kind": "p",
              "text": "Be careful in tourist areas, especially in Miami Beach. Some restaurants add the tip to the bill automatically. Look for words like gratuity, service_charge or tip_included. If the tip is already on the bill, you don't need to pay it again."
            },
            {
              "kind": "p",
              "text": "Paying by card is normal almost everywhere, and many people pay with their phones. Still, it's good to have some small_bills for tips, because some small shops don't accept big bills like $100."
            }
          ],
          "glossary": {
            "service charge": "taxa de serviço",
            "tip included": "gorjeta incluída",
            "small bills": "notas pequenas"
          },
          "dictionary": {
            "service charge": "taxa de serviço",
            "tip included": "gorjeta incluída",
            "be": "ser / estar",
            "careful": "cuidadoso / com cuidado",
            "in": "em / no / na",
            "tourist": "turista / turísticas",
            "areas": "áreas",
            "especially": "especialmente",
            "miami": "Miami",
            "beach": "praia",
            "some": "alguns / algumas / um pouco",
            "restaurants": "restaurantes",
            "add": "acrescentar",
            "the": "o / a / os / as",
            "tip": "dica",
            "to": "para / a",
            "bill": "conta · nota de dinheiro",
            "automatically": "automaticamente",
            "look": "olhar / procurar",
            "for": "para / por",
            "words": "palavras",
            "like": "como / gostar",
            "gratuity": "gorjeta (incluída na conta)",
            "service": "serviço / atendimento",
            "charge": "taxa / cobrança",
            "or": "ou",
            "included": "incluído",
            "if": "se",
            "is": "é / está",
            "already": "já",
            "on": "em / no / na",
            "you": "você / vocês / te",
            "don't": "não",
            "need": "precisar",
            "pay": "pagar",
            "it": "isso / ele / ela · IT = TI (Tecnologia da Informação)",
            "again": "de novo",
            "small bills": "notas pequenas",
            "paying": "prestando",
            "by": "de / por / até",
            "card": "cartão",
            "normal": "normal",
            "almost": "quase",
            "everywhere": "em todo lugar",
            "and": "e",
            "many": "muitos / muitas",
            "people": "pessoas",
            "with": "com",
            "their": "deles / delas",
            "phones": "celulares",
            "still": "mesmo assim / ainda",
            "it's": "é / está",
            "good": "bom / boa",
            "have": "ter / temos",
            "small": "pequeno / pequena",
            "bills": "notas (dinheiro)",
            "tips": "dicas",
            "because": "porque",
            "shops": "lojas",
            "accept": "aceitam",
            "big": "grande",
            "$100": "100 dólares"
          }
        }
      ],
      "questions": [
        {
          "id": "F04-E01",
          "part": 0,
          "type": "choice",
          "before": "In most stores, the tax is not ",
          "after": " on the shelf.",
          "options": [
            "expensive",
            "included",
            "free"
          ],
          "correctAnswer": "included",
          "hint": "In most stores, the tax is not included on the shelf.",
          "explanation": "The tax is not in the price on the shelf.",
          "correction": "It's included — the price on the shelf doesn't include the tax."
        },
        {
          "id": "F04-E02",
          "part": 0,
          "type": "match",
          "pairs": [
            [
              "price tag",
              "etiqueta de preço"
            ],
            [
              "sales tax",
              "imposto sobre vendas"
            ],
            [
              "cashier",
              "caixa (pessoa)"
            ],
            [
              "register",
              "caixa registradora"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "The cashier adds it at the register.",
          "explanation": "Now you understand the words at the store.",
          "correction": "price tag = etiqueta de preço, sales tax = imposto sobre vendas, cashier = caixa, register = caixa registradora."
        },
        {
          "id": "F04-E03",
          "part": 0,
          "type": "choice",
          "before": "The Florida state sales tax is ",
          "after": " percent.",
          "options": [
            "10",
            "6",
            "20"
          ],
          "correctAnswer": "6",
          "hint": "The Florida state sales tax is 6 percent",
          "explanation": "The state tax is 6 percent, and many counties add a little more.",
          "correction": "It's 6 — the state tax is 6 percent, plus a little more in many counties."
        },
        {
          "id": "F04-E04",
          "part": 0,
          "type": "listen",
          "say": "The cashier adds the tax at the register.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl04L1.mp3"),
          "options": [
            "The cashier adds the tip at the register.",
            "The cashier pays the tax at the register.",
            "The cashier adds the tax at the register."
          ],
          "correctAnswer": "The cashier adds the tax at the register.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "The cashier adds it at the register.",
          "explanation": "The tax appears only at the register.",
          "correction": "It's The cashier adds the tax at the register — listen again for adds and tax."
        },
        {
          "id": "F04-E05",
          "part": 1,
          "type": "choice",
          "before": "In restaurants, people usually leave ",
          "after": " percent of the bill.",
          "options": [
            "5 to 10",
            "15 to 20",
            "30 to 40"
          ],
          "correctAnswer": "15 to 20",
          "hint": "people usually leave 15 to 20 percent of the bill.",
          "explanation": "In restaurants, the usual tip is 15 to 20 percent.",
          "correction": "It's 15 to 20 — the usual tip is 15 to 20 percent of the bill."
        },
        {
          "id": "F04-E06",
          "part": 1,
          "type": "match",
          "pairs": [
            [
              "tip",
              "gorjeta"
            ],
            [
              "server",
              "garçom ou garçonete"
            ],
            [
              "income",
              "renda"
            ],
            [
              "bill",
              "conta"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "servers in restaurants earn a low salary, and tips are a big part of their income.",
          "explanation": "Now you know the words about tipping.",
          "correction": "tip = gorjeta, server = garçom ou garçonete, income = renda, bill = conta."
        },
        {
          "id": "F04-E07",
          "part": 1,
          "type": "choice",
          "before": "At the supermarket, you ",
          "after": " need to tip.",
          "options": [
            "must",
            "don't",
            "always"
          ],
          "correctAnswer": "don't",
          "hint": "In fast food restaurants and at the supermarket, you don't need to tip.",
          "explanation": "No tip at the supermarket or in fast food restaurants.",
          "correction": "It's don't — you don't need to tip at the supermarket."
        },
        {
          "id": "F04-E08",
          "part": 1,
          "type": "listen",
          "say": "People also tip taxi and rideshare drivers.",
          "audioSource": require("../../../../../mp3/FL/A0-A1/Fl04L2.mp3"),
          "options": [
            "People don't tip taxi and rideshare drivers.",
            "People also tip taxi and rideshare drivers.",
            "People also tip bus drivers."
          ],
          "correctAnswer": "People also tip taxi and rideshare drivers.",
          "kicker": "LISTEN AND CHOOSE",
          "title": "What do you hear?",
          "subtitle": "Tap the speaker, then choose the sentence.",
          "hint": "People also tip bartenders, taxi and rideshare drivers",
          "explanation": "Taxi and rideshare drivers also get tips.",
          "correction": "It's People also tip taxi and rideshare drivers — listen again for also and rideshare."
        },
        {
          "id": "F04-E09",
          "part": 2,
          "type": "choice",
          "before": "Some restaurants add the tip to the bill ",
          "after": ".",
          "options": [
            "never",
            "automatically",
            "later"
          ],
          "correctAnswer": "automatically",
          "hint": "Some restaurants add the tip to the bill automatically.",
          "explanation": "Some restaurants add the tip for you, so check the bill.",
          "correction": "It's automatically — some restaurants add it automatically."
        },
        {
          "id": "F04-E10",
          "part": 2,
          "type": "match",
          "pairs": [
            [
              "gratuity",
              "gorjeta na conta"
            ],
            [
              "service charge",
              "taxa de serviço"
            ],
            [
              "tip included",
              "gorjeta incluída"
            ],
            [
              "small bills",
              "notas pequenas"
            ]
          ],
          "rightOrder": [
            2,
            3,
            1,
            0
          ],
          "instruction": "Tap a word, then its translation.",
          "hint": "Look for words like gratuity, service charge or tip included.",
          "explanation": "Look for these words on the bill.",
          "correction": "gratuity = gorjeta na conta, service charge = taxa de serviço, tip included = gorjeta incluída, small bills = notas pequenas."
        },
        {
          "id": "F04-E11",
          "part": 2,
          "type": "type",
          "before": "If the tip is already on the bill, you don't need to pay it ",
          "after": ".",
          "answer": "again",
          "hint": "If the tip is already on the bill, you don't need to pay it again.",
          "explanation": "Don't pay the tip twice!",
          "correction": "It's again — you don't need to pay the tip again."
        },
        {
          "id": "F04-E12",
          "part": 2,
          "type": "build",
          "prompt": "A gorjeta está incluída?",
          "answer": [
            "Is",
            "the",
            "tip",
            "included"
          ],
          "bank": [
            "included",
            "Is",
            "the",
            "tips",
            "tip",
            "are"
          ],
          "hint": "Look for words like gratuity, service charge or tip included.",
          "explanation": "Is the tip included? is a very useful question.",
          "correction": "It's Is the tip included — with the tip, we say is."
        },
        {
          "id": "F04-E13",
          "part": 2,
          "review": true,
          "type": "choice",
          "before": "A T-shirt with a price tag of $20.00 can cost about ",
          "after": " at the register.",
          "options": [
            "$20.00",
            "$25.00",
            "$21.30"
          ],
          "correctAnswer": "$21.30",
          "hint": "A T-shirt with a price tag of $20.00 can cost about $21.30 at the register.",
          "explanation": "With tax, $20.00 becomes about $21.30.",
          "correction": "It's $21.30 — the tax makes it a little more expensive."
        },
        {
          "id": "F04-E14",
          "part": 2,
          "review": true,
          "type": "build",
          "prompt": "Eu posso pagar com cartão?",
          "answer": [
            "Can",
            "I",
            "pay",
            "by",
            "card"
          ],
          "bank": [
            "Can",
            "card",
            "am",
            "cards",
            "pay",
            "I",
            "by"
          ],
          "hint": "Paying by card is normal almost everywhere",
          "explanation": "Can I pay by card? works everywhere.",
          "correction": "It's Can I pay by card — we say pay by card."
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
  nextRouteParams: { topicNum: "04" },
  screenName: "FloridaLessonScreen",
});
