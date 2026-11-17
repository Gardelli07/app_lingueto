import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { TRAVEL_STORAGE_KEY } from "../storage";
import Fl01 from "./Fl01";
import Fl02 from "./Fl02";
import Fl03 from "./Fl03";
import Fl04 from "./Fl04";
import Fl05 from "./Fl05";
import Fl06 from "./Fl06";

// My Trip to Florida (modulo da Viagem). Veio de C:\DEV\my-trip-to-florida
// (src/lessons/index.ts e florida.ts): temas -> aulas do tema -> aula.
// So a Aula 1 de cada tema tem conteudo; o resto (`upcoming`) aparece como
// SOON. `group` abre um cabecalho antes daquela aula; `firstGroup` e o
// cabecalho antes da Aula 1. Para liberar uma aula: crie a tela (FlNN, molde
// Fl01), ponha em floridaLessons e lessonScreens, o id em `lessonIds` do tema
// e tire ela do `upcoming`.

export const FLORIDA_COURSE_TITLE = "My Trip to Florida";

// `module` e o id do modulo My Trip to Florida em travelModuleDefs.
export const floridaLessons = [
  {
    "module": 0,
    "id": "florida-01",
    "title": "Episode 1: The Big Decision",
    "type": "Aula",
    "screen": "Fl01",
    "topicNum": "01",
    "level": "A1",
    "exerciseCount": 14
  },
  {
    "module": 0,
    "id": "florida-02",
    "title": "Welcome to Florida",
    "type": "Aula",
    "screen": "Fl02",
    "topicNum": "02",
    "level": "A2",
    "exerciseCount": 14
  },
  {
    "module": 0,
    "id": "florida-03",
    "title": "A Taste of Florida",
    "type": "Aula",
    "screen": "Fl03",
    "topicNum": "03",
    "level": "A2",
    "exerciseCount": 14
  },
  {
    "module": 0,
    "id": "florida-04",
    "title": "The Price on the Tag",
    "type": "Aula",
    "screen": "Fl04",
    "topicNum": "04",
    "level": "A2",
    "exerciseCount": 14
  },
  {
    "module": 0,
    "id": "florida-05",
    "title": "Your Documents",
    "type": "Aula",
    "screen": "Fl05",
    "topicNum": "05",
    "level": "A2",
    "exerciseCount": 14
  },
  {
    "module": 0,
    "id": "florida-06",
    "title": "Florida Words",
    "type": "Aula",
    "screen": "Fl06",
    "topicNum": "06",
    "level": "A2",
    "exerciseCount": 14
  }
];

