import React from "react";
import GrammarLabHome from "../../grammarlab/GrammarLabHome";
import { BUSINESS_STORAGE_KEY } from "../storage";
import {
  marketingLessons,
  lessonScreens as marketingLessonScreens,
} from "../marketing";

// Curso Business (tile da Home), no visual do Grammar Lab igual a Viagem: cada
// modulo e uma area da empresa e um botao (`routeName`) que abre a pagina
// dele, com as temporadas e as aulas. Nao confundir com o "Bussines English"
// antigo (pasta ../../bussines), que continua no seletor de cursos.
// Sem seletor de nivel (decisao do usuario); a tela BusinessA2 vazia continua
// registrada, mas o tile nao abre mais ela.
export { BUSINESS_STORAGE_KEY };
export const BUSINESS_COURSE_NAME = "Business";

export const businessModuleDefs = [
  {
    id: 0,
    name: "Marketing",
    subtitle: "The Marketing Job",
    level: "A1",
    routeName: "MarketingTopics",
    locked: false,
    accent: "#5B6EF5",
    icon: "check",
  },
];

export const businessLevels = [{ code: "A1", name: "Básico" }];

// Todas as aulas dos modulos (o `module` de cada uma e o id em businessModuleDefs).
export const businessSampleLessons = [...marketingLessons];

export const lessonScreens = {
  ...marketingLessonScreens,
};

export default function BusinessScreen(props) {
  return (
    <GrammarLabHome
      {...props}
      courseName={BUSINESS_COURSE_NAME}
      kicker="INGLÊS PARA NEGÓCIOS"
      showDailyGoals={false}
      storageKey={BUSINESS_STORAGE_KEY}
      moduleDefs={businessModuleDefs}
      lessons={businessSampleLessons}
      levels={businessLevels}
    />
  );
}
