// Tokens de design do Grammar Lab com o sistema de combo (espelham o canvas
// do Claude Design). Paleta fixa e escura: essa tela nao segue o tema
// claro/escuro do app.

export const colors = {
  bg: "#0e1322",
  card: "#161c2e",
  cardBorder: "#262e45",
  raised: "#1a2034",
  raisedBorder: "#2a3350",
  badge: "#232a40",
  text: "#ffffff",
  textSoft: "#c9cfe4",
  textMuted: "#6f7a9c",
  subtitle: "#8ea6e6",
  accent: "#6d7cff",
  accentSoft: "#a9b4ff",
  selectedBg: "#1b2142",

  green: "#34d399",
  greenBright: "#4ade80",
  greenText: "#8fd9b0",
  greenInk: "#062018",
  greenBg: "#0f2a22",
  greenBorder: "#1f5a45",
  greenScrim: "rgba(8, 46, 32, 0.94)",

  orange: "#ff8a65",
  orangeText: "#ff9a7a",
  orangeSoft: "#f3c3b3",
  orangeInk: "#2a0e06",
  orangeBg: "#2a1714",
  orangeBorder: "#6b2f22",
  wrongOptionBg: "#2c1915",

  amber: "#ffb020",
  amberText: "#ffc14d",
  amberInk: "#1d1300",
  amberSoftBg: "rgba(255,176,32,0.14)",
  amberDeepBg: "#2a2210",
  amberDeepBorder: "#6b4e12",
  hint: "#ffd27a",
};

// Cada peso e uma familia propria no React Native (carregadas no App.js) -
// nunca combinar com fontWeight, senao o Android troca pela fonte do sistema.
// boxShadow em string (usado nos componentes) precisa do RN 0.76+ com a New
// Architecture (ligada em android/gradle.properties).
export const fonts = {
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extrabold: "PlusJakartaSans_800ExtraBold",
};

// Tempos do avanco automatico (sem botao de continuar).
export const timing = {
  advanceAfterCorrectMs: 1500,
  advanceAfterWrongMs: 2400,
  advanceAfterRewardMs: 900,
};

export const PRAISE = ["NICE!", "GREAT!", "AWESOME!", "AMAZING!", "ON FIRE!"];

export function praiseFor(combo) {
  if (combo === 10) return "PERFECT!";
  return PRAISE[Math.min(Math.max(combo, 1), 5) - 1];
}
