import React from "react";
import { BusinessSlide } from "./business/BusinessSlide";

// Business: historia em partes, cada uma seguida dos seus exercicios (choice,
// build, listen, match e type, do Grammar Lab), com o pop-up e a segunda
// chance do Story Mode. A aula inteira e um slide so.
//
// activity: title, parts ([{ title, imageDescription, image?, audioSource?,
// blocks }]), glossary (expressoes em verde), dictionary e questions (cada uma
// com `part`, `type`, os campos do tipo e hint / explanation / correction).
// Modelo: src/pages/aulas/business/A0-A1/Mkt01.js.
export function Exercise33(props) {
  return <BusinessSlide {...props} />;
}

// Layout proprio (safe area e pop-up fixo no rodape): o LessonScreen nao
// embrulha esse slide no ScrollView nem aplica a safe area por fora.
Exercise33.fullScreen = true;
