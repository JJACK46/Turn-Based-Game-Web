import { Entity } from "@/classes/entity";
import { EntitiesData } from "./entities";

interface TutorialSet {
  enemies: Entity[];
  players: Entity[];
}

const debug = EntitiesData.find((ent) => ent.id === 2024);

export const tutorialSet: TutorialSet = {
  enemies: [EntitiesData[5], EntitiesData[6], EntitiesData[11]],
  players: [EntitiesData[10], EntitiesData[8], debug!],
};
