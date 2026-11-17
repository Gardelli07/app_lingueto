// Regras das telas de modulo (temas -> aulas do tema), usadas pela Viagem
// (My Trip to Florida) e pelo Business (Marketing).

// Aulas do tema (com conteudo + SOON).
export const classCount = (topic) => topic.lessons.length + topic.upcoming.length;

export const MEDALS = [
  { name: "", color: "#2a3147", deep: "#1e2436" },
  { name: "Bronze", color: "#cd7f32", deep: "#8a4f1c" },
  { name: "Prata", color: "#c3cbdc", deep: "#7d879c" },
  { name: "Ouro", color: "#ffc14d", deep: "#b07a12" },
];

// Gold Rush: as aulas do tema em tercos (bronze, prata, ouro). Conta pelo menos
// 3 aulas, para uma aula feita nao pular direto para uma medalha.
// `progress` e o mapa do LessonScreen (id da aula -> true).
export function goldRush(topic, progress) {
  const total = Math.max(classCount(topic), 3);
  const per = Math.ceil(total / 3);
  const done = topic.lessons.filter((lesson) => progress[lesson.id]).length;
  const tier = Math.min(3, Math.floor(done / per));
  const left = tier < 3 ? (tier + 1) * per - done : 0;
  const segments = [0, 1, 2].map((i) => Math.max(0, Math.min(1, (done - i * per) / per)));
  return { total, per, done, tier, left, segments };
}
