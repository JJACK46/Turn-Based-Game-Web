import { PowerEnum } from "@/data/enums/powers";
import { UsingStatusEnum } from "@/data/enums/status";


export type Weapon = {
  id: number;
  name: string;
  type: WeaponEnum;
  level: number;
  powerValue: number;
  damageType: PowerEnum;
  status: UsingStatusEnum
};

export enum WeaponEnum {
  BOW = "bow",
  SWORD = "sword",
  GUN = "gun",
}

