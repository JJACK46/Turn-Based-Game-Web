import { Entity } from "../models/entity";
import { monsters } from "./enemies";
import { players } from "./players";

interface TutorialSet {
  enemies: Entity[];
  players: Entity[];
}

export const tutorialSet: TutorialSet = {
  enemies: monsters,
  players: players,
};
