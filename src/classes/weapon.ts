import { Skill } from "./skills";
import { DamageType } from "./damageType";

export type Weapon = {
  skills: Skill[];
  attackDamage: number;
  damageType: DamageType;
};
