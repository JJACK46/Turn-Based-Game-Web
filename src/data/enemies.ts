import { Entity } from "../models/entity";
import { StatusEnum } from "./status";

export const monsters: Entity[] = [
  {
    id: 1,
    name: "G-Lizard",
    imageUrl: "enemies/monster_rookie_1.jpeg",
    level: 1,
    attackPower: 2,
    attackDamageType: "physical",
    manaPower: 0,
    healthPower: 10,
    skills: [
      {
        name: "Normal hit",
        requiredMana: 0,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.5,
      },
    ],
    status: StatusEnum.NORMAL,
    speed: 10,
    canTakeDamage: true,
    trait: "forest monster",
  },
  {
    id: 2,
    name: "Babooza",
    imageUrl: "enemies/monster_forest_1.jpeg",
    level: 1,
    attackPower: 6,
    attackDamageType: "physical",
    manaPower: 0,
    healthPower: 30,
    skills: [
      {
        name: "Normal hit",
        requiredMana: 0,
        type: "physical",
        isAttackSkill: true,
        emitValueMultiply: 1.5,
      },
    ],
    status: StatusEnum.NORMAL,
    speed: 6,
    canTakeDamage: true,
    trait: "forest monster",
  },
];
