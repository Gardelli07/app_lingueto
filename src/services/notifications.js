import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ENABLED_KEY = "@lingueto:notifications_enabled";
const HOUR_KEY = "@lingueto:notifications_hour";
const MINUTE_KEY = "@lingueto:notifications_minute";
const PROMPTED_KEY = "@lingueto:notifications_prompted";
const SUGGESTED_HOUR_KEY = "@lingueto:study_time_suggested_hour";
const REMINDER_ID = "daily-practice-reminder";
export const DEFAULT_REMINDER_HOUR = 20;
export const DEFAULT_REMINDER_MINUTE = 0;

// Controla como a notificação aparece quando o app esta aberto em primeiro
// plano (por padrao o expo-notifications nao mostra nada nesse caso).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("default", {
    name: "Lembretes",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function getReminderSettings() {
  const [enabled, hour, minute] = await AsyncStorage.multiGet([
    ENABLED_KEY,
    HOUR_KEY,
    MINUTE_KEY,
  ]);

  return {
    enabled: enabled[1] === "true",
    hour: hour[1] ? Number(hour[1]) : DEFAULT_REMINDER_HOUR,
    minute: minute[1] ? Number(minute[1]) : DEFAULT_REMINDER_MINUTE,
  };
}

export async function requestNotificationPermission() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Agenda (ou reagenda, se ja existir) o lembrete diario. Retorna false sem
// mexer em nada se o usuario negar a permissao do sistema.
export async function enableDailyReminder(
  hour = DEFAULT_REMINDER_HOUR,
  minute = DEFAULT_REMINDER_MINUTE,
) {
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await ensureAndroidChannel();
  await Notifications.cancelScheduledNotificationAsync(REMINDER_ID).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_ID,
    content: {
      title: "Hora de praticar inglês! 🇬🇧",
      body: "Termine uma lição hoje e mantenha sua sequência viva.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  await AsyncStorage.multiSet([
    [ENABLED_KEY, "true"],
    [HOUR_KEY, String(hour)],
    [MINUTE_KEY, String(minute)],
  ]);

  return true;
}

export async function disableDailyReminder() {
  await Notifications.cancelScheduledNotificationAsync(REMINDER_ID).catch(() => {});
  await AsyncStorage.setItem(ENABLED_KEY, "false");
}

// Dispara uma notificação imediata (poucos segundos) só para o usuário
// conferir como ela aparece no aparelho. Retorna false se a permissão foi
// negada.
export async function sendTestNotification() {
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora de praticar inglês! 🇬🇧",
      body: "Essa é uma notificação de teste — assim que vai aparecer o lembrete diário.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      repeats: false,
    },
  });

  return true;
}

// Controla se o pop-up de "defina um horario de estudo" ja apareceu, pra
// so pedir uma vez (o usuario sempre pode mudar depois no Perfil).
export async function hasPromptedStudyTime() {
  return (await AsyncStorage.getItem(PROMPTED_KEY)) === "true";
}

export async function markStudyTimePrompted() {
  await AsyncStorage.setItem(PROMPTED_KEY, "true");
}

// Horario sugerido no pop-up de lembrete da Home, vindo da pergunta
// "Quando voce prefere estudar?" do onboarding. null = sem sugestao.
export async function setSuggestedStudyHour(hour) {
  if (hour == null) {
    await AsyncStorage.removeItem(SUGGESTED_HOUR_KEY);
  } else {
    await AsyncStorage.setItem(SUGGESTED_HOUR_KEY, String(hour));
  }
}

export async function getSuggestedStudyHour() {
  const value = await AsyncStorage.getItem(SUGGESTED_HOUR_KEY);
  return value == null ? null : Number(value);
}
