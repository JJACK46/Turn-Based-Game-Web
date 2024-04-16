import { EntitiesData } from "@/data/entities";
import { MapData } from "@/data/worlds/types/map";
import {
  BASE_URL_IMAGE_ENTITIES,
  BASE_URL_IMAGE_MAPS,
  BASE_URL_IMAGE_WORLDS,
} from "@/utils/constants";

const boss = EntitiesData.find((entity) => entity.id === 888);

export const AstralisOmegaMaps: MapData[] = [
  {
    name: "Unwelcome",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Glitch",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Resistance",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/unarmed_robot_1.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "The small thing",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "The reason of existence",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Automation",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Intelligence",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Artificial",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Imperfections",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Nexos : The Perfection of Astralis Omega",
    entitiesLevel: [99, 99],
    grade: "BOSS",
    details:
      "I exist for the sole purpose of purging the universe of its imperfections, and among them, you stand as a glaring flaw. Your insignificance is surpassed only by your incompetence, a mere blemish in the grand tapestry of existence. Prepare to be eradicated, for I, the arbiter of perfection, shall ensure your annihilation without hesitation or remorse.",
    cardImageUrl: `../${BASE_URL_IMAGE_ENTITIES}/boss_nexos.jpeg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_nexos.jpeg`,
    boss: boss,
    enemyFrontRow: [boss!],
  },
];
