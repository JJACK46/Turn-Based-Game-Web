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
        requiredMana: 0,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.2,
      },
    ],
    playable: true,
    status: StatusEnum.NORMAL,
    speed: 10,
    canTakeDamage: true,
    trait: "Martial Arts",
  },
  {
    id: 2,
    name: "Bravo",
    imageUrl: "players/super_soldier_sniper_1.jpeg",
    level: 1,
    attackPower: 15,
    attackDamageType: "physical",
    manaPower: 15,
    healthPower: 10,
    skills: [
      {
        name: "Sharp Shoot",
        requiredMana: 0,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1,
      },
      {
        name: ".38 Electron",
        requiredMana: 15,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.8,
      },
    ],
    playable: true,
    status: StatusEnum.NORMAL,
    speed: 8,
    canTakeDamage: true,
    trait: "Super Solider",
  },
];
