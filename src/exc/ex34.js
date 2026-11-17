import React from "react";
import { DiscoverExercise } from "./pronunciation/DiscoverExercise";

// Pronunciation Lab, etapa 1 (Discover the sound): ouvir dois audios da mesma
// palavra e dizer se soam igual. Campos em DiscoverExercise.
export function Exercise34(props) {
  return <DiscoverExercise {...props} />;
}

// Layout proprio (safe area e rodape fixo): o LessonScreen nao embrulha esse
// slide no ScrollView nem aplica a safe area por fora.
Exercise34.fullScreen = true;
