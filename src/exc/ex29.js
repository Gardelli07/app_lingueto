import React from "react";
import { ListeningSlide } from "./listening/ListeningSlide";

// Pegar a palavra (Listening). Cada pergunta: say, transcript (**palavra**
// destaca), options e correctAnswer; opcionais: audioSource, explanation,
// correction, hint e instruction.
export function Exercise29(props) {
  return <ListeningSlide type="catch" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise29.fullScreen = true;
