import { Armor } from "@/classes/armor";
import { EntityType } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";

export interface MapData {
  name: string;
  entitiesLevel: number[];
  grade: "COMMON" | "UNCOMMON" | "HARD" | "BOSS";
  details?: string;
  dropItems?: (Weapon | Armor)[];
  boss?: EntityType;
  cardImageUrl: string;
  backgroundUrl?: string;
  soundtrackPath?: string;
  enemyFrontRow: EntityType[];
  enemyBackRow?: EntityType[];
}
