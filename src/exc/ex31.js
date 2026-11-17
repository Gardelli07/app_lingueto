import React from "react";
import { ListeningSlide } from "./listening/ListeningSlide";

// Velocidade real (Listening). Cada pergunta: normal, real, options,
// correctAnswer e reductions; opcionais: audioSource (normal),
// audioSourceReal, explanation, correction, hint e instruction.
export function Exercise31(props) {
  return <ListeningSlide type="realspeed" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise31.fullScreen = true;
