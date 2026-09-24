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

export function Exercise8({
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

  const handleSelect = (option) => {
    if (isCorrect || isWrong) return;
    setSelected(option);

    if (option === activity.correctAnswer) {
      onAttempt?.({ isCorrect: true, exerciseAccuracy: 100 });
      setResult("correct");
      return;
    }

    onAttempt?.({ isCorrect: false, exerciseAccuracy: 0 });
    triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.imageChoiceBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.imageChoiceMediaCard}>
          {activity.image ? (
            <Image source={activity.image} style={styles.imageChoiceMedia} />
          ) : (
            <View style={styles.imageChoiceEmojiWrap}>
              <Text style={styles.imageChoiceEmoji}>
                {activity.emoji || "?"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.imageChoiceOptionsList}>
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
                  styles.imageChoiceOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.imageChoiceOption,
                    optionIsCorrect && styles.imageChoiceOptionCorrect,
                    optionIsWrong && styles.imageChoiceOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.imageChoiceOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Text
                      style={[
                        styles.imageChoiceOptionText,
                        optionIsCorrect && styles.imageChoiceOptionTextCorrect,
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
              styles.slide9SuccessAlertCard,
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

const ex8 = (CORES) =>
  StyleSheet.create({
    imageChoiceBlock: {
      width: "100%",
      alignItems: "center",
    },
    imageChoiceMediaCard: {
      width: "88%",
      maxWidth: 520,
      aspectRatio: 16 / 9,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 16,
      backgroundColor: CORES.SURFACE_MUTED,
      alignItems: "center",
      justifyContent: "center",
    },
    imageChoiceMedia: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    imageChoiceEmojiWrap: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    imageChoiceEmoji: {
      fontSize: 72,
    },
    imageChoiceOptionsList: {
      width: "88%",
      gap: 8,
    },
    imageChoiceOptionWrap: {
      width: "100%",
    },
    imageChoiceOption: {
      width: "100%",
      minHeight: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
    },
    imageChoiceOptionTouch: {
      flex: 1,
      minHeight: 32,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
    },
    imageChoiceOptionText: {
      color: CORES.PRIMARY,
      fontSize: 13,
      textAlign: "center",
    },
    imageChoiceOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    imageChoiceOptionWrong: {
      borderColor: CORES.DANGER,
    },
    imageChoiceOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    slide9SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex8;

/**
 
  {
    component: Exercise8,
    activity: {
      prompt: "Oque é essa imagen?",
      image: require("../../../../assets/Bussines/agenda2.png"),
      options: ["Banana", "Agenda", "Grape"],
      correctAnswer: "Agenda",
      successTitle: "Correto",
      successMessage: 'A resposta correta é "Agenda".',
    },
  },

 */
