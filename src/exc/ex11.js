import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";

export function Exercise11({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const CORES = useTheme();
  const inputRef = useRef(null);

  const words = activity.words || [];
  const secondsPerWord = activity.secondsPerWord || 5;

  const [screen, setScreen] = useState("statement");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(secondsPerWord);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentWord = words[currentIndex];
  const isFinished = currentIndex >= words.length;
  const correctCount = answers.filter((item) => item.isCorrect).length;
  const wrongAnswers = answers.filter((item) => !item.isCorrect);

  const summaryTone =
    correctCount <= 1 ? "danger" : correctCount <= 3 ? "warning" : "success";

  const goToNextWord = (answer) => {
    const updatedAnswers = [...answers, answer];
    const nextIndex = currentIndex + 1;

    setAnswers(updatedAnswers);
    setTypedText("");
    setResult(null);
    setCurrentIndex(nextIndex);
    setTimeLeft(secondsPerWord);

    if (nextIndex >= words.length) {
      setScreen("feedback");
    }
  };

  useEffect(() => {
    if (screen !== "exercise" || isFinished) return;
    if (result !== null) return;

    if (timeLeft <= 0) {
      handleSubmitCurrentWord({ byTimeout: true });
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, screen, isFinished, result]);

  const triggerWrongFeedback = (byTimeout = false) => {
    if (!currentWord) return;
    onAttempt?.({ isCorrect: false });

    setResult("wrong");
    Vibration.vibrate(140);

    goToNextWord({
      expected: currentWord,
      typed: typedText.trim(),
      isCorrect: false,
      reason: byTimeout ? "timeout" : "wrong",
    });
  };

  const triggerCorrectFeedback = (value) => {
    if (!currentWord) return;
    onAttempt?.({ isCorrect: true });

    setResult("correct");
    Vibration.vibrate(40);

    goToNextWord({
      expected: currentWord,
      typed: value.trim(),
      isCorrect: true,
      reason: "correct",
    });
  };

  const handleChangeText = (value) => {
    if (screen !== "exercise" || isFinished || result !== null) return;

    setTypedText(value);
  };

  const handleSubmitCurrentWord = ({ byTimeout = false } = {}) => {
    if (
      screen !== "exercise" ||
      isFinished ||
      result !== null ||
      !currentWord
    ) {
      return;
    }

    const typedValue = typedText.trim();
    const expectedValue = currentWord.trim().toLowerCase();

    if (typedValue.toLowerCase() === expectedValue) {
      triggerCorrectFeedback(typedText);
      return;
    }

    triggerWrongFeedback(byTimeout);
  };

  useEffect(() => {
    if (screen !== "exercise" || isFinished || result !== null) return;

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(focusTimer);
  }, [currentIndex, isFinished, result, screen]);

  const renderStatementScreen = () => (
    <View style={styles.fastTypeIntroCard}>
      <Text style={styles.fastTypeIntroTitle}>Desafio de Escrita!</Text>

      <Text style={styles.fastTypeIntroText}>
        Você verá{" "}
        <Text style={styles.fastTypeIntroAccentBlue}>
          {words.length} palavras
        </Text>
        , uma após a outra.
      </Text>

      <Text style={styles.fastTypeIntroText}>
        Você terá{" "}
        <Text style={styles.fastTypeIntroAccentBlue}>
          {secondsPerWord} segundos
        </Text>{" "}
        para escrever cada palavra.
      </Text>

      <Text style={styles.fastTypeIntroText}>
        Escreva o mais rápido que puder!
      </Text>

      <Text style={styles.fastTypeIntroHighlight}>
        Não pare
        <Text style={styles.fastTypeIntroText}>
          {" "}
          - a próxima palavra aparecera rapidamente!
        </Text>
      </Text>

      <Text style={styles.fastTypeIntroFooter}>Prepare-se... e foque!</Text>

      <TouchableOpacity
        style={styles.fastTypeIntroContinue}
        onPress={() => setScreen("exercise")}
      >
        <Text style={styles.fastTypeIntroContinueText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExerciseScreen = () => (
    <View style={styles.fastTypeBlock}>
      <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

      {currentWord ? (
        <>
          <View style={styles.fastTypeWordPill}>
            <Text
              style={styles.fastTypeWordPillText}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {currentWord}
            </Text>
          </View>

          <View style={styles.fastTypeInputWrap}>
            <TextInput
              ref={inputRef}
              value={typedText}
              onChangeText={handleChangeText}
              onSubmitEditing={() => handleSubmitCurrentWord()}
              style={styles.fastTypeInput}
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="send"
              placeholder=""
              placeholderTextColor={CORES.EX_BLUE_FAINT}
            />
          </View>

          <TouchableOpacity
            style={styles.fastTypeSubmitButton}
            onPress={handleSubmitCurrentWord}
            activeOpacity={0.9}
          >
            <Text style={styles.fastTypeSubmitButtonText}>Enviar</Text>
          </TouchableOpacity>

          <Text style={styles.fastTypeTimer}>{timeLeft}s</Text>
        </>
      ) : null}
    </View>
  );

  const renderFeedbackItem = (item, index) => (
    <View key={`${item.expected}-${index}`} style={styles.fastTypeFeedbackItem}>
      <Text
        style={[
          styles.fastTypeFeedbackLineIcon,
          styles.fastTypeFeedbackLineIconWrong,
        ]}
      >
        ✕
      </Text>
      <View style={styles.fastTypeFeedbackCopy}>
        <Text style={styles.fastTypeFeedbackWrongWord}>{item.expected}</Text>
        <View style={styles.fastTypeFeedbackLine}>
          <Text style={styles.fastTypeFeedbackLineIcon}>✍</Text>
          <Text style={styles.fastTypeFeedbackLineText}>
            você escreveu: {item.typed || "..."}
          </Text>
        </View>
        <View style={styles.fastTypeFeedbackLine}>
          <Text style={styles.fastTypeFeedbackLineIcon}>💡</Text>
          <Text style={styles.fastTypeFeedbackLineText}>
            correto: {item.expected}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFeedbackScreen = () => (
    <View style={styles.fastTypeFeedbackCard}>
      <Text style={styles.fastTypeFeedbackHeader}>Resultado do Desafio</Text>
      <Text style={styles.fastTypeFeedbackScore}>
        {correctCount} / {words.length} palavras corretas
      </Text>

      <View style={styles.fastTypeFeedbackSummaryRow}>
        <View
          style={[
            styles.fastTypeFeedbackSummaryDot,
            summaryTone === "danger" && styles.fastTypeFeedbackSummaryDotDanger,
            summaryTone === "warning" &&
              styles.fastTypeFeedbackSummaryDotWarning,
            summaryTone === "success" &&
              styles.fastTypeFeedbackSummaryDotSuccess,
          ]}
        />
        <Text style={styles.fastTypeFeedbackSummary}>
          Bom desempenho! Você está evoluindo.
        </Text>
      </View>

      <Text style={styles.fastTypeFeedbackSectionTitle}>
        Corrija seus erros
      </Text>

      <View style={styles.fastTypeFeedbackList}>
        {wrongAnswers.length > 0 ? (
          wrongAnswers.map(renderFeedbackItem)
        ) : (
          <View style={styles.fastTypeFeedbackPerfectRow}>
            <Text style={styles.fastTypeFeedbackPerfectIcon}>✓</Text>
            <Text style={styles.fastTypeFeedbackPerfectText}>
              Você acertou todas as palavras.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.fastTypeNextButton} onPress={next}>
        <Text style={styles.fastTypeNextButtonText}>Próxima atividade</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      {screen === "statement" && renderStatementScreen()}
      {screen === "exercise" && renderExerciseScreen()}
      {screen === "feedback" && renderFeedbackScreen()}
    </View>
  );
}

const ex11 = (CORES) =>
  StyleSheet.create({
    fastTypeBlock: {
      width: "100%",
      alignItems: "center",
    },
    fastTypeWordPill: {
      minWidth: "50%",
      maxWidth: "88%",
      minHeight: 44,
      borderRadius: 10,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 18,
      marginBottom: 24,
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignSelf: "center",
    },
    fastTypeWordPillText: {
      color: CORES.WHITE,
      fontSize: 16,
      lineHeight: 20,
      fontWeight: "700",
      textDecorationLine: "underline",
      textAlign: "center",
    },
    fastTypeInputWrap: {
      width: "38%",
      borderBottomWidth: 2,
      borderBottomColor: CORES.EX_BORDER,
      marginBottom: 12,
    },
    fastTypeInput: {
      minHeight: 34,
      color: CORES.PRIMARY,
      fontSize: 16,
      textAlign: "center",
      paddingVertical: 4,
      fontWeight: "700",
    },
    fastTypeTimer: {
      width: "88%",
      textAlign: "center",
      fontSize: 12,
      color: CORES.PRIMARY,
      fontWeight: "700",
    },
    fastTypeSubmitButton: {
      marginTop: 8,
      minWidth: 112,
      height: 40,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
    },
    fastTypeSubmitButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 14,
      fontWeight: "700",
    },
    fastTypeIntroCard: {
      width: "100%",
      minHeight: 248,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 14,
      justifyContent: "flex-start",
    },
    fastTypeIntroTitle: {
      color: CORES.EX_BLUE_DEEP,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },
    fastTypeIntroText: {
      color: CORES.TEXT,
      fontSize: 13,
      lineHeight: 21,
      marginBottom: 5,
    },
    fastTypeIntroAccentBlue: {
      color: CORES.EX_BLUE_DEEP,
      fontWeight: "700",
    },
    fastTypeIntroHighlight: {
      color: CORES.SUCCESS_DARK,
      fontSize: 13,
      lineHeight: 21,
      marginTop: 10,
      fontWeight: "700",
    },
    fastTypeIntroFooter: {
      color: CORES.EX_BLUE,
      fontSize: 13,
      fontWeight: "700",
      marginTop: 10,
      marginBottom: 10,
    },
    fastTypeIntroContinue: {
      alignSelf: "flex-start",
      marginTop: "auto",
    },
    fastTypeIntroContinueText: {
      color: CORES.EX_BLUE_DEEP,
      fontSize: 13,
      fontWeight: "700",
    },
    fastTypeFeedbackCard: {
      width: "100%",
      minHeight: 248,
      paddingHorizontal: 2,
      paddingVertical: 4,
      justifyContent: "flex-start",
    },
    fastTypeFeedbackHeader: {
      color: CORES.EX_BLUE_DEEP,
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 10,
    },
    fastTypeFeedbackScore: {
      color: CORES.TEXT,
      fontSize: 13,
      marginBottom: 8,
    },
    fastTypeFeedbackSummaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    fastTypeFeedbackSummaryDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    fastTypeFeedbackSummaryDotDanger: {
      backgroundColor: CORES.DANGER_FILL,
    },
    fastTypeFeedbackSummaryDotWarning: {
      backgroundColor: CORES.GOLD,
    },
    fastTypeFeedbackSummaryDotSuccess: {
      backgroundColor: CORES.SUCCESS,
    },
    fastTypeFeedbackSummary: {
      color: CORES.TEXT,
      fontSize: 13,
    },
    fastTypeFeedbackSectionTitle: {
      color: CORES.EX_BLUE_DEEP,
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 10,
    },
    fastTypeFeedbackList: {
      gap: 14,
    },
    fastTypeFeedbackItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    },
    fastTypeFeedbackCopy: {
      flex: 1,
    },
    fastTypeFeedbackWrongWord: {
      color: CORES.TEXT,
      fontSize: 15,
      marginBottom: 2,
    },
    fastTypeFeedbackLine: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 3,
    },
    fastTypeFeedbackLineIcon: {
      fontSize: 16,
      lineHeight: 18,
      width: 18,
      textAlign: "center",
    },
    fastTypeFeedbackLineIconWrong: {
      color: CORES.DANGER,
      marginTop: 1,
      fontSize: 16,
      lineHeight: 18,
      width: 18,
      textAlign: "center",
    },
    fastTypeFeedbackLineText: {
      color: CORES.TEXT,
      fontSize: 13,
      lineHeight: 18,
    },
    fastTypeFeedbackPerfectRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    fastTypeFeedbackPerfectIcon: {
      color: CORES.SUCCESS_TEXT,
      fontSize: 14,
      fontWeight: "700",
    },
    fastTypeFeedbackPerfectText: {
      color: CORES.TEXT,
      fontSize: 13,
    },
    fastTypeNextButton: {
      marginTop: 18,
      alignSelf: "center",
      minWidth: 180,
      height: 44,
      paddingHorizontal: 18,
      borderRadius: 12,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
    },
    fastTypeNextButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 14,
      fontWeight: "700",
    },
  });

export default ex11;

/*

  {
    component: Exercise11,
    activity: {
      prompt: "Escreva rápido",
      title: "Escreva a palavra abaixo",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Hello", "Bye", "Fine", "Thanks", "Sorry"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },

*/
