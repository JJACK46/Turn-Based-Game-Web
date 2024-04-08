import { Entity } from "../models/entity";
import { StatusEnum } from "./status";

export const monsters: Entity[] = [
  {
    id: 1,
    name: "Gigi",
    imageUrl: "enemies/monster_rookie_1.jpeg",
    level: 1,
    attackPower: 2,
    attackDamageType: "physical",
    manaPower: 0,
    healthPower: 10,
    skills: [
      {
        name: "Hit it",
        requiredMana: 0,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.5,
      },
    ],
    status: StatusEnum.NORMAL,
  },
];
