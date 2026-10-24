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

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

// `text` pode vir como string (paragrafos separados por linha em branco, do
// jeito que vem do roteiro) ou ja como array de paragrafos.
function getParagraphs(text) {
  if (Array.isArray(text)) return text.filter(Boolean);

  return String(text || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// Toca o `audioSource` gravado da historia; sem audio gravado, cai pro TTS
// lendo o proprio texto (sem seek nesse caso, igual ao ListenOnlySlide).
function useStoryAudio(activity, spokenText) {
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const fallbackDuration = (activity.audioDurationMs || 0) / 1000;

  const clearPlayback = () => {
    if (playbackSubscriptionRef.current) {
      playbackSubscriptionRef.current.remove();
      playbackSubscriptionRef.current = null;
    }

    if (playerRef.current) {
      // No Android o remove() so tira o player do mapa do modulo e o audio
      // segue tocando; o release() (o mesmo que o useAudioPlayer usa) e que
      // solta o player nativo. O pause() antes corta o som na hora.
      playerRef.current.pause();
      playerRef.current.release();
      playerRef.current = null;
    }

    shouldResumeAfterSeekRef.current = false;
    Speech.stop().catch(() => {});
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearPlayback();
    };
  }, []);

  const updateAudioStatus = (status) => {
    if (!status?.isLoaded) {
      setIsAudioPlaying(false);
      return;
    }

    const duration =
      typeof status.duration === "number" && status.duration > 0
        ? status.duration
        : fallbackDuration;
    const currentTime =
      typeof status.currentTime === "number" ? status.currentTime : 0;
    const progress = duration > 0 ? currentTime / duration : 0;

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
    if (!activity.audioSource) {
      if (isAudioPlaying) {
        clearPlayback();
        return;
      }

      setAudioProgress(0);
      setIsAudioPlaying(true);
      Speech.speak(spokenText, {
        language: activity.audioLanguage || "en-US",
        rate: activity.audioRate || 0.85,
        onDone: () => {
          setAudioProgress(1);
          setIsAudioPlaying(false);
        },
        onStopped: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false),
      });
      return;
    }

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
    } catch (error) {
      console.warn("Exercise21 playAudio error", error);
      clearPlayback();
      setAudioProgress(0);
    }
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

    setAudioProgress(progress);

    if (!player) return;

    try {
      await player.seekTo((player.duration || fallbackDuration) * progress);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("Exercise21 seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  return {
    isAudioPlaying,
    audioProgress,
    playAudio,
    clearPlayback,
    handleAudioSeekStart,
    handleAudioSeek,
    handleAudioSeekComplete,
  };
}

