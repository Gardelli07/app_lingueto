import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useBump, usePopIn, useShake } from "../anim";
import { ExerciseHeader } from "../ExerciseHeader";
import { BlocksIcon } from "../icons";
import { colors, fonts } from "../theme";

// Montar a frase (Exercise24): traduz tocando nas palavras do banco (com
// distratoras) e confere no Check. item: prompt, answer (palavras na ordem),
// bank (todas as fichas). `built` sao os indices do banco ja colocados.
export function BuildExercise({ item, instruction, built, checked, correct, onAdd, onRemove }) {
  return (
    <View>
      <ExerciseHeader
        icon={<BlocksIcon color={colors.accentSoft} />}
        kicker="BUILD THE SENTENCE"
        title={item.prompt}
        subtitle={item.instruction || instruction || "Translate it using the words below."}
      />

      {/* Linhas da resposta */}
      <View style={styles.answerArea}>
        <View style={[styles.line, { top: 56 }]} />
        <View style={[styles.line, { top: 112 }]} />
        {built.length === 0 ? (
          <Text style={styles.placeholder}>Toque nas palavras abaixo</Text>
        ) : (
          built.map((bankIndex, position) => (
            <PlacedChip
              key={`${bankIndex}`}
              text={item.bank[bankIndex]}
              state={!checked ? "placed" : correct ? "ok" : "bad"}
              onPress={() => onRemove(position)}
              disabled={checked}
            />
          ))
        )}
      </View>

      {/* Banco de palavras */}
      <View style={styles.bank}>
        {item.bank.map((word, bankIndex) => {
          const used = built.includes(bankIndex);
          return (
            <Pressable
              key={bankIndex}
              accessibilityRole="button"
              accessibilityLabel={word}
              disabled={used || checked}
              onPress={() => onAdd(bankIndex)}
              style={({ pressed }) => [
                styles.chip,
                used ? styles.slot : styles.bankChip,
                checked && !used && { opacity: 0.5 },
                pressed && { transform: [{ translateY: 2 }], boxShadow: "none" },
              ]}
            >
              <Text style={[styles.chipText, used && { color: "transparent" }]}>{word}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function PlacedChip({ text, state, disabled, onPress }) {
  const pop = usePopIn();
  const shake = useShake(state === "bad");
  const bump = useBump(state === "ok");
  const look =
    state === "ok"
      ? { backgroundColor: "#0f2a20", borderColor: colors.green, color: colors.greenBright }
      : state === "bad"
        ? { backgroundColor: colors.wrongOptionBg, borderColor: colors.orange, color: "#ffb39b" }
        : { backgroundColor: colors.selectedBg, borderColor: colors.accent, color: colors.text };
  return (
    <Animated.View style={{ transform: [{ scale: pop }, { translateX: shake }, { scale: bump }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${text}`}
        disabled={disabled}
        onPress={onPress}
        style={[styles.chip, { backgroundColor: look.backgroundColor, borderColor: look.borderColor }]}
      >
        <Text style={[styles.chipText, { color: look.color }]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  answerArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    rowGap: 10,
    columnGap: 8,
    minHeight: 120,
    marginTop: 18,
    paddingVertical: 6,
  },
  line: { position: "absolute", left: 0, right: 0, height: 2, backgroundColor: colors.cardBorder },
  placeholder: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "#4a5475",
  },
  bank: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 10,
    columnGap: 8,
    marginTop: 22,
  },
  chip: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
  },
  bankChip: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    boxShadow: "0 3px 0 #232a40",
  },
  slot: { backgroundColor: colors.raised, borderColor: colors.raisedBorder, borderStyle: "dashed" },
  chipText: { fontFamily: fonts.bold, fontSize: 17, color: colors.text },
});
