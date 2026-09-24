import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";

export function Exercise7({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const idealMoveCount = activity.correctOrder?.length || 0;

  const shuffleArray = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[index],
      ];
    }
    return shuffled;
  };

  const sourceOptions = activity.options || activity.sentences || [];
  const shuffledOptions = useMemo(
    () => shuffleArray(sourceOptions),
    [sourceOptions],
  );

  const [selectedPhrases, setSelectedPhrases] = useState([]);
  const [result, setResult] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const isCorrect = result === "correct";

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    if (isCorrect) {
      alertTranslateY.setValue(64);
      alertOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(alertTranslateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(alertOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    alertTranslateY.setValue(64);
    alertOpacity.setValue(0);
  }, [isCorrect, alertOpacity, alertTranslateY]);

  const triggerWrongFeedback = (lastValidPhrases = []) => {
    setResult("wrong");
    Vibration.vibrate(140);
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 480,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      // Preserve the phrases that were already correct and only discard
      // the invalid choice that caused the mismatch.
      setSelectedPhrases(lastValidPhrases);
      setResult(null);
      blinkAnim.setValue(0);
    });
  };

  const handleOptionPress = (phrase) => {
    if (isCorrect || selectedPhrases.includes(phrase)) return;

    const nextPhrases = [...selectedPhrases, phrase];
    setSelectedPhrases(nextPhrases);

    const isPrefixCorrect = nextPhrases.every(
      (selectedPhrase, index) =>
        selectedPhrase === activity.correctOrder[index],
    );

    if (!isPrefixCorrect) {
      setWrongAttempts((current) => current + 1);
      onAttempt?.({ isCorrect: false, totalDelta: 1 });
      triggerWrongFeedback(selectedPhrases);
      return;
    }

    if (nextPhrases.length === activity.correctOrder.length) {
      const totalMoves = idealMoveCount + wrongAttempts;
      const exerciseAccuracy = totalMoves
        ? Math.round((idealMoveCount / totalMoves) * 100)
        : 100;

      onAttempt?.({
        isCorrect: true,
        correctDelta: idealMoveCount,
        totalDelta: idealMoveCount,
        exerciseAccuracy,
      });
      setResult("correct");
    }
  };

  const handleSelectedPhrasePress = (phrase) => {
    if (isCorrect) return;
    setSelectedPhrases((current) =>
      current.filter((currentPhrase) => currentPhrase !== phrase),
    );
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.dialogOrderBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <Animated.View
          style={[
            styles.dialogOrderAnswerBox,
            isCorrect && styles.dialogOrderAnswerBoxCorrect,
            result === "wrong" && styles.dialogOrderAnswerBoxWrong,
            result === "wrong" && { backgroundColor: wrongBackground },
            result === "wrong" && {
              transform: [{ translateX: shakeTranslateX }],
            },
          ]}
        >
          {selectedPhrases.length === 0 ? (
            <Text style={styles.dialogOrderPlaceholder}>_____</Text>
          ) : (
            selectedPhrases.map((phrase, index) => (
              <TouchableOpacity
                key={`${phrase}-${index}`}
                style={[
                  styles.dialogOrderSelectedPhrase,
                  isCorrect && styles.dialogOrderSelectedPhraseCorrect,
                ]}
                onPress={() => handleSelectedPhrasePress(phrase)}
                disabled={isCorrect}
              >
                <Text
                  style={[
                    styles.dialogOrderSelectedPhraseText,
                    isCorrect && styles.dialogOrderSelectedPhraseTextCorrect,
                  ]}
                >
                  {phrase}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <View style={styles.dialogOrderOptionsList}>
          {shuffledOptions.map((phrase) => {
            const used = selectedPhrases.includes(phrase);

            return (
              <TouchableOpacity
                key={phrase}
                style={[
                  styles.dialogOrderOption,
                  used && styles.dialogOrderOptionUsed,
                ]}
                onPress={() => handleOptionPress(phrase)}
                disabled={used || isCorrect}
              >
                <Text
                  style={[
                    styles.dialogOrderOptionText,
                    used && styles.dialogOrderOptionTextUsed,
                  ]}
                >
                  {phrase}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
              styles.slide8SuccessAlertCard,
              { paddingBottom: bottomSafeSpace + 1 },
              {
                opacity: alertOpacity,
                transform: [{ translateY: alertTranslateY }],
              },
            ]}
          >
            <View style={styles.successHeaderRow}>
              <View style={styles.successIconWrap}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successAlertTitle}>
                {activity.successTitle || "Correto"}
              </Text>
            </View>

            <View
              style={[
                styles.feedbackBox,
                styles.feedbackBoxCorrect,
                styles.alertFeedbackBox,
              ]}
            >
              <Text style={[styles.feedbackTitle, styles.feedbackTitleCorrect]}>
                ✓ Muito bem!
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {activity.successMessage}
              </Text>
            </View>

            <TouchableOpacity style={styles.alertContinueButton} onPress={next}>
              <Text style={styles.alertContinueButtonText}>
                Próxima Atividade
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex7 = (CORES) =>
  StyleSheet.create({
    dialogOrderBlock: {
      width: "100%",
      alignItems: "center",
    },
    dialogOrderAnswerBox: {
      width: "88%",
      minHeight: 140,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 8,
      marginBottom: 10,
    },
    dialogOrderAnswerBoxCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    dialogOrderAnswerBoxWrong: {
      borderColor: CORES.DANGER,
    },
    dialogOrderPlaceholder: {
      color: CORES.PRIMARY,
      fontSize: 14,
    },
    dialogOrderSelectedPhrase: {
      minHeight: 30,
      alignSelf: "flex-start",
      borderRadius: 15,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    dialogOrderSelectedPhraseCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    dialogOrderSelectedPhraseText: {
      color: CORES.WHITE,
      fontSize: 13,
    },
    dialogOrderSelectedPhraseTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    dialogOrderOptionsList: {
      width: "88%",
      gap: 8,
    },
    dialogOrderOption: {
      width: "100%",
      minHeight: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    dialogOrderOptionUsed: {
      backgroundColor: CORES.SURFACE_MUTED,
      borderColor: CORES.BORDER_LIGHT,
    },
    dialogOrderOptionText: {
      color: CORES.WHITE,
      fontSize: 13,
      textAlign: "center",
    },
    dialogOrderOptionTextUsed: {
      color: CORES.EX_BLUE_LIGHT,
    },
    slide8SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex7;

/*

  {
    component: Exercise7,
    activity: {
      prompt: "Monte o diálogo na ordem certa",
      options: [
        "I wake up at 6am.",
        "then I have breakfast.",
        "I go to work.",
        "I have lunch at 12pm.",
      ],
      correctOrder: [
        "I wake up at 6am.",
        "then I have breakfast.",
        "I go to work.",
        "I have lunch at 12pm.",
      ],
      successTitle: "Correto",
      successMessage: "Você colocou o diálogo na ordem certa.",
    },
  },

*/
