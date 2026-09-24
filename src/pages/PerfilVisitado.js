import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { API_URL } from "../services/api";
import { fetchPerfilPublico } from "../services/usuarios";
import { enviarPedidoAmizade, aceitarPedidoAmizade, desfazerAmizade } from "../services/amizades";
import { bloquearUsuario, desbloquearUsuario } from "../services/bloqueios";
import { denunciarUsuario } from "../services/denuncias";
import { getLevelProgress } from "../util/xp";
import { useTheme, useThemedStyles } from "../theme";
import ReportSheet from "../components/ReportSheet";

const IconArrowLeft = ({ size = 20, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_NAVY} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Path d="M12 19l-7-7 7-7" />
    </Svg>
  );
};

const IconUserPlus = ({ size = 17, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path d="M19 8v6M22 11h-6" />
  </Svg>
);

const IconCheck = ({ size = 17, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

const IconFlag = ({ size = 18, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_NAVY} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <Path d="M4 22V15" />
    </Svg>
  );
};

const IconSwords = ({ size = 17, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_NAVY} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <Path d="M13 19l6-6" />
      <Path d="M16 16l4 4" />
      <Path d="M19 21l2-2" />
      <Path d="M21.5 5.5L18 9M18 9l-2.5-2.5L19 3h3v3l-2 2" />
    </Svg>
  );
};

const IconUserX = ({ size = 17, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M13 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path d="M17 8.5l5 5M22 8.5l-5 5" />
  </Svg>
);

export default function PerfilVisitado({ route, navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const usuarioId = route?.params?.usuarioId;
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [processandoAcao, setProcessandoAcao] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportSending, setReportSending] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(false);
    try {
      const dados = await fetchPerfilPublico(usuarioId);
      setPerfil(dados);
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

  React.useEffect(() => {
    carregar();
  }, [carregar]);

  const handleAcaoAmizade = async () => {
    if (!perfil || processandoAcao) return;
    setProcessandoAcao(true);
    try {
      if (perfil.relacao === "nenhuma") {
        await enviarPedidoAmizade(perfil.id);
      } else if (perfil.relacao === "pendente_enviado") {
        await desfazerAmizade(perfil.id);
      } else if (perfil.relacao === "pendente_recebido") {
        await aceitarPedidoAmizade(perfil.pedido_id);
      }
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível completar a ação. Tente novamente.");
    } finally {
      setProcessandoAcao(false);
    }
  };

  const handleBloquear = () => {
    if (!perfil) return;
    Alert.alert(
      "Bloquear usuário",
      `Bloquear ${displayName} desfaz a amizade (se houver) e cancela desafios em andamento entre vocês. Vocês não vão mais se ver na comunidade. Deseja continuar?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Bloquear",
          style: "destructive",
          onPress: async () => {
            setProcessandoAcao(true);
            try {
              await bloquearUsuario(perfil.id);
              await carregar();
            } catch (error) {
              Alert.alert("Erro", error.message || "Não foi possível bloquear. Tente novamente.");
            } finally {
              setProcessandoAcao(false);
            }
          },
        },
      ]
    );
  };

  const handleDesbloquear = async () => {
    if (!perfil || processandoAcao) return;
    setProcessandoAcao(true);
    try {
      await desbloquearUsuario(perfil.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível desbloquear. Tente novamente.");
    } finally {
      setProcessandoAcao(false);
    }
  };

  const handleSubmitReport = async (motivo, descricao) => {
    if (!perfil) return;
    setReportSending(true);
    try {
      await denunciarUsuario(perfil.id, motivo, descricao);
      setReportVisible(false);
      Alert.alert("Denúncia enviada", "Nossa equipe vai analisar em breve.");
    } catch (error) {
      if (error?.status === 409) {
        Alert.alert("Já denunciado", "Você já denunciou esse usuário.");
      } else {
        Alert.alert("Erro", error.message || "Não foi possível enviar sua denúncia. Tente novamente.");
      }
    } finally {
      setReportSending(false);
    }
  };

  const displayName = perfil?.nome_exibicao?.trim() || "Usuário";
  const avatarUri = perfil?.foto_url ? `${API_URL}${perfil.foto_url}` : null;
  const levelProgress = getLevelProgress(perfil?.xp_total || 0);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <IconArrowLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Perfil</Text>
        {perfil ? (
          <Pressable onPress={() => setReportVisible(true)} hitSlop={10} style={styles.backBtn}>
            <IconFlag />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
      </View>

      {carregando ? (
        <View style={styles.centered}>
          <ActivityIndicator color={CORES.PROFILE_BLUE} />
        </View>
      ) : erro || !perfil ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Não foi possível carregar esse perfil.</Text>
          <Pressable style={styles.retryBtn} onPress={carregar}>
            <Text style={styles.retryText}>Tentar de novo</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>Nível {levelProgress.currentLevel}</Text>
                </View>
              </View>
            </View>

            {perfil.relacao !== "voce_mesmo" && (
              <View style={styles.actionsRow}>
                {perfil.bloqueado_por_mim ? (
                  <Pressable style={[styles.actionBtn, styles.unblockBtn]} onPress={handleDesbloquear} disabled={processandoAcao}>
                    {processandoAcao ? <ActivityIndicator color={CORES.ON_ACCENT} /> : (
                      <>
                        <IconUserX />
                        <Text style={styles.unblockBtnText}>Desbloquear</Text>
                      </>
                    )}
                  </Pressable>
                ) : (
                  <>
                    {!perfil.bloqueou_voce && (
                      <>
                        {perfil.relacao === "nenhuma" && (
                          <Pressable style={[styles.actionBtn, styles.primaryBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                            {processandoAcao ? <ActivityIndicator color={CORES.ON_ACCENT} /> : (
                              <>
                                <IconUserPlus />
                                <Text style={styles.primaryBtnText}>Adicionar amigo</Text>
                              </>
                            )}
                          </Pressable>
                        )}
                        {perfil.relacao === "pendente_enviado" && (
                          <Pressable style={[styles.actionBtn, styles.mutedBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                            {processandoAcao ? <ActivityIndicator color={CORES.PROFILE_MUTED} /> : (
                              <Text style={styles.mutedBtnText}>Pedido enviado · cancelar</Text>
                            )}
                          </Pressable>
                        )}
                        {perfil.relacao === "pendente_recebido" && (
                          <Pressable style={[styles.actionBtn, styles.primaryBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                            {processandoAcao ? <ActivityIndicator color={CORES.ON_ACCENT} /> : (
                              <>
                                <IconCheck />
                                <Text style={styles.primaryBtnText}>Aceitar pedido</Text>
                              </>
                            )}
                          </Pressable>
                        )}
                        {perfil.relacao === "amigos" && (
                          <View style={[styles.actionBtn, styles.friendsChip]}>
                            <IconCheck color={CORES.PROFILE_GREEN} />
                            <Text style={styles.friendsChipText}>Amigos</Text>
                          </View>
                        )}
                        {perfil.relacao === "amigos" && !perfil.tem_desafio_com_usuario && (
                          <Pressable
                            style={[styles.actionBtn, styles.challengeBtn]}
                            onPress={() => navigation.navigate("Desafios", { amigoId: perfil.id })}
                          >
                            <IconSwords color={CORES.ON_GOLD} />
                            <Text style={styles.challengeBtnText}>Desafiar</Text>
                          </Pressable>
                        )}
                      </>
                    )}
                    <Pressable style={[styles.actionBtn, styles.blockBtn]} onPress={handleBloquear} disabled={processandoAcao}>
                      {processandoAcao ? <ActivityIndicator color={CORES.PROFILE_DANGER} /> : (
                        <>
                          <IconUserX size={17} color={CORES.PROFILE_DANGER} />
                          <Text style={styles.blockBtnText}>Bloquear</Text>
                        </>
                      )}
                    </Pressable>
                  </>
                )}
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{perfil.xp_total}</Text>
              <Text style={styles.statLabel}>XP total</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{levelProgress.currentLevel}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_AMBER }]}>{perfil.streak_atual} 🔥</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{perfil.desafios_total}</Text>
              <Text style={styles.statLabel}>Desafios</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GOLD }]}>{perfil.desafios_vitorias}</Text>
              <Text style={styles.statLabel}>Vitórias</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{perfil.desafios_percentual_vitorias}%</Text>
              <Text style={styles.statLabel}>Aproveitamento</Text>
            </View>
          </View>
        </ScrollView>
      )}

      <ReportSheet
        visible={reportVisible}
        sending={reportSending}
        onClose={() => !reportSending && setReportVisible(false)}
        onSubmit={handleSubmitReport}
      />
    </SafeAreaView>
  );
}

const makeStyles = (CORES) => {
  const shadow = {
    shadowColor: CORES.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: CORES.mode === "dark" ? 0.3 : 0.07,
    shadowRadius: 14,
    elevation: 3,
  };

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
    headerTitle: { fontSize: 16, fontWeight: "800", color: CORES.PROFILE_NAVY },

    centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 14 },
    errorText: { color: CORES.PROFILE_MUTED, fontSize: 14, fontWeight: "600", textAlign: "center" },
    retryBtn: { backgroundColor: CORES.ACCENT_FILL, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20 },
    retryText: { color: CORES.ON_ACCENT, fontWeight: "800" },

    scroll: { padding: 16, paddingTop: 4, paddingBottom: 28 },

    heroCard: { backgroundColor: CORES.SURFACE, borderRadius: 22, padding: 20, ...shadow },
    heroRow: { flexDirection: "row", alignItems: "center", gap: 16 },
    avatar: {
      width: 76, height: 76, borderRadius: 38, backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    },
    avatarImg: { width: 76, height: 76 },
    avatarInitial: { color: CORES.ON_ACCENT, fontSize: 32, fontWeight: "900" },
    name: { fontSize: 22, fontWeight: "900", color: CORES.PROFILE_NAVY, lineHeight: 25 },
    levelBadge: {
      alignSelf: "flex-start", backgroundColor: CORES.NAVY_FILL, borderRadius: 999,
      paddingVertical: 4, paddingHorizontal: 12, marginTop: 8,
    },
    levelBadgeText: { color: CORES.ON_ACCENT, fontSize: 12, fontWeight: "800" },

    actionsRow: { flexDirection: "row", gap: 10, marginTop: 18, flexWrap: "wrap" },
    actionBtn: {
      flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
      borderRadius: 14, paddingVertical: 13, paddingHorizontal: 16, minHeight: 46,
    },
    primaryBtn: { backgroundColor: CORES.ACCENT_FILL, flex: 1 },
    primaryBtnText: { color: CORES.ON_ACCENT, fontSize: 14.5, fontWeight: "800" },
    mutedBtn: { backgroundColor: CORES.PROFILE_CHIP_BG, flex: 1 },
    mutedBtnText: { color: CORES.PROFILE_MUTED, fontSize: 14.5, fontWeight: "800" },
    friendsChip: { backgroundColor: CORES.PROFILE_GREEN_BG, flex: 1 },
    friendsChipText: { color: CORES.PROFILE_GREEN, fontSize: 14.5, fontWeight: "800" },
    challengeBtn: { backgroundColor: CORES.PROFILE_GOLD, flex: 1 },
    challengeBtnText: { color: CORES.ON_GOLD, fontSize: 14.5, fontWeight: "800" },
    unblockBtn: { backgroundColor: CORES.DANGER_FILL, flex: 1 },
    unblockBtnText: { color: CORES.ON_ACCENT, fontSize: 14.5, fontWeight: "800" },
    blockBtn: { backgroundColor: CORES.SURFACE, borderWidth: 1.5, borderColor: CORES.PROFILE_DANGER, flex: 1 },
    blockBtnText: { color: CORES.PROFILE_DANGER, fontSize: 14.5, fontWeight: "800" },

    statsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
    statCard: {
      flex: 1, backgroundColor: CORES.SURFACE, borderRadius: 16, paddingVertical: 14,
      alignItems: "center", ...shadow, shadowOpacity: CORES.mode === "dark" ? 0.28 : 0.05,
    },
    statNum: { fontSize: 20, fontWeight: "900" },
    statLabel: { fontSize: 11, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 2 },
  });
};
