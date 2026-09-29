import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { Santander } from "../../../util/images";
import { useThemedStyles } from "../../../theme";

export function useSpeech() {
  const speak = ({
    text,
    language = "en-US",
    rate = 0.9,
    pitch = 1.0,
    stopBefore = true,
  }) => {
    if (!text) return;

    if (stopBefore) {
      Speech.stop();
    }

    Speech.speak(text, {
      language,
      rate,
      pitch,
    });
  };

  const stop = () => {
    Speech.stop();
  };

  return {
    speak,
    stop,
  };
}

/* ================= CONTEXT ================= */

const SlideNavContext = React.createContext(null);

/* ================= CONFIG ================= */

const SLIDE_COUNT = 8;
const STORAGE_KEY = "@progesso_ingles_completo_A0-A1";

/* ================= STORAGE ================= */

async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("loadProgress error", e);
    return {};
  }
}

async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("saveProgress error", e);
  }
}

/* ================= PROGRESS BAR ================= */

function updateProgress(progressAnim, index, total) {
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 300,
    useNativeDriver: false,
  }).start();
}

/* ================= NAV HOOK ================= */

function useSlideNavigation({
  currentSlideIndex,
  setCurrentSlideIndex,
  totalSlides,
  progressAnim,
}) {
  const styles = useThemedStyles(makeStyles);
  const lockRef = useRef(false);

  const next = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 300);

    if (currentSlideIndex < totalSlides - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      updateProgress(progressAnim, nextIndex, totalSlides);
    }
  };

  const prev = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 300);

    if (currentSlideIndex > 0) {
      const prevIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIndex);
      updateProgress(progressAnim, prevIndex, totalSlides);
    }
  };

  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    );
  }

  function renderPrevButton(index) {
    if (index !== currentSlideIndex || index === 0) return null;
    return (
      <TouchableOpacity style={styles.prevButton} onPress={prev}>
        <Text style={styles.prevButtonText}>← Back</Text>
      </TouchableOpacity>
    );
  }

  return { renderNextButton, renderPrevButton };
}

/* ================= SCREEN ================= */

