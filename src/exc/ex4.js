import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";

export function Exercise4({
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
  const commandText = activity.command || activity.wrongSentence;

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

      <View style={styles.correctSentenceBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.correctSentenceMediaCard}>
          <Image source={activity.image} style={styles.correctSentenceImage} />
        </View>

        {!!commandText && (
          <View style={styles.correctSentencePromptPill}>
            <Text style={styles.correctSentencePromptText}>{commandText}</Text>
          </View>
        )}

        <View style={styles.correctSentenceOptionsList}>
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
                  styles.correctSentenceOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.correctSentenceOption,
                    optionIsCorrect && styles.correctSentenceOptionCorrect,
                    optionIsWrong && styles.correctSentenceOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.correctSentenceOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Text
                      style={[
                        styles.correctSentenceOptionText,
                        optionIsCorrect &&
                          styles.correctSentenceOptionTextCorrect,
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
              styles.slide5SuccessAlertCard,
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

const ex4 = (CORES) =>
  StyleSheet.create({
    correctSentenceBlock: {
      width: "100%",
      alignItems: "center",
    },
    correctSentenceMediaCard: {
      width: "88%",
      maxWidth: 520,
      aspectRatio: 16 / 9,
      borderRadius: 18,
      overflow: "hidden",
      marginBottom: 12,
      backgroundColor: CORES.SURFACE_MUTED,
    },
    correctSentenceImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    correctSentencePromptPill: {
      width: "88%",
      minHeight: 36,
      borderRadius: 18,
      backgroundColor: CORES.PRIMARY,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    correctSentencePromptText: {
      color: CORES.WHITE,
      fontSize: 15,
      fontWeight: "700",
      textAlign: "center",
    },
    correctSentenceOptionsList: {
      width: "88%",
      gap: 8,
    },
    correctSentenceOptionWrap: {
      width: "100%",
    },
    correctSentenceOption: {
      width: "100%",
      minHeight: 34,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
    },
    correctSentenceOptionTouch: {
      flex: 1,
      minHeight: 34,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    correctSentenceOptionText: {
      fontSize: 14,
      color: CORES.PRIMARY,
      textAlign: "center",
      textDecorationLine: "underline",
    },
    correctSentenceOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    correctSentenceOptionWrong: {
      borderColor: CORES.DANGER,
    },
    correctSentenceOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
      textDecorationLine: "none",
    },
    slide5SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex4;

/*
  {
    component: Exercise4,
    activity: {
      prompt: "Corrija",
      image: IC.A8S12,
      wrongSentence: "She take the bus.",
      options: ["He is a doctor.", "She is a doctor."],
      correctAnswer: "She is a doctor.",
      successTitle: "Correto",
      successMessage: 'A forma correta e "She is a doctor."',
    },
  },
*/
