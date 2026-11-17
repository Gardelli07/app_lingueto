import React from "react";
import ModuleClassesScreen from "../../modules/ModuleClassesScreen";
import { FLORIDA_COURSE } from "./index";

// Aulas de um tema do My Trip to Florida (rota FloridaClasses).
export default function FloridaClassesScreen(props) {
  return <ModuleClassesScreen {...props} course={FLORIDA_COURSE} />;
}
