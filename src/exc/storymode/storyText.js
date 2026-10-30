// Texto da historia com "toque para traduzir".
//
// Nos paragrafos, palavras ligadas por "_" formam uma expressao (sublinhado
// pontilhado): "younger_sister". O `dictionary` da aula traz ingles ->
// portugues com chaves em minusculo e sem pontuacao, tanto da expressao
// ("younger sister") quanto de cada palavra ("younger", "sister").

// `text` pode vir como string (paragrafos separados por linha em branco, do
// jeito que vem do roteiro) ou ja como array de paragrafos.
export function getParagraphs(text) {
  if (Array.isArray(text)) return text.filter(Boolean);

  return String(text || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// Texto corrido (sem os "_"), para o TTS ler.
export function plainText(paragraphs) {
  return paragraphs.join(" ").replace(/_/g, " ");
}

const clean = (text) => text.replace(/^["“(]+|[.,!?;:"”)]+$/g, "");

// Cada palavra vira um token tocavel; as que estao dentro de uma expressao
// levam tambem a expressao e a traducao dela. Sem traducao, `tr` e null.
export function tokenize(paragraphs, dictionary = {}) {
  const lookup = (text) => dictionary[clean(text).toLowerCase()] || null;

  return paragraphs.map((paragraph, pi) =>
    paragraph.split(" ").flatMap((raw, gi) => {
      const isPhrase = raw.includes("_");
      const phrase = clean(raw.replace(/_/g, " "));
      return raw.split("_").map((text, wi) => ({
        id: `${pi}-${gi}-${wi}`,
        text,
        word: clean(text),
        tr: lookup(text),
        isPhrase,
        phrase,
        phraseTr: isPhrase ? lookup(phrase) : null,
      }));
    }),
  );
}
