import { Weapon } from "@/classes/weapon";
import { PowerEnum } from "../enums/powers";
import { LevelExp } from "@/classes/levelExp";
import { EquipmentStatusEnum } from "../enums/status";
import { WeaponEnum } from "../enums/weapons";
import { BASE_URL_IMAGE_WEAPONS } from "@/utils/constants";

export const WeaponsData: Weapon[] = [
  new Weapon({
    id: 1,
    damageType: PowerEnum.PHYSICAL,
    power: 5,
    name: "auto-rifle",
    levelExp: new LevelExp({}),
    type: WeaponEnum.GUN,
    status: EquipmentStatusEnum.READY,
    image: `${BASE_URL_IMAGE_WEAPONS}/guns/auto_rifle.png`,
  }),
];
