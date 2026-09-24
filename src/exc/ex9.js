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

export function Exercise9({
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

    setSelected(option.id);

    if (option.id === activity.correctOptionId) {
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

      <View style={styles.imageGridBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>
        <Text style={styles.imageGridQuestion}>{activity.question}</Text>

        <View style={styles.imageGridList}>
          {activity.options.map((option) => {
            const optionIsCorrect =
              selected === option.id &&
              option.id === activity.correctOptionId &&
              isCorrect;
            const optionIsWrong =
              selected === option.id &&
              option.id !== activity.correctOptionId &&
              isWrong;

            return (
              <Animated.View
                key={option.id}
                style={[
                  styles.imageGridOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.imageGridOption,
                    optionIsCorrect && styles.imageGridOptionCorrect,
                    optionIsWrong && styles.imageGridOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.imageGridOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Image
                      source={option.image}
                      style={styles.imageGridOptionImage}
                    />
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
              styles.slide10SuccessAlertCard,
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

const ex9 = (CORES) =>
  StyleSheet.create({
    imageGridBlock: {
      width: "100%",
      alignItems: "center",
    },
    imageGridQuestion: {
      width: "88%",
      textAlign: "center",
      fontSize: 20,
      color: CORES.EX_BLUE,
      marginBottom: 14,
      fontWeight: "800",
    },
    imageGridList: {
      width: "88%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 12,
    },
    imageGridOptionWrap: {
      width: "48%",
    },
    imageGridOption: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
      overflow: "hidden",
    },
    imageGridOptionTouch: {
      flex: 1,
    },
    imageGridOptionImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    imageGridOptionCorrect: {
      borderColor: CORES.SUCCESS,
      backgroundColor: CORES.SUCCESS_BG,
    },
    imageGridOptionWrong: {
      borderColor: CORES.DANGER,
    },
    slide10SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex9;

/*
 
  {
    component: Exercise9,
    activity: {
      prompt: "O que é a palavra?",
      question: "Phone",
      correctOptionId: "phone",
      options: [
        { id: "phone", image: BussinesImages.telefone },
        { id: "book", image: BussinesImages.livro },
        { id: "email", image: BussinesImages.email },
        { id: "clock", image: BussinesImages.relogio },
      ],
      successTitle: "Correto",
      successMessage: 'A imagem correta representa "phone".',
    },
  },

 */