// Tela 1: imagem, audio e o texto da historia. O texto so existe aqui - a
// tela de perguntas e outro componente, entao o aluno responde sem consulta.
function StoryReading({ activity, styles, HeaderComponent, onFinishReading }) {
  const CORES = useTheme();
  const paragraphs = getParagraphs(activity.text);
  const audio = useStoryAudio(activity, paragraphs.join(" "));
  const hasQuestions = (activity.questions || []).length > 0;

  const handleFinishReading = () => {
    audio.clearPlayback();
    onFinishReading();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.storyBlock}>
        <View style={styles.listenAnswerMediaWrapper}>
          <View style={styles.listenAnswerMediaCard}>
            <Image source={activity.image} style={styles.listenAnswerImage} />
          </View>

          <View style={styles.listenAnswerAudioButton}>
            <TouchableOpacity
              style={styles.audioPlayButton}
              onPress={audio.playAudio}
              accessibilityRole="button"
              accessibilityLabel={
                audio.isAudioPlaying ? "Pausar audio" : "Ouvir a história"
              }
            >
              <Text style={styles.audioIcon}>
                {audio.isAudioPlaying ? "II" : "▶"}
              </Text>
            </TouchableOpacity>
            <View style={styles.audioBar}>
              <Slider
                style={styles.audioSlider}
                minimumValue={0}
                maximumValue={1}
                value={audio.audioProgress}
                minimumTrackTintColor={CORES.WHITE_SHORT}
                maximumTrackTintColor="rgba(255,255,255,0.35)"
                thumbTintColor={CORES.WHITE_SHORT}
                onSlidingStart={audio.handleAudioSeekStart}
                onValueChange={audio.handleAudioSeek}
                onSlidingComplete={audio.handleAudioSeekComplete}
                disabled={!activity.audioSource}
              />
            </View>
          </View>
        </View>

        <View style={styles.storyTextCard}>
          {!!activity.title && (
            <Text style={styles.storyTitle}>{activity.title}</Text>
          )}
          {paragraphs.map((paragraph, index) => (
            <Text
              key={`paragraph-${index}`}
              style={[
                styles.storyParagraph,
                index === paragraphs.length - 1 && styles.storyParagraphLast,
              ]}
            >
              {paragraph}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={styles.storyPrimaryButton}
          onPress={handleFinishReading}
          activeOpacity={0.9}
        >
          <Text style={styles.storyPrimaryButtonText}>
            {hasQuestions
              ? activity.questionsLabel || "Questions"
              : activity.continueLabel || "Continuar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Tela 2: uma pergunta por vez. Cada resposta vai pro onAttempt com o seu
// proprio `trackingSuffix`, pra que o erro de uma pergunta nao seja apagado
// pelo acerto da seguinte no registro de erros (ver LessonScreen).
function StoryQuestions({ activity, styles, HeaderComponent, next, onAttempt }) {
  const bottomSafeSpace = 3;
  const questions = activity.questions;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);

  const question = questions[questionIndex];
  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === question.correctAnswer;
  const isWrong = isAnswered && !isCorrect;
  const isLastQuestion = questionIndex === questions.length - 1;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  useEffect(() => {
    alertTranslateY.setValue(64);
    alertOpacity.setValue(0);
    if (!isAnswered) return;

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
  }, [isAnswered, questionIndex, alertOpacity, alertTranslateY]);

  const handleSelect = (option) => {
    if (isAnswered) return;

    const answeredCorrectly = option === question.correctAnswer;
    setSelected(option);
    setResults((current) => [...current, answeredCorrectly]);
    onAttempt?.({
      isCorrect: answeredCorrectly,
      trackingSuffix: `q${questionIndex + 1}`,
    });

    if (answeredCorrectly) return;

    Vibration.vibrate(140);
    shakeAnim.setValue(0);
    Animated.timing(shakeAnim, {
      toValue: 1,
      duration: 480,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      next();
      return;
    }

    setSelected(null);
    setQuestionIndex((current) => current + 1);
  };

  const feedbackMessage =
    question.feedbackMessage ||
    `A resposta correta é "${question.correctAnswer}".`;

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.storyBlock}>
        <Text style={styles.fastTypePrompt}>
          {activity.questionsTitle || "Check your understanding"}
        </Text>

        <View style={styles.storyQuestionProgressRow}>
          <Text style={styles.storyQuestionCounter}>
            Question {questionIndex + 1} of {questions.length}
          </Text>
          <View style={styles.storyQuestionSteps}>
            {questions.map((_, index) => (
              <View
                key={`step-${index}`}
                style={[
                  styles.storyQuestionStep,
                  index === questionIndex && styles.storyQuestionStepCurrent,
                  results[index] === true && styles.storyQuestionStepCorrect,
                  results[index] === false && styles.storyQuestionStepWrong,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.storyQuestionCard}>
          <Text style={styles.storyQuestionText}>{question.question}</Text>
        </View>

        <View style={styles.storyOptionsList}>
          {question.options.map((option, index) => {
            const optionIsAnswer = option === question.correctAnswer;
            const optionIsSelected = option === selected;
            // Ao errar, a alternativa certa tambem acende em verde: o aluno
            // nao volta mais pro texto, entao e aqui que ele ve a resposta.
            const showCorrect = isAnswered && optionIsAnswer;
            const showWrong = isWrong && optionIsSelected;

            return (
              <Animated.View
                key={option}
                style={
                  showWrong
                    ? { transform: [{ translateX: shakeTranslateX }] }
                    : null
                }
              >
                <TouchableOpacity
                  style={[
                    styles.storyOption,
                    showCorrect && styles.storyOptionCorrect,
                    showWrong && styles.storyOptionWrong,
                  ]}
                  onPress={() => handleSelect(option)}
                  activeOpacity={0.9}
                  disabled={isAnswered}
                >
                  <View
                    style={[
                      styles.storyOptionLetter,
                      showCorrect && styles.storyOptionLetterCorrect,
                      showWrong && styles.storyOptionLetterWrong,
                    ]}
                  >
                    <Text
                      style={[
                        styles.storyOptionLetterText,
                        (showCorrect || showWrong) &&
                          styles.storyOptionLetterTextAnswered,
                      ]}
                    >
                      {OPTION_LETTERS[index]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.storyOptionText,
                      showCorrect && styles.storyOptionTextCorrect,
                      showWrong && styles.storyOptionTextWrong,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {isAnswered && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              isCorrect
                ? styles.resultAlertCardCorrect
                : styles.resultAlertCardWrong,
              styles.storySuccessAlertCard,
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
                {isWrong ? "X Não foi dessa vez" : "✓ Muito bem!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>{feedbackMessage}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.alertContinueButton,
                isWrong && styles.resultAlertButtonWrong,
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.alertContinueButtonText}>
                {isLastQuestion ? "Próxima atividade" : "Próxima pergunta"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

export function Exercise21(props) {
  const { activity, next, onAttempt } = props;
  const [showQuestions, setShowQuestions] = useState(false);
  const hasQuestions = (activity.questions || []).length > 0;

  const handleFinishReading = () => {
    if (hasQuestions) {
      setShowQuestions(true);
      return;
    }

    // Historia sem perguntas funciona como o Tip (Exercise17): so leitura.
    onAttempt?.({
      isCorrect: true,
      correctDelta: 0,
      totalDelta: 0,
      exerciseAccuracy: 100,
    });
    next();
  };

  if (showQuestions) {
    return <StoryQuestions {...props} />;
  }

  return <StoryReading {...props} onFinishReading={handleFinishReading} />;
}

const ex21 = (CORES) =>
  StyleSheet.create({
    storyBlock: {
      width: "100%",
      alignItems: "center",
      paddingBottom: 24,
    },
    storyTextCard: {
      width: "88%",
      maxWidth: 520,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginTop: 6,
    },
    storyTitle: {
      color: CORES.PRIMARY,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 12,
    },
    storyParagraph: {
      color: CORES.TEXT,
      fontSize: 17,
      lineHeight: 27,
      marginBottom: 14,
    },
    storyParagraphLast: {
      marginBottom: 0,
    },
    storyPrimaryButton: {
      width: "88%",
      maxWidth: 520,
      height: 50,
      borderRadius: 14,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    storyPrimaryButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 18,
      fontWeight: "700",
    },
    storyQuestionProgressRow: {
      width: "88%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    storyQuestionCounter: {
      color: CORES.TEXT_MUTED,
      fontSize: 14,
      fontWeight: "700",
    },
    storyQuestionSteps: {
      flexDirection: "row",
      gap: 6,
    },
    storyQuestionStep: {
      width: 22,
      height: 6,
      borderRadius: 3,
      backgroundColor: CORES.BORDER_LIGHT,
    },
    storyQuestionStepCurrent: {
      backgroundColor: CORES.EX_BLUE,
    },
    storyQuestionStepCorrect: {
      backgroundColor: CORES.SUCCESS,
    },
    storyQuestionStepWrong: {
      backgroundColor: CORES.DANGER,
    },
    storyQuestionCard: {
      width: "88%",
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.EX_BLUE_BG_SOFT,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 18,
      marginBottom: 16,
    },
    storyQuestionText: {
      color: CORES.TEXT,
      fontSize: 18,
      lineHeight: 26,
      fontWeight: "700",
    },
    storyOptionsList: {
      width: "88%",
      gap: 10,
    },
    storyOption: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 12,
    },
    storyOptionCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
      borderColor: CORES.SUCCESS,
    },
    storyOptionWrong: {
      backgroundColor: CORES.DANGER_BG,
      borderColor: CORES.DANGER,
    },
    storyOptionLetter: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
    },
    storyOptionLetterCorrect: {
      backgroundColor: CORES.SUCCESS,
      borderColor: CORES.SUCCESS,
    },
    storyOptionLetterWrong: {
      backgroundColor: CORES.DANGER,
      borderColor: CORES.DANGER,
    },
    storyOptionLetterText: {
      color: CORES.PRIMARY,
      fontSize: 14,
      fontWeight: "800",
    },
    storyOptionLetterTextAnswered: {
      color: CORES.WHITE_SHORT,
    },
    storyOptionText: {
      flex: 1,
      color: CORES.TEXT,
      fontSize: 16,
    },
    storyOptionTextCorrect: {
      color: CORES.SUCCESS_DARK,
      fontWeight: "700",
    },
    storyOptionTextWrong: {
      color: CORES.DANGER_TEXT,
      fontWeight: "700",
    },
    storySuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex21;

/*
  Historia + perguntas. O tamanho do texto e o numero de perguntas sao
  livres: aulas mais avancadas so trazem um `text` maior e mais `questions`.

  {
    component: "Exercise21",
    activity: {
      image: ICA1.Hi01,
      audioSource: require("../../../../../mp3/IC/A0-A1/Hi01.mp3"),
      audioDurationMs: 22909, // opcional, so usado ate o player carregar
      title: "Alex's Saturday", // opcional
      text: `Hi! My name is Alex. I'm 22 years old. I live in New York.

On Saturdays, I go to the park with my friend, Emma.`,
      questionsLabel: "Questions", // opcional (texto do botao da 1a tela)
      questionsTitle: "Check your understanding", // opcional
      questions: [
        {
          question: "How old is Alex?",
          options: ["20 years old.", "22 years old.", "25 years old."],
          correctAnswer: "22 years old.",
          feedbackMessage: 'Na história: "I\'m 22 years old."', // opcional
        },
      ],
    },
  },

  Sem `audioSource`, o botao de audio le o texto com TTS (audioLanguage /
  audioRate opcionais). Sem `questions`, o botao vira "Continuar".
*/
