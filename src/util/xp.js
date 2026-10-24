// XP maximo de uma aula (100% de precisao): xpForAccuracy(100).
export const XP_PER_LESSON = 50;

// Mesma conta do calcularXp da API (progresso.service.ts), que e quem credita
// o XP: de 10 (0%) a 50 (100%). Mudou la, muda aqui.
export function xpForAccuracy(accuracy) {
  return Math.round(10 + accuracy * 0.4);
}

export const LEVEL_XP_CURVE = [
  { level: 1, totalXp: 0 },
  { level: 2, totalXp: 50 },
  { level: 3, totalXp: 100 },
  { level: 4, totalXp: 200 },
  { level: 5, totalXp: 320 },
  { level: 6, totalXp: 480 },
  { level: 7, totalXp: 700 },
  { level: 8, totalXp: 980 },
  { level: 9, totalXp: 1350 },
  { level: 10, totalXp: 1850 },
  { level: 11, totalXp: 2850 },
];

export function getLevelProgress(totalXp) {
  let currentLevelIndex = 0;

  for (let i = 0; i < LEVEL_XP_CURVE.length; i += 1) {
    if (totalXp >= LEVEL_XP_CURVE[i].totalXp) {
      currentLevelIndex = i;
    } else {
      break;
    }
  }

  const currentLevelData = LEVEL_XP_CURVE[currentLevelIndex];
  const nextLevelData =
    LEVEL_XP_CURVE[currentLevelIndex + 1] ?? LEVEL_XP_CURVE[currentLevelIndex];

  const xpAtCurrentLevel = currentLevelData.totalXp;
  const xpAtNextLevel = nextLevelData.totalXp;
  const levelRange = Math.max(1, xpAtNextLevel - xpAtCurrentLevel);
  const xpInsideLevel = Math.max(0, totalXp - xpAtCurrentLevel);
  const levelPercent = Math.min(100, (xpInsideLevel / levelRange) * 100);

  return {
    currentLevel: currentLevelData.level,
    nextLevel: nextLevelData.level,
    xpAtCurrentLevel,
    xpAtNextLevel,
    xpInsideLevel,
    levelRange,
    levelPercent,
    xpMissingForNextLevel: Math.max(0, xpAtNextLevel - totalXp),
  };
}

export function formatXp(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}
