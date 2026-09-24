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

export function Exercise15({
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

  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [matchedImageIds, setMatchedImageIds] = useState([]);
  const [matchedWordIds, setMatchedWordIds] = useState([]);
  const [result, setResult] = useState(null);

  const allMatched = matchedImageIds.length === activity.pairs.length;
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
    if (!selectedImageId || !selectedWordId || allMatched || isWrong) return;

    const matchedPair = activity.pairs.find(
      (pair) =>
        pair.imageId === selectedImageId && pair.wordId === selectedWordId,
    );

    if (matchedPair) {
      onAttempt?.({ isCorrect: true });
      setMatchedImageIds((current) => [...current, matchedPair.imageId]);
      setMatchedWordIds((current) => [...current, matchedPair.wordId]);
      setSelectedImageId(null);
      setSelectedWordId(null);
      setResult(null);
      return;
    }

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
  }, [selectedImageId, selectedWordId, allMatched, isWrong, activity.pairs]);

  useEffect(() => {
    if (allMatched) {
      setResult("correct");
    }
  }, [allMatched]);

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

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <Animated.View
        style={[
          styles.matchMediaWordBlock,
          isWrong && { transform: [{ translateX: shakeTranslateX }] },
        ]}
      >
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.matchMediaWordImagesRow}>
          {activity.images.map((imageOption) => {
            const isSelected = selectedImageId === imageOption.id;
            const isMatched = matchedImageIds.includes(imageOption.id);
            const showWrong = isWrong && isSelected;

            return (
              <Animated.View
                key={imageOption.id}
                style={[
                  styles.matchMediaWordImageCard,
                  isSelected && styles.matchMediaWordImageCardSelected,
                  isMatched && styles.matchMediaWordImageCardCorrect,
                  showWrong && styles.matchMediaWordImageCardWrong,
                  showWrong && { backgroundColor: wrongBackground },
                ]}
              >
                <TouchableOpacity
                  style={styles.matchMediaWordImageTouch}
                  onPress={() => setSelectedImageId(imageOption.id)}
                  disabled={isMatched || isCorrect || isWrong}
                  activeOpacity={0.9}
                >
                  <Image
                    source={imageOption.image}
                    style={styles.matchMediaWordImage}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.matchMediaWordOptionsRow}>
          {activity.words.map((wordOption) => {
            const isSelected = selectedWordId === wordOption.id;
            const isMatched = matchedWordIds.includes(wordOption.id);
            const showWrong = isWrong && isSelected;

            return (
              <Animated.View
                key={wordOption.id}
                style={[
                  styles.matchMediaWordOptionWrap,
                  showWrong && { backgroundColor: wrongBackground },
                ]}
              >
                <Animated.View
                  style={[
                    styles.matchMediaWordOption,
                    isSelected && styles.matchMediaWordOptionSelected,
                    isMatched && styles.matchMediaWordOptionCorrect,
                    showWrong && styles.matchMediaWordOptionWrong,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.matchMediaWordOptionTouch}
                    onPress={() => setSelectedWordId(wordOption.id)}
                    disabled={isMatched || isCorrect || isWrong}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={[
                        styles.matchMediaWordOptionText,
                        isMatched && styles.matchMediaWordOptionTextCorrect,
                      ]}
                      numberOfLines={2}
                      adjustsFontSizeToFit
                      minimumFontScale={0.78}
                    >
                      {wordOption.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>

      {(isCorrect || isWrong) && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              isCorrect
                ? styles.resultAlertCardCorrect
                : styles.resultAlertCardWrong,
              styles.slide15SuccessAlertCard,
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

const ex15 = (CORES) =>
  StyleSheet.create({
    matchMediaWordBlock: {
      width: "100%",
      alignItems: "center",
    },
    matchMediaWordSubtitle: {
      width: "88%",
      textAlign: "center",
      fontSize: 13,
      color: CORES.EX_BLUE,
      marginBottom: 16,
      fontWeight: "700",
    },
    matchMediaWordImagesRow: {
      width: "94%",
      maxWidth: 520,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      marginBottom: 10,
    },
    matchMediaWordImageCard: {
      flex: 1,
      maxWidth: "48%",
      minWidth: 0,
      aspectRatio: 16 / 9,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      overflow: "hidden",
      marginBottom: 10,
    },
    matchMediaWordImageCardSelected: {
      borderColor: CORES.EX_BLUE,
    },
    matchMediaWordImageCardCorrect: {
      borderColor: CORES.SUCCESS,
      backgroundColor: CORES.SUCCESS_BG,
    },
    matchMediaWordImageCardWrong: {
      borderColor: CORES.DANGER,
    },
    matchMediaWordImageTouch: {
      flex: 1,
    },
    matchMediaWordImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    matchMediaWordOptionsRow: {
      width: "94%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    matchMediaWordOptionWrap: {
      flex: 1,
      maxWidth: "48%",
      minWidth: 0,
      borderRadius: 18,
    },
    matchMediaWordOption: {
      width: "100%",
      minHeight: 42,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
    },
    matchMediaWordOptionSelected: {
      borderColor: CORES.EX_BLUE,
    },
    matchMediaWordOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    matchMediaWordOptionWrong: {
      borderColor: CORES.DANGER,
    },
    matchMediaWordOptionTouch: {
      flex: 1,
      minHeight: 42,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    matchMediaWordOptionText: {
      color: CORES.TEXT_DARK,
      fontSize: 14,
      lineHeight: 18,
      textAlign: "center",
      flexShrink: 1,
    },
    matchMediaWordOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    slide15SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex15;

/*

  {
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: IC.A2S4 },
        { id: "img2", image: IC.A2S4p2 },
      ],
      words: [
        { id: "test1", label: "Hey" },
        { id: "test2", label: "Hello" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },

*/
