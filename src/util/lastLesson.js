import AsyncStorage from "@react-native-async-storage/async-storage";
import { scopedKey } from "./userScope";

// Ultima aula que chegou na tela final (concluida agora ou refeita), por
// usuario. Alimenta o "Continue de onde parou" da Home (findContinueLesson em
// courseCatalog.js). Fica fora do courseCatalog porque o LessonScreen grava
// aqui, e o courseCatalog importa as telas de aula, que importam o
// LessonScreen.
const LAST_LESSON_DONE_KEY = "@ultima_aula_feita";

export async function saveLastLessonDone(screen) {
  if (!screen) return;
  await AsyncStorage.setItem(
    await scopedKey(LAST_LESSON_DONE_KEY),
    JSON.stringify({ screen: String(screen) }),
  );
}

export async function loadLastLessonDone() {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(LAST_LESSON_DONE_KEY));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function clearLastLessonDone() {
  await AsyncStorage.removeItem(await scopedKey(LAST_LESSON_DONE_KEY));
}
