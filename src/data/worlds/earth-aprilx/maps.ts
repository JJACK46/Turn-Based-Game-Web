import { EntitiesData } from "@/data/models/entities";
import { MapData } from "@/data/worlds/types/map";
import {
  BASE_URL_IMAGE_ENTITIES,
  BASE_URL_IMAGE_MAPS,
  BASE_URL_IMAGE_WORLDS,
} from "@/utils/constants";

const boss = EntitiesData.find((entity) => entity.id === 777);

export const EarthAprilXMaps: MapData[] = [
  {
    name: "After effects",
    entitiesLevel: [1, 5],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/super_soldier_rifle_2.jpg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_aprilx.png`,
    enemiesFrontRow: [EntitiesData[0], EntitiesData[0], EntitiesData[0]],
    // enemiesBackRow: [EntitiesData[0], EntitiesData[0]],
  },
  {
    name: "Fallen Civilization",
    entitiesLevel: [3, 7],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "The lost one",
    entitiesLevel: [5, 11],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Colonization",
    entitiesLevel: [8, 15],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Not match",
    entitiesLevel: [15, 20],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/the_rock_1.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Upheaval",
    entitiesLevel: [20, 25],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Survivor",
    entitiesLevel: [30, 40],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/nomad_soldier_1.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "The Apex",
    entitiesLevel: [35, 45],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Behind the scene",
    entitiesLevel: [45, 50],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemiesFrontRow: [],
  },
  {
    name: "Dojozo : The Disastrous of AprilX",
    entitiesLevel: [99, 99],
    grade: "BOSS",
    details:
      "Behold, mortals, as the balance of power shifts beneath your very feet. Prepare for the dawn of chaos, for I shall shatter the tranquility of your existence with a single stroke.",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/boss_dojozo.jpeg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_dojozo.jpg`,
    boss: boss,
    enemiesFrontRow: [boss!],
    soundtrackPath: "/sounds/soundtracks/ATSMXN&XTOM-The_Raven.mp3",
  },
];
