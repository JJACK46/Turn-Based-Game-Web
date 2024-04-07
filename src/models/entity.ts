import { Skill } from "./skills";
import { Armor } from "./armor";
import { DamageType } from "./damageType";
import { Weapon } from "./weapon";

export type Entity = {
  id: number;
  name: string;
  imageUrl: string;
  attackDamageType: DamageType;
  level: number;
  skills: Skill[];
  attackDamage: number;
  defendValue?: number;
  healthPower: number;
  manaPower: number;
  energyPower?: number;
  equipment?: {
    weapon: Weapon;
    armor: Armor;
  };
  playable?: true;
};

export type EntityAndIndex = {
  entity: Entity;
  index: number;
};
