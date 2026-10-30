import React from "react";
import { ComboSlide } from "./grammarlab/ComboSlide";

// Ouvir (Grammar Lab). Cada pergunta: say (frase em ingles, lida em voz alta
// ao aparecer e no botao), options e correctAnswer; opcionais: correction,
// hint e instruction. O combo, o XP e as telas de x5/x10 sao do ComboSlide e
// continuam de um exercicio do Grammar Lab para o outro na mesma aula.
export function Exercise25(props) {
  return <ComboSlide type="listen" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise25.fullScreen = true;
