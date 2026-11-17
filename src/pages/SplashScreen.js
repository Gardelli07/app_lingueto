import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
import * as NativeSplash from "expo-splash-screen";
import { useAuth } from "../context/AuthContext";
import { syncCourseProgressFromServer } from "../util/courseCatalog";
import { syncAulasPlusProgressFromServer } from "./aulas/aulasplus/progress";

// Splash animada (versao escura). A splash nativa (app.json + android/res)
// usa o mesmo fundo e o mesmo tile do logo, centralizado na tela; esta tela
// comeca com o logo nessa mesma posicao e o desliza ate o lugar do layout,
// entao a troca nativa -> JS nao aparece.

const COLORS = {
  background: "#0B1226",
  white: "#FFFFFF",
  muted: "#9FB4D9",
  blue: "#2F80FF",
  accent: "#6FC3FF",
  track: "rgba(255,255,255,0.12)",
};

const LOGO_TILE = 140;
const GLOW_SIZE = 420;
const BAR_WIDTH = 168;
const BAR_FILL = BAR_WIDTH * 0.4;

const TAGLINE = "Study today, speak tomorrow";
const LOADING_TEXT = "Carregando…";

// Tempo minimo na tela, contado a partir do inicio da animacao.
const MIN_DURATION_MS = 1500;
// Rede de seguranca: se o layout nao for medido, solta a splash nativa assim mesmo.
const FALLBACK_START_MS = 3000;

