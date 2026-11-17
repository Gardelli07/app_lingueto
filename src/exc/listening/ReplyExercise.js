import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ExerciseHeader } from "../grammarlab/ExerciseHeader";
import { ChatLinesIcon, SpeakerIcon } from "../grammarlab/icons";
import { colors, fonts } from "../grammarlab/theme";
import { OptionList } from "../grammarlab/types/ChoiceExercise";
import { WaveBar } from "../grammarlab/types/ListenExercise";

const LINE_BARS = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.95, 0.65, 0.4, 0.8, 0.55, 0.9, 0.6, 0.35, 0.7, 0.45];

const quoted = (option) => `“${option}”`;

// Completar a conversa (Exercise30): a fala do amigo toca como audio e o balao
// do aluno recebe a resposta escolhida. item: say, friend, options, correctAnswer.
export function ReplyExercise({ item, instruction, picked, checked, correct, speaking, onSpeak, onPick }) {
  const replyLook = !checked
    ? { bg: "transparent", border: "#3a4470", fg: colors.textMuted, style: "dashed" }
    : correct
      ? { bg: "#0f2a20", border: colors.green, fg: colors.greenBright, style: "solid" }
      : { bg: colors.wrongOptionBg, border: colors.orange, fg: "#ffb39b", style: "solid" };

  return (
    <View>
      <ExerciseHeader
        icon={<ChatLinesIcon color={colors.accentSoft} />}
        kicker="COMPLETE THE CONVERSATION"
        title={item.title || "What comes next?"}
        subtitle={item.instruction || instruction || "Listen to your friend and pick the best reply."}
      />

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.avatar, { backgroundColor: colors.badge }]}>
            <Text style={[styles.avatarText, { color: colors.accentSoft }]}>
              {item.friend.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={styles.name}>{item.friend}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ouvir a fala"
                onPress={() => onSpeak(false)}
                style={[styles.friendBubble, speaking && styles.bubbleOn]}
              >
                <View style={styles.miniSpeaker}>
                  <SpeakerIcon size={16} color={colors.text} />
                </View>
                {checked ? (
                  <Text style={styles.lineText}>{item.say}</Text>
                ) : (
                  <View
                    style={styles.bars}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                  >
                    {LINE_BARS.map((height, index) => (
                      <WaveBar
                        key={index}
                        height={height}
                        index={index}
                        active={speaking}
                        max={22}
                        flex={false}
                      />
                    ))}
                  </View>
                )}
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ouvir devagar"
                onPress={() => onSpeak(true)}
                style={styles.slow}
              >
                <Text style={styles.slowText}>0.5×</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.row, { flexDirection: "row-reverse" }]}>
          <View style={[styles.avatar, { backgroundColor: colors.amberDeepBg }]}>
            <Text style={[styles.avatarText, { color: colors.amberText }]}>Y</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", gap: 4 }}>
            <Text style={styles.name}>You</Text>
            <View
              style={[
                styles.replyBubble,
                {
                  backgroundColor: replyLook.bg,
                  borderColor: replyLook.border,
                  borderStyle: replyLook.style,
                },
              ]}
            >
              <Text style={[styles.replyText, { color: replyLook.fg }]}>
                {checked && picked ? picked : "Your reply…"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <OptionList
          options={item.options}
          answer={item.correctAnswer}
          picked={picked}
          checked={checked}
          onPick={onPick}
          format={quoted}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 14,
    gap: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  avatar: { width: 32, height: 32, borderRadius: 99, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: fonts.extrabold, fontSize: 13 },
  name: { fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted },
  friendBubble: {
    flex: 1,
    minHeight: 52,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    backgroundColor: colors.raised,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bubbleOn: { borderColor: colors.accent, backgroundColor: colors.selectedBg },
  miniSpeaker: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  bars: { flex: 1, height: 24, flexDirection: "row", alignItems: "center", gap: 3, overflow: "hidden" },
  lineText: { flex: 1, fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20, color: colors.text },
  slow: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.badge,
    borderWidth: 1,
    borderColor: "#2f3854",
    alignItems: "center",
    justifyContent: "center",
  },
  slowText: { fontFamily: fonts.extrabold, fontSize: 12, color: colors.textSoft },
  replyBubble: {
    minHeight: 48,
    maxWidth: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderTopRightRadius: 4,
    borderWidth: 1.5,
  },
  replyText: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20 },
});
