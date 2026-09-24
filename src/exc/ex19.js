import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { createAudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";
import { useTheme } from "../theme";

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

export function Exercise19({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
  speak,
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

  const [typedText, setTypedText] = useState("");
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
      900,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  const clearPlayback = () => {
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
        console.warn("Exercise19 playAudio error", error);
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
      console.warn("Exercise19 seekAudio error", error);
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

  const handleSubmit = () => {
    const typed = normalizeText(typedText);
    const expected = normalizeText(activity.correctAnswer || audioPromptText);

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

      <View style={styles.writeAudioBlock}>
        <Text style={styles.writeAudioPrompt}>{activity.prompt}</Text>

        <View style={styles.writeAudioPlayer}>
          <TouchableOpacity
            style={styles.writeAudioPlayButton}
            onPress={playAudio}
            accessibilityRole="button"
            accessibilityLabel={
              isAudioPlaying ? "Pausar audio" : "Reproduzir audio"
            }
          >
            <Text style={styles.writeAudioPlayIcon}>
              {isAudioPlaying ? "II" : "▶"}
            </Text>
          </TouchableOpacity>
          <View style={styles.writeAudioBar}>
            <Slider
              style={styles.writeAudioSlider}
              minimumValue={0}
              maximumValue={1}
              value={audioProgress}
              minimumTrackTintColor={CORES.WHITE_SHORT}
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbTintColor={CORES.WHITE_SHORT}
              onSlidingStart={handleAudioSeekStart}
              onValueChange={handleAudioSeek}
              onSlidingComplete={handleAudioSeekComplete}
              disabled={!activity.audioSource}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.writeAudioInputWrap,
            isWrong && styles.writeAudioInputWrapWrong,
            isCorrect && styles.writeAudioInputWrapCorrect,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          <TextInput
            value={typedText}
            onChangeText={(value) => {
              setTypedText(value);
              if (result) setResult(null);
            }}
            style={styles.writeAudioInput}
            placeholder={activity.placeholder}
            placeholderTextColor={CORES.EX_BLUE_FAINT}
            autoCapitalize="sentences"
            autoCorrect={false}
          />
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.writeAudioSubmitButton,
            !typedText.trim() && styles.writeAudioSubmitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!typedText.trim() || isCorrect || isWrong}
        >
          <Text style={styles.writeAudioSubmitButtonText}>
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
                {isWrong
                  ? activity.errorMessage || activity.successMessage
                  : activity.successMessage}
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
                {isWrong
                  ? activity.wrongButtonLabel || "Próxima Atividade"
                  : activity.nextButtonLabel || "Próxima Atividade"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex19 = (CORES) =>
  StyleSheet.create({
    writeAudioBlock: {
      width: "100%",
      alignItems: "center",
    },
    writeAudioPrompt: {
      width: "88%",
      color: CORES.PRIMARY,
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 18,
    },
    writeAudioPlayer: {
      width: "88%",
      height: 40,
      backgroundColor: CORES.PRIMARY,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      paddingHorizontal: 16,
      gap: 12,
      marginBottom: 28,
    },
    writeAudioPlayIcon: {
      color: CORES.WHITE_SHORT,
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    writeAudioPlayButton: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    writeAudioBar: {
      flex: 1,
      height: 36,
      justifyContent: "center",
    },
    writeAudioSlider: {
      width: "100%",
      height: 36,
    },
    writeAudioInputWrap: {
      width: "58%",
      borderBottomWidth: 1,
      borderBottomColor: CORES.PRIMARY,
      marginBottom: 20,
    },
    writeAudioInputWrapWrong: {
      borderBottomColor: CORES.DANGER,
    },
    writeAudioInputWrapCorrect: {
      borderBottomColor: CORES.SUCCESS,
    },
    writeAudioInput: {
      minHeight: 34,
      color: CORES.PRIMARY,
      fontSize: 13,
      textAlign: "center",
      paddingVertical: 3,
      textDecorationLine: "underline",
      fontFamily: "serif",
    },
    writeAudioSubmitButton: {
      minWidth: 152,
      height: 44,
      borderRadius: 8,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 18,
    },
    writeAudioSubmitButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED,
    },
    writeAudioSubmitButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 15,
      fontWeight: "700",
    },
  });

export default ex19;

/*

  {
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a frase do áudio.",
      audioText: "I am working now.",
      correctAnswer: "I am working now.",
      placeholder: "I am working now.",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase do áudio corretamente.",
      errorMessage: "Ouça o áudio novamente e confira a frase.",
    },
  },

*/
