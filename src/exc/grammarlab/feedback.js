import { Platform, Vibration } from "react-native";
import { createAudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";

// Sons pre-gravados: o correct_N fica mais cheio conforme o combo cresce.
const CORRECT_SOURCES = [
  require("../../../assets/sounds/combo/correct_1.wav"),
  require("../../../assets/sounds/combo/correct_2.wav"),
  require("../../../assets/sounds/combo/correct_3.wav"),
  require("../../../assets/sounds/combo/correct_4.wav"),
  require("../../../assets/sounds/combo/correct_5.wav"),
  require("../../../assets/sounds/combo/correct_6.wav"),
  require("../../../assets/sounds/combo/correct_7.wav"),
  require("../../../assets/sounds/combo/correct_8.wav"),
  require("../../../assets/sounds/combo/correct_9.wav"),
  require("../../../assets/sounds/combo/correct_10.wav"),
];
const FANFARE_SOURCE = require("../../../assets/sounds/combo/fanfare.wav");
const WRONG_SOURCE = require("../../../assets/sounds/combo/wrong.wav");
const TICK_SOURCE = require("../../../assets/sounds/combo/tick.wav");
const UNTICK_SOURCE = require("../../../assets/sounds/combo/untick.wav");
const PAIR_SOURCES = [
  require("../../../assets/sounds/combo/pair_1.wav"),
  require("../../../assets/sounds/combo/pair_2.wav"),
  require("../../../assets/sounds/combo/pair_3.wav"),
];

// Um player por som, criado no primeiro uso e reaproveitado no app todo (o
// mesmo padrao de src/util/answerSounds.js). Antes cada slide criava os 17
// de uma vez e destruia ao sair; como sao compartilhados, o slide que saia
// podia destruir os players que o proximo ja estava usando, e os sons
// sumiam nas aulas com varios slides.
const players = {};

function replay(source) {
  try {
    if (!players[source]) players[source] = createAudioPlayer(source);
    const player = players[source];
    player.seekTo(0);
    player.play();
  } catch {
    // Falha ao tocar o som nao deve interromper a licao.
  }
}

// Vibracao com a API do proprio RN (sem expo-haptics, que pede dev client
// novo). No iOS a duracao e fixa (~400ms), entao os toques curtos (acerto,
// clique, par) so vibram no Android; o erro vibra nos dois.
export function tap(ms) {
  if (Platform.OS === "android") Vibration.vibrate(ms);
}

export function playCorrect(combo) {
  tap(30);
  replay(CORRECT_SOURCES[Math.min(Math.max(combo, 1), 10) - 1]);
  if (combo === 5 || combo === 10) {
    setTimeout(() => replay(FANFARE_SOURCE), 450);
  }
}

export function playWrong() {
  Vibration.vibrate(140);
  replay(WRONG_SOURCE);
}

// Clique suave ao por/tirar palavras e ao escolher um card dos pares.
export function playTick(kind = "add") {
  tap(10);
  replay(kind === "add" ? TICK_SOURCE : UNTICK_SOURCE);
}

// Som de par certo nos pares (n = pares achados ate agora).
export function playPair(n) {
  tap(15);
  replay(PAIR_SOURCES[Math.min(Math.max(n, 1), 3) - 1]);
}

// Audio gravado da frase que esta tocando. Diferente dos sons acima, cada frase
// so toca nesta pergunta, entao o player e criado na hora e solto ao parar.
let sentence = null;

function stopSentence() {
  if (!sentence) return;
  const { player, subscription, onEnd } = sentence;
  sentence = null;
  try {
    subscription.remove();
    // No Android o que solta o player nativo e o release(); o pause() antes
    // corta o som na hora (mesma regra do useStoryAudio).
    player.pause();
    player.release();
  } catch {
    // Falha ao parar o som nao deve interromper a licao.
  }
  onEnd?.();
}

function playSentence(source, slow, { onStart, onEnd }) {
  const player = createAudioPlayer(source);
  const current = { player, onEnd };
  current.subscription = player.addListener("playbackStatusUpdate", (status) => {
    if (!status?.didJustFinish || sentence !== current) return;
    // O player fica para o proximo stopSentence: aqui so avisa que acabou.
    current.onEnd = null;
    onEnd?.();
  });
  sentence = current;
  if (slow) {
    player.shouldCorrectPitch = true;
    player.setPlaybackRate(0.5, "high");
  }
  player.play();
  onStart?.();
}

// Toca a frase em ingles do exercicio de ouvir (devagar no botao 0.5x): o audio
// gravado da pergunta (`source`) ou, sem ele, a voz do celular lendo o texto.
// `rate` troca a velocidade da voz do celular (a velocidade real do Listening).
export function speakSentence(text, slow, { source, rate, onStart, onEnd } = {}) {
  stopSentence();
  if (source) {
    try {
      playSentence(source, slow, { onStart, onEnd });
      return;
    } catch {
      stopSentence();
    }
  }
  Speech.stop()
    .catch(() => {})
    .finally(() => {
      Speech.speak(text, {
        language: "en-US",
        rate: rate ?? (slow ? 0.55 : 0.9),
        onStart,
        onDone: onEnd,
        onStopped: onEnd,
        onError: () => onEnd?.(),
      });
    });
}

// Duas vozes em ingles para os dialogos. Vozes "network" do Android falham sem
// internet (a fala sumiria), entao so entram se nao houver nenhuma local. Sem
// vozes, a diferenca entre as pessoas fica so no tom.
let voicePool = null;
async function englishVoices() {
  if (voicePool) return voicePool;
  try {
    const all = await Speech.getAvailableVoicesAsync();
    const english = all.filter((voice) => /^en[-_]/i.test(voice.language));
    const local = english.filter((voice) => !/network/i.test(voice.identifier));
    const usable = local.length > 0 ? local : english;
    const american = usable.filter((voice) => /US/i.test(voice.language));
    voicePool = (american.length >= 2 ? american : usable).map((voice) => voice.identifier);
  } catch {
    voicePool = [];
  }
  return voicePool;
}

let lineRun = 0;

// Toca a conversa inteira como um audio so: o gravado (`source`) ou as falas em
// sequencia, com uma voz para cada pessoa (line.speaker 0 ou 1).
export function speakLines(lines, slow, { source, onStart, onEnd } = {}) {
  stopSentence();
  const run = ++lineRun;
  if (source) {
    try {
      playSentence(source, slow, { onStart, onEnd });
      return;
    } catch {
      stopSentence();
    }
  }
  onStart?.();
  Speech.stop()
    .catch(() => {})
    .finally(async () => {
      const voices = await englishVoices();
      const say = (index) => {
        if (run !== lineRun) return;
        if (index >= lines.length) {
          onEnd?.();
          return;
        }
        const line = lines[index];
        Speech.speak(line.text, {
          language: "en-US",
          voice: voices.length ? voices[Math.min(line.speaker, voices.length - 1)] : undefined,
          pitch: line.speaker === 1 ? 1.2 : 0.95,
          rate: slow ? 0.55 : 0.9,
          onDone: () => say(index + 1),
          onStopped: () => {
            if (run === lineRun) onEnd?.();
          },
          onError: () => say(index + 1),
        });
      };
      say(0);
    });
}

export function stopSpeaking() {
  stopSentence();
  lineRun++;
  Speech.stop().catch(() => {});
}
