import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { C, F } from "../storymode/theme";
import { BackIcon, CloseIcon, PauseIcon, PlayIcon, TapIcon, XIcon } from "../storymode/icons";
import BottomSheet from "../storymode/BottomSheet";
import { useStoryAudio } from "../storymode/useStoryAudio";
import { plainText, tokenize } from "../storymode/storyText";

function formatTime(seconds) {
  const total = Math.max(0, Math.round(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

// Texto de um bloco em linhas (o card de anuncio usa "\n" entre as vagas).
const blockLines = (text) => String(text || "").split("\n").filter(Boolean);

// Todo o texto da parte, para o TTS ler quando nao ha audio gravado.
function spokenText(blocks) {
  const lines = blocks.flatMap((block) => {
    if (block.kind === "dialogue") return block.lines.map((line) => line.text);
    if (block.kind === "ad") return [block.title, ...blockLines(block.text)];
    return [block.text];
  });
  return plainText(lines.map((line) => line.replace(/\*\*/g, "")));
}

/*
  Leitura de uma parte da historia do Business. Copia da StoryReading do Story
  Mode (foto + player fixos, texto rolando, toque para traduzir) com o que
  muda aqui:
  - a historia vem em partes, cada uma com `blocks`: paragrafo ({ kind: "p",
    text }), anuncio ({ kind: "ad", badge, title, text }) e dialogo ({ kind:
    "dialogue", lines: [{ who, text }] }), com avatar e balao;
  - expressoes da aula em verde: ficam ligadas por "_" como no Story Mode e
    a traducao vem do `glossary` da aula;
  - sem `image`, um espaco tracejado com a descricao no lugar da foto;
  - o botao do topo e o do rodape mudam quando a leitura foi aberta de dentro
    de um exercicio (`peek`).
*/
export function BusinessReading({
  part,
  partIndex,
  partCount,
  dictionary,
  glossary = {},
  progress = 0,
  peek = false,
  continueLabel = "Continuar",
  onClose,
  onContinue,
}) {
  const insets = useSafeAreaInsets();
  // A parte pode trazer o proprio dictionary/glossary (Viagem), que vale
  // sobre o da aula.
  const partGlossary = useMemo(
    () => ({ ...glossary, ...part.glossary }),
    [glossary, part],
  );
  const translations = useMemo(
    () => ({ ...dictionary, ...part.dictionary, ...partGlossary }),
    [dictionary, part, partGlossary],
  );
  // Tokens por bloco (e por linha/fala dentro do bloco), com ids unicos.
  const tokens = useMemo(
    () =>
      part.blocks.map((block, bi) => {
        const lines =
          block.kind === "dialogue"
            ? block.lines.map((line) => line.text)
            : block.kind === "ad"
              ? blockLines(block.text)
              : [block.text];
        return tokenize(lines, translations).map((lineTokens) =>
          lineTokens.map((token) => ({
            ...token,
            id: `${bi}-${token.id}`,
            green: token.isPhrase && !!partGlossary[token.phrase.toLowerCase()],
          })),
        );
      }),
    [part, translations, partGlossary],
  );
  const audio = useStoryAudio(part, spokenText(part.blocks));
  const [selected, setSelected] = useState(null);

  const finish = () => {
    audio.clearPlayback();
    onContinue();
  };

  const close = () => {
    audio.clearPlayback();
    onClose();
  };

  const renderLine = (lineTokens, key, style) => (
    <Text key={key} style={style}>
      {lineTokens.map((token, i) => (
        <Text key={token.id}>
          <Text
            onPress={() => setSelected(token)}
            suppressHighlighting
            accessibilityRole="button"
            style={[
              token.isPhrase && styles.phrase,
              token.green && styles.green,
              selected?.id === token.id && styles.selected,
            ]}
          >
            {token.text}
          </Text>
          {i < lineTokens.length - 1 ? " " : ""}
        </Text>
      ))}
    </Text>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Pressable
          onPress={close}
          style={styles.close}
          accessibilityRole="button"
          accessibilityLabel={peek ? "Voltar para o exercício" : "Fechar lição"}
          hitSlop={8}
        >
          {peek ? <BackIcon size={18} color={C.bg} /> : <CloseIcon size={18} />}
        </Pressable>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
      </View>

      {/* Foto (ou espaco reservado) e player fixos */}
      <View style={styles.mediaWrap}>
        <View style={styles.media}>
          {part.image ? (
            <Image
              source={part.image}
              style={styles.photo}
              accessibilityLabel={part.imageDescription}
            />
          ) : (
            <View style={styles.placeholder} accessibilityLabel={part.imageDescription}>
              <Text style={styles.placeholderText}>{part.imageDescription}</Text>
            </View>
          )}
          <View style={styles.player}>
            <Pressable
              onPress={audio.playAudio}
              style={styles.playBtn}
              accessibilityRole="button"
              accessibilityLabel={audio.isAudioPlaying ? "Pausar áudio" : "Ouvir esta parte"}
            >
              {audio.isAudioPlaying ? <PauseIcon /> : <PlayIcon />}
            </Pressable>
            <Slider
              style={styles.scrub}
              minimumValue={0}
              maximumValue={1}
              value={audio.audioProgress}
              minimumTrackTintColor={C.white}
              maximumTrackTintColor="rgba(255,255,255,0.35)"
              thumbTintColor={C.white}
              onSlidingStart={audio.handleAudioSeekStart}
              onValueChange={audio.handleAudioSeek}
              onSlidingComplete={audio.handleAudioSeekComplete}
              disabled={!audio.canSeek}
            />
            {audio.duration > 0 ? (
              <Text style={styles.time}>
                {formatTime(audio.audioProgress * audio.duration)} /{" "}
                {formatTime(audio.duration)}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* Historia */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={{ gap: 6 }}>
            <Text style={styles.partLabel}>
              PART {partIndex + 1} OF {partCount}
            </Text>
            {!!part.title && <Text style={styles.title}>{part.title}</Text>}
            <View style={styles.tipRow}>
              <TapIcon />
              <Text style={styles.tip}>Toque em uma palavra para ver a tradução</Text>
            </View>
          </View>

          {part.blocks.map((block, bi) => {
            if (block.kind === "ad") {
              return (
                <View key={bi} style={styles.ad}>
                  <View style={styles.adTop}>
                    <Text style={styles.adBadge}>{block.badge}</Text>
                    <Text style={styles.adTitle}>{block.title}</Text>
                  </View>
                  {tokens[bi].map((lineTokens, li) =>
                    renderLine(lineTokens, li, styles.adLine),
                  )}
                </View>
              );
            }
            if (block.kind === "dialogue") {
              const first = block.lines[0]?.who;
              return (
                <View key={bi} style={{ gap: 12 }}>
                  {block.lines.map((line, li) => {
                    const right = line.who !== first;
                    return (
                      <View
                        key={li}
                        style={[styles.row, right && { flexDirection: "row-reverse" }]}
                      >
                        <View
                          style={[
                            styles.avatar,
                            { backgroundColor: right ? C.greenBg : C.pickedBg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.avatarText,
                              { color: right ? C.greenText : C.accentLight },
                            ]}
                          >
                            {line.who.charAt(0)}
                          </Text>
                        </View>
                        <View style={styles.bubble}>
                          <Text style={styles.who}>{line.who}</Text>
                          {renderLine(tokens[bi][li], li, styles.lineText)}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            }
            return renderLine(tokens[bi][0], bi, styles.para);
          })}
        </View>
      </ScrollView>

      {/* Rodape */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}
        pointerEvents="box-none"
      >
        <LinearGradient
          colors={["rgba(14,20,36,0)", C.bg]}
          locations={[0, 0.4]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Pressable
          onPress={finish}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>{continueLabel}</Text>
        </Pressable>
      </View>

      {/* Traducao */}
      {selected && (
        <BottomSheet
          key={selected.id}
          backdrop
          onClose={() => setSelected(null)}
          backgroundColor={C.sheet}
          borderColor={C.sheetBorder}
          accessibilityLabel="Tradução"
        >
          <View style={styles.sheetTop}>
            <View style={{ gap: 8, flex: 1 }}>
              <Text style={styles.kind}>PALAVRA</Text>
              <Text style={styles.word}>{selected.word}</Text>
            </View>
            <Pressable
              onPress={() => setSelected(null)}
              style={styles.sheetClose}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <XIcon size={14} color={C.homeBar} />
            </Pressable>
          </View>
          <View style={styles.divider} />
          <View style={{ gap: 4 }}>
            <Text style={styles.lang}>Português</Text>
            <Text style={styles.tr}>{selected.tr || "—"}</Text>
          </View>
          {selected.isPhrase && (
            <View style={styles.phraseBox}>
              <Text style={styles.phraseLabel}>
                {selected.green ? "EXPRESSÃO DA AULA" : "NA EXPRESSÃO"}
              </Text>
              <Text style={styles.phraseText}>{selected.phrase}</Text>
              <Text style={styles.phraseTr}>{selected.phraseTr || "—"}</Text>
            </View>
          )}
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.closeBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: C.track, overflow: "hidden" },
  trackFill: { height: "100%", backgroundColor: C.accent, borderRadius: 3 },
  mediaWrap: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  media: { borderRadius: 20, overflow: "hidden", backgroundColor: C.accent },
  photo: { width: "100%", height: 200, resizeMode: "cover" },
  placeholder: {
    height: 180,
    margin: 8,
    marginBottom: 0,
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  placeholderText: {
    fontFamily: F.r400,
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
  player: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 10,
    paddingRight: 16,
  },
  playBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  scrub: { flex: 1, height: 40 },
  time: { fontFamily: F.r500, fontSize: 13, color: C.white, fontVariant: ["tabular-nums"] },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 130 },
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 14,
  },
  partLabel: { fontFamily: F.r700, fontSize: 12, letterSpacing: 0.8, color: C.muted },
  title: { fontFamily: F.r700, fontSize: 24, color: C.accentLight, letterSpacing: -0.2 },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  tip: { fontFamily: F.r400, fontSize: 13, color: C.muted },
  para: { fontFamily: F.r400, fontSize: 17, lineHeight: 29, color: C.text },
  phrase: {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: C.accentLight,
  },
  green: {
    fontFamily: F.r700,
    color: C.greenText,
    textDecorationColor: C.greenText,
  },
  selected: { backgroundColor: "rgba(126,144,255,0.38)", borderRadius: 6 },

  ad: {
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  adTop: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 },
  adBadge: {
    fontFamily: F.r700,
    fontSize: 11,
    letterSpacing: 0.8,
    color: C.bg,
    backgroundColor: C.orange,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  adTitle: { flex: 1, fontFamily: F.r700, fontSize: 15, letterSpacing: 0.4, color: C.white },
  adLine: { fontFamily: F.r400, fontSize: 16, lineHeight: 26, color: C.body },

  row: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: F.r700, fontSize: 14 },
  bubble: {
    flexShrink: 1,
    backgroundColor: C.chip,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 2,
  },
  who: { fontFamily: F.r700, fontSize: 12, color: C.muted },
  lineText: { fontFamily: F.r400, fontSize: 16, lineHeight: 25, color: C.text },

  footer: { position: "absolute", left: 0, right: 0, bottom: 0, paddingTop: 36, paddingHorizontal: 20 },
  cta: {
    height: 56,
    borderRadius: 16,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.green,
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ctaText: { fontFamily: F.r700, fontSize: 19, color: C.white },
  sheetTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  kind: {
    alignSelf: "flex-start",
    fontFamily: F.r700,
    fontSize: 12,
    letterSpacing: 0.6,
    color: C.bg,
    backgroundColor: C.homeBar,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  word: { fontFamily: F.r700, fontSize: 26, color: C.white },
  sheetClose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2A3456",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: 1, backgroundColor: C.sheetBorder },
  lang: { fontFamily: F.r400, fontSize: 13, color: C.muted },
  tr: { fontFamily: F.r500, fontSize: 21, color: C.greenText },
  phraseBox: {
    backgroundColor: "#252F52",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
  },
  phraseLabel: { fontFamily: F.r700, fontSize: 12, letterSpacing: 0.6, color: "#9AA8FF" },
  phraseText: { fontFamily: F.r700, fontSize: 17, color: C.white },
  phraseTr: { fontFamily: F.r400, fontSize: 17, color: C.greenText },
});
