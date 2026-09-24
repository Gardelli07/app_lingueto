import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { createAudioPlayer } from "expo-audio";
import geral from "../../exc/geral";
import ex1, { Exercise1 } from "../../exc/ex1";
import ex2, { Exercise2 } from "../../exc/ex2";
import ex3, { Exercise3 } from "../../exc/ex3";
import ex4, { Exercise4 } from "../../exc/ex4";
import ex5, { Exercise5 } from "../../exc/ex5";
import ex6, { Exercise6 } from "../../exc/ex6";
import ex7, { Exercise7 } from "../../exc/ex7";
import ex8, { Exercise8 } from "../../exc/ex8";
import ex9, { Exercise9 } from "../../exc/ex9";
import ex10, { Exercise10 } from "../../exc/ex10";
import ex11, { Exercise11 } from "../../exc/ex11";
import ex12, { Exercise12 } from "../../exc/ex12";
import ex13, { Exercise13 } from "../../exc/ex13";
import ex14, { Exercise14 } from "../../exc/ex14";
import ex15, { Exercise15 } from "../../exc/ex15";
import ex16, { Exercise16 } from "../../exc/ex16";
import ex17, { Exercise17 } from "../../exc/ex17";
import ex18, { Exercise18 } from "../../exc/ex18";
import ex19, { Exercise19 } from "../../exc/ex19";
import ex20, { Exercise20 } from "../../exc/ex20";
import Feedback from "../../exc/feedback";
import { Images } from "../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
} from "../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../util/xp";
import { concluirAula, fetchResumoProgresso } from "../../services/progresso";
import { registrarTentativaExercicio } from "../../services/erros";
import { getSlideHint } from "../../util/erroReview";
import { scopedKey } from "../../util/userScope";
import * as dailyGoals from "../../util/dailyGoals";
import { useTheme, useThemedStyles } from "../../theme";

const CORRECT_SOUND_SOURCE = require("../../../assets/sounds/correct.wav");

const SlideNavContext = React.createContext(null);

const BACK_IMAGE = require("../../../assets/seta.png");
const CLOSE_IMAGE = require("../../../assets/x.png");

// Cada modulo de exercicio exporta uma fabrica `(CORES) => StyleSheet`; aqui
// elas viram um unico objeto de estilos, resolvido para o tema ativo e
// repassado por prop pros componentes de exercicio (que ja recebiam `styles`).
const STYLE_FACTORIES = [
  geral, ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10,
  ex11, ex12, ex13, ex14, ex15, ex16, ex17, ex18, ex19, ex20,
];

const makeStyles = (CORES) =>
  Object.assign({}, ...STYLE_FACTORIES.map((factory) => factory(CORES)));

const COMPONENTS = {
  Exercise1,
  Exercise2,
  Exercise3,
  Exercise4,
  Exercise5,
  Exercise6,
  Exercise7,
  Exercise8,
  Exercise9,
  Exercise10,
  Exercise11,
  Exercise12,
  Exercise13,
  Exercise14,
  Exercise15,
  Exercise16,
  Exercise17,
  Exercise18,
  Exercise19,
  Exercise20,
};

// Esses tipos de exercicio nao entram no registro de tentativas/erros
// (Exercise1, Exercise2 e Exercise7 disparam onAttempt varias vezes por
// slide de um jeito que nao reflete "acertar ou errar" de forma util pra
// revisao; Exercise10 ja tem bloqueio proprio de 24h apos responder).
const EXERCISE_TYPES_WITHOUT_TRACKING = new Set([
  "Exercise1",
  "Exercise2",
  "Exercise7",
  "Exercise10",
]);

function useSpeech() {
  const speak = ({ text, stopBefore = true, ...speechOptions }) => {
    if (!text) return;
    if (stopBefore) Speech.stop();
    Speech.speak(text, speechOptions);
  };

  return { speak };
}

function stopActiveMedia() {
  try {
    const stopResult = Speech.stop();
    if (stopResult && typeof stopResult.catch === "function") {
      stopResult.catch(() => {});
    }
  } catch (error) {
    // Best effort: media cleanup should never block slide navigation.
  }
}

function updateProgress(progressAnim, index, total) {
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 300,
    useNativeDriver: false,
  }).start();
}

