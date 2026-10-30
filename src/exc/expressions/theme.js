// Tokens de design das aulas de Expressions (espelham o canvas do Claude
// Design). Paleta fixa e clara: essa tela nao segue o tema claro/escuro do app.

export const colors = {
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  border: "#E3E8F0",
  text: "#0F172A",
  muted: "#5B6478",
  body: "#4B5466",
  iconMuted: "#94A0B4",

  blue: "#3B5BF6",
  blueDark: "#2238B8",
  blueText: "#2547E8",
  blueSoft: "#E8EDFF",

  green: "#22A55A",
  greenDark: "#15803D",
  greenSoft: "#EAF8EF",
  greenHalo: "#DCF5E3",
  greenCard: "#F4FBF6",
  greenCardBorder: "#D6EFDF",
  greenHandle: "#CFEFDB",

  red: "#E5484D",
  redStrong: "#DC2626",
  redIcon: "#EF4444",
  redText: "#B91C1C",
  redDark: "#B42318",
  redSoft: "#FDECEC",
  redHalo: "#FDE3E4",
  redCard: "#FEF2F2",
  redCardBorder: "#F6D0D2",
  redHandle: "#F6C9CB",

  amber: "#F59E0B",
  amberText: "#B45309",
  peach: "#FDE7D3",
  peachIcon: "#C2410C",
  chipDashed: "#CBD3E1",
};

// Cada peso e uma familia propria no React Native (carregadas no App.js) -
// nunca combinar com fontWeight, senao o Android troca pela fonte do sistema.
export const fonts = {
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extrabold: "PlusJakartaSans_800ExtraBold",
};

// Borda inferior "3D" dos botoes de jogo. boxShadow em string precisa do RN
// 0.76+ com a New Architecture (ligada em android/gradle.properties).
export const ledge = (color, depth = 5) => `0px ${depth}px 0px 0px ${color}`;
