import React, { Fragment, useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { colors, fonts } from "../../../exc/grammarlab/theme";
import { BoltIcon, CheckIcon, ChevronLeftIcon, LockIcon, XIcon } from "../../../exc/grammarlab/icons";
import { fetchResumoProgresso } from "../../../services/progresso";
import * as dailyGoals from "../../../util/dailyGoals";
import { formatXp } from "../../../util/xp";
import { goldRush, MEDALS } from "./goldRush";
import { Medal } from "./Medal";
import { useModuleProgress } from "./useModuleProgress";

// Aulas de um tema como cartoes (canhoto, picote, acao), com o card da
// medalha Gold Rush no topo (ClassesScreen do repo my-trip-to-florida).
// Diferencas do repo, decididas pelo usuario: aula feita mostra so
// "Concluída" (o app nao guarda acertos/XP por aula) e a pilula do topo
// mostra o XP total do aluno.
//
// course: { title, topics, storageKey, startLabel, StartIcon, soonText(num) }.
export default function ModuleClassesScreen({ navigation, route, course }) {
  const insets = useSafeAreaInsets();
  const topic =
    course.topics.find((item) => item.num === route?.params?.topicNum) || course.topics[0];
  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const { progress, accessLoaded, isLessonUnlocked } = useModuleProgress(
    navigation,
    course.storageKey,
  );
  const [totalXp, setTotalXp] = useState(null);
  const [soon, setSoon] = useState(0);
  const openedRef = useRef(false);

  const [tileBg, tileFg] = topic.color;
  const g = goldRush(topic, progress);
  const medal = MEDALS[g.tier];

  useEffect(() => {
    let active = true;
    async function load() {
      const [resumo, goals] = await Promise.all([
        fetchResumoProgresso().catch(() => null),
        dailyGoals.getTodayGoals().catch(() => null),
      ]);
      if (active && resumo) setTotalXp((resumo.xpTotal ?? 0) + (goals?.lifetimeBonusXp ?? 0));
    }
    load();
    const sub = navigation.addListener("focus", load);
    return () => {
      active = false;
      sub();
    };
  }, [navigation]);

  const openLesson = (lesson) => {
    if (!isLessonUnlocked(lesson.screen)) {
      navigation.navigate("Paywall");
      return;
    }
    navigation.navigate(lesson.screen, { lesson, lessons: topic.lessons });
  };

  // "Proxima aula" do LessonScreen volta para ca (popTo) com a aula seguinte
  // do tema, que abre por cima desta tela: um "voltar" so traz de volta aqui.
  // O ref libera o proximo pedido depois de atendido.
  useEffect(() => {
    if (!autoOpenLessonId) {
      openedRef.current = false;
      return;
    }
    if (openedRef.current || !accessLoaded) return;
    const lesson = topic.lessons.find((item) => String(item.id) === String(autoOpenLessonId));
    if (!lesson || !isLessonUnlocked(lesson.screen)) return;
    openedRef.current = true;
    navigation.setParams({ autoOpenLessonId: null });
    requestAnimationFrame(() => openLesson(lesson));
  }, [autoOpenLessonId, accessLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // A medalha aparece com um pulo quando uma nova e ganha.
  const pop = useRef(new Animated.Value(1)).current;
  const lastTier = useRef(g.tier);
  useEffect(() => {
    if (g.tier > lastTier.current) {
      pop.setValue(0.4);
      Animated.spring(pop, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
    }
    lastTier.current = g.tier;
  }, [g.tier, pop]);

  const medalTitle = "Gold Rush" + (g.tier ? ` · ${g.tier === 3 ? "Ouro!" : medal.name}` : "");
  const nextName = g.tier < 3 ? MEDALS[g.tier + 1].name.toLowerCase() : "";
  const medalSub =
    g.tier === 3
      ? `Você completou todas as ${g.total} aulas do tema.`
      : `Falta${g.left > 1 ? "m" : ""} ${g.left} aula${g.left > 1 ? "s" : ""} para a medalha de ${nextName}.`;

  let n = 0;
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 90,
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para os temas"
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <ChevronLeftIcon size={16} color={colors.textSoft} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={[styles.kicker, { color: tileFg }]}>
              {topic.num} · {course.title.toUpperCase()}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {topic.section}
            </Text>
          </View>
          {totalXp != null && (
            <View style={styles.xpPill} accessibilityLabel={`${totalXp} XP`}>
              <BoltIcon size={12} color={colors.greenBright} />
              <Text style={styles.xpText}>{formatXp(totalXp)}</Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.medalCard,
            { borderColor: g.tier ? medal.color + "66" : colors.cardBorder },
          ]}
        >
          <Animated.View
            accessibilityRole="image"
            accessibilityLabel={
              g.tier ? `Medalha de ${medal.name.toLowerCase()}` : "Nenhuma medalha ainda"
            }
            style={{ transform: [{ scale: pop }] }}
          >
            <Medal tier={g.tier} />
          </Animated.View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.medalTitle, { color: g.tier ? medal.color : colors.text }]}>
              {medalTitle}
            </Text>
            <Text style={styles.medalSub}>{medalSub}</Text>
            <View style={styles.segments}>
              {g.segments.map((fill, i) => (
                <View key={i} style={styles.segment}>
                  <View
                    style={{
                      width: `${fill * 100}%`,
                      height: "100%",
                      borderRadius: 99,
                      backgroundColor: MEDALS[i + 1].color,
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={styles.segmentLabels}>
              {["BRONZE", "PRATA", "OURO"].map((label, i) => (
                <Text key={label} style={[styles.segmentLabel, { color: MEDALS[i + 1].color }]}>
                  {label}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.section}>SUAS AULAS</Text>

        <View style={{ gap: 10 }}>
          {topic.firstGroup ? <GroupHeader title={topic.firstGroup} color={tileFg} /> : null}
          {topic.lessons.map((lesson) => {
            n += 1;
            const done = !!progress[lesson.id];
            const locked = !isLessonUnlocked(lesson.screen);
            return (
              <Ticket
                key={lesson.id}
                num={n}
                title={lesson.title}
                sub={
                  done
                    ? "Concluída"
                    : `${lesson.level} · ${lesson.exerciseCount} exercícios`
                }
                subColor={done ? colors.greenBright : undefined}
                active
                stubBg={tileFg}
                accent={tileFg}
                action={done ? "done" : locked ? "locked" : "board"}
                course={course}
                onPress={() => openLesson(lesson)}
              />
            );
          })}
          {topic.upcoming.map((item) => {
            n += 1;
            const num = n;
            return (
              <Fragment key={num}>
                {item.group ? <GroupHeader title={item.group} color={tileFg} /> : null}
                <Ticket
                  num={num}
                  title={item.title ?? `Aula ${num}`}
                  sub={item.description}
                  stubBg={colors.raised}
                  accent={tileBg}
                  action="soon"
                  onPress={() => setSoon(num)}
                />
              </Fragment>
            );
          })}
        </View>
      </ScrollView>

      {soon > 0 && (
        <View
          style={[styles.toast, { bottom: insets.bottom + 24 }]}
          accessibilityLiveRegion="polite"
        >
          <Svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.amberText}
            strokeWidth={2.2}
            strokeLinecap="round"
          >
            <Circle cx={12} cy={12} r={9} />
            <Path d="M12 7v5l3 2" />
          </Svg>
          <Text style={styles.toastText}>{course.soonText(soon)}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar"
            onPress={() => setSoon(0)}
            style={styles.toastClose}
          >
            <XIcon size={12} color={colors.textSoft} strokeWidth={2.6} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

function GroupHeader({ title, color }) {
  return (
    <View style={styles.groupRow}>
      <View style={[styles.groupDot, { backgroundColor: color }]} />
      <Text style={[styles.group, { color }]}>{title.toUpperCase()}</Text>
    </View>
  );
}

// Uma aula como cartao: canhoto com o numero, picote, titulo e a acao
// ("board" usa o startLabel/StartIcon do curso). "locked" (aula paga sem
// acesso, como no Grammar Lab) nao existe no repo.
function Ticket({ num, title, sub, subColor, active, stubBg, accent, action, course, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Aula ${num}: ${title}${action === "board" ? ". Começar" : ""}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.ticket,
        active && { boxShadow: `0 0 0 3px ${accent}26, 0 4px 0 #0a0e19` },
        pressed && { transform: [{ translateY: 2 }] },
      ]}
    >
      <View style={[styles.stub, { backgroundColor: stubBg }]}>
        <Text style={[styles.stubLabel, { color: active ? colors.bg : colors.textMuted }]}>
          AULA
        </Text>
        <Text style={[styles.stubNum, { color: active ? colors.bg : colors.textMuted }]}>
          {String(num).padStart(2, "0")}
        </Text>
      </View>
      <View style={styles.tear}>
        <View style={[styles.notch, { top: -8 }]} />
        <View style={[styles.notch, { bottom: -8 }]} />
      </View>
      <View style={styles.ticketBody}>
        <Text style={styles.ticketTitle}>{title}</Text>
        {sub ? (
          <Text style={[styles.ticketSub, subColor ? { color: subColor } : null]}>{sub}</Text>
        ) : null}
      </View>
      <View style={styles.ticketAction}>
        {action === "board" ? (
          <View style={[styles.board, { backgroundColor: colors.accent }]}>
            <course.StartIcon color={colors.text} />
            <Text style={styles.boardText}>{course.startLabel}</Text>
          </View>
        ) : action === "done" ? (
          <View style={styles.doneChip}>
            <CheckIcon size={12} color={colors.greenBright} />
            <Text style={styles.doneText}>Feita</Text>
          </View>
        ) : action === "locked" ? (
          <View style={styles.soonChip}>
            <LockIcon size={14} />
          </View>
        ) : (
          <View style={styles.soonChip}>
            <Text style={styles.soonText}>SOON</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  kicker: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 1 },
  title: { fontFamily: fonts.extrabold, fontSize: 20, lineHeight: 25, color: colors.text },
  xpPill: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  xpText: { fontFamily: fonts.extrabold, fontSize: 13, color: colors.text },
  medalCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  medalTitle: { fontFamily: fonts.extrabold, fontSize: 16, lineHeight: 20 },
  medalSub: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16, color: colors.textSoft },
  segments: { flexDirection: "row", gap: 4, marginTop: 4 },
  segment: { flex: 1, height: 8, borderRadius: 99, backgroundColor: colors.badge, overflow: "hidden" },
  segmentLabels: { flexDirection: "row" },
  segmentLabel: { flex: 1, fontFamily: fonts.extrabold, fontSize: 10, letterSpacing: 0.6 },
  section: {
    marginTop: 18,
    marginBottom: 10,
    fontFamily: fonts.extrabold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  groupRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  groupDot: { width: 6, height: 6, borderRadius: 99 },
  group: { fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 1 },
  ticket: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 84,
    borderRadius: 16,
    backgroundColor: colors.card,
    overflow: "hidden",
    boxShadow: "0 4px 0 #0a0e19",
  },
  stub: { width: 64, alignItems: "center", justifyContent: "center", gap: 1 },
  stubLabel: { fontFamily: fonts.extrabold, fontSize: 9, letterSpacing: 1, opacity: 0.8 },
  stubNum: { fontFamily: fonts.extrabold, fontSize: 24, lineHeight: 26 },
  tear: { width: 0, borderLeftWidth: 2, borderStyle: "dashed", borderColor: "#2a3350" },
  notch: {
    position: "absolute",
    left: -9,
    width: 16,
    height: 16,
    borderRadius: 99,
    backgroundColor: colors.bg,
  },
  ticketBody: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 8,
    justifyContent: "center",
    gap: 3,
  },
  ticketTitle: { fontFamily: fonts.extrabold, fontSize: 15, lineHeight: 19, color: colors.text },
  ticketSub: { fontFamily: fonts.semibold, fontSize: 11, lineHeight: 15, color: colors.textMuted },
  ticketAction: { paddingRight: 12, justifyContent: "center" },
  board: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  boardText: { fontFamily: fonts.extrabold, fontSize: 12, color: colors.text },
  doneChip: {
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 99,
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  doneText: { fontFamily: fonts.extrabold, fontSize: 12, color: colors.greenBright },
  soonChip: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#2f3854",
    justifyContent: "center",
  },
  soonText: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 0.6, color: colors.textMuted },
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    padding: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.raised,
    borderWidth: 1,
    borderColor: "#2f3854",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toastText: { flex: 1, fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18, color: "#dfe3f1" },
  toastClose: {
    width: 32,
    height: 32,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#2f3854",
    alignItems: "center",
    justifyContent: "center",
  },
});
