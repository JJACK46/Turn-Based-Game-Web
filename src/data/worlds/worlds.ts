import { EntityType } from "@/classes/entity";
import { AstralisOmegaMaps } from "./astralis-omega/maps";
import { EarthAprilXMaps } from "./earth-aprilx/maps";
import { GaiaRealmMaps } from "./gaia-realm/maps";
import { MapData } from "./types/map";
import { Armor } from "@/classes/armor";
import { Weapon } from "@/classes/weapon";

interface WorldData {
  id: string;
  title: string;
  path: string;
  info: string;
  urlImg: string;
  maps: MapData[];
  entities: EntityType[];
  boss: EntityType | null;
  dropItems: (Weapon | Armor)[];
}

export const listWorlds: WorldData[] = [
  {
    id: "earth-aprilx",
    title: "Earth-AprilX: The Ravaged Homeworld",
    path: "",
    info: "In a distant future, humanity's insatiable thirst for power and resources has led to the cataclysmic transformation of Earth into a war-torn wasteland. Dubbed Earth-AprilX, this once-vibrant planet now bears the scars of endless conflict and environmental degradation, a grim testament to humanity's folly.",
    urlImg: "Earth-AprilX.jpeg",
    maps: EarthAprilXMaps,
    boss: null,
    dropItems: [],
    entities: [],
  },
  {
    id: "astralis-omega",
    title: "Astralis Omega: The Robotics Empire",
    path: "",
    info: "In the far reaches of the galaxy, amidst the cold expanse of space, lies the mechanical domain of Astralis Omega. This empire, ruled by sentient machines of unparalleled intellect, harbors an insatiable thirst for power and dominance over all other forms of life.",
    urlImg: "Astralis_Omega.jpeg",
    maps: AstralisOmegaMaps,
    boss: null,
    dropItems: [],
    entities: [],
  },
  {
    id: "gaia-realm",
    title: "Gaia Realm: The Mysterious Magic",
    path: "",
    info: "In the vast expanse of the cosmos, nestled within a distant galaxy veiled by a tapestry of shimmering nebulas, lies the enigmatic Gaia Realm. This celestial body, unlike any other, is a planet teeming with mystical energies and ethereal wonders beyond mortal comprehension.",
    urlImg: "Gaia_Nova.jpeg",
    maps: GaiaRealmMaps,
    boss: null,
    dropItems: [],
    entities: [],
  },
];
