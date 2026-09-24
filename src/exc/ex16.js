import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import {
  createAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { useTheme } from "../theme";
import { Images } from "../util/images";
import { enviarArquivo } from "../services/arquivos";
import { criarPostAudio } from "../services/comunidade";
import { getSlidePostId, markSlidePosted } from "../util/exercisePosts";

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function Exercise16({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
  slideKey,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [audioUri, setAudioUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";
  const hasTip =
    typeof activity?.tipText === "string" && activity.tipText.trim().length > 0;
  const hasRecordedAudio = Boolean(audioUri) && !isRecording;

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.SURFACE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    return () => {
      if (playbackSubscriptionRef.current) {
        playbackSubscriptionRef.current.remove();
      }

      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (isCorrect) {
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
  }, [isCorrect, alertOpacity, alertTranslateY]);

  useEffect(() => {
    if (!isRecording || isRecordingPaused) return undefined;

    const interval = setInterval(() => {
      setRecordingSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, isRecordingPaused]);

  const triggerWrongFeedback = () => {
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
    setIsPlaying(false);
  };

  const updatePlaybackStatus = (status) => {
    if (status.didJustFinish || !status.isLoaded) {
      setIsPlaying(false);
      setPlaybackProgress(status.didJustFinish ? 1 : 0);
      return;
    }

    setIsPlaying(Boolean(status.playing));
    const duration =
      typeof status.duration === "number" && status.duration > 0
        ? status.duration
        : recordingSeconds;
    const progress = duration > 0 ? status.currentTime / duration : 0;

    setPlaybackDuration(duration);
    setPlaybackProgress(Math.max(0, Math.min(progress, 1)));
  };

  const ensurePlaybackPlayer = () => {
    if (playerRef.current || !audioUri) {
      return playerRef.current;
    }

    const player = createAudioPlayer(
      { uri: audioUri },
      {
        updateInterval: 100,
      },
    );
    playbackSubscriptionRef.current = player.addListener(
      "playbackStatusUpdate",
      updatePlaybackStatus,
    );
    playerRef.current = player;

    return player;
  };

  const startRecording = async () => {
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        Alert.alert("PermissÃ£o negada", "Permita o uso do microfone.");
        return;
      }

      clearPlayback();

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await recorder.prepareToRecordAsync();
      recorder.record();
      setAudioUri(null);
      setIsRecording(true);
      setIsRecordingPaused(false);
      setRecordingSeconds(0);
      setPlaybackProgress(0);
      setPlaybackDuration(0);
      setResult(null);
    } catch (error) {
      console.warn("startRecording error", error);
      Alert.alert("Erro", "NÃ£o foi possÃ­vel iniciar a gravaÃ§Ã£o.");
    }
  };

  const pauseActiveRecording = async () => {
    try {
      if (!isRecording || isRecordingPaused) return;

      recorder.pause();
      setIsRecordingPaused(true);
    } catch (error) {
      console.warn("pauseActiveRecording error", error);
      Alert.alert("Erro", "NÃ£o foi possÃ­vel pausar a gravaÃ§Ã£o.");
    }
  };

  const resumeRecording = async () => {
    try {
      if (!isRecording || !isRecordingPaused) return;

      recorder.record();
      setIsRecordingPaused(false);
    } catch (error) {
      console.warn("resumeRecording error", error);
      Alert.alert("Erro", "NÃ£o foi possÃ­vel retomar a gravaÃ§Ã£o.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!isRecording) return;

      await recorder.stop();
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      const uri = recorder.uri ?? recorder.getStatus().url;

      if (!uri) {
        throw new Error("Recording URI not available");
      }

      setAudioUri(uri);
      setIsRecording(false);
      setIsRecordingPaused(false);
    } catch (error) {
      console.warn("stopRecording error", error);
      Alert.alert("Erro", "NÃ£o foi possÃ­vel salvar a gravaÃ§Ã£o.");
    }
  };

  const playRecording = async () => {
    try {
      if (!audioUri) return;

      const player = ensurePlaybackPlayer();
      if (!player) return;

      if (playbackProgress >= 0.995) {
        await player.seekTo(0);
        setPlaybackProgress(0);
      }

      player.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn("playRecording error", error);
      Alert.alert("Erro", "NÃ£o foi possÃ­vel reproduzir o Ã¡udio.");
    }
  };

  const handlePlaybackSeekStart = () => {
    shouldResumeAfterSeekRef.current = isPlaying;
    playerRef.current?.pause?.();
    setIsPlaying(false);
  };

  const handlePlaybackSeek = (value) => {
    setPlaybackProgress(Math.max(0, Math.min(value, 1)));
  };

  const handlePlaybackSeekComplete = async (value) => {
    const player = ensurePlaybackPlayer();
    const progress = Math.max(0, Math.min(value, 1));
    const duration = playbackDuration || recordingSeconds;

    setPlaybackProgress(progress);

    if (!player || duration <= 0) return;

    try {
      await player.seekTo(duration * progress);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn("seekPlayback error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  const pausePlayback = async () => {
    try {
      if (!playerRef.current) return;
      playerRef.current.pause();
      setIsPlaying(false);
    } catch (error) {
      console.warn("pausePlayback error", error);
    }
  };

  const resetRecording = async () => {
    if (isRecording) {
      await recorder.stop().catch(() => {});
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      }).catch(() => {});
    }

    clearPlayback();
    setAudioUri(null);
    setIsRecording(false);
    setIsRecordingPaused(false);
    setRecordingSeconds(0);
    setPlaybackProgress(0);
    setPlaybackDuration(0);
    setResult(null);
  };

  const handleSubmit = () => {
    if (!audioUri) {
      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
      return;
    }

    onAttempt?.({ isCorrect: true });
    setResult("correct");
    postAudioToCommunity(audioUri, recordingSeconds);
  };

  const postAudioToCommunity = async (uri, duracaoSegundos) => {
    try {
      const jaPostado = await getSlidePostId(slideKey);
      if (jaPostado) return;

      const arquivo = await enviarArquivo(uri, {
        tipo: "audio",
        mimeType: "audio/m4a",
        duracaoSegundos,
      });
      if (!arquivo?.id) {
        throw new Error("Upload de audio nao retornou um id.");
      }

      const aulaPrompt = [activity.instruction, activity.helperText]
        .filter((parte) => typeof parte === "string" && parte.trim().length > 0)
        .join("\n")
        .slice(0, 1000);
      const novo = await criarPostAudio(arquivo.id, {
        origem: "exercicio16",
        aulaPrompt,
      });
      if (novo?.id != null) {
        await markSlidePosted(slideKey, novo.id);
      }
    } catch (error) {
      console.error(
        "[ex16] falha ao publicar audio na comunidade:",
        error?.status,
        error?.message,
        error
      );
    }
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <Animated.View style={[styles.sendAudioBlock]}>
        <Text style={styles.sendAudioPrompt}>{activity.prompt}</Text>
        <Text style={styles.sendAudioInstruction}>{activity.instruction}</Text>
        <Text style={styles.sendAudioHelperText}>{activity.helperText}</Text>

        <Animated.View
          style={[
            styles.sendAudioContentCard,
            result === "wrong" && styles.sendAudioContentCardWrong,
            result === "wrong" && { backgroundColor: wrongBackground },
          ]}
        >
          <View style={styles.sendAudioAvatarWrap}>
            <Image source={activity.image} style={styles.sendAudioAvatar} />
          </View>

          {hasTip && (
            <TouchableOpacity
              style={styles.sendAudioTipButton}
              onPress={() => setShowTip((current) => !current)}
            >
              <Text style={styles.sendAudioTipButtonText}>
                {activity.tipButtonLabel}
              </Text>
            </TouchableOpacity>
          )}

          {hasTip && showTip && (
            <View style={styles.sendAudioTipCard}>
              <Text style={styles.sendAudioTipText}>{activity.tipText}</Text>
            </View>
          )}

          <View style={styles.sendAudioControls}>
            <View style={styles.sendAudioControlsRow}>
              <TouchableOpacity
                style={[
                  styles.sendAudioMiniActionButton,
                  styles.sendAudioMiniActionButtonDanger,
                  !hasRecordedAudio && styles.sendAudioMiniActionButtonDisabled,
                ]}
                onPress={resetRecording}
                disabled={!hasRecordedAudio}
              >
                <Text style={styles.sendAudioMiniActionButtonText}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sendAudioRecordButton,
                  isRecording && styles.sendAudioStopButton,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <Text style={styles.sendAudioRecordIcon}>■</Text>
                ) : (
                  <Image
                    source={Images.microfone}
                    style={styles.sendAudioRecordImage}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sendAudioMiniActionButton,
                  styles.sendAudioMiniActionButtonPause,
                  !isRecording && styles.sendAudioMiniActionButtonDisabled,
                ]}
                onPress={
                  isRecording
                    ? isRecordingPaused
                      ? resumeRecording
                      : pauseActiveRecording
                    : undefined
                }
                disabled={!isRecording}
              >
                <Text style={styles.sendAudioMiniActionButtonText}>
                  {isRecordingPaused ? "REC" : "||"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sendAudioRecordLabel}>
              {isRecording
                ? isRecordingPaused
                  ? "Pausado"
                  : activity.stopLabel
                : activity.recordLabel}
            </Text>
          </View>

          <View style={styles.sendAudioToolbar}>
            <TouchableOpacity
              style={[
                styles.sendAudioPlaybackChip,
                styles.sendAudioPlaybackChipAccent,
                !hasRecordedAudio && styles.sendAudioPlaybackChipDisabled,
              ]}
              onPress={
                hasRecordedAudio
                  ? isPlaying
                    ? pausePlayback
                    : playRecording
                  : undefined
              }
              disabled={!hasRecordedAudio}
            >
              <Text style={styles.sendAudioPlaybackChipText}>
                {isPlaying ? "||" : "▶"}
              </Text>
            </TouchableOpacity>

            <View style={styles.sendAudioToolbarMain}>
              <View style={styles.sendAudioToolbarTopRow}>
                <View
                  style={[
                    styles.sendAudioRecordingDot,
                    isRecordingPaused && styles.sendAudioRecordingDotPaused,
                    !isRecording &&
                      !hasRecordedAudio &&
                      styles.sendAudioRecordingDotIdle,
                  ]}
                />
                <Text style={styles.sendAudioToolbarTime}>
                  {formatDuration(recordingSeconds)}
                </Text>
              </View>

              <View style={styles.sendAudioProgressTrack}>
                <Slider
                  style={styles.sendAudioProgressSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={playbackProgress}
                  minimumTrackTintColor={CORES.WHITE}
                  maximumTrackTintColor="rgba(255,255,255,0.3)"
                  thumbTintColor={CORES.WHITE}
                  onSlidingStart={handlePlaybackSeekStart}
                  onValueChange={handlePlaybackSeek}
                  onSlidingComplete={handlePlaybackSeekComplete}
                  disabled={!hasRecordedAudio}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.sendAudioToolbarPrimaryButton,
                !hasRecordedAudio &&
                  styles.sendAudioToolbarPrimaryButtonDisabled,
              ]}
              onPress={hasRecordedAudio ? handleSubmit : undefined}
              disabled={!hasRecordedAudio}
            >
              <Text style={styles.sendAudioToolbarPrimaryButtonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
              styles.slide16SuccessAlertCard,
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
                Muito bem!
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

const ex16 = (CORES) =>
  StyleSheet.create({
    sendAudioBlock: {
      width: "100%",
      alignItems: "center",
    },
    sendAudioPrompt: {
      width: "88%",
      textAlign: "left",
      fontSize: 22,
      color: CORES.EX_BLUE,
      marginBottom: 6,
      fontWeight: "700",
    },
    sendAudioInstruction: {
      width: "88%",
      textAlign: "left",
      fontSize: 15,
      color: CORES.SUCCESS_TEXT,
      fontWeight: "700",
    },
    sendAudioHelperText: {
      width: "88%",
      textAlign: "left",
      fontSize: 14,
      color: CORES.SUCCESS_TEXT,
      marginBottom: 18,
    },
    sendAudioAvatarWrap: {
      width: 78,
      height: 78,
      borderRadius: 39,
      overflow: "hidden",
      marginBottom: 14,
    },
    sendAudioAvatar: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    sendAudioContentCard: {
      width: "88%",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 14,
    },
    sendAudioContentCardWrong: {
      borderColor: CORES.DANGER,
    },
    sendAudioTipButton: {
      minWidth: 102,
      minHeight: 34,
      borderRadius: 17,
      borderWidth: 1.5,
      borderColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      paddingHorizontal: 14,
    },
    sendAudioTipButtonText: {
      color: CORES.EX_BLUE,
      fontSize: 14,
    },
    sendAudioTipCard: {
      width: "88%",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      padding: 12,
      marginBottom: 16,
    },
    sendAudioTipText: {
      color: CORES.TEXT_DARK,
      fontSize: 14,
      textAlign: "left",
    },
    sendAudioToolbar: {
      width: "100%",
      minHeight: 68,
      borderRadius: 24,
      backgroundColor: CORES.PRIMARY,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 8,
      paddingVertical: 8,
      gap: 8,
      marginTop: 8,
    },
    sendAudioToolbarSideButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    sendAudioToolbarSideButtonText: {
      color: CORES.TEXT_FAINT,
      fontSize: 15,
      fontWeight: "800",
    },
    sendAudioToolbarMain: {
      flex: 1,
      paddingHorizontal: 4,
    },
    sendAudioToolbarTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    sendAudioRecordingDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: CORES.DANGER_FILL,
    },
    sendAudioRecordingDotPaused: {
      backgroundColor: CORES.GOLD,
    },
    sendAudioRecordingDotIdle: {
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    sendAudioToolbarMicImage: {
      width: 18,
      height: 18,
      resizeMode: "contain",
      tintColor: CORES.TEXT_FAINT,
    },
    sendAudioPlaybackChip: {
      minWidth: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: "rgba(255,255,255,0.08)",
      alignItems: "center",
      justifyContent: "center",
    },
    sendAudioPlaybackChipAccent: {
      backgroundColor: CORES.SECONDARY,
    },
    sendAudioPlaybackChipDisabled: {
      backgroundColor: "rgba(255,255,255,0.14)",
    },
    sendAudioPlaybackChipText: {
      color: CORES.WHITE,
      fontSize: 12,
      fontWeight: "800",
    },
    sendAudioToolbarTime: {
      color: CORES.ON_ACCENT,
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: 0.4,
    },
    sendAudioProgressTrack: {
      width: "100%",
      height: 28,
      justifyContent: "center",
    },
    sendAudioProgressSlider: {
      width: "100%",
      height: 28,
    },
    sendAudioToolbarPauseButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: "rgba(255,255,255,0.08)",
      alignItems: "center",
      justifyContent: "center",
    },
    sendAudioToolbarPauseButtonText: {
      color: CORES.DANGER_TEXT,
      fontSize: 11,
      fontWeight: "800",
    },
    sendAudioToolbarPrimaryButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.SECONDARY,
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 4,
    },
    sendAudioToolbarPrimaryButtonStop: {
      backgroundColor: CORES.SUCCESS,
    },
    sendAudioToolbarPrimaryButtonIdle: {
      backgroundColor: CORES.EX_BLUE,
    },
    sendAudioToolbarPrimaryButtonText: {
      color: CORES.WHITE,
      fontSize: 16,
      fontWeight: "900",
    },
    sendAudioToolbarPrimaryButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED_DEEP,
      shadowColor: CORES.EX_DISABLED_DEEP,
    },
    sendAudioToolbarPrimaryImage: {
      width: 28,
      height: 28,
      resizeMode: "contain",
    },
    sendAudioControls: {
      alignItems: "center",
      marginBottom: 14,
    },
    sendAudioControlsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
    },
    sendAudioRecordButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.EX_BLUE,
      shadowOpacity: 0.18,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 4,
    },
    sendAudioStopButton: {
      backgroundColor: CORES.DANGER_FILL,
      shadowColor: CORES.DANGER,
    },
    sendAudioRecordIcon: {
      color: CORES.WHITE,
      fontSize: 20,
      fontWeight: "700",
    },
    sendAudioRecordImage: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },
    sendAudioRecordLabel: {
      color: CORES.EX_BLUE,
      fontSize: 16,
      marginTop: 8,
    },
    sendAudioActionsRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 14,
      alignItems: "center",
    },
    sendAudioMiniActionButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: "center",
      justifyContent: "center",
    },
    sendAudioMiniActionButtonDanger: {
      backgroundColor: CORES.DANGER_FILL,
    },
    sendAudioMiniActionButtonPause: {
      backgroundColor: CORES.GOLD,
    },
    sendAudioMiniActionButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED_DEEP,
    },
    sendAudioMiniActionButtonText: {
      color: CORES.WHITE,
      fontSize: 13,
      fontWeight: "800",
    },
    sendAudioActionButton: {
      minWidth: 96,
      minHeight: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
    },
    sendAudioActionButtonText: {
      color: CORES.EX_BLUE,
      fontSize: 14,
    },
    sendAudioSubmitButton: {
      minWidth: 132,
      minHeight: 42,
      borderRadius: 21,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    sendAudioSubmitButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED,
    },
    sendAudioSubmitButtonText: {
      color: CORES.WHITE,
      fontSize: 15,
      fontWeight: "700",
    },
    slide16SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex16;

/* 

  {
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "(Use as frases estudadas anteriormente)",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hello, my name is Ana. I am from Brazil. I am fine.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Seu áudio foi gravado com sucesso.",
    },
  },

*/
