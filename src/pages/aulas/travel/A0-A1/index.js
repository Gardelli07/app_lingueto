import React from "react";
import GrammarLabHome from "../../grammarlab/GrammarLabHome";
import { TRAVEL_STORAGE_KEY } from "../storage";
import {
  floridaLessons,
  lessonScreens as floridaLessonScreens,
} from "../florida";

// Curso Viagem novo (tile da Home), no visual do Grammar Lab. Nao confundir
// com o "Ingles para viagem" antigo (pasta ../../viagem, rota TravelEnglish),
// que ainda nao deve aparecer pelo tile.
export { TRAVEL_STORAGE_KEY };
export const TRAVEL_NEW_COURSE_NAME = "Viagem";

// Como no Business, cada modulo e um botao (`routeName`) que abre a pagina
// dele, com os temas e as aulas de verdade. `glyph` e o simbolo curto do card
// e `level` o nivel (travelLevels) em que aparece.
export const travelModuleDefs = [
  {
    id: 0,
    name: "My Trip to Florida",
    subtitle: "Temas da viagem para a Flórida",
    glyph: "FL",
    level: "A1",
    routeName: "FloridaTopics",
    locked: false,
    accent: "#6d7cff",
    icon: "check",
  },
];

export const travelLevels = [{ code: "A1", name: "Básico" }];

// Topicos sem aulas ainda: aparecem bloqueados como "Em breve". Ao criar as
// aulas de um deles, mova-o para travelModuleDefs (com um id).
export const travelUpcomingTopics = [];

// Todas as aulas dos modulos (o `module` de cada uma e o id em travelModuleDefs).
export const travelLessons = [...floridaLessons];

export const lessonScreens = {
  ...floridaLessonScreens,
};

export default function TravelScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={TRAVEL_NEW_COURSE_NAME}
      kicker="INGLÊS PARA VIAGEM"
      showDailyGoals={false}
      storageKey={TRAVEL_STORAGE_KEY}
      moduleDefs={travelModuleDefs}
      lessons={travelLessons}
      levels={travelLevels}
      upcomingTopics={travelUpcomingTopics}
    />
  );
}
