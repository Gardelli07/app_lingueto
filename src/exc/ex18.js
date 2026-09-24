import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

export function Exercise18({
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
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const scrambledSentence =
    activity.scrambledSentence ||
    (activity.scrambledWords || activity.words || []).join(" ");

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

  const handleSubmit = () => {
    const typed = normalizeText(typedText);
    const expected = normalizeText(activity.correctAnswer);

    if (!typed || typed !== expected) {
      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
      return;
    }

    onAttempt?.({ isCorrect: true });
    setResult("correct");
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.orderSentenceBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        {activity.instruction ? (
          <Text style={styles.orderSentenceInstruction}>
            {activity.instruction}
          </Text>
        ) : null}

        <Animated.View
          style={[
            styles.orderSentenceWordsCard,
            isWrong && styles.orderSentenceWordsCardWrong,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          <Text style={styles.orderSentenceWordsText}>
            {scrambledSentence}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.orderSentenceInputWrap,
            isWrong && styles.orderSentenceInputWrapWrong,
            isCorrect && styles.orderSentenceInputWrapCorrect,
          ]}
        >
          <TextInput
            value={typedText}
            onChangeText={(value) => {
              setTypedText(value);
              if (result) setResult(null);
            }}
            style={styles.orderSentenceInput}
            placeholder={activity.placeholder}
            placeholderTextColor={CORES.EX_BLUE_FAINT}
            autoCapitalize="sentences"
            autoCorrect={false}
          />
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.orderSentenceSubmitButton,
            !typedText.trim() && styles.orderSentenceSubmitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!typedText.trim() || isCorrect || isWrong}
        >
          <Text style={styles.orderSentenceSubmitButtonText}>
            {activity.submitLabel}
          </Text>
        </TouchableOpacity>
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
                {activity.successMessage}
              </Text>
            </View>

            {isCorrect ? (
              <TouchableOpacity
                style={styles.alertContinueButton}
                onPress={next}
              >
                <Text style={styles.alertContinueButtonText}>
                  Próxima Atividade
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.alertContinueButton,
                  styles.resultAlertButtonWrong,
                ]}
                onPress={next}
              >
                <Text style={styles.alertContinueButtonText}>
                  {activity.wrongButtonLabel || "Próxima Atividade"}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex18 = (CORES) =>
  StyleSheet.create({
    orderSentenceBlock: {
      width: "100%",
      alignItems: "center",
    },
    orderSentenceInstruction: {
      width: "88%",
      textAlign: "left",
      fontSize: 16,
      color: CORES.EX_BLUE,
      marginBottom: 18,
      fontWeight: "600",
    },
    orderSentenceWordsCard: {
      width: "88%",
      minHeight: 72,
      borderRadius: 12,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 18,
      paddingVertical: 16,
      marginBottom: 24,
    },
    orderSentenceWordsCardWrong: {
      borderWidth: 1.5,
      borderColor: CORES.DANGER,
    },
    orderSentenceWordsText: {
      color: CORES.WHITE,
      fontSize: 19,
      textAlign: "center",
      textDecorationLine: "underline",
      fontFamily: "serif",
    },
    orderSentenceInputWrap: {
      width: "72%",
      borderBottomWidth: 2,
      borderBottomColor: CORES.EX_BORDER,
      marginBottom: 20,
    },
    orderSentenceInputWrapWrong: {
      borderBottomColor: CORES.DANGER,
    },
    orderSentenceInputWrapCorrect: {
      borderBottomColor: CORES.SUCCESS,
    },
    orderSentenceInput: {
      minHeight: 36,
      color: CORES.PRIMARY,
      fontSize: 19,
      textAlign: "center",
      paddingVertical: 4,
      fontFamily: "serif",
    },
    orderSentenceSubmitButton: {
      minWidth: 152,
      height: 44,
      borderRadius: 14,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 18,
    },
    orderSentenceSubmitButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED,
    },
    orderSentenceSubmitButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 15,
      fontWeight: "700",
    },
  });

export default ex18;

/*

  {
    component: Exercise18,
    activity: {
      prompt: "Organize e escreva a frase",
      scrambledSentence: "working / am / I / now",
      correctAnswer: "I am working now",
      placeholder: "Escreva a frase correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A frase correta é: I am working now.",
    },
  },

*/