const TOPIC_DATA = [
  {
    "num": "01",
    "section": "The English Journey",
    "color": [
      "#1b2142",
      "#a9b4ff"
    ],
    "lessonIds": [
      "florida-01"
    ],
    "upcoming": [
      {
        "title": "The Flight and Arrival",
        "description": "Security, the plane, connections, immigration, customs, lost luggage"
      },
      {
        "title": "Getting Around",
        "description": "Renting a car, directions, tolls and gas, parking, rideshare, the train"
      },
      {
        "title": "At the Hotel",
        "description": "Check-in, problems in the room, requests, questions, check-out"
      },
      {
        "title": "Eating and Shopping",
        "description": "Ordering food, the check and tipping, supermarket, clothes, tickets"
      },
      {
        "title": "When Things Go Wrong, and Going Home",
        "description": "Getting lost, health, police, losing things, delays, going home"
      }
    ]
  },
  {
    "num": "02",
    "section": "Explore Florida",
    "color": [
      "#0f2a22",
      "#4ade80"
    ],
    "lessonIds": [
      "florida-02"
    ],
    "upcoming": [
      {
        "title": "Walt Disney World: How It Works",
        "group": "Orlando and Central Florida"
      },
      {
        "title": "Magic Kingdom"
      },
      {
        "title": "EPCOT"
      },
      {
        "title": "Hollywood Studios and Animal Kingdom"
      },
      {
        "title": "Disney Water Parks and Disney Springs"
      },
      {
        "title": "Universal Orlando: How It Works"
      },
      {
        "title": "Universal Studios and Islands of Adventure"
      },
      {
        "title": "Epic Universe and Volcano Bay"
      },
      {
        "title": "SeaWorld, Aquatica and Discovery Cove"
      },
      {
        "title": "More Parks: LEGOLAND, Gatorland and Fun Spot"
      },
      {
        "title": "Orlando Beyond the Parks: Winter Park, Lake Eola, Old Town, ICON Park and Bok Tower"
      },
      {
        "title": "Shopping in Orlando: Outlets and Malls"
      },
      {
        "title": "Florida’s Springs: What They Are and the Rules",
        "group": "The Springs"
      },
      {
        "title": "Springs near Orlando: Wekiwa, Rock Springs, Blue Spring and De Leon Springs"
      },
      {
        "title": "Weeki Wachee, Silver Springs and Rainbow Springs"
      },
      {
        "title": "Ginnie Springs and Ichetucknee: Tubing and Diving"
      },
      {
        "title": "Swimming with Manatees: Crystal River and Homosassa"
      },
      {
        "title": "Kennedy Space Center",
        "group": "The Space Coast"
      },
      {
        "title": "Watching a Rocket Launch"
      },
      {
        "title": "Cocoa Beach, Merritt Island and Canaveral National Seashore"
      },
      {
        "title": "Tampa: Busch Gardens, Ybor City, the Riverwalk and the Aquarium",
        "group": "Tampa Bay and the Gulf Coast"
      },
      {
        "title": "St. Petersburg and Clearwater"
      },
      {
        "title": "Sarasota, Siesta Key and Anna Maria Island"
      },
      {
        "title": "Naples, Sanibel, Captiva and Fort Myers"
      },
      {
        "title": "Miami Beach and South Beach",
        "group": "Miami and South Florida"
      },
      {
        "title": "Little Havana, Wynwood and the Design District"
      },
      {
        "title": "More Miami: Bayside, Vizcaya, Key Biscayne and PAMM"
      },
      {
        "title": "Fort Lauderdale, Palm Beach and Boca Raton"
      },
      {
        "title": "The Everglades: The National Park and Airboats",
        "group": "The Everglades"
      },
      {
        "title": "Big Cypress, Biscayne National Park and Coral Castle"
      },
      {
        "title": "The Overseas Highway: Key Largo and Islamorada",
        "group": "The Florida Keys"
      },
      {
        "title": "Marathon, the Seven Mile Bridge and Bahia Honda"
      },
      {
        "title": "Key West"
      },
      {
        "title": "Dry Tortugas National Park"
      },
      {
        "title": "St. Augustine",
        "group": "North Florida and the Panhandle"
      },
      {
        "title": "Daytona Beach, Jacksonville and Amelia Island"
      },
      {
        "title": "Tallahassee and the Panhandle Beaches: Destin, 30A, Panama City Beach and Pensacola"
      },
      {
        "title": "Florida by Season: When to Go",
        "group": "Planning the Trip"
      },
      {
        "title": "Sports and Events in Florida"
      },
      {
        "title": "Planning Your Route: Road Trips and Itineraries"
      }
    ]
  },
  {
    "num": "03",
    "section": "Food & Restaurants",
    "color": [
      "#2a2210",
      "#ffc14d"
    ],
    "firstGroup": "Introduction",
    "lessonIds": [
      "florida-03"
    ],
    "upcoming": [
      {
        "title": "Types of Restaurants: fast food, fast casual, casual dining, fine dining, food courts",
        "group": "How eating out works in the US"
      },
      {
        "title": "Reading an American Menu: appetizers, entrées, sides, combos, “market price”"
      },
      {
        "title": "Breakfast in America: IHOP, Denny’s, Waffle House, Cracker Barrel, First Watch"
      },
      {
        "title": "Coffee and Donuts: Starbucks, Dunkin’, Wawa"
      },
      {
        "title": "Burgers: McDonald’s, Burger King (born in Miami), Wendy’s, Five Guys, Shake Shack",
        "group": "Fast food and fast casual"
      },
      {
        "title": "Chicken: Chick-fil-A, Popeyes, Pollo Tropical (born in Miami), Raising Cane’s"
      },
      {
        "title": "Mexican and Latin Fast Food: Chipotle, Taco Bell, Moe’s"
      },
      {
        "title": "Sandwiches and Subs: Publix Pub Subs, Subway, Jersey Mike’s, Firehouse Subs (born in Jacksonville)"
      },
      {
        "title": "Olive Garden (first restaurant in Orlando) and Red Lobster (born in Lakeland)",
        "group": "Chains born in Florida"
      },
      {
        "title": "Outback Steakhouse, Carrabba’s and Bonefish Grill (all from Tampa)"
      },
      {
        "title": "Hooters (Clearwater) and Florida sports bars"
      },
      {
        "title": "Publix: Florida’s favorite supermarket",
        "group": "Supermarkets and convenience stores"
      },
      {
        "title": "Walmart, Target, Costco, Whole Foods, Trader Joe’s, Aldi: what’s different in each"
      },
      {
        "title": "Wawa, 7-Eleven, CVS, Walgreens: snacks and quick food"
      },
      {
        "title": "Miami’s Cuban Classics: Versailles, La Carreta, Ball & Chain, Café La Trova",
        "group": "Regional and iconic restaurants"
      },
      {
        "title": "Stone Crab: Joe’s Stone Crab (Miami Beach)"
      },
      {
        "title": "Tampa’s Cuban Heritage: Columbia Restaurant (Ybor City, the oldest restaurant in Florida)"
      },
      {
        "title": "Seafood Shacks and Beach Grills: Frenchy’s (Clearwater), Hogfish Bar & Grill (Key West), The Fish House (Pensacola)"
      },
      {
        "title": "Key West Food: key lime pie spots, Blue Heaven, Kermit’s Key West Key Lime Shoppe, El Siboney"
      },
      {
        "title": "Old Florida and Southern Food: fried catfish, grits, BBQ (Sonny’s BBQ), swamp food and gator"
      },
      {
        "title": "Disney Restaurants: Be Our Guest, Cinderella’s Royal Table, ‘Ohana, Chef Mickey’s, Space 220; famous snacks like the Dole Whip",
        "group": "Eating at the parks"
      },
      {
        "title": "Universal Restaurants: The Leaky Cauldron, Three Broomsticks, Mythos, Butterbeer"
      },
      {
        "title": "Disney Springs and CityWalk: The Boathouse, Raglan Road, The Cheesecake Factory, Toothsome"
      },
      {
        "title": "Where to Eat in Orlando: International Drive and Restaurant Row",
        "group": "By city"
      },
      {
        "title": "Where to Eat in Miami: South Beach, Little Havana, Wynwood, Brickell"
      },
      {
        "title": "Where to Eat in Tampa and St. Pete"
      },
      {
        "title": "Where to Eat in the Keys"
      },
      {
        "title": "Eating on a Budget: deals, happy hour, kids’ menus, grocery-store meals",
        "group": "Practical"
      },
      {
        "title": "Food Allergies, Diets and Special Requests"
      },
      {
        "title": "Tourist Traps to Avoid: overpriced spots near the parks and on the beach"
      }
    ]
  },
  {
    "num": "04",
    "section": "Culture & Local Life",
    "color": [
      "#2c1915",
      "#ff9a7a"
    ],
    "firstGroup": "Introduction",
    "lessonIds": [
      "florida-04"
    ],
    "upcoming": [
      {
        "title": "Who Are Floridians? “Florida natives” vs. newcomers from other states",
        "group": "Floridians"
      },
      {
        "title": "Miami’s Cuban Heart: exile history, Calle Ocho, the ventanita and cafecito culture"
      },
      {
        "title": "Latin Florida Beyond Cuba: Puerto Ricans in Orlando and Kissimmee, Venezuelans in Doral, Colombians"
      },
      {
        "title": "Brazilians in Florida: Orlando, Pompano Beach, Deerfield Beach and Boca Raton"
      },
      {
        "title": "Caribbean Florida: Little Haiti, Haitian Creole and the Jamaican community"
      },
      {
        "title": "Snowbirds and The Villages: Florida’s winter population"
      },
      {
        "title": "Old Florida: cattle ranchers, Florida “crackers”, cowboys and rodeos"
      },
      {
        "title": "The Seminole and Miccosukee Tribes Today (including Hard Rock, owned by the Seminole Tribe)"
      },
      {
        "title": "Money in Florida: no state income tax, cost of living, condos and HOAs",
        "group": "Living in Florida"
      },
      {
        "title": "Florida Homes: pools, screened lanais and hurricane shutters"
      },
      {
        "title": "Living with the Heat: AC everywhere, life indoors and early mornings"
      },
      {
        "title": "Hurricane Season the Florida Way: kits, shutters, evacuation zones and “hurricane parties”"
      },
      {
        "title": "Afternoon Storms: Florida, the lightning capital of the US"
      },
      {
        "title": "Living with Alligators: every lake, every golf course"
      },
      {
        "title": "Manatees, Sea Turtles and Lights Out on the Beach"
      },
      {
        "title": "Lovebugs, Mosquitoes and Lizards: Florida’s small neighbors"
      },
      {
        "title": "Boat Life: boats, fishing, sandbars and weekends on the water"
      },
      {
        "title": "Beach Life: Atlantic vs. Gulf, locals’ beaches and spring break towns"
      },
      {
        "title": "Publix Culture: Pub Subs, BOGO deals and a Florida icon"
      },
      {
        "title": "Driving in Florida: I-4, the Turnpike, SunPass, tourists and snowbird traffic"
      },
      {
        "title": "Theme Parks for Locals: Florida resident tickets and annual passholders"
      },
      {
        "title": "College Football Saturdays: Florida Gators, FSU Seminoles, Miami Hurricanes and their rivalries",
        "group": "Sports and events"
      },
      {
        "title": "Florida’s Pro Teams: Heat, Magic, Dolphins, Buccaneers, Jaguars, Lightning, Panthers, Marlins, Rays, Inter Miami"
      },
      {
        "title": "Speed and Spring: the Daytona 500 and baseball spring training"
      },
      {
        "title": "Florida Festivals: Calle Ocho, Gasparilla, Art Basel Miami Beach, Bike Week, the Florida Strawberry Festival and Fantasy Fest in Key West"
      },
      {
        "title": "A Short History of Florida: Native peoples, the Spanish, the railroad and Disney",
        "group": "Identity and history"
      },
      {
        "title": "The Space Coast: how rockets shaped a region"
      },
      {
        "title": "Florida Architecture: Art Deco, Mediterranean Revival, Spanish St. Augustine and Old Florida houses"
      },
      {
        "title": "Florida’s Reputation: the “Florida Man” jokes, the memes and local pride"
      },
      {
        "title": "Culture Shocks for Brazilians in Florida"
      }
    ]
  },
  {
    "num": "05",
    "section": "Travel Smart",
    "color": [
      "#13263a",
      "#7cc4ff"
    ],
    "firstGroup": "Introduction",
    "lessonIds": [
      "florida-05"
    ],
    "upcoming": [
      {
        "title": "The Best Time to Visit Florida: seasons, crowds and prices",
        "group": "Planning the trip"
      },
      {
        "title": "Hurricane Season and Your Trip: insurance, flexible bookings and what to watch"
      },
      {
        "title": "Choosing Your Airport: Orlando (MCO), Miami (MIA), Fort Lauderdale (FLL), Tampa (TPA) and Fort Myers (RSW)"
      },
      {
        "title": "Where to Stay: the Disney area, International Drive, Kissimmee, Miami Beach and Brickell"
      },
      {
        "title": "Hidden Costs in Florida: resort fees, parking, tolls and tips already added to the bill"
      },
      {
        "title": "Renting a Car in Florida: toll packages, SunPass, toll-by-plate fees and insurance",
        "group": "Getting around"
      },
      {
        "title": "Florida Roads: I-4, the Turnpike, rush hour and laws like “Move Over” and school zones"
      },
      {
        "title": "Without a Car: Brightline, the I-Ride Trolley, Lynx, Miami’s free Metromover, Uber and Lyft"
      },
      {
        "title": "Parking in Florida: beach parking apps (PayByPhone, ParkMobile) and towing zones in Miami Beach"
      },
      {
        "title": "Heat and Sun Safety",
        "group": "Nature and safety"
      },
      {
        "title": "Beach Safety: the flag system, rip currents and lifeguards"
      },
      {
        "title": "Lightning and Summer Storms"
      },
      {
        "title": "Wildlife Safety: alligators, snakes, jellyfish, stingrays (the “stingray shuffle”) and sharks"
      },
      {
        "title": "Red Tide, Seaweed and Water Quality: checking beach conditions before you go"
      },
      {
        "title": "Mosquitoes and Bugs"
      },
      {
        "title": "Springs and Boat Trips: capacity closures and manatee rules"
      },
      {
        "title": "Buying Tickets the Smart Way: official sellers, reservations, apps and crowd calendars",
        "group": "Parks and attractions"
      },
      {
        "title": "Surviving the Parks: heat, rain, lines, breaks and kids"
      },
      {
        "title": "Avoiding Scams: fake tickets, timeshare presentations, “free gift” offers on I-Drive and rental scams"
      },
      {
        "title": "Miami Smart: South Beach nightlife, bar bills and areas to avoid at night",
        "group": "Florida’s cities"
      },
      {
        "title": "Orlando Smart: International Drive, crowds and traffic"
      },
      {
        "title": "Keys and Key West Smart: the drive, parking, cruise ship days and booking ahead"
      },
      {
        "title": "Everglades Smart: choosing an airboat tour, mosquitoes and wildlife rules"
      },
      {
        "title": "Shopping Smart: outlets, tax, luggage limits and what Brazilians buy",
        "group": "Money and shopping"
      },
      {
        "title": "Money Smart: cards, cash, ATM fees and exchange"
      },
      {
        "title": "Getting Sick in Florida: urgent care vs. the emergency room, CVS and Walgreens, and costs",
        "group": "Health and emergencies"
      },
      {
        "title": "Emergencies: 911, the police, a lost passport and the Brazilian Consulate in Miami"
      },
      {
        "title": "If a Hurricane Comes During Your Trip"
      },
      {
        "title": "Florida Laws Visitors Break Without Knowing: alcohol on beaches, open containers, feeding wildlife, taking live shells and touching manatees",
        "group": "Laws and behavior"
      },
      {
        "title": "Things Not to Say or Do: at immigration, with the police, and jokes that go wrong"
      },
      {
        "title": "Packing for Florida: rain, sun, cold AC inside and walking shoes"
      }
    ]
  },
  {
    "num": "06",
    "section": "Speak Like a Local",
    "color": [
      "#26173a",
      "#c9a6ff"
    ],
    "lessonIds": [
      "florida-06"
    ],
    "upcoming": [
      {
        "title": "At Home: lanai, Florida room, shutters, condo, HOA, canal, retention pond",
        "group": "What Floridians call things"
      },
      {
        "title": "Bugs and Critters: palmetto bugs, lovebugs, no-see-ums, gators, anoles"
      },
      {
        "title": "Food and Drinks: soda vs. Coke, sweet tea, Cuban toast, Pub Sub, cafecito, colada, cortadito"
      },
      {
        "title": "Shopping: buggy vs. cart, package store, “the outlets”, Publix words"
      },
      {
        "title": "On the Road: the Turnpike, I-4, SunPass, toll-by-plate, snowbird traffic"
      },
      {
        "title": "Weather Words: muggy, pouring, “Florida cold”, cold front, afternoon storm"
      },
      {
        "title": "Water Words: sandbar, flats, the Intracoastal, the Gulf, red tide, tight lines"
      },
      {
        "title": "People Words: snowbird, transplant, native, northerner, tourist"
      },
      {
        "title": "Spanglish Nouns: el carro, la guagua, el parking, el mall, el lunch",
        "group": "Miami Spanglish"
      },
      {
        "title": "Spanglish Verbs: parquear, chequear, textear, vacunar la carpeta"
      },
      {
        "title": "Miami English: “get down from the car”, “make a party”, “make the line”"
      },
      {
        "title": "Cuban Miami Slang: asere, ¿qué bolá?, jeva, dale, oye, mira"
      },
      {
        "title": "Venezuelan Doral: chamo, chama, pana"
      },
      {
        "title": "Puerto Rican Orlando: ¡Wepa!, boricua"
      },
      {
        "title": "Southern Words: y’all, fixin’ to, buggy, reckon, might could, bless your heart",
        "group": "North Florida"
      },
      {
        "title": "The Southern Accent: the drawl and how vowels change"
      },
      {
        "title": "Saying Florida Place Names: Kissimmee, Tallahassee, Okeechobee, Ocala",
        "group": "Accents and pronunciation"
      },
      {
        "title": "Spanish Place Names the Florida Way"
      },
      {
        "title": "The Miami Accent"
      },
      {
        "title": "Theme Park Talk: cast member, rope drop, Lightning Lane, Express Pass, AP",
        "group": "Florida’s worlds"
      },
      {
        "title": "Space Coast Talk: T-minus, liftoff, scrub, launch window"
      },
      {
        "title": "Hurricane Talk: the cone, landfall, hunker down, evacuation zone"
      },
      {
        "title": "Sports Talk: the Gator Chomp, “Go Noles!”, “The U”, “Fins up!”"
      },
      {
        "title": "Small Talk with Floridians",
        "group": "Real conversations"
      },
      {
        "title": "Florida Humor and Local Pride"
      },
      {
        "title": "Review: What Do Floridians Call It?"
      },
      {
        "title": "Review: A Day Talking Like a Floridian"
      }
    ]
  }
];

export const FLORIDA_TOPICS = TOPIC_DATA.map(({ lessonIds, ...topic }) => ({
  ...topic,
  lessons: lessonIds.map((id) => floridaLessons.find((lesson) => lesson.id === id)),
}));

function SunIcon({ color }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

function PlaneIcon({ color }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
      <Path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </Svg>
  );
}

// Config das telas de modulo (../../modules): textos e icones de viagem.
export const FLORIDA_COURSE = {
  title: FLORIDA_COURSE_TITLE,
  kicker: "ENGLISH FOR TRAVEL",
  KickerIcon: SunIcon,
  subtitle: "Escolha um tema para ver as aulas.",
  backLabel: "Voltar para Viagem",
  topics: FLORIDA_TOPICS,
  storageKey: TRAVEL_STORAGE_KEY,
  classesRoute: "FloridaClasses",
  startLabel: "Board",
  StartIcon: PlaneIcon,
  soonText: (num) => `O voo da Aula ${num} ainda não abriu o embarque. Comece pela Aula 1!`,
};

export const lessonScreens = {
  Fl01,
  Fl02,
  Fl03,
  Fl04,
  Fl05,
  Fl06,
};
