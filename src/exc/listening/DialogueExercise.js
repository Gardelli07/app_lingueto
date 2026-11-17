import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExerciseHeader } from "../grammarlab/ExerciseHeader";
import { ChatIcon, PinIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { OptionList } from "../grammarlab/types/ChoiceExercise";
import { Player } from "../grammarlab/types/ListenExercise";

// Dialogo (Exercise28): a conversa a duas vozes toca como um audio so e o texto
// aparece depois de responder. item: question, lines ({ who, speaker, text }),
// options, correctAnswer; variant "situation" e a versao "onde eles estao?".
export function DialogueExercise({ item, instruction, picked, checked, speaking, onSpeak, onPick }) {
  const situation = item.variant === "situation";
  return (
    <View>
      <ExerciseHeader
        icon={
          situation ? (
            <PinIcon color={colors.accentSoft} />
          ) : (
            <ChatIcon color={colors.accentSoft} />
          )
        }
        kicker={situation ? "UNDERSTAND THE SITUATION" : "LISTEN TO THE DIALOGUE"}
        title={item.question}
        subtitle={
          item.instruction ||
          instruction ||
          (situation
            ? "Play the dialogue and use the clues."
            : "Play the conversation, then choose.")
        }
      />

      <Player speaking={speaking} onSpeak={onSpeak} label="Ouvir a conversa" />

      {checked && (
        <View style={styles.card}>
          {item.lines.map((line, index) => {
            const right = line.speaker === 1;
            return (
              <View key={index} style={[styles.row, right && { flexDirection: "row-reverse" }]}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: right ? colors.amberDeepBg : colors.badge },
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarText,
                      { color: right ? colors.amberText : colors.accentSoft },
                    ]}
                  >
                    {line.who.charAt(0)}
                  </Text>
                </View>
                <View style={styles.bubble}>
                  <Text style={styles.lineText}>
                    {line.who !== "A" && line.who !== "B" ? `${line.who}: ` : ""}
                    {line.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={{ marginTop: 16 }}>
        <OptionList
          options={item.options}
          answer={item.correctAnswer}
          picked={picked}
          checked={checked}
          onPick={onPick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 12,
    gap: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 32, height: 32, borderRadius: 99, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: fonts.extrabold, fontSize: 13 },
  bubble: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    backgroundColor: colors.raised,
    justifyContent: "center",
  },
  lineText: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20, color: colors.text },
});
