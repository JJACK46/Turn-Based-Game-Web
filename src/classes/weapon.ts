import { PowerEnum } from "@/data/enums/powers";

export type Weapon = {
  id: number;
  name: string;
  type: WeaponEnum;
  level: number;
  powerValue: number;
  damageType: PowerEnum;
};

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
