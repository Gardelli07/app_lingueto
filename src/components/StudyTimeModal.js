import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme, useThemedStyles } from "../theme";

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

// Pop-up reutilizado tanto no primeiro acesso a Home (definir o lembrete
// pela primeira vez) quanto no Perfil (trocar o horario ja configurado).
// O horario aceita qualquer combinacao de hora/minuto (ex.: 22:11), por
// isso os campos sao dois inputs de texto livres em vez de uma lista fixa.
export default function StudyTimeModal({
  visible,
  initialHour = 20,
  initialMinute = 0,
  title = "Vamos definir um horário para seus estudos",
  description = "Escolha o melhor horário do dia para receber um lembrete e manter sua sequência.",
  confirmLabel = "Ativar lembrete",
  cancelLabel = "Agora não",
  onConfirm,
  onCancel,
}) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [hourText, setHourText] = useState(pad(initialHour));
  const [minuteText, setMinuteText] = useState(pad(initialMinute));
  const minuteRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setHourText(pad(initialHour));
      setMinuteText(pad(initialMinute));
    }
  }, [visible, initialHour, initialMinute]);

  const handleHourChange = (text) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 2);
    setHourText(digits);
    if (digits.length === 2) minuteRef.current?.focus();
  };

  const handleMinuteChange = (text) => {
    setMinuteText(text.replace(/[^0-9]/g, "").slice(0, 2));
  };

  const handleConfirm = () => {
    const hour = clamp(parseInt(hourText, 10), 0, 23);
    const minute = clamp(parseInt(minuteText, 10), 0, 59);
    onConfirm?.(hour, minute);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.emoji}>⏰</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.timeRow}>
            <TextInput
              value={hourText}
              onChangeText={handleHourChange}
              onBlur={() => setHourText((v) => pad(clamp(parseInt(v, 10) || 0, 0, 23)))}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.timeInput}
              placeholderTextColor={CORES.PROFILE_MUTED_LIGHT}
              selectTextOnFocus
              placeholder="20"
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              ref={minuteRef}
              value={minuteText}
              onChangeText={handleMinuteChange}
              onBlur={() => setMinuteText((v) => pad(clamp(parseInt(v, 10) || 0, 0, 59)))}
              keyboardType="number-pad"
              maxLength={2}
              style={styles.timeInput}
              placeholderTextColor={CORES.PROFILE_MUTED_LIGHT}
              selectTextOnFocus
              placeholder="00"
            />
          </View>
          <Text style={styles.hint}>Ex.: 22:11 — qualquer horário serve.</Text>

          <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </Pressable>

          {!!onCancel && (
            <Pressable style={styles.cancelBtn} onPress={onCancel} hitSlop={8}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: CORES.OVERLAY,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },
    card: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: CORES.SURFACE_HIGH,
      borderRadius: 24,
      padding: 24,
      alignItems: "center",
      borderWidth: CORES.mode === "dark" ? 1 : 0,
      borderColor: CORES.BORDER,
    },
    emoji: { fontSize: 34, marginBottom: 6 },
    title: {
      fontSize: 19,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      textAlign: "center",
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      fontWeight: "600",
      color: CORES.PROFILE_MUTED,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    timeInput: {
      width: 64,
      height: 64,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: CORES.BORDER_STRONG,
      backgroundColor: CORES.INPUT_BG,
      textAlign: "center",
      fontSize: 26,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
    },
    colon: { fontSize: 26, fontWeight: "900", color: CORES.PROFILE_NAVY },
    hint: {
      fontSize: 12,
      fontWeight: "600",
      color: CORES.PROFILE_MUTED_LIGHT,
      marginBottom: 20,
    },
    confirmBtn: {
      width: "100%",
      height: 52,
      borderRadius: 14,
      backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center",
      justifyContent: "center",
    },
    confirmText: { color: CORES.ON_ACCENT, fontWeight: "900", fontSize: 16 },
    cancelBtn: { marginTop: 14, padding: 4 },
    cancelText: { color: CORES.PROFILE_MUTED_LIGHT, fontWeight: "700", fontSize: 14 },
  });
