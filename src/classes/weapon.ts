import { PowerType } from "./powerType";

export type Weapon = {
  id: number;
  name: string;
  type: WeaponType;
  powerValue: number;
  damageType: PowerType;
};

export type WeaponType = "bow" | "sword" | "gun";
