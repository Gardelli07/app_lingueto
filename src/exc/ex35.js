import React from "react";
import { UnderstandExercise } from "./pronunciation/UnderstandExercise";

// Pronunciation Lab, etapa 2 (Understand the sound): ilustracao da boca,
// passos e dica. Sem pergunta. Campos em UnderstandExercise.
export function Exercise35(props) {
  return <UnderstandExercise {...props} />;
}

// Layout proprio (safe area e rodape fixo): o LessonScreen nao embrulha esse
// slide no ScrollView nem aplica a safe area por fora.
Exercise35.fullScreen = true;
