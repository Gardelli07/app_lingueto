import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SystemUI from "expo-system-ui";
import { PALETTES } from "./palettes";

const THEME_MODE_KEY = "@lingueto:theme_mode";

// O tema e sempre claro OU escuro — quem decide e o switch do Perfil.
export const THEME_MODES = ["light", "dark"];

// Esquema do aparelho, lido UMA unica vez no carregamento do modulo. Precisa
// ser aqui porque, depois que o app chama Appearance.setColorScheme() pra
// alinhar a camada nativa, getColorScheme() passa a devolver a nossa propria
// escolha em vez da configuracao real do sistema.
const ESQUEMA_DO_APARELHO =
  Appearance.getColorScheme() === "dark" ? "dark" : "light";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(ESQUEMA_DO_APARELHO);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(THEME_MODE_KEY)
      .then((saved) => {
        if (saved && THEME_MODES.includes(saved)) setModeState(saved);
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  const colors = PALETTES[mode];

  // Pinta o fundo da janela nativa tambem, senao aparece um flash branco nas
  // transicoes de tela e atras dos modais no modo escuro.
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.SCREEN_BG).catch(() => {});
  }, [colors.SCREEN_BG]);

  // Propaga a escolha para a camada nativa, pra que o que o app nao desenha
  // (Alert, teclado, Switch, seletor de texto) acompanhe o tema escolhido.
  useEffect(() => {
    Appearance.setColorScheme?.(mode);
  }, [mode]);

  const setMode = useCallback((next) => {
    if (!THEME_MODES.includes(next)) return;
    setModeState(next);
    AsyncStorage.setItem(THEME_MODE_KEY, next).catch(() => {});
  }, []);

  // Unico momento em que o app olha a configuracao do aparelho: no login.
  // Dali em diante quem manda e a preferencia salva (switch do Perfil).
  const aplicarTemaDoAparelho = useCallback(() => {
    setMode(ESQUEMA_DO_APARELHO);
  }, [setMode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      aplicarTemaDoAparelho,
      colors,
      isDark: mode === "dark",
      carregando,
    }),
    [mode, setMode, aplicarTemaDoAparelho, colors, carregando],
  );

  // Segura a arvore ate saber a preferencia salva — sao poucos ms de leitura
  // do AsyncStorage e evita o app abrir claro e "piscar" para o escuro.
  if (carregando) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Contexto completo: { mode, setMode, aplicarTemaDoAparelho, colors, isDark }.
export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode precisa estar dentro de <ThemeProvider>");
  return ctx;
}

// Atalho para o que quase toda tela precisa: a paleta ativa.
// Uso: `const CORES = useTheme();` — mantem o mesmo nome que o app ja usava.
export function useTheme() {
  return useThemeMode().colors;
}
