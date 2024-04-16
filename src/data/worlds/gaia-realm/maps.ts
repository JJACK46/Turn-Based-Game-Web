import { EntitiesData } from "@/data/entities";
import { MapData } from "@/data/worlds/types/map";
import {
  BASE_URL_IMAGE_ENTITIES,
  BASE_URL_IMAGE_MAPS,
  BASE_URL_IMAGE_WORLDS,
} from "@/utils/constants";

const boss = EntitiesData.find((entity) => entity.id === 999);

export const GaiaRealmMaps: MapData[] = [
  {
    name: "New Ability",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_gaia_realm.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Not like other",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "From the mist",
    entitiesLevel: [1, 10],
    grade: "COMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Demon hide",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/demon_fighter.jpg`,
    enemyFrontRow: [],
  },
  {
    name: "True form",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Incredible",
    entitiesLevel: [1, 10],
    grade: "UNCOMMON",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Underneath",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Beyond mind",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "The liar",
    entitiesLevel: [1, 10],
    grade: "HARD",
    cardImageUrl: `${BASE_URL_IMAGE_WORLDS}/Astralis_city.jpeg`,
    enemyFrontRow: [],
  },
  {
    name: "Vexaria: The Deceitful of Gaia Realm",
    entitiesLevel: [99, 99],
    grade: "BOSS",
    details:
      "Attend, fools of Gaia Realm, and witness the grand deception woven by my hand. Behold as I, Vexaria, unravel your feeble notions of harmony, for beneath my cunning lies the true power that shall reshape your world in my image.",
    cardImageUrl: `${BASE_URL_IMAGE_ENTITIES}/boss_vexaria.jpeg`,
    backgroundUrl: `${BASE_URL_IMAGE_MAPS}/map_vexaria.jpeg`,
    boss: boss,
    enemyFrontRow: [boss!],
  },
];
