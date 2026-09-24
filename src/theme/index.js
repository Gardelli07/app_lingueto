import { useTheme, useThemeMode } from "./ThemeContext";

export { ThemeProvider, useTheme, useThemeMode, THEME_MODES } from "./ThemeContext";
export { LIGHT, DARK, PALETTES } from "./palettes";

// Cache global por fabrica de estilos: como so existem duas paletas e as
// fabricas sao constantes de modulo, cada StyleSheet.create roda no maximo
// duas vezes na vida do app (e nao a cada montagem de tela).
const cache = new WeakMap();

/**
 * Recebe uma fabrica `(CORES) => StyleSheet.create({...})` e devolve o
 * StyleSheet ja resolvido para o tema ativo.
 *
 *   export default function Tela() {
 *     const CORES = useTheme();
 *     const styles = useThemedStyles(makeStyles);
 *     ...
 *   }
 *   const makeStyles = (CORES) => StyleSheet.create({ ... });
 *
 * A fabrica precisa ser uma constante de modulo (nao pode ser criada dentro
 * do componente), senao o cache nao consegue reaproveitar o StyleSheet.
 */
export function useThemedStyles(factory) {
  const { mode, colors } = useThemeMode();

  let porTema = cache.get(factory);
  if (!porTema) {
    porTema = new Map();
    cache.set(factory, porTema);
  }
  if (!porTema.has(mode)) porTema.set(mode, factory(colors));
  return porTema.get(mode);
}

export { useTheme as useCores };
export default useTheme;
