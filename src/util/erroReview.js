// chave_slide tem o formato `${lesson.screen}S${index+1}:${slideKey}`,
// ver buildSlideInstanceKey em src/pages/aulas/LessonScreen.js. Slides com
// varias perguntas acrescentam `#${trackingSuffix}`, que volta como
// `questionKey` (null quando o erro e do slide inteiro).
export function parseChaveSlide(chaveSlide) {
  if (!chaveSlide) return null;

  const [slidePart] = chaveSlide.split(":");
  const match = /^(.+)S(\d+)$/.exec(slidePart || "");
  if (!match) return null;

  const hashIndex = chaveSlide.lastIndexOf("#");
  const questionKey =
    hashIndex >= 0 ? chaveSlide.slice(hashIndex + 1) || null : null;

  return { screen: match[1], slideIndex: Number(match[2]) - 1, questionKey };
}

const FALLBACK_HINT = "Reveja o conteúdo da aula com atenção antes de responder.";

// Prioriza os campos que explicam a estrutura/gramatica do exercicio (os
// mesmos que o proprio exercicio ja mostra como feedback apos responder).
// So cai pra um resumo cru da resposta certa, ou pro aviso generico, quando
// o conteudo da aula nao tem nenhum texto explicativo cadastrado.
export function getSlideHint(slide) {
  const activity = slide && slide.activity;
  if (!activity) return FALLBACK_HINT;

  const explicacao =
    activity.feedbackMessage ||
    activity.successMessage ||
    activity.tipText ||
    activity.helperText ||
    activity.instruction ||
    activity.transcript;
  if (explicacao) return explicacao;

  if (Array.isArray(activity.correctOrder) && activity.correctOrder.length > 0) {
    return `Ordem correta: ${activity.correctOrder.join(" ")}`;
  }

  const resposta = activity.correctAnswer || activity.correctOption;
  if (resposta) return `Resposta certa: ${resposta}`;

  return FALLBACK_HINT;
}
