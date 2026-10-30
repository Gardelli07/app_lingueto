import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

// Borda colorida em volta da tela: pisca ao responder e fica enquanto o
// feedback aparece. pattern: correct | wrong
export function ScreenEdge({ color, glow, pattern }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const steps =
      pattern === "correct"
        ? [
            [1, 225],
            [0.6, 270],
            [1, 180],
            [0.85, 225],
          ]
        : [
            [1, 120],
            [0.75, 480],
          ];
    Animated.sequence(
      steps.map(([toValue, duration]) =>
        Animated.timing(opacity, { toValue, duration, useNativeDriver: true }),
      ),
    ).start();
  }, [opacity, pattern]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          opacity,
          borderWidth: 5,
          borderColor: color,
          boxShadow: `inset 0 0 36px 6px ${glow}`,
          zIndex: 6,
        },
      ]}
    />
  );
}
