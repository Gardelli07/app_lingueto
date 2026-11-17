import React from "react";
import { ListeningSlide } from "./listening/ListeningSlide";

// O que disseram (Listening). Cada pergunta: say, options e correctAnswer;
// opcionais: kicker, title, audioSource, explanation, correction, hint e
// instruction. O Exercise25 e a versao com combo, do Grammar Lab.
export function Exercise32(props) {
  return <ListeningSlide type="listen" {...props} />;
}

// Layout proprio (safe area e pop-up fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise32.fullScreen = true;
