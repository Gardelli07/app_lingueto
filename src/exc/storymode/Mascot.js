import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const MASCOT = {
  happy: require("../../../assets/StoryMode/mascot-happy.png"),
  wrong: require("../../../assets/StoryMode/mascot-wrong.png"),
};

// O recorte do mascote e ~343x420.
const RATIO = 420 / 343;

// Adesivo do mascote: aparece com um "pop" e balanca duas vezes. Espelhado
// por padrao para olhar para o texto.
export default function Mascot({ mood = "happy", width = 68, flip = true, style }) {
  const pop = useRef(new Animated.Value(0)).current;
  const wig = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pop.setValue(0);
    wig.setValue(0);
    Animated.sequence([
      Animated.delay(150),
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, friction: 5, tension: 120 }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(wig, { toValue: 1, duration: 275, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(wig, { toValue: -1, duration: 550, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(wig, { toValue: 0, duration: 275, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ]),
        { iterations: 2 },
      ),
    ]).start();
  }, [mood, pop, wig]);

  const rotate = Animated.add(
    pop.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }),
    wig.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }),
  ).interpolate({ inputRange: [-30, 30], outputRange: ["-30deg", "30deg"] });

  return (
    <View style={[{ transform: [{ scaleX: flip ? -1 : 1 }] }, style]} pointerEvents="none">
      <Animated.Image
        source={MASCOT[mood]}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        accessible
        accessibilityLabel={mood === "wrong" ? "Mascote de cara feia" : "Mascote comemorando"}
        style={{
          width,
          height: width * RATIO,
          opacity: pop.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
          transform: [
            { scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
            { rotate },
          ],
        }}
      />
    </View>
  );
}
