import { useCallback, useEffect, useRef, useState } from "react";
import {
  createAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { speakSentence, stopSpeaking } from "../grammarlab/feedback";

const MAX_RECORDING_MS = 10_000;

// Pratica livre de voz do Pronunciation Lab: a voz de referencia (audio gravado
// em `source` ou a voz do celular), gravar a voz do aluno (ate 10 s) e ouvir a
// gravacao. A gravacao fica no aparelho; so sai quando o aluno envia para a
// comunidade. `recs[key]` guarda { uri, seconds, at } de cada palavra/frase.
export function useVoicePractice() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [recs, setRecs] = useState({});
  const [recKey, setRecKey] = useState(null);
  const [speaking, setSpeaking] = useState("");
  const [error, setError] = useState("");
  const player = useRef(null);
  const timer = useRef(null);
  const recKeyRef = useRef(null);
  const recStartRef = useRef(0);
  const alive = useRef(true);

  const stopPlayback = useCallback(() => {
    if (player.current) {
      try {
        player.current.remove();
      } catch {}
      player.current = null;
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const key = recKeyRef.current;
    if (!key) return;
    recKeyRef.current = null;
    try {
      await recorder.stop();
    } catch {}
    try {
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
    } catch {}
    let uri = recorder.uri;
    try {
      uri = uri ?? recorder.getStatus().url;
    } catch {}
    const seconds = Math.max(1, Math.round((Date.now() - recStartRef.current) / 1000));
    if (!alive.current) return;
    setRecKey(null);
    // `at` identifica a gravacao (o gravador pode reusar o mesmo arquivo).
    if (uri) setRecs((current) => ({ ...current, [key]: { uri, seconds, at: Date.now() } }));
  }, [recorder]);

  // Para tudo que estiver tocando ou gravando.
  const stopAll = useCallback(() => {
    stopSpeaking();
    stopPlayback();
    stopRecording();
    setSpeaking("");
  }, [stopPlayback, stopRecording]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopSpeaking();
      stopPlayback();
      if (timer.current) clearTimeout(timer.current);
      if (recKeyRef.current) recorder.stop().catch(() => {});
    };
  }, [recorder, stopPlayback]);

  // `rate` e a velocidade da voz do celular (1 = natural).
  const speak = useCallback(
    (text, key, { rate = 0.85, source } = {}) => {
      stopPlayback();
      if (recKeyRef.current) return;
      speakSentence(text, false, {
        source,
        rate,
        onStart: () => alive.current && setSpeaking(key),
        onEnd: () => {
          if (!alive.current) return;
          setSpeaking((current) => (current === key ? "" : current));
        },
      });
    },
    [stopPlayback],
  );

  const toggleRecording = useCallback(
    async (key) => {
      if (recKeyRef.current) {
        await stopRecording();
        return;
      }
      stopSpeaking();
      stopPlayback();
      setSpeaking("");
      setError("");
      try {
        const permission = await requestRecordingPermissionsAsync();
        if (!permission.granted) {
          setError("Permita o microfone nas configurações para gravar sua voz.");
          return;
        }
        await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
        await recorder.prepareToRecordAsync();
        recorder.record();
        recKeyRef.current = key;
        recStartRef.current = Date.now();
        setRecKey(key);
        timer.current = setTimeout(() => stopRecording(), MAX_RECORDING_MS);
      } catch {
        recKeyRef.current = null;
        setRecKey(null);
        setError("Não foi possível usar o microfone agora. Tente de novo.");
      }
    },
    [recorder, stopPlayback, stopRecording],
  );

  const playRecording = useCallback(
    (key) => {
      const uri = recs[key]?.uri;
      if (!uri || recKeyRef.current) return;
      stopSpeaking();
      stopPlayback();
      try {
        const p = createAudioPlayer(uri);
        player.current = p;
        setSpeaking("mine");
        p.addListener("playbackStatusUpdate", (status) => {
          if (status.didJustFinish && player.current === p) {
            stopPlayback();
            if (alive.current) setSpeaking("");
          }
        });
        p.play();
      } catch {
        setSpeaking("");
      }
    },
    [recs, stopPlayback],
  );

  return { recs, recKey, speaking, error, setError, speak, toggleRecording, playRecording, stopAll };
}
