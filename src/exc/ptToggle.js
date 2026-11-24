import React, { createContext, useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

/*
  Botao "🌐 PT" dos cursos A1 (o mesmo do CoffeeShop premium). Traduz so os
  enunciados (titulo, instrucao, pergunta); alternativas, frases do exercicio
  e audio continuam em ingles.

  Quem liga e a aula: createLessonScreen(..., { ptToggle: true }) poe o
  PtContext em volta dos slides, com o estado valendo para a aula inteira.
  Sem o contexto (outros niveis), nenhum botao aparece.

  As traducoes vem do dicionario abaixo, pelo texto exato em ingles, para nao
  precisar repetir em cada aula. Texto que nao esta aqui fica sem traducao (e
  o botao some se a tela nao tiver nada para traduzir).
*/

export const PtContext = createContext(null);

// { shown, toggle } da aula, ou null quando a aula nao tem o botao.
export function usePt() {
  return useContext(PtContext);
}

const PATTERNS = [
  [/^Type the word for (“.+”)\.$/, "Digite a palavra para $1."],
  [/^Choose the word for (“.+”)\.$/, "Escolha a palavra para $1."],
  [/^Choose the short form of (“.+”)\.$/, "Escolha a forma curta de $1."],
  [/^Type the long form of (“.+”)\.$/, "Digite a forma longa de $1."],
];

const PT = {
  // ---- Padroes dos tipos de exercicio (Grammar Lab, Business, Florida, Listening)
  "Choose the correct answer.": "Escolha a resposta certa.",
  "Translate it using the words below.": "Traduza usando as palavras abaixo.",
  "Match the pairs": "Forme os pares",
  "Tap an English phrase, then its translation.":
    "Toque numa frase em inglês e depois na tradução dela.",
  "Type the missing word.": "Digite a palavra que falta.",
  "What do you hear?": "O que você ouve?",
  "Tap the speaker, then choose the sentence.": "Toque no alto-falante e escolha a frase.",
  "What word did you hear?": "Que palavra você ouviu?",
  "Listen to the sentence and catch the word.": "Ouça a frase e pegue a palavra.",
  "What comes next?": "O que vem depois?",
  "Listen to your friend and pick the best reply.":
    "Ouça seu amigo e escolha a melhor resposta.",
  "Can you understand it at real speed?": "Você consegue entender na velocidade real?",
  "Hear it clearly first, then the way people really say it.":
    "Ouça primeiro com calma, depois do jeito que as pessoas falam de verdade.",
  "Play the conversation, then choose.": "Ouça a conversa e depois escolha.",
  "Play the dialogue and use the clues.": "Ouça o diálogo e use as pistas.",

  // ---- Instrucoes do Grammar Lab A0-A1
  "Answer using the words below.": "Responda usando as palavras abaixo.",
  "Build the short answer.": "Monte a resposta curta.",
  "Choose a or an.": "Escolha a ou an.",
  "Choose the verb form that completes the sentence.":
    "Escolha a forma do verbo que completa a frase.",
  "Tap a phrase, then its translation.": "Toque numa frase e depois na tradução dela.",
  "Tap a question word, then its translation.":
    "Toque numa palavra de pergunta e depois na tradução dela.",
  "Tap a question, then its answer.": "Toque numa pergunta e depois na resposta dela.",
  "Tap a sentence with I, then the same with he.":
    "Toque numa frase com I e depois na mesma frase com he.",
  "Tap a sentence, then why we use it.": "Toque numa frase e depois no motivo de usá-la.",
  "Tap a singular word, then its plural.":
    "Toque numa palavra no singular e depois no plural dela.",
  "Tap a situation, then what's going to happen.":
    "Toque numa situação e depois no que vai acontecer.",
  "Tap a verb, then its -ing form.": "Toque num verbo e depois na forma -ing dele.",
  "Tap a verb, then its he / she / it form.":
    "Toque num verbo e depois na forma dele com he / she / it.",
  "Tap a verb, then its past form.": "Toque num verbo e depois no passado dele.",
  "Tap a verb, then its translation.": "Toque num verbo e depois na tradução dele.",
  "Tap a word, then its pronoun.": "Toque numa palavra e depois no pronome dela.",
  "Tap a word, then its translation.": "Toque numa palavra e depois na tradução dela.",
  "Tap the full form, then its short form.": "Toque na forma completa e depois na forma curta.",
  "Translate it using the short form.": "Traduza usando a forma curta.",
  "Type a or an.": "Digite a ou an.",

  // ---- Business (Mkt01) e Florida
  "Tap a word, then its meaning.": "Toque numa palavra e depois no significado dela.",
  "Tap a job, then its translation.": "Toque numa profissão e depois na tradução dela.",
  "Tap an item, then its match.": "Toque num item e depois no par dele.",
  "Florida Words": "Palavras da Flórida",
  "Your Documents": "Seus documentos",
  "Welcome to Florida": "Bem-vindo à Flórida",
  "The Price on the Tag": "O preço na etiqueta",
  "A Taste of Florida": "Um gostinho da Flórida",

  // ---- Story Mode A0-A1 (perguntas)
  "How did Sofia feel when she got home?": "Como a Sofia se sentiu quando chegou em casa?",
  "How do Sofia and Jake help each other?": "Como a Sofia e o Jake se ajudam?",
  "How many bedrooms does her apartment have?": "Quantos quartos tem o apartamento dela?",
  "How old is Alex?": "Quantos anos o Alex tem?",
  "How old is Lucas?": "Quantos anos o Lucas tem?",
  "What does Anna love?": "O que a Anna ama?",
  "What does Jake do every morning at six?": "O que o Jake faz toda manhã às seis?",
  "What does Jake usually do in the evening?": "O que o Jake costuma fazer à noite?",
  "What does Lucas's father do during lunch?": "O que o pai do Lucas faz durante o almoço?",
  "What does Lucas's mother do?": "O que a mãe do Lucas faz?",
  "What is Jake's job?": "Qual é a profissão do Jake?",
  "What is near Sofia's apartment?": "O que fica perto do apartamento da Sofia?",
  "What kind of ice cream does Emma like?": "De que tipo de sorvete a Emma gosta?",
  "When does the family have lunch together?": "Quando a família almoça junta?",
  "When was Sofia's first day at work?": "Quando foi o primeiro dia da Sofia no trabalho?",
  "Where does Alex go on Saturdays?": "Aonde o Alex vai aos sábados?",
  "Where does Lucas's father work?": "Onde o pai do Lucas trabalha?",
  "Where is Jake from?": "De onde o Jake é?",
  "Where is Mei from?": "De onde a Mei é?",
  "Where is Sofia from?": "De onde a Sofia é?",
  "Who does Lucas live with?": "Com quem o Lucas mora?",
  "Who is Mr. Costa?": "Quem é o Sr. Costa?",
  "Who is going to visit Sofia next weekend?":
    "Quem vai visitar a Sofia no próximo fim de semana?",
  "Why did Sofia move to São Paulo?": "Por que a Sofia se mudou para São Paulo?",
  "Why didn't Sofia eat breakfast?": "Por que a Sofia não tomou café da manhã?",
  "Why does Lucas love his family?": "Por que o Lucas ama a família dele?",
  // Historia do Grammar Lab (Gmm32, Ana's Bag)
  "What fruit is in Ana's bag?": "Que fruta tem na bolsa da Ana?",
  "What is Leo's job?": "Qual é a profissão do Leo?",
  "Which is correct?": "Qual está correta?",
  "What does Leo have?": "O que o Leo tem?",

  // ---- Pronunciation Lab A0-A1
  "Can you hear the difference?": "Você consegue ouvir a diferença?",
  "Listen carefully to the two pronunciations.": "Ouça com atenção as duas pronúncias.",
  "Do they sound the same?": "Elas soam iguais?",
  "Let’s practice the sound!": "Vamos praticar o som!",
  "Listen and choose the word you heard.": "Ouça e escolha a palavra que você ouviu.",
  "Time to use it in real sentences!": "Hora de usar em frases de verdade!",
};

// Traducao do enunciado em ingles, ou undefined se nao houver.
export function ptOf(text) {
  if (typeof text !== "string") return undefined;
  const key = text.trim();
  if (PT[key]) return PT[key];
  for (const [re, out] of PATTERNS) {
    if (re.test(key)) return key.replace(re, out);
  }
  return undefined;
}

// O botao em si. `look` adapta as cores ao tema da tela.
const LOOKS = {
  dark: { bg: "#1a2034", border: "#2a3350", text: "#c9cfe4", active: "#6d7cff" },
  light: { bg: "#FFFFFF", border: "#E3E8F0", text: "#0F172A", active: "#3B5BF6" },
};

export function PtButton({ active, onPress, look = "dark", style }) {
  const c = LOOKS[look] || LOOKS.dark;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={active ? "Esconder tradução" : "Mostrar tradução"}
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      hitSlop={6}
      style={[
        styles.button,
        { backgroundColor: c.bg, borderColor: c.border },
        active && { backgroundColor: c.active, borderColor: c.active },
        style,
      ]}
    >
      <Text style={[styles.text, { color: active ? "#FFFFFF" : c.text }]}>🌐 PT</Text>
    </Pressable>
  );
}

// Botao ligado ao PtContext; nao aparece fora de aula A1.
export function PtContextButton(props) {
  const pt = usePt();
  if (!pt) return null;
  return <PtButton active={pt.shown} onPress={pt.toggle} {...props} />;
}

// Linha com a traducao de `text`, so com o botao ligado.
export function PtLine({ text, style }) {
  const pt = usePt();
  const translated = ptOf(text);
  if (!pt?.shown || !translated) return null;
  return <Text style={style}>{translated}</Text>;
}

const styles = StyleSheet.create({
  button: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 12, fontWeight: "700" },
});
