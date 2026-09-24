// Rotulo legivel para o `tipo_exercicio` salvo em /progresso/erros — o valor
// gravado e o nome do componente do slide (ver LessonScreen.js), entao aqui
// so traduzimos isso para o que o aluno ve no chip do card de erro.
//
// Os rotulos vieram do `prompt` que cada exercicio usa nas aulas. Tipo sem
// entrada (ou tipo novo) devolve null e a tela simplesmente esconde o chip,
// em vez de mostrar "Exercise14" para o usuario.
const EXERCISE_TYPE_LABELS = {
  Exercise3: "escutar e responder",
  Exercise4: "corrigir frase",
  Exercise5: "completar frase",
  Exercise6: "ordenar palavras",
  Exercise8: "escolher a palavra",
  Exercise9: "escolher a imagem",
  Exercise11: "escrita rápida",
  Exercise12: "escrita",
  Exercise13: "montar palavra",
  Exercise14: "escutar e completar",
  Exercise15: "ligar pares",
  Exercise16: "fala",
  Exercise18: "ordenar frase",
  Exercise19: "ditado",
  Exercise20: "verdadeiro ou falso",
};

export function getExerciseTypeLabel(tipo) {
  if (!tipo) return null;
  return EXERCISE_TYPE_LABELS[tipo] || null;
}

export default EXERCISE_TYPE_LABELS;
