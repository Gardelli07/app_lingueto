// Paleta estatica do modo claro.
//
// Mantida por compatibilidade: telas ainda nao migradas para o tema
// dinamico continuam importando este objeto. Telas novas (ou migradas)
// devem usar `useTheme()` / `useThemedStyles()` de src/theme, que devolvem
// a paleta clara OU escura conforme a preferencia do usuario.
//
// As cores em si vivem em src/theme/palettes.js (LIGHT).
import { LIGHT } from "../theme/palettes";

const CORES = LIGHT;

export default CORES;
