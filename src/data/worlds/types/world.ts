import { Armor } from "@/classes/armor";
import { Weapon } from "@/classes/weapon";
import { MapData } from "./map";
import { Entity } from "@/classes/entity";

export type WorldData = {
  id: string;
  entities: Entity[];
  boss: Entity | null;
  dropItems: (Weapon | Armor)[];
  maps: MapData[];
  title: string;
  path: string;
  info: string;
  worldImgUrl: string;
};
