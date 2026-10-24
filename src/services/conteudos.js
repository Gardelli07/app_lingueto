import api from "./api";

let cachedCursosPromise = null;

function fetchCursos() {
  if (!cachedCursosPromise) {
    cachedCursosPromise = api
      .get("/conteudos", { authenticated: false })
      .catch((error) => {
        cachedCursosPromise = null;
        throw error;
      });
  }
  return cachedCursosPromise;
}

function forEachAula(cursos, callback) {
  for (const curso of cursos || []) {
    for (const nivel of curso.niveis || []) {
      for (const modulo of nivel.modulos || []) {
        for (const aula of modulo.aulas || []) {
          if (aula.nome_tela) callback(aula);
        }
      }
    }
  }
}

function buildAccessMap(cursos) {
  const map = {};
  forEachAula(cursos, (aula) => {
    map[aula.nome_tela] = !!aula.gratuita;
  });
  return map;
}

function buildConteudoMaps(cursos) {
  const idPorTela = {};
  const telaPorId = {};
  forEachAula(cursos, (aula) => {
    idPorTela[aula.nome_tela] = String(aula.id);
    telaPorId[String(aula.id)] = aula.nome_tela;
  });
  return { idPorTela, telaPorId };
}

export function fetchAulaAccessMap() {
  return fetchCursos().then(buildAccessMap);
}

// O conteudo_id de cada aula sai do banco pelo nome da tela (`lesson.screen`
// = nome_tela). O `lesson.id` dos cursos no app recomeca em "1" em cada
// curso, entao nao serve como conteudo_id.
export function fetchConteudoMaps() {
  return fetchCursos().then(buildConteudoMaps);
}

export async function getConteudoIdDaTela(screen) {
  if (!screen) return null;
  const { idPorTela } = await fetchConteudoMaps();
  return idPorTela[screen] ?? null;
}
