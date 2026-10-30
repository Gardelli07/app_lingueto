import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { ExerciseHeader } from "../ExerciseHeader";
import { HeadphonesIcon, SpeakerIcon } from "../icons";
import { colors, fonts } from "../theme";
import { OptionList } from "./ChoiceExercise";

const WAVE = [
  0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.85, 0.55, 0.95, 0.7, 0.45, 0.8, 0.6, 0.35,
  0.7, 0.5, 0.3, 0.45,
];

// Ouvir (Exercise25): escuta a frase em ingles (botao 0.5x para devagar) e
// toca na que ouviu. item: say, options, correctAnswer.
export function ListenExercise({ item, instruction, picked, checked, speaking, onSpeak, onPick }) {
  const ping = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!speaking) {
      ping.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.timing(ping, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [speaking, ping]);

  return (
    <View>
      <ExerciseHeader
        icon={<HeadphonesIcon color={colors.accentSoft} />}
        kicker="LISTEN"
        title={item.title || "What do you hear?"}
        subtitle={
          item.instruction || instruction || "Tap the speaker, then choose the sentence."
        }
      />

      <View style={styles.player}>
        <View>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.ping,
              {
                opacity: ping.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
                transform: [
                  { scale: ping.interpolate({ inputRange: [0, 1], outputRange: [1, 1.45] }) },
                ],
              },
            ]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ouvir a frase"
            onPress={() => onSpeak(false)}
            style={({ pressed }) => [
              styles.speaker,
              pressed && { transform: [{ translateY: 3 }], boxShadow: "none" },
            ]}
          >
            <SpeakerIcon color={colors.text} />
          </Pressable>
        </View>
        <View
          style={styles.wave}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {WAVE.map((height, index) => (
            <WaveBar key={index} height={height} index={index} active={speaking} />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ouvir devagar"
          onPress={() => onSpeak(true)}
          style={styles.slow}
        >
          <Text style={styles.slowText}>0.5×</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 16 }}>
        <OptionList
          options={item.options}
          answer={item.correctAnswer}
          picked={picked}
          checked={checked}
          onPick={onPick}
        />
      </View>
    </View>
  );
}

function WaveBar({ height, index, active }) {
  const value = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!active) {
      value.setValue(1);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(index * 40),
        Animated.timing(value, {
          toValue: 0.35,
          duration: 350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 1,
          duration: 350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, index, value]);
  return (
    <Animated.View
      style={{
        flex: 1,
        minWidth: 3,
        height: Math.round(height * 40),
        borderRadius: 99,
        backgroundColor: active ? colors.accent : "#3a4470",
        transform: [{ scaleY: value }],
      }}
    />
  );
}

const styles = StyleSheet.create({
  player: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    padding: 14,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speaker: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 0 #4552c4",
  },
  ping: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.accent,
  },
  wave: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    overflow: "hidden",
  },
  slow: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.badge,
    borderWidth: 1,
    borderColor: "#2f3854",
    alignItems: "center",
    justifyContent: "center",
  },
  slowText: { fontFamily: fonts.extrabold, fontSize: 13, color: colors.textSoft },
});
