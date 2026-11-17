import React from "react";
import ModuleTopicsScreen from "../../modules/ModuleTopicsScreen";
import { FLORIDA_COURSE } from "./index";

// Temas do My Trip to Florida (rota FloridaTopics).
export default function FloridaTopicsScreen(props) {
  return <ModuleTopicsScreen {...props} course={FLORIDA_COURSE} />;
}
