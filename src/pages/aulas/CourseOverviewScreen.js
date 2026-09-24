import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme, useThemedStyles } from "../../theme";
import { fetchAulaAccessMap } from "../../services/conteudos";
import { scopedKey } from "../../util/userScope";
import { useAuth } from "../../context/AuthContext";
import { hasFullAccess } from "../../util/plans";

async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function CourseOverviewScreen({
  navigation,
  route,
  courseName,
  storageKey,
  moduleDefs,
  lessons,
}) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { user } = useAuth();
  const fullAccess = hasFullAccess(user);

  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const openedRef = useRef(false);
  const [progressMap, setProgressMap] = useState({});
  const [openModuleId, setOpenModuleId] = useState(0);
  const [aulaAccessMap, setAulaAccessMap] = useState(null);

  const isLessonUnlocked = (screenName) =>
    fullAccess || !aulaAccessMap || aulaAccessMap[screenName] !== false;

  useEffect(() => {
    const sub = navigation.addListener("focus", async () => {
      const progress = await loadProgress(storageKey);
      setProgressMap(progress);
    });
    return sub;
  }, [navigation, storageKey]);

  useEffect(() => {
    loadProgress(storageKey).then((progress) => setProgressMap(progress));
  }, [storageKey]);

  useEffect(() => {
    let active = true;
    fetchAulaAccessMap()
      .then((map) => {
        if (active) setAulaAccessMap(map);
      })
      .catch(() => {
        if (active) setAulaAccessMap({});
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!autoOpenLessonId || openedRef.current) return;
    if (aulaAccessMap === null) return;

    const lesson = lessons.find(
      (item) => String(item.id) === String(autoOpenLessonId),
    );

    if (!lesson?.screen) return;
    if (!isLessonUnlocked(lesson.screen)) return;

    openedRef.current = true;
    navigation.setParams({ autoOpenLessonId: null });

    requestAnimationFrame(() => {
      navigation.replace(lesson.screen, {
        lesson,
        lessons,
      });
    });
  }, [autoOpenLessonId, lessons, navigation, aulaAccessMap]);

  const lessonsByModule = useMemo(() => {
    return moduleDefs.reduce((acc, moduleItem) => {
      acc[moduleItem.id] = lessons.filter(
        (lesson) => lesson.module === moduleItem.id,
      );
      return acc;
    }, {});
  }, [lessons, moduleDefs]);

  const goToLesson = (lesson) => {
    if (!lesson?.screen) return;
    if (!isLessonUnlocked(lesson.screen)) {
      navigation.navigate("Paywall");
      return;
    }

    navigation.navigate(lesson.screen, {
      lesson,
      lessons,
    });
  };

  const toggleModule = (moduleItem) => {
    if (moduleItem.locked) return;
    setOpenModuleId((prev) => (prev === moduleItem.id ? null : moduleItem.id));
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle={CORES.statusBarStyle} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <Text style={styles.courseName}>{courseName}</Text>
        </View>

        {moduleDefs.map((moduleItem) => {
          const moduleLessons = lessonsByModule[moduleItem.id] || [];
          const moduleCompleted = moduleLessons.filter(
            (lesson) => progressMap[lesson.id],
          ).length;
          const isOpen = openModuleId === moduleItem.id;

          return (
            <View key={moduleItem.id} style={styles.moduleWrap}>
              <TouchableOpacity
                style={[
                  styles.moduleCard,
                  moduleItem.locked && styles.moduleCardLocked,
                ]}
                onPress={() => toggleModule(moduleItem)}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.moduleIndex,
                    {
                      backgroundColor: moduleItem.locked
                        ? CORES.HOME_LOCKED_ICON
                        : moduleItem.accent || CORES.PRIMARY,
                    },
                  ]}
                >
                  <Text style={styles.moduleIndexText}>
                    {moduleItem.id + 1}
                  </Text>
                </View>

                <View style={styles.moduleTextArea}>
                  <Text
                    style={[
                      styles.moduleTitle,
                      moduleItem.locked && styles.lockedText,
                    ]}
                  >
                    {moduleItem.name}
                  </Text>
                  {!moduleItem.locked && (
                    <Text style={styles.moduleMeta}>
                      {moduleCompleted}/{moduleLessons.length} aulas concluidas
                    </Text>
                  )}
                </View>

                <MaterialCommunityIcons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={moduleItem.locked ? CORES.HOME_LOCKED : CORES.COURSE_TEXT_SOFT}
                />
              </TouchableOpacity>

              {isOpen && !moduleItem.locked && (
                <View style={styles.lessonContainer}>
                  {moduleLessons.map((lesson, index) => {
                    const done = !!progressMap[lesson.id];
                    const hasScreen = !!lesson.screen;
                    const isFree = isLessonUnlocked(lesson.screen);
                    const isLocked = hasScreen && !isFree;
                    const isPlayable = hasScreen && isFree;
                    const isLast = index === moduleLessons.length - 1;

                    return (
                      <TouchableOpacity
                        key={lesson.id}
                        style={[
                          styles.lessonButton,
                          !isLast && styles.lessonDivider,
                        ]}
                        onPress={() => goToLesson(lesson)}
                        disabled={!hasScreen}
                        activeOpacity={0.85}
                      >
                        <View style={styles.lessonLeft}>
                          <View
                            style={[
                              styles.lessonIndex,
                              done && styles.lessonIndexDone,
                            ]}
                          >
                            <Text
                              style={[
                                styles.lessonIndexText,
                                done && styles.lessonIndexTextDone,
                              ]}
                            >
                              {index + 1}
                            </Text>
                          </View>

                          <View style={styles.lessonTextArea}>
                            <Text
                              style={[
                                styles.lessonTitle,
                                !isPlayable && styles.lockedText,
                              ]}
                            >
                              {lesson.title}
                            </Text>
                          </View>
                        </View>

                        <MaterialCommunityIcons
                          name={
                            done
                              ? "check-circle"
                              : isLocked
                                ? "lock-outline"
                                : "chevron-right"
                          }
                          size={18}
                          color={
                            done
                              ? CORES.PLACEMENT_ACCENT
                              : isPlayable
                                ? CORES.COURSE_TEXT_SOFT
                                : CORES.TEXT_FAINT
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: CORES.BACKGROUND,
    },
    scroll: {
      flex: 1,
      backgroundColor: CORES.BACKGROUND,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 40,
    },
    headerBlock: {
      marginBottom: 12,
    },
    courseName: {
      color: CORES.COURSE_TEXT_STRONG,
      fontSize: 31,
      fontWeight: "800",
    },
    moduleWrap: {
      marginTop: 12,
    },
    moduleCard: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: CORES.COURSE_BORDER,
      paddingHorizontal: 14,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: CORES.SHADOW,
      shadowOpacity: CORES.mode === "dark" ? 0.35 : 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    moduleCardLocked: {
      backgroundColor: CORES.SURFACE_ALT,
    },
    moduleIndex: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    moduleIndexText: {
      color: CORES.ON_ACCENT,
      fontSize: 14,
      fontWeight: "800",
    },
    moduleTextArea: {
      flex: 1,
    },
    moduleTitle: {
      color: CORES.COURSE_TEXT_STRONG,
      fontSize: 18,
      fontWeight: "800",
    },
    moduleSubtitle: {
      color: CORES.COURSE_TEXT_MID,
      fontSize: 13,
      marginTop: 3,
      fontWeight: "600",
    },
    moduleMeta: {
      color: CORES.PRIMARY,
      fontSize: 12,
      marginTop: 6,
      fontWeight: "700",
    },
    lockedText: {
      color: CORES.TEXT_FAINT,
    },
    lessonContainer: {
      marginTop: 8,
      backgroundColor: CORES.SURFACE,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: CORES.COURSE_BORDER,
      overflow: "hidden",
    },
    lessonButton: {
      paddingHorizontal: 14,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    lessonDivider: {
      borderBottomWidth: 1,
      borderBottomColor: CORES.COURSE_BORDER,
    },
    lessonLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    lessonIndex: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: CORES.TRACK,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    lessonIndexDone: {
      backgroundColor: CORES.SUCCESS_BG,
    },
    lessonIndexText: {
      color: CORES.COURSE_TEXT_SOFT,
      fontSize: 12,
      fontWeight: "800",
    },
    lessonIndexTextDone: {
      color: CORES.SUCCESS_TEXT,
    },
    lessonTextArea: {
      flex: 1,
      paddingRight: 12,
    },
    lessonTitle: {
      color: CORES.COURSE_TEXT_STRONG,
      fontSize: 15,
      fontWeight: "400",
    },
    lessonType: {
      color: CORES.COURSE_TEXT_SOFT,
      fontSize: 12,
      marginTop: 2,
      fontWeight: "600",
    },
  });
