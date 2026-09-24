import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Text as SvgText, TSpan } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import { getLevelProgress, XP_PER_LESSON } from "../util/xp";
import { useTheme, useThemedStyles } from "../theme";
import { fetchAulaAccessMap } from "../services/conteudos";
import { fetchResumoProgresso } from "../services/progresso";
import * as dailyGoals from "../util/dailyGoals";
import { hasFullAccess } from "../util/plans";
import {
  COURSE_OPTIONS,
  LEVEL_OPTIONS,
  LEVEL_CONFIG,
  COURSE_CONFIG,
  BUSINESS_LEVEL_CONFIG,
  TRAVEL_LEVEL_CONFIG,
  COURSE_LEVEL_AVAILABILITY,
  getCourseLevelConfig,
  loadProgress,
} from "../util/courseCatalog";
import StudyTimeModal from "../components/StudyTimeModal";
import {
  enableDailyReminder,
  hasPromptedStudyTime,
  markStudyTimePrompted,
} from "../services/notifications";
import { bussinesModuleDefs, bussinesSampleLessons } from "./aulas/bussines";
import {
  bussinesB1ModuleDefs,
  bussinesB1SampleLessons,
} from "./aulas/bussines/B1";
import { inglesModuleDefs, inglesSampleLessons } from "./aulas/completo/A0-A1";
import {
  inglesModuleDefs as inglesA2ModuleDefs,
  inglesSampleLessons as inglesA2SampleLessons,
} from "./aulas/completo/A2";
import {
  inglesModuleDefs as inglesB1ModuleDefs,
  inglesSampleLessons as inglesB1SampleLessons,
} from "./aulas/completo/B1";
import { travelModuleDefs, travelSampleLessons } from "./aulas/viagem/A1";
import NotificationBell from "../components/NotificationBell";

// Acentos de curso/nivel: sao fundos solidos com icone branco por cima, entao
// no tema escuro usam a versao mais clara pra nao sumirem no card.
const LEVEL_ACCENT = {
  light: {
    Starter: "#2E9E6B",
    Elementary: "#3E6FB8",
    Intermediate: "#7A5BC0",
    Advanced: "#1E97A8",
  },
  dark: {
    Starter: "#3DC486",
    Elementary: "#6E82FF",
    Intermediate: "#A17BEB",
    Advanced: "#2FC0D4",
  },
};

const COURSE_ACCENT = {
  light: {
    "Ingles Completo": "#2E9E6B",
    "Bussines English": "#2F4A78",
    "Ingles para viagem": "#1E97A8",
  },
  dark: {
    "Ingles Completo": "#3DC486",
    "Bussines English": "#5B6EF5",
    "Ingles para viagem": "#2FC0D4",
  },
};

const DIFFICULTY_LABEL = { facil: "Fácil", normal: "Normal", dificil: "Difícil" };
const difficultyColor = (CORES) => ({
  facil: CORES.HOME_GREEN,
  normal: CORES.HOME_AMBER,
  dificil: CORES.HOME_DANGER,
});

function ProgressCircle({ percent, size = 70, strokeWidth = 8 }) {
  const CORES = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={CORES.HOME_BORDER}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        stroke={CORES.HOME_PRIMARY}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />
      <SvgText
        x={size / 2}
        y={size / 2 + 6}
        textAnchor="middle"
        fill={CORES.HOME_NAVY}
        fontWeight="800"
        fontSize={16}
      >
        {Math.round(percent)}
        <TSpan dx={-1.5}>%</TSpan>
      </SvgText>
    </Svg>
  );
}

