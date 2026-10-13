import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  StatusBar as RNStatusBar,
  AppState,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import {
  createAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { File } from "expo-file-system";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSharedValue, useFrameCallback } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { Images } from "../../../util/images";
import { enviarArquivo } from "../../../services/arquivos";
import { criarPostAudio } from "../../../services/comunidade";
import { getSlidePostId, markSlidePosted } from "../../../util/exercisePosts";
import { aulasPlusLessons } from "./lessons";
import {
  loadAulasPlusLessonState,
  saveAulasPlusLessonState,
  clearAulasPlusLessonState,
  recordAulasPlusLessonCompletion,
} from "./progress";

// ---------- recorded audio (ElevenLabs) ----------
const AUDIO = {
  welcome: require("../../../../mp3/AulasPlus/welcome.mp3"),
  fineAndYou: require("../../../../mp3/AulasPlus/fine-and-you.mp3"),
  fineTooThankYou: require("../../../../mp3/AulasPlus/fine-too-thank-you.mp3"),
  whatsYourName: require("../../../../mp3/AulasPlus/whats-your-name.mp3"),
  andYourSurname: require("../../../../mp3/AulasPlus/and-your-surname.mp3"),
  howOldAreYou: require("../../../../mp3/AulasPlus/how-old-are-you.mp3"),
  whereAreYouFrom: require("../../../../mp3/AulasPlus/where-are-you-from.mp3"),
  badAtGeography: require("../../../../mp3/AulasPlus/bad-at-geography.mp3"),
  presentYourself: require("../../../../mp3/AulasPlus/present-yourself.mp3"),
};

// ---------- assets ----------
const IMG_GREETING = Images.teacher;
const IMG_WOMAN = Images.teacher;

// ---------- palette ----------
const C = {
  bg: "#f4f3ef",
  ink: "#1c1e1b",
  mut: "#7c8078",
  green: "#1f8a5b",
  greenDk: "#15603f",
  tint: "#eef4f0",
  white: "#fff",
  border: "#e7e6e0",
  panel: "#eaf0ec",
  pill: "#f0efe9",
  red: "#c0392b",
};
const DELAY = 3500; // ms - pacing for timed reveals
const MAX_RECORDING_MS = 60000;

// ---------- countries ----------
const COUNTRIES = [
  { flag: "🇧🇷", name: "Brazil", from: "Brazil", nat: "Brazilian" },
  {
    flag: "🇺🇸",
    name: "United States",
    from: "the United States",
    nat: "American",
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    from: "the United Kingdom",
    nat: "British",
  },
  { flag: "🇵🇹", name: "Portugal", from: "Portugal", nat: "Portuguese" },
  { flag: "🇪🇸", name: "Spain", from: "Spain", nat: "Spanish" },
  { flag: "🇫🇷", name: "France", from: "France", nat: "French" },
  { flag: "🇩🇪", name: "Germany", from: "Germany", nat: "German" },
  { flag: "🇮🇹", name: "Italy", from: "Italy", nat: "Italian" },
  { flag: "🇦🇷", name: "Argentina", from: "Argentina", nat: "Argentinian" },
  { flag: "🇯🇵", name: "Japan", from: "Japan", nat: "Japanese" },
  { flag: "🇨🇦", name: "Canada", from: "Canada", nat: "Canadian" },
  { flag: "🇲🇽", name: "Mexico", from: "Mexico", nat: "Mexican" },
];

const speak = (t) => {
  try {
    Speech.stop();
    Speech.speak(t, { language: "en-US", rate: 0.95 });
  } catch (e) {}
};

function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// removes a superseded recording's temp file so re-recording repeatedly
// doesn't quietly accumulate audio files on the device
function deleteRecordingFile(uri) {
  if (!uri) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch (e) {}
}

// ---------- small components ----------
function Enter({ children, style, axis = "x", delay = 0 }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, {
      toValue: 1,
      duration: 450,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);
  const tx = a.interpolate({
    inputRange: [0, 1],
    outputRange: [axis === "x" ? 60 : 0, 0],
  });
  const ty = a.interpolate({
    inputRange: [0, 1],
    outputRange: [axis === "y" ? 22 : 0, 0],
  });
  return (
    <Animated.View
      style={[
        style,
        { opacity: a, transform: [{ translateX: tx }, { translateY: ty }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function Panel({ height = 200, num, source = IMG_WOMAN, onBack }) {
  return (
    <View
      style={{
        width: "100%",
        height,
        backgroundColor: C.panel,
        overflow: "hidden",
      }}
    >
      <Image source={source} style={s.panelImg} resizeMode="cover" />
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backBtnTxt}>‹</Text>
      </TouchableOpacity>
      <Text style={s.logo}>LINGUETO</Text>
      <Text style={s.step}>{num} / 9</Text>
    </View>
  );
}

function WomanBubble({ children }) {
  return (
    <View style={s.womanBubble}>
      <Text style={s.bubbleTxt}>{children}</Text>
    </View>
  );
}
function UserBubble({ children, style }) {
  return (
    <View style={[s.userBubble, style]}>
      <Text style={s.userTxt}>{children}</Text>
    </View>
  );
}
function Pill({ label, onPress, primary }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s.pill, primary && s.pillPrimary]}
    >
      <Text style={[s.pillTxt, primary && s.pillPrimaryTxt]}>{label}</Text>
    </TouchableOpacity>
  );
}
function GreenBtn({ label, onPress, style, big }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s.greenBtn, big && { height: 56 }, style]}
    >
      <Text style={s.greenBtnTxt}>{label}</Text>
    </TouchableOpacity>
  );
}
function Dock({ children }) {
  return (
    <Enter axis="y" style={s.dock}>
      {children}
    </Enter>
  );
}

const WAVE_BARS = 24;

// rolls incoming metering readings into a fixed-length trailing history so
// the bars show a real waveform of the last couple seconds (like a voice
// message) instead of every bar reacting to the same instantaneous volume
function useLevelHistory(metering) {
  const [levels, setLevels] = useState(() => new Array(WAVE_BARS).fill(0.06));
  useEffect(() => {
    const hasMetering = typeof metering === "number" && isFinite(metering);
    const level = hasMetering
      ? Math.max(0.06, Math.min(1, (metering + 50) / 50))
      : 0.06 + Math.random() * 0.4; // gentle wiggle if metering isn't supported
    setLevels((prev) => [...prev.slice(1), level]);
  }, [metering]);
  return levels;
}

function Waveform({ levels }) {
  return (
    <View style={s.waveRow}>
      {levels.map((lvl, i) => (
        <View
          key={i}
          style={[
            s.waveBar,
            {
              height: Math.max(3, lvl * 26),
              opacity: 0.35 + (i / levels.length) * 0.65,
            },
          ]}
        />
      ))}
    </View>
  );
}

// polls the native recorder for metering (100ms) purely to drive the live
// waveform - isolated into its own leaf so it only exists (and only pays for
// the bridge poll) while actually recording, not for the whole idle "Hold to
// record" period, and so it can't compete with the button label's own tick
function RecordWaveformLive({ recorder }) {
  const recorderState = useAudioRecorderState(recorder, 100);
  const levels = useLevelHistory(recorderState.metering);
  return <Waveform levels={levels} />;
}

// expanding "sonar ping" ring behind the record circle while active - the
// classic recording affordance
function PulseRing({ active, size }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) return;
    a.setValue(0);
    const loop = Animated.loop(
      Animated.timing(a, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [active]);
  if (!active) return null;
  const scale = a.interpolate({ inputRange: [0, 1], outputRange: [1, 1.9] });
  const opacity = a.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        s.recRing,
        { width: size, height: size, opacity, transform: [{ scale }] },
      ]}
    />
  );
}