export default function SplashScreen({ navigation }) {
  const { user, carregando } = useAuth();

  // Entrada
  const logoShift = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(1)).current;
  const glowIn = useRef(new Animated.Value(0)).current;
  const titleIn = useRef(new Animated.Value(0)).current;
  const taglineIn = useRef(new Animated.Value(0)).current;
  const loaderIn = useRef(new Animated.Value(0)).current;
  // Loops
  const glow = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;

  const layout = useRef({ height: null, centerY: null });
  const started = useRef(false);
  const introDone = useRef(null);
  if (!introDone.current) {
    let resolve;
    const promise = new Promise((r) => {
      resolve = r;
    });
    introDone.current = { promise, resolve };
  }

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;

    // Espera um frame para o logo ja estar desenhado na posicao da nativa.
    requestAnimationFrame(() => {
      NativeSplash.hideAsync().catch(() => {});

      // Logo: desliza do centro da tela ate o lugar do layout, com um leve pulo
      Animated.parallel([
        Animated.timing(logoShift, {
          toValue: 0,
          duration: 700,
          delay: 120,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(120),
          Animated.timing(logoScale, {
            toValue: 1.06,
            duration: 380,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1,
            duration: 280,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(glowIn, {
          toValue: 1,
          duration: 700,
          delay: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();

      // Nome, tagline e barra sobem em sequencia
      const rise = (v, delay) =>
        Animated.timing(v, {
          toValue: 1,
          duration: 600,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        });
      Animated.parallel([
        rise(titleIn, 450),
        rise(taglineIn, 600),
        rise(loaderIn, 750),
      ]).start();

      setTimeout(introDone.current.resolve, MIN_DURATION_MS);
    });
  }, [logoShift, logoScale, glowIn, titleIn, taglineIn, loaderIn]);

  const tryStart = useCallback(() => {
    const { height, centerY } = layout.current;
    if (started.current || height == null || centerY == null) return;
    // Centro da tela (onde a splash nativa desenha o logo) - centro do logo no layout
    logoShift.setValue(height / 2 - (centerY + LOGO_TILE / 2));
    start();
  }, [logoShift, start]);

  // Loops (brilho pulsando e barra indeterminada) + rede de seguranca
  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const barLoop = Animated.loop(
      Animated.timing(bar, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
    );
    glowLoop.start();
    barLoop.start();
    const fallback = setTimeout(start, FALLBACK_START_MS);
    return () => {
      glowLoop.stop();
      barLoop.stop();
      clearTimeout(fallback);
    };
  }, [glow, bar, start]);

  // Navegacao: espera a animacao minima, o login e o sync do progresso
  useEffect(() => {
    if (carregando) return;

    let cancelled = false;
    // Espera o progresso salvo no backend chegar antes de navegar (com um
    // teto de tempo) para as telas de curso ja abrirem com os dados certos.
    const progressSync = user
      ? Promise.race([
          Promise.all([
            syncCourseProgressFromServer(),
            syncAulasPlusProgressFromServer(),
          ]).catch(() => {}),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ])
      : Promise.resolve();

    Promise.all([introDone.current.promise, progressSync]).then(() => {
      if (cancelled) return;
      if (!user) {
        navigation.replace("Login");
      } else if (!user.teste_nivelamento_concluido) {
        navigation.replace("Onboarding");
      } else {
        navigation.replace("Tabs");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [navigation, carregando, user]);

  const riseStyle = (v) => ({
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
  });

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        layout.current.height = e.nativeEvent.layout.height;
        tryStart();
      }}
    >
      <StatusBar style="light" />

      <View style={styles.topSpacer} />

      <View
        style={styles.center}
        onLayout={(e) => {
          layout.current.centerY = e.nativeEvent.layout.y;
          tryStart();
        }}
      >
        <Animated.View
          style={[
            styles.logoWrap,
            { transform: [{ translateY: logoShift }, { scale: logoScale }] },
          ]}
        >
          {/* Brilho azul suave atras do logo */}
          <Animated.View pointerEvents="none" style={[styles.glow, { opacity: glowIn }]}>
            <Animated.View
              style={{
                opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.7] }),
                transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) }],
              }}
            >
              <Svg width={GLOW_SIZE} height={GLOW_SIZE}>
                <Defs>
                  <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <Stop offset="0" stopColor="#2F80FF" stopOpacity={0.1} />
                    <Stop offset="0.64" stopColor="#2F80FF" stopOpacity={0.03} />
                    <Stop offset="1" stopColor="#0B1226" stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Circle cx={GLOW_SIZE / 2} cy={GLOW_SIZE / 2} r={GLOW_SIZE / 2} fill="url(#glow)" />
              </Svg>
            </Animated.View>
          </Animated.View>

          <View style={styles.logoTile}>
            <Image
              source={require("../../assets/lingueto-logo.png")}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Lingueto logo"
            />
          </View>
        </Animated.View>

        {/* A animacao de subida fica no wrapper para nao sobrescrever o skew do titulo */}
        <Animated.View style={riseStyle(titleIn)}>
          <Text accessibilityRole="header" style={styles.title}>
            Lingueto
          </Text>
        </Animated.View>
        <Animated.Text style={[styles.tagline, riseStyle(taglineIn)]}>
          {TAGLINE}
        </Animated.Text>
      </View>

      <Animated.View
        style={[styles.loader, riseStyle(loaderIn)]}
        accessibilityRole="progressbar"
        accessibilityLabel={LOADING_TEXT}
      >
        <View style={styles.track}>
          <Animated.View
            style={{
              width: BAR_FILL,
              height: 6,
              transform: [
                {
                  translateX: bar.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-BAR_FILL, BAR_FILL * 2.5],
                  }),
                },
              ],
            }}
          >
            <LinearGradient
              colors={[COLORS.blue, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.fill}
            />
          </Animated.View>
        </View>
        <Text style={styles.loadingText}>{LOADING_TEXT}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingBottom: 56,
  },
  topSpacer: { height: 120 },
  center: { alignItems: "center" },
  logoWrap: {
    width: LOGO_TILE,
    height: LOGO_TILE,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  glow: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    left: (LOGO_TILE - GLOW_SIZE) / 2,
    top: (LOGO_TILE - GLOW_SIZE) / 2,
  },
  logoTile: {
    width: LOGO_TILE,
    height: LOGO_TILE,
    borderRadius: 38,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: { width: 112, height: 112 },
  title: {
    marginTop: 28,
    fontSize: 46,
    lineHeight: 56,
    color: COLORS.white,
    letterSpacing: -0.5,
    fontFamily: "Poppins_700Bold",
    // sem corte italico: o skew da o mesmo visual inclinado no iOS e no Android
    transform: [{ skewX: "-8deg" }],
  },
  tagline: {
    marginTop: 18,
    fontSize: 17,
    color: COLORS.muted,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  loader: { alignItems: "center" },
  track: {
    width: BAR_WIDTH,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.track,
    overflow: "hidden",
  },
  fill: { flex: 1, borderRadius: 999 },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: "Poppins_500Medium",
  },
});
