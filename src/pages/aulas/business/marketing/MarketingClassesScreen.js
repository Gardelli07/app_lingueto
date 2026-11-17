import React from "react";
import ModuleClassesScreen from "../../modules/ModuleClassesScreen";
import { MARKETING_COURSE } from "./index";

// Aulas de uma temporada do Marketing (rota MarketingClasses).
export default function MarketingClassesScreen(props) {
  return <ModuleClassesScreen {...props} course={MARKETING_COURSE} />;
}
