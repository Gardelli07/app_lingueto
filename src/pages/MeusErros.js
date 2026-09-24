import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchErrosExercicios } from "../services/erros";
import { findLessonByScreen } from "../util/courseCatalog";
import { parseChaveSlide } from "../util/erroReview";
import { getExerciseTypeLabel } from "../util/exerciseTypeLabels";
import { useTheme, useThemedStyles } from "../theme";

// COURSE_OPTIONS (courseCatalog.js) guarda os cursos sem acento porque o nome
// vira chave de storage. Aqui e so o rotulo que o aluno le.
const COURSE_LABELS = {
  "Ingles Completo": "Inglês Completo",
  "Bussines English": "Business English",
  "Ingles para viagem": "Inglês para Viagem",
};

// A partir de quantos dias o erro deixa de mostrar a data e vira "ha N dias".
const STALE_AFTER_DAYS = 14;
const MS_POR_DIA = 24 * 60 * 60 * 1000;

function parseData(iso) {
  if (!iso) return null;
  const data = new Date(iso);
  return Number.isNaN(data.getTime()) ? null : data;
}

function formatData(iso) {
  const data = parseData(iso);
  return data ? data.toLocaleDateString("pt-BR") : "";
}

function formatDiaMes(iso) {
  const data = parseData(iso);
  if (!data) return "";
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}`;
}

// Dias inteiros de calendario: um erro de ontem as 23h continua sendo "1 dia",
// nao "algumas horas".
function diasDesde(iso) {
  const data = parseData(iso);
  if (!data) return null;
  const hoje = new Date();
  const inicioHoje = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );
  const inicioErro = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
  );
  return Math.max(0, Math.round((inicioHoje - inicioErro) / MS_POR_DIA));
}

// Agrupa os erros por aula: se o usuario errou varios slides da mesma
// aula, "Refazer" deve abrir so esses slides, nao a aula inteira.
function buildErrorGroups(erros) {
  const groups = new Map();
  const orphans = [];

  for (const erro of erros) {
    const parsed = parseChaveSlide(erro.chave_slide);
    const found = parsed ? findLessonByScreen(parsed.screen) : null;

    if (!parsed || !found) {
      orphans.push({ key: erro.chave_slide, date: formatData(erro.criado_em) });
      continue;
    }

    const groupKey = found.lesson.screen;
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        key: groupKey,
        title: found.lesson.title,
        courseName: COURSE_LABELS[found.courseName] || found.courseName,
        level: found.level,
        lesson: found.lesson,
        lessons: found.lessons,
        slideIndexSet: new Set(),
        typeSet: new Set(),
        latestDate: erro.criado_em,
      });
    }

    const group = groups.get(groupKey);
    group.slideIndexSet.add(parsed.slideIndex);
    if (erro.tipo_exercicio) group.typeSet.add(erro.tipo_exercicio);
    if (new Date(erro.criado_em) > new Date(group.latestDate)) {
      group.latestDate = erro.criado_em;
    }
  }

  const groupList = [...groups.values()]
    .map((group) => {
      const slideIndices = [...group.slideIndexSet].sort((a, b) => a - b);
      // O chip so aparece quando a aula tem um unico tipo de exercicio errado:
      // com tipos misturados nao daria para rotular o card sem mentir.
      const typeLabel =
        group.typeSet.size === 1
          ? getExerciseTypeLabel([...group.typeSet][0])
          : null;

      return {
        key: group.key,
        title: group.title,
        courseName: group.courseName,
        level: group.level,
        lesson: group.lesson,
        lessons: group.lessons,
        slideIndices,
        count: slideIndices.length,
        typeLabel,
        days: diasDesde(group.latestDate),
        shortDate: formatDiaMes(group.latestDate),
        latestDate: group.latestDate,
      };
    })
    .sort((a, b) => new Date(b.latestDate) - new Date(a.latestDate));

  return { groupList, orphans };
}

function useFocusRefresh(callback, navigation) {
  React.useEffect(() => {
    callback();
    const sub = navigation.addListener("focus", callback);
    return sub;
  }, [callback, navigation]);
}

function levelStyles(styles, level) {
  switch (level) {
    case "Starter":
      return [styles.levelStarter, styles.levelStarterTxt];
    case "Elementary":
      return [styles.levelElementary, styles.levelElementaryTxt];
    case "Intermediate":
      return [styles.levelIntermediate, styles.levelIntermediateTxt];
    default:
      return [styles.levelAdvanced, styles.levelAdvancedTxt];
  }
}

// Recencia: hoje = pill vermelha, ate duas semanas = data, depois = "ha N dias".
function RecencyTag({ days, shortDate, styles, CORES }) {
  if (days == null) return null;

  if (days === 0) {
    return (
      <View style={[styles.recency, styles.recencyFresh]}>
        <View style={styles.recencyDot} />
        <Text style={[styles.recencyTxt, styles.recencyFreshTxt]}>HOJE</Text>
      </View>
    );
  }

  if (days < STALE_AFTER_DAYS) {
    return (
      <View style={styles.recency}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={13}
          color={CORES.PROFILE_MUTED_LIGHT}
        />
        <Text style={[styles.recencyTxt, styles.recencyDateTxt]}>
          {shortDate}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.recency, styles.recencyStale]}>
      <MaterialCommunityIcons
        name="snowflake"
        size={13}
        color={CORES.PROFILE_MUTED}
      />
      <Text style={[styles.recencyTxt, styles.recencyStaleTxt]}>
        há {days} dias
      </Text>
    </View>
  );
}

function SkeletonList({ styles }) {
  const pulse = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.55,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const bar = (style) => (
    <Animated.View style={[styles.skBar, style, { opacity: pulse }]} />
  );

  return (
    <View>
      <Animated.View style={[styles.skSummary, { opacity: pulse }]} />

      <View style={styles.sectionRow}>
        {bar({ width: 150, height: 10 })}
        <View style={styles.sectionLine} />
      </View>

      {[1, 0.75, 0.45].map((opacity, index) => (
        <View key={index} style={[styles.card, styles.skCard, { opacity }]}>
          <View style={styles.cardTop}>
            {bar({ width: 78, height: 20 })}
            {bar({ width: 100, height: 20, marginLeft: 6 })}
          </View>
          <View style={styles.cardBody}>
            {bar({ width: "70%", height: 15 })}
            {bar({ width: "40%", height: 11, marginTop: 7 })}
          </View>
          <View style={styles.cardBottom}>
            {bar({ width: 112, height: 34, borderRadius: 14 })}
            {bar({ width: 120, height: 44, marginLeft: "auto" })}
          </View>
        </View>
      ))}
    </View>
  );
}

export default function MeusErrosScreen({ navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [groups, setGroups] = useState([]);
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusRefresh(
    useCallback(async () => {
      setLoading(true);
      try {
        const lista = await fetchErrosExercicios();
        const { groupList, orphans: orphanList } = buildErrorGroups(lista);
        setGroups(groupList);
        setOrphans(orphanList);
      } catch {
        setGroups([]);
        setOrphans([]);
      } finally {
        setLoading(false);
      }
    }, []),
    navigation,
  );

  // O resumo conta so o que da para refazer — erro orfao nao tem aula viva.
  const totalErros = useMemo(
    () => groups.reduce((soma, group) => soma + group.count, 0),
    [groups],
  );

  const goHome = () => navigation.navigate("Tabs", { screen: "Home" });

  const handleRetry = (group) => {
    navigation.navigate(group.lesson.screen, {
      lesson: group.lesson,
      lessons: group.lessons,
      reviewMode: true,
      reviewSlideIndices: group.slideIndices,
    });
  };

  const isEmpty = groups.length === 0 && orphans.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <View style={styles.header}>
        <Pressable
          onPress={goHome}
          style={styles.headerButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={CORES.PROFILE_NAVY}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Meus erros</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkeletonList styles={styles} />
        ) : isEmpty ? (
          <View style={styles.emptyState}>
            <View style={styles.trophyOuter}>
              <View style={styles.trophyInner}>
                <View style={styles.trophyCore}>
                  <MaterialCommunityIcons
                    name="trophy-variant"
                    size={34}
                    color={CORES.ON_GOLD}
                  />
                </View>
              </View>
            </View>

            <View style={styles.emptyBadge}>
              <MaterialCommunityIcons
                name="check-circle"
                size={15}
                color={CORES.PROFILE_GREEN}
              />
              <Text style={styles.emptyBadgeTxt}>NADA PENDENTE</Text>
            </View>

            <Text style={styles.emptyTitle}>Tudo revisado!</Text>
            <Text style={styles.emptyText}>
              Você não tem nenhum erro esperando. Quando errar um exercício numa
              aula, ele aparece aqui para refazer.
            </Text>

            <Pressable
              onPress={goHome}
              style={({ pressed }) => [
                styles.emptyAction,
                pressed && styles.actionPressed,
              ]}
            >
              <MaterialCommunityIcons
                name="play-circle"
                size={20}
                color={CORES.WHITE}
              />
              <Text style={styles.emptyActionTxt}>Continuar estudando</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {groups.length > 0 && (
              <LinearGradient
                colors={[CORES.ERR_SUMMARY_FROM, CORES.ERR_SUMMARY_TO]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summary}
              >
                <View>
                  <View style={styles.summaryValueRow}>
                    <Text style={styles.summaryValue}>{totalErros}</Text>
                    <Text style={styles.summaryUnit}>
                      {totalErros === 1 ? "erro" : "erros"}
                    </Text>
                  </View>
                  <Text style={styles.summarySub}>esperando revisão</Text>
                </View>

                <View style={styles.summaryDivider} />

                <View>
                  <View style={styles.summaryValueRow}>
                    <Text style={styles.summaryValue}>{groups.length}</Text>
                    <Text style={styles.summaryUnit}>
                      {groups.length === 1 ? "aula" : "aulas"}
                    </Text>
                  </View>
                  <Text style={styles.summarySub}>para refazer</Text>
                </View>

                <View style={styles.summaryIcon}>
                  <MaterialCommunityIcons
                    name="target-variant"
                    size={24}
                    color={CORES.WHITE}
                  />
                </View>
              </LinearGradient>
            )}

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Mais recentes primeiro</Text>
              <View style={styles.sectionLine} />
            </View>

            {groups.map((group) => {
              const [chipStyle, chipTxtStyle] = levelStyles(styles, group.level);

              return (
                <Pressable
                  key={group.key}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() => handleRetry(group)}
                  accessibilityRole="button"
                  accessibilityLabel={`Refazer exercícios da aula ${group.title}`}
                >
                  {({ pressed }) => (
                    <>
                      <View style={styles.cardTop}>
                        <View style={[styles.levelChip, chipStyle]}>
                          <Text style={[styles.levelChipTxt, chipTxtStyle]}>
                            {String(group.level || "").toUpperCase()}
                          </Text>
                        </View>

                        {!!group.typeLabel && (
                          <View style={styles.typeChip}>
                            <Text style={styles.typeChipTxt} numberOfLines={1}>
                              {group.typeLabel}
                            </Text>
                          </View>
                        )}

                        <View style={styles.cardTopSpacer} />

                        <RecencyTag
                          days={group.days}
                          shortDate={group.shortDate}
                          styles={styles}
                          CORES={CORES}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle} numberOfLines={2}>
                          {group.title}
                        </Text>
                        <Text style={styles.cardCourse}>{group.courseName}</Text>
                      </View>

                      <View style={styles.cardBottom}>
                        <View style={styles.countPill}>
                          <Text style={styles.countValue}>{group.count}</Text>
                          <Text style={styles.countLabel}>
                            {group.count === 1 ? "exercício" : "exercícios"}
                          </Text>
                        </View>

                        <View
                          style={[styles.action, pressed && styles.actionPressed]}
                        >
                          <MaterialCommunityIcons
                            name="refresh"
                            size={18}
                            color={CORES.WHITE}
                          />
                          <Text style={styles.actionTxt}>Refazer</Text>
                        </View>
                      </View>
                    </>
                  )}
                </Pressable>
              );
            })}

            {orphans.map((orphan) => (
              <View key={orphan.key} style={styles.orphan}>
                <View style={styles.orphanIcon}>
                  <MaterialCommunityIcons
                    name="file-question-outline"
                    size={20}
                    color={CORES.PROFILE_MUTED_LIGHT}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orphanTitle}>Exercício</Text>
                  {!!orphan.date && (
                    <Text style={styles.orphanDate}>
                      Última tentativa em {orphan.date}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (CORES) => {
  const escuro = CORES.mode === "dark";

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingTop: 6,
      paddingBottom: 10,
    },
    headerButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 99,
    },
    headerTitle: { fontSize: 19, fontWeight: "900", color: CORES.PROFILE_NAVY },

    scroll: { paddingHorizontal: 16, paddingBottom: 28 },

    /* ---------- resumo ---------- */
    summary: {
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      marginBottom: 14,
      shadowColor: CORES.ERR_SUMMARY_TO,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.24,
      shadowRadius: 16,
      elevation: escuro ? 0 : 4,
    },
    summaryValueRow: { flexDirection: "row", alignItems: "baseline", gap: 7 },
    summaryValue: {
      fontSize: 40,
      fontWeight: "900",
      color: CORES.WHITE,
      lineHeight: 44,
    },
    summaryUnit: { fontSize: 14, fontWeight: "800", color: CORES.WHITE },
    summarySub: {
      fontSize: 12,
      fontWeight: "700",
      color: CORES.ERR_SUMMARY_SUB,
      marginTop: 2,
    },
    summaryDivider: {
      width: 1,
      height: 44,
      backgroundColor: "rgba(255,255,255,0.28)",
    },
    summaryIcon: {
      marginLeft: "auto",
      width: 46,
      height: 46,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.16)",
      alignItems: "center",
      justifyContent: "center",
    },

    /* ---------- cabecalho da lista ---------- */
    sectionRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 4,
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "800",
      color: CORES.PROFILE_MUTED,
      letterSpacing: 0.7,
      textTransform: "uppercase",
    },
    sectionLine: { flex: 1, height: 1, backgroundColor: CORES.ERR_DIVIDER },

    /* ---------- card ---------- */
    card: {
      backgroundColor: CORES.SURFACE,
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      borderWidth: escuro ? 1 : 0,
      borderColor: CORES.BORDER,
      shadowColor: CORES.SHADOW,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: escuro ? 0 : 0.1,
      shadowRadius: 12,
      elevation: escuro ? 0 : 2,
    },
    cardPressed: { backgroundColor: CORES.SURFACE_ALT },

    cardTop: { flexDirection: "row", alignItems: "center", gap: 6 },
    cardTopSpacer: { flex: 1 },

    levelChip: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 99 },
    levelChipTxt: { fontSize: 11, fontWeight: "900", letterSpacing: 0.35 },
    levelStarter: { backgroundColor: CORES.PROFILE_GREEN_BG },
    levelStarterTxt: { color: CORES.PROFILE_GREEN },
    levelElementary: { backgroundColor: CORES.HOME_DAILY_BG },
    levelElementaryTxt: { color: CORES.PROFILE_BLUE },
    levelIntermediate: { backgroundColor: CORES.HOME_STREAK_BG },
    levelIntermediateTxt: { color: CORES.HOME_STREAK_TXT },
    levelAdvanced: { backgroundColor: CORES.ERR_LEVEL_ADV_BG },
    levelAdvancedTxt: { color: CORES.ERR_LEVEL_ADV_TXT },

    typeChip: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_CHIP_BG,
      flexShrink: 1,
    },
    typeChipTxt: { fontSize: 11, fontWeight: "800", color: CORES.PROFILE_MUTED },

    recency: { flexDirection: "row", alignItems: "center", gap: 5 },
    recencyTxt: { fontSize: 11, fontWeight: "900" },
    recencyFresh: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 99,
      backgroundColor: CORES.ERR_FRESH_BG,
    },
    recencyFreshTxt: { color: CORES.ERR_FRESH_TXT },
    recencyDot: {
      width: 6,
      height: 6,
      borderRadius: 99,
      backgroundColor: CORES.DANGER,
    },
    recencyDateTxt: { color: CORES.PROFILE_MUTED_LIGHT, fontWeight: "800" },
    recencyStale: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 99,
      backgroundColor: CORES.ERR_STALE_BG,
    },
    recencyStaleTxt: { color: CORES.PROFILE_MUTED, fontWeight: "800" },

    cardBody: { marginTop: 12, gap: 3 },
    cardTitle: {
      fontSize: 17,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      lineHeight: 21,
    },
    cardCourse: {
      fontSize: 12,
      fontWeight: "700",
      color: CORES.PROFILE_MUTED_LIGHT,
    },

    cardBottom: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    countPill: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 6,
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: CORES.ERR_COUNT_BG,
    },
    countValue: {
      fontSize: 20,
      fontWeight: "900",
      color: CORES.ERR_COUNT_TXT,
      lineHeight: 22,
    },
    countLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: CORES.ERR_COUNT_LABEL,
    },

    action: {
      marginLeft: "auto",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      height: 44,
      paddingHorizontal: 18,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: escuro ? 0 : 0.28,
      shadowRadius: 10,
      elevation: escuro ? 0 : 2,
    },
    actionPressed: { backgroundColor: CORES.ERR_ACTION_PRESSED },
    actionTxt: { fontSize: 14, fontWeight: "800", color: CORES.WHITE },

    /* ---------- erro orfao ---------- */
    orphan: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: CORES.HOME_LOCKED_BG,
      borderRadius: 20,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: CORES.BORDER_STRONG,
    },
    orphanIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: CORES.ERR_ORPHAN_ICON_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    orphanTitle: { fontSize: 14, fontWeight: "800", color: CORES.PROFILE_MUTED },
    orphanDate: {
      fontSize: 12,
      fontWeight: "600",
      color: CORES.PROFILE_MUTED_LIGHT,
      marginTop: 2,
    },

    /* ---------- vazio ---------- */
    emptyState: {
      alignItems: "center",
      paddingHorizontal: 18,
      paddingTop: 90,
      gap: 18,
    },
    trophyOuter: {
      width: 132,
      height: 132,
      borderRadius: 99,
      backgroundColor: CORES.HOME_STREAK_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    trophyInner: {
      width: 96,
      height: 96,
      borderRadius: 99,
      backgroundColor: CORES.HOME_PREMIUM_ICON_BG,
      alignItems: "center",
      justifyContent: "center",
    },
    trophyCore: {
      width: 66,
      height: 66,
      borderRadius: 99,
      backgroundColor: CORES.GOLD,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.GOLD_DARK,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.38,
      shadowRadius: 14,
      elevation: escuro ? 0 : 3,
    },
    emptyBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 5,
      paddingHorizontal: 14,
      borderRadius: 99,
      backgroundColor: CORES.PROFILE_GREEN_BG,
    },
    emptyBadgeTxt: {
      fontSize: 12,
      fontWeight: "900",
      color: CORES.PROFILE_GREEN,
      letterSpacing: 0.5,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: "900",
      color: CORES.PROFILE_NAVY,
      textAlign: "center",
      lineHeight: 28,
      marginBottom: -10,
    },
    emptyText: {
      fontSize: 14,
      fontWeight: "600",
      color: CORES.PROFILE_MUTED,
      textAlign: "center",
      lineHeight: 20,
    },
    emptyAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      height: 48,
      paddingHorizontal: 22,
      borderRadius: 99,
      backgroundColor: CORES.ACCENT_FILL,
      shadowColor: CORES.ACCENT_FILL,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: escuro ? 0 : 0.28,
      shadowRadius: 14,
      elevation: escuro ? 0 : 3,
    },
    emptyActionTxt: { fontSize: 15, fontWeight: "800", color: CORES.WHITE },

    /* ---------- carregando ---------- */
    skSummary: {
      height: 96,
      borderRadius: 22,
      backgroundColor: CORES.ERR_SKELETON,
      marginBottom: 14,
    },
    skCard: { shadowOpacity: escuro ? 0 : 0.06 },
    skBar: { borderRadius: 99, backgroundColor: CORES.ERR_SKELETON_SOFT },
  });
};