function useSlideNavigation({
  currentSlideIndex,
  setCurrentSlideIndex,
  totalSlides,
  progressAnim,
  onSlideWillChange,
}) {
  const styles = useThemedStyles(makeStyles);
  const lockRef = useRef(false);

  const next = () => {
    if (lockRef.current || currentSlideIndex >= totalSlides - 1) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const nextIndex = currentSlideIndex + 1;
    onSlideWillChange?.();
    setCurrentSlideIndex(nextIndex);
    updateProgress(progressAnim, nextIndex, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const previousIndex = currentSlideIndex - 1;
    onSlideWillChange?.();
    setCurrentSlideIndex(previousIndex);
    updateProgress(progressAnim, previousIndex, totalSlides);
  };

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;

    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={BACK_IMAGE} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { next, renderPrevButton };
}

function useNav() {
  return React.useContext(SlideNavContext);
}

function SlideHeader() {
  const styles = useThemedStyles(makeStyles);
  const { progressAnim, goBack, renderPrevButton } = useNav();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack} style={styles.headerCircleButton}>
        <Image source={CLOSE_IMAGE} style={styles.headerCircleImage} />
      </TouchableOpacity>

      <View style={styles.headerProgress}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.headerButton}>{renderPrevButton()}</View>
    </View>
  );
}