export default function Base({ route, navigation }) {
  const styles = useThemedStyles(makeStyles);
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [done, setDone] = useState(false);

  const progressAnim = useRef(
    new Animated.Value((currentSlide + 1) / SLIDE_COUNT),
  ).current;

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!lesson?.id) return;
      const progress = await loadProgress();
      if (mounted) setDone(!!progress[lesson.id]);
    })();

    return () => (mounted = false);
  }, [lesson?.id]);

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);

    if (currentSlide === SLIDE_COUNT - 1 && lesson?.id && !done) {
      (async () => {
        const progress = await loadProgress();
        await saveProgress({ ...progress, [lesson.id]: true });
        setDone(true);
      })();
    }
  }, [currentSlide, lesson?.id, done]);

  const slideNav = useSlideNavigation({
    currentSlideIndex: currentSlide,
    setCurrentSlideIndex: setCurrentSlide,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const findNextLessonFromArray = () => {
    if (!lessons || !lesson) return null;
    const idx = lessons.findIndex((l) => String(l.id) === String(lesson.id));
    if (idx === -1 || idx === lessons.length - 1) return null;
    return lessons[idx + 1];
  };

  /* ========= FUNÇÃO FINAL (SEM EMPILHAR) ========= */

  const goToNextLessonAndReturn = async () => {
    if (lesson?.id && !done) {
      const progress = await loadProgress();
      await saveProgress({ ...progress, [lesson.id]: true });
      setDone(true);
    }

    const nextLesson = findNextLessonFromArray();

    navigation.replace("Inglescompleto", {
      autoOpenLessonId: nextLesson?.id || null,
    });
  };

  return (
    <SlideNavContext.Provider
      value={{
        ...slideNav,
        goToNextLesson: goToNextLessonAndReturn,
        goBack: () => navigation.goBack(),
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.progressBarContainer}>
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

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
        </ScrollView>
      </View>
    </SlideNavContext.Provider>
  );
}

/* ================= CONTEXT HOOK ================= */

function useNav() {
  return React.useContext(SlideNavContext);
}

/* ================= SLIDES ================= */

function Slide1() {
  const styles = useThemedStyles(makeStyles);
  const { renderNextButton } = useNav();

  return (
    <View style={styles.introContainer}>
      {/* Placeholder da imagem */}
      <View style={styles.imagePlaceholder}>
        <Image
          source={Santander.A1slide1}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.introTitle}>Professional Greetings</Text>

      {/* Subtítulo */}
      <Text style={styles.introSubtitle}>Chat & Phone ☎️ • 8–10 minutes</Text>

      {/* Goal box */}
      <View style={styles.goalBox}>
        <Text style={styles.goalTitle}>🎯 Goal</Text>
        <Text style={styles.goalText}>
          Greet customers professionally in English via chat and phone.
        </Text>
      </View>

      {/* Resultado final */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>
          🚀 <Text style={{ fontWeight: "700" }}>Ao final da lição:</Text>
          {"\n"}
          Você será capaz de cumprimentar clientes em inglês de forma educada e
          profissional.
        </Text>
      </View>

      {/* Botão Start */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => renderNextButton(0).props.onPress()}
      >
        <Text style={styles.startButtonText}>Start 🚀</Text>
      </TouchableOpacity>
    </View>
  );
}

function Slide2() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();
  const [mostrarTraducao, setMostrarTraducao] = useState(false);

  return (
    <View style={styles.slide}>
      <View style={styles.imagePlaceholder}>
        <Image
          source={Santander.A1slide2}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.title}>Scenario</Text>
        <Text style={styles.subtitle}>Situação Real</Text>
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <Text style={styles.textEn}>
          You are a customer service agent starting the conversation with a
          customer.
        </Text>

        {mostrarTraducao && (
          <View style={styles.translationBox}>
            <Text style={styles.textPt}>
              🇧🇷 Você é um agente de atendimento ao cliente iniciando uma
              conversa com um cliente.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.translateButton}
          onPress={() => setMostrarTraducao(!mostrarTraducao)}
        >
          <Text style={styles.translateButtonText}>
            🌐 {mostrarTraducao ? "Ocultar Tradução" : "Ver Tradução"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(1)}
        {renderNextButton(1)}
      </View>
    </View>
  );
}

const vocabulary = [
  { en: "Hello!", pt: "Olá" },
  { en: "Good morning / afternoon", pt: "Bom dia / boa tarde" },
  { en: "How may I help you?", pt: "Como posso ajudar?" },
  { en: "Thank you for contacting us", pt: "Obrigado por entrar em contato" },
  { en: "My name is...", pt: "Meu nome é..." },
  { en: "Customer support", pt: "Atendimento ao cliente" },
];

function Slide3() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();

  const [playingIndex, setPlayingIndex] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const play = (text, index) => {
    // para qualquer fala anterior
    Speech.stop();

    setPlayingIndex(index);

    // animação de entrada
    Animated.spring(scaleAnim, {
      toValue: 1.04,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Speech.speak(text, {
      language: "en-US",
      rate: 0.85,
      pitch: 1.05,

      onDone: () => {
        setPlayingIndex(null);

        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
      },

      onStopped: () => {
        setPlayingIndex(null);
        scaleAnim.setValue(1);
      },

      onError: () => {
        setPlayingIndex(null);
        scaleAnim.setValue(1);
      },
    });
  };

  return (
    <View style={styles.slide}>
      <View style={styles.cardatividade}>
        <Text style={styles.title}>📘 Vocabulário Essencial</Text>
        <Text style={styles.subtitle}>Toque na palavra para ouvir</Text>

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {vocabulary.map((item, index) => {
            const active = playingIndex === index;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.vocabCard,
                  active && styles.cardActive,
                  active && { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <TouchableOpacity
                  style={styles.cardContent}
                  onPress={() => play(item.en, index)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.textEn}>{item.en}</Text>
                    <Text style={styles.textPt}>{item.pt}</Text>

                    {active && (
                      <Text style={styles.playing}>▶ Playing: "{item.en}"</Text>
                    )}
                  </View>

                  <Text style={styles.speaker}>🔊</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>

        <View style={styles.buttonRow}>
          {renderPrevButton(2)}
          {renderNextButton(2)}
        </View>
      </View>
    </View>
  );
}

function Slide4() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={styles.buttonRow}>
        {renderPrevButton(3)}
        {renderNextButton(3)}
      </View>
    </View>
  );
}

function Slide5() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={styles.buttonRow}>
        {renderPrevButton(4)}
        {renderNextButton(4)}
      </View>
    </View>
  );
}

function Slide6() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(5)}
        {renderNextButton(5)}
      </View>
    </View>
  );
}

function Slide7() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(6)}
        {renderNextButton(6)}
      </View>
    </View>
  );
}

