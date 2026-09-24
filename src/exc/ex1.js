import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";

export function Exercise1({
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
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    return shuffled;
  };

  const englishOptions = useMemo(
    () => shuffleArray(activity.pairs.map((item) => item.en)),
    [activity.pairs],
  );
  const translationOptions = useMemo(
    () => shuffleArray(activity.pairs.map((item) => item.pt)),
    [activity.pairs],
  );

  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [matchedEnglish, setMatchedEnglish] = useState([]);
  const [matchedTranslations, setMatchedTranslations] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const allMatched = matchedEnglish.length === activity.pairs.length;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.DANGER_BG, CORES.DANGER_LIGHT],
  });

  const isCorrectPair = (en, pt) =>
    activity.pairs.some((pair) => pair.en === en && pair.pt === pt);

  const triggerWrongFeedback = (en, pt) => {
    onAttempt?.({ isCorrect: false });
    setWrongPair({ en, pt });
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 520,
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
      ]),
    ]).start(() => {
      setWrongPair(null);
      blinkAnim.setValue(0);
    });
  };

  useEffect(() => {
    if (!selectedEnglish || !selectedTranslation) return;

    if (isCorrectPair(selectedEnglish, selectedTranslation)) {
      onAttempt?.({ isCorrect: true });
      setMatchedEnglish((prev) => [...prev, selectedEnglish]);
      setMatchedTranslations((prev) => [...prev, selectedTranslation]);
      setSelectedEnglish(null);
      setSelectedTranslation(null);
      setWrongPair(null);
      return;
    }

    triggerWrongFeedback(selectedEnglish, selectedTranslation);
    setSelectedEnglish(null);
    setSelectedTranslation(null);
  }, [selectedEnglish, selectedTranslation]);

  useEffect(() => {
    if (allMatched) {
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
  }, [allMatched, alertOpacity, alertTranslateY]);

  const getEnglishCardStyle = (word) => {
    const matched = matchedEnglish.includes(word);
    const selected = selectedEnglish === word;
    const wrong = wrongPair?.en === word;

    return [
      styles.matchCard,
      styles.matchCardEnglish,
      selected && styles.matchCardSelected,
      matched && styles.matchCardCorrect,
      wrong && styles.matchCardWrong,
      wrong && { backgroundColor: wrongBackground },
      wrong && { transform: [{ translateX: shakeTranslateX }] },
    ];
  };

  const getTranslationCardStyle = (word) => {
    const matched = matchedTranslations.includes(word);
    const selected = selectedTranslation === word;
    const wrong = wrongPair?.pt === word;

    return [
      styles.matchCard,
      styles.matchCardTranslation,
      selected && styles.matchCardTranslationSelected,
      matched && styles.matchCardCorrect,
      wrong && styles.matchCardWrong,
      wrong && { backgroundColor: wrongBackground },
      wrong && { transform: [{ translateX: shakeTranslateX }] },
    ];
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.matchBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.matchList}>
          {englishOptions.map((word) => {
            const matched = matchedEnglish.includes(word);

            return (
              <Animated.View key={word} style={getEnglishCardStyle(word)}>
                <TouchableOpacity
                  style={styles.matchCardButton}
                  onPress={() => setSelectedEnglish(word)}
                  disabled={matched || allMatched}
                >
                  <Text
                    style={[
                      styles.matchCardText,
                      matched && styles.matchCardTextCorrect,
                    ]}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.76}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.matchList}>
          {translationOptions.map((word) => {
            const matched = matchedTranslations.includes(word);

            return (
              <Animated.View key={word} style={getTranslationCardStyle(word)}>
                <TouchableOpacity
                  style={styles.matchCardButton}
                  onPress={() => setSelectedTranslation(word)}
                  disabled={matched || allMatched}
                >
                  <Text
                    style={[
                      styles.matchCardText,
                      styles.matchCardTextTranslation,
                      matched && styles.matchCardTextCorrect,
                    ]}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.76}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {allMatched && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
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

const ex1 = (CORES) =>
  StyleSheet.create({
    matchBlock: {
      width: "88%",
      alignItems: "center",
    },
    matchList: {
      width: "100%",
      gap: 10,
      marginTop: 4,
    },
    matchCard: {
      width: "100%",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
    },
    matchCardEnglish: {
      backgroundColor: CORES.SURFACE,
      borderColor: CORES.EX_BORDER_ACCENT,
    },
    matchCardTranslation: {
      backgroundColor: CORES.BLUE_SOFT,
      borderColor: CORES.BLUE_SOFT,
    },
    matchCardSelected: {
      borderColor: CORES.BRAND_STRONG,
      borderWidth: 2,
    },
    matchCardTranslationSelected: {
      backgroundColor: CORES.BLUE_SOFT_DARK,
      borderColor: CORES.BRAND_STRONG,
      borderWidth: 2,
    },
    matchCardCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
      borderWidth: 2,
    },
    matchCardWrong: {
      borderColor: CORES.DANGER,
      borderWidth: 2,
    },
    matchCardButton: {
      width: "100%",
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    matchCardText: {
      fontSize: 19,
      lineHeight: 23,
      color: CORES.EX_BLUE_TEXT,
      fontFamily: "serif",
      textAlign: "center",
      textAlignVertical: "center",
      includeFontPadding: false,
      flexShrink: 1,
    },
    matchCardTextTranslation: {
      color: CORES.WHITE,
    },
    matchCardTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
  });

export default ex1;

/*

  {
    component: Exercise1,
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Hello", pt: "oie" },
        { en: "fine", pt: "bem/legal" },
        { en: "bye", pt: "tchau" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },

*/
