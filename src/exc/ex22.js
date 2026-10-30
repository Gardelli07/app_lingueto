import React from "react";
import { ComboSlide } from "./grammarlab/ComboSlide";

// Completar a lacuna (Grammar Lab). Cada pergunta: before, after, options e
// correctAnswer; opcionais: correction (no erro, aceita **destaque**), hint e
// instruction. O combo, o XP e as telas de x5/x10 sao do ComboSlide e
// continuam de um exercicio do Grammar Lab para o outro na mesma aula.
export function Exercise22(props) {
  return <ComboSlide type="choice" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise22.fullScreen = true;
