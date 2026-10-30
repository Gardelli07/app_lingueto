import React from "react";
import { ComboSlide } from "./grammarlab/ComboSlide";

// Montar a frase (Grammar Lab). Cada pergunta: prompt (frase em portugues),
// answer (palavras em ingles, na ordem) e bank (todas as fichas, com
// distratoras); opcionais: correction, hint e instruction. O combo, o XP e as
// telas de x5/x10 sao do ComboSlide e continuam de um exercicio do Grammar
// Lab para o outro na mesma aula.
export function Exercise24(props) {
  return <ComboSlide type="build" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise24.fullScreen = true;
