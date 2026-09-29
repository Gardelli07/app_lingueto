// Codigos alinhados com a tabela `planos` do backend
// (banco/BANCO_API_SCHEMA_MYSQL_PT_v2.sql). O `plano` do usuario e definido
// pelo AuthContext a partir do GET /assinaturas/minha do backend.
export const PLAN_FREE = "gratuito";
export const PLAN_FULL_ACCESS = "base";

export function getUserPlan(user) {
  return user?.plano || PLAN_FREE;
}

export function hasFullAccess(user) {
  return getUserPlan(user) === PLAN_FULL_ACCESS;
}
