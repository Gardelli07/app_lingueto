import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../theme";
import { Images } from "../util/images";
import { criarPost } from "../services/comunidade";
import { getSlidePostId, markSlidePosted } from "../util/exercisePosts";
import { isOffensive } from "../util/profanityFilter";

export function Exercise12({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
  slideKey,
}) {
  const CORES = useTheme();
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const [text, setText] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";
  const hasTip =
    typeof activity?.tipText === "string" && activity.tipText.trim().length > 0;
  const canSubmit = text.trim().length >= (activity.minLength || 1);

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

  const handleSubmit = () => {
    if (!canSubmit || result) return;
    onAttempt?.({ isCorrect: true });
    setResult("correct");
    postAnswerToCommunity();
  };

  const postAnswerToCommunity = async () => {
    try {
      const jaPostado = await getSlidePostId(slideKey);
      if (jaPostado) return;

      const respostaTexto = text.trim();
      if (isOffensive(respostaTexto)) return;

      const aulaPrompt = [activity.instruction, activity.helperText]
        .filter((parte) => typeof parte === "string" && parte.trim().length > 0)
        .join("\n")
        .slice(0, 1000);
      const novo = await criarPost(respostaTexto, { aulaPrompt });
      if (novo?.id != null) {
        await markSlidePosted(slideKey, novo.id);
      }
    } catch (error) {
      console.error(
        "[ex12] falha ao publicar resposta na comunidade:",
        error?.status,
        error?.message,
        error
      );
    }
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.writeIntroBlock}>
        <Text style={styles.writeIntroPrompt}>{activity.prompt}</Text>
        <Text style={styles.writeIntroInstruction}>{activity.instruction}</Text>
        <Text
          style={[
            styles.writeIntroHelperText,
            activity.image && styles.writeIntroHelperTextWithImage,
          ]}
        >
          {activity.helperText}
        </Text>

        {activity.image ? (
          <View style={styles.writeIntroImageFrame}>
            <Image source={activity.image} style={styles.writeIntroImage} />
          </View>
        ) : null}

        <View style={styles.writeIntroBox}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.writeIntroInput}
            multiline
            textAlignVertical="top"
            placeholder={activity.placeholder}
            placeholderTextColor={CORES.TEXT_FAINT}
          />

          <TouchableOpacity
            style={[
              styles.writeIntroSendButton,
              !canSubmit && styles.writeIntroSendButtonDisabled,
            ]}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <Image
              source={Images.setaD}
              style={styles.writeIntroSendButtonImage}
            />
          </TouchableOpacity>
        </View>

        {hasTip && (
          <TouchableOpacity
            style={styles.writeIntroTipButton}
            onPress={() => setShowTip((current) => !current)}
            activeOpacity={0.9}
          >
            <Image source={Images.tip} style={styles.writeIntroTipButtonImage} />
          </TouchableOpacity>
        )}

        {hasTip && showTip && (
          <View style={styles.writeIntroTipCard}>
            <Text style={styles.writeIntroTipText}>{activity.tipText}</Text>
          </View>
        )}
      </View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
              styles.slide12SuccessAlertCard,
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
                ✓ Muito bem!
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

const ex12 = (CORES) =>
  StyleSheet.create({
    writeIntroBlock: {
      width: "100%",
      alignItems: "center",
    },
    writeIntroPrompt: {
      width: "88%",
      textAlign: "left",
      fontSize: 24,
      color: CORES.EX_BLUE,
      fontWeight: "700",
      marginBottom: 8,
    },
    writeIntroInstruction: {
      width: "88%",
      textAlign: "left",
      fontSize: 15,
      color: CORES.SUCCESS_TEXT,
      fontWeight: "700",
    },
    writeIntroHelperText: {
      width: "88%",
      textAlign: "left",
      fontSize: 14,
      color: CORES.SUCCESS_TEXT,
      marginBottom: 18,
    },
    writeIntroHelperTextWithImage: {
      marginBottom: 8,
    },
    writeIntroImageFrame: {
      width: "88%",
      maxWidth: 520,
      aspectRatio: 16 / 9,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 10,
      backgroundColor: CORES.SURFACE_MUTED,
    },
    writeIntroImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    writeIntroBox: {
      width: "88%",
      minHeight: 176,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: CORES.EX_BLUE,
      backgroundColor: CORES.SURFACE,
      padding: 12,
      marginBottom: 16,
    },
    writeIntroInput: {
      flex: 1,
      minHeight: 136,
      color: CORES.TEXT_DARK,
      fontSize: 16,
    },
    writeIntroSendButton: {
      position: "absolute",
      right: 8,
      bottom: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: CORES.EX_BLUE,
      alignItems: "center",
      justifyContent: "center",
    },
    writeIntroSendButtonDisabled: {
      backgroundColor: CORES.EX_DISABLED,
    },
    writeIntroSendButtonImage: {
      width: 25,
      height: 25,
      resizeMode: "contain",
    },
    writeIntroTipButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
      marginRight: "6%",
      marginBottom: 12,
    },
    writeIntroTipButtonImage: {
      width: 54,
      height: 54,
      resizeMode: "contain",
    },
    writeIntroTipCard: {
      width: "88%",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      padding: 12,
    },
    writeIntroTipText: {
      color: CORES.TEXT_DARK,
      fontSize: 14,
    },
    slide12SuccessAlertCard: {
      marginHorizontal: 12,
      marginBottom: 0,
      zIndex: 200,
      elevation: 30,
    },
  });

export default ex12;

/*

  {
    component: Exercise12,
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Olhe para a foto de uma pizza deliciosa. Escreva uma frase dizendo que ela NÃO é ruim (bad).",
      image: IC.A14S12,
      placeholder: "Hello...",
      tipText: '"It isn\'t bad" ou "It is not bad".',
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },

  */
