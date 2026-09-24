import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import {
  fetchNotificacoes,
  marcarNotificacaoLida,
  marcarTodasNotificacoesLidas,
} from "../services/notificacoesFeed";
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

const ICON_POR_TIPO = {
  pedido_amizade: "👋",
  amizade_aceita: "🤝",
  desafio_recebido: "⚔️",
  desafio_aceito: "🔥",
  desafio_recusado: "🙅",
  desafio_vencido: "🏆",
  desafio_perdido: "💪",
  desafio_expirado: "⏱️",
};

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  return `há ${diffD} d`;
}

export default function Notificacoes({ navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const { notificacoes: lista } = await fetchNotificacoes();
      setNotificacoes(lista);
    } catch {
      // mantem a ultima lista boa na tela
    } finally {
      setCarregando(false);
    }
  }, []);

  React.useEffect(() => {
    const sub = navigation.addListener("focus", carregar);
    return sub;
  }, [navigation, carregar]);

  const handleAbrir = async (item) => {
    if (!item.lida) {
      setNotificacoes((atual) => atual.map((n) => (n.id === item.id ? { ...n, lida: true } : n)));
      marcarNotificacaoLida(item.id).catch(() => {});
    }
    if (item.referencia_tipo === "amizade") {
      navigation.navigate("Amigos");
    } else if (item.referencia_tipo === "desafio") {
      navigation.navigate("Desafios");
    }
  };

  const handleMarcarTodas = async () => {
    setNotificacoes((atual) => atual.map((n) => ({ ...n, lida: true })));
    marcarTodasNotificacoesLidas().catch(() => {});
  };

  const temNaoLidas = notificacoes.some((n) => !n.lida);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle={CORES.statusBarStyle} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <IconArrowLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Notificações</Text>
        <Pressable onPress={handleMarcarTodas} hitSlop={10} disabled={!temNaoLidas}>
          <Text style={[styles.markAllText, !temNaoLidas && styles.markAllTextDisabled]}>Marcar tudo</Text>
        </Pressable>
      </View>

      {carregando ? (
        <View style={styles.centered}>
          <ActivityIndicator color={CORES.PROFILE_BLUE} />
        </View>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notificação por aqui ainda.</Text>}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, !item.lida && styles.cardUnread]}
              onPress={() => handleAbrir(item)}
            >
              <Text style={styles.cardIcon}>{ICON_POR_TIPO[item.tipo] || "🔔"}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardBody}>{item.corpo}</Text>
                <Text style={styles.cardTime}>{formatRelativeTime(item.criado_em)}</Text>
              </View>
              {!item.lida && <View style={styles.dot} />}
            </Pressable>
          )}
        />
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
    markAllText: { fontSize: 13, fontWeight: "800", color: CORES.PROFILE_BLUE },
    markAllTextDisabled: { color: CORES.PROFILE_ARROW },

    centered: { flex: 1, alignItems: "center", justifyContent: "center" },
    list: { padding: 16, paddingTop: 4, paddingBottom: 28 },
    emptyText: { color: CORES.PROFILE_MUTED, fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 30 },

    card: {
      flexDirection: "row", alignItems: "flex-start", gap: 12,
      backgroundColor: CORES.SURFACE, borderRadius: 16, padding: 14, marginBottom: 10, ...shadow,
    },
    cardUnread: { backgroundColor: CORES.EX_BLUE_BG },
    cardIcon: { fontSize: 22, marginTop: 2 },
    cardTitle: { fontSize: 14.5, fontWeight: "800", color: CORES.PROFILE_NAVY },
    cardBody: { fontSize: 13, fontWeight: "600", color: CORES.PROFILE_MUTED, marginTop: 2, lineHeight: 18 },
    cardTime: { fontSize: 11.5, fontWeight: "600", color: CORES.PROFILE_MUTED_LIGHT, marginTop: 6 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: CORES.ACCENT_FILL_COMUNIDADE, marginTop: 6 },
  });
};
