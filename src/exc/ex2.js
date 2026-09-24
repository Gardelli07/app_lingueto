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

export function Exercise2({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const getBlankWidth = (blank) => {
    const longestLabel = [blank.answer, ...(blank.options || [])].reduce(
      (longest, option) =>
        String(option).length > String(longest).length ? option : longest,
      "...",
    );

    const estimatedWidth = String(longestLabel).length * 9 + 28;

    return Math.min(Math.max(estimatedWidth, 58), 150);
  };

  const tokenizeTextFragment = (text, keyPrefix) =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, index, array) => (
        <Text key={`${keyPrefix}-${word}-${index}`} style={styles.completeWord}>
          {index === array.length - 1 ? word : `${word} `}
        </Text>
      ));

  const paragraphs = useMemo(() => {
    if (activity.paragraphs) return activity.paragraphs;
    if (!activity.text || !activity.blanks) return [];

    const sortedBlanks = [...activity.blanks].sort((left, right) =>
      String(left.id).localeCompare(String(right.id), undefined, {
        numeric: true,
      }),
    );

    const paragraph = [];
    let remainingText = activity.text;

    sortedBlanks.forEach((blank) => {
      const markerRegex = new RegExp(`\\(${blank.id}\\)\\s*_+`);
      const match = remainingText.match(markerRegex);

      if (!match) return;

      const before = remainingText.slice(0, match.index);
      if (before) paragraph.push(before);
      paragraph.push(blank);
      remainingText = remainingText.slice(match.index + match[0].length);
    });

    if (remainingText) paragraph.push(remainingText);

    return [paragraph];
  }, [activity]);

  const blankMap = useMemo(() => {
    const entries = paragraphs.flatMap((paragraph) =>
      paragraph
        .filter((item) => typeof item !== "string")
        .map((blank) => [blank.id, blank]),
    );

    return Object.fromEntries(entries);
  }, [paragraphs]);

  const blankIds = useMemo(() => Object.keys(blankMap), [blankMap]);
  const [answers, setAnswers] = useState({});
  const [activeBlankId, setActiveBlankId] = useState(null);
  const [wrongBlankId, setWrongBlankId] = useState(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0, -7, 7, -6, 6, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  const allCorrect =
    blankIds.length > 0 &&
    blankIds.every((blankId) => answers[blankId] === blankMap[blankId].answer);

  useEffect(() => {
    if (allCorrect) {
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
  }, [allCorrect, alertOpacity, alertTranslateY]);

  const triggerWrongFeedback = (blankId) => {
    setWrongBlankId(blankId);
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);
    Vibration.vibrate(140);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 110,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setWrongBlankId(null);
      blinkAnim.setValue(0);
    });
  };

  const handleOptionPress = (blank, option) => {
    if (option === blank.answer) {
      onAttempt?.({ isCorrect: true });
      setAnswers((prev) => ({ ...prev, [blank.id]: option }));
      setWrongBlankId(null);
      setActiveBlankId(null);
      return;
    }

    onAttempt?.({ isCorrect: false });
    setActiveBlankId(null);
    triggerWrongFeedback(blank.id);
  };

  const renderBlank = (blank) => {
    const selectedValue = answers[blank.id];
    const isCorrect = selectedValue === blank.answer;
    const isWrong = wrongBlankId === blank.id;
    const isOpen = activeBlankId === blank.id;
    const blankWidth = getBlankWidth(blank);

    return (
      <Animated.View
        key={blank.id}
        style={[
          styles.blankWrapper,
          isOpen && styles.blankWrapperOpen,
          isWrong && { transform: [{ translateX: shakeTranslateX }] },
        ]}
      >
        <Animated.View
          style={[
            styles.blankButton,
            { minWidth: blankWidth },
            isCorrect && styles.blankButtonCorrect,
            isWrong && styles.blankButtonWrong,
            isWrong && { backgroundColor: wrongBackground },
          ]}
        >
          <TouchableOpacity
            style={[styles.blankButtonTouchArea, { minWidth: blankWidth }]}
            activeOpacity={0.9}
            disabled={isCorrect || allCorrect}
            onPress={() =>
              setActiveBlankId((current) =>
                current === blank.id ? null : blank.id,
              )
            }
          >
            <Text
              style={[
                styles.blankButtonText,
                isCorrect && styles.blankButtonTextCorrect,
              ]}
            >
              {selectedValue || "..."}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {isOpen && !isCorrect && (
          <View style={[styles.blankOptionsMenu, { minWidth: blankWidth }]}>
            {blank.options.map((option) => (
              <TouchableOpacity
                key={`${blank.id}-${option}`}
                style={[
                  styles.blankOptionItem,
                  option === blank.options[blank.options.length - 1] &&
                    styles.blankOptionItemLast,
                ]}
                activeOpacity={0.85}
                onPress={() => handleOptionPress(blank, option)}
              >
                <Text style={styles.blankOptionText} numberOfLines={1}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.completeActivityBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.completeCard}>
          {paragraphs.map((paragraph, paragraphIndex) => (
            <View
              key={`paragraph-${paragraphIndex}`}
              style={styles.completeLine}
            >
              {paragraph.map((item, itemIndex) =>
                typeof item === "string"
                  ? tokenizeTextFragment(
                      item,
                      `paragraph-${paragraphIndex}-${itemIndex}`,
                    )
                  : renderBlank(item),
              )}
            </View>
          ))}
        </View>
      </View>

      {allCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
              styles.slide3SuccessAlertCard,
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

const ex2 = (CORES) =>
  StyleSheet.create({
    completeActivityBlock: {
      width: "100%",
      alignItems: "center",
    },
    completeCard: {
      width: "88%",
      minHeight: 360,
      backgroundColor: CORES.SURFACE,
      borderWidth: 2,
      borderColor: CORES.PRIMARY,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 16,
      overflow: "visible",
    },
    completeLine: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 12,
      overflow: "visible",
    },
    completeWord: {
      fontSize: 16,
      lineHeight: 30,
      color: CORES.TEXT,
    },
    blankWrapper: {
      position: "relative",
      marginHorizontal: 3,
      marginVertical: 2,
      alignItems: "flex-start",
      zIndex: 1,
      overflow: "visible",
    },
    blankWrapperOpen: {
      zIndex: 50,
      elevation: 20,
    },
    blankButton: {
      height: 34,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
    },
    blankButtonTouchArea: {
      flex: 1,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    blankButtonCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    blankButtonWrong: {
      borderColor: CORES.DANGER,
    },
    blankButtonText: {
      fontSize: 15,
      color: CORES.TEXT_MUTED,
    },
    blankButtonTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    blankOptionsMenu: {
      position: "absolute",
      top: 38,
      left: 0,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1.5,
      borderColor: CORES.PRIMARY,
      borderRadius: 8,
      overflow: "hidden",
      zIndex: 60,
      elevation: 24,
      shadowColor: CORES.TEXT,
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    blankOptionItem: {
      minHeight: 34,
      justifyContent: "center",
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: CORES.EX_BORDER,
    },
    blankOptionItemLast: {
      borderBottomWidth: 0,
    },
    blankOptionText: {
      fontSize: 15,
      color: CORES.TEXT_DARK,
    },
    slide3SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex2;

/*

  {
      component: Exercise2,
      activity: {
        prompt: "Completar o Texto",
        paragraphs: [
          [
            "This is my friend Peter. He",
            { id: "blank-1", answer: "is", options: ["is", "are", "am"] },
            "25 years old.",
          ],
          [
            "Peter",
            {
              id: "blank-2",
              answer: "lives",
              options: ["live", "lives", "living"],
            },
            "in New York with his family.",
          ],
          [
            "He",
            {
              id: "blank-3",
              answer: "works",
              options: ["works", "work", "working"],
            },
            "in a big bank. He likes his job.",
          ],
          [
            "On weekends, he",
            {
              id: "blank-4",
              answer: "plays",
              options: ["play", "plays", "playing"],
            },
            "soccer in the park.",
          ],
        ],
        successTitle: "Excelente",
        successMessage: "Você completou o texto corretamente.",
      },
    },

*/
