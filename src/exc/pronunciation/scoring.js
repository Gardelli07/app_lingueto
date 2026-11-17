import { projectXp } from "../../util/exerciseProgress";

// Etapas sem certo/errado (Understand, Sound practice, Sentence practice):
// fecham com 100% para nao puxar a precisao da aula para baixo, sem som e sem
// entrar no Meus erros (ficam fora do registro no LessonScreen).
export function neutralAttempt(onAttempt) {
  onAttempt?.({
    isCorrect: true,
    correctDelta: 0,
    totalDelta: 0,
    exerciseAccuracy: 100,
    muteSound: true,
  });
}

// XP que mais um acerto neste slide rende na aula (projecao do LessonScreen).
export function gainForCorrect(xpProjection, right, total) {
  const before = projectXp(xpProjection, right, total);
  return before == null ? 0 : projectXp(xpProjection, right + 1, total) - before;
}
