import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAulaAccessMap } from "../../../services/conteudos";
import { scopedKey } from "../../../util/userScope";
import { useAuth } from "../../../context/AuthContext";
import { hasFullAccess } from "../../../util/plans";

// Progresso das aulas do curso (`storageKey`: id -> true, salvo pelo
// LessonScreen), relido a cada vez que a tela volta ao foco, e o bloqueio das
// aulas pagas (mesma regra do GrammarLabHome).
export function useModuleProgress(navigation, storageKey) {
  const { user } = useAuth();
  const fullAccess = hasFullAccess(user);
  const [progress, setProgress] = useState({});
  const [accessMap, setAccessMap] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
        if (active) setProgress(raw ? JSON.parse(raw) : {});
      } catch {
        if (active) setProgress({});
      }
    }
    load();
    const sub = navigation.addListener("focus", load);
    return () => {
      active = false;
      sub();
    };
  }, [navigation, storageKey]);

  useEffect(() => {
    let active = true;
    fetchAulaAccessMap()
      .then((map) => active && setAccessMap(map))
      .catch(() => active && setAccessMap({}));
    return () => {
      active = false;
    };
  }, []);

  const isLessonUnlocked = (screenName) =>
    fullAccess || !accessMap || accessMap[screenName] !== false;

  return { progress, accessLoaded: accessMap !== null, isLessonUnlocked };
}
