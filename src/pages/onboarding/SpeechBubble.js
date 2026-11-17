import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Svg, { Polygon, Polyline } from "react-native-svg";
import { useTheme, useThemedStyles } from "../../theme";

// Balao de fala com a ponta embaixo apontando para o Lingo.
// Ele "pula" toda vez que monta — de uma `key` por passo para repetir a animacao.
// tailRight = distancia da ponta ate a borda direita (alinhar com o mascote).
export default function SpeechBubble({ children, tailRight = 104, style }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(350),
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }),
    ]).start();
  }, [pop]);

  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  const opacity = pop.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] });

  return (
    <Animated.View style={[styles.bubble, style, { opacity, transform: [{ scale }] }]}>
      {children}
      <View pointerEvents="none" style={[styles.tail, { right: tailRight }]}>
        <Svg width={36} height={26} viewBox="0 0 36 26">
          <Polygon points="0,0 36,0 28,25" fill={CORES.ONBOARDING_BUBBLE} />
          <Polyline
            points="0.5,1.5 28,24.5 35.5,1.5"
            fill="none"
            stroke={CORES.ONBOARDING_BUBBLE_BORDER}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </Animated.View>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    bubble: {
      width: "100%",
      backgroundColor: CORES.ONBOARDING_BUBBLE,
      borderColor: CORES.ONBOARDING_BUBBLE_BORDER,
      borderWidth: 1.5,
      borderRadius: 20,
      paddingTop: 22,
      paddingHorizontal: 22,
      paddingBottom: 24,
    },
    tail: {
      position: "absolute",
      bottom: -24.5,
    },
  });
