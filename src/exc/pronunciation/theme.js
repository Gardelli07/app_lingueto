import { colors as base, fonts } from "../grammarlab/theme";

// Tokens do Pronunciation Lab (C:\DEV\lingueto-pronunciation-lab): a paleta
// escura do Grammar Lab mais o azul/lima da marca e as cores do pop-up de
// certo/errado. Paleta fixa: as aulas nao seguem o tema claro/escuro do app.
export const colors = {
  ...base,

  blue: "#5587C6",
  blueDeep: "#3b6297",
  blueSoft: "#8fb3e3",
  blueBg: "#172338",
  blueBorder: "#2c4366",
  lime: "#B0E29B",
  limeInk: "#13240c",

  teal: "#2fbf94",
  tealDeep: "#2a9d7c",
  tealTitle: "#4fd1a5",
  redOrange: "#ff6a3d",
  sheet: "#151b2d",
  ctaGreen: "#229b78",
  ctaRed: "#e8492a",
};

export { fonts };

// Simbolos foneticos (/θ/) usam uma serifa do sistema.
export const IPA_FONT = "Georgia";

// Destaque do "TH" e dos subtitulos.
export const TH_BLUE = colors.subtitle;

export const STAGES = [
  "DISCOVER THE SOUND",
  "UNDERSTAND THE SOUND",
  "SOUND PRACTICE",
  "MINIMAL PAIRS",
  "SENTENCE PRACTICE",
];
