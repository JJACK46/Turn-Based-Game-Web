import { UsingStatusEnum } from "@/data/enums/status";

export type Armor = {
  id: number
  defendValue: number;
  level: number;
  evasion: number;
  status: UsingStatusEnum;
};
