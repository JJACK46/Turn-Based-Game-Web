import { LevelExp } from "@/classes/levelExp";
import { EquipmentStatusEnum } from "../enums/status";
import { Armor } from "@/classes/armor";

export const ArmorData: Armor[] = [
  new Armor({
    id: 1,
    name: "tactical vest",
    levelExp: new LevelExp({}),
    defendValue: 10,
    status: EquipmentStatusEnum.READY,
    evasion: 0,
    image: `/images/armors/tactical_vest.jpg`,
  }),
];
