import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import * as Speech from "expo-speech";
import { PersonIcon, SpeakerIcon } from "./icons";
import { colors, fonts } from "./theme";
import { ChunkyButton, OptionButton, Title, WordChip } from "./ui";

function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- 1 · Apresenta a expressao ---------- */

export function LearnStep({ expression, onNext }) {
  const { width } = useWindowDimensions();
  const imageW = Math.min(width - 48, 420);

  const listen = () => {
    Speech.stop();
    Speech.speak(expression.phrase, { language: "en-US", rate: 0.9 });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={learn.center}>
        {expression.image ? (
          <Image
            source={expression.image}
            style={[
              learn.image,
              { width: imageW, height: Math.round((imageW * 210) / 342) },
            ]}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : null}
        <View style={{ alignItems: "center", gap: 12 }}>
          <Text style={learn.phrase} accessibilityRole="header">
            {expression.phrase}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ouvir pronúncia"
            onPress={listen}
            style={({ pressed }) => [learn.listen, pressed && { opacity: 0.7 }]}
          >
            <SpeakerIcon />
            <Text style={learn.listenText}>Listen</Text>
          </Pressable>
        </View>
        <Text style={learn.meaning}>{expression.meaning}</Text>
      </View>
      <ChunkyButton label="GOT IT" onPress={onNext} />
    </View>
  );
}

/* ---------- 2 · O que significa ---------- */

// `answered` e o indice (na ordem embaralhada) escolhido, depois de responder;
// `xpBadge` aparece na alternativa certa quando o aluno acerta.
export function MeaningStep({ expression, answered, xpBadge, onAnswer }) {
  const options = useMemo(
    () => shuffle(expression.meaningCheck.options),
    [expression],
  );

  const stateFor = (i) => {
    if (answered === null) return "idle";
    if (options[i].correct) return "correct";
    if (i === answered) return "wrong";
    return "dimmed";
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 36 }}>
        <Title>
          What does{" "}
          <Text style={{ color: colors.blueText }}>
            {expression.phrase.toLowerCase()}
          </Text>{" "}
          mean?
        </Title>
      </View>
      <View style={{ marginTop: 28, gap: 14 }}>
        {options.map((o, i) => (
          <OptionButton
            key={o.text}
            label={o.text}
            state={stateFor(i)}
            badge={answered === i && o.correct ? xpBadge : undefined}
            disabled={answered !== null}
            onPress={() => onAnswer(!!o.correct, i)}
          />
        ))}
      </View>
    </View>
  );
}

/* ---------- 3 · Completar a frase ---------- */

export function FillStep({ expression, checked, onCheck }) {
  const answer = expression.phrase.toLowerCase();
  const words = useMemo(
    () => shuffle([answer, ...expression.fillBlank.distractors]),
    [expression, answer],
  );
  const [picked, setPicked] = useState(null);

  const blankStyle =
    checked && picked
      ? picked === answer
        ? { bg: colors.greenSoft, text: colors.greenDark, line: colors.green }
        : { bg: colors.redSoft, text: colors.redDark, line: colors.red }
      : { bg: colors.blueSoft, text: colors.blueText, line: colors.blue };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 36 }}>
        <Title>Fill in the blank</Title>
      </View>

      <View style={fill.row}>
        <View style={fill.avatar}>
          <PersonIcon />
        </View>
        <View style={fill.bubble}>
          <View style={fill.sentence}>
            {expression.fillBlank.before.split(" ").map((w, i) => (
              <Text key={i} style={fill.word}>
                {w}{" "}
              </Text>
            ))}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={picked ? `Remover ${picked}` : "Espaço vazio"}
              disabled={!picked || checked}
              onPress={() => setPicked(null)}
              style={[
                fill.blank,
                picked
                  ? {
                      backgroundColor: blankStyle.bg,
                      borderBottomColor: blankStyle.line,
                    }
                  : {
                      backgroundColor: "transparent",
                      borderBottomColor: colors.chipDashed,
                      minWidth: 110,
                    },
              ]}
            >
              <Text style={[fill.blankText, { color: blankStyle.text }]}>
                {picked ?? " "}
              </Text>
            </Pressable>
            <Text style={fill.word}>{expression.fillBlank.after}</Text>
          </View>
        </View>
      </View>

      <View style={fill.chips}>
        {words.map((w) => (
          <WordChip
            key={w}
            label={w}
            used={picked === w}
            disabled={checked}
            onPress={() => setPicked(w)}
          />
        ))}
      </View>

      <View style={{ flex: 1 }} />
      <ChunkyButton
        label="CHECK"
        disabled={!picked || checked}
        onPress={() => onCheck(picked === answer)}
      />
    </View>
  );
}

const learn = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 22 },
  image: { borderRadius: 28 },
  phrase: {
    fontFamily: fonts.extrabold,
    fontSize: 38,
    lineHeight: 42,
    color: colors.text,
    textAlign: "center",
  },
  listen: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 99,
    backgroundColor: colors.blueSoft,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listenText: { fontFamily: fonts.bold, fontSize: 15, color: colors.blueText },
  meaning: {
    maxWidth: 300,
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 27,
    color: "#475066",
    textAlign: "center",
  },
});

const fill = StyleSheet.create({
  row: { marginTop: 28, flexDirection: "row", gap: 12, alignItems: "flex-start" },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.peach,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  sentence: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", rowGap: 4 },
  word: { fontFamily: fonts.semibold, fontSize: 19, lineHeight: 32, color: colors.text },
  blank: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderBottomWidth: 3,
    minHeight: 32,
    justifyContent: "center",
  },
  blankText: { fontFamily: fonts.extrabold, fontSize: 19 },
  chips: { marginTop: 28, flexDirection: "row", flexWrap: "wrap", gap: 12 },
});
