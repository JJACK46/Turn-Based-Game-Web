import { PowerEnum } from "@/data/enums/powers";
import { UsingStatusEnum } from "@/data/enums/status";

export class Weapon {
  id: number;
  name: string;
  type: WeaponEnum;
  damageType: PowerEnum;
  level: number;
  powerValue: number;
  damageType: PowerEnum;
  status: UsingStatusEnum;
  image: string;
  constructor({
    id,
    name,
    type,
    level,
    power,
    damageType,
    status,
    image,
  }: {
    id: number;
    name: string;
    type: WeaponEnum;
    level: number;
    power: number;
    damageType: PowerEnum;
    status: UsingStatusEnum;
    image: string;
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.level = level;
    this.powerValue = power;
    this.damageType = damageType;
    this.status = status;
    this.image = image;
  }
}

// PowerEnum -> Physical / magical / hybrid

// export type WeaponType = {
//   damageType:PowerEnum.PHYSICAL
//   name:"bow"
// } | {
//   damageType:PowerEnum.PHYSICAL
//   name:"sword"
// } | {
//   damageType:PowerEnum.PHYSICAL
//   name:"gun"
// } | {
//   damageType:PowerEnum.PHYSICAL
//   name:"dagger"
// } | {
//   damageType:PowerEnum.PHYSICAL
//   name:"shield"
// } | {
//   damageType:PowerEnum.MAGICAL
//   name:"magic_wand"
// } | {
//   damageType:PowerEnum.MAGICAL
//   name:"healing_staff"
// } | {
//   damageType:PowerEnum.PHYSICAL
//   name:"polearms"
// };

export enum WeaponEnum {
  BOW = "bow",
  SWORD = "sword",
  GUN = "gun",
  DAGGER = "dagger",
  SHIELD = "shield",
  MAGIC_WAND = "magic_wand",
  HEALING_STAFF = " healing_staff",
  POLEARMS = "polearms",
}
