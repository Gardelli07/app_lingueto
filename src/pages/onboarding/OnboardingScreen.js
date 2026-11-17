import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { setSuggestedStudyHour } from "../../services/notifications";
import { useTheme, useThemedStyles } from "../../theme";
import SpeechBubble from "./SpeechBubble";
import { FIRST_QUESTION_INDEX, MASCOTS, STEPS, STUDY_TIME_OPTIONS } from "./steps";

const FONTS = {
  medium: "Roboto_500Medium",
  bold: "Roboto_700Bold",
  black: "Roboto_900Black",
  blackItalic: "Roboto_900Black_Italic",
};

// Onboarding com o Lingo (substitui o antigo teste de nivelamento).
// 2 telas de boas-vindas + 5 perguntas. No fim so marca o teste como
// concluido no backend (as respostas nao sao salvas) e guarda o horario
// preferido como sugestao para o pop-up de lembrete da Home.
export default function OnboardingScreen({ navigation }) {
  const { updateUser } = useAuth();
  const styles = useThemedStyles(makeStyles);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finishing, setFinishing] = useState(false);

  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;
  const isQuestion = step.type === "question";
  const blocked = (isQuestion && !answers[step.key]) || finishing;

  const finish = async () => {
    setFinishing(true);

    const hour = STUDY_TIME_OPTIONS[answers.time];
    await setSuggestedStudyHour(hour ?? null).catch(() => {});

    try {
      await api.post("/nivelamento/concluir", {
        pontuacao: 0,
        total_perguntas: 0,
      });
      updateUser({ teste_nivelamento_concluido: true });
    } catch (error) {
      console.error(error);
    }

    navigation.replace("Tabs");
  };

  const next = () => {
    if (blocked) return;
    if (isLast) finish();
    else setIndex(index + 1);
  };

  const skip = () => setIndex(FIRST_QUESTION_INDEX);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      {/* Cabecalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>Lingueto</Text>
        {!isQuestion && (
          <Pressable onPress={skip} hitSlop={8} style={styles.skip} accessibilityRole="button">
            <Text style={styles.skipText}>Pular</Text>
          </Pressable>
        )}
      </View>

      {/* Balao + mascote */}
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.middle, { paddingBottom: isQuestion ? 0 : 40 }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SpeechBubble key={index}>
          <Text style={styles.eyebrow}>{step.eyebrow}</Text>
          {step.type === "intro" ? (
            <>
              <Text style={styles.titleBig}>{step.title}</Text>
              <Text style={styles.body}>{step.body}</Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.hint}>{step.hint}</Text>
              <View style={styles.options}>
                {step.options.map((label) => (
                  <OptionButton
                    key={label}
                    label={label}
                    selected={answers[step.key] === label}
                    onPress={() => setAnswers((a) => ({ ...a, [step.key]: label }))}
                  />
                ))}
              </View>
            </>
          )}
        </SpeechBubble>

        <Mascot pose={step.mascot} />
      </ScrollView>

      {/* Pontinhos + botao principal */}
      <View style={styles.footer}>
        <View
          style={styles.dots}
          accessible
          accessibilityLabel={`Passo ${index + 1} de ${STEPS.length}`}
        >
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>

        <Pressable
          onPress={next}
          disabled={blocked}
          accessibilityRole="button"
          accessibilityState={{ disabled: blocked }}
          style={({ pressed }) => [
            styles.button,
            blocked && styles.buttonBlocked,
            pressed && !blocked && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{isLast ? "Começar" : "Próximo"}</Text>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M5 12h14" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
            <Path d="M13 6l6 6-6 6" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// O Lingo entra pulando uma vez quando a tela abre e depois fica parado.
function Mascot({ pose }) {
  const styles = useThemedStyles(makeStyles);
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(enter, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }).start();
  }, [enter]);

  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [60, 0] });
  const scale = enter.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const opacity = enter.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] });

  return (
    <Animated.View style={[styles.mascotWrap, { opacity, transform: [{ translateY }, { scale }] }]}>
      <Image
        source={MASCOTS[pose]}
        style={styles.mascot}
        resizeMode="contain"
        accessibilityLabel="Lingo, o camaleão mascote do Lingueto"
      />
    </Animated.View>
  );
}

function OptionButton({ label, selected, onPress }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <Text style={styles.optionText}>{label}</Text>
      {selected && (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={12} r={11} fill={CORES.ONBOARDING_DOT_ACTIVE} />
          <Path d="M7 12.5l3.2 3.2L17 9" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </Pressable>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    flex: { flex: 1 },
    screen: {
      flex: 1,
      backgroundColor: CORES.ONBOARDING_BG,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    header: {
      minHeight: 44,
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      fontFamily: FONTS.blackItalic,
      fontSize: 30,
      letterSpacing: -0.5,
      color: CORES.ONBOARDING_LOGO,
    },
    skip: { minHeight: 44, paddingHorizontal: 12, justifyContent: "center" },
    skipText: { fontFamily: FONTS.bold, fontSize: 16, color: CORES.ONBOARDING_TEXT_EYEBROW },

    middle: {
      flexGrow: 1,
      justifyContent: "center",
      paddingTop: 16,
    },
    eyebrow: {
      fontFamily: FONTS.bold,
      fontSize: 13,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: CORES.ONBOARDING_TEXT_EYEBROW,
      marginBottom: 10,
    },
    titleBig: { fontFamily: FONTS.black, fontSize: 28, lineHeight: 32, color: CORES.ONBOARDING_TEXT, marginBottom: 8 },
    title: { fontFamily: FONTS.black, fontSize: 24, lineHeight: 29, color: CORES.ONBOARDING_TEXT, marginBottom: 6 },
    body: { fontFamily: FONTS.medium, fontSize: 17, lineHeight: 25, color: CORES.ONBOARDING_TEXT_BODY },
    hint: { fontFamily: FONTS.medium, fontSize: 15, lineHeight: 21, color: CORES.ONBOARDING_TEXT_MUTED, marginBottom: 14 },

    options: { gap: 8 },
    option: {
      minHeight: 46,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 14,
      borderWidth: 1.5,
      backgroundColor: CORES.ONBOARDING_OPTION,
      borderColor: CORES.ONBOARDING_OPTION_BORDER,
    },
    optionSelected: {
      backgroundColor: CORES.ONBOARDING_OPTION_SELECTED,
      borderColor: CORES.ONBOARDING_OPTION_SELECTED_BORDER,
    },
    optionText: { flex: 1, fontFamily: FONTS.bold, fontSize: 16, color: CORES.ONBOARDING_TEXT },

    mascotWrap: { alignItems: "flex-end", paddingRight: 12, marginTop: 12 },
    mascot: { width: 120, height: 143 },

    footer: { alignItems: "center", gap: 22, paddingTop: 12 },
    dots: { flexDirection: "row", alignItems: "center", gap: 8 },
    dot: { height: 8, borderRadius: 4 },
    dotActive: { width: 28, backgroundColor: CORES.ONBOARDING_DOT_ACTIVE },
    dotInactive: { width: 8, backgroundColor: CORES.ONBOARDING_DOT_INACTIVE },

    button: {
      width: "100%",
      minHeight: 60,
      borderRadius: 16,
      backgroundColor: CORES.ONBOARDING_PRIMARY,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    buttonBlocked: { opacity: 0.45 },
    buttonPressed: { transform: [{ scale: 0.98 }] },
    buttonText: { fontFamily: FONTS.bold, fontSize: 20, color: "#FFFFFF" },
  });
