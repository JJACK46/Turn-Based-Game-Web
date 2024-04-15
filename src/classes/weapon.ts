import { PowerType } from "./powerType";

export type Weapon = {
  id: number;
  name: string;
  type: WeaponType;
  powerValue: number;
  damageType: PowerType;
};

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
  id:number
  name:string
}

export enum WeaponEnum {
  BOW = 0,
  SWORD = 1,
  GUN = 2,
}

export const WeaponTypeData:WeaponType[] = [
  {
    id:0,
    name:"bow",
  },
  {
    id:1,
    name:"sword",
  },
  {
    id:2,
    name:"gun",
  }
]

