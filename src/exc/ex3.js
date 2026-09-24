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

export function Exercise3({
  activity,
  styles,
  HeaderComponent,
  next,
  speak,
  onAttempt,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const speechPausedRef = useRef(false);
  const speechProgressTimerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioPromptText =
    activity.audioText || activity.spokenText || activity.correctAnswer || "";
  const audioRate = activity.audioRate || 0.85;

  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      1200,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const wrongMessage = activity.feedbackMessage || activity.successMessage;
  const statementText =
    activity.statement || activity.dialogue || activity.textOnScreen || "";
  const correctMessage =
    activity.successMessage ||
    activity.feedbackMessage ||
    (statementText ? `Resposta correta para: ${statementText}` : "");

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  const clearPlayback = () => {
    if (speechProgressTimerRef.current) {
      clearInterval(speechProgressTimerRef.current);
      speechProgressTimerRef.current = null;
    }

    if (playbackSubscriptionRef.current) {
      playbackSubscriptionRef.current.remove();
      playbackSubscriptionRef.current = null;
    }

    if (playerRef.current) {
      playerRef.current.remove();
      playerRef.current = null;
    }

    shouldResumeAfterSeekRef.current = false;
    speechPausedRef.current = false;
    Speech.stop().catch(() => {});
    setIsAudioPlaying(false);
  };

  const getSpeechTextFromProgress = (progress) => {
    if (!audioPromptText) return "";

    const safeProgress = Math.max(0, Math.min(progress, 0.98));
    const startIndex = Math.floor(audioPromptText.length * safeProgress);
    const previousSpace = audioPromptText.lastIndexOf(" ", startIndex);
    const sliceIndex = previousSpace > 0 ? previousSpace + 1 : startIndex;
    const nextText = audioPromptText.slice(sliceIndex).trimStart();

    return nextText || audioPromptText;
  };

  const startSpeechProgress = (fromProgress = 0) => {
    if (speechProgressTimerRef.current) {
      clearInterval(speechProgressTimerRef.current);
    }

    const safeProgress = Math.max(0, Math.min(fromProgress, 1));
    const startedAt = Date.now() - safeProgress * estimatedDurationMs;

    setAudioDuration(estimatedDurationMs / 1000);
    setAudioProgress(safeProgress);

    speechProgressTimerRef.current = setInterval(() => {
      const progress = Math.max(
        safeProgress,
        Math.min((Date.now() - startedAt) / estimatedDurationMs, 1),
      );

      setAudioProgress(progress);

      if (progress >= 1) {
        clearInterval(speechProgressTimerRef.current);
        speechProgressTimerRef.current = null;
        speechPausedRef.current = false;
        setIsAudioPlaying(false);
      }
    }, 100);
  };

  const stopSpeechProgress = () => {
    if (speechProgressTimerRef.current) {
      clearInterval(speechProgressTimerRef.current);
      speechProgressTimerRef.current = null;
    }
  };

  const playSpeechFromProgress = async (progress = audioProgress) => {
    if (!speak || !audioPromptText) {
      setIsAudioPlaying(false);
      return;
    }

    const safeProgress = Math.max(0, Math.min(progress, 0.98));
    await Speech.stop().catch(() => {});
    speechPausedRef.current = false;
    startSpeechProgress(safeProgress);
    setIsAudioPlaying(true);

    speak({
      text: getSpeechTextFromProgress(safeProgress),
      language: activity.audioLanguage || "en-US",
      rate: audioRate,
      onDone: () => {
        stopSpeechProgress();
        setAudioProgress(1);
        speechPausedRef.current = false;
        setIsAudioPlaying(false);
      },
      onStopped: () => {
        stopSpeechProgress();
        setIsAudioPlaying(false);
      },
      onError: () => {
        stopSpeechProgress();
        setIsAudioPlaying(false);
      },
    });
  };

  useEffect(() => {
    return () => {
      clearPlayback();
    };
  }, []);

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
        console.warn("Exercise3 playAudio error", error);
        clearPlayback();
        setAudioProgress(0);
      }
    }

    if (isAudioPlaying) {
      stopSpeechProgress();
      await Speech.stop().catch(() => {});
      speechPausedRef.current = true;
      setIsAudioPlaying(false);
      return;
    }

    if (speechPausedRef.current) {
      await playSpeechFromProgress(audioProgress);
      return;
    }

    await playSpeechFromProgress(0);
  };

  const handleAudioSeekStart = () => {
    shouldResumeAfterSeekRef.current = isAudioPlaying;
    playerRef.current?.pause?.();
    stopSpeechProgress();
    if (!activity.audioSource) {
      Speech.stop().catch(() => {});
    }
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

    if (!activity.audioSource) {
      if (shouldResumeAfterSeekRef.current) {
        await playSpeechFromProgress(progress);
      } else {
        speechPausedRef.current = progress > 0 && progress < 1;
      }

      shouldResumeAfterSeekRef.current = false;
      return;
    }

    if (!player) return;

    try {
      await player.seekTo(duration * progress);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("Exercise3 seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  const triggerWrongFeedback = () => {
    if (onAttempt) {
      onAttempt({ isCorrect: false });
    }
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
      if (onAttempt) {
        onAttempt({ isCorrect: true });
      }
      setResult("correct");
      return;
    }

    triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.listenAnswerBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.listenAnswerMediaWrapper}>
          <View style={styles.listenAnswerMediaCard}>
            <Image source={activity.image} style={styles.listenAnswerImage} />
          </View>

          <View style={styles.listenAnswerAudioButton}>
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
                disabled={!activity.audioSource && !audioPromptText}
              />
            </View>
          </View>
        </View>

        {!!statementText && (
          <Text style={styles.listenAnswerDialogue}>{statementText}</Text>
        )}

        <View style={styles.listenAnswerOptionsRow}>
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
                  styles.listenAnswerOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.listenAnswerOption,
                    optionIsCorrect && styles.listenAnswerOptionCorrect,
                    optionIsWrong && styles.listenAnswerOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.listenAnswerOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect || isWrong}
                  >
                    <Text
                      style={[
                        styles.listenAnswerOptionText,
                        optionIsCorrect && styles.listenAnswerOptionTextCorrect,
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
              styles.slide4SuccessAlertCard,
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
                {isWrong ? wrongMessage : correctMessage}
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

const ex3 = (CORES) =>
  StyleSheet.create({
    listenAnswerBlock: {
      width: "100%",
      alignItems: "center",
    },
    listenAnswerDialogue: {
      width: "88%",
      textAlign: "center",
      fontSize: 16,
      lineHeight: 22,
      color: CORES.PRIMARY,
      fontWeight: "700",
      marginBottom: 16,
    },
    listenAnswerOptionsRow: {
      flexDirection: "row",
      gap: 12,
    },
    listenAnswerOptionWrap: {
      minWidth: 86,
    },
    listenAnswerOption: {
      height: 40,
      minWidth: 86,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
    },
    listenAnswerOptionTouch: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    listenAnswerOptionText: {
      fontSize: 16,
      color: CORES.TEXT_MUTED,
      fontWeight: "600",
    },
    listenAnswerOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    listenAnswerOptionWrong: {
      borderColor: CORES.DANGER,
    },
    listenAnswerOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
    },
    slide4SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex3;
/*
  {
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: IC.A4S8,
      audioSource: require("../../../../mp3/IC/A4S9.mp3"),
      audioDurationMs: 2000,
      dialogue: "He wakes up at 6am every day.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      successMessage: 'A frase "He wakes up at 6am every day." esta correta.',
    },
  },
  */
