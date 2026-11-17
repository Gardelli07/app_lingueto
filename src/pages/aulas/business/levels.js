// Niveis do Business, do mais basico ao mais avancado (mesmo molde do Story
// Mode, ver ../storymode/levels.js). `appLevel` e o nivel do app
// (LEVEL_OPTIONS em src/util/courseCatalog.js) que abre cada um: o tile da
// Home abre o nivel do aluno, e a tela do curso troca entre eles.
export const BUSINESS_LEVELS = [
  { label: "A0-A1", routeName: "Business", appLevel: "Starter" },
  { label: "A2", routeName: "BusinessA2", appLevel: "Elementary" },
];

// Rota do Business para o nivel do app: o nivel dele, ou o mais alto que o
// Business ja tem abaixo dele. `levelOrder` e LEVEL_OPTIONS.
export function businessRouteForLevel(appLevel, levelOrder) {
  const rank = levelOrder.indexOf(appLevel);
  let route = BUSINESS_LEVELS[0].routeName;
  for (const level of BUSINESS_LEVELS) {
    if (levelOrder.indexOf(level.appLevel) <= rank) route = level.routeName;
  }
  return route;
}
