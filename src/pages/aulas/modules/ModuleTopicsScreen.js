import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../../../exc/grammarlab/theme";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../exc/grammarlab/icons";
import { classCount } from "./goldRush";

// Primeira tela de um modulo (TopicsScreen do repo my-trip-to-florida): um
// card por tema. O botao de voltar (para a pagina do curso) nao existe no
// repo, que abria direto nesta tela.
//
// course: { title, kicker, KickerIcon, subtitle, backLabel, topics,
// classesRoute, ... } (ver travel/florida/index.js e business/marketing).
// Topico com `level` mostra o nivel antes do numero de aulas.
export default function ModuleTopicsScreen({ navigation, course }) {
  const { KickerIcon } = course;
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 28,
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={course.backLabel}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ChevronLeftIcon size={16} color={colors.textSoft} />
        </Pressable>

        <View style={styles.kickerRow}>
          <KickerIcon color={colors.amberText} />
          <Text style={styles.kicker}>{course.kicker}</Text>
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {course.title}
        </Text>
        <Text style={styles.subtitle}>{course.subtitle}</Text>

        <View style={styles.list}>
          {course.topics.map((topic) => {
            const count = classCount(topic);
            return (
              <Pressable
                key={topic.num}
                accessibilityRole="button"
                accessibilityLabel={`${topic.num} ${topic.section}`}
                onPress={() => navigation.navigate(course.classesRoute, { topicNum: topic.num })}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { transform: [{ translateY: 2 }], boxShadow: "none" },
                ]}
              >
                <View style={[styles.tile, { backgroundColor: topic.color[0] }]}>
                  <Text style={[styles.tileText, { color: topic.color[1] }]}>{topic.num}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{topic.section}</Text>
                  <Text style={styles.cardMeta}>
                    {topic.level ? `${topic.level} · ` : ""}
                    {count} {count === 1 ? "aula" : "aulas"}
                  </Text>
                </View>
                <ChevronRightIcon color={colors.textMuted} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  kicker: { fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 1.2, color: colors.amberText },
  title: { marginTop: 8, fontFamily: fonts.extrabold, fontSize: 30, lineHeight: 36, color: colors.text },
  subtitle: { marginTop: 6, fontFamily: fonts.medium, fontSize: 15, lineHeight: 21, color: colors.subtitle },
  list: { gap: 12, marginTop: 22 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    boxShadow: "0 3px 0 #232a40",
  },
  tile: { width: 52, height: 52, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  tileText: { fontFamily: fonts.extrabold, fontSize: 18 },
  cardTitle: { fontFamily: fonts.extrabold, fontSize: 17, lineHeight: 22, color: colors.text },
  cardMeta: { marginTop: 2, fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted },
});
