import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/AuthContext";
import { useThemedStyles } from "../../../theme";

const STORAGE_KEY = "@curso_progress_v1";

/* =========================
   MÓDULOS
========================= */

const modules = [
  {
    name: "CRM Basics & Professional Greetings",
    subtitle: "📌 Primeira impressão profissional",
  },
  {
    name: "Identity Verification & Security",
    subtitle: "📌 Segurança e clareza",
  },
  {
    name: "Account Status & Transactions",
    subtitle: "📌 Explicar status e movimentações",
  },
  {
    name: "Payments, Billing & Fees",
    subtitle: "📌 Resolver dúvidas financeiras",
  },
  { name: "Complaints & Problem Solving", subtitle: "📌 Atendimento empático" },
  {
    name: "Cross-selling & Products",
    subtitle: "📌 Oferecer produtos com naturalidade",
  },
  {
    name: "Chat & Email Communication",
    subtitle: "📌 Comunicação escrita clara",
  },
  {
    name: "Escalation & Internal CRM",
    subtitle: "📌 Comunicação interna eficiente",
  },
  { name: "Meetings, Reports & KPIs", subtitle: "📌 Comunicação com gestores" },
  {
    name: "Compliance, Privacy & Review",
    subtitle: "📌 Atendimento seguro e legal",
  },
];

/* =========================
   AULAS
========================= */

const sampleLessons = [
  {
    module: 0,
    id: "S1",
    title: "Professional greetings (chat & phone)",
    screen: "CRM1",
  },
  { module: 0, id: "S2", title: "Introducing yourself and your role" },
  { module: 0, id: "S3", title: "Polite tone & customer-first language" },

  { module: 1, id: "S4", title: "Asking for personal details" },
  { module: 1, id: "S5", title: "Verifying identity politely" },
  { module: 1, id: "S6", title: "Security questions & blocked accounts" },

  { module: 2, id: "S7", title: "Talking about account status" },
  { module: 2, id: "S8", title: "Recent transactions & balances" },
  { module: 2, id: "S9", title: "Errors, delays & system issues" },

  { module: 3, id: "S10", title: "Payments & due dates" },
  { module: 3, id: "S11", title: "Fees, charges & refunds" },
  { module: 3, id: "S12", title: "Explaining bank statements" },

  { module: 4, id: "S13", title: "Apologising professionally" },
  { module: 4, id: "S14", title: "Understanding the customer problem" },
  { module: 4, id: "S15", title: "Offering solutions & alternatives" },

  { module: 5, id: "S16", title: "Introducing a product or service" },
  { module: 5, id: "S17", title: "Explaining benefits (not features)" },
  { module: 5, id: "S18", title: "Closing politely & next steps" },

  { module: 6, id: "S19", title: "Chat language (short & clear)" },
  { module: 6, id: "S20", title: "Professional emails" },
  { module: 6, id: "S21", title: "Follow-ups & confirmations" },

  { module: 7, id: "S22", title: "Escalating an issue" },
  { module: 7, id: "S23", title: "Writing internal CRM notes" },
  { module: 7, id: "S24", title: "Handovers between teams" },

  { module: 8, id: "S25", title: "Talking about numbers & KPIs" },
  { module: 8, id: "S26", title: "Reporting problems & results" },
  { module: 8, id: "S27", title: "Giving updates to managers" },

  { module: 9, id: "S28", title: "Data privacy & sensitive information" },
  { module: 9, id: "S29", title: "Compliance do's and don'ts" },
  { module: 9, id: "S30", title: "Final review & assessment" },
];

/* =========================
   TELA
========================= */

export default function CourseScreen({ navigation }) {
  const styles = useThemedStyles(makeStyles);
  const { user } = useAuth();
  const nomeUsuario = user?.login || "Usuário";

  const [progressMap, setProgressMap] = useState({});
  const [openModules, setOpenModules] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setProgressMap(raw ? JSON.parse(raw) : {});
    };

    const unsub = navigation.addListener("focus", loadProgress);
    return unsub;
  }, [navigation]);

  const lessonsByModule = modules.map((_, index) =>
    sampleLessons.filter((l) => l.module === index),
  );

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const goToLesson = (lesson) => {
    navigation.navigate(lesson.screen, {
      lesson,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.area}>Área Santander</Text>
        <Text style={styles.hello}>Hello, {nomeUsuario}!</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {lessonsByModule.map((lessons, moduleIndex) => {
          const isOpen = !!openModules[moduleIndex];

          return (
            <View key={moduleIndex} style={styles.moduleCard}>
              <TouchableOpacity
                style={styles.moduleHeader}
                onPress={() => toggleModule(moduleIndex)}
              >
                <View style={styles.moduleNumber}>
                  <Text style={styles.moduleNumberText}>{moduleIndex + 1}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.moduleTitle}>
                    {modules[moduleIndex].name}
                  </Text>
                  <Text style={styles.moduleSubtitle}>
                    {modules[moduleIndex].subtitle}
                  </Text>
                </View>

                <Text style={styles.arrow}>{isOpen ? "⌃" : "⌄"}</Text>
              </TouchableOpacity>

              {isOpen &&
                lessons.map((lesson) => {
                  const done = !!progressMap[lesson.id];
                  const globalIndex =
                    sampleLessons.findIndex((l) => l.id === lesson.id) + 1;

                  return (
                    <TouchableOpacity
                      key={lesson.id}
                      style={styles.lessonRow}
                      onPress={() => goToLesson(lesson)}
                    >
                      <View
                        style={[
                          styles.lessonCircle,
                          done && styles.lessonCircleDone,
                        ]}
                      >
                        <Text
                          style={[
                            styles.lessonCircleText,
                            done && styles.lessonCircleTextDone,
                          ]}
                        >
                          {globalIndex}
                        </Text>
                      </View>

                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   ESTILOS
========================= */

const makeStyles = (CORES) => {
  const MUTED = CORES.TEXT_MUTED;
  const TEXT = CORES.TEXT;

  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: CORES.SANT_BG,
    },

    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      marginBottom: 20,
    },

    area: {
      fontSize: 13,
      color: MUTED,
      marginBottom: 4,
    },

    hello: {
      fontSize: 24,
      fontWeight: "700",
      color: TEXT,
    },

    moduleCard: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 16,
      marginBottom: 18,
      elevation: 2,
      overflow: "hidden",
    },

    moduleHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },

    moduleNumber: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: CORES.PRIMARY,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    moduleNumberText: {
      color: CORES.ON_ACCENT,
      fontWeight: "700",
    },

    moduleTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: CORES.TEXT,
    },

    moduleSubtitle: {
      fontSize: 12,
      marginTop: 2,
    },

    arrow: {
      fontSize: 18,
      color: CORES.TEXT_FAINT,
    },

    lessonRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderTopWidth: 1,
      borderTopColor: CORES.BORDER,
    },

    lessonCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: CORES.TRACK,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    lessonCircleDone: {
      backgroundColor: CORES.SUCCESS,
    },

    lessonCircleText: {
      fontSize: 12,
      fontWeight: "700",
      color: CORES.TEXT_MUTED,
    },

    lessonCircleTextDone: {
      color: CORES.ON_ACCENT,
    },

    lessonTitle: {
      fontSize: 14,
      color: CORES.TEXT,
      flex: 1,
    },
  });
};
