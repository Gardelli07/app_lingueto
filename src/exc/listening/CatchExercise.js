import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useBump, useShake } from "../grammarlab/anim";
import { ExerciseHeader } from "../grammarlab/ExerciseHeader";
import { CheckIcon, SearchIcon, XIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { optionState } from "../grammarlab/types/ChoiceExercise";
import { Player } from "../grammarlab/types/ListenExercise";

const LOOK = {
  idle: { bg: colors.card, border: colors.cardBorder, fg: colors.text, shadow: "0 3px 0 #232a40" },
  dim: { bg: colors.card, border: colors.cardBorder, fg: colors.text, shadow: "none" },
  ok: { bg: "#0f2a20", border: colors.green, fg: colors.greenBright, shadow: "none" },
  bad: { bg: colors.wrongOptionBg, border: colors.orange, fg: "#ffb39b", shadow: "none" },
};

// Pegar a palavra (Exercise29): ouve a frase e toca na palavra que ouviu; a
// transcricao aparece depois. item: say, transcript (`**palavra**` destaca),
// options, correctAnswer.
export function CatchExercise({ item, instruction, picked, checked, speaking, onSpeak, onPick }) {
  return (
    <View>
      <ExerciseHeader
        icon={<SearchIcon color={colors.accentSoft} />}
        kicker="CATCH THE WORDS"
        title={item.title || "What word did you hear?"}
        subtitle={item.instruction || instruction || "Listen to the sentence and catch the word."}
      />
      <Player speaking={speaking} onSpeak={onSpeak} />

      <View style={styles.grid}>
        {item.options.map((word) => (
          <WordTile
            key={word}
            text={word}
            state={optionState(word, item.correctAnswer, picked, checked)}
            disabled={checked}
            onPress={() => onPick(word)}
          />
        ))}
      </View>

      {checked && (
        <View style={styles.transcript}>
          <Text style={styles.transcriptLabel}>TRANSCRIPT</Text>
          <Text style={styles.transcriptText}>
            {item.transcript.split("**").map((part, index) => (
              <Text key={index} style={index % 2 === 1 ? styles.target : undefined}>
                {part}
              </Text>
            ))}
          </Text>
        </View>
      )}
    </View>
  );
}

function WordTile({ text, state, disabled, onPress }) {
  const shake = useShake(state === "bad");
  const bump = useBump(state === "ok");
  const look = LOOK[state];
  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: state === "dim" ? 0.5 : 1,
        transform: [{ translateX: shake }, { scale: bump }],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={text}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.tile,
          {
            backgroundColor: pressed && state === "idle" ? colors.selectedBg : look.bg,
            borderColor: look.border,
            boxShadow: look.shadow,
          },
        ]}
      >
        <Text style={[styles.tileText, { color: look.fg }]} numberOfLines={1} adjustsFontSizeToFit>
          {text}
        </Text>
        {state === "ok" && (
          <View style={[styles.mark, { backgroundColor: colors.green }]}>
            <CheckIcon size={12} color={colors.greenInk} strokeWidth={3.4} />
          </View>
        )}
        {state === "bad" && (
          <View style={[styles.mark, { backgroundColor: colors.orange }]}>
            <XIcon size={11} color={colors.orangeInk} strokeWidth={3.4} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", gap: 10, marginTop: 18 },
  tile: {
    height: 84,
    paddingHorizontal: 8,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  tileText: { fontFamily: fonts.extrabold, fontSize: 22 },
  mark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  transcript: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  transcriptLabel: {
    fontFamily: fonts.extrabold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  transcriptText: {
    marginTop: 4,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textSoft,
  },
  target: { fontFamily: fonts.extrabold, color: colors.greenBright },
});
