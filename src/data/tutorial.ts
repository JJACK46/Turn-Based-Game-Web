import { Entity } from "../classes/entity";
import { EntitiesData } from "./entities";

interface TutorialSet {
  enemies: Entity[];
  players: Entity[];
}

export const tutorialSet: TutorialSet = {
  enemies: [EntitiesData[5], EntitiesData[6], EntitiesData[11]],
  players: [EntitiesData[10], EntitiesData[7]],
};
