import { createAudioPlayer } from "expo-audio";

// Sons padrao de acerto e erro de todas as atividades (LessonScreen, Aulas
// Plus). Vem do pacote do combo do Grammar Lab: o correct_5 e o meio da
// escada de acertos. O Grammar Lab toca a escada inteira por conta propria
// (src/exc/grammarlab/feedback.js).
const CORRECT_SOURCE = require("../../assets/sounds/combo/correct_5.wav");
const WRONG_SOURCE = require("../../assets/sounds/combo/wrong.wav");

// Um player de cada, criado no primeiro uso e reaproveitado no app todo.
const players = {};

function play(key, source) {
  try {
    if (!players[key]) players[key] = createAudioPlayer(source);
    const player = players[key];
    player.seekTo(0);
    player.play();
  } catch {
    // Falha ao tocar o som nao deve interromper a licao.
  }
}

export function playCorrectSound() {
  play("correct", CORRECT_SOURCE);
}

export function playWrongSound() {
  play("wrong", WRONG_SOURCE);
}
