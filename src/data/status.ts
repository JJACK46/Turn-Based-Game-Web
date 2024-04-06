import { Status } from "../models/status";

export const statusList: Status[] = [
  { title: "normal", canAction: true },
  { title: "stunned", canAction: false, remainRound: 1 },
  { title: "freeze", canAction: false, remainRound: 2 },
  { title: "poison", canAction: false, remainRound: 2 },
  { title: "vulnerable", canAction: false, remainRound: 1 },
  { title: "immunity magic", canAction: false, remainRound: 1 },
  { title: "immunity physical", canAction: false, remainRound: 1 },
];
