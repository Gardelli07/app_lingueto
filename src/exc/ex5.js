import React, { useEffect, useRef, useState } from "react";
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

export function Exercise5({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(null);
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

  const resetWrongState = () => {
    setSelected(null);
    setResult(null);
    blinkAnim.setValue(0);
  };

  const handleSelect = (option) => {
    if (isCorrect || isWrong) return;
    setSelected(option);

    if (option === activity.correctAnswer) {
      onAttempt?.({ isCorrect: true });
      setResult("correct");
      return;
    }

    onAttempt?.({ isCorrect: false });
    triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.completePhraseBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.completePhraseSentencePill}>
          <Text style={styles.completePhraseSentenceText}>
            {activity.sentenceStart}
          </Text>

          <Animated.View
            style={[
              styles.completePhraseBlank,
              isCorrect && styles.completePhraseBlankCorrect,
              isWrong && styles.completePhraseBlankWrong,
              isWrong && { backgroundColor: wrongBackground },
              isWrong && { transform: [{ translateX: shakeTranslateX }] },
            ]}
          >
            <Text
              style={[
                styles.completePhraseBlankText,
                isCorrect && styles.completePhraseBlankTextCorrect,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {selected || "_____"}
            </Text>
          </Animated.View>

          <Text style={styles.completePhraseSentenceText}>
            {activity.sentenceEnd}
          </Text>
        </View>

        <View style={styles.completePhraseOptionsRow}>
          {activity.options.map((option) => {
            const optionIsCorrect =
              selected === option &&
              option === activity.correctAnswer &&
              isCorrect;
            const optionIsWrong =
              selected === option &&
              option !== activity.correctAnswer &&
              isWrong;

            return (
              <Animated.View
                key={option}
                style={[
                  styles.completePhraseOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.completePhraseOption,
                    optionIsCorrect && styles.completePhraseOptionCorrect,
                    optionIsWrong && styles.completePhraseOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.completePhraseOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Text
                      style={[
                        styles.completePhraseOptionText,
                        optionIsCorrect &&
                          styles.completePhraseOptionTextCorrect,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
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
              styles.slide6SuccessAlertCard,
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

const ex5 = (CORES) =>
  StyleSheet.create({
    completePhraseBlock: {
      width: "100%",
      alignItems: "center",
    },
    completePhraseSentencePill: {
      width: "88%",
      minHeight: 38,
      borderRadius: 19,
      backgroundColor: CORES.PRIMARY,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 14,
    },
    completePhraseSentenceText: {
      color: CORES.WHITE,
      fontSize: 15,
      fontWeight: "700",
      lineHeight: 20,
      flexShrink: 1,
      textAlign: "center",
    },
    completePhraseBlank: {
      minWidth: 68,
      maxWidth: "100%",
      minHeight: 28,
      borderRadius: 14,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
      paddingVertical: 3,
      flexShrink: 1,
    },
    completePhraseBlankCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderWidth: 1,
      borderColor: CORES.SUCCESS,
    },
    completePhraseBlankWrong: {
      borderWidth: 1,
      borderColor: CORES.DANGER,
    },
    completePhraseBlankText: {
      color: CORES.PRIMARY,
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 18,
      textAlign: "center",
      flexShrink: 1,
    },
    completePhraseBlankTextCorrect: {
      color: CORES.SUCCESS_DARK,
    },
    completePhraseOptionsRow: {
      flexDirection: "row",
      gap: 16,
    },
    completePhraseOptionWrap: {
      minWidth: 70,
    },
    completePhraseOption: {
      minWidth: 70,
      minHeight: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
    },
    completePhraseOptionTouch: {
      flex: 1,
      minHeight: 32,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
    },
    completePhraseOptionText: {
      fontSize: 14,
      color: CORES.PRIMARY,
      textAlign: "center",
    },
    completePhraseOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    completePhraseOptionWrong: {
      borderColor: CORES.DANGER,
    },
    completePhraseOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    slide6SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex5;
/*
  {
    component: Exercise5,
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "She",
      sentenceEnd: "the bus.",
      options: ["take", "takes"],
      correctAnswer: "takes",
      successTitle: "Correto",
      successMessage: 'A forma correta e "She takes the bus."',
    },
  },
*/
