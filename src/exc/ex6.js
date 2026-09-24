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

const normalizeSentence = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .toLowerCase();

export function Exercise6({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;

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

  const shuffledOptions = useMemo(
    () => shuffleArray(activity.words),
    [activity.words],
  );
  const expectedOrder = activity.correctOrder || [];

  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selectedWords, setSelectedWords] = useState([]);
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const wrongMessage = activity.feedbackMessage || activity.successMessage;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    if (isCorrect || isWrong) {
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
  }, [isCorrect, isWrong, alertOpacity, alertTranslateY]);

  const triggerWrongFeedback = () => {
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
    ]).start();
  };

  const handleWordPress = (word) => {
    const selectedCount = selectedWords.filter((item) => item === word).length;
    const availableCount = activity.words.filter((item) => item === word).length;

    if (isCorrect || isWrong || selectedCount >= availableCount) return;

    const nextWords = [...selectedWords, word];
    setSelectedWords(nextWords);

    if (nextWords.length === (expectedOrder.length || activity.words.length)) {
      const isAnswerCorrect = expectedOrder.length
        ? nextWords.every(
            (selectedWord, index) => selectedWord === expectedOrder[index],
          )
        : normalizeSentence(nextWords.join(" ")) ===
          normalizeSentence(activity.correctAnswer);

      if (isAnswerCorrect) {
        onAttempt?.({ isCorrect: true });
        setResult("correct");
        return;
      }

      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
    }
  };

  const handleSelectedWordPress = (wordIndex) => {
    if (isCorrect || isWrong) return;
    setSelectedWords((current) =>
      current.filter((_, index) => index !== wordIndex),
    );
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.orderSentenceBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <Animated.View
          style={[
            styles.orderSentenceAnswerBox,
            isCorrect && styles.orderSentenceAnswerBoxCorrect,
            isWrong && styles.orderSentenceAnswerBoxWrong,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          {selectedWords.length === 0 ? (
            <Text style={styles.orderSentencePlaceholder}>_____</Text>
          ) : (
            selectedWords.map((word, index) => (
              <TouchableOpacity
                key={`selected-${word}-${index}`}
                style={[
                  styles.orderSentenceSelectedWord,
                  isCorrect && styles.orderSentenceSelectedWordCorrect,
                ]}
                onPress={() => handleSelectedWordPress(index)}
                disabled={isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.orderSentenceSelectedWordText,
                    isCorrect && styles.orderSentenceSelectedWordTextCorrect,
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <View style={styles.orderSentenceOptionsRow}>
          {shuffledOptions.map((word, index) => {
            const selectedCount = selectedWords.filter(
              (item) => item === word,
            ).length;
            const occurrenceIndex = shuffledOptions
              .slice(0, index + 1)
              .filter((item) => item === word).length;
            const used = selectedCount >= occurrenceIndex;

            return (
              <TouchableOpacity
                key={`${word}-${index}`}
                style={[
                  styles.orderSentenceOption,
                  used && styles.orderSentenceOptionUsed,
                ]}
                onPress={() => handleWordPress(word)}
                disabled={used || isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.orderSentenceOptionText,
                    used && styles.orderSentenceOptionTextUsed,
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {(isCorrect || isWrong) && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              isCorrect
                ? styles.resultAlertCardCorrect
                : styles.resultAlertCardWrong,
              styles.slide7SuccessAlertCard,
              { paddingBottom: bottomSafeSpace + 1 },
              {
                opacity: alertOpacity,
                transform: [{ translateY: alertTranslateY }],
              },
            ]}
          >
            <View style={styles.successHeaderRow}>
              <View
                style={[
                  styles.successIconWrap,
                  isWrong && styles.resultAlertIconWrapWrong,
                ]}
              >
                <Text
                  style={[
                    styles.successIcon,
                    isWrong && styles.resultAlertIconWrong,
                  ]}
                >
                  {isWrong ? "X" : "✓"}
                </Text>
              </View>
              <Text
                style={[
                  styles.successAlertTitle,
                  isWrong && styles.resultAlertTitleWrong,
                ]}
              >
                {isWrong
                  ? activity.errorTitle || "Incorreto"
                  : activity.successTitle || "Correto"}
              </Text>
            </View>

            <View
              style={[
                styles.feedbackBox,
                isWrong ? styles.feedbackBoxWrong : styles.feedbackBoxCorrect,
                styles.alertFeedbackBox,
              ]}
            >
              <Text
                style={[
                  styles.feedbackTitle,
                  isWrong
                    ? styles.feedbackTitleWrong
                    : styles.feedbackTitleCorrect,
                ]}
              >
                {isWrong ? "X Tente novamente" : "✓ Muito bem!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {isWrong ? wrongMessage : activity.successMessage}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.alertContinueButton,
                isWrong && styles.resultAlertButtonWrong,
              ]}
              onPress={next}
            >
              <Text style={styles.alertContinueButtonText}>
                Próxima atividade
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex6 = (CORES) =>
  StyleSheet.create({
    orderSentenceBlock: {
      width: "100%",
      alignItems: "center",
    },
    orderSentenceAnswerBox: {
      width: "88%",
      minHeight: 54,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 8,
      gap: 6,
      marginBottom: 14,
    },
    orderSentenceAnswerBoxCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    orderSentenceAnswerBoxWrong: {
      borderColor: CORES.DANGER,
    },
    orderSentencePlaceholder: {
      color: CORES.PRIMARY,
      fontSize: 14,
    },
    orderSentenceSelectedWord: {
      minHeight: 26,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 3,
    },
    orderSentenceSelectedWordCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    orderSentenceSelectedWordText: {
      color: CORES.PRIMARY,
      fontSize: 13,
    },
    orderSentenceSelectedWordTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    orderSentenceOptionsRow: {
      width: "88%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
    },
    orderSentenceOption: {
      minHeight: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.BACKGROUND,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    orderSentenceOptionUsed: {
      backgroundColor: CORES.SURFACE_MUTED,
      borderColor: CORES.BORDER_LIGHT,
    },
    orderSentenceOptionText: {
      color: CORES.PRIMARY,
      fontSize: 13,
      textDecorationLine: "underline",
    },
    orderSentenceOptionTextUsed: {
      color: CORES.EX_BLUE_LIGHT,
      textDecorationLine: "none",
    },
    slide7SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex6;

/*

  {
    component: Exercise6,
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["Hello", "name's", "my", "Laura"],
      correctOrder: ["Hello", "my", "name's", "Laura"],
      successTitle: "Correto",
      successMessage: `A frase correta e "Hello my name's Laura."`,
    },
  },

*/
