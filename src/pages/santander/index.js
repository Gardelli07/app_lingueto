import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useThemedStyles } from "../../theme";
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  Defs,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeSantander() {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { user } = useAuth();

  const nomeUsuario = user?.login || "Usuário";
  const isAdmin = user?.tipo === "admin";

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.area}>Área Santander</Text>
          <Text style={styles.hello}>Hello, {nomeUsuario}!</Text>
        </View>

        {/* BOTÃO — SOMENTE ADMIN */}
        {isAdmin && (
          <TouchableOpacity style={styles.exportButton} activeOpacity={0.85}>
            <DownloadIcon />
            <Text style={styles.exportText}>Exportar Relatório</Text>
          </TouchableOpacity>
        )}

        {/* TÍTULO */}
        <Text style={styles.sectionTitle}>Cursos Disponíveis</Text>

        {/* LISTA */}
        <CourseItem
          title="CRM"
          subtitle="Gestão de relacionamento"
          colors={["#4f46e5", "#7c3aed"]}
          icon={CrmIcon}
          route="HomeCRM"
        />

        <CourseItem
          title="Investment"
          subtitle="Estratégias de investimento"
          colors={["#059669", "#10b981"]}
          icon={InvestmentIcon}
          route="HomeInvestment"
        />

        <CourseItem
          title="Back Office"
          subtitle="Operações administrativas"
          colors={["#f59e0b", "#eab308"]}
          icon={BackOfficeIcon}
          route="HomeBackOffice"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= CARD ================= */

function CourseItem({ title, subtitle, colors, icon, route }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate(route)}
    >
      <Svg width={48} height={48} viewBox="0 0 48 48">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[1]} />
          </LinearGradient>
        </Defs>

        <Rect width="48" height="48" rx="12" fill="url(#grad)" />
        <G transform="translate(12 12)">{icon}</G>
      </Svg>

      <View style={styles.itemText}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>

      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Polyline
          points="9 18 15 12 9 6"
          fill="none"
          stroke={CORES.SANT_FAINT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

/* ================= SVG ICONS ================= */

function DownloadIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M12 15V3"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="m7 10 5 5 5-5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const CrmIcon = (
  <>
    <Path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" fill="none" />
    <Path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </>
);

const InvestmentIcon = (
  <>
    <Line x1="12" y1="1" x2="12" y2="23" stroke="white" strokeWidth="2" />
    <Path
      d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </>
);

const BackOfficeIcon = (
  <>
    <Rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      ry="2"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <Line x1="8" y1="21" x2="16" y2="21" stroke="white" strokeWidth="2" />
    <Line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2" />
  </>
);

/* ================= ESTILOS ================= */

const makeStyles = (CORES) => {
  const BG = CORES.SANT_BG;
  const CARD = CORES.SURFACE;
  const TEXT = CORES.TEXT;
  const MUTED = CORES.TEXT_MUTED;
  const BORDER = CORES.SANT_BORDER;
  const SANTANDER_RED = CORES.SANT_RED;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG,
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

    exportButton: {
      marginHorizontal: 20,
      backgroundColor: SANTANDER_RED,
      borderRadius: 14,
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 26,
      elevation: 5,
    },

    exportText: {
      color: CORES.ON_ACCENT,
      fontSize: 16,
      fontWeight: "700",
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: TEXT,
      marginHorizontal: 20,
      marginBottom: 12,
    },

    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: CARD,
      borderRadius: 16,
      padding: 14,
      marginHorizontal: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: BORDER,
    },

    itemText: {
      flex: 1,
      marginLeft: 14,
    },

    itemTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: CORES.SANT_INK,
    },

    itemSubtitle: {
      fontSize: 13,
      color: CORES.SANT_FAINT,
      marginTop: 2,
    },
  });
};
