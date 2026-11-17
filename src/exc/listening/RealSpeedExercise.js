import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ExerciseHeader } from "../grammarlab/ExerciseHeader";
import { BoltIcon, CheckIcon, GaugeIcon, SpeakerIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { OptionList } from "../grammarlab/types/ChoiceExercise";
import { WaveBar } from "../grammarlab/types/ListenExercise";

const BARS_NORMAL = [0.4, 0.7, 0.5, 0.9, 0.6, 0.35, 0.8, 0.55, 0.95, 0.45, 0.7, 0.4, 0.85, 0.6, 0.5, 0.75, 0.4, 0.3];
const BARS_REAL = [0.5, 0.8, 0.95, 0.7, 0.9, 1, 0.85, 0.6, 0.9, 0.75, 1, 0.8, 0.65, 0.9, 0.7, 0.85, 1, 0.6, 0.8, 0.7, 0.9, 0.55, 0.75, 0.5, 0.4, 0.3];

// Velocidade real (Exercise31): ouve a frase clara, depois como falam de verdade
// e toca no que ouviu. item: normal, real (grafia reduzida que a voz le, nunca
// aparece como alternativa), options, correctAnswer, reductions ([de, para]).
// Ao responder, o quadro "Na fala real" entra no lugar dos players: abaixo das
// alternativas ele ficaria atras do painel de feedback.
export function RealSpeedExercise({ item, instruction, picked, checked, playing, heardNormal, onPlay, onPick }) {
  return (
    <View>
      <ExerciseHeader
        icon={<GaugeIcon color={colors.amberText} />}
        kicker="REAL-SPEED ENGLISH"
        title={item.title || "Can you understand it at real speed?"}
        subtitle={
          item.instruction ||
          instruction ||
          "Hear it clearly first, then the way people really say it."
        }
      />

      {checked ? (
        <View style={styles.reduce}>
          <Text style={[styles.label, { color: colors.amberText }]}>NA FALA REAL</Text>
          {item.reductions.map(([from, to]) => (
            <Text key={from} style={styles.reduceText}>
              {from} → soa como <Text style={styles.reduceStrong}>“{to}”</Text>
            </Text>
          ))}
        </View>
      ) : (
        <View style={{ gap: 10, marginTop: 16 }}>
          <View style={[styles.step, playing === "normal" && { borderColor: colors.accent }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ouvir em velocidade normal"
              onPress={() => onPlay("normal")}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: colors.accent, boxShadow: "0 4px 0 #4552c4" },
                pressed && { transform: [{ translateY: 3 }], boxShadow: "none" },
              ]}
            >
              <SpeakerIcon size={24} color={colors.text} />
            </Pressable>
            <View style={{ flex: 1, gap: 6 }}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: colors.accentSoft }]}>1 · NORMAL</Text>
                {heardNormal && <CheckIcon size={14} color={colors.greenBright} strokeWidth={3} />}
              </View>
              <View
                style={styles.bars}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                {BARS_NORMAL.map((height, index) => (
                  <WaveBar
                    key={index}
                    height={height}
                    index={index}
                    active={playing === "normal"}
                    max={22}
                    flex={false}
                  />
                ))}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.step,
              heardNormal && { backgroundColor: "#1d1a14", borderColor: colors.amberDeepBorder },
              playing === "real" && { borderColor: colors.amber },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ouvir na velocidade real"
              onPress={() => onPlay("real")}
              style={({ pressed }) => [
                styles.btn,
                { backgroundColor: colors.amber, boxShadow: "0 4px 0 #b37a10" },
                pressed && { transform: [{ translateY: 3 }], boxShadow: "none" },
              ]}
            >
              <BoltIcon size={24} color={colors.amberInk} />
            </Pressable>
            <View style={{ flex: 1, gap: 6 }}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: colors.amberText }]}>2 · REAL SPEED</Text>
                <Text style={styles.note} numberOfLines={1}>
                  {heardNormal ? "Agora ouça como falam de verdade" : "Ouça a versão normal primeiro"}
                </Text>
              </View>
              <View
                style={[styles.bars, { gap: 2 }]}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                {BARS_REAL.map((height, index) => (
                  <WaveBar
                    key={index}
                    height={height}
                    index={index}
                    active={playing === "real"}
                    max={22}
                    width={2}
                    flex={false}
                    color={colors.amber}
                    idle={heardNormal ? colors.amberDeepBorder : "#3a4470"}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      <Text style={styles.question}>WHAT DID YOU HEAR?</Text>
      <OptionList
        options={item.options}
        answer={item.correctAnswer}
        picked={picked}
        checked={checked}
        onPick={onPick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
  },
  btn: { width: 52, height: 52, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 1 },
  note: { flex: 1, fontFamily: fonts.semibold, fontSize: 11, color: colors.textMuted },
  bars: { height: 24, flexDirection: "row", alignItems: "center", gap: 3, overflow: "hidden" },
  question: {
    marginTop: 18,
    marginBottom: 10,
    fontFamily: fonts.extrabold,
    fontSize: 13,
    letterSpacing: 1,
    color: colors.accentSoft,
  },
  reduce: {
    marginTop: 14,
    padding: 14,
    gap: 6,
    borderRadius: 14,
    backgroundColor: colors.amberSoftBg,
    borderWidth: 1,
    borderColor: colors.amberDeepBorder,
  },
  reduceText: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.text },
  reduceStrong: { fontFamily: fonts.extrabold, color: colors.amberText },
});
