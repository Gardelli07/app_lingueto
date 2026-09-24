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
import Slider from "@react-native-community/slider";
import { createAudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";
import { useTheme } from "../theme";

export function Exercise13({
  activity,
  styles,
  HeaderComponent,
  next,
  speak,
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

  const shuffledLetters = useMemo(
    () => shuffleArray(activity.letters),
    [activity.letters],
  );

  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const speechPausedRef = useRef(false);

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [result, setResult] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioRate = activity.audioRate || 0.85;
  const audioPromptText =
    activity.audioText || activity.spokenText || activity.correctWord || "";

  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      1200,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const wrongMessage = activity.feedbackMessage || activity.successMessage;

  const clearPlayback = () => {
    playbackSubscriptionRef.current?.remove?.();
    playbackSubscriptionRef.current = null;
    playerRef.current?.remove?.();
    playerRef.current = null;
    shouldResumeAfterSeekRef.current = false;
    speechPausedRef.current = false;
    Speech.stop().catch(() => {});
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearPlayback();
    };
  }, []);

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

  const updateAudioStatus = (status) => {
    if (!status?.isLoaded) {
      setIsAudioPlaying(false);
      return;
    }

    const duration =
      typeof status.duration === "number" && status.duration > 0
        ? status.duration
        : estimatedDurationMs / 1000;
    const currentTime =
      typeof status.currentTime === "number" ? status.currentTime : 0;
    const progress = duration > 0 ? currentTime / duration : 0;

    setAudioDuration(duration);
    setAudioProgress(Math.max(0, Math.min(progress, 1)));
    setIsAudioPlaying(Boolean(status.playing));

    if (status.didJustFinish) {
      setAudioProgress(1);
      setIsAudioPlaying(false);
    }
  };

  const ensureAudioPlayer = () => {
    if (playerRef.current || !activity.audioSource) {
      return playerRef.current;
    }

    const player = createAudioPlayer(activity.audioSource, {
      updateInterval: 100,
    });
    playbackSubscriptionRef.current = player.addListener(
      "playbackStatusUpdate",
      updateAudioStatus,
    );
    playerRef.current = player;

    return player;
  };

  const playAudio = async () => {
    if (activity.audioSource) {
      try {
        const player = ensureAudioPlayer();
        if (!player) return;

        if (isAudioPlaying) {
          player.pause();
          setIsAudioPlaying(false);
          return;
        }

        if (audioProgress >= 0.995) {
          await player.seekTo(0);
          setAudioProgress(0);
        }

        player.play();
        setIsAudioPlaying(true);
        return;
      } catch (error) {
        console.warn("Exercise13 playAudio error", error);
        clearPlayback();
        setAudioProgress(0);
      }
    }

    if (isAudioPlaying) {
      try {
        await Speech.pause();
        speechPausedRef.current = true;
      } catch (error) {
        await Speech.stop().catch(() => {});
        speechPausedRef.current = false;
      }

      setIsAudioPlaying(false);
      return;
    }

    if (speechPausedRef.current) {
      try {
        await Speech.resume();
        setIsAudioPlaying(true);
        return;
      } catch (error) {
        speechPausedRef.current = false;
      }
    }

    clearPlayback();
    speechPausedRef.current = false;
    setAudioProgress(0);
    setIsAudioPlaying(true);

    if (!speak) {
      setIsAudioPlaying(false);
      return;
    }

    speak({
      text: audioPromptText,
      language: activity.audioLanguage || "en-US",
      rate: audioRate,
      onDone: () => {
        setAudioProgress(1);
        setIsAudioPlaying(false);
      },
      onStopped: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
  };

  const handleAudioSeekStart = () => {
    shouldResumeAfterSeekRef.current = isAudioPlaying;
    playerRef.current?.pause?.();
    setIsAudioPlaying(false);
  };

  const handleAudioSeek = (value) => {
    setAudioProgress(Math.max(0, Math.min(value, 1)));
  };

  const handleAudioSeekComplete = async (value) => {
    const player = ensureAudioPlayer();
    const progress = Math.max(0, Math.min(value, 1));
    const duration = audioDuration || estimatedDurationMs / 1000;

    setAudioProgress(progress);

    if (!player) return;

    try {
      await player.seekTo(duration * progress);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("Exercise13 seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

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

  const handleLetterPress = (letter, indexKey) => {
    if (
      isCorrect ||
      isWrong ||
      selectedLetters.some((item) => item.key === indexKey)
    ) {
      return;
    }

    const nextLetters = [...selectedLetters, { key: indexKey, value: letter }];
    setSelectedLetters(nextLetters);

    if (nextLetters.length === activity.correctWord.length) {
      const nextWord = nextLetters.map((item) => item.value).join("");

      if (nextWord === activity.correctWord) {
        onAttempt?.({ isCorrect: true });
        setResult("correct");
        return;
      }

      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
    }
  };

  const handleSelectedLetterPress = (indexKey) => {
    if (isCorrect || isWrong) return;
    setSelectedLetters((current) =>
      current.filter((item) => item.key !== indexKey),
    );
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.spellWordBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.spellWordAudioCard}>
          <View style={styles.spellWordAudioButton}>
            <TouchableOpacity
              style={styles.audioPlayButton}
              onPress={playAudio}
              accessibilityRole="button"
              accessibilityLabel={
                isAudioPlaying ? "Pausar audio" : "Reproduzir audio"
              }
            >
              <Text style={styles.audioIcon}>{isAudioPlaying ? "II" : "▶"}</Text>
            </TouchableOpacity>
            <View style={styles.audioBar}>
              <Slider
                style={styles.audioSlider}
                minimumValue={0}
                maximumValue={1}
                value={audioProgress}
                minimumTrackTintColor={CORES.WHITE_SHORT}
                maximumTrackTintColor="rgba(255,255,255,0.35)"
                thumbTintColor={CORES.WHITE_SHORT}
                onSlidingStart={handleAudioSeekStart}
                onValueChange={handleAudioSeek}
                onSlidingComplete={handleAudioSeekComplete}
                disabled={!activity.audioSource}
              />
            </View>
          </View>
        </View>

        <Animated.View
          style={[
            styles.spellWordAnswerBox,
            isCorrect && styles.spellWordAnswerBoxCorrect,
            isWrong && styles.spellWordAnswerBoxWrong,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          {selectedLetters.length === 0 ? (
            <Text style={styles.spellWordPlaceholder}>_____</Text>
          ) : (
            selectedLetters.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.spellWordSelectedLetter,
                  isCorrect && styles.spellWordSelectedLetterCorrect,
                ]}
                onPress={() => handleSelectedLetterPress(item.key)}
                disabled={isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.spellWordSelectedLetterText,
                    isCorrect && styles.spellWordSelectedLetterTextCorrect,
                  ]}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <View style={styles.spellWordOptionsRow}>
          {shuffledLetters.map((letter, index) => {
            const key = `${letter}-${index}`;
            const used = selectedLetters.some((item) => item.key === key);

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.spellWordOption,
                  used && styles.spellWordOptionUsed,
                ]}
                onPress={() => handleLetterPress(letter, key)}
                disabled={used || isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.spellWordOptionText,
                    used && styles.spellWordOptionTextUsed,
                  ]}
                >
                  {letter}
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
              styles.slide13SuccessAlertCard,
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
              onPress={() => {
                clearPlayback();
                next?.();
              }}
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

const ex13 = (CORES) =>
  StyleSheet.create({
    spellWordBlock: {
      width: "100%",
      alignItems: "center",
    },
    spellWordAudioCard: {
      width: "88%",
      marginBottom: 12,
    },
    spellWordAudioButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: CORES.EX_BLUE,
      width: "100%",
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 16,
      gap: 12,
    },
    spellWordAnswerBox: {
      width: "88%",
      minHeight: 58,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: CORES.PRIMARY,
      backgroundColor: CORES.SURFACE,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 8,
      gap: 6,
      marginBottom: 18,
    },
    spellWordAnswerBoxCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    spellWordAnswerBoxWrong: {
      borderColor: CORES.DANGER,
    },
    spellWordPlaceholder: {
      color: CORES.PRIMARY,
      fontSize: 14,
    },
    spellWordSelectedLetter: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
    },
    spellWordSelectedLetterCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    spellWordSelectedLetterText: {
      color: CORES.WHITE,
      fontSize: 13,
      fontWeight: "700",
    },
    spellWordSelectedLetterTextCorrect: {
      color: CORES.SUCCESS_DARK,
    },
    spellWordOptionsRow: {
      width: "88%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
    },
    spellWordOption: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      justifyContent: "center",
    },
    spellWordOptionUsed: {
      backgroundColor: CORES.SURFACE_MUTED,
      borderColor: CORES.BORDER_LIGHT,
    },
    spellWordOptionText: {
      color: CORES.PRIMARY,
      fontSize: 13,
      fontWeight: "700",
    },
    spellWordOptionTextUsed: {
      color: CORES.EX_BLUE_LIGHT,
    },
    slide13SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex13;

/*

 {
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../mp3/IC/hello.mp3"),
      audioDurationMs: 824,
      letters: ["H", "E", "L", "L", "O"],
      correctWord: "HELLO",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "HELLO".',
    },
  },

*/
