import { PowerEnum } from "@/data/enums/powers";
import { EquipmentStatusEnum } from "@/data/enums/status";
import { WeaponEnum } from "@/data/enums/weapons";
import { LevelExp } from "./levelExp";

interface WeaponType {
  id: number;
  name: string;
  type: WeaponEnum;
  levelExp: LevelExp;
  power: number;
  damageType: PowerEnum;
  status: EquipmentStatusEnum;
  image: string;
}

export class Weapon {
  id: number;
  name: string;
  type: WeaponEnum;
  damageType: PowerEnum;
  levelExp: LevelExp;
  powerValue: number;
  status: EquipmentStatusEnum;
  image: string;
  constructor({
    id,
    name,
    type,
    levelExp,
    power,
    damageType,
    status,
    image,
  }: WeaponType) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.levelExp = levelExp;
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
