import { Skill } from "./skills";
import { Armor } from "./armor";
import { PowerType } from "./powerType";
import { Weapon } from "./weapon";
import { StatusEnum } from "../data/status";

export type Entity = {
  id: number;
  name: string;
  imageUrl: string;
  attackDamageType: PowerType;
  level: number;
  skills: Skill[];
  attackPower: number;
  defendPower?: number;
  healingPower?: number;
  healthPower: number;
  manaPower: number;
  energyPower: number;
  maxManaEnergyPower: number;
  maxHealthPower: number;
  maxDefendPower?: number;
  equipment?: {
    weapon: Weapon;
    armor: Armor;
  };
  playable?: true;
  status: StatusEnum;
  canTakeDamage: boolean;
  speed: number;
  trait: string;
  restoreManaOrEnergy: number;
  restoreHealth?: number;
  evasion?: number;
};

export type Site = "front" | "back";

export interface EntityDetails {
  entity: Entity;
  position: number;
  site: Site;
}
