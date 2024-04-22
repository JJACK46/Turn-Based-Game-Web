import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";

import { Weapon } from "@/classes/weapon";

export interface MapData {
  name: string;
  entitiesLevel: number[];
  grade: "COMMON" | "UNCOMMON" | "HARD" | "BOSS";
  details?: string;
  dropItems?: (Weapon | Armor)[];
  boss?: Entity;
  cardImageUrl: string;
  backgroundUrl?: string;
  soundtrackPath?: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
}
