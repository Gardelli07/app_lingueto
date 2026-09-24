import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import { excluirConta } from "../services/usuarios";
import { getLevelProgress } from "../util/xp";
import { clearAllLocalProgress } from "../util/courseCatalog";
import { clearAllAulasPlusProgress } from "./aulas/aulasplus/progress";
import { fetchResumoProgresso, resetarProgresso } from "../services/progresso";
import { fetchEstatisticasDesafios } from "../services/desafios";
import { resetarNivelamento } from "../services/nivelamento";
import { hasFullAccess } from "../util/plans";
import {
  DEFAULT_REMINDER_HOUR,
  DEFAULT_REMINDER_MINUTE,
  disableDailyReminder,
  enableDailyReminder,
  getReminderSettings,
} from "../services/notifications";
import StudyTimeModal from "../components/StudyTimeModal";
import EditProfileModal from "../components/EditProfileModal";
import NotificationBell from "../components/NotificationBell";
import { useTheme, useThemeMode, useThemedStyles } from "../theme";

/* ---------- ícones ---------- */
const IconEdit = ({ size = 17, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </Svg>
  );
};

const IconArrow = ({ size = 17, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.ON_GOLD} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 12h14" />
      <Path d="M12 5l7 7-7 7" />
    </Svg>
  );
};

const IconChevron = ({ size = 18, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_ARROW} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
};

const IconUsers = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Circle cx={9} cy={7} r={4} />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  );
};

const IconBell = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Svg>
  );
};

const IconGlobe = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={10} />
      <Path d="M2 12h20" />
      <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
  );
};

const IconShield = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Svg>
  );
};

const IconLogout = ({ size = 18, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_DANGER} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <Path d="M16 17l5-5-5-5" />
      <Path d="M21 12H9" />
    </Svg>
  );
};

const IconCrown = ({ size = 20 }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={CORES.PROFILE_GOLD}>
      <Path d="M3 6l4.5 4L12 4l4.5 6L21 6l-1.5 12h-15L3 6z" />
    </Svg>
  );
};

const IconCheck = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_GREEN} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={9} />
      <Path d="M8.5 12.3l2.3 2.3 4.7-4.9" />
    </Svg>
  );
};

const IconRefresh = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_DANGER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
      <Path d="M21 3v5h-5" />
      <Path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
      <Path d="M3 21v-5h5" />
    </Svg>
  );
};

const IconTrash = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_DANGER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 6h18" />
      <Path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <Path d="M10 11v6" />
      <Path d="M14 11v6" />
    </Svg>
  );
};

const IconMoon = ({ size = 19, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_BLUE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </Svg>
  );
};

/* ---------- linha da seção Conta ---------- */
function Row({ icon, label, right, isLast, onPress }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && { backgroundColor: CORES.PRESSED },
      ]}
    >
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      {right}
    </Pressable>
  );
}

const comingSoon = (title) => () => Alert.alert(title, "Em breve.");

