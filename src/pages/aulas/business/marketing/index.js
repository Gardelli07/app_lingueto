import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import { PlayIcon } from "../../../../exc/grammarlab/icons";
import { BUSINESS_STORAGE_KEY } from "../storage";
import Mkt01 from "../A0-A1/Mkt01";

// Modulo Marketing do Business ("The Marketing Job"), com as mesmas telas de
// modulo da Viagem (../../modules): temporadas -> aulas da temporada -> aula.
// So a Mkt01 tem conteudo; o resto (`upcoming`) aparece como SOON. Lista das
// aulas passada pelo usuario em 2026-11-12. Para liberar uma aula: crie a
// tela (molde Mkt01), ponha em marketingLessons e lessonScreens, o id em
// `lessonIds` da temporada e tire ela do `upcoming`.

export const MARKETING_COURSE_TITLE = "Marketing";

// `module` e o id do modulo Marketing em businessModuleDefs.
export const marketingLessons = [
  {
    module: 0,
    id: "1",
    title: "Episode 1 · The Job Opening",
    type: "Aula",
    screen: "Mkt01",
    topicNum: "01",
    level: "A1",
    exerciseCount: 12,
  },
];

const upcoming = (titles) => titles.map((title) => ({ title }));

// Cores do quadradinho: as 4 primeiras do My Trip to Florida.
const TOPIC_DATA = [
  {
    num: "01",
    section: "Season 1: Getting the Job",
    level: "A1",
    color: ["#1b2142", "#a9b4ff"],
    lessonIds: ["1"],
    upcoming: upcoming([
      "The Application",
      "The Phone Call",
      "The Interview",
      "The Second Interview",
      "The Job Offer",
      "The Building",
    ]),
  },
  {
    num: "02",
    section: "Season 2: The Assistant",
    level: "A2",
    color: ["#0f2a22", "#4ade80"],
    lessonIds: [],
    upcoming: upcoming([
      "Meet the Team",
      "Who Is Bloom?",
      "Meet the Customer",
      "The Content Calendar",
      "The Mistake",
      "The Brief",
      "Going Live",
      "Marketing vs. Sales",
      "The Influencer",
      "The Food Fair",
      "The Monthly Report",
      "The Review",
    ]),
  },
  {
    num: "03",
    section: "Season 3: The Analyst",
    level: "B1–B2",
    color: ["#2a2210", "#ffc14d"],
    lessonIds: [],
    upcoming: upcoming([
      "New Role, New Budget",
      "The New Product",
      "Market Research",
      "The Agency Pitch",
      "Search and SEO",
      "Paid Ads",
      "A/B Testing",
      "The Email Campaign",
      "Launch Day",
      "Price War",
      "Presenting to the Leadership Team",
      "The Results",
    ]),
  },
  {
    num: "04",
    section: "Season 4: The Manager",
    level: "B2–C1",
    color: ["#2c1915", "#ff9a7a"],
    lessonIds: [],
    upcoming: upcoming([
      "The Interview, Again",
      "Managing Friends",
      "Hiring the Team",
      "The Annual Strategy",
      "Going International",
      "The Crisis",
      "The Live Interview",
      "The Rebrand",
      "Green or Greenwashing?",
      "The Board Meeting",
      "Burnout",
      "Full Circle",
    ]),
  },
];

export const MARKETING_TOPICS = TOPIC_DATA.map(({ lessonIds, ...topic }) => ({
  ...topic,
  lessons: lessonIds.map((id) => marketingLessons.find((lesson) => lesson.id === id)),
}));

function BriefcaseIcon({ color }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x={3} y={7} width={18} height={13} rx={2} />
      <Path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </Svg>
  );
}

function StartIcon({ color }) {
  return <PlayIcon size={12} color={color} />;
}

// Config das telas de modulo: mesmo layout do Florida, textos de Business.
export const MARKETING_COURSE = {
  title: MARKETING_COURSE_TITLE,
  kicker: "BUSINESS ENGLISH",
  KickerIcon: BriefcaseIcon,
  subtitle: "Escolha uma temporada para ver as aulas.",
  backLabel: "Voltar para Business",
  topics: MARKETING_TOPICS,
  storageKey: BUSINESS_STORAGE_KEY,
  classesRoute: "MarketingClasses",
  startLabel: "Start",
  StartIcon,
  soonText: (num) => `A Aula ${num} ainda está em produção. Comece pela Aula 1!`,
};

export const lessonScreens = {
  Mkt01,
};
