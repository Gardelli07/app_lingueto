import React from "react";
import ModuleTopicsScreen from "../../modules/ModuleTopicsScreen";
import { MARKETING_COURSE } from "./index";

// Temporadas do Marketing (rota MarketingTopics).
export default function MarketingTopicsScreen(props) {
  return <ModuleTopicsScreen {...props} course={MARKETING_COURSE} />;
}
