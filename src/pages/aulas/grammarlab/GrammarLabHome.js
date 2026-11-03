import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../../../exc/grammarlab/theme";
import { tap } from "../../../exc/grammarlab/feedback";
import {
  BoltIcon,
  CheckIcon,
  ChevronRightIcon,
  FlameIcon,
  LockIcon,
  PlayIcon,
  TargetIcon,
} from "../../../exc/grammarlab/icons";
import { fetchAulaAccessMap } from "../../../services/conteudos";
import { fetchResumoProgresso } from "../../../services/progresso";
import { scopedKey } from "../../../util/userScope";
import { useAuth } from "../../../context/AuthContext";
import { hasFullAccess } from "../../../util/plans";
import { formatXp } from "../../../util/xp";
import * as dailyGoals from "../../../util/dailyGoals";

const MASCOT = require("../../../../assets/GrammarLab/mascot-combo.png");

async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

// Estado do card do topico: "soon" (ainda sem aulas), "done" (todas feitas),
// "active" (tem a proxima aula pendente do curso), "started" ou "new".
function topicState(topic, currentKey) {
  if (topic.lessons.length === 0) return "soon";
  if (topic.done === topic.lessons.length) return "done";
  if (topic.key === currentKey) return "active";
  return topic.done > 0 ? "started" : "new";
}

// Tela inicial do Grammar Lab (visual "Combo Lesson"): streak e XP no topo,
// metas do dia, card de continuar e os topicos agrupados por nivel. Tocar num
// topico abre a lista das aulas dele. Paleta fixa e escura, como as aulas.
export default function GrammarLabHome({
  navigation,
  route,
  courseName,
  storageKey,
  moduleDefs,
  lessons,
  // [{ code, name }]: niveis na ordem da tela; cada topico diz o seu `level`.
  levels,
  // Topicos sem aulas ainda ([{ name, glyph, level }]), mostrados como "Em breve".
  upcomingTopics = [],
}) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const fullAccess = hasFullAccess(user);

  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const openedRef = useRef(false);
  const [progressMap, setProgressMap] = useState({});
  const [aulaAccessMap, setAulaAccessMap] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [goals, setGoals] = useState(null);
  const [sheetTopicKey, setSheetTopicKey] = useState(null);

  const isLessonUnlocked = (screenName) =>
    fullAccess || !aulaAccessMap || aulaAccessMap[screenName] !== false;

  useEffect(() => {
    let active = true;
    async function load() {
      const [progress, nextResumo, nextGoals] = await Promise.all([
        loadProgress(storageKey),
        fetchResumoProgresso().catch(() => null),
        dailyGoals.getTodayGoals().catch(() => null),
      ]);
      if (!active) return;
      setProgressMap(progress);
      // Mantem o ultimo valor bom se a rede falhar (mesma regra da Home).
      if (nextResumo) setResumo(nextResumo);
      if (nextGoals) setGoals(nextGoals);
    }
    load();
    const sub = navigation.addListener("focus", load);
    return () => {
      active = false;
      sub();
    };
  }, [navigation, storageKey]);

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

  const topics = useMemo(() => {
    const withLessons = moduleDefs.map((moduleItem) => {
      const moduleLessons = lessons.filter(
        (lesson) => lesson.module === moduleItem.id,
      );
      return {
        key: `module-${moduleItem.id}`,
        name: moduleItem.name,
        glyph: moduleItem.glyph,
        level: moduleItem.level,
        lessons: moduleLessons,
        done: moduleLessons.filter((lesson) => progressMap[lesson.id]).length,
      };
    });
    const soon = upcomingTopics.map((topic) => ({
      ...topic,
      key: `soon-${topic.level}-${topic.name}`,
      lessons: [],
      done: 0,
    }));
    return [...withLessons, ...soon];
  }, [moduleDefs, lessons, upcomingTopics, progressMap]);

  const nextLesson = lessons.find((lesson) => !progressMap[lesson.id]) || null;
  const currentTopic = nextLesson
    ? topics.find((topic) => topic.lessons.includes(nextLesson))
    : null;
  const sheetTopic = topics.find((topic) => topic.key === sheetTopicKey) || null;

  const totalXp = (resumo?.xpTotal ?? 0) + (goals?.lifetimeBonusXp ?? 0);
  const streak = resumo?.streakAtual ?? 0;
  const todayGoals = goals?.goals ?? [];

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

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.kicker}>ESTUDE GRAMÁTICA</Text>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            accessibilityRole="header"
          >
            {courseName}
          </Text>
        </View>
        <View
          style={[styles.pill, styles.streakPill]}
          accessibilityLabel={`Sequência de ${plural(streak, "dia", "dias")}`}
        >
          <FlameIcon />
          <Text style={[styles.pillText, { color: colors.amberText }]}>{streak}</Text>
        </View>
        <View style={[styles.pill, styles.xpPill]} accessibilityLabel={`${totalXp} XP`}>
          <BoltIcon color={colors.greenBright} />
          <Text style={styles.pillText}>{formatXp(totalXp)}</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {todayGoals.length > 0 && <DailyGoals goals={todayGoals} />}

        {nextLesson && currentTopic && (
          <ContinueCard
            topic={currentTopic}
            lesson={nextLesson}
            locked={!isLessonUnlocked(nextLesson.screen)}
            onPress={() => goToLesson(nextLesson)}
          />
        )}

        {levels.map((level) => {
          const levelTopics = topics.filter((topic) => topic.level === level.code);
          if (levelTopics.length === 0) return null;
          return (
            <LevelSection
              key={level.code}
              level={level}
              topics={levelTopics}
              currentKey={currentTopic?.key}
              onOpenTopic={setSheetTopicKey}
            />
          );
        })}
      </ScrollView>

      {sheetTopic && (
        <TopicSheet
          topic={sheetTopic}
          progressMap={progressMap}
          nextLessonId={nextLesson?.id}
          isLessonUnlocked={isLessonUnlocked}
          bottomInset={insets.bottom}
          onClose={() => setSheetTopicKey(null)}
          onOpenLesson={(lesson) => {
            setSheetTopicKey(null);
            goToLesson(lesson);
          }}
        />
      )}
    </View>
  );
}

