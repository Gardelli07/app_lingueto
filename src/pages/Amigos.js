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
import {
  fetchAmigos,
  fetchPedidos,
  aceitarPedidoAmizade,
  recusarPedidoAmizade,
  desfazerAmizade,
} from "../services/amizades";
import { fetchBloqueios, desbloquearUsuario } from "../services/bloqueios";
import { useTheme, useThemedStyles } from "../theme";

const IconArrowLeft = ({ size = 20, color }) => {
  const CORES = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || CORES.PROFILE_NAVY} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Path d="M12 19l-7-7 7-7" />
    </Svg>
  );
};

const TABS = [
  { id: "amigos", label: "Amigos" },
  { id: "recebidos", label: "Recebidos" },
  { id: "enviados", label: "Enviados" },
  { id: "bloqueados", label: "Bloqueados" },
];

function Avatar({ uri, nome }) {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.avatar}>
      {uri ? (
        <Image source={{ uri }} style={styles.avatarImg} />
      ) : (
        <Text style={styles.avatarInitial}>{(nome || "U").charAt(0).toUpperCase()}</Text>
      )}
    </View>
  );
}

export default function Amigos({ navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [tab, setTab] = useState("amigos");
  const [amigos, setAmigos] = useState([]);
  const [recebidos, setRecebidos] = useState([]);
  const [enviados, setEnviados] = useState([]);
  const [bloqueados, setBloqueados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [processandoId, setProcessandoId] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [listaAmigos, listaRecebidos, listaEnviados, listaBloqueados] = await Promise.all([
        fetchAmigos(),
        fetchPedidos("recebidos"),
        fetchPedidos("enviados"),
        fetchBloqueios(),
      ]);
      setAmigos(listaAmigos);
      setRecebidos(listaRecebidos);
      setEnviados(listaEnviados);
      setBloqueados(listaBloqueados);
    } catch {
      // mantem a ultima lista boa na tela, so nao atualiza
    } finally {
      setCarregando(false);
    }
  }, []);

  React.useEffect(() => {
    const sub = navigation.addListener("focus", carregar);
    return sub;
  }, [navigation, carregar]);

  const handleAceitar = async (pedido) => {
    setProcessandoId(pedido.id);
    try {
      await aceitarPedidoAmizade(pedido.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível aceitar o pedido.");
    } finally {
      setProcessandoId(null);
    }
  };

  const handleRecusar = async (pedido) => {
    setProcessandoId(pedido.id);
    try {
      await recusarPedidoAmizade(pedido.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível recusar o pedido.");
    } finally {
      setProcessandoId(null);
    }
  };

  const handleCancelarEnviado = async (pedido) => {
    setProcessandoId(pedido.id);
    try {
      await desfazerAmizade(pedido.usuario.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível cancelar o pedido.");
    } finally {
      setProcessandoId(null);
    }
  };

  const handleDesbloquear = async (bloqueado) => {
    setProcessandoId(bloqueado.id);
    try {
      await desbloquearUsuario(bloqueado.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível desbloquear.");
    } finally {
      setProcessandoId(null);
    }
  };

  const listaAtual =
    tab === "amigos" ? amigos : tab === "recebidos" ? recebidos : tab === "enviados" ? enviados : bloqueados;
  const vazioTexto =
    tab === "amigos"
      ? "Você ainda não tem amigos. Visite o perfil de alguém na comunidade e adicione."
      : tab === "recebidos"
      ? "Nenhum pedido de amizade recebido."
      : tab === "enviados"
      ? "Nenhum pedido de amizade enviado."
      : "Você não bloqueou ninguém.";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <IconArrowLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Amigos</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((item) => {
          const active = item.id === tab;
          const count =
            item.id === "amigos"
              ? amigos.length
              : item.id === "recebidos"
              ? recebidos.length
              : item.id === "enviados"
              ? enviados.length
              : bloqueados.length;
          return (
            <Pressable
              key={item.id}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => setTab(item.id)}
            >
              <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>
                {item.label}{count > 0 ? ` (${count})` : ""}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {carregando ? (
        <View style={styles.centered}>
          <ActivityIndicator color={CORES.PROFILE_BLUE} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {listaAtual.length === 0 && (
            <Text style={styles.emptyText}>{vazioTexto}</Text>
          )}

          {tab === "amigos" &&
            amigos.map((amigo) => (
              <Pressable
                key={amigo.id}
                style={styles.card}
                onPress={() => navigation.navigate("PerfilVisitado", { usuarioId: amigo.id })}
              >
                <Avatar uri={amigo.foto_url ? `${API_URL}${amigo.foto_url}` : null} nome={amigo.nome} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{amigo.nome}</Text>
                  <Text style={styles.meta}>{amigo.xp_total} XP</Text>
                </View>
              </Pressable>
            ))}

          {tab === "recebidos" &&
            recebidos.map((pedido) => (
              <View key={pedido.id} style={styles.card}>
                <Avatar uri={pedido.usuario.foto_url ? `${API_URL}${pedido.usuario.foto_url}` : null} nome={pedido.usuario.nome} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{pedido.usuario.nome}</Text>
                  <Text style={styles.meta}>{pedido.usuario.xp_total} XP</Text>
                </View>
                {processandoId === pedido.id ? (
                  <ActivityIndicator color={CORES.PROFILE_BLUE} />
                ) : (
                  <View style={styles.pedidoActions}>
                    <Pressable style={styles.acceptBtn} onPress={() => handleAceitar(pedido)}>
                      <Text style={styles.acceptBtnText}>Aceitar</Text>
                    </Pressable>
                    <Pressable style={styles.declineBtn} onPress={() => handleRecusar(pedido)}>
                      <Text style={styles.declineBtnText}>Recusar</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}

          {tab === "enviados" &&
            enviados.map((pedido) => (
              <View key={pedido.id} style={styles.card}>
                <Avatar uri={pedido.usuario.foto_url ? `${API_URL}${pedido.usuario.foto_url}` : null} nome={pedido.usuario.nome} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{pedido.usuario.nome}</Text>
                  <Text style={styles.meta}>Pedido enviado</Text>
                </View>
                {processandoId === pedido.id ? (
                  <ActivityIndicator color={CORES.PROFILE_BLUE} />
                ) : (
                  <Pressable style={styles.declineBtn} onPress={() => handleCancelarEnviado(pedido)}>
                    <Text style={styles.declineBtnText}>Cancelar</Text>
                  </Pressable>
                )}
              </View>
            ))}

          {tab === "bloqueados" &&
            bloqueados.map((bloqueado) => (
              <View key={bloqueado.id} style={styles.card}>
                <Avatar uri={bloqueado.foto_url ? `${API_URL}${bloqueado.foto_url}` : null} nome={bloqueado.nome} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{bloqueado.nome}</Text>
                  <Text style={styles.meta}>Bloqueado</Text>
                </View>
                {processandoId === bloqueado.id ? (
                  <ActivityIndicator color={CORES.PROFILE_BLUE} />
                ) : (
                  <Pressable style={styles.declineBtn} onPress={() => handleDesbloquear(bloqueado)}>
                    <Text style={styles.unblockText}>Desbloquear</Text>
                  </Pressable>
                )}
              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (CORES) => {
  const shadow = {
    shadowColor: CORES.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: CORES.mode === "dark" ? 0.28 : 0.05,
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

    tabsRow: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginBottom: 8 },
    tabBtn: { flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: "center", backgroundColor: CORES.SURFACE },
    tabBtnActive: { backgroundColor: CORES.NAVY_FILL },
    tabBtnText: { fontSize: 12.5, fontWeight: "800", color: CORES.PROFILE_MUTED },
    tabBtnTextActive: { color: CORES.ON_ACCENT },

    centered: { flex: 1, alignItems: "center", justifyContent: "center" },
    scroll: { padding: 16, paddingTop: 8, paddingBottom: 28, gap: 10 },
    emptyText: { color: CORES.PROFILE_MUTED, fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 30 },

    card: {
      flexDirection: "row", alignItems: "center", gap: 12,
      backgroundColor: CORES.SURFACE, borderRadius: 16, padding: 14, marginBottom: 10, ...shadow,
    },
    avatar: {
      width: 48, height: 48, borderRadius: 24, backgroundColor: CORES.ACCENT_FILL,
      alignItems: "center", justifyContent: "center", overflow: "hidden",
    },
    avatarImg: { width: 48, height: 48 },
    avatarInitial: { color: CORES.ON_ACCENT, fontSize: 18, fontWeight: "900" },
    nome: { fontSize: 15, fontWeight: "800", color: CORES.PROFILE_NAVY },
    meta: { fontSize: 12.5, fontWeight: "600", color: CORES.PROFILE_MUTED, marginTop: 2 },

    pedidoActions: { flexDirection: "row", gap: 8 },
    acceptBtn: { backgroundColor: CORES.ACCENT_FILL, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
    acceptBtnText: { color: CORES.ON_ACCENT, fontSize: 12.5, fontWeight: "800" },
    declineBtn: { backgroundColor: CORES.PROFILE_CHIP_BG, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
    declineBtnText: { color: CORES.PROFILE_MUTED, fontSize: 12.5, fontWeight: "800" },
    unblockText: { color: CORES.PROFILE_DANGER, fontSize: 12.5, fontWeight: "800" },
  });
};
