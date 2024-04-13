import { Skill } from "./skills";
import { PowerType } from "./powerType";

export type Weapon = {
  skills: Skill[];
  attackDamage: number;
  damageType: PowerType;
};
