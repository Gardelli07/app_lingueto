// Niveis do Story Mode, do mais basico ao mais avancado. `appLevel` e o
// nivel do app (LEVEL_OPTIONS em src/util/courseCatalog.js) que abre cada um:
// o tile da Home abre o nivel do aluno, e a tela do curso troca entre eles.
// Sem dependencias de proposito: o courseCatalog importa os indices do Story
// Mode, e isso aqui e lido pelos dois lados.
export const STORY_MODE_LEVELS = [
  { label: "A0-A1", routeName: "StoryMode", appLevel: "Starter" },
  { label: "A2", routeName: "StoryModeA2", appLevel: "Elementary" },
];

// Rota do Story Mode para o nivel do app: o nivel dele, ou o mais alto que o
// Story Mode ja tem abaixo dele (um aluno B1 cai no A2). `levelOrder` e a
// lista de niveis do app em ordem (LEVEL_OPTIONS).
export function storyModeRouteForLevel(appLevel, levelOrder) {
  const rank = levelOrder.indexOf(appLevel);
  let route = STORY_MODE_LEVELS[0].routeName;
  for (const level of STORY_MODE_LEVELS) {
    if (levelOrder.indexOf(level.appLevel) <= rank) route = level.routeName;
  }
  return route;
}
