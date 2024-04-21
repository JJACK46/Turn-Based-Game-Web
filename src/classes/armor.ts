import { UsingStatusEnum } from "@/data/enums/status";

export class Armor {
  id: number
  defendValue: number;
  level: number;
  evasion: number;
  status: UsingStatusEnum;
  image:string;
  constructor({
    id,
    defendValue,
    level,
    evasion,
    status,
    image,
  }:{
    id: number
    defendValue: number;
    level: number;
    evasion: number;
    status: UsingStatusEnum;
    image:string;
  }) {
    this.id=id
    this.defendValue=defendValue;
    this.level=level;
    this.evasion=evasion;
    this.status=status;
    this.image=image;
  }
}
