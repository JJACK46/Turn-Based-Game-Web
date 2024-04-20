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
// - bow -> Physical
// - gun -> Physical
// - sword
// - dagger
// - shield -> physical
// - magic wand
// - healing staff
// - polearm

// export type WeaponType = {
//   id:0
//   name:"bow"
// } | {
//   id:1
//   name:"sword"
// } | {
//   id:"2"
//   name:"gun"
// };

export type WeaponType = {
  id: number;
  name: string;
};

export enum WeaponEnum {
  BOW = 0,
  SWORD = 1,
  GUN = 2,
}

export const WeaponTypeData: WeaponType[] = [
  {
    id: 0,
    name: "bow",
  },
  {
    id: 1,
    name: "sword",
  },
  {
    id: 2,
    name: "gun",
  },
];
