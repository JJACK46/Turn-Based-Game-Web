import { Armor } from "@/classes/armor";
import { EntityType } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { MapData } from "./map";

export type WorldData = {
  id: string;
  entities: EntityType[];
  boss: EntityType | null;
  dropItems: (Weapon | Armor)[];
  maps: MapData[];
  title: string;
  path: string;
  info: string;
  worldImgUrl: string;
};
