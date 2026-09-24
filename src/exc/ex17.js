import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function getImageSource(item) {
  if (typeof item === "number") {
    return item;
  }

  if (!item || typeof item !== "object") {
    return null;
  }

  if (item.image) {
    return item.image;
  }

  if (item.source) {
    return item.source;
  }

  if (item.uri) {
    return item;
  }

  return null;
}

function normalizeContentBlocks(content) {
  const blocks = [];

  const appendText = (value) => {
    String(value || "")
      .split("\n")
      .forEach((line) => {
        blocks.push({
          type: "text",
          text: line,
        });
      });
  };

  if (!Array.isArray(content)) {
    appendText(content);
    return blocks;
  }

  content.forEach((item) => {
    const imageSource = getImageSource(item);

    if (imageSource) {
      blocks.push({
        type: "image",
        source: imageSource,
      });
      return;
    }

    appendText(item);
  });

  return blocks;
}

function renderMarkedText(text, styles) {
  const parts = [];
  const pattern = /\/blue\{([^}]+)\}|\/blue(\S+)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        isBlue: false,
      });
    }

    parts.push({
      text: match[1] || match[2],
      isBlue: true,
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      isBlue: false,
    });
  }

  return parts.map((part, index) => (
    <Text
      key={`${part.text}-${index}`}
      style={part.isBlue ? styles.tipVisualBlueText : null}
    >
      {part.text}
    </Text>
  ));
}

export function Exercise17({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const hasCompletedRef = useRef(false);
  const contentBlocks = normalizeContentBlocks(activity.content);

  const handleContinue = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onAttempt?.({
        isCorrect: true,
        correctDelta: 0,
        totalDelta: 0,
        exerciseAccuracy: 100,
      });
    }

    next();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.tipVisualBlock}>
        <Text style={styles.tipVisualLabel}>{activity.label}</Text>

        <View style={styles.tipVisualCard}>
          {contentBlocks.map((block, index) => {
            if (block.type === "image") {
              return (
                <View key={`image-${index}`} style={styles.tipVisualImageLine}>
                  <Image
                    source={block.source}
                    style={styles.tipVisualImage}
                    resizeMode="contain"
                  />
                </View>
              );
            }

            return (
              <Text
                key={`${block.text}-${index}`}
                style={[
                  styles.tipVisualContentLine,
                  block.text.trim() === "" && styles.tipVisualBlankLine,
                ]}
              >
                {renderMarkedText(block.text, styles)}
              </Text>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.tipVisualContinueButton}
          onPress={handleContinue}
        >
          <Text style={styles.tipVisualContinueButtonText}>
            {activity.continueLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ex17 = (CORES) =>
  StyleSheet.create({
    tipVisualBlock: {
      width: "100%",
      alignItems: "center",
    },
    tipVisualLabel: {
      width: "88%",
      color: CORES.PRIMARY,
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 18,
      textTransform: "uppercase",
    },
    tipVisualCard: {
      width: "88%",
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      backgroundColor: CORES.SURFACE,
      borderRadius: 2,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    tipVisualContentLine: {
      color: CORES.TEXT,
      fontSize: 16,
      lineHeight: 24,
    },
    tipVisualBlueText: {
      color: CORES.PRIMARY,
      fontWeight: "800",
    },
    tipVisualImageLine: {
      width: "100%",
      alignItems: "center",
      marginVertical: 8,
    },
    tipVisualImage: {
      width: "100%",
      height: 180,
    },
    tipVisualBlankLine: {
      lineHeight: 14,
    },
    tipVisualContinueButton: {
      width: 180,
      height: 46,
      borderRadius: 8,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 18,
    },
    tipVisualContinueButtonText: {
      color: CORES.WHITE_SHORT,
      fontSize: 15,
      fontWeight: "700",
    },
  });

export default ex17;

/*
 {
    component: Exercise17,
    activity: {
  label: "Tip",
  content: [
  `/blueHello Mais neutro e educado.
Pode usar com qualquer pessoa.

  • primeira vez falando com alguém
  • trabalho`,

  IC.slide1,
  
  `  • cliente
  • situação formal
  • telefone

/blueEx:
  • Hello, how are you?
  • Hello, nice to meet you.
/blue{É o mais seguro de todos.}`,
],
      continueLabel: "Continuar",

},
  },


*/
