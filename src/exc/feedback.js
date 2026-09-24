import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSON_STREAK_MIN_ACCURACY } from "../util/lessonPerformance";
import { formatXp } from "../util/xp";
import { useTheme, useThemedStyles } from "../theme";

export default function Feedback({
  onContinue,
  continueLabel = "Continuar",
  earnedXp = 0,
  accuracy = 0,
  streak = 0,
  totalXp = 0,
  currentLevel = 1,
  levelPercent = 0,
  xpAtCurrentLevel = 0,
  xpAtNextLevel = 0,
  lessonAlreadyCompleted = false,
  reviewLabel,
  onReview,
}) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const streakMaintained =
    !lessonAlreadyCompleted && accuracy >= LESSON_STREAK_MIN_ACCURACY;

  const infoTitle = lessonAlreadyCompleted
    ? "Aula já concluída"
    : streakMaintained
      ? "Sequência aumentou!"
      : "Sequência reiniciada";

  const infoText = lessonAlreadyCompleted
    ? "O XP e a sequência desta aula já tinham sido contabilizados."
    : streakMaintained
      ? `Você fechou a aula com ${accuracy}% e chegou a ${streak} de sequência.`
      : `Para manter a sequência, finalize com pelo menos ${LESSON_STREAK_MIN_ACCURACY}% de precisão.`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.badgeWrap}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <Ionicons name="checkmark" size={40} color={CORES.ON_ACCENT} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Lição Completa!</Text>
        <Text style={styles.subtitle}>
          Você terminou a aula. Vamos acompanhar seu desempenho final.
        </Text>

        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, styles.metricCardBlue]}>
            <Text style={[styles.metricValue, styles.metricValueBlue]}>
              +{earnedXp}
            </Text>
            <Text style={styles.metricLabel}>XP</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardOrange]}>
            <Text style={[styles.metricValue, styles.metricValueOrange]}>
              {accuracy}%
            </Text>
            <Text style={styles.metricLabel}>PRECISÃO</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardPurple]}>
            <Text style={[styles.metricValue, styles.metricValuePurple]}>
              {streak} {"\uD83D\uDD25"}
            </Text>
            <Text style={styles.metricLabel}>SEQUÊNCIA</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progresso do Nível</Text>
            <Text style={styles.progressLevel}>Nível {currentLevel}</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.max(0, Math.min(levelPercent, 100))}%` },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressFootText}>
              {formatXp(Math.max(totalXp, xpAtCurrentLevel))} XP
            </Text>
            <Text style={styles.progressFootText}>
              {formatXp(xpAtNextLevel)} XP
            </Text>
          </View>
        </View>

        <View style={styles.bonusCard}>
          <View style={styles.bonusIconWrap}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={14}
              color={CORES.FB_ORANGE}
            />
          </View>

          <View style={styles.bonusContent}>
            <Text style={styles.bonusTitle}>{infoTitle}</Text>
            <Text style={styles.bonusText}>{infoText}</Text>
          </View>

          <View style={styles.bonusPill}>
            <Text style={styles.bonusPillText}>
              {lessonAlreadyCompleted ? "0 XP" : `${LESSON_STREAK_MIN_ACCURACY}%+`}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.primaryButton}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>{continueLabel}</Text>
        </TouchableOpacity>

        {onReview && reviewLabel && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.reviewButton}
            onPress={onReview}
          >
            <Text style={styles.reviewButtonText}>{reviewLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: CORES.SURFACE,
    },
    container: {
      flex: 1,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 24,
      alignItems: "center",
    },
    badgeWrap: {
      marginTop: 6,
      marginBottom: 14,
    },
    badgeOuter: {
      width: 82,
      height: 82,
      borderRadius: 41,
      backgroundColor: CORES.FB_BLUE_BG_SOFT,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.FB_BLUE_BRIGHT,
      shadowOpacity: 0.18,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },
    badgeInner: {
      width: 66,
      height: 66,
      borderRadius: 33,
      backgroundColor: CORES.FB_BLUE_BRIGHT,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "800",
      color: CORES.FB_BLUE_TEXT,
      marginBottom: 6,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 13,
      color: CORES.TEXT_MUTED,
      marginBottom: 24,
      textAlign: "center",
    },
    metricsRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 18,
    },
    metricCard: {
      width: "30.5%",
      borderRadius: 13,
      paddingVertical: 12,
      alignItems: "center",
      borderWidth: 1,
    },
    metricCardBlue: {
      backgroundColor: CORES.FB_BLUE_BG,
      borderColor: CORES.FB_BLUE_BORDER,
    },
    metricCardOrange: {
      backgroundColor: CORES.FB_ORANGE_BG,
      borderColor: CORES.FB_ORANGE_BORDER,
    },
    metricCardPurple: {
      backgroundColor: CORES.FB_PURPLE_BG,
      borderColor: CORES.FB_PURPLE_BORDER,
    },
    metricValue: {
      fontSize: 27,
      fontWeight: "800",
      marginBottom: 2,
    },
    metricValueBlue: {
      color: CORES.FB_BLUE_VALUE,
    },
    metricValueOrange: {
      color: CORES.FB_ORANGE_VALUE,
    },
    metricValuePurple: {
      color: CORES.FB_PURPLE,
    },
    metricLabel: {
      fontSize: 10,
      fontWeight: "700",
      color: CORES.TEXT_FAINT,
      letterSpacing: 0.4,
    },
    progressSection: {
      width: "100%",
      marginBottom: 26,
    },
    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    progressTitle: {
      fontSize: 11,
      color: CORES.TEXT_MUTED,
      fontWeight: "600",
    },
    progressLevel: {
      fontSize: 11,
      color: CORES.FB_BLUE_LEVEL,
      fontWeight: "700",
    },
    progressTrack: {
      width: "100%",
      height: 6,
      borderRadius: 999,
      backgroundColor: CORES.FB_TRACK,
      overflow: "hidden",
      marginBottom: 6,
    },
    progressFill: {
      height: "100%",
      backgroundColor: CORES.FB_BLUE_DEEP,
      borderRadius: 999,
    },
    progressFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressFootText: {
      fontSize: 10,
      color: CORES.TEXT_FAINT,
      fontWeight: "500",
    },
    bonusCard: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: CORES.FB_ORANGE_BG_SOFT,
      borderWidth: 1,
      borderColor: CORES.FB_ORANGE_CARD_BORDER,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 34,
    },
    bonusIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: CORES.FB_ORANGE_ICON_BG,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    bonusContent: {
      flex: 1,
      paddingRight: 10,
    },
    bonusTitle: {
      fontSize: 13,
      color: CORES.TEXT,
      fontWeight: "800",
      marginBottom: 2,
    },
    bonusText: {
      fontSize: 11,
      lineHeight: 16,
      color: CORES.TEXT_MUTED,
    },
    bonusPill: {
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: CORES.FB_ORANGE_PILL,
    },
    bonusPillText: {
      fontSize: 10,
      color: CORES.FB_ORANGE,
      fontWeight: "800",
    },
    primaryButton: {
      width: "100%",
      height: 54,
      borderRadius: 14,
      backgroundColor: CORES.FB_BLUE,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.FB_BLUE,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
      marginTop: "auto",
      marginBottom: 12,
    },
    primaryButtonText: {
      color: CORES.ON_ACCENT,
      fontSize: 16,
      fontWeight: "800",
    },
    reviewButton: {
      marginTop: 4,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    reviewButtonText: {
      color: CORES.TEXT_MUTED,
      fontSize: 14,
      fontWeight: "700",
    },
  });
