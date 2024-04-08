import { Skill } from "./skills";
import { Armor } from "./armor";
import { DamageType } from "./damageType";
import { Weapon } from "./weapon";
import { StatusEnum } from "../data/status";

export type Entity = {
  id: number;
  name: string;
  imageUrl: string;
  attackDamageType: DamageType;
  level: number;
  skills: Skill[];
  attackPower: number;
  defendPower?: number;
  healingPower?: number;
  healthPower: number;
  manaPower: number;
  energyPower?: number;
  equipment?: {
    weapon: Weapon;
    armor: Armor;
  };
  playable?: true;
  status: StatusEnum;
};

export type EntityAndIndex = {
  entity: Entity;
  index: number;
};
