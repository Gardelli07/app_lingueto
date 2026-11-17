import React from "react";
import { PracticeExercise } from "./pronunciation/PracticeExercise";

// Pronunciation Lab, etapa 5 (Sentence practice): frases para ouvir, gravar,
// enviar para a comunidade ou pedir feedback instantaneo (Premium). Campos em
// PracticeExercise. O Exercise36 e a mesma pratica com palavras.
export function Exercise38(props) {
  return <PracticeExercise variant="sentence" {...props} />;
}

// Layout proprio (safe area e rodape fixo): o LessonScreen nao embrulha esse
// slide no ScrollView nem aplica a safe area por fora.
Exercise38.fullScreen = true;
