import { Entity } from "../models/entity";
import { monsters } from "./enemies";
import { players } from "./players";

export const tutorialSet = {
  enemies: <Entity[]>monsters,
  players: <Entity[]>players,
};
