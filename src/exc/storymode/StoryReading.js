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
import { C, F } from "./theme";
import { CloseIcon, PauseIcon, PlayIcon, TapIcon, XIcon } from "./icons";
import BottomSheet from "./BottomSheet";
import { useStoryAudio } from "./useStoryAudio";
import { getParagraphs, plainText, tokenize } from "./storyText";

function formatTime(seconds) {
  const total = Math.max(0, Math.round(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

// Tela 1 do Story Mode: foto e player fixos, historia rolando por baixo e o
// botao das perguntas no rodape. Com `activity.dictionary`, tocar numa
// palavra abre a traducao (e a da expressao, se a palavra fizer parte de
// uma). O texto so existe aqui: o aluno responde as perguntas sem consulta.
export function StoryReading({ activity, progress = 0, onClose, onFinishReading }) {
  const insets = useSafeAreaInsets();
  const paragraphs = useMemo(() => getParagraphs(activity.text), [activity.text]);
  const tokens = useMemo(
    () => tokenize(paragraphs, activity.dictionary),
    [paragraphs, activity.dictionary],
  );
  const audio = useStoryAudio(activity, plainText(paragraphs));
  const [selected, setSelected] = useState(null);
  const canTranslate = !!activity.dictionary;
  const hasQuestions = (activity.questions || []).length > 0;

  const finishReading = () => {
    audio.clearPlayback();
    onFinishReading();
  };

  const close = () => {
    audio.clearPlayback();
    onClose();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Pressable
          onPress={close}
          style={styles.close}
          accessibilityRole="button"
          accessibilityLabel="Fechar lição"
          hitSlop={8}
        >
          <CloseIcon size={18} />
        </Pressable>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
      </View>

      {/* Foto e player fixos */}
      <View style={styles.mediaWrap}>
        <View style={styles.media}>
          {/* Aula sem imagem: so o player. */}
          {activity.image ? (
            <Image
              source={activity.image}
              style={styles.photo}
              accessibilityLabel={activity.imageDescription}
            />
          ) : null}
          <View style={styles.player}>
            <Pressable
              onPress={audio.playAudio}
              style={styles.playBtn}
              accessibilityRole="button"
              accessibilityLabel={audio.isAudioPlaying ? "Pausar áudio" : "Ouvir a história"}
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
            {!!activity.title && <Text style={styles.title}>{activity.title}</Text>}
            {canTranslate && (
              <View style={styles.tipRow}>
                <TapIcon />
                <Text style={styles.tip}>Toque em uma palavra para ver a tradução</Text>
              </View>
            )}
          </View>
          {canTranslate
            ? tokens.map((paragraphTokens, pi) => (
                <Text key={pi} style={styles.para}>
                  {paragraphTokens.map((token, i) => (
                    <Text key={token.id}>
                      <Text
                        onPress={() => setSelected(token)}
                        suppressHighlighting
                        accessibilityRole="button"
                        style={[
                          token.isPhrase && styles.phrase,
                          selected?.id === token.id && styles.selected,
                        ]}
                      >
                        {token.text}
                      </Text>
                      {i < paragraphTokens.length - 1 ? " " : ""}
                    </Text>
                  ))}
                </Text>
              ))
            : paragraphs.map((paragraph, pi) => (
                <Text key={pi} style={styles.para}>
                  {paragraph.replace(/_/g, " ")}
                </Text>
              ))}
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
          onPress={finishReading}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>
            {hasQuestions
              ? activity.questionsLabel || "Questions"
              : activity.continueLabel || "Continuar"}
          </Text>
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
              <Text style={styles.phraseLabel}>NA EXPRESSÃO</Text>
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
  title: { fontFamily: F.r700, fontSize: 24, color: C.accentLight, letterSpacing: -0.2 },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  tip: { fontFamily: F.r400, fontSize: 13, color: C.muted },
  para: { fontFamily: F.r400, fontSize: 17, lineHeight: 29, color: C.text },
  phrase: {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: C.accentLight,
  },
  selected: { backgroundColor: "rgba(126,144,255,0.38)", borderRadius: 6 },
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