export default function ProfileScreen({ navigation }) {
  const { user, signOut, downgradeToFreePlan, updateUser } = useAuth();
  const CORES = useTheme();
  const { isDark, setMode } = useThemeMode();
  const styles = useThemedStyles(makeStyles);
  const fullAccess = hasFullAccess(user);

  const displayName = user?.nome_exibicao?.trim() || user?.login || "Usuário";
  const email = user?.email || user?.login || "";
  const avatarUri = user?.foto_url ? `${API_URL}${user.foto_url}` : null;

  const [totalXp, setTotalXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [desafiosStats, setDesafiosStats] = useState({ total: 0, vitorias: 0, percentualVitorias: 0 });
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderHour, setReminderHour] = useState(DEFAULT_REMINDER_HOUR);
  const [reminderMinute, setReminderMinute] = useState(DEFAULT_REMINDER_MINUTE);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [excluindoConta, setExcluindoConta] = useState(false);

  useFocusRefresh(
    useCallback(async () => {
      const [resumo, reminder, desafiosStatsResp] = await Promise.all([
        fetchResumoProgresso().catch(() => null),
        getReminderSettings(),
        fetchEstatisticasDesafios().catch(() => null),
      ]);
      // Xp_total e a fonte unica (backend), pra bater com o que aparece no
      // perfil visitado por amigos. So atualiza em caso de sucesso, mantendo
      // o ultimo valor bom se a rede falhar (mesmo padrao do streak).
      if (resumo) {
        setTotalXp(resumo.xpTotal);
        setStreak(resumo.streakAtual);
      }
      if (desafiosStatsResp) setDesafiosStats(desafiosStatsResp);
      setReminderEnabled(reminder.enabled);
      setReminderHour(reminder.hour);
      setReminderMinute(reminder.minute);
    }, []),
    navigation,
  );

  const handleToggleReminder = async (value) => {
    if (!value) {
      await disableDailyReminder();
      setReminderEnabled(false);
      return;
    }

    const granted = await enableDailyReminder(reminderHour, reminderMinute);
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Ative as notificações do Lingueto nas configurações do sistema para receber lembretes diários.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Abrir configurações", onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }
    setReminderEnabled(true);
  };

  const handleConfirmReminderTime = async (hour, minute) => {
    setTimeModalVisible(false);
    const granted = await enableDailyReminder(hour, minute);
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Ative as notificações do Lingueto nas configurações do sistema para receber lembretes diários.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Abrir configurações", onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }
    setReminderEnabled(true);
    setReminderHour(hour);
    setReminderMinute(minute);
  };

  const levelProgress = getLevelProgress(totalXp);

  // As lojas ainda nao estao configuradas, entao essa troca de plano e so
  // local (AsyncStorage), pra permitir testar o app com tudo liberado antes
  // da integracao real de compra existir.
  const handlePlanAction = () => {
    if (fullAccess) {
      Alert.alert(
        "Voltar para o Gratuito",
        "A integração com as lojas ainda não está pronta — isso só troca o plano localmente, para teste. Deseja continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Voltar", onPress: downgradeToFreePlan },
        ],
      );
      return;
    }
    navigation.navigate("Paywall");
  };

  const handleResetLessons = () => {
    Alert.alert(
      "Resetar aulas concluídas",
      "Isso vai apagar todo o seu progresso de aulas, XP e sequência. Essa ação não pode ser desfeita. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          style: "destructive",
          onPress: async () => {
            try {
              await resetarProgresso();
              await clearAllLocalProgress();
              await clearAllAulasPlusProgress();
              setTotalXp(0);
              setStreak(0);
            } catch {
              Alert.alert("Erro", "Não foi possível resetar as aulas. Tente novamente.");
            }
          },
        },
      ],
    );
  };

  const handleResetNivelamento = () => {
    Alert.alert(
      "Refazer teste de nivelamento",
      "Isso vai apagar a tentativa registrada do teste de nivelamento. Você poderá refazer o teste na próxima vez que abrir o app. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await resetarNivelamento();
              updateUser({ teste_nivelamento_concluido: false });
            } catch {
              Alert.alert("Erro", "Não foi possível apagar a tentativa. Tente novamente.");
            }
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Isso vai apagar sua conta e a maior parte dos dados vinculados a ela — perfil, progresso, XP, sequência, posts e comentários na comunidade, amizades, desafios e assinaturas. Essa ação não pode ser desfeita. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir conta",
          style: "destructive",
          onPress: async () => {
            setExcluindoConta(true);
            try {
              await excluirConta();
              signOut();
              const rootNavigation = navigation.getParent() ?? navigation;
              rootNavigation.reset({ index: 0, routes: [{ name: "Login" }] });
            } catch (error) {
              Alert.alert("Erro", error.message || "Não foi possível excluir a conta. Tente novamente.");
            } finally {
              setExcluindoConta(false);
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert("Sair da conta", "Tem certeza de que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          signOut();
          const rootNavigation = navigation.getParent() ?? navigation;
          rootNavigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View style={styles.avatar}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarInitial}>{displayName.charAt(0).toUpperCase()}</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.subtitle}>Aprendendo Inglês 🇬🇧</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>Nível {levelProgress.currentLevel}</Text>
              </View>
            </View>
            <NotificationBell />
          </View>
          <Pressable style={styles.editBtn} onPress={() => setEditProfileVisible(true)}>
            <IconEdit />
            <Text style={styles.editBtnText}>Editar perfil</Text>
          </Pressable>
        </View>

        {/* stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{totalXp}</Text>
            <Text style={styles.statLabel}>XP total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{levelProgress.currentLevel}</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_AMBER }]}>{streak} 🔥</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>
        </View>

        {/* stats de desafios */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{desafiosStats.total}</Text>
            <Text style={styles.statLabel}>Desafios</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_GOLD }]}>{desafiosStats.vitorias}</Text>
            <Text style={styles.statLabel}>Vitórias</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{desafiosStats.percentualVitorias}%</Text>
            <Text style={styles.statLabel}>Aproveitamento</Text>
          </View>
        </View>

        {/* comunidade */}
        <Text style={styles.sectionLabel}>COMUNIDADE</Text>
        <View style={styles.accountCard}>
          <Row
            icon={<IconUsers />}
            label="Amigos"
            right={<IconChevron />}
            isLast
            onPress={() => navigation.navigate("Amigos")}
          />
        </View>

        {/* assinatura */}
        <Text style={styles.sectionLabel}>ASSINATURA</Text>
        <View style={styles.planCard}>
          <View style={styles.planBlob} />
          <View style={styles.planTitleRow}>
            <IconCrown />
            <Text style={styles.planTitle}>
              {fullAccess ? "Plano Base (tudo liberado)" : "Plano Gratuito"}
            </Text>
          </View>
          <Text style={styles.planDesc}>
            {fullAccess
              ? "Todas as lições, cursos e níveis estão liberados neste plano de teste."
              : "Desbloqueie lições ilimitadas, correções prioritárias na comunidade e sem anúncios."}
          </Text>
          <Pressable style={styles.planBtn} onPress={handlePlanAction}>
            <Text style={styles.planBtnText}>
              {fullAccess ? "Voltar para o Gratuito" : "Assinar o Premium"}
            </Text>
            <IconArrow />
          </Pressable>
        </View>

        {/* aparência */}
        <Text style={styles.sectionLabel}>APARÊNCIA</Text>
        <View style={styles.accountCard}>
          <Row
            icon={<IconMoon />}
            label="Modo escuro"
            right={
              <Switch
                value={isDark}
                onValueChange={(ativo) => setMode(ativo ? "dark" : "light")}
                trackColor={{ false: CORES.TRACK, true: CORES.ACCENT_FILL }}
                thumbColor={isDark ? CORES.SURFACE_ALT : undefined}
              />
            }
            isLast
          />
        </View>

        {/* conta */}
        <Text style={styles.sectionLabel}>CONTA</Text>
        <View style={styles.accountCard}>
          <Row
            icon={<IconCheck />}
            label="Conta conectada"
            right={
              <View style={styles.activeChip}>
                <Text style={styles.activeChipText}>Ativo</Text>
              </View>
            }
          />
          {!!email && <Text style={styles.emailUnder}>{email}</Text>}

          <Row
            icon={<IconBell />}
            label="Notificações"
            right={
              <View style={styles.rightPair}>
                {reminderEnabled && (
                  <Pressable onPress={() => setTimeModalVisible(true)} hitSlop={8}>
                    <Text style={styles.rightValue}>
                      {String(reminderHour).padStart(2, "0")}:{String(reminderMinute).padStart(2, "0")}
                    </Text>
                  </Pressable>
                )}
                <Switch
                  value={reminderEnabled}
                  onValueChange={handleToggleReminder}
                  trackColor={{ false: CORES.TRACK, true: CORES.ACCENT_FILL }}
                  thumbColor={isDark ? CORES.SURFACE_ALT : undefined}
                />
              </View>
            }
          />
          <Row
            icon={<IconGlobe />}
            label="Idioma do app"
            right={
              <View style={styles.rightPair}>
                <Text style={styles.rightValue}>Português</Text>
                <IconChevron />
              </View>
            }
            onPress={comingSoon("Idioma do app")}
          />
          <Row
            icon={<IconShield />}
            label="Privacidade e segurança"
            right={<IconChevron />}
            isLast
            onPress={comingSoon("Privacidade e segurança")}
          />
        </View>

        {/* zona de risco */}
        <Text style={styles.sectionLabel}>ZONA DE RISCO</Text>
        <View style={styles.accountCard}>
          <Row
            icon={<IconRefresh />}
            label="Resetar aulas concluídas"
            right={<IconChevron />}
            onPress={handleResetLessons}
          />
          <Row
            icon={<IconRefresh />}
            label="Refazer teste de nivelamento"
            right={<IconChevron />}
            onPress={handleResetNivelamento}
          />
          <Row
            icon={<IconTrash />}
            label="Excluir conta"
            right={excluindoConta ? <ActivityIndicator color={CORES.PROFILE_DANGER} /> : <IconChevron />}
            isLast
            onPress={excluindoConta ? undefined : handleDeleteAccount}
          />
        </View>

        {/* sair */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <IconLogout />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>

        <Text style={styles.version}>Lingueto · versão 1.0.0</Text>
      </ScrollView>

      <StudyTimeModal
        visible={timeModalVisible}
        initialHour={reminderHour}
        initialMinute={reminderMinute}
        title="Horário do lembrete"
        description="Escolha o horário em que quer receber o lembrete diário de estudo."
        confirmLabel="Salvar horário"
        onConfirm={handleConfirmReminderTime}
        onCancel={() => setTimeModalVisible(false)}
      />

      <EditProfileModal
        visible={editProfileVisible}
        user={user}
        onClose={() => setEditProfileVisible(false)}
        onSaved={updateUser}
      />
    </SafeAreaView>
  );
}

