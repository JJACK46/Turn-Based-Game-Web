import { Entity } from "../models/entity";
import { StatusEnum } from "./status";

export const players: Entity[] = [
  {
    id: 1,
    name: "Piroat",
    imageUrl: "players/piroat_boxing_1.jpeg",
    level: 1,
    attackPower: 5,
    attackDamageType: "physical",
    manaPower: 10,
    healthPower: 20,
    skills: [
      {
        name: "SMASH",
        requiredMana: 5,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.5,
      },
    ],
    playable: true,
    status: StatusEnum.NORMAL,
  },
];
