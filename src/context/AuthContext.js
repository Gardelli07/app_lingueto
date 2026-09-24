import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearTokens, setOnAuthFailure } from "../services/api";
import { setActiveUser } from "../util/userScope";
import { PLAN_FREE, PLAN_FULL_ACCESS } from "../util/plans";
import { useThemeMode } from "../theme";

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "@lingueto:user";

export function AuthProvider({ children }) {
  const { aplicarTemaDoAparelho } = useThemeMode();
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_STORAGE_KEY)
      .then((raw) => {
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed) setUser(parsed);
        setActiveUser(parsed);
      })
      .catch(() => {
        setActiveUser(null);
      })
      .finally(() => setCarregando(false));
  }, []);

  function signIn(userData) {
    setUser(userData);
    setActiveUser(userData);
    AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    // O login e o unico momento em que o app olha o tema do aparelho e ja
    // deixa o app claro ou escuro de acordo. Depois disso, so o switch de
    // "Modo escuro" no Perfil muda (ver src/theme/ThemeContext.js).
    aplicarTemaDoAparelho();
  }

  function updateUser(dadosParciais) {
    setUser((prev) => {
      const next = { ...prev, ...dadosParciais };
      setActiveUser(next);
      AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function signOut() {
    setUser(null);
    setActiveUser(null);
    AsyncStorage.removeItem(USER_STORAGE_KEY);
    clearTokens();
  }

  // Registra o signOut para que api.js possa deslogar o usuario quando o
  // access_token expirar e o refresh_token tambem falhar (expirado/revogado).
  useEffect(() => {
    setOnAuthFailure(signOut);
  }, []);

  // Ate a compra pelas lojas (App Store / Play Store) ser configurada, a
  // troca de plano acontece so localmente, para permitir testar o app com
  // tudo liberado. Quando a integracao com as lojas existir, o plano deve
  // passar a vir do backend (usuario.plano) apos confirmar a compra.
  function upgradeToFullAccessPlan() {
    updateUser({ plano: PLAN_FULL_ACCESS });
  }

  function downgradeToFreePlan() {
    updateUser({ plano: PLAN_FREE });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        carregando,
        signIn,
        updateUser,
        signOut,
        upgradeToFullAccessPlan,
        downgradeToFreePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
