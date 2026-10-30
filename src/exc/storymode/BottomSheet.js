import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C } from "./theme";

/*
  Painel que sobe preso ao rodape.
  - `backdrop`: escurece a tela e fecha ao tocar fora (chama onClose)
  - `overlay`: elemento desenhado acima da borda do painel (ex.: o mascote)
*/
export default function BottomSheet({
  children,
  backdrop = false,
  onClose,
  overlay,
  handleColor = C.radio,
  backgroundColor = C.card,
  borderColor = C.border,
  accessibilityLabel,
}) {
  const insets = useSafeAreaInsets();
  const y = useRef(new Animated.Value(500)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(y, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
        mass: 0.9,
      }),
      Animated.timing(fade, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [y, fade]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {backdrop && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fade }]}>
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
          />
        </Animated.View>
      )}
      <Animated.View
        accessibilityViewIsModal={backdrop}
        accessibilityLabel={accessibilityLabel}
        style={[
          styles.sheet,
          {
            backgroundColor,
            borderColor,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
            transform: [{ translateY: y }],
          },
        ]}
      >
        {overlay}
        <View style={[styles.handle, { backgroundColor: handleColor }]} />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(5,8,18,0.5)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
    gap: 18,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -12 },
    elevation: 24,
  },
  handle: { width: 40, height: 5, borderRadius: 3, alignSelf: "center" },
});