function Slide8() {
  const styles = useThemedStyles(makeStyles);
  const { renderPrevButton, goToNextLesson } = useNav();

  return (
    <View style={styles.slide}>
      <View style={styles.buttonRow}>
        {renderPrevButton(7)}
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
          accessible={false}
          focusable={false}
        >
          <Text style={styles.nextLessonButtonText}>Próxima lição →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const makeStyles = (CORES) =>
  StyleSheet.create({
    /* ================= BASE ================= */

    slide: {
      flex: 1,
      alignItems: "center",
      backgroundColor: CORES.BACKGROUND,
      margin: 10,
    },

    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 24,
    },

    /* ================= PROGRESS ================= */

    progressBarContainer: {
      height: 4,
      backgroundColor: CORES.TRACK,
      width: "100%",
    },

    progressBarFill: {
      height: "100%",
      backgroundColor: CORES.DANGER_FILL,
      borderRadius: 2,
    },

    /* ================= BOTÕES ================= */

    nextButton: {
      backgroundColor: CORES.DANGER_FILL,
      width: 180,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },

    nextButtonText: {
      color: CORES.ON_ACCENT,
      fontWeight: "700",
      fontSize: 16,
    },

    prevButton: {
      backgroundColor: CORES.SURFACE,
      width: 180,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: CORES.TEXT,
    },

    prevButtonText: {
      color: CORES.TEXT,
      fontWeight: "700",
      fontSize: 16,
    },

    nextLessonButton: {
      backgroundColor: CORES.EX_BLUE_STRONG,
      width: 180,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },

    nextLessonButtonText: {
      color: CORES.ON_ACCENT,
      fontWeight: "700",
      fontSize: 16,
    },

    /* ================= SLIDE 1 ================= */

    introContainer: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: CORES.TRACK,
    },

    imagePlaceholder: {
      width: 145,
      height: 145,
      borderRadius: 18,
      borderWidth: 2.5,
      borderColor: CORES.DANGER,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },

    image: {
      width: 140,
      height: 140,
      borderRadius: 18,
    },

    introTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: CORES.TEXT,
      marginBottom: 6,
      textAlign: "center",
    },

    introSubtitle: {
      fontSize: 14,
      color: CORES.TEXT_MUTED,
      marginBottom: 20,
    },

    goalBox: {
      width: "100%",
      borderWidth: 1.5,
      borderColor: CORES.DANGER,
      borderRadius: 14,
      padding: 16,
      marginBottom: 14,
    },

    goalTitle: {
      fontWeight: "700",
      color: CORES.DANGER,
      marginBottom: 6,
    },

    goalText: {
      fontSize: 14,
      color: CORES.TEXT,
      lineHeight: 20,
    },

    resultBox: {
      width: "100%",
      borderWidth: 1.5,
      borderColor: CORES.DANGER,
      borderRadius: 14,
      padding: 16,
      marginBottom: 24,
    },

    resultText: {
      fontSize: 14,
      color: CORES.TEXT,
      lineHeight: 20,
    },

    startButton: {
      backgroundColor: CORES.DANGER_FILL,
      width: "100%",
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    startButtonText: {
      color: CORES.ON_ACCENT,
      fontSize: 16,
      fontWeight: "700",
    },

    /* ================= SLIDE 2 ================= */

    header: {
      alignItems: "center",
    },

    title: {
      fontSize: 25,
      fontWeight: "700",
      color: CORES.TEXT,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 15,
      color: CORES.TEXT_MUTED,
      marginTop: 4,
      textAlign: "center",
      marginBottom: 12,
    },

    card: {
      borderWidth: 1.5,
      borderColor: CORES.DANGER,
      borderRadius: 18,
      padding: 20,
    },

    textEn: {
      fontSize: 16,
      fontWeight: "600",
      color: CORES.TEXT,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 16,
    },

    translationBox: {
      backgroundColor: CORES.EX_BLUE_BG,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: CORES.BRAND_STRONG,
      marginBottom: 14,
    },

    textPt: {
      fontSize: 14,
      color: CORES.TEXT,
      lineHeight: 20,
    },

    translateButton: {
      backgroundColor: CORES.BRAND_STRONG,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },

    translateButtonText: {
      color: CORES.SURFACE,
      fontSize: 14,
      fontWeight: "600",
    },

    /* ================= SLIDE 3 ================= */

    cardatividade: {
      width: "100%",
      flex: 1, // ✅ permite crescer
      backgroundColor: CORES.BACKGROUND,
      borderRadius: 14,
    },

    vocabCard: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: CORES.DANGER,
    },

    cardActive: {
      backgroundColor: CORES.FB_ORANGE_BG,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
    },

    cardContent: {
      flexDirection: "row",
      alignItems: "center", // ícone + texto alinhados no centro
      justifyContent: "center",
    },

    speaker: {
      fontSize: 22,
      textAlign: "center",
    },

    playing: {
      fontSize: 12,
      color: CORES.SUCCESS_TEXT,
      fontWeight: "600",
      textAlign: "center",
    },
  });
