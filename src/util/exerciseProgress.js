// Contas compartilhadas pelos exercicios de varias perguntas num slide so
// (Exercise22 e Exercise23): precisao do slide, projecao de XP da aula e a
// meta do dia que andou com a resposta.

// Na revisao de erros so entram as perguntas que estao no Meus erros. Cada
// uma guarda o numero original, que e o `trackingSuffix` (q1, q2...): acertar
// na revisao (ou na segunda chance) apaga o erro certo. Sem lista, ou se
// nenhuma bater (a aula mudou), volta todas.
export function buildQuestionItems(questions, reviewQuestionKeys) {
  const all = questions.map((question, index) => ({
    question,
    suffix: `q${index + 1}`,
  }));
  if (!Array.isArray(reviewQuestionKeys) || reviewQuestionKeys.length === 0) {
    return all;
  }
  const missed = all.filter((item) => reviewQuestionKeys.includes(item.suffix));
  return missed.length > 0 ? missed : all;
}

// Precisao do slide contando as perguntas ainda nao respondidas como erro:
// so sobe durante a aula e, na ultima resposta, e a precisao real.
export function slideAccuracy(correctCount, totalQuestions) {
  return (correctCount / totalQuestions) * 100;
}

// XP que o servidor vai creditar se a aula fechar com `correctCount` acertos
// neste slide (projecao do LessonScreen, mesma conta da API). Null quando a
// aula nao rende XP nesta passagem (revisao ou aula ja concluida).
export function projectXp(xpProjection, correctCount, totalQuestions) {
  return xpProjection
    ? xpProjection(slideAccuracy(correctCount, totalQuestions))
    : null;
}

// Metas do dia que andaram com a resposta (comparando antes x depois). As
// que acabaram de ser concluidas tem prioridade; entre as candidatas, uma e
// sorteada.
export function pickAdvancedGoal(before, after) {
  if (!before || !after) return null;

  const advanced = after.goals.filter((goal) => {
    const previous = before.goals.find((item) => item.id === goal.id);
    return previous && goal.progress > previous.progress;
  });
  const completed = advanced.filter((goal) => goal.completed);
  const pool = completed.length > 0 ? completed : advanced;

  return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
}
