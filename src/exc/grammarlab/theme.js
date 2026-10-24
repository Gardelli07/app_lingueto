// Tokens de design do Grammar Lab (espelham o canvas do Claude Design).
// Paleta fixa e clara: essa tela nao segue o tema claro/escuro do app.

export const colors = {
  // Fundo e texto
  bg: "#F6F8FC",
  surface: "#FFFFFF",
  ink: "#0E1430",
  inkSoft: "#5B6478",
  inkStrong2: "#4A5468",
  inkMuted: "#6B7385",
  inkFaint: "#8A93A8",

  // Neutros
  border: "#E4E8F1",
  cardBorder: "#E3E8F1",
  track: "#E6EAF3",
  radio: "#D4DAE6",
  tile: "#F1F3F8",
  markerIdle: "#CBD3E3",
  finishBorder: "#E1E6F0",
  blankDash: "#C3CBDD",
  disabledBg: "#E7EBF3",

  // Azul da marca (destaque principal)
  blue: "#3355FF",
  blueInk: "#2440D8",
  blueTint: "#EAEFFF",
  blueSelected: "#F3F6FF",
  blueBlank: "#E8EEFF",
  blueBorderSoft: "#DCE4FF",

  // Verde de recompensa
  green: "#12B76A",
  greenInk: "#067647",
  greenButton: "#0A7F4B",
  greenTint: "#F0FDF5",
  greenStrip: "#F3FCF6",
  greenBorder: "#D3F2DF",
  greenChipBorder: "#BDEBD0",
  greenBlank: "#E1F8EA",
  greenTag: "#DCFAE6",
  greenRing: "#DDF3E5",
  greenHandle: "#DCEFE4",

  // Vermelho de erro (so no estado incorreto)
  red: "#F04438",
  redInk: "#B42318",
  redTint: "#FEF3F2",
  redBlank: "#FEECEA",
  redTag: "#FEE4E2",
  redHandle: "#F6DCD8",
  redBorder: "#FCD9D6",
  redButton: "#D92D20",

  // Ambar do combo
  amber: "#F38A0B",
  amberInk: "#A84A05",
  amberTint: "#FFF4E8",
  amberOff: "#F7D9B5",

  // Extras do confete
  gold: "#FDB022",
  periwinkle: "#8EA2FF",
};

export const radii = {
  card: 18,
  button: 18,
  tile: 11,
  chip: 12,
  badge: 8,
  sheet: 28,
  pill: 999,
};

// Cada peso e uma familia propria no React Native (carregadas no App.js) -
// nunca combinar com fontWeight, senao o Android troca pela fonte do sistema.
export const fonts = {
  display: "BricolageGrotesque_700Bold",
  displayHeavy: "BricolageGrotesque_800ExtraBold",
  body: "Manrope_500Medium",
  bodySemi: "Manrope_600SemiBold",
  bodyBold: "Manrope_700Bold",
  bodyHeavy: "Manrope_800ExtraBold",
};

// boxShadow em string precisa do RN 0.76+ com a New Architecture (ligada em
// android/gradle.properties).
export const shadows = {
  hairline: "0px 1px 2px rgba(14, 20, 48, 0.04)",
  ringBlue: "0px 0px 0px 4px rgba(51, 85, 255, 0.12)",
  ringGreen: "0px 0px 0px 4px rgba(18, 183, 106, 0.14)",
  ringRed: "0px 0px 0px 4px rgba(240, 68, 56, 0.10)",
  buttonBlue: "0px 12px 24px -10px rgba(51, 85, 255, 0.65)",
  buttonGreen: "0px 12px 24px -10px rgba(10, 127, 75, 0.6)",
  buttonRed: "0px 12px 24px -10px rgba(217, 45, 32, 0.6)",
  sheet: "0px -14px 36px -12px rgba(14, 20, 48, 0.16)",
  xpPop: "0px 6px 14px -4px rgba(18, 183, 106, 0.55)",
};
