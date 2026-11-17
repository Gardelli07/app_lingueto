import React from "react";
import { PairsExercise } from "./pronunciation/PairsExercise";

// Pronunciation Lab, etapa 4 (Minimal pairs): ouvir a palavra e escolher
// entre o par (THINK / TINK). Campos em PairsExercise.
export function Exercise37(props) {
  return <PairsExercise {...props} />;
}

// Layout proprio (safe area e rodape fixo): o LessonScreen nao embrulha esse
// slide no ScrollView nem aplica a safe area por fora.
Exercise37.fullScreen = true;