function ListenOnlySlide({ activity, next, speak, onAttempt }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const completedRef = useRef(false);
  const shouldResumeAfterSeekRef = useRef(false);
  const speechPausedRef = useRef(false);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioRate = activity.audioRate || 0.85;
  const audioPromptText = activity.audioText || activity.transcript || "";
  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      1200,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

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

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearPlayback();
      };
    }, []),
  );

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
        console.warn("ListenOnlySlide playAudio error", error);
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
    const seekTime = duration * progress;

    setAudioProgress(progress);

    if (!player) return;

    try {
      await player.seekTo(seekTime);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("ListenOnlySlide seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  const handleContinue = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onAttempt({
        isCorrect: true,
        correctDelta: 0,
        totalDelta: 0,
        exerciseAccuracy: 100,
      });
    }

    clearPlayback();
    next();
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image
            source={activity.image || Images.ex16}
            style={styles.mediaImage}
          />
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
              minimumTrackTintColor={CORES.WHITE}
              maximumTrackTintColor="rgba(255,255,255,0.35)"
              thumbTintColor={CORES.WHITE}
              onSlidingStart={handleAudioSeekStart}
              onValueChange={handleAudioSeek}
              onSlidingComplete={handleAudioSeekComplete}
              disabled={!activity.audioSource}
            />
          </View>
        </View>
      </View>

      {activity.transcript ? (
        <View style={styles.tipVisualCard}>
          <Text style={styles.tipVisualText}>{activity.transcript}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.tipVisualContinueButton}
        onPress={handleContinue}
        activeOpacity={0.9}
      >
        <Text style={styles.tipVisualContinueText}>
          {activity.continueLabel || "Continuar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function LessonFinishSlide({ onPressNextLesson, feedbackProps }) {
  return <Feedback onContinue={onPressNextLesson} {...feedbackProps} />;
}

function ReviewFinishSlide({ onFinish, accuracy }) {
  const reviewFinishStyles = useThemedStyles(makeReviewFinishStyles);

  return (
    <SafeAreaView style={reviewFinishStyles.safeArea}>
      <View style={reviewFinishStyles.container}>
        <Text style={reviewFinishStyles.emoji}>✅</Text>
        <Text style={reviewFinishStyles.title}>Revisão concluída!</Text>
        <Text style={reviewFinishStyles.subtitle}>
          Você acertou {accuracy}% dos exercícios revisados agora.
        </Text>
        <TouchableOpacity
          style={reviewFinishStyles.button}
          onPress={onFinish}
          activeOpacity={0.9}
        >
          <Text style={reviewFinishStyles.buttonText}>
            Voltar para Meus erros
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const makeReviewFinishStyles = (CORES) => ({
  safeArea: { flex: 1, backgroundColor: CORES.SURFACE },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: CORES.PROFILE_NAVY,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: CORES.TEXT_MUTED,
    textAlign: "center",
    marginBottom: 28,
  },
  button: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: CORES.FB_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: CORES.ON_ACCENT, fontSize: 16, fontWeight: "800" },
});

function LessonSlideRenderer({
  slide,
  styles,
  slideInstanceKey,
  next,
  speak,
  onPressNextLesson,
  onFinishReview,
  onAttempt,
  feedbackProps,
}) {
  if (slide.type === "finish") {
    return (
      <LessonFinishSlide
        onPressNextLesson={onPressNextLesson}
        feedbackProps={feedbackProps}
      />
    );
  }

  if (slide.type === "reviewFinish") {
    return (
      <ReviewFinishSlide
        onFinish={onFinishReview}
        accuracy={feedbackProps?.accuracy ?? 0}
      />
    );
  }

  if (slide.type === "listenOnly") {
    return (
      <ListenOnlySlide
        key={slideInstanceKey}
        activity={slide.activity}
        next={next}
        speak={speak}
        onAttempt={onAttempt}
      />
    );
  }

  const ExerciseComponent =
    typeof slide.component === "string"
      ? COMPONENTS[slide.component]
      : slide.component;

  return (
    <ExerciseComponent
      key={slideInstanceKey}
      activity={slide.activity}
      styles={styles}
      HeaderComponent={SlideHeader}
      next={next}
      onAttempt={onAttempt}
      slideKey={slideInstanceKey}
      {...(slide.needsSpeech ? { speak } : {})}
    />
  );
}

function HintOverlay({ visible, hintText, showHint, onToggle }) {
  const hintStyles = useThemedStyles(makeHintStyles);

  if (!visible) return null;

  return (
    <View style={hintStyles.footer}>
      {showHint && (
        <View style={hintStyles.card}>
          <Text style={hintStyles.cardText}>{hintText}</Text>
        </View>
      )}
      <TouchableOpacity
        style={hintStyles.button}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Text style={hintStyles.buttonText}>
          {showHint ? "Ocultar dica" : "Mostrar dica"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Segue o mesmo visual do "Tip" do ex16.js (sendAudioTipCard/sendAudioTipButton)
// pra ficar consistente com o resto do app, e fica como rodape fixo abaixo do
// ScrollView (em vez de flutuar sobre o conteudo) pra nunca cobrir nem
// disputar espaco com os botoes do proprio exercicio.
const makeHintStyles = (CORES) => ({
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: CORES.BORDER,
    backgroundColor: CORES.SURFACE,
  },
  button: {
    alignSelf: "center",
    minWidth: 150,
    minHeight: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: CORES.EX_BLUE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonText: {
    color: CORES.PROFILE_BLUE,
    fontWeight: "700",
    fontSize: 14,
  },
  card: {
    backgroundColor: CORES.EX_BLUE_BG_SOFT,
    borderWidth: 1,
    borderColor: CORES.EX_BORDER,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardText: {
    color: CORES.TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
});

function buildSlideKey(lesson, index) {
  const screenName = lesson && lesson.screen ? String(lesson.screen) : "lesson";
  return `${screenName}S${index + 1}`;
}

function buildSlideInstanceKey(lesson, slide, index) {
  const slideKey = slide && slide.key ? String(slide.key) : buildSlideKey(lesson, index);
  return `${buildSlideKey(lesson, index)}:${slideKey}`;
}

const REVIEW_FINISH_SLIDE = { key: "review-finish", type: "reviewFinish" };

// Cada item guarda o slide junto com o indice original dele em
// `lessonSlides` - o indice original e o que entra no chave_slide
// (buildSlideInstanceKey), entao precisa ser preservado mesmo quando so um
// subconjunto de slides esta sendo exibido (modo de revisao de erros).
function buildActiveSlides(lessonSlides, reviewMode, reviewSlideIndices) {
  if (reviewMode && Array.isArray(reviewSlideIndices) && reviewSlideIndices.length > 0) {
    const filtered = reviewSlideIndices
      .filter(
        (index) =>
          Number.isInteger(index) &&
          index >= 0 &&
          index < lessonSlides.length &&
          lessonSlides[index].type !== "finish",
      )
      .map((originalIndex) => ({
        slide: lessonSlides[originalIndex],
        originalIndex,
      }));

    if (filtered.length > 0) {
      return [...filtered, { slide: REVIEW_FINISH_SLIDE, originalIndex: -1 }];
    }
  }

  return lessonSlides.map((slide, index) => ({ slide, originalIndex: index }));
}

export default function createLessonScreen(
  slides,
  { storageKey, nextRouteName, screenName = "LessonScreen" },
) {
  if (!storageKey || !nextRouteName) {
    throw new Error("createLessonScreen requires storageKey and nextRouteName");
  }

  const hasFinishSlide = slides.some((slide) => slide.type === "finish");
  const lessonSlides = hasFinishSlide
    ? slides
    : [
        ...slides,
        {
          key: "lesson-finish",
          type: "finish",
        },
      ];

  const loadProgress = async () => {
    const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
    return raw ? JSON.parse(raw) : {};
  };

  const saveProgress = async (progress) => {
    await AsyncStorage.setItem(await scopedKey(storageKey), JSON.stringify(progress));
  };

  function LessonScreen({ route, navigation }) {
    const styles = useThemedStyles(makeStyles);
    const lesson = route && route.params ? route.params.lesson : undefined;
    const lessons = route && route.params ? route.params.lessons : undefined;
    const reviewSlideIndices =
      route && route.params ? route.params.reviewSlideIndices : undefined;
    const reviewMode = Boolean(route && route.params && route.params.reviewMode);
    const CORES = useTheme();
    const { speak } = useSpeech();

    const activeSlides = buildActiveSlides(
      lessonSlides,
      reviewMode,
      reviewSlideIndices,
    );
    const slideCount = activeSlides.length;
    const exerciseSlideCount = activeSlides.filter(
      ({ slide }) => slide.type !== "finish" && slide.type !== "reviewFinish",
    ).length;

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const progressAnim = useRef(new Animated.Value(1 / slideCount)).current;
    const [lessonStats, setLessonStats] = useState({
      correct: 0,
      total: 0,
      exerciseScores: {},
      slideAttempts: {},
    });
    const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [confirmedNextStreak, setConfirmedNextStreak] = useState(null);
    const [lessonAlreadyCompleted, setLessonAlreadyCompleted] =
      useState(false);
    const [lessonMetaLoaded, setLessonMetaLoaded] = useState(false);
    const lessonCommitRef = useRef(false);
    const reviewCommitRef = useRef(false);
    const correctSoundPlayerRef = useRef(null);
    const studySegmentStartRef = useRef(null);

    const playCorrectSound = () => {
      try {
        if (!correctSoundPlayerRef.current) {
          correctSoundPlayerRef.current = createAudioPlayer(
            CORRECT_SOUND_SOURCE,
          );
        }
        const player = correctSoundPlayerRef.current;
        player.seekTo(0);
        player.play();
      } catch (error) {
        // Falha ao tocar o som de acerto nao deve interromper a licao.
      }
    };

    useEffect(() => {
      return () => {
        correctSoundPlayerRef.current?.remove();
        correctSoundPlayerRef.current = null;
      };
    }, []);

    useEffect(() => {
      updateProgress(progressAnim, currentSlideIndex, slideCount);
    }, [currentSlideIndex, progressAnim]);

    const slideNav = useSlideNavigation({
      currentSlideIndex,
      setCurrentSlideIndex,
      totalSlides: slideCount,
      progressAnim,
      onSlideWillChange: stopActiveMedia,
    });

    const currentSlideEntry = activeSlides[currentSlideIndex];
    const currentSlide = currentSlideEntry && currentSlideEntry.slide;
    const currentSlideInstanceKey = buildSlideInstanceKey(
      lesson,
      currentSlide,
      currentSlideEntry ? currentSlideEntry.originalIndex : currentSlideIndex,
    );
    const completedExerciseScores = Object.values(lessonStats.exerciseScores);
    const lessonAccuracy = completedExerciseScores.length
      ? Math.round(
          completedExerciseScores.reduce((sum, score) => sum + score, 0) /
            exerciseSlideCount,
        )
      : calculateLessonAccuracy(lessonStats.correct, lessonStats.total);
    const earnedXp = lessonAlreadyCompleted ? 0 : XP_PER_LESSON;
    // Estimativa otimista para exibir na hora, antes da confirmacao do
    // backend (fonte da verdade para a sequencia, ver commitLessonCompletion).
    const optimisticNextStreak = lessonAlreadyCompleted
      ? currentStreak
      : lessonAccuracy >= LESSON_STREAK_MIN_ACCURACY
        ? currentStreak + 1
        : 0;
    const nextStreak = confirmedNextStreak ?? optimisticNextStreak;
    const totalXpAfterLesson = completedLessonsCount * XP_PER_LESSON + earnedXp;
    const levelProgress = getLevelProgress(totalXpAfterLesson);

    useEffect(() => {
      let active = true;

      async function loadLessonMeta() {
        const [progress, resumo] = await Promise.all([
          loadProgress(),
          fetchResumoProgresso().catch(() => null),
        ]);

        if (!active) return;

        const completedCount = Object.values(progress || {}).filter(
          Boolean,
        ).length;
        const alreadyCompleted = Boolean(
          lesson && lesson.id != null && progress && progress[lesson.id],
        );

        setCompletedLessonsCount(completedCount);
        setLessonAlreadyCompleted(alreadyCompleted);
        setCurrentStreak(resumo?.streakAtual ?? 0);
        setLessonMetaLoaded(true);
      }

      loadLessonMeta();

      return () => {
        active = false;
      };
    }, [lesson && lesson.id]);

    useEffect(() => {
      setShowHint(false);
      return () => {
        stopActiveMedia();
      };
    }, [currentSlideInstanceKey]);

    useFocusEffect(
      useCallback(() => {
        return () => {
          stopActiveMedia();
        };
      }, []),
    );

    const flushStudySegment = () => {
      if (!studySegmentStartRef.current) return;
      const elapsed = Date.now() - studySegmentStartRef.current;
      studySegmentStartRef.current = null;
      if (elapsed > 0) {
        dailyGoals.addStudyMillis(elapsed).catch(() => {});
      }
    };

    // Acumula minutos de estudo enquanto a tela da licao esta em foco e o
    // app em primeiro plano; pausa ao sair da tela ou ir para background.
    useFocusEffect(
      useCallback(() => {
        studySegmentStartRef.current = Date.now();

        const subscription = AppState.addEventListener("change", (nextState) => {
          if (nextState === "active") {
            studySegmentStartRef.current = Date.now();
          } else {
            flushStudySegment();
          }
        });

        return () => {
          subscription.remove();
          flushStudySegment();
        };
      }, []),
    );

    const handleAttempt = (
      {
        isCorrect,
        correctDelta,
        totalDelta,
        exerciseAccuracy,
      } = {},
      attemptedSlideKey = currentSlideInstanceKey,
    ) => {
      if (isCorrect) {
        playCorrectSound();
      }

      const tipoExercicio =
        (currentSlide && (currentSlide.component || currentSlide.type)) ||
        "desconhecido";

      dailyGoals
        .recordExerciseAttempt({ isCorrect, exerciseType: tipoExercicio })
        .catch(() => {});

      if (
        lesson &&
        lesson.id != null &&
        !EXERCISE_TYPES_WITHOUT_TRACKING.has(tipoExercicio)
      ) {
        registrarTentativaExercicio({
          conteudoId: lesson.id,
          chaveSlide: attemptedSlideKey,
          tipoExercicio,
          correta: isCorrect,
        }).catch(() => {});
      }

      setLessonStats((current) => {
        const nextCorrect =
          current.correct +
          (typeof correctDelta === "number" ? correctDelta : isCorrect ? 1 : 0);
        const nextTotal =
          current.total + (typeof totalDelta === "number" ? totalDelta : 1);

        const previousSlideAttempts = current.slideAttempts[
          attemptedSlideKey
        ] || {
          correct: 0,
          total: 0,
        };
        const nextSlideAttempts = {
          correct:
            previousSlideAttempts.correct +
            (typeof correctDelta === "number"
              ? correctDelta
              : isCorrect
                ? 1
                : 0),
          total:
            previousSlideAttempts.total +
            (typeof totalDelta === "number" ? totalDelta : 1),
        };

        const derivedExerciseAccuracy =
          typeof exerciseAccuracy === "number"
            ? exerciseAccuracy
            : calculateLessonAccuracy(
                nextSlideAttempts.correct,
                nextSlideAttempts.total,
              );

        return {
          correct: nextCorrect,
          total: nextTotal,
          slideAttempts: {
            ...current.slideAttempts,
            [attemptedSlideKey]: nextSlideAttempts,
          },
          exerciseScores: {
            ...current.exerciseScores,
            [attemptedSlideKey]: derivedExerciseAccuracy,
          },
        };
      });
    };

    useEffect(() => {
      if (!lessonMetaLoaded || !currentSlide || currentSlide.type !== "finish")
        return;
      if (lessonAlreadyCompleted || lessonCommitRef.current) return;

      lessonCommitRef.current = true;

      async function commitLessonCompletion() {
        if (lesson && lesson.id != null) {
          const progress = await loadProgress();
          await saveProgress({ ...progress, [lesson.id]: true });
          dailyGoals
            .recordLessonCompleted({ xp: XP_PER_LESSON, accuracy: lessonAccuracy })
            .catch(() => {});
          // A sequencia (streak) e calculada e armazenada no backend, que e a
          // fonte da verdade; so atualizamos a estimativa otimista quando a
          // confirmacao chega.
          try {
            const resultado = await concluirAula(lesson.id, lessonAccuracy);
            const sequenciaAtual = resultado?.sequencia?.sequencia_atual;
            if (typeof sequenciaAtual === "number") {
              setConfirmedNextStreak(sequenciaAtual);
            }
          } catch {}
        }
      }

      commitLessonCompletion();
    }, [
      currentSlide && currentSlide.type,
      lesson && lesson.id,
      lessonAlreadyCompleted,
      lessonMetaLoaded,
      lessonAccuracy,
    ]);

    useEffect(() => {
      if (!currentSlide || currentSlide.type !== "reviewFinish") return;
      if (reviewCommitRef.current) return;

      reviewCommitRef.current = true;
      dailyGoals.recordReviewCompleted().catch(() => {});
    }, [currentSlide && currentSlide.type]);

    const findNextLesson = () => {
      if (!lessons || !lesson) return null;
      const lessonIndex = lessons.findIndex(
        (lessonItem) => String(lessonItem.id) === String(lesson.id),
      );
      return lessons[lessonIndex + 1] || null;
    };

    const goToNextLesson = async () => {
      stopActiveMedia();
      const nextLesson = findNextLesson();
      navigation.replace(nextRouteName, {
        autoOpenLessonId: nextLesson ? nextLesson.id : null,
      });
    };

    const goToMeusErros = () => {
      stopActiveMedia();
      navigation.navigate("MeusErros");
    };

    const showHintOverlay =
      reviewMode &&
      currentSlide &&
      currentSlide.type !== "finish" &&
      currentSlide.type !== "reviewFinish";

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: CORES.BACKGROUND }}
        edges={["top", "bottom"]}
      >
        <SlideNavContext.Provider
          value={{
            ...slideNav,
            progressAnim,
            goBack: () => {
              stopActiveMedia();
              navigation.goBack();
            },
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <LessonSlideRenderer
              key={currentSlideInstanceKey}
              slide={currentSlide}
              styles={styles}
              slideInstanceKey={currentSlideInstanceKey}
              next={slideNav.next}
              speak={speak}
              onPressNextLesson={goToNextLesson}
              onFinishReview={goToMeusErros}
              onAttempt={(attempt) =>
                handleAttempt(attempt, currentSlideInstanceKey)
              }
              feedbackProps={{
                earnedXp,
                accuracy: lessonAccuracy,
                streak: nextStreak,
                totalXp: totalXpAfterLesson,
                lessonAlreadyCompleted,
                reviewLabel: "Revisar erros ->",
                onReview: goToMeusErros,
                ...levelProgress,
              }}
            />
          </ScrollView>

          <HintOverlay
            visible={showHintOverlay}
            hintText={getSlideHint(currentSlide)}
            showHint={showHint}
            onToggle={() => setShowHint((current) => !current)}
          />
        </SlideNavContext.Provider>
      </SafeAreaView>
    );
  }

  LessonScreen.displayName = screenName;
  return LessonScreen;
}

export { COMPONENTS as LESSON_COMPONENTS };
