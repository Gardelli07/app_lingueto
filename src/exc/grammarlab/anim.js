import { useEffect, useRef } from "react";
import { Animated } from "react-native";

// Treme para os lados toda vez que `active` vira true.
export function useShake(active) {
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) return;
    x.setValue(0);
    Animated.sequence(
      [-6, 6, -4, 4, 0].map((toValue) =>
        Animated.timing(x, { toValue, duration: 70, useNativeDriver: true }),
      ),
    ).start();
  }, [active, x]);
  return x;
}

// Pulinho de escala toda vez que `active` vira true.
export function useBump(active) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!active) return;
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.05, duration: 120, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }, [active, scale]);
  return scale;
}

// Cresce de 0.6 a 1 ao montar.
export function usePopIn() {
  const scale = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 220,
      useNativeDriver: true,
    }).start();
  }, [scale]);
  return scale;
}
