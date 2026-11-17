import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MouthDiagram } from "./MouthDiagram";
import { frameStyles, PronunciationFrame, Tip } from "./Frame";
import { neutralAttempt } from "./scoring";
import { colors, fonts } from "./theme";

/*
  Etapa 2 do Pronunciation Lab (Exercise35): ilustracao da boca, os passos em
  portugues e a dica (botao da lampada). Sem pergunta.

  activity: { stage, lessonTag, caption, steps: [texto], tip }
  Por enquanto a ilustracao e a do /θ/ (MouthDiagram).
*/
export function UnderstandExercise({ activity, next, onAttempt, userXp = 0, comboSession }) {
  const scrollRef = useRef(null);
  const [tip, setTip] = useState(false);
  const doneRef = useRef(false);

  const advance = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    neutralAttempt(onAttempt);
    next();
  };

  return (
    <PronunciationFrame
      ref={scrollRef}
      stage={activity.stage}
      lessonTag={activity.lessonTag}
      xp={userXp + (comboSession?.gained ?? 0)}
      onCta={advance}
      showTipButton={!!activity.tip}
      tipOn={tip}
      onTip={() => {
        setTip(!tip);
        if (!tip) setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
      }}
    >
      <View style={styles.figure}>
        <MouthDiagram />
        {activity.caption ? <Text style={styles.caption}>{activity.caption}</Text> : null}
      </View>
      <Text style={frameStyles.label}>PASSOS</Text>
      <View style={{ gap: 8 }}>
        {activity.steps.map((text, i) => (
          <View key={text} style={styles.step}>
            <Text style={styles.stepLabel}>PASSO {i + 1}</Text>
            <Text style={styles.stepText}>{text}</Text>
          </View>
        ))}
      </View>
      {tip ? <Tip text={activity.tip} /> : null}
    </PronunciationFrame>
  );
}

const styles = StyleSheet.create({
  figure: {
    marginTop: 12,
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "#131a2b",
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  caption: { marginTop: 6, textAlign: "center", fontFamily: fonts.semibold, fontSize: 12, color: "#7f8aad" },
  step: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  stepLabel: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 0.8, color: colors.blueSoft },
  stepText: { marginTop: 2, fontFamily: fonts.semibold, fontSize: 15, lineHeight: 21, color: colors.text },
});
