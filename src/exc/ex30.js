import React from "react";
import { ListeningSlide } from "./listening/ListeningSlide";

// Completar a conversa (Listening). Cada pergunta: say, friend, options e
// correctAnswer; opcionais: audioSource, explanation, correction, hint e
// instruction.
export function Exercise30(props) {
  return <ListeningSlide type="reply" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise30.fullScreen = true;
