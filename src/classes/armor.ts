import { EquipmentStatusEnum } from "@/data/enums/status";
import { LevelExp } from "./levelExp";

interface ArmorType {
  id: number;
  name: string;
  defendValue: number;
  levelExp: LevelExp;
  evasion: number;
  status: EquipmentStatusEnum;
  image: string;
}

export class Armor {
  id: number;
  name: string;
  defendValue: number;
  levelExp: LevelExp;
  evasion: number;
  status: EquipmentStatusEnum;
  image: string;
  constructor({
    id,
    defendValue,
    name,
    levelExp,
    evasion,
    status,
    image,
  }: ArmorType) {
    this.id = id;
    this.name = name;
    this.defendValue = defendValue;
    this.levelExp = levelExp;
    this.evasion = evasion;
    this.status = status;
    this.image = image;
  }
}
