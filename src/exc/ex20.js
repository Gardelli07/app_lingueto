import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { useTheme } from "../theme";

export function Exercise20({ activity, styles, HeaderComponent, next, onAttempt }) {
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
  const commandText =
    activity.command || activity.statement || activity.dialogue || activity.textOnScreen || "";
  const wrongMessage = activity.feedbackMessage || activity.successMessage;
  const correctMessage =
    activity.successMessage ||
    activity.feedbackMessage ||
    (commandText ? `Resposta correta para: ${commandText}` : "");

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
    onAttempt?.({ isCorrect: false });
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

  const handleSelect = (option) => {
    if (isCorrect || isWrong) return;

    setSelected(option);

    if (option === activity.correctAnswer) {
      onAttempt?.({ isCorrect: true });
      setResult("correct");
      return;
    }

    triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.trueFalseImageBlock}>
        <Text style={styles.trueFalseImagePrompt}>{activity.prompt}</Text>

        <View style={styles.trueFalseImageMediaWrapper}>
          <View style={styles.trueFalseImageMediaCard}>
            <Image source={activity.image} style={styles.trueFalseImage} />
          </View>
        </View>

        {!!commandText && (
          <Text style={styles.trueFalseImageCommand}>{commandText}</Text>
        )}

        <View style={styles.trueFalseImageOptionsRow}>
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
                  styles.trueFalseImageOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.trueFalseImageOption,
                    optionIsCorrect && styles.trueFalseImageOptionCorrect,
                    optionIsWrong && styles.trueFalseImageOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.trueFalseImageOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Text
                      style={[
                        styles.trueFalseImageOptionText,
                        optionIsCorrect &&
                          styles.trueFalseImageOptionTextCorrect,
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
              styles.trueFalseImageSuccessAlertCard,
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
                  {isWrong ? "X" : "OK"}
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
                {isWrong ? "X Tente novamente" : "OK Muito bem!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {isWrong ? wrongMessage : correctMessage}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.alertContinueButton,
                isWrong && styles.resultAlertButtonWrong,
              ]}
              onPress={() => next?.()}
            >
              <Text style={styles.alertContinueButtonText}>
                Proxima atividade
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex20 = (CORES) =>
  StyleSheet.create({
    trueFalseImageBlock: {
      width: "100%",
      alignItems: "center",
    },
    trueFalseImagePrompt: {
      width: "88%",
      textAlign: "left",
      fontSize: 20,
      color: CORES.EX_BLUE,
      marginBottom: 18,
      fontWeight: "700",
    },
    trueFalseImageMediaWrapper: {
      width: "88%",
      maxWidth: 520,
      marginBottom: 14,
    },
    trueFalseImageMediaCard: {
      width: "100%",
      aspectRatio: 16 / 9,
      backgroundColor: CORES.SURFACE_MUTED,
      borderRadius: 18,
      overflow: "hidden",
    },
    trueFalseImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    trueFalseImageCommand: {
      width: "88%",
      textAlign: "center",
      fontSize: 16,
      lineHeight: 22,
      color: CORES.PRIMARY,
      fontWeight: "700",
      marginBottom: 16,
    },
    trueFalseImageOptionsRow: {
      flexDirection: "row",
      gap: 12,
    },
    trueFalseImageOptionWrap: {
      minWidth: 86,
    },
    trueFalseImageOption: {
      height: 40,
      minWidth: 86,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
    },
    trueFalseImageOptionTouch: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    trueFalseImageOptionText: {
      fontSize: 16,
      color: CORES.TEXT_MUTED,
      fontWeight: "600",
    },
    trueFalseImageOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    trueFalseImageOptionWrong: {
      borderColor: CORES.DANGER,
    },
    trueFalseImageOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
    },
    trueFalseImageSuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex20;

/*
  {
    component: Exercise20,
    activity: {
      prompt: "Observe e responda",
      image: IC.A4S8,
      command: "He wakes up at 6am every day.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      successMessage: 'A frase "He wakes up at 6am every day." esta correta.',
    },
  },
*/