function DailyGoals({ goals }) {
  const completed = goals.filter((goal) => goal.completed).length;
  return (
    <View style={styles.goal}>
      <View style={styles.goalIcon}>
        <TargetIcon />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.goalLabel}>Metas do dia</Text>
          <Text style={[styles.goalLabel, { color: colors.greenBright }]}>
            {completed}/{goals.length}
          </Text>
        </View>
        <View style={[styles.track, { height: 8, marginTop: 8 }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${Math.round((completed / goals.length) * 100)}%`,
                backgroundColor: colors.green,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function ContinueCard({ topic, lesson, locked, onPress }) {
  const hover = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(hover, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(hover, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [hover]);

  const total = topic.lessons.length;
  const started = topic.done > 0;
  const buttonLabel = locked
    ? "Desbloquear aula"
    : started
      ? "Continuar aula"
      : "Começar aula";

  return (
    <View style={styles.continue}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.mascot,
          {
            transform: [
              { translateY: hover.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) },
            ],
          },
        ]}
      >
        <Image source={MASCOT} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
      </Animated.View>
      <Text style={styles.continueKicker}>{started ? "CONTINUAR" : "COMEÇAR"}</Text>
      <Text style={styles.continueTitle}>{topic.name}</Text>
      <Text style={styles.continueSub}>Próxima aula: {lesson.title}</Text>
      <View style={styles.continueProgress}>
        <View style={[styles.track, styles.continueTrack]}>
          <View
            style={[
              styles.fill,
              { width: `${Math.round((topic.done / total) * 100)}%`, backgroundColor: "#ffffff" },
            ]}
          />
        </View>
        <Text style={styles.continueCount}>
          {topic.done}/{total}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          tap(20);
          onPress();
        }}
        style={({ pressed }) => [styles.continueButton, pressed && styles.pressed]}
      >
        {locked ? <LockIcon size={16} color="#2b33a8" /> : <PlayIcon />}
        <Text style={styles.continueButtonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}

function LevelSection({ level, topics, currentKey, onOpenTopic }) {
  const open = topics.some((topic) => topic.lessons.length > 0);
  const doneTopics = topics.filter((topic) => topicState(topic) === "done").length;
  return (
    <View style={{ gap: 10, marginTop: 6 }}>
      <View style={styles.levelHeader}>
        <View style={[styles.levelBadge, open ? styles.levelBadgeOpen : styles.levelBadgeLocked]}>
          <Text
            style={[styles.levelBadgeText, { color: open ? colors.accentSoft : colors.textMuted }]}
          >
            {level.code}
          </Text>
        </View>
        <Text style={[styles.levelName, { color: open ? colors.text : "#8e98b8" }]}>
          {level.name}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.levelSub}>
          {open ? `${doneTopics}/${plural(topics.length, "tópico", "tópicos")}` : "Em breve"}
        </Text>
      </View>
      <View style={styles.grid}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.key}
            topic={topic}
            state={topicState(topic, currentKey)}
            onPress={() => onOpenTopic(topic.key)}
          />
        ))}
      </View>
    </View>
  );
}

function TopicCard({ topic, state, onPress }) {
  const active = state === "active";
  const soon = state === "soon";
  const total = topic.lessons.length;
  const pct = total > 0 ? Math.round((topic.done / total) * 100) : 0;
  const sub = soon
    ? "Em breve"
    : state === "done"
      ? `${plural(total, "aula", "aulas")} · concluído`
      : topic.done > 0
        ? `${topic.done}/${plural(total, "aula", "aulas")}`
        : plural(total, "aula", "aulas");
  const a11yState = {
    soon: "em breve",
    done: "concluído",
    active: "em andamento",
    started: "em andamento",
    new: "novo",
  }[state];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${topic.name}, ${a11yState}`}
      accessibilityState={{ disabled: soon }}
      disabled={soon}
      onPress={() => {
        tap(10);
        onPress();
      }}
      style={({ pressed }) => [
        styles.card,
        active ? styles.cardActive : soon ? styles.cardLocked : styles.cardIdle,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cardTop}>
        <View
          style={[
            styles.tile,
            active ? styles.tileActive : soon ? styles.tileLocked : styles.tileIdle,
          ]}
        >
          <Text
            style={[
              styles.tileText,
              { color: active ? colors.text : soon ? "#4a5475" : colors.textSoft },
            ]}
          >
            {topic.glyph}
          </Text>
        </View>
        {state === "new" && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NOVO</Text>
          </View>
        )}
        {state === "done" && (
          <View style={styles.doneBadge}>
            <CheckIcon size={12} color={colors.greenInk} />
          </View>
        )}
        {soon && <LockIcon />}
      </View>
      <Text style={[styles.cardName, { color: soon ? colors.textMuted : colors.text }]}>
        {topic.name}
      </Text>
      <Text style={styles.cardSub}>{sub}</Text>
      <View style={[styles.track, { height: 6 }]}>
        <View
          style={[
            styles.fill,
            { width: `${pct}%`, backgroundColor: active ? colors.accent : colors.green },
          ]}
        />
      </View>
    </Pressable>
  );
}