function QuickAction({ icon, label, primary, onPress }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.qa, primary ? styles.qaPrimary : styles.qaPlain]}
    >
      {icon}
      <Text
        style={[
          styles.qaLabel,
          { color: primary ? CORES.WHITE : CORES.HOME_NAVY },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function CourseCard({
  title,
  sub,
  tagLabel,
  started,
  percent,
  color,
  onPress,
}) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.course}
      activeOpacity={0.9}
    >
      <View style={[styles.courseIcon, { backgroundColor: color }]}>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={20}
          color={CORES.WHITE}
        />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.row}>
          <Text style={styles.courseName} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.tag, started ? styles.tagOn : styles.tagOff]}>
            <Text
              style={[
                styles.tagTxt,
                { color: started ? CORES.HOME_GREEN : CORES.HOME_FAINT },
              ]}
            >
              {started ? "Em curso" : "Novo"}
            </Text>
          </View>
        </View>
        <Text style={styles.courseSub} numberOfLines={1}>
          {sub}
        </Text>
        <View style={styles.progressRow}>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${started ? percent : 0}%`, backgroundColor: color },
              ]}
            />
          </View>
          <Text style={styles.meta}>{started ? `${percent}%` : tagLabel}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={CORES.TEXT_FAINT} />
    </TouchableOpacity>
  );
}

function PremiumBanner({ onPress }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      style={styles.premiumBanner}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.premiumIconWrap}>
        <MaterialCommunityIcons
          name="crown"
          size={22}
          color={CORES.HOME_AMBER}
        />
      </View>
      <View style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
        <Text style={styles.premiumTitle}>Premium Classes</Text>
        <Text style={styles.premiumSub}>
          Para quem quer dominar o inglês de vez
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={CORES.HOME_STREAK_TXT}
      />
    </TouchableOpacity>
  );
}

function ActivityRow({ item }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const map = {
    done: {
      bg: CORES.HOME_GREEN_BG,
      icon: "check",
      color: CORES.HOME_GREEN,
    },
    streak: {
      bg: CORES.HOME_STREAK_BG,
      icon: "fire",
      color: CORES.HOME_AMBER,
    },
  }[item.type];
  return (
    <View style={styles.activity}>
      <View style={[styles.activityIcon, { backgroundColor: map.bg }]}>
        <MaterialCommunityIcons name={map.icon} size={17} color={map.color} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.activityTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.activityMeta} numberOfLines={1}>
          {item.meta}
        </Text>
      </View>
      <Text style={[styles.activityValue, { color: map.color }]}>
        {item.value}
      </Text>
    </View>
  );
}

export default function Inglescompleto({ navigation, route }) {
  const { user } = useAuth();
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const DIFFICULTY_COLOR = difficultyColor(CORES);
  const fullAccess = hasFullAccess(user);
  const displayName = user?.nome_exibicao?.trim() || user?.login || "Usuário";
  const firstName = displayName.split(" ")[0];
  const avatarSource = user?.foto_url
    ? { uri: `${API_URL}${user.foto_url}` }
    : null;

  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const initialCourse = route?.params?.initialCourse ?? null;
  const initialLevel = route?.params?.initialLevel ?? "Starter";
  const openedRef = useRef(false);
  const scrollViewRef = useRef(null);
  const coursesSectionY = useRef(0);

  const [progressMap, setProgressMap] = useState({});
  const [openModuleId, setOpenModuleId] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel ?? "Starter");
  const [courseFilter, setCourseFilter] = useState("todos");
  const [levelFilter, setLevelFilter] = useState("todos");
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [courseStatsMap, setCourseStatsMap] = useState({});
  const [aulaAccessMap, setAulaAccessMap] = useState(null);
  const [studyTimeModalVisible, setStudyTimeModalVisible] = useState(false);
  const [dailyGoalsState, setDailyGoalsState] = useState({ goals: [] });
  const [xpTotal, setXpTotal] = useState(0);

  // Pergunta o horario de estudo uma unica vez, logo na primeira Home apos o
  // login (a flag fica salva no dispositivo independente do usuario decidir
  // ativar ou pular).
  useEffect(() => {
    let active = true;
    hasPromptedStudyTime().then((prompted) => {
      if (active && !prompted) setStudyTimeModalVisible(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleConfirmStudyTime = async (hour, minute) => {
    setStudyTimeModalVisible(false);
    await markStudyTimePrompted();
    const granted = await enableDailyReminder(hour, minute);
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Você pode ativar os lembretes depois em Perfil > Notificações.",
      );
    }
  };

  const handleSkipStudyTime = async () => {
    setStudyTimeModalVisible(false);
    await markStudyTimePrompted();
  };

  const isLessonUnlocked = (screenName) =>
    fullAccess || !aulaAccessMap || aulaAccessMap[screenName] !== false;

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

  const activeLevel = selectedLevel ?? "Starter";
  const activeLevelConfig = LEVEL_CONFIG[activeLevel] ?? LEVEL_CONFIG.Starter;
  const activeBusinessLevelConfig =
    BUSINESS_LEVEL_CONFIG[activeLevel] ?? BUSINESS_LEVEL_CONFIG.Starter;
  const activeTravelLevelConfig =
    TRAVEL_LEVEL_CONFIG[activeLevel] ?? TRAVEL_LEVEL_CONFIG.Starter;
  const isCourseList = !selectedCourse;

  const allLessons = useMemo(
    () => [
      ...inglesSampleLessons,
      ...inglesA2SampleLessons,
      ...inglesB1SampleLessons,
      ...bussinesSampleLessons,
      ...bussinesB1SampleLessons,
      ...travelSampleLessons,
    ],
    [],
  );
  const activeCourseId =
    COURSE_CONFIG[selectedCourse]?.courseId ?? "ingles_completo";
  const activeStorageKey =
    activeCourseId === "bussines"
      ? activeBusinessLevelConfig.storageKey
      : activeCourseId === "travel"
        ? activeTravelLevelConfig.storageKey
        : activeLevelConfig.storageKey;
  const activeModuleDefs = useMemo(() => {
    if (activeCourseId === "bussines") {
      return activeBusinessLevelConfig.moduleDefs;
    }
    if (activeCourseId === "travel") {
      return activeTravelLevelConfig.moduleDefs;
    }
    return activeLevelConfig.moduleDefs;
  }, [
    activeCourseId,
    activeBusinessLevelConfig,
    activeTravelLevelConfig,
    activeLevelConfig,
  ]);
  const activeLessons = useMemo(() => {
    if (activeCourseId === "bussines") return activeBusinessLevelConfig.lessons;
    if (activeCourseId === "travel") return activeTravelLevelConfig.lessons;
    return activeLevelConfig.lessons;
  }, [
    activeCourseId,
    activeBusinessLevelConfig,
    activeTravelLevelConfig,
    activeLevelConfig,
  ]);

  const loadAllCourseStats = useCallback(async () => {
    const entries = {};
    for (const level of LEVEL_OPTIONS) {
      const courses = COURSE_OPTIONS.filter((courseName) =>
        COURSE_LEVEL_AVAILABILITY[courseName]?.includes(level),
      );
      for (const courseName of courses) {
        const config = getCourseLevelConfig(courseName, level);
        if (!config.available) continue;
        const progress = await loadProgress(config.storageKey);
        const total = config.lessons.length;
        const completed = config.lessons.filter((l) => progress[l.id]).length;
        entries[`${courseName}__${level}`] = {
          total,
          completed,
          percent: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      }
    }
    setCourseStatsMap(entries);
  }, []);

  useEffect(() => {
    const sub = navigation.addListener("focus", async () => {
      const p = await loadProgress(activeStorageKey);
      setProgressMap(p);
    });
    return sub;
  }, [navigation, activeStorageKey]);

  useEffect(() => {
    loadProgress(activeStorageKey).then((p) => setProgressMap(p));
    setOpenModuleId(0);
  }, [activeStorageKey]);

  useEffect(() => {
    async function loadExtras() {
      // Xp_total e a fonte unica (backend), pra bater com o que aparece no
      // perfil visitado por amigos. So atualiza em caso de sucesso, mantendo
      // o ultimo valor bom se a rede falhar.
      const resumo = await fetchResumoProgresso().catch(() => null);
      if (resumo) {
        setStreak(resumo.streakAtual);
        setXpTotal(resumo.xpTotal);
      }
      const goals = await dailyGoals.getTodayGoals().catch(() => null);
      if (goals) setDailyGoalsState(goals);
      await loadAllCourseStats();
    }
    loadExtras();
    const sub = navigation.addListener("focus", loadExtras);
    return sub;
  }, [navigation, loadAllCourseStats]);

  useEffect(() => {
    if (route?.params?.initialCourse !== undefined) {
      setSelectedCourse(route.params.initialCourse);
    }
    if (route?.params?.initialLevel !== undefined) {
      setSelectedLevel(route.params.initialLevel ?? "Starter");
    }
  }, [route?.params?.initialCourse, route?.params?.initialLevel]);

  useEffect(() => {
    if (!autoOpenLessonId || openedRef.current) return;
    if (aulaAccessMap === null) return;

    const lesson =
      activeLessons.find(
        (item) => String(item.id) === String(autoOpenLessonId),
      ) ||
      allLessons.find((item) => String(item.id) === String(autoOpenLessonId));

    if (!lesson?.screen) return;
    if (!isLessonUnlocked(lesson.screen)) return;

    openedRef.current = true;
    navigation.setParams({ autoOpenLessonId: null });

    requestAnimationFrame(() => {
      const lessonList = activeLessons.some(
        (item) =>
          item.screen === lesson.screen &&
          String(item.id) === String(lesson.id),
      )
        ? activeLessons
        : allLessons;
      navigation.replace(lesson.screen, {
        lesson,
        lessons: lessonList,
      });
    });
  }, [autoOpenLessonId, navigation, allLessons, activeLessons, aulaAccessMap]);

  const totalLessons = activeLessons.length;
  const completedCount = activeLessons.filter(
    (item) => progressMap[item.id],
  ).length;
  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const totalXp = xpTotal + (dailyGoalsState.lifetimeBonusXp || 0);
  const levelProgress = useMemo(() => getLevelProgress(totalXp), [totalXp]);

  const lessonsByModule = useMemo(() => {
    return activeModuleDefs.reduce((acc, moduleItem) => {
      acc[moduleItem.id] = activeLessons.filter(
        (lesson) => lesson.module === moduleItem.id,
      );
      return acc;
    }, {});
  }, [activeModuleDefs, activeLessons]);

  const firstPendingLesson =
    activeLessons.find((item) => !progressMap[item.id]) || activeLessons[0];

  const recentActivity = useMemo(() => {
    const items = [];
    if (streak > 0) {
      items.push({
        id: "streak",
        type: "streak",
        title: `Sequência de ${streak} dia${streak > 1 ? "s" : ""}`,
        meta: "continue hoje!",
        value: "🔥",
      });
    }
    activeLessons
      .filter((lesson) => progressMap[lesson.id])
      .slice(-3)
      .reverse()
      .forEach((lesson) => {
        items.push({
          id: `done-${lesson.id}`,
          type: "done",
          title: `Concluiu "${lesson.title}"`,
          meta: selectedCourse
            ? `${selectedCourse} · ${activeLevel}`
            : "Inglês Completo",
          value: `+${XP_PER_LESSON} XP`,
        });
      });
    return items.slice(0, 4);
  }, [streak, activeLessons, progressMap, selectedCourse, activeLevel]);

  // agrupado por curso, cada curso listando todos os seus níveis disponíveis
  const courseGroups = useMemo(() => {
    return COURSE_OPTIONS.map((courseName) => {
      const levels = (COURSE_LEVEL_AVAILABILITY[courseName] || []).map(
        (level) => {
          const config = getCourseLevelConfig(courseName, level);
          const stats = courseStatsMap[`${courseName}__${level}`];
          return {
            level,
            folder: config.folder,
            total: stats?.total ?? config.lessons.length,
            completed: stats?.completed ?? 0,
            percent: stats?.percent ?? 0,
          };
        },
      );
      return {
        courseName,
        color: COURSE_ACCENT[CORES.mode][courseName] || CORES.HOME_PRIMARY,
        levels,
      };
    }).filter((group) => group.levels.length > 0);
  }, [courseStatsMap]);

  const visibleCourseGroups =
    courseFilter === "todos"
      ? courseGroups
      : courseGroups.filter((group) => group.courseName === courseFilter);

  // filtrado por nível: lista plana só com os cursos disponíveis naquele nível
  const levelCourses = useMemo(() => {
    if (levelFilter === "todos") return [];
    return COURSE_OPTIONS.filter((courseName) =>
      COURSE_LEVEL_AVAILABILITY[courseName]?.includes(levelFilter),
    ).map((courseName) => {
      const config = getCourseLevelConfig(courseName, levelFilter);
      const stats = courseStatsMap[`${courseName}__${levelFilter}`];
      return {
        courseName,
        folder: config.folder,
        total: stats?.total ?? config.lessons.length,
        completed: stats?.completed ?? 0,
        percent: stats?.percent ?? 0,
      };
    });
  }, [levelFilter, courseStatsMap]);

  const isLevelFilterMode = levelFilter !== "todos";

  const selectCourseChip = (key) => {
    setCourseFilter(key);
    setLevelFilter("todos");
  };

  const selectLevelFilter = (level) => {
    setLevelFilter(level);
    setCourseFilter("todos");
    setLevelMenuOpen(false);
  };

  const goToLesson = (lesson) => {
    if (!lesson?.screen) return;
    if (!isLessonUnlocked(lesson.screen)) {
      navigation.navigate("Paywall");
      return;
    }
    navigation.navigate(lesson.screen, {
      lesson,
      lessons: activeLessons,
    });
  };

  const toggleModule = (moduleItem) => {
    if (moduleItem.locked) return;
    setOpenModuleId((prev) => (prev === moduleItem.id ? null : moduleItem.id));
  };

  const openCourseFromViewAll = (courseName, level) => {
    const targetLevel = level ?? activeLevel;

    if (!COURSE_LEVEL_AVAILABILITY[courseName]?.includes(targetLevel)) {
      Alert.alert(
        "Curso em breve",
        `${courseName} ainda não está disponível em ${targetLevel}.`,
      );
      return;
    }

    const levelConfig = getCourseLevelConfig(courseName, targetLevel);

    if (!levelConfig.available) {
      Alert.alert(
        "Nível em breve",
        `${targetLevel} (${levelConfig.folder}) ainda não tem aulas cadastradas.`,
      );
      return;
    }

    if (levelConfig.routeName) {
      navigation.navigate(levelConfig.routeName, {
        initialCourse: courseName,
        initialLevel: targetLevel,
      });
      return;
    }

    setSelectedCourse(courseName);
    setSelectedLevel(targetLevel);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingRow}>
          <View style={styles.avatar}>
            {avatarSource ? (
              <Image source={avatarSource} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitial}>
                {firstName.charAt(0).toUpperCase()}
              </Text>
            )}
            <View style={styles.onlineDot} />
          </View>

          <View style={{ flex: 1, minWidth: 0, marginLeft: 12 }}>
            <Text style={styles.hello}>Olá,</Text>
            <Text style={styles.userName}>{firstName}</Text>
          </View>

          <View style={styles.statsArea}>
            <View style={styles.topRightRow}>
              <NotificationBell color={CORES.HOME_NAVY} />
              <View style={styles.streak}>
                <MaterialCommunityIcons
                  name="fire"
                  size={14}
                  color={CORES.HOME_AMBER}
                />
                <Text style={styles.streakTxt}>{streak}</Text>
              </View>
            </View>
            <Text style={styles.xp}>
              {totalXp.toLocaleString()}
              <Text style={styles.xpUnit}> XP</Text>
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeTxt}>
                Nível {levelProgress.currentLevel}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", marginBottom: 9 },
            ]}
          >
            <Text style={styles.cardLabel}>Progresso do nível</Text>
            <Text style={styles.cardHint}>
              {levelProgress.xpInsideLevel} / {levelProgress.levelRange} XP para
              o Nível {levelProgress.nextLevel}
            </Text>
          </View>
          <View style={styles.bigTrack}>
            <View
              style={[
                styles.bigFill,
                { width: `${Math.max(levelProgress.levelPercent, 4)}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.quickRow}>
          <QuickAction
            primary
            label="Praticar"
            icon={
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color={CORES.WHITE}
              />
            }
            onPress={() =>
              scrollViewRef.current?.scrollTo({
                y: coursesSectionY.current,
                animated: true,
              })
            }
          />
          <QuickAction
            label="Revisar erros"
            icon={
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={20}
                color={CORES.HOME_PRIMARY}
              />
            }
            onPress={() => navigation.navigate("MeusErros")}
          />
          <QuickAction
            label="Desafiar"
            icon={
              <MaterialCommunityIcons
                name="sword-cross"
                size={20}
                color={CORES.HOME_PRIMARY}
              />
            }
            onPress={() => navigation.navigate("Desafios")}
          />
        </View>

        <View style={styles.hero}>
          <View style={[styles.row, { marginBottom: 15 }]}>
            <ProgressCircle percent={percent} />
            <View style={{ flex: 1, minWidth: 0, marginLeft: 15 }}>
              <Text style={styles.heroKicker}>CONTINUE DE ONDE PAROU</Text>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {firstPendingLesson
                  ? firstPendingLesson.title
                  : "Tudo concluído"}
              </Text>
              <View style={[styles.row, { marginTop: 5 }]}>
                <Text style={styles.heroMeta}>⏱ 8 min</Text>
                <Text
                  style={[
                    styles.heroMeta,
                    { color: CORES.HOME_PRIMARY, marginLeft: 10 },
                  ]}
                >
                  +{XP_PER_LESSON} XP
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => goToLesson(firstPendingLesson)}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryBtnTxt}>Continuar</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={19}
              color={CORES.WHITE}
            />
          </TouchableOpacity>
        </View>

        <PremiumBanner
          onPress={() => navigation.navigate("AulasPlusHome")}
        />

        {dailyGoalsState.goals.length > 0 && (
          <View style={styles.daily}>
            <Text style={styles.dailyTitle}>Metas de hoje</Text>
            <View style={{ gap: 12, marginTop: 10 }}>
              {dailyGoalsState.goals.map((goal) => {
                const percent = Math.min(
                  100,
                  (goal.progress / goal.target) * 100,
                );
                return (
                  <View key={goal.id} style={styles.dailyGoalRow}>
                    <View
                      style={[
                        styles.dailyIcon,
                        goal.completed && styles.dailyIconDone,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={goal.completed ? "check" : goal.icon}
                        size={18}
                        color={goal.completed ? CORES.WHITE : CORES.HOME_PRIMARY}
                      />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <View
                        style={[
                          styles.row,
                          { justifyContent: "space-between" },
                        ]}
                      >
                        <Text style={styles.dailyGoalLabel} numberOfLines={1}>
                          {goal.label}
                        </Text>
                        <Text style={styles.dailyGoalCount}>
                          {goal.progress}/{goal.target}
                        </Text>
                      </View>
                      <View style={styles.dailyTrack}>
                        <View
                          style={[
                            styles.dailyFill,
                            {
                              width: `${percent}%`,
                              backgroundColor: goal.completed
                                ? CORES.HOME_GREEN
                                : CORES.HOME_PRIMARY,
                            },
                          ]}
                        />
                      </View>
                      <View
                        style={[
                          styles.row,
                          { justifyContent: "space-between", marginTop: 5 },
                        ]}
                      >
                        <View
                          style={[
                            styles.difficultyPill,
                            {
                              backgroundColor: `${DIFFICULTY_COLOR[goal.difficulty]}1F`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.difficultyPillTxt,
                              { color: DIFFICULTY_COLOR[goal.difficulty] },
                            ]}
                          >
                            {DIFFICULTY_LABEL[goal.difficulty]}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.dailyGoalReward,
                            goal.rewarded && { color: CORES.HOME_GREEN },
                          ]}
                        >
                          {goal.rewarded ? "✓ " : ""}+{goal.rewardXp} XP
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {recentActivity.length > 0 && (
          <>
            <View style={styles.sectionHead}>
              <Text style={styles.h2}>Atividade recente</Text>
            </View>
            <View style={{ gap: 9, marginBottom: 24 }}>
              {recentActivity.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </View>
          </>
        )}

        <View
          style={styles.sectionHead}
          onLayout={(e) => {
            coursesSectionY.current = e.nativeEvent.layout.y;
          }}
        >
          <Text style={[styles.h2, { fontSize: 21 }]}>Cursos</Text>
          <View style={styles.levelFilterWrap}>
            <TouchableOpacity
              style={[
                styles.levelFilterButton,
                isLevelFilterMode && styles.levelFilterButtonOn,
              ]}
              onPress={() => setLevelMenuOpen((v) => !v)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.levelFilterTxt,
                  isLevelFilterMode && styles.levelFilterTxtOn,
                ]}
              >
                {isLevelFilterMode ? levelFilter : "Por nível"}
              </Text>
              <MaterialCommunityIcons
                name={levelMenuOpen ? "chevron-up" : "chevron-down"}
                size={16}
                color={isLevelFilterMode ? CORES.WHITE : CORES.HOME_PRIMARY}
              />
            </TouchableOpacity>

            {levelMenuOpen && (
              <View style={styles.levelFilterDropdown}>
                <TouchableOpacity
                  style={styles.levelFilterItem}
                  onPress={() => {
                    setLevelFilter("todos");
                    setLevelMenuOpen(false);
                  }}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.levelFilterItemTxt,
                      !isLevelFilterMode && styles.levelFilterItemTxtActive,
                    ]}
                  >
                    Todos os níveis
                  </Text>
                </TouchableOpacity>
                {LEVEL_OPTIONS.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.levelFilterItem}
                    onPress={() => selectLevelFilter(level)}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.levelFilterItemTxt,
                        levelFilter === level &&
                          styles.levelFilterItemTxtActive,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
          style={{ marginBottom: 16 }}
        >
          {[
            { key: "todos", label: "Todos" },
            ...COURSE_OPTIONS.map((c) => ({ key: c, label: c })),
          ].map((chip) => {
            const on = !isLevelFilterMode && chip.key === courseFilter;
            return (
              <TouchableOpacity
                key={chip.key}
                onPress={() => selectCourseChip(chip.key)}
                activeOpacity={0.85}
                style={[styles.chip, on ? styles.chipOn : styles.chipOff]}
              >
                <Text
                  style={[
                    styles.chipTxt,
                    { color: on ? CORES.WHITE : CORES.HOME_CHIP_TXT },
                  ]}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isCourseList ? (
          isLevelFilterMode ? (
            levelCourses.length > 0 ? (
              <View style={{ gap: 10 }}>
                {levelCourses.map((course) => (
                  <CourseCard
                    key={course.courseName}
                    title={course.courseName}
                    sub={`${levelFilter} · ${course.folder}`}
                    tagLabel={`${course.total} lições`}
                    started={course.completed > 0}
                    percent={course.percent}
                    color={LEVEL_ACCENT[CORES.mode][levelFilter] || CORES.HOME_PRIMARY}
                    onPress={() =>
                      openCourseFromViewAll(course.courseName, levelFilter)
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyCourses}>
                <Text style={styles.emptyLessonText}>
                  Nenhum curso disponível em {levelFilter}.
                </Text>
              </View>
            )
          ) : visibleCourseGroups.length > 0 ? (
            <View style={{ gap: 20 }}>
              {visibleCourseGroups.map((group) => (
                <View key={group.courseName}>
                  <View
                    style={[styles.row, { marginBottom: 10, paddingLeft: 2 }]}
                  >
                    <Text style={styles.groupGoal}>{group.courseName}</Text>
                    <View style={styles.groupBadge}>
                      <Text style={styles.groupBadgeTxt}>
                        {group.levels.length} {group.levels.length > 1 ? "níveis" : "nível"}
                      </Text>
                    </View>
                  </View>
                  <View style={{ gap: 10 }}>
                    {group.levels.map((lvl) => (
                      <CourseCard
                        key={lvl.level}
                        title={lvl.level}
                        sub={`${group.courseName} · ${lvl.folder}`}
                        tagLabel={`${lvl.total} lições`}
                        started={lvl.completed > 0}
                        percent={lvl.percent}
                        color={group.color}
                        onPress={() =>
                          openCourseFromViewAll(group.courseName, lvl.level)
                        }
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyCourses}>
              <Text style={styles.emptyLessonText}>
                Nenhum curso disponível.
              </Text>
            </View>
          )
        ) : (
          <View>
            <TouchableOpacity
              style={styles.backRow}
              onPress={() => setSelectedCourse(null)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={18}
                color={CORES.HOME_PRIMARY}
              />
              <Text style={styles.backRowTxt}>Voltar aos cursos</Text>
            </TouchableOpacity>

            {activeModuleDefs.map((moduleItem) => {
              const moduleLessons = lessonsByModule[moduleItem.id] || [];
              const moduleCompleted = moduleLessons.filter(
                (l) => progressMap[l.id],
              ).length;
              const modulePercent =
                moduleLessons.length > 0
                  ? Math.round((moduleCompleted / moduleLessons.length) * 100)
                  : 0;
              const isOpen = openModuleId === moduleItem.id;

              return (
                <View key={moduleItem.id}>
                  <TouchableOpacity
                    style={[
                      styles.moduleButton,
                      isOpen && {
                        borderColor: moduleItem.locked
                          ? CORES.HOME_BORDER
                          : CORES.HOME_PRIMARY,
                      },
                      moduleItem.locked && styles.lockedModule,
                    ]}
                    onPress={() => toggleModule(moduleItem)}
                    activeOpacity={0.9}
                  >
                    <View
                      style={[
                        styles.moduleIconWrap,
                        {
                          backgroundColor: moduleItem.locked
                            ? CORES.HOME_LOCKED_ICON
                            : moduleItem.accent,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={moduleItem.icon}
                        size={16}
                        color={CORES.WHITE}
                      />
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
                      <Text
                        style={[
                          styles.moduleSubtitle,
                          moduleItem.locked && styles.lockedText,
                        ]}
                      >
                        {moduleItem.subtitle}
                      </Text>
                    </View>

                    <View style={styles.moduleRight}>
                      <Text
                        style={[
                          styles.modulePercent,
                          moduleItem.locked && styles.lockedText,
                        ]}
                      >
                        {moduleItem.locked ? "0%" : `${modulePercent}%`}
                      </Text>
                      <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={moduleItem.locked ? CORES.HOME_LOCKED : CORES.TEXT_FAINT}
                      />
                    </View>
                  </TouchableOpacity>

                  {isOpen && !moduleItem.locked && (
                    <View style={styles.dropdown}>
                      {moduleLessons.length === 0 && (
                        <View style={styles.emptyLesson}>
                          <Text style={styles.emptyLessonText}>
                            Nenhuma aula disponível.
                          </Text>
                        </View>
                      )}

                      {moduleLessons.map((lesson) => {
                        const done = !!progressMap[lesson.id];
                        const isLocked = !isLessonUnlocked(lesson.screen);

                        return (
                          <TouchableOpacity
                            key={lesson.id}
                            style={styles.lessonButton}
                            onPress={() => goToLesson(lesson)}
                            activeOpacity={0.85}
                          >
                            <View style={styles.lessonLeft}>
                              <MaterialCommunityIcons
                                name={
                                  done
                                    ? "check-circle"
                                    : isLocked
                                      ? "lock-outline"
                                      : "play-circle-outline"
                                }
                                size={18}
                                color={
                                  done
                                    ? CORES.HOME_GREEN
                                    : isLocked
                                      ? CORES.HOME_LOCKED
                                      : CORES.HOME_PRIMARY
                                }
                              />
                              <Text
                                style={[
                                  styles.lessonText,
                                  isLocked && styles.lockedText,
                                ]}
                              >
                                {lesson.title}
                              </Text>
                            </View>
                            {!isLocked && (
                              <MaterialCommunityIcons
                                name="chevron-right"
                                size={18}
                                color={CORES.TEXT_FAINT}
                              />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <StudyTimeModal
        visible={studyTimeModalVisible}
        onConfirm={handleConfirmStudyTime}
        onCancel={handleSkipStudyTime}
      />
    </SafeAreaView>
  );
}

/* -------------------------------- styles --------------------------------- */
const makeStyles = (CORES) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: CORES.HOME_BG,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 28,
    },
    row: { flexDirection: "row", alignItems: "center" },

    greetingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: CORES.ACCENT_FILL_HOME,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    avatarInitial: {
      color: CORES.WHITE,
      fontWeight: "900",
      fontSize: 22,
    },
    onlineDot: {
      position: "absolute",
      bottom: -1,
      right: -1,
      width: 15,
      height: 15,
      borderRadius: 8,
      backgroundColor: CORES.HOME_GREEN,
      borderWidth: 2.5,
      borderColor: CORES.HOME_BG,
    },
    hello: { color: CORES.HOME_MUTED, fontWeight: "700", fontSize: 14 },
    userName: { color: CORES.HOME_NAVY, fontWeight: "900", fontSize: 25 },
    statsArea: { alignItems: "flex-end" },
    topRightRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 6,
    },
    streak: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: CORES.HOME_STREAK_BG,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 99,
    },
    streakTxt: { color: CORES.HOME_STREAK_TXT, fontWeight: "800", fontSize: 12.5 },
    xp: { color: CORES.HOME_NAVY, fontWeight: "900", fontSize: 16 },
    xpUnit: { color: CORES.HOME_MUTED, fontWeight: "800", fontSize: 12 },
    levelBadge: {
      backgroundColor: CORES.NAVY_FILL,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 99,
      marginTop: 5,
    },
    levelBadgeTxt: { color: CORES.WHITE, fontWeight: "800", fontSize: 12 },

    card: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 18,
      padding: 16,
      marginBottom: 18,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    cardLabel: { color: CORES.HOME_NAVY, fontWeight: "800", fontSize: 14 },
    cardHint: { color: CORES.HOME_MUTED, fontWeight: "700", fontSize: 12.5 },
    bigTrack: {
      height: 10,
      borderRadius: 99,
      backgroundColor: CORES.HOME_TRACK,
      overflow: "hidden",
    },
    bigFill: {
      height: "100%",
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL_HOME,
    },

    quickRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
    qa: {
      flex: 1,
      borderRadius: 16,
      padding: 13,
      gap: 8,
      alignItems: "flex-start",
    },
    qaPrimary: { backgroundColor: CORES.ACCENT_FILL_HOME },
    qaPlain: {
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    qaLabel: { fontWeight: "800", fontSize: 13 },

    hero: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 22,
      padding: 18,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    heroKicker: {
      color: CORES.HOME_MUTED,
      fontWeight: "800",
      fontSize: 11,
      letterSpacing: 0.4,
    },
    heroTitle: {
      color: CORES.HOME_NAVY,
      fontWeight: "900",
      fontSize: 20,
      marginTop: 3,
    },
    heroMeta: { color: CORES.HOME_MUTED, fontWeight: "700", fontSize: 13 },
    primaryBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: CORES.ACCENT_FILL_HOME,
      borderRadius: 14,
      paddingVertical: 14,
    },
    primaryBtnTxt: { color: CORES.WHITE, fontWeight: "800", fontSize: 16 },

    premiumBanner: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: CORES.HOME_PREMIUM_BG,
      borderRadius: 18,
      padding: 14,
      marginBottom: 18,
      borderWidth: 1.5,
      borderColor: CORES.HOME_PREMIUM_BORDER,
    },
    premiumIconWrap: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: CORES.HOME_PREMIUM_ICON_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    premiumTitle: { color: CORES.HOME_NAVY, fontWeight: "900", fontSize: 15 },
    premiumSub: {
      color: CORES.HOME_PREMIUM_SUB,
      fontWeight: "700",
      fontSize: 12.5,
      marginTop: 2,
    },

    daily: {
      backgroundColor: CORES.HOME_DAILY_BG,
      borderRadius: 18,
      padding: 16,
      marginBottom: 22,
    },
    dailyGoalRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
    },
    dailyIcon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      // o card de metas ja tem fundo proprio; o chip usa o tom acima dele
      backgroundColor: CORES.SURFACE_HIGH,
      alignItems: "center",
      justifyContent: "center",
    },
    dailyIconDone: {
      backgroundColor: CORES.HOME_GREEN,
    },
    dailyTitle: { color: CORES.HOME_NAVY, fontWeight: "900", fontSize: 15 },
    dailyGoalLabel: {
      color: CORES.HOME_NAVY,
      fontWeight: "700",
      fontSize: 13,
      flexShrink: 1,
      marginRight: 8,
    },
    dailyGoalCount: {
      color: CORES.HOME_MUTED,
      fontWeight: "700",
      fontSize: 12,
    },
    difficultyPill: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 99,
    },
    difficultyPillTxt: {
      fontWeight: "800",
      fontSize: 10,
    },
    dailyGoalReward: {
      color: CORES.HOME_FAINT,
      fontWeight: "800",
      fontSize: 11,
    },
    dailyTrack: {
      height: 7,
      borderRadius: 99,
      backgroundColor: CORES.HOME_DAILY_TRACK,
      overflow: "hidden",
      marginTop: 6,
    },
    dailyFill: {
      height: "100%",
      borderRadius: 99,
      backgroundColor: CORES.HOME_GREEN,
    },

    sectionHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 11,
    },
    h2: { color: CORES.HOME_NAVY, fontWeight: "900", fontSize: 19 },
    subtle: { color: CORES.HOME_FAINT, fontWeight: "800", fontSize: 13 },

    levelFilterWrap: { position: "relative" },
    levelFilterButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderWidth: 1.5,
      borderColor: CORES.HOME_PRIMARY,
      borderRadius: 99,
      paddingHorizontal: 12,
      paddingVertical: 7,
      backgroundColor: CORES.HOME_FILTER_BG,
    },
    levelFilterButtonOn: {
      backgroundColor: CORES.NAVY_FILL,
      borderColor: CORES.NAVY_FILL,
    },
    levelFilterTxt: {
      color: CORES.HOME_PRIMARY,
      fontWeight: "800",
      fontSize: 13,
    },
    levelFilterTxtOn: { color: CORES.WHITE },
    levelFilterDropdown: {
      position: "absolute",
      top: 38,
      right: 0,
      width: 200,
      backgroundColor: CORES.SURFACE,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      overflow: "hidden",
      zIndex: 20,
      elevation: 4,
    },
    levelFilterItem: {
      paddingHorizontal: 12,
      paddingVertical: 11,
    },
    levelFilterItemTxt: {
      color: CORES.HOME_NAVY,
      fontSize: 13.5,
      fontWeight: "700",
    },
    levelFilterItemTxtActive: { color: CORES.HOME_PRIMARY, fontWeight: "900" },

    activity: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: CORES.SURFACE,
      borderRadius: 14,
      padding: 11,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    activityIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    activityTitle: { color: CORES.HOME_NAVY, fontWeight: "800", fontSize: 13.5 },
    activityMeta: { color: CORES.HOME_FAINT, fontWeight: "700", fontSize: 12 },
    activityValue: { fontWeight: "900", fontSize: 13 },

    chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 99 },
    chipOn: {
      backgroundColor: CORES.NAVY_FILL,
      borderWidth: 1.5,
      borderColor: CORES.NAVY_FILL,
    },
    chipOff: {
      backgroundColor: CORES.SURFACE,
      borderWidth: 1.5,
      borderColor: CORES.HOME_BORDER,
    },
    chipTxt: { fontWeight: "800", fontSize: 13 },

    groupGoal: {
      color: CORES.HOME_NAVY,
      fontWeight: "900",
      fontSize: 15,
      marginRight: 9,
    },
    groupBadge: {
      backgroundColor: CORES.HOME_BADGE_BG,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 99,
    },
    groupBadgeTxt: { color: CORES.HOME_PRIMARY, fontWeight: "800", fontSize: 11 },

    course: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      backgroundColor: CORES.SURFACE,
      borderRadius: 16,
      padding: 13,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
    },
    courseIcon: {
      width: 46,
      height: 46,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    courseName: {
      color: CORES.HOME_NAVY,
      fontWeight: "900",
      fontSize: 15.5,
      marginRight: 7,
      flexShrink: 1,
    },
    courseSub: {
      color: CORES.HOME_FAINT,
      fontWeight: "700",
      fontSize: 12.5,
      marginVertical: 2,
    },
    progressRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      marginTop: 6,
    },
    track: {
      flex: 1,
      height: 6,
      borderRadius: 99,
      backgroundColor: CORES.HOME_TRACK,
      overflow: "hidden",
    },
    fill: { height: "100%", borderRadius: 99 },
    meta: { color: CORES.HOME_MUTED, fontWeight: "800", fontSize: 11.5 },
    tag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 99 },
    tagOn: { backgroundColor: CORES.HOME_GREEN_BG },
    tagOff: { backgroundColor: CORES.HOME_BG },
    tagTxt: { fontWeight: "800", fontSize: 10.5 },

    backRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 2,
    },
    backRowTxt: { color: CORES.HOME_PRIMARY, fontWeight: "800", fontSize: 13.5 },

    moduleButton: {
      marginTop: 10,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 12,
      paddingVertical: 11,
      flexDirection: "row",
      alignItems: "center",
    },
    lockedModule: {
      backgroundColor: CORES.HOME_LOCKED_BG,
      borderColor: CORES.HOME_BORDER,
    },
    moduleIconWrap: {
      width: 31,
      height: 31,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    moduleTextArea: { flex: 1 },
    moduleTitle: { color: CORES.HOME_NAVY, fontSize: 14, fontWeight: "800" },
    moduleSubtitle: {
      color: CORES.HOME_MUTED,
      fontSize: 12,
      marginTop: 2,
      fontWeight: "600",
    },
    moduleRight: {
      marginLeft: 8,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    modulePercent: {
      fontSize: 13,
      fontWeight: "800",
      color: CORES.HOME_PRIMARY,
      marginBottom: 2,
    },
    lockedText: { color: CORES.HOME_LOCKED },
    dropdown: {
      marginTop: 8,
      backgroundColor: CORES.SURFACE,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      overflow: "hidden",
    },
    emptyLesson: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    emptyCourses: {
      marginTop: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: CORES.HOME_BORDER,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 12,
      paddingVertical: 14,
    },
    emptyLessonText: {
      color: CORES.HOME_MUTED,
      fontSize: 12,
      fontWeight: "600",
    },
    lessonButton: {
      paddingHorizontal: 12,
      paddingVertical: 11,
      borderBottomWidth: 1,
      borderBottomColor: CORES.HOME_BORDER,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    lessonLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flexShrink: 1,
    },
    lessonText: {
      color: CORES.HOME_LESSON_TXT,
      fontSize: 13,
      fontWeight: "700",
    },
  });
