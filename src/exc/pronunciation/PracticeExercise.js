import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { enviarArquivo } from "../../services/arquivos";
import { criarPostAudio } from "../../services/comunidade";
import { avaliarPronuncia, motivoDoErro } from "../../services/pronuncia";
import { hasFullAccess } from "../../util/plans";
import { BoltIcon } from "../grammarlab/icons";
import { MicIcon, PlayIcon, SpeakerIcon, StopIcon, UsersIcon } from "./icons";
import { FeedbackSheet, PremiumSheet } from "./Sheets";
import { Dots, frameStyles, PronunciationFrame, ThText, Tip } from "./Frame";
import { PtLine } from "../ptToggle";
import { neutralAttempt } from "./scoring";
import { useVoicePractice } from "./useVoicePractice";
import { colors, fonts, TH_BLUE } from "./theme";

const COURSE_NAME = "Pronunciation Lab";

const MESSAGES = {
  sending: { title: "Enviando…", text: "Mandando sua gravação para a comunidade." },
  community: {
    title: "Enviado para a comunidade!",
    text: "Outros alunos vão ouvir e comentar sua pronúncia na aba Comunidade.",
  },
  noRec: {
    title: "Grave sua voz primeiro",
    text: "Depois de gravar, você pode enviar para a comunidade ou pedir feedback instantâneo.",
  },
  error: { title: "Não foi possível enviar", text: "Verifique sua conexão e tente de novo." },
  evaluating: { title: "Analisando sua pronúncia…", text: "Isso leva só alguns segundos." },
};

// Titulo da mensagem quando o feedback instantaneo falha (o texto vem da API).
const TITULO_FALHA = {
  cota_esgotada: "Feedbacks de hoje acabaram",
  sem_fala: "Grave de novo",
  nao_entendeu: "Grave de novo",
  audio_longo: "Grave de novo",
  audio_invalido: "Grave de novo",
};

