import { Entity } from "../models/entity";

export const monsters: Entity[] = [
  {
    id: 1,
    name: "Gigi",
    imageUrl: "",
    level: 1,
    attackDamage: 2,
    attackDamageType: "physical",
    manaPower: 0,
    healthPower: 0,
    skills: [{ name: "Dig it", requiredMana: 0 }],
  },
];
