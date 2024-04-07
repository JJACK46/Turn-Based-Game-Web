import { Entity } from "../models/entity";

export const players: Entity[] = [
  {
    id: 1,
    name: "G",
    imageUrl: "",
    level: 1,
    attackDamage: 2,
    attackDamageType: "physical",
    manaPower: 10,
    healthPower: 0,
    skills: [{ name: "SMASH", requiredMana: 0 }],
  },
];
