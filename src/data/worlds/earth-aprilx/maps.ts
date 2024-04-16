import { MapData } from "@/data/worlds/types/map";
import {
  BASE_URL_IMAGE_ENTITIES,
  BASE_URL_IMAGE_MAPS,
  BASE_URL_IMAGE_WORLDS,
} from "@/utils/constants";

export const EarthAprilXMaps: MapData[] = [
  {
    name: "After effects",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    backgroundImageUrl: `${BASE_URL_IMAGE_MAPS}/`,
  },
  {
    name: "The show must go on",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "The lost one",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Colonize",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Not match",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Upheaval",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Not worthy",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "The Apex",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Behind the scene",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
  },
  {
    name: "Dozojo : The Disastrous of AprilX",
    entitiesLevel: [1, 10],
    grade: "BOSS",
    detail:
      "Behold, mortals, as the balance of power shifts beneath your very feet. Prepare for the dawn of chaos, for I shall shatter the tranquility of your existence with a single stroke.",
    cardImageUrl: `../${BASE_URL_IMAGE_ENTITIES}/boss_dojozo.jpeg`,
    backgroundImageUrl: `${BASE_URL_IMAGE_MAPS}/map_dojozo.jpg`,
  },
];
