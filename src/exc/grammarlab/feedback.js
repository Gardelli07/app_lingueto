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
function tap(ms) {
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

// Le a frase em ingles do exercicio de ouvir (devagar no botao 0.5x).
export function speakSentence(text, slow, { onStart, onEnd } = {}) {
  Speech.stop()
    .catch(() => {})
    .finally(() => {
      Speech.speak(text, {
        language: "en-US",
        rate: slow ? 0.55 : 0.9,
        onStart,
        onDone: onEnd,
        onStopped: onEnd,
        onError: () => onEnd?.(),
      });
    });
}

export function stopSpeaking() {
  Speech.stop().catch(() => {});
}
