import React from "react";
import { PracticeExercise } from "./pronunciation/PracticeExercise";

// Pronunciation Lab, etapa 3 (Sound practice): palavras para ouvir, gravar,
// enviar para a comunidade ou pedir feedback instantaneo (Premium). Campos em
// PracticeExercise. O Exercise38 e a mesma pratica com frases.
export function Exercise36(props) {
  return <PracticeExercise variant="word" {...props} />;
}

// Layout proprio (safe area e rodape fixo): o LessonScreen nao embrulha esse
// slide no ScrollView nem aplica a safe area por fora.
Exercise36.fullScreen = true;
