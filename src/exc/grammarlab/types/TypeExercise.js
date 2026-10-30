import React from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import { useShake } from "../anim";
import { blankStyles, ExerciseHeader } from "../ExerciseHeader";
import { KeyboardIcon } from "../icons";
import { colors, fonts } from "../theme";

// Ignora maiusculas e espacos sobrando ao comparar o que foi digitado.
export function normalizeAnswer(text) {
  return String(text || "").trim().toLowerCase().replace(/\s+/g, " ");
}

// Digitar a resposta (Exercise27): digita a palavra que falta e confere no
// Check ou no "done" do teclado. item: before, after, answer.
export function TypeExercise({ item, instruction, typed, checked, correct, onChange, onSubmit }) {
  const shake = useShake(checked && !correct);
  const clean = normalizeAnswer(typed);
  const blank = checked ? item.answer : clean || "___";
  const blankStyle = checked ? blankStyles.done : clean ? blankStyles.typing : blankStyles.empty;
  const border = checked ? (correct ? colors.green : colors.orange) : clean ? colors.accent : "#2f3854";
  const background = checked ? (correct ? "#0f2a20" : colors.wrongOptionBg) : colors.card;

  return (
    <View>
      <ExerciseHeader
        icon={<KeyboardIcon color={colors.accentSoft} />}
        kicker="TYPE THE ANSWER"
        title={
          <>
            {item.before}
            <Text style={blankStyle}>{blank}</Text>
            {item.after}
          </>
        }
        subtitle={item.instruction || instruction || "Type the missing word."}
      />
      <Animated.View style={{ transform: [{ translateX: shake }] }}>
        <TextInput
          value={typed}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          editable={!checked}
          placeholder="Type here…"
          placeholderTextColor="#4a5475"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          returnKeyType="done"
          accessibilityLabel="Palavra que falta"
          style={[styles.input, { borderColor: border, backgroundColor: background }]}
        />
      </Animated.View>
      <Text style={styles.help}>Toque em Check ou em “done” no teclado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    marginTop: 22,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  help: { marginTop: 10, fontFamily: fonts.semibold, fontSize: 13, color: colors.textMuted },
});
