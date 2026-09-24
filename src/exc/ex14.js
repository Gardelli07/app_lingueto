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
import Slider from "@react-native-community/slider";
import { createAudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";
import { useTheme } from "../theme";

export function Exercise14({
  activity,
  styles,
  HeaderComponent,
  next,
  speak,
  onAttempt,
}) {
  const CORES = useTheme();
  const formatPrompt = (prompt) => {
    if (!prompt || typeof prompt !== "string" || prompt.includes("\n")) {
      return prompt;
    }

    const normalizedPrompt = prompt.trim();
    if (normalizedPrompt.length <= 28) return normalizedPrompt;

    const middleIndex = Math.floor(normalizedPrompt.length / 2);
    const leftSpace = normalizedPrompt.lastIndexOf(" ", middleIndex);
    const rightSpace = normalizedPrompt.indexOf(" ", middleIndex);

    const breakIndex =
      leftSpace === -1
        ? rightSpace
        : rightSpace === -1
          ? leftSpace
          : middleIndex - leftSpace <= rightSpace - middleIndex
            ? leftSpace
            : rightSpace;

    if (breakIndex === -1) return normalizedPrompt;

    return `${normalizedPrompt.slice(0, breakIndex)}\n${normalizedPrompt
      .slice(breakIndex + 1)
      .trimStart()}`;
  };

  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const speechPausedRef = useRef(false);

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioRate = activity.audioRate || 0.85;
  const answerOptions = activity.answerOptions || activity.options || [];
  const correctOption = activity.correctOption || activity.correctAnswer;
  const formattedPrompt = formatPrompt(activity.prompt);
  const optionTextLengths = answerOptions.map(
    (option) => String(option).trim().length,
  );
  const shouldStackOptions =
    activity.stackOptions ||
    optionTextLengths.some((length) => length > 18) ||
    optionTextLengths.reduce((sum, length) => sum + length, 0) > 32;
  const stackedOptionsRowStyle = shouldStackOptions
    ? {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "stretch",
        width: "88%",
      }
    : null;
  const stackedOptionPillStyle = shouldStackOptions
    ? {
        width: "100%",
        maxWidth: "100%",
        alignSelf: "stretch",
      }
    : null;
  const stackedOptionTouchStyle = shouldStackOptions ? { width: "100%" } : null;
  const audioPromptText =
    activity.audioText || activity.spokenText || correctOption || "";

  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      900,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.DANGER_BG, CORES.DANGER_LIGHT],
  });

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

  useEffect(() => {
    clearPlayback();
    setAudioProgress(0);
    setAudioCurrentTime(0);
    setAudioDuration(0);
    blinkAnim.setValue(0);
    setSelected(null);
    setResult(null);
  }, [activity, blinkAnim]);

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
    setAudioCurrentTime(currentTime);
    setAudioProgress(Math.max(0, Math.min(progress, 1)));
    setIsAudioPlaying(Boolean(status.playing));

    if (status.didJustFinish) {
      setIsAudioPlaying(false);
      setAudioProgress(1);
      setAudioCurrentTime(duration);
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
          setAudioCurrentTime(0);
        }

        player.play();
        setIsAudioPlaying(true);
        return;
      } catch (error) {
        console.warn("Exercise14 playAudio error", error);
        clearPlayback();
        setAudioProgress(0);
        setAudioCurrentTime(0);
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
    setAudioCurrentTime(0);
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
    const progress = Math.max(0, Math.min(value, 1));
    const duration = audioDuration || estimatedDurationMs / 1000;

    setAudioProgress(progress);
    setAudioCurrentTime(duration * progress);
  };

  const handleAudioSeekComplete = async (value) => {
    const player = ensureAudioPlayer();
    const progress = Math.max(0, Math.min(value, 1));
    const duration = audioDuration || estimatedDurationMs / 1000;
    const seekTime = duration * progress;

    setAudioProgress(progress);
    setAudioCurrentTime(seekTime);

    if (!player) return;

    try {
      await player.seekTo(seekTime);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("Exercise14 seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  const triggerWrongFeedback = () => {
    setResult("wrong");
    Vibration.vibrate(140);
    blinkAnim.setValue(0);

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
    ]).start();
  };

  const handleSelect = (option) => {
    if (isCorrect || isWrong) return;
    setSelected(option);

    if (option === correctOption) {
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

      <Text style={styles.fastTypePrompt}>{formattedPrompt}</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image source={activity.image} style={styles.mediaImage} />
        </View>

        <View style={styles.audioButton}>
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

      <View style={styles.resultBar}>
        <Text
          style={[
            styles.resultBarText,
            isCorrect && styles.resultBarTextCorrect,
            isWrong && styles.resultBarTextWrong,
          ]}
        >
          {selected || " "}
        </Text>
        <View
          style={[
            styles.resultUnderline,
            isCorrect && styles.resultUnderlineCorrect,
            isWrong && styles.resultUnderlineWrong,
          ]}
        />
      </View>

      <View
        style={[
          styles.optionsRow,
          shouldStackOptions && styles.optionsRowStacked,
          stackedOptionsRowStyle,
        ]}
      >
        {answerOptions.map((option) => {
          const optionIsCorrect =
            selected === option && option === correctOption;
          const optionIsWrong = selected === option && option !== correctOption;

          return (
            <Animated.View
              key={option}
              style={[
                styles.optionPill,
                shouldStackOptions && styles.optionPillStacked,
                stackedOptionPillStyle,
                optionIsCorrect && styles.optionCorrect,
                optionIsWrong && isWrong && styles.optionBlinkWrong,
                optionIsWrong &&
                  isWrong && { backgroundColor: wrongBackground },
              ]}
            >
              <TouchableOpacity
                style={[styles.optionPillTouch, stackedOptionTouchStyle]}
                onPress={() => handleSelect(option)}
                disabled={isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.optionText,
                    shouldStackOptions && styles.optionTextStacked,
                    optionIsCorrect && styles.optionCorrectText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
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
                {isWrong ? "X Tente novamente" : "✓ Correto!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {isWrong ? wrongMessage : activity.feedbackMessage}
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

const ex14 = (CORES) =>
  StyleSheet.create({
    mediaWrapper: {
      width: "88%",
      maxWidth: 520,
      marginBottom: 14,
    },
    mediaCard: {
      width: "100%",
      aspectRatio: 16 / 9,
      backgroundColor: CORES.SURFACE_MUTED,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      overflow: "hidden",
    },
    mediaImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    audioButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: CORES.PRIMARY,
      width: "100%",
      height: 48,
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      paddingHorizontal: 16,
      gap: 12,
    },
    audioPlayButton: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    audioIcon: {
      color: CORES.WHITE_SHORT,
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
    },
    audioBar: {
      flex: 1,
      height: 36,
      justifyContent: "center",
    },
    audioSlider: {
      width: "100%",
      height: 36,
    },
    audioProgress: {
      height: 4,
      borderRadius: 4,
      backgroundColor: CORES.WHITE_SHORT,
    },
    resultBar: {
      width: "88%",
      maxWidth: 520,
      minHeight: 46,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    resultBarText: {
      fontSize: 20,
      fontFamily: "serif",
      fontWeight: "500",
      color: CORES.TEXT_DARK,
      textAlign: "center",
      width: "100%",
    },
    resultBarTextCorrect: {
      color: CORES.SUCCESS_TEXT,
    },
    resultBarTextWrong: {
      color: CORES.DANGER_TEXT,
    },
    resultUnderline: {
      width: "55%",
      height: 2,
      marginTop: 2,
      borderRadius: 2,
      backgroundColor: CORES.EX_DISABLED,
    },
    resultUnderlineCorrect: {
      backgroundColor: CORES.SUCCESS,
    },
    resultUnderlineWrong: {
      backgroundColor: CORES.DANGER_FILL,
    },
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
      marginTop: 10,
      width: "88%",
    },
    optionsRowStacked: {
      flexDirection: "column",
      alignItems: "stretch",
      width: "88%",
    },
    optionPill: {
      borderWidth: 1,
      borderColor: CORES.BORDER,
      borderRadius: 20,
      backgroundColor: CORES.SURFACE,
      maxWidth: "100%",
      flexShrink: 1,
    },
    optionPillStacked: {
      width: "100%",
      alignSelf: "stretch",
      maxWidth: "100%",
    },
    optionPillTouch: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    optionText: {
      fontSize: 16,
      fontWeight: "500",
      color: CORES.TEXT,
      textAlign: "center",
      flexShrink: 1,
    },
    optionTextStacked: {
      textAlign: "center",
      width: "100%",
    },
    optionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    optionCorrectText: {
      color: CORES.SUCCESS_TEXT,
      fontWeight: "700",
    },
    optionBlinkWrong: {
      backgroundColor: CORES.DANGER_BG,
      borderColor: CORES.DANGER,
    },
  });

export default ex14;

/*

  {
      component: Exercise14,
      needsSpeech: true,
      activity: {
        prompt: "Escute e complete",
        image: IC.slide1,
        audioSource: require("../../../../mp3/IC/hello.mp3"),
        audioDurationMs: 824,
        answerOptions: ["Hello", "Hélo"],
        correctOption: "Hello",
        successTitle: "Correto",
        feedbackMessage: 'Usamos "Hello" para dizer "oi".',
      },
    },

*/
