import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useBump, useShake } from "../anim";
import { ExerciseHeader } from "../ExerciseHeader";
import { LinkIcon } from "../icons";
import { colors, fonts } from "../theme";

// Ligar os pares (Exercise26): toca numa frase em ingles e depois na
// traducao. Um par errado encerra o exercicio. item: pairs ([ingles,
// portugues]) e rightOrder (ordem em que a coluna da direita aparece).
// `selected` = { side: "l" | "r", idx } e `bad` = { l, r }.
export function MatchExercise({ item, instruction, matched, selected, bad, checked, correct, onPick }) {
  const tile = (side, pairIndex, text) => {
    const isMatched = matched.includes(pairIndex) || (checked && correct);
    const isSelected = !!selected && selected.side === side && selected.idx === pairIndex;
    const isBad = !!bad && (side === "l" ? bad.l === pairIndex : bad.r === pairIndex);
    const state = isBad
      ? "bad"
      : isMatched
        ? "matched"
        : isSelected
          ? "selected"
          : checked
            ? "dim"
            : "idle";
    return (
      <Tile
        key={`${side}${pairIndex}`}
        text={text}
        state={state}
        disabled={checked || isMatched}
        onPress={() => onPick(side, pairIndex)}
      />
    );
  };

  const rightOrder = item.rightOrder || item.pairs.map((_, index) => index);

  return (
    <View>
      <ExerciseHeader
        icon={<LinkIcon color={colors.accentSoft} />}
        kicker="MATCH THE PAIRS"
        title={item.title || "Match the pairs"}
        subtitle={
          item.instruction || instruction || "Tap an English phrase, then its translation."
        }
      />
      <View style={styles.grid}>
        <View style={styles.col}>{item.pairs.map(([english], index) => tile("l", index, english))}</View>
        <View style={styles.col}>
          {rightOrder.map((pairIndex) => tile("r", pairIndex, item.pairs[pairIndex][1]))}
        </View>
      </View>
    </View>
  );
}

const LOOK = {
  idle: { bg: colors.card, border: colors.cardBorder, fg: colors.text, shadow: "0 3px 0 #232a40" },
  selected: {
    bg: colors.selectedBg,
    border: colors.accent,
    fg: colors.text,
    shadow: "0 0 0 3px rgba(109,124,255,0.25)",
  },
  matched: { bg: "#0f2a20", border: colors.greenBorder, fg: colors.greenBright, shadow: "none" },
  bad: { bg: colors.wrongOptionBg, border: colors.orange, fg: "#ffb39b", shadow: "none" },
  dim: { bg: colors.card, border: colors.cardBorder, fg: colors.text, shadow: "none" },
};

function Tile({ text, state, disabled, onPress }) {
  const shake = useShake(state === "bad");
  const bump = useBump(state === "matched");
  const look = LOOK[state];
  return (
    <Animated.View
      style={{
        opacity: state === "dim" ? 0.5 : 1,
        transform: [{ translateX: shake }, { scale: bump }],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={text}
        accessibilityState={{ selected: state === "selected", disabled }}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.tile,
          { backgroundColor: look.bg, borderColor: look.border, boxShadow: look.shadow },
        ]}
      >
        <Text style={[styles.tileText, { color: look.fg }]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", gap: 10, marginTop: 22 },
  col: { flex: 1, gap: 10 },
  tile: {
    minHeight: 56,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  tileText: { fontFamily: fonts.bold, fontSize: 16, textAlign: "center" },
});