// record/stop circle + elapsed-time stopwatch, driven by Reanimated's UI
// thread (useFrameCallback) instead of a JS setInterval. During this lesson
// the JS thread gets busy enough (typing, autosave, scene transitions) that
// a JS timer visibly lagged or froze the counter on screen; the UI thread
// keeps its own clock regardless of JS thread load, and only calls back
// into JS once per second - exactly when the displayed number needs to
// change - via runOnJS.
function RecordButton({ recorder, active, onPress, idleLabel, big, btnStyle }) {
  const startTime = useSharedValue(0);
  const lastSecond = useSharedValue(-1);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  // always call the latest onPress - avoids a stale closure
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  const handleTick = useCallback((sec) => {
    setDisplaySeconds(sec);
    if (sec * 1000 >= MAX_RECORDING_MS) onPressRef.current();
  }, []);

  const frameCallback = useFrameCallback(() => {
    "worklet";
    const elapsedSec = Math.floor((Date.now() - startTime.value) / 1000);
    if (elapsedSec !== lastSecond.value) {
      lastSecond.value = elapsedSec;
      runOnJS(handleTick)(elapsedSec);
    }
  }, false);

  useEffect(() => {
    if (active) {
      startTime.value = Date.now();
      lastSecond.value = -1;
      setDisplaySeconds(0);
      frameCallback.setActive(true);
    } else {
      frameCallback.setActive(false);
    }
  }, [active]);

  const circleSize = big ? 64 : 56;
  const idleCaption = idleLabel.replace(/^🎤\s*/, "");

  return (
    <View style={[s.recWrap, big && s.recWrapBig, btnStyle]}>
      <View style={{ width: circleSize, height: circleSize }}>
        <PulseRing active={active} size={circleSize} />
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.85}
          style={[
            s.recCircle,
            {
              width: circleSize,
              height: circleSize,
              backgroundColor: active ? C.red : C.green,
            },
          ]}
        >
          <Text style={[s.recCircleIcon, big && { fontSize: 26 }]}>
            {active ? "⏹" : "🎤"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={s.recInfo}>
        {active ? (
          <>
            <Text style={s.recTimer}>{formatDuration(displaySeconds)}</Text>
            <RecordWaveformLive recorder={recorder} />
          </>
        ) : (
          <Text style={s.recIdleLabel}>{idleCaption}</Text>
        )}
      </View>
    </View>
  );
}

// ---------- tip modal ----------
function TipModal({ visible, title, items, example, warn, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={s.modalBackdrop}>
        <View style={s.tipCard}>
          <View style={s.lamp}>
            <Text style={{ fontSize: 30 }}>💡</Text>
          </View>
          <Text style={s.tipTitle}>{title}</Text>
          {items && items.length > 0 && (
            <View style={{ gap: 9, width: "100%" }}>
              {items.map((r, i) => (
                <View key={i} style={s.tipRow}>
                  <Text style={s.tipRowTxt}>{r}</Text>
                </View>
              ))}
            </View>
          )}
          {!!example && (
            <View style={s.tipRow}>
              <Text
                style={[s.tipRowTxt, { textAlign: "center", lineHeight: 24 }]}
              >
                {example}
              </Text>
            </View>
          )}
          {!!warn && (
            <View style={s.tipWarn}>
              <Text style={s.tipWarnTxt}>{warn}</Text>
            </View>
          )}
          <GreenBtn
            label="Entendi 👍"
            onPress={onClose}
            style={{ marginTop: 18, width: "100%" }}
          />
        </View>
      </View>
    </Modal>
  );
}

