import React from "react";
import { Text, View } from "react-native";
import { blankStyles, ExerciseHeader } from "../ExerciseHeader";
import { OptionButton } from "../OptionButton";
import { PencilIcon } from "../icons";
import { colors } from "../theme";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function optionState(option, answer, picked, checked) {
  if (!checked) return "idle";
  if (option === answer) return "ok";
  if (option === picked) return "bad";
  return "dim";
}

// Alternativas A/B/C: tocar ja responde. Usada tambem pelo "ouvir".
export function OptionList({ options, answer, picked, checked, onPick }) {
  return (
    <View style={{ gap: 12 }} accessibilityRole="radiogroup">
      {options.map((option, index) => (
        <OptionButton
          key={option}
          letter={LETTERS[index]}
          text={option}
          state={optionState(option, answer, picked, checked)}
          disabled={checked}
          onPress={() => onPick(option)}
        />
      ))}
    </View>
  );
}

// Completar a lacuna (Exercise22). item: before, after, options, correctAnswer.
export function ChoiceExercise({ item, instruction, picked, checked, onPick }) {
  return (
    <View>
      <ExerciseHeader
        icon={<PencilIcon color={colors.accentSoft} />}
        kicker="FILL IN THE BLANK"
        title={
          <>
            {item.before}
            <Text style={checked ? blankStyles.done : blankStyles.empty}>
              {checked ? item.correctAnswer : "___"}
            </Text>
            {item.after}
          </>
        }
        subtitle={item.instruction || instruction || "Choose the correct answer."}
      />
      <View style={{ marginTop: 22 }}>
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