function useFocusRefresh(callback, navigation) {
  React.useEffect(() => {
    callback();
    const sub = navigation.addListener("focus", callback);
    return sub;
  }, [callback, navigation]);
}

const makeStyles = (CORES) => {
  const shadow = {
    shadowColor: CORES.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: CORES.mode === "dark" ? 0.32 : 0.07,
    shadowRadius: 14,
    elevation: 3,
  };

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },

    scroll: { backgroundColor: CORES.PROFILE_BG, padding: 16, paddingTop: 16, paddingBottom: 28 },

    heroCard: {
      backgroundColor: CORES.SURFACE, borderRadius: 22, padding: 20, paddingTop: 22,
      borderWidth: CORES.mode === "dark" ? 1 : 0, borderColor: CORES.BORDER, ...shadow,
    },
    heroRow: { flexDirection: "row", alignItems: "center", gap: 16 },
    avatar: {
      width: 76, height: 76, borderRadius: 38, backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    },
    avatarImg: { width: 76, height: 76 },
    avatarInitial: { color: CORES.ON_ACCENT, fontSize: 32, fontWeight: "900" },
    name: { fontSize: 24, fontWeight: "900", color: CORES.PROFILE_NAVY, lineHeight: 26 },
    subtitle: { fontSize: 14, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 3 },
    levelBadge: {
      alignSelf: "flex-start", backgroundColor: CORES.NAVY_FILL, borderRadius: 999,
      paddingVertical: 4, paddingHorizontal: 12, marginTop: 8,
    },
    levelBadgeText: { color: CORES.ON_ACCENT, fontSize: 12, fontWeight: "800" },
    editBtn: {
      marginTop: 18, borderWidth: 1.5, borderColor: CORES.BORDER_STRONG, borderRadius: 14,
      paddingVertical: 13, flexDirection: "row", alignItems: "center",
      justifyContent: "center", gap: 8,
    },
    editBtnText: { color: CORES.PROFILE_BLUE, fontSize: 15, fontWeight: "800" },

    statsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
    statCard: {
      flex: 1, backgroundColor: CORES.SURFACE, borderRadius: 16, paddingVertical: 14,
      alignItems: "center", borderWidth: CORES.mode === "dark" ? 1 : 0,
      borderColor: CORES.BORDER, ...shadow, shadowOpacity: CORES.mode === "dark" ? 0.28 : 0.05,
    },
    statNum: { fontSize: 20, fontWeight: "900" },
    statLabel: { fontSize: 11, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 2 },

    sectionLabel: {
      marginTop: 22, marginBottom: 10, fontSize: 13, fontWeight: "800",
      color: CORES.PROFILE_MUTED, letterSpacing: 0.6,
    },

    planCard: {
      backgroundColor: CORES.PROFILE_PLAN_BG, borderRadius: 22, padding: 20, overflow: "hidden",
      shadowColor: CORES.SHADOW_STRONG, shadowOffset: { width: 0, height: 10 },
      shadowOpacity: CORES.mode === "dark" ? 0.5 : 0.25, shadowRadius: 24, elevation: 6,
    },
    planBlob: {
      position: "absolute", top: -30, right: -20, width: 120, height: 120,
      borderRadius: 60, backgroundColor: "rgba(110,151,192,0.25)",
    },
    planTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    planTitle: { color: CORES.WHITE, fontSize: 18, fontWeight: "900" },
    planDesc: { color: CORES.PROFILE_PLAN_DESC, fontSize: 14, fontWeight: "600", marginTop: 6, lineHeight: 20 },
    planBtn: {
      marginTop: 16, alignSelf: "flex-start", backgroundColor: CORES.PROFILE_GOLD,
      borderRadius: 13, paddingVertical: 13, paddingHorizontal: 20,
      flexDirection: "row", alignItems: "center", gap: 8,
    },
    planBtnText: { color: CORES.ON_GOLD, fontSize: 15, fontWeight: "900" },

    accountCard: {
      backgroundColor: CORES.SURFACE, borderRadius: 20, overflow: "hidden",
      borderWidth: CORES.mode === "dark" ? 1 : 0, borderColor: CORES.BORDER,
      ...shadow, shadowOpacity: CORES.mode === "dark" ? 0.28 : 0.05,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 15, paddingHorizontal: 18 },
    rowBorder: { borderBottomWidth: 1, borderBottomColor: CORES.PROFILE_BORDER },
    rowIcon: {
      width: 36, height: 36, borderRadius: 10, backgroundColor: CORES.PROFILE_CHIP_BG,
      alignItems: "center", justifyContent: "center",
    },
    rowLabel: { flex: 1, fontSize: 15, fontWeight: "800", color: CORES.PROFILE_NAVY },
    rightPair: { flexDirection: "row", alignItems: "center", gap: 4 },
    rightValue: { fontSize: 14, fontWeight: "700", color: CORES.PROFILE_MUTED_LIGHT },
    activeChip: { backgroundColor: CORES.PROFILE_GREEN_BG, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
    activeChipText: { fontSize: 12, fontWeight: "800", color: CORES.PROFILE_GREEN },
    emailUnder: {
      marginTop: -8, marginBottom: 4, marginLeft: 68, paddingBottom: 12,
      fontSize: 13, fontWeight: "600", color: CORES.PROFILE_MUTED_LIGHT,
      borderBottomWidth: 1, borderBottomColor: CORES.PROFILE_BORDER,
    },

    logoutBtn: {
      marginTop: 14, backgroundColor: CORES.SURFACE, borderRadius: 18, paddingVertical: 16,
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
      borderWidth: CORES.mode === "dark" ? 1 : 0, borderColor: CORES.BORDER,
      ...shadow, shadowOpacity: CORES.mode === "dark" ? 0.28 : 0.05,
    },
    logoutText: { color: CORES.PROFILE_DANGER, fontSize: 15, fontWeight: "800" },

    version: { textAlign: "center", color: CORES.PROFILE_VERSION, fontSize: 12, fontWeight: "700", marginTop: 18 },
  });
};
