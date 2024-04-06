import { Skill } from "./skills";
import { Armor } from "./armor";
import { DamageType } from "./damageType";
import { Weapon } from "./weapon";

export type Entity = {
  name: string;
  imageUrl: string;
  attackDamageType: DamageType;
  level: number;
  skill: Skill[];
  attackDamage: number;
  defendValue?: number;
  healthPower: number;
  manaPower: number;
  energyPower?: number;
  equipment?: {
    weapon: Weapon;
    armor: Armor;
  };
};
