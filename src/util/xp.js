// XP maximo de uma aula (100% de precisao): xpForAccuracy(100).
export const XP_PER_LESSON = 50;

// Mesma conta do calcularXp da API (progresso.service.ts), que e quem credita
// o XP: de 10 (0%) a 50 (100%). Mudou la, muda aqui.
export function xpForAccuracy(accuracy) {
  return Math.round(10 + accuracy * 0.4);
}

// Bonus de combo: cada acerto a partir do 2o seguido soma esse XP ao da
// precisao. O total vai como xp_bonus no concluir-aula (teto XP_BONUS_MAX).
export const COMBO_BONUS_XP = 5;
export const COMBO_BONUS_MIN = 2;

export function comboBonusFor(combo) {
  return combo >= COMBO_BONUS_MIN ? COMBO_BONUS_XP : 0;
}

// Recompensa extra ao chegar no combo x5 e x10 (telas de comemoracao do
// Grammar Lab). Entra no mesmo xp_bonus da aula.
export const COMBO_REWARD_XP = { 5: 10, 10: 20 };

export function comboRewardFor(combo) {
  return COMBO_REWARD_XP[combo] || 0;
}

// Teto do xp_bonus por aula: tem que bater com XP_BONUS_MAXIMO_POR_AULA na
// API (progresso.service.ts).
export const XP_BONUS_MAX = 150;

// Preco da segunda chance. Quem desconta e a API (CUSTO_SEGUNDA_CHANCE em
// progresso.service.ts); aqui e so para a tela. Mudou la, muda aqui.
export const SECOND_CHANCE_COST = 15;

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
