import { Status } from "../../classes/status";
import { PowerEnum } from "./powers";

export enum UsingStatusEnum {
  INUSE = "inuse",
  READY = "ready",
}

export enum StatusEnum {
  NORMAL = "normal",
  STUNNED = "stunned",
  FREEZE = "freeze",
  POISON = "poison",
  VULNERABLE = "vulnerable",
  IMMUNITY_MAGICAL = "immunity magic",
  IMMUNITY_PHYSICAL = "immunity physical",
  DEFENSIVE = "defensive",
  INACTIVE = "inactive",
}

export const listStatus: { [key in StatusEnum]: Status } = {
  [StatusEnum.NORMAL]: new Status({ name: "Normal", canAction: true }),
  [StatusEnum.STUNNED]: new Status({
    name: "Stunned",
    canAction: false,
    duration: 1,
  }),
  [StatusEnum.FREEZE]: new Status({
    name: "Freeze",
    canAction: false,
    duration: 1,
    immuneTo: PowerEnum.HYBRID,
  }),
  [StatusEnum.POISON]: new Status({
    name: "Poison",
    canAction: true,
    duration: 2,
    valueMultiply: 0.1,
    canDispel: true,
  }),
  [StatusEnum.VULNERABLE]: new Status({
    name: "Vulnerable",
    canAction: true,
    duration: 2,
    valueMultiply: 0.3,
    canDispel: true,
  }),
  [StatusEnum.IMMUNITY_MAGICAL]: new Status({
    name: "Immunity magic",
    canAction: true,
    immuneTo: PowerEnum.MAGICAL,
    duration: 1,
  }),
  [StatusEnum.IMMUNITY_PHYSICAL]: new Status({
    name: "Immunity physical",
    canAction: true,
    immuneTo: PowerEnum.PHYSICAL,
    duration: 1,
  }),
  [StatusEnum.DEFENSIVE]: new Status({
    name: "Defensive Buff",
    canAction: true,
    valueMultiply: 1,
    duration: 1,
  }),
  [StatusEnum.INACTIVE]: new Status({
    name: "Inactive",
    canAction: false,
  }),
};