/*
  Etapas 3 e 5 do Pronunciation Lab: Sound practice (Exercise36, variant
  "word") e Sentence practice (Exercise38, variant "sentence"). Para cada
  item: Listen, Record (ate 10 s), My voice, "Enviar para a comunidade"
  (gratis, publica o audio no feed) e "Feedback instantaneo" (Premium: manda
  a gravacao para /pronuncia/avaliar, que corrige com o SpeechAce, 3 por dia
  somando todas as aulas; o Free ve o pop-up com o preco da loja). O feedback
  nao da XP. Sem pergunta: a etapa fecha com 100%.

  activity: { stage, lessonTag, title, items: [{ text, pt, say?, audioSource? }],
    tip, finishLabel?, foco? }
  `foco` sao os fonemas da aula em ARPAbet ("th", "dh"), para a dica do TH.
  `say` e o que a voz le (padrao: text em minusculas na palavra, text na frase).
*/
export function PracticeExercise({ variant, activity, next, onAttempt, userXp = 0, comboSession }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const premiumUser = hasFullAccess(user);
  const scrollRef = useRef(null);
  const voice = useVoicePractice();
  const [index, setIndex] = useState(0);
  const [tip, setTip] = useState(false);
  const [msg, setMsg] = useState(null);
  const [premium, setPremium] = useState(false);
  // Itens ja publicados nesta passagem (nao publica o mesmo audio duas vezes).
  const [posted, setPosted] = useState({});
  // Resultado do feedback por item, ligado a gravacao avaliada: abrir de novo
  // sem regravar mostra o mesmo resultado e nao gasta outro feedback do dia.
  const [results, setResults] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => () => voice.stopAll(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const items = activity.items;
  const item = items[index];
  const isWord = variant === "word";
  const key = `${variant}-${index}`;
  const rec = voice.recs[key];
  const recording = voice.recKey === key;
  const playingMine = voice.speaking === "mine";
  const spoken = item.say || (isWord ? item.text.toLowerCase() : item.text);
  const last = index >= items.length - 1;

  const resetItem = () => {
    voice.stopAll();
    voice.setError("");
    setMsg(null);
    setTip(false);
  };

  const advance = () => {
    if (!last) {
      resetItem();
      setIndex(index + 1);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      return;
    }
    if (doneRef.current) return;
    doneRef.current = true;
    voice.stopAll();
    neutralAttempt(onAttempt);
    next();
  };

  const sendToCommunity = async () => {
    if (!rec) {
      setMsg("noRec");
      return;
    }
    if (posted[key]) {
      setMsg("community");
      return;
    }
    if (msg === "sending") return;
    voice.stopAll();
    setMsg("sending");
    try {
      const arquivo = await enviarArquivo(rec.uri, {
        tipo: "audio",
        mimeType: "audio/m4a",
        duracaoSegundos: rec.seconds,
      });
      if (!arquivo?.id) throw new Error("Upload de audio nao retornou um id.");
      await criarPostAudio(arquivo.id, {
        origem: "pronuncia",
        aulaPrompt: `${activity.lessonTag ? `${activity.lessonTag} · ` : ""}Pronuncie: “${item.text}”`.slice(0, 1000),
        cursoNome: COURSE_NAME,
      });
      setPosted((current) => ({ ...current, [key]: true }));
      setMsg("community");
    } catch (error) {
      console.error("[pronuncia] falha ao publicar audio na comunidade:", error?.status, error?.message);
      setMsg("error");
    }
  };

  const openInstantFeedback = async () => {
    if (evaluating) return;
    voice.stopAll();
    if (!premiumUser) {
      setMsg(null);
      setPremium(true);
      return;
    }
    if (!rec) {
      setMsg("noRec");
      return;
    }
    const cached = results[key];
    if (cached && cached.at === rec.at) {
      setMsg(null);
      setFeedback(cached.result);
      return;
    }

    setEvaluating(true);
    setMsg("evaluating");
    try {
      const result = await avaliarPronuncia(rec.uri, {
        tipo: isWord ? "palavra" : "frase",
        texto: spoken,
        foco: activity.foco,
      });
      setResults((current) => ({ ...current, [key]: { at: rec.at, result } }));
      setMsg(null);
      setFeedback(result);
    } catch (error) {
      const motivo = motivoDoErro(error);
      if (motivo === "premium") {
        // O servidor nao achou o Premium (ex.: assinatura venceu): mostra os planos.
        setMsg(null);
        setPremium(true);
        return;
      }
      setMsg({
        title: TITULO_FALHA[motivo] || "Não foi possível avaliar",
        text: error?.message || "Verifique sua conexão e tente de novo.",
        tone: motivo === "cota_esgotada" ? "neutral" : "bad",
      });
    } finally {
      setEvaluating(false);
    }
  };

  const message = !msg ? null : typeof msg === "string" ? MESSAGES[msg] : msg;
  const good = msg === "community";
  const bad = msg === "error" || message?.tone === "bad";

  return (
    <PronunciationFrame
      ref={scrollRef}
      stage={activity.stage}
      lessonTag={activity.lessonTag}
      fill={index / items.length}
      xp={userXp + (comboSession?.gained ?? 0)}
      cta={last ? activity.finishLabel || "Continue" : isWord ? "Next word" : "Next sentence"}
      onCta={advance}
      showTipButton={!!activity.tip}
      tipOn={tip}
      onTip={() => {
        setTip(!tip);
        if (!tip) setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
      }}
      hideBottom={premium || !!feedback}
      overlay={
        feedback ? (
          <FeedbackSheet
            result={feedback}
            text={item.text}
            isWord={isWord}
            bottomInset={insets.bottom}
            onClose={() => setFeedback(null)}
            onRetry={() => {
              setFeedback(null);
              setMsg(null);
              voice.toggleRecording(key);
            }}
          />
        ) : premium ? (
          <PremiumSheet
            bottomInset={insets.bottom}
            onClose={() => setPremium(false)}
            onSubscribe={(billing) => {
              setPremium(false);
              navigation.navigate("Paywall", { billing });
            }}
            onCommunity={() => {
              setPremium(false);
              sendToCommunity();
            }}
          />
        ) : null
      }
    >
      <Text style={frameStyles.h1}>{activity.title}</Text>
      <PtLine text={activity.title} style={frameStyles.pt} />
      <Dots count={items.length} at={index} />
      <View
        key={index}
        style={[frameStyles.wordCard, !isWord && { alignItems: "flex-start", paddingVertical: 22 }]}
      >
        <ThText text={item.text} style={isWord ? styles.bigWord : styles.sentence} />
        <Text style={[styles.pt, !isWord && { marginTop: 10, fontSize: 15, lineHeight: 21 }]}>{item.pt}</Text>
        {isWord ? (
          <Text style={styles.pos}>
            Palavra {index + 1} de {items.length}
          </Text>
        ) : null}
      </View>

      <View style={[styles.row, { marginTop: 14 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ouvir a pronúncia"
          onPress={() => voice.speak(spoken, "ref", { rate: 0.9, source: item.audioSource })}
          style={[
            styles.ctl,
            { backgroundColor: colors.blueBg, borderColor: colors.blueBorder },
            voice.speaking === "ref" && { borderColor: colors.blue },
          ]}
        >
          <SpeakerIcon size={16} color={colors.blueSoft} />
          <Text style={styles.ctlText}>Listen</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={recording ? "Parar gravação" : "Gravar minha voz"}
          accessibilityState={{ selected: recording }}
          onPress={() => {
            setMsg(null);
            voice.toggleRecording(key);
          }}
          style={[
            styles.ctl,
            recording
              ? { backgroundColor: colors.redOrange, borderColor: colors.redOrange }
              : { backgroundColor: colors.raised, borderColor: "#3a2228" },
          ]}
        >
          {recording ? <StopIcon size={12} color={colors.text} /> : <MicIcon size={16} color={colors.orange} />}
          <Text style={styles.ctlText}>{recording ? "Stop" : "Record"}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playingMine ? "Parar minha gravação" : "Ouvir minha gravação"}
          accessibilityState={{ selected: playingMine }}
          disabled={!rec}
          // Tocar de novo enquanto toca para a reproducao.
          onPress={() => (playingMine ? voice.stopAll() : voice.playRecording(key))}
          style={[
            styles.ctl,
            playingMine
              ? { backgroundColor: colors.greenBg, borderColor: colors.greenBright }
              : { backgroundColor: colors.raised, borderColor: "#2f3854", opacity: rec ? 1 : 0.6 },
          ]}
        >
          {playingMine ? (
            <PlayingBars color={colors.greenBright} />
          ) : (
            <PlayIcon size={14} color={rec ? colors.text : "#5d6890"} />
          )}
          <Text style={[styles.ctlText, { color: rec ? colors.text : "#5d6890" }]}>My voice</Text>
        </Pressable>
      </View>
      {recording ? <Text style={styles.status}>Gravando… toque em Stop para parar.</Text> : null}
      {voice.error ? <Text style={[styles.status, { color: colors.orangeText }]}>{voice.error}</Text> : null}

      <View style={[styles.row, { marginTop: 12 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Enviar para a comunidade, grátis"
          onPress={sendToCommunity}
          style={[styles.share, { opacity: rec ? 1 : 0.6 }]}
        >
          {msg === "sending" ? (
            <ActivityIndicator size="small" color={colors.blueSoft} />
          ) : (
            <UsersIcon size={22} color={colors.blueSoft} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.shareText}>Enviar para a comunidade</Text>
            <Text style={styles.free}>{posted[key] ? "Enviado" : "Grátis"}</Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ busy: evaluating }}
          onPress={openInstantFeedback}
          style={[styles.share, premiumUser && !rec && { opacity: 0.6 }]}
        >
          {evaluating ? (
            <ActivityIndicator size="small" color={colors.amberText} />
          ) : (
            <BoltIcon size={22} color={colors.amberText} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.shareText}>Feedback instantâneo</Text>
            {premiumUser ? <Text style={[styles.free, { color: colors.amberText }]}>Premium</Text> : null}
          </View>
        </Pressable>
      </View>
      {tip ? <Tip text={activity.tip} /> : null}
      {message ? (
        <View
          accessibilityLiveRegion="polite"
          style={[
            styles.msg,
            good
              ? { backgroundColor: colors.greenBg, borderColor: colors.greenBorder }
              : { backgroundColor: colors.raised, borderColor: "#2f3854" },
          ]}
        >
          <Text
            style={[
              styles.msgTitle,
              { color: good ? colors.greenBright : bad ? colors.orangeText : colors.text },
            ]}
          >
            {message.title}
          </Text>
          <Text style={styles.msgText}>{message.text}</Text>
        </View>
      ) : null}
    </PronunciationFrame>
  );
}

// Barrinhas de audio subindo e descendo enquanto a gravacao do aluno toca
// (no lugar do icone de play do "My voice").
const BAR_HEIGHTS = [8, 14, 10, 16];

function PlayingBars({ color }) {
  const anims = useRef(BAR_HEIGHTS.map(() => new Animated.Value(0.35))).current;
  useEffect(() => {
    const loops = anims.map((value, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 110),
          Animated.timing(value, { toValue: 1, duration: 260, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(value, { toValue: 0.35, duration: 260, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ),
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [anims]);
  return (
    <View style={styles.bars} importantForAccessibility="no-hide-descendants">
      {BAR_HEIGHTS.map((height, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, { height, backgroundColor: color, transform: [{ scaleY: anims[i] }] }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  bars: { width: 16, height: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 },
  bar: { width: 2.5, borderRadius: 99 },
  bigWord: { fontFamily: fonts.extrabold, fontSize: 46, lineHeight: 52, letterSpacing: 1 },
  sentence: { fontFamily: fonts.extrabold, fontSize: 26, lineHeight: 34 },
  pt: { marginTop: 8, fontFamily: fonts.semibold, fontSize: 17, color: TH_BLUE },
  pos: { marginTop: 4, fontFamily: fonts.bold, fontSize: 12, color: "#5d6890" },
  ctl: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  ctlText: { fontFamily: fonts.extrabold, fontSize: 13, color: colors.text },
  status: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 17,
    color: "#7f8aad",
  },
  share: {
    flex: 1,
    height: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.raised,
    borderWidth: 1.5,
    borderColor: "#2f3854",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  shareText: { fontFamily: fonts.extrabold, fontSize: 13, lineHeight: 16, color: colors.text },
  free: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14, color: colors.greenBright },
  msg: { marginTop: 10, padding: 12, borderRadius: 12, borderWidth: 1 },
  msgTitle: { fontFamily: fonts.extrabold, fontSize: 14 },
  msgText: { marginTop: 4, fontFamily: fonts.semibold, fontSize: 13, lineHeight: 19, color: colors.textSoft },
});
