import { Entity } from "../models/entity";

export const players: Entity[] = [
  {
    name: "G",
    imageUrl: '',
    level: 1,
    attackDamage: 2,
    attackDamageType: "physical",
    manaPower: 10,
    healthPower: 0,
    skill: [{ name: "SMASH", requiredMana: 0 }],
  },
];
