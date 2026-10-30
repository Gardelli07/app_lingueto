import React from "react";
import { ComboSlide } from "./grammarlab/ComboSlide";

// Ligar os pares (Grammar Lab). Cada pergunta: pairs ([ingles, portugues]) e
// rightOrder (ordem em que a coluna da direita aparece); um par errado
// encerra a pergunta. Opcionais: correction, hint e instruction. O combo, o
// XP e as telas de x5/x10 sao do ComboSlide e continuam de um exercicio do
// Grammar Lab para o outro na mesma aula.
export function Exercise26(props) {
  return <ComboSlide type="match" {...props} />;
}

// Layout proprio (safe area e painel fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise26.fullScreen = true;