// Lista das aulas do topico, subindo por cima da tela (sem Modal, para nao
// brigar com a navegacao ao abrir a aula).
function TopicSheet({
  topic,
  progressMap,
  nextLessonId,
  isLessonUnlocked,
  bottomInset,
  onClose,
  onOpenLesson,
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const closingRef = useRef(false);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, []);

  const total = topic.lessons.length;
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.scrim, { opacity: anim }]}>
        <Pressable
          style={{ flex: 1 }}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Fechar"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.sheet,
          {
            paddingBottom: 20 + bottomInset,
            transform: [
              { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [screenHeight, 0] }) },
            ],
          },
        ]}
      >
        <View style={styles.grabber} />
        <View style={styles.sheetHeader}>
          <View style={[styles.tile, styles.tileActive]}>
            <Text style={[styles.tileText, { color: colors.text }]}>{topic.glyph}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.sheetTitle} accessibilityRole="header">
              {topic.name}
            </Text>
            <Text style={styles.cardSub}>
              {topic.done}/{plural(total, "aula concluída", "aulas concluídas")}
            </Text>
          </View>
        </View>
        <View style={[styles.track, { height: 6, marginTop: 14 }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${Math.round((topic.done / total) * 100)}%`,
                backgroundColor: colors.green,
              },
            ]}
          />
        </View>

        <ScrollView
          style={{ marginTop: 16 }}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {topic.lessons.map((lesson, index) => {
            const done = !!progressMap[lesson.id];
            const isNext = lesson.id === nextLessonId;
            const locked = !isLessonUnlocked(lesson.screen);
            return (
              <Pressable
                key={lesson.id}
                accessibilityRole="button"
                accessibilityLabel={`Aula ${index + 1}: ${lesson.title}${
                  done ? ", concluída" : locked ? ", bloqueada" : ""
                }`}
                disabled={!lesson.screen}
                onPress={() => {
                  tap(10);
                  onOpenLesson(lesson);
                }}
                style={({ pressed }) => [
                  styles.lessonRow,
                  isNext ? styles.lessonRowNext : styles.lessonRowIdle,
                  pressed && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.lessonIndex,
                    done
                      ? styles.lessonIndexDone
                      : isNext
                        ? styles.lessonIndexNext
                        : styles.lessonIndexIdle,
                  ]}
                >
                  {done ? (
                    <CheckIcon size={14} color={colors.greenBright} />
                  ) : (
                    <Text
                      style={[
                        styles.lessonIndexText,
                        { color: isNext ? colors.text : colors.textSoft },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.lessonKicker}>
                    {isNext ? "PRÓXIMA AULA" : `AULA ${index + 1}`}
                  </Text>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                </View>
                {locked ? <LockIcon size={16} /> : <ChevronRightIcon color={colors.textMuted} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  kicker: { fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 1.4, color: colors.accentSoft },
  title: { marginTop: 2, fontFamily: fonts.extrabold, fontSize: 28, lineHeight: 32, color: colors.text },
  pill: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  streakPill: { backgroundColor: colors.amberDeepBg, borderColor: colors.amberDeepBorder },
  xpPill: { backgroundColor: colors.greenBg, borderColor: colors.greenBorder },
  pillText: { fontFamily: fonts.extrabold, fontSize: 16, color: colors.text },
  scroll: { paddingHorizontal: 16, paddingTop: 4, gap: 16 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  track: { borderRadius: 99, backgroundColor: colors.badge, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 99 },
  pressed: { transform: [{ translateY: 3 }], boxShadow: "none" },

  goal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.badge,
    alignItems: "center",
    justifyContent: "center",
  },
  goalLabel: { fontFamily: fonts.bold, fontSize: 14, color: colors.text },

  continue: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 22,
    backgroundColor: colors.accent,
    boxShadow: "0 5px 0 #4552c4",
    overflow: "hidden",
  },
  mascot: { position: "absolute", right: -6, top: 6, width: 120, height: 113 },
  continueKicker: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    letterSpacing: 1.4,
    color: "rgba(255,255,255,0.8)",
  },
  continueTitle: { marginTop: 4, maxWidth: 220, fontFamily: fonts.extrabold, fontSize: 24, color: colors.text },
  continueSub: {
    marginTop: 2,
    maxWidth: 210,
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "rgba(255,255,255,0.88)",
  },
  continueProgress: { marginTop: 14, flexDirection: "row", alignItems: "center", gap: 10, maxWidth: 220 },
  continueTrack: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.25)" },
  continueCount: { fontFamily: fonts.extrabold, fontSize: 12, color: colors.text },
  continueButton: {
    marginTop: 16,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 4px 0 rgba(0,0,0,0.18)",
  },
  continueButtonText: { fontFamily: fonts.extrabold, fontSize: 16, color: "#2b33a8" },

  levelHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  levelBadge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8, borderWidth: 1 },
  levelBadgeOpen: { backgroundColor: "rgba(109,124,255,0.18)", borderColor: colors.accent },
  levelBadgeLocked: { backgroundColor: colors.raised, borderColor: colors.raisedBorder },
  levelBadgeText: { fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 0.7 },
  levelName: { fontFamily: fonts.extrabold, fontSize: 18 },
  levelSub: { fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  card: { flexGrow: 1, flexBasis: "45%", minHeight: 148, padding: 14, borderRadius: 18, gap: 6 },
  cardActive: {
    backgroundColor: colors.selectedBg,
    borderWidth: 1.5,
    borderColor: colors.accent,
    boxShadow: "0 4px 0 #2b3270",
  },
  cardIdle: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: "0 4px 0 #1b2134",
  },
  cardLocked: { backgroundColor: "#121727", borderWidth: 1, borderColor: "#1f2639" },
  cardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 6 },
  tile: {
    minWidth: 44,
    height: 44,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tileActive: { backgroundColor: colors.accent },
  tileIdle: { backgroundColor: colors.badge },
  tileLocked: { backgroundColor: colors.raised },
  tileText: { fontFamily: fonts.extrabold, fontSize: 15 },
  newBadge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 99, backgroundColor: colors.greenBright },
  newBadgeText: { fontFamily: fonts.extrabold, fontSize: 10.5, letterSpacing: 0.6, color: colors.greenInk },
  doneBadge: {
    width: 22,
    height: 22,
    borderRadius: 99,
    backgroundColor: colors.greenBright,
    alignItems: "center",
    justifyContent: "center",
  },
  cardName: { marginTop: 6, fontFamily: fonts.extrabold, fontSize: 16, lineHeight: 19 },
  cardSub: { fontFamily: fonts.semibold, fontSize: 12, color: "#8e98b8" },

  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(5,8,16,0.65)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "82%",
    paddingTop: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.cardBorder,
  },
  grabber: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 99,
    backgroundColor: colors.raisedBorder,
    marginBottom: 16,
  },
  sheetHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  sheetTitle: { fontFamily: fonts.extrabold, fontSize: 20, color: colors.text },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  lessonRowIdle: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: "0 3px 0 #1b2134",
  },
  lessonRowNext: {
    backgroundColor: colors.selectedBg,
    borderWidth: 1.5,
    borderColor: colors.accent,
    boxShadow: "0 3px 0 #2b3270",
  },
  lessonIndex: {
    width: 36,
    height: 36,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonIndexIdle: { backgroundColor: colors.badge },
  lessonIndexNext: { backgroundColor: colors.accent },
  lessonIndexDone: { backgroundColor: colors.greenBg, borderWidth: 1, borderColor: colors.greenBorder },
  lessonIndexText: { fontFamily: fonts.extrabold, fontSize: 14 },
  lessonKicker: { fontFamily: fonts.extrabold, fontSize: 10.5, letterSpacing: 1, color: colors.accentSoft },
  lessonTitle: { marginTop: 2, fontFamily: fonts.bold, fontSize: 15, color: colors.text },
});
