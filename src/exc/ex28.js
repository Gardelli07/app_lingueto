import React from "react";
import { ListeningSlide } from "./listening/ListeningSlide";

// Dialogo (Listening). Cada pergunta: question, lines ({ who, speaker, text
// }), options e correctAnswer; opcionais: variant "situation", audioSource,
// explanation, correction, hint e instruction.
export function Exercise28(props) {
  return <ListeningSlide type="dialogue" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise28.fullScreen = true;