// ---------- picker sheet ----------
function PickerSheet({ visible, mode, onPick, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.sheetBackdrop}>
        <View style={s.sheet}>
          <View style={s.sheetHead}>
            <Text style={s.sheetTitle}>
              {mode === "nat"
                ? "Escolha sua nacionalidade"
                : "Escolha seu país"}
            </Text>
            <TouchableOpacity onPress={onClose} style={s.closeBtn}>
              <Text style={{ color: C.mut, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={s.grid}>
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.name}
                onPress={() => onPick(c)}
                style={s.gridItem}
              >
                <Text style={{ fontSize: 24 }}>{c.flag}</Text>
                <Text style={s.gridLabel}>
                  {mode === "nat" ? c.nat : c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ======================================================
//  LESSON: Self introduction (9 scenes)
// ======================================================
const INITIAL = {
  scene: 1,
  s2_options: false,
  s2_choice: null,
  s2_after: false,
  s2_speak: false,
  s2_recorded: false,
  s2_audioUri: null,
  s2_audioSec: 0,
  s3_continue: false,
  s3_nameQ: false,
  s3_nameInput: false,
  s3_surnameQ: false,
  s3_surnameInput: false,
  s3_done: false,
  s4_q: false,
  s4_repeat: false,
  s4_repeatChoice: "",
  s4_clarify: false,
  s4_ageInput: false,
  ageConfirmed: false,
  s5_pick: false,
  s5_speak: false,
  s5_recorded: false,
  s5_audioUri: null,
  s5_audioSec: 0,
  s6_pick: false,
  s6_speak: false,
  s6_recorded: false,
  s6_audioUri: null,
  s6_audioSec: 0,
  s7_shown: false,
  s8_recBtn: false,
  s8_example: false,
  s8_recorded: false,
  s8_audioUri: null,
  s8_audioSec: 0,
  // captured data
  name: "",
  surname: "",
  age: "",
  country: null,
  nationality: null,
  nameConfirmed: false,
  surnameConfirmed: false,
  // translate toggles
  tr: {},
  // tip + picker
  tip: null,
  picker: null,
};

export default function SelfIntroLesson({ navigation, route }) {
  const lesson =
    route?.params?.lesson ||
    aulasPlusLessons.find((item) => item.screen === "SelfIntroLesson");
  const [st, setSt] = useState(INITIAL);
  const timers = useRef([]);
  const audioPlayerRef = useRef(null);
  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });
  const [recKey, setRecKey] = useState(null);
  // Por gravacao: "enviando" | "publicado". Sem entrada = nao publicada.
  const [publicacoes, setPublicacoes] = useState({});
  const recStartRef = useRef(0);
  // guards startRecording/stopRecording against overlapping calls (e.g. a
  // fast double-tap firing a start and a stop before either one settles)
  const isRecordActionBusyRef = useRef(false);
  const hasLoadedStateRef = useRef(false);
  const completionCommitRef = useRef(false);
  const up = useCallback(
    (patch) =>
      setSt((p) => ({
        ...p,
        ...(typeof patch === "function" ? patch(p) : patch),
      })),
    [],
  );
  const after = useCallback((ms, fn) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => () => stopPlayback(), []);
  useEffect(
    () => () => {
      recorder.stop().catch(() => {});
      // in case the screen is left mid-recording, don't leave the device's
      // audio session stuck in recording mode for whatever screen comes next
      setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      }).catch(() => {});
    },
    [],
  );
  // marks the start time for the live counter; the ticking itself lives in
  // RecordButton so re-renders while recording stay local to that widget
  // instead of re-rendering the whole lesson on every tick.
  useEffect(() => {
    if (recKey) recStartRef.current = Date.now();
  }, [recKey]);

  // Retomar de onde parou: carrega o estado salvo uma unica vez ao montar.
  // O guard hasLoadedStateRef evita que o efeito de salvar (abaixo) rode
  // antes desse carregamento terminar e sobrescreva o progresso salvo com o
  // estado inicial.
  useEffect(() => {
    if (!lesson) return undefined;
    let active = true;
    loadAulasPlusLessonState(lesson.id).then((saved) => {
      if (!active) return;
      if (saved) setSt(saved);
      hasLoadedStateRef.current = true;
    });
    return () => {
      active = false;
    };
  }, [lesson]);

  useEffect(() => {
    if (!lesson || !hasLoadedStateRef.current) return;
    // debounced: without this, every keystroke in a text field (name,
    // surname, age) would JSON.stringify the whole lesson state and hit
    // AsyncStorage on every character, congesting the JS thread enough to
    // visibly delay the keyboard-avoiding animation
    const id = setTimeout(() => {
      saveAulasPlusLessonState(lesson.id, st).catch(() => {});
    }, 600);
    return () => clearTimeout(id);
  }, [lesson, st]);

  // Registra a conclusao (XP + progresso) quando a licao chega na cena
  // final ("LESSON COMPLETE"). Nao ha calculo de XP proprio nesta aula, entao
  // usa o valor de referencia do catalogo.
  useEffect(() => {
    if (st.scene !== 9 || completionCommitRef.current || !lesson) return;
    completionCommitRef.current = true;
    recordAulasPlusLessonCompletion(lesson, lesson.xpReward).catch(() => {});
  }, [st.scene, lesson]);

  const toggleTr = (k) => up((p) => ({ tr: { ...p.tr, [k]: !p.tr[k] } }));
  const goBack = () => navigation.goBack();

  // stops and releases whatever is currently playing, if anything
  const stopPlayback = () => {
    const prev = audioPlayerRef.current;
    audioPlayerRef.current = null;
    if (prev) {
      // pause first: it silences immediately, remove()'s native teardown can lag
      try {
        prev.pause();
      } catch (e) {}
      try {
        prev.remove();
      } catch (e) {}
    }
  };

  // plays an audio source (recorded clip or user recording); falls back to TTS.
  // always stops any other clip/recording/TTS first so only one plays at a time.
  const playSource = (source, fallbackText) => {
    try {
      Speech.stop();
    } catch (e) {}
    stopPlayback();
    if (source) {
      try {
        const player = createAudioPlayer(source);
        audioPlayerRef.current = player;
        player.play();
        return;
      } catch (e) {}
    }
    if (fallbackText) speak(fallbackText);
  };
  const playClip = (key, fallbackText) =>
    playSource(key && AUDIO[key], fallbackText);

  // real microphone recording for the "Hold to record" practice prompts.
  // isRecordActionBusyRef makes start/stop atomic against a fast double-tap
  // (which would otherwise fire overlapping native start/stop calls).
  const startRecording = async (key) => {
    if (isRecordActionBusyRef.current) return;
    isRecordActionBusyRef.current = true;
    // flip the UI on immediately so the recording indicator (and the stopwatch
    // effect keyed on recKey) don't wait on the native setup round trip below
    setRecKey(key);
    let audioModeSet = false;
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        setRecKey(null);
        Alert.alert(
          "Permissão necessária",
          "Permita o uso do microfone para gravar sua voz.",
        );
        return;
      }
      stopPlayback();
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      audioModeSet = true;
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (e) {
      setRecKey(null);
      // don't leave the audio session stuck in recording mode if setup failed midway
      if (audioModeSet) {
        setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
        }).catch(() => {});
      }
      Alert.alert("Erro", "Não foi possível iniciar a gravação.");
    } finally {
      isRecordActionBusyRef.current = false;
    }
  };
  const stopRecording = async (onDone) => {
    if (isRecordActionBusyRef.current) return;
    isRecordActionBusyRef.current = true;
    // durationMillis resets once stop() resolves, so read it beforehand;
    // our own stopwatch (computed live, not from the last tick) is the reliable source
    const durationMillis =
      (recStartRef.current ? Date.now() - recStartRef.current : 0) ||
      recorder.getStatus().durationMillis ||
      0;
    try {
      let uri = null;
      try {
        await recorder.stop();
        const status = recorder.getStatus();
        uri = recorder.uri ?? status.url ?? null;
      } catch (e) {}
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      }).catch(() => {});
      const seconds = Math.max(1, Math.round(durationMillis / 1000));
      setRecKey(null);
      if (uri) {
        onDone(uri, seconds);
      } else {
        // nothing was actually captured - don't advance, let the learner retry
        Alert.alert("Erro", "Não foi possível salvar sua gravação. Tente novamente.");
      }
    } finally {
      isRecordActionBusyRef.current = false;
    }
  };
  // clears a finished recording and reopens the record button for that scene
  const reRecord = (key) => {
    stopPlayback();
    const staleUris = {
      s2: st.s2_audioUri,
      s5: st.s5_audioUri,
      s6: st.s6_audioUri,
      s8: st.s8_audioUri,
    };
    deleteRecordingFile(staleUris[key]); // about to be replaced by a new take
    if (key === "s2")
      up({
        s2_recorded: false,
        s2_audioUri: null,
        s2_audioSec: 0,
        s2_speak: true,
      });
    else if (key === "s5")
      up({
        s5_recorded: false,
        s5_audioUri: null,
        s5_audioSec: 0,
        s5_speak: true,
      });
    else if (key === "s6")
      up({
        s6_recorded: false,
        s6_audioUri: null,
        s6_audioSec: 0,
        s6_speak: true,
      });
    else if (key === "s8")
      up({
        s8_recorded: false,
        s8_audioUri: null,
        s8_audioSec: 0,
        s8_recBtn: true,
      });
  };

  // a *_audioUri restored from a previous app session may point to a file
  // the OS already evicted from cache; if playback never actually loads,
  // treat the recording as gone and reopen the record button for that scene
  const handleMissingRecording = (key) => {
    Alert.alert(
      "Gravação indisponível",
      "Essa gravação não está mais disponível. Grave novamente.",
    );
    reRecord(key);
  };
  const playMyRecording = (key, uri) => {
    if (!uri) return;
    try {
      Speech.stop();
    } catch (e) {}
    stopPlayback();
    let player;
    try {
      player = createAudioPlayer({ uri });
      audioPlayerRef.current = player;
      player.play();
    } catch (e) {
      handleMissingRecording(key);
      return;
    }
    setTimeout(() => {
      if (audioPlayerRef.current === player && !player.isLoaded) {
        try {
          player.remove();
        } catch (e) {}
        if (audioPlayerRef.current === player) audioPlayerRef.current = null;
        handleMissingRecording(key);
      }
    }, 900);
  };

  // ---- transitions ----
  const start = () => {
    up({ scene: 2 });
    after(DELAY, () => up({ s2_options: true }));
  };
  const selectOption = (opt) =>
    up({
      s2_choice: opt,
      s2_options: false,
      tip: {
        ctx: "options",
        title: "How are you?",
        items: [
          "I'm fine  -  Estou bem",
          "I'm great  -  Estou ótimo(a)",
          "I'm ok, thanks  -  Estou bem, obrigado(a)",
          "and you?  -  e você?",
        ],
      },
    });
  const closeTip = () => {
    const ctx = st.tip && st.tip.ctx;
    up({ tip: null });
    if (ctx === "options") {
      up({ s2_after: true });
      after(DELAY, () => up({ s2_speak: true }));
    }
  };
  // the sentence the learner was asked to say for a given recording point -
  // used only as the community post's caption, not shown in the lesson UI
  const recordingPromptFor = (key) => {
    if (key === "s2") {
      const choiceEn =
        st.s2_choice === "great"
          ? "I'm great"
          : st.s2_choice === "ok"
            ? "I'm ok, thanks"
            : "I'm fine";
      return `${choiceEn}, and you?`;
    }
    if (key === "s5") return st.country ? `I'm from ${st.country.from}` : "";
    if (key === "s6") return st.nationality ? `I'm ${st.nationality.nat}` : "";
    if (key === "s8")
      return `Hi! My name's ${st.name}. My surname is ${st.surname}. I'm ${st.age} years old and I'm from ${st.country ? st.country.from : ""}.`;
    return "";
  };

  // mirrors Exercise16's audio-to-community flow (enviarArquivo ->
  // criarPostAudio), gated by exercisePosts so re-recording or replaying a
  // scene never posts the same clip to the community twice.
  // So roda quando o usuario toca em "Publicar na comunidade": o feed e
  // publico, entao a voz dele nunca sai do aparelho sozinha.
  const publicarNaComunidade = async (key, uri, seconds) => {
    if (!lesson || !uri || publicacoes[key]) return;
    const slideKey = `aulasplus:${lesson.id}:${key}`;
    setPublicacoes((atual) => ({ ...atual, [key]: "enviando" }));
    try {
      const jaPostado = await getSlidePostId(slideKey);
      if (jaPostado) {
        setPublicacoes((atual) => ({ ...atual, [key]: "publicado" }));
        return;
      }
      const arquivo = await enviarArquivo(uri, {
        tipo: "audio",
        mimeType: "audio/m4a",
        duracaoSegundos: seconds,
      });
      if (!arquivo?.id) throw new Error("Upload de audio nao retornou um id.");
      // posts_comunidade.origem is a DB ENUM whose CHECK constraint requires
      // tipo='audio' posts to use exactly 'exercicio16' - there's no distinct
      // value for aulas plus yet, so this reuses it (see
      // banco/BANCO_API_SCHEMA_MYSQL_PT_v2.sql)
      const novo = await criarPostAudio(arquivo.id, {
        origem: "exercicio16",
        aulaPrompt: recordingPromptFor(key),
      });
      if (novo?.id != null) await markSlidePosted(slideKey, novo.id);
      setPublicacoes((atual) => ({ ...atual, [key]: "publicado" }));
    } catch (error) {
      console.error(
        "[SelfIntroLesson] falha ao publicar audio na comunidade:",
        error?.status,
        error?.message,
        error,
      );
      setPublicacoes((atual) => {
        const proximo = { ...atual };
        delete proximo[key];
        return proximo;
      });
      Alert.alert(
        "Não foi possível publicar",
        error?.message || "Tente novamente em instantes.",
      );
    }
  };

  // Rotulo do botao de publicar de cada gravacao.
  const rotuloPublicacao = (key) =>
    publicacoes[key] === "publicado"
      ? "✓ Publicado na comunidade"
      : publicacoes[key] === "enviando"
        ? "Publicando…"
        : "↑ Publicar na comunidade";

  const record2 = () => {
    if (recKey === "s2") {
      stopRecording((uri, seconds) => {
        up({
          s2_speak: false,
          s2_recorded: true,
          s2_audioUri: uri,
          s2_audioSec: seconds,
        });
      });
    } else {
      startRecording("s2");
    }
  };

  const goScene3 = () => {
    up({ scene: 3 });
    after(1400, () => up({ s3_continue: true }));
  };
  const tapContinue = () => {
    up({ s3_continue: false, s3_nameQ: true });
    after(DELAY, () =>
      up({
        s3_nameInput: true,
        tip: {
          ctx: "name",
          title: "Saying your name",
          example:
            "To say your name, say \"It's\" + your name.\n\nEx: It's Kevin",
        },
      }),
    );
  };
  const confirmName = () => {
    if (!st.name.trim()) return;
    up({ nameConfirmed: true, s3_nameInput: false, s3_surnameQ: true });
    after(DELAY, () =>
      up({
        s3_surnameInput: true,
        tip: {
          ctx: "surname",
          title: "Saying your surname",
          example: "Say \"It's\" + your surname.\n\nEx: It's Silva",
        },
      }),
    );
  };
  const confirmSurname = () => {
    if (!st.surname.trim()) return;
    up({ surnameConfirmed: true, s3_surnameInput: false, s3_done: true });
  };

  const goScene4 = () => {
    up({ scene: 4 });
    after(DELAY, () => up({ s4_q: true }));
  };
  const understandYes = () => {
    up({ s4_q: false });
    after(400, () => up({ s4_ageInput: true, tip: ageTip() }));
  };
  const understandNo = () => up({ s4_q: false, s4_repeat: true });
  const pickRepeat = (phrase) => {
    up({ s4_repeat: false, s4_repeatChoice: phrase });
    after(DELAY, () => {
      up({ s4_clarify: true });
      after(DELAY, () => up({ s4_ageInput: true, tip: ageTip() }));
    });
  };
  const ageTip = () => ({
    ctx: "age",
    title: "Talking about age",
    items: ["How old are you?  -  Quantos anos você tem?"],
    example: "In English, say \"I'm\" + age.\nEx: I'm 34 years old.",
    warn: 'Never say "I have 34 years". ❌',
  });
  const confirmAge = () => {
    if (!String(st.age).trim()) return;
    up({ ageConfirmed: true, s4_ageInput: false });
  };

  const goScene5 = () => {
    up({ scene: 5 });
    after(DELAY, () => up({ s5_pick: true }));
  };
  const pickCountry = (c) => {
    up({ country: c, picker: null, s5_pick: false });
    after(DELAY, () => up({ s5_speak: true }));
  };
  const record5 = () => {
    if (recKey === "s5") {
      stopRecording((uri, seconds) => {
        up({
          s5_speak: false,
          s5_recorded: true,
          s5_audioUri: uri,
          s5_audioSec: seconds,
        });
      });
    } else {
      startRecording("s5");
    }
  };

  const goScene6 = () => {
    up({ scene: 6 });
    after(DELAY, () => up({ s6_pick: true }));
  };
  const pickNat = (c) => {
    up({ nationality: c, picker: null, s6_pick: false });
    after(DELAY, () => up({ s6_speak: true }));
  };
  const record6 = () => {
    if (recKey === "s6") {
      stopRecording((uri, seconds) => {
        up({
          s6_speak: false,
          s6_recorded: true,
          s6_audioUri: uri,
          s6_audioSec: seconds,
        });
      });
    } else {
      startRecording("s6");
    }
  };

  const goScene7 = () => {
    up({ scene: 7 });
    after(1200, () => up({ s7_shown: true }));
  };
  const goScene8 = () => {
    up({ scene: 8 });
    after(1200, () => up({ s8_recBtn: true }));
  };
  const recordPresentation = () => {
    if (recKey === "s8") {
      stopRecording((uri, seconds) => {
        up({
          s8_recBtn: false,
          s8_recorded: true,
          s8_audioUri: uri,
          s8_audioSec: seconds,
        });
      });
    } else {
      startRecording("s8");
    }
  };

  // if the app is backgrounded mid-recording (call, notification, app
  // switch), the OS may kill the native recording session while our UI
  // keeps showing "recording..." forever; auto-stop so it reflects reality
  const recKeyRef = useRef(recKey);
  recKeyRef.current = recKey;
  const stopHandlersRef = useRef();
  stopHandlersRef.current = {
    s2: record2,
    s5: record5,
    s6: record6,
    s8: recordPresentation,
  };
  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      const key = recKeyRef.current;
      if (nextState === "background" && key) {
        stopHandlersRef.current[key]?.();
      }
    });
    return () => sub.remove();
  }, []);

  const goFinal = () => up({ scene: 9 });
  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (recKey) {
      recorder.stop().catch(() => {});
      setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      }).catch(() => {});
    }
    setRecKey(null);
    [st.s2_audioUri, st.s5_audioUri, st.s6_audioUri, st.s8_audioUri].forEach(
      deleteRecordingFile,
    );
    setSt(INITIAL);
    if (lesson) clearAulasPlusLessonState(lesson.id).catch(() => {});
  };

  const choiceEn =
    st.s2_choice === "great"
      ? "I'm great"
      : st.s2_choice === "ok"
        ? "I'm ok, thanks"
        : "I'm fine";
  const userPhrase = choiceEn + ", and you?";
  const nm = st.name || "";

  // ---------------- render ----------------
  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <StatusBar style="dark" />
      {/* edge-to-edge is enabled on Android (gradle.properties), which means
          adjustResize no longer shrinks the window on its own - the keyboard
          must be compensated for here in JS on both platforms. "height" used
          to be the Android default, but it locks in an explicit height that
          doesn't always release cleanly when the keyboard closes (needing a
          manual scroll to "unstick"); "padding" avoids that failure mode. */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      {/* SCENE 1 */}
      {st.scene === 1 && (
        <Enter style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              height: 244,
              backgroundColor: C.panel,
              overflow: "hidden",
            }}
          >
            <Image
              source={IMG_GREETING}
              style={s.panelImg}
              resizeMode="cover"
            />
            <TouchableOpacity onPress={goBack} style={s.backBtn}>
              <Text style={s.backBtnTxt}>‹</Text>
            </TouchableOpacity>
          </View>
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(18,30,24,0.42)" },
            ]}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              padding: 26,
              paddingTop: 44,
            }}
          >
            <Text style={s.s1brand}>LINGUETO</Text>
            <Text style={s.s1title}>Let's introduce{"\n"}yourself</Text>
            <Text style={s.s1sub}>
              Learn to share your personal information in English - your name,
              age and where you're from.
            </Text>
            <GreenBtn
              label="Let's get it! →"
              onPress={start}
              big
              style={{ marginTop: 24 }}
            />
          </View>
        </Enter>
      )}

      {/* SCENE 2 */}
      {st.scene === 2 && (
        <View style={{ flex: 1 }}>
          <Panel height={244} num={2} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>Welcome to Lingueto. How are you today?</WomanBubble>
              <Pill
                label="🔊 Listen"
                onPress={() =>
                  playClip("welcome", "Welcome to Lingueto. How are you today?")
                }
              />
            </Enter>
            {st.s2_after && (
              <Enter axis="y" style={s.rowEnd}>
                <UserBubble>{userPhrase}</UserBubble>
                <Pill
                  label="🎧 Listen"
                  primary
                  onPress={() =>
                    playClip(
                      !st.s2_choice || st.s2_choice === "fine"
                        ? "fineAndYou"
                        : null,
                      userPhrase,
                    )
                  }
                />
              </Enter>
            )}
            {st.s2_speak && (
              <Enter
                axis="y"
                style={{ alignItems: "center", gap: 12, marginTop: 6 }}
              >
                <Text style={s.prompt}>Now it's your turn - Speak</Text>
                <RecordButton
                  recorder={recorder}
                  active={recKey === "s2"}
                  onPress={record2}
                  idleLabel="🎤 Hold to record"
                  btnStyle={{ borderRadius: 999, paddingHorizontal: 26 }}
                />
                <Text style={s.hint}>Say: "{userPhrase}"</Text>
              </Enter>
            )}
            {st.s2_recorded && (
              <Enter style={[s.rowEnd, { gap: 10 }]}>
                <TouchableOpacity
                  onPress={() => playMyRecording("s2", st.s2_audioUri)}
                  style={s.sent}
                >
                  <Text style={s.sentTxt}>
                    ▶ {formatDuration(st.s2_audioSec)} - sent
                  </Text>
                </TouchableOpacity>
                <Pill
                  label={rotuloPublicacao("s2")}
                  onPress={() =>
                    publicarNaComunidade("s2", st.s2_audioUri, st.s2_audioSec)
                  }
                />
                <Pill label="↺ Re-record" onPress={() => reRecord("s2")} />
                <GreenBtn
                  label="Continue →"
                  onPress={goScene3}
                  style={{ height: 44, paddingHorizontal: 20 }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s2_options && (
            <Dock>
              <Text style={s.dockLabel}>Choose your answer</Text>
              <Choice
                emoji="🙂"
                label="I'm fine"
                onPress={() => selectOption("fine")}
              />
              <Choice
                emoji="😄"
                label="I'm great"
                onPress={() => selectOption("great")}
              />
              <Choice
                emoji="😌"
                label="I'm ok, thanks"
                onPress={() => selectOption("ok")}
              />
            </Dock>
          )}
        </View>
      )}

      {/* SCENE 3 */}
      {st.scene === 3 && (
        <View style={{ flex: 1 }}>
          <Panel height={196} num={3} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>I'm fine too, thank you 😊</WomanBubble>
              <View style={s.pillRow}>
                <Pill
                  label="🔊 Listen"
                  onPress={() =>
                    playClip("fineTooThankYou", "I'm fine too, thank you")
                  }
                />
                <Pill label="🌐 Translate" onPress={() => toggleTr("fine")} />
              </View>
              {st.tr.fine && (
                <Text style={s.trTxt}>Eu também estou bem, obrigada.</Text>
              )}
            </Enter>
            {st.s3_continue && (
              <TouchableOpacity onPress={tapContinue} style={s.tapContinue}>
                <Text style={s.tapContinueTxt}>tap to continue →</Text>
              </TouchableOpacity>
            )}
            {st.s3_nameQ && (
              <Enter axis="y" style={s.rowStart}>
                <WomanBubble>What's your name?</WomanBubble>
                <View style={s.pillRow}>
                  <Pill
                    label="🔊 Listen"
                    onPress={() =>
                      playClip("whatsYourName", "What's your name?")
                    }
                  />
                  <Pill label="🌐 Translate" onPress={() => toggleTr("name")} />
                </View>
                {st.tr.name && <Text style={s.trTxt}>Qual é o seu nome?</Text>}
              </Enter>
            )}
            {st.nameConfirmed && (
              <Enter style={s.rowEnd}>
                <UserBubble>It's {st.name}</UserBubble>
              </Enter>
            )}
            {st.s3_surnameQ && (
              <Enter axis="y" style={s.rowStart}>
                <WomanBubble>And your surname?</WomanBubble>
                <Pill
                  label="🔊 Listen"
                  onPress={() =>
                    playClip("andYourSurname", "And your surname?")
                  }
                />
              </Enter>
            )}
            {st.surnameConfirmed && (
              <Enter style={s.rowEnd}>
                <UserBubble>It's {st.surname}</UserBubble>
              </Enter>
            )}
            {st.s3_done && (
              <Enter axis="y" style={s.rowStart}>
                <WomanBubble>Nice to meet you, {nm}! 😊</WomanBubble>
                <GreenBtn
                  label="Continue →"
                  onPress={goScene4}
                  style={{
                    alignSelf: "flex-start",
                    height: 44,
                    paddingHorizontal: 20,
                  }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s3_nameInput && (
            <InputDock
              prefix="It's"
              placeholder="your name"
              value={st.name}
              onChange={(t) => up({ name: t })}
              onSend={confirmName}
            />
          )}
          {st.s3_surnameInput && (
            <InputDock
              prefix="It's"
              placeholder="your surname"
              value={st.surname}
              onChange={(t) => up({ surname: t })}
              onSend={confirmSurname}
            />
          )}
        </View>
      )}

      {/* SCENE 4 */}
      {st.scene === 4 && (
        <View style={{ flex: 1 }}>
          <Panel height={190} num={4} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>Great, {nm}! Now, how old are you?</WomanBubble>
              <Pill
                label="🔊 Listen"
                onPress={() =>
                  playClip(
                    "howOldAreYou",
                    `Great, ${nm}! Now, how old are you?`,
                  )
                }
              />
            </Enter>
            {!!st.s4_repeatChoice && (
              <Enter style={s.rowEnd}>
                <UserBubble>{st.s4_repeatChoice}</UserBubble>
              </Enter>
            )}
            {st.s4_clarify && (
              <Enter axis="y" style={s.rowStart}>
                <WomanBubble>
                  I mean your age - for example, I'm 34 years old. And you?
                </WomanBubble>
                <Pill
                  label="🌐 Translate"
                  onPress={() => toggleTr("ageClar")}
                />
                {st.tr.ageClar && (
                  <Text style={s.trTxt}>
                    Quero dizer a sua idade, por exemplo, eu tenho 34 anos. E
                    você?
                  </Text>
                )}
              </Enter>
            )}
            {st.ageConfirmed && (
              <Enter style={[s.rowEnd, { gap: 10 }]}>
                <UserBubble>I'm {st.age} years old</UserBubble>
                <GreenBtn
                  label="Continue →"
                  onPress={goScene5}
                  style={{ height: 44, paddingHorizontal: 20 }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s4_q && (
            <Dock>
              <View style={s.rowBetween}>
                <Text style={s.dockQ}>Do you understand the question?</Text>
                <Pill label="🌐" onPress={() => toggleTr("understand")} />
              </View>
              {st.tr.understand && (
                <Text style={[s.trTxt, { marginBottom: 8 }]}>
                  Você entende a pergunta?
                </Text>
              )}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={understandYes}
                  style={[
                    s.wideChip,
                    {
                      backgroundColor: C.tint,
                      borderColor: "#cfe6d9",
                      flex: 1,
                    },
                  ]}
                >
                  <Text style={[s.wideChipTxt, { color: C.greenDk }]}>
                    ✅ Yes, I got it
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={understandNo}
                  style={[s.wideChip, { flex: 1 }]}
                >
                  <Text style={s.wideChipTxt}>🤔 No, I'm sorry</Text>
                </TouchableOpacity>
              </View>
            </Dock>
          )}
          {st.s4_repeat && (
            <Dock>
              <Text style={s.dockLabel}>Ask her to help - pick a phrase</Text>
              <RepeatChip
                label={`"I'm sorry, could you repeat?"`}
                onPress={() => pickRepeat("I'm sorry, could you repeat?")}
              />
              <RepeatChip
                label={`"Say that again, please."`}
                onPress={() => pickRepeat("Say that again, please.")}
              />
              <RepeatChip
                label={`"I don't understand."`}
                onPress={() => pickRepeat("I don't understand.")}
              />
            </Dock>
          )}
          {st.s4_ageInput && (
            <Dock>
              <Text style={s.dockLabel}>Type your answer</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={s.inPrefix}>I'm</Text>
                <TextInput
                  value={String(st.age)}
                  onChangeText={(t) => up({ age: t.replace(/[^0-9]/g, "") })}
                  keyboardType="number-pad"
                  placeholder="00"
                  placeholderTextColor="#b9bdb5"
                  style={[s.input, { width: 78, textAlign: "center" }]}
                />
                <Text style={s.inPrefix}>years old</Text>
                <TouchableOpacity onPress={confirmAge} style={s.sendBtn}>
                  <Text style={s.sendTxt}>→</Text>
                </TouchableOpacity>
              </View>
            </Dock>
          )}
        </View>
      )}

      {/* SCENE 5 */}
      {st.scene === 5 && (
        <View style={{ flex: 1 }}>
          <Panel height={190} num={5} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>Where are you from, {nm}? 🌍</WomanBubble>
              <View style={s.pillRow}>
                <Pill
                  label="🔊 Listen"
                  onPress={() =>
                    playClip("whereAreYouFrom", `Where are you from, ${nm}?`)
                  }
                />
                <Pill label="🌐 Translate" onPress={() => toggleTr("where")} />
              </View>
              {st.tr.where && <Text style={s.trTxt}>De onde você é?</Text>}
            </Enter>
            {st.country && (
              <Enter style={[s.rowEnd, { gap: 8 }]}>
                <View style={s.geoCard}>
                  <Text style={{ fontSize: 34 }}>{st.country.flag}</Text>
                  <View>
                    <Text style={s.geoName}>{st.country.name}</Text>
                    <Text style={s.geoHint}>
                      tap listen to hear it in English
                    </Text>
                  </View>
                </View>
                <Pill
                  label="🎧 Listen"
                  primary
                  onPress={() => playClip(null, st.country.name)}
                />
              </Enter>
            )}
            {st.s5_speak && (
              <Enter
                axis="y"
                style={{ alignItems: "center", gap: 12, marginTop: 6 }}
              >
                <Text style={s.prompt}>Swipe it up and say it</Text>
                <View style={s.sayBox}>
                  <Text style={s.sayTxt}>"I'm from {st.country.from}"</Text>
                </View>
                <RecordButton
                  recorder={recorder}
                  active={recKey === "s5"}
                  onPress={record5}
                  idleLabel="🎤 Hold to record"
                  btnStyle={{ borderRadius: 999, paddingHorizontal: 24 }}
                />
              </Enter>
            )}
            {st.s5_recorded && (
              <Enter style={[s.rowEnd, { gap: 10 }]}>
                <TouchableOpacity
                  onPress={() => playMyRecording("s5", st.s5_audioUri)}
                  style={s.sent}
                >
                  <Text style={s.sentTxt}>
                    ▶ {formatDuration(st.s5_audioSec)} - sent
                  </Text>
                </TouchableOpacity>
                <Pill
                  label={rotuloPublicacao("s5")}
                  onPress={() =>
                    publicarNaComunidade("s5", st.s5_audioUri, st.s5_audioSec)
                  }
                />
                <Pill label="↺ Re-record" onPress={() => reRecord("s5")} />
                <GreenBtn
                  label="Continue →"
                  onPress={goScene6}
                  style={{ height: 44, paddingHorizontal: 20 }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s5_pick && (
            <Dock>
              <GreenBtn
                label="🌍 Choose your country"
                onPress={() => up({ picker: "country" })}
                style={{ width: "100%" }}
              />
            </Dock>
          )}
        </View>
      )}

      {/* SCENE 6 */}
      {st.scene === 6 && (
        <View style={{ flex: 1 }}>
          <Panel height={190} num={6} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>
                I'm sorry {nm}, but I'm bad at geography 😅 What's your
                nationality?
              </WomanBubble>
              <View style={s.pillRow}>
                <Pill
                  label="🔊 Listen"
                  onPress={() =>
                    playClip(
                      "badAtGeography",
                      `I'm sorry ${nm}, but I'm bad at geography. What's your nationality?`,
                    )
                  }
                />
                <Pill label="🌐 Translate" onPress={() => toggleTr("nat")} />
              </View>
              {st.tr.nat && (
                <Text style={s.trTxt}>Qual é a sua nacionalidade?</Text>
              )}
            </Enter>
            {st.nationality && (
              <Enter style={[s.rowEnd, { gap: 8 }]}>
                <View style={s.geoCard}>
                  <Text style={{ fontSize: 34 }}>{st.nationality.flag}</Text>
                  <Text style={s.geoName}>{st.nationality.nat}</Text>
                </View>
                <Pill
                  label="🎧 Listen"
                  primary
                  onPress={() => playClip(null, st.nationality.nat)}
                />
              </Enter>
            )}
            {st.s6_speak && (
              <Enter
                axis="y"
                style={{ alignItems: "center", gap: 12, marginTop: 6 }}
              >
                <Text style={s.prompt}>Swipe it up and say it</Text>
                <View style={s.sayBox}>
                  <Text style={s.sayTxt}>"I'm {st.nationality.nat}"</Text>
                </View>
                <RecordButton
                  recorder={recorder}
                  active={recKey === "s6"}
                  onPress={record6}
                  idleLabel="🎤 Hold to record"
                  btnStyle={{ borderRadius: 999, paddingHorizontal: 24 }}
                />
              </Enter>
            )}
            {st.s6_recorded && (
              <Enter style={[s.rowEnd, { gap: 10 }]}>
                <TouchableOpacity
                  onPress={() => playMyRecording("s6", st.s6_audioUri)}
                  style={s.sent}
                >
                  <Text style={s.sentTxt}>
                    ▶ {formatDuration(st.s6_audioSec)} - sent
                  </Text>
                </TouchableOpacity>
                <Pill
                  label={rotuloPublicacao("s6")}
                  onPress={() =>
                    publicarNaComunidade("s6", st.s6_audioUri, st.s6_audioSec)
                  }
                />
                <Pill label="↺ Re-record" onPress={() => reRecord("s6")} />
                <GreenBtn
                  label="Continue →"
                  onPress={goScene7}
                  style={{ height: 44, paddingHorizontal: 20 }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s6_pick && (
            <Dock>
              <GreenBtn
                label="🛂 Choose your nationality"
                onPress={() => up({ picker: "nat" })}
                style={{ width: "100%" }}
              />
            </Dock>
          )}
        </View>
      )}

      {/* SCENE 7 */}
      {st.scene === 7 && (
        <View style={{ flex: 1 }}>
          <Panel height={172} num={7} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>
                Thank you so much, {nm}! Just to make sure - could you please
                confirm your personal information?
              </WomanBubble>
            </Enter>
            {st.s7_shown && (
              <Enter axis="y">
                <View style={s.confirmCard}>
                  <ConfirmRow k="Name" v={st.name} />
                  <ConfirmRow k="Surname" v={st.surname} />
                  <ConfirmRow k="Age" v={`${st.age} years old`} />
                  <ConfirmRow
                    k="From"
                    v={
                      st.country ? `${st.country.flag} ${st.country.name}` : ""
                    }
                    last
                  />
                </View>
                <Text style={s.isRight}>Is that right?</Text>
                <GreenBtn
                  label="That's it! ✅"
                  onPress={goScene8}
                  big
                  style={{ width: "100%" }}
                />
              </Enter>
            )}
          </ScrollView>
        </View>
      )}

      {/* SCENE 8 */}
      {st.scene === 8 && (
        <View style={{ flex: 1 }}>
          <Panel height={172} num={8} onBack={goBack} />
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.chat}>
            <Enter axis="y" style={s.rowStart}>
              <WomanBubble>
                Thank you so much! Now it's your turn 🎤 Please present yourself
                - say your name, surname, age and where you're from.
              </WomanBubble>
              <View style={s.pillRow}>
                <Pill
                  label="🔊 Listen"
                  onPress={() =>
                    playClip(
                      "presentYourself",
                      "Now it's your turn. Please present yourself. Say your name, surname, age and where you're from.",
                    )
                  }
                />
                <Pill
                  label="🌐 Translate"
                  onPress={() => toggleTr("present")}
                />
              </View>
              {st.tr.present && (
                <Text style={s.trTxt}>
                  Agora é a sua vez! Apresente-se dizendo seu nome, sobrenome,
                  idade e de onde você é.
                </Text>
              )}
            </Enter>
            <Pill
              label="💡 See an example"
              primary
              onPress={() => up({ s8_example: !st.s8_example })}
            />
            {st.s8_example && (
              <Enter axis="y" style={s.exampleCard}>
                <Text style={s.exampleTxt}>
                  "Hi! My name's {st.name}. My surname is {st.surname}. I'm{" "}
                  {st.age} years old and I'm from{" "}
                  {st.country ? st.country.from : "..."}."
                </Text>
              </Enter>
            )}
            {st.s8_recorded && (
              <Enter style={{ alignItems: "center", gap: 12, marginTop: 6 }}>
                <TouchableOpacity
                  onPress={() => playMyRecording("s8", st.s8_audioUri)}
                  style={[s.sent, { paddingHorizontal: 18 }]}
                >
                  <Text style={s.sentTxt}>
                    ▶ Your presentation · {formatDuration(st.s8_audioSec)}
                  </Text>
                </TouchableOpacity>
                <Pill
                  label={rotuloPublicacao("s8")}
                  onPress={() =>
                    publicarNaComunidade("s8", st.s8_audioUri, st.s8_audioSec)
                  }
                />
                <Pill label="↺ Re-record" onPress={() => reRecord("s8")} />
                <GreenBtn
                  label="See your results →"
                  onPress={goFinal}
                  style={{ height: 48, paddingHorizontal: 24 }}
                />
              </Enter>
            )}
          </ScrollView>
          {st.s8_recBtn && (
            <Dock>
              <RecordButton
                recorder={recorder}
                active={recKey === "s8"}
                onPress={recordPresentation}
                idleLabel="🎤 Record your presentation"
                big
                btnStyle={{ width: "100%" }}
              />
              <Text style={[s.hint, { textAlign: "center", marginTop: 8 }]}>
                Speak clearly - take your time
              </Text>
            </Dock>
          )}
        </View>
      )}

      {/* SCENE 9 */}
      {st.scene === 9 && (
        <Enter style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 40 }}>
            <Text style={{ fontSize: 46, textAlign: "center" }}>🎉</Text>
            <Text style={s.lessonKicker}>LESSON COMPLETE</Text>
            <Text style={s.lessonTitle}>Today you learned</Text>
            <View style={{ gap: 12, marginTop: 20 }}>
              <RecapCard k="How to say your name" v={`My name's ${st.name}.`} />
              <RecapCard
                k="How to say your age"
                v={`I'm ${st.age} years old.`}
              />
              <RecapCard
                k="How to say where you're from"
                v={`I'm from ${st.country ? st.country.from : "..."}.`}
              />
            </View>
            <Text style={s.cheer}>
              You did great, {nm} - now let's keep it up! 💪
            </Text>
            <TouchableOpacity onPress={restart} style={s.restart}>
              <Text style={s.restartTxt}>↺ Start over</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goBack}
              style={[
                s.restart,
                {
                  marginTop: 10,
                  borderColor: C.green,
                  backgroundColor: C.green,
                },
              ]}
            >
              <Text style={[s.restartTxt, { color: "#fff" }]}>
                Voltar para o início
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Enter>
      )}
      </KeyboardAvoidingView>

      <TipModal
        visible={!!st.tip}
        title={st.tip?.title}
        items={st.tip?.items}
        example={st.tip?.example}
        warn={st.tip?.warn}
        onClose={closeTip}
      />
      <PickerSheet
        visible={!!st.picker}
        mode={st.picker}
        onPick={(c) => (st.picker === "nat" ? pickNat(c) : pickCountry(c))}
        onClose={() => up({ picker: null })}
      />
    </SafeAreaView>
  );
}

// ---------- tiny presentational helpers ----------
function Choice({ emoji, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.choice}>
      <View style={s.choiceIcon}>
        <Text style={{ fontSize: 20 }}>{emoji}</Text>
      </View>
      <Text style={s.choiceTxt}>{label}</Text>
    </TouchableOpacity>
  );
}
function RepeatChip({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.wideChip}>
      <Text style={[s.wideChipTxt, { textAlign: "left" }]}>{label}</Text>
    </TouchableOpacity>
  );
}
function InputDock({ prefix, placeholder, value, onChange, onSend }) {
  // plain View here, not Dock/Enter: this field autoFocuses, so the keyboard
  // opens the instant it mounts - animating a fade/slide-in at the same time
  // as the keyboard's own native show animation is what was causing the
  // "double motion" / ghosting look reported on Android
  return (
    <View style={s.dock}>
      <Text style={s.dockLabel}>Type your answer</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={s.inPrefix}>{prefix}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#b9bdb5"
          autoFocus
          style={[s.input, { flex: 1 }]}
          onSubmitEditing={onSend}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={onSend} style={s.sendBtn}>
          <Text style={s.sendTxt}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ConfirmRow({ k, v, last }) {
  return (
    <View style={[s.confirmRow, last && { borderBottomWidth: 0 }]}>
      <Text style={s.confirmK}>{k}</Text>
      <Text style={s.confirmV}>{v}</Text>
    </View>
  );
}
function RecapCard({ k, v }) {
  return (
    <View style={s.recap}>
      <Text style={s.recapK}>{k}</Text>
      <Text style={s.recapV}>{v}</Text>
    </View>
  );
}

// ---------- styles ----------
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  panelImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  backBtn: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  backBtnTxt: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: -2 },
  logo: {
    position: "absolute",
    top: 14,
    left: 52,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
  },
  step: {
    position: "absolute",
    top: 14,
    right: 18,
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
  },
  chat: { padding: 18, gap: 14, paddingBottom: 28 },
  rowStart: { alignItems: "flex-start", gap: 7 },
  rowEnd: { alignItems: "flex-end", gap: 7 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  womanBubble: {
    maxWidth: "86%",
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: "#ecece6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 6,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  bubbleTxt: { fontSize: 17, lineHeight: 23, color: C.ink },
  userBubble: {
    maxWidth: "86%",
    backgroundColor: C.green,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  userTxt: { fontSize: 17, lineHeight: 22, color: "#fff", fontWeight: "600" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: C.pill,
    borderWidth: 1,
    borderColor: C.border,
    alignSelf: "flex-start",
  },
  pillTxt: { fontSize: 13, fontWeight: "600", color: "#6b6f68" },
  pillPrimary: { backgroundColor: C.white, borderColor: "#d7e6dd" },
  pillPrimaryTxt: { color: C.greenDk, fontWeight: "700" },
  pillRow: { flexDirection: "row", gap: 8 },
  trTxt: { fontSize: 14, color: C.mut, fontStyle: "italic", paddingLeft: 4 },
  greenBtn: {
    height: 50,
    borderRadius: 16,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  greenBtnTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
  dock: {
    padding: 16,
    paddingBottom: 26,
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderColor: "#eceae4",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  dockLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9aa09a",
    marginBottom: 10,
  },
  dockQ: { fontSize: 14, fontWeight: "700", color: "#33372f", flex: 1 },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 13,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.white,
    marginBottom: 10,
  },
  choiceIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceTxt: { fontSize: 16, fontWeight: "700", color: C.ink },
  wideChip: {
    padding: 13,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: "#faf9f5",
    marginBottom: 9,
  },
  wideChipTxt: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6b6f68",
    textAlign: "center",
  },
  prompt: { fontSize: 15, fontWeight: "700", color: "#1c1e1b" },
  hint: { fontSize: 13, color: "#9aa09a" },
  sent: {
    backgroundColor: C.green,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  sentTxt: { color: "#fff", fontSize: 14, fontWeight: "700" },
  recWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: C.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "center",
    minWidth: 250,
  },
  recWrapBig: {
    alignSelf: "stretch",
    minWidth: undefined,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  recCircle: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  recCircleIcon: { fontSize: 22, color: "#fff" },
  recRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 2,
    borderColor: C.red,
  },
  recInfo: { flex: 1, gap: 4 },
  recIdleLabel: { color: C.ink, fontSize: 15, fontWeight: "600" },
  recTimer: {
    color: C.ink,
    fontSize: 16,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  waveRow: { flexDirection: "row", alignItems: "center", gap: 3, height: 26 },
  waveBar: { width: 3, borderRadius: 2, backgroundColor: C.red },
  tapContinue: {
    alignSelf: "center",
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cfd3cc",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  tapContinueTxt: { color: "#9aa09a", fontSize: 13, fontWeight: "700" },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#e2e1db",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 18,
    fontWeight: "600",
    color: C.ink,
    backgroundColor: "#f7f6f2",
  },
  inPrefix: { fontSize: 17, fontWeight: "700", color: C.ink },
  sendBtn: {
    height: 50,
    width: 50,
    marginLeft: "auto",
    borderRadius: 14,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
  },
  sendTxt: { color: "#fff", fontSize: 20 },
  geoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.white,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  geoName: { fontSize: 18, fontWeight: "800", color: C.ink },
  geoHint: { fontSize: 12, color: "#9aa09a" },
  sayBox: {
    backgroundColor: C.tint,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  sayTxt: { fontSize: 18, fontWeight: "700", color: C.greenDk },
  confirmCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: "#eceae4",
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  confirmRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#f0efe9",
  },
  confirmK: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9aa09a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  confirmV: { fontSize: 17, fontWeight: "700", color: C.ink },
  isRight: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: C.mut,
    marginVertical: 14,
  },
  exampleCard: {
    backgroundColor: "#fff6e0",
    borderWidth: 1,
    borderColor: "#f2e4bd",
    borderRadius: 18,
    padding: 16,
  },
  exampleTxt: { fontSize: 16, lineHeight: 25, color: "#5a4a1e" },
  lessonKicker: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    color: C.green,
    marginTop: 6,
  },
  lessonTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
    color: C.ink,
    marginTop: 6,
  },
  recap: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: "#eceae4",
    borderRadius: 18,
    padding: 16,
  },
  recapK: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9aa09a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  recapV: { fontSize: 19, fontWeight: "700", color: C.ink },
  cheer: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: C.ink,
    marginTop: 24,
  },
  restart: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#d7e6dd",
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  restartTxt: { color: C.greenDk, fontSize: 16, fontWeight: "700" },
  // scene 1
  s1brand: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#fff",
  },
  s1title: {
    fontSize: 40,
    lineHeight: 42,
    fontWeight: "800",
    color: "#fff",
    marginTop: 14,
  },
  s1sub: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255,255,255,0.92)",
    marginTop: 12,
    maxWidth: 300,
  },
  // modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(28,30,27,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 26,
  },
  tipCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 24,
    alignItems: "center",
  },
  lamp: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#fff6e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: C.ink,
    marginBottom: 16,
    textAlign: "center",
  },
  tipRow: {
    backgroundColor: "#f6f5f1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: "100%",
  },
  tipRowTxt: { fontSize: 15, fontWeight: "600", color: "#33372f" },
  tipWarn: {
    marginTop: 10,
    backgroundColor: "#fdecea",
    borderWidth: 1,
    borderColor: "#f6c9c2",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: "100%",
  },
  tipWarnTxt: {
    fontSize: 15,
    fontWeight: "700",
    color: C.red,
    textAlign: "center",
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(28,30,27,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 18,
    paddingBottom: 28,
    maxHeight: "74%",
  },
  sheetHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sheetTitle: { fontSize: 18, fontWeight: "800", color: C.ink },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: C.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  gridLabel: { fontSize: 15, fontWeight: "700", color: C.ink, flexShrink: 1 },
});
