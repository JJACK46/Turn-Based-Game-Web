import { Entity } from "../classes/entity";
import { monsters } from "./enemies";
import { players } from "./players";

interface TutorialSet {
  enemies: Entity[];
  players: Entity[];
}

export const tutorialSet: TutorialSet = {
  enemies: [monsters[3], monsters[5]],
  players: [players[0], players[3]],
};
