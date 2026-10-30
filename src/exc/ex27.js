import React from "react";
import { ComboSlide } from "./grammarlab/ComboSlide";

// Digitar a resposta (Grammar Lab). Cada pergunta: before, after e answer
// (comparado sem diferenciar maiusculas nem espacos sobrando); opcionais:
// correction, hint e instruction. O combo, o XP e as telas de x5/x10 sao do
// ComboSlide e continuam de um exercicio do Grammar Lab para o outro na
// mesma aula.
export function Exercise27(props) {
  return <ComboSlide type="type" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise27.fullScreen = true;
