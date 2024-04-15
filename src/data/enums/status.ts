import { Status } from "../../classes/status";

export enum StatusEnum {
  NORMAL = "normal",
  STUNNED = "stunned",
  FREEZE = "freeze",
  POISON = "poison",
  VULNERABLE = "vulnerable",
  IMMUNITY_MAGIC = "immunity magic",
  IMMUNITY_PHYSICAL = "immunity physical",
  INACTIVE = "inactive",
}

export const listStatus: { [key in StatusEnum]: Status } = {
  [StatusEnum.NORMAL]: { title: "Normal", canAction: true },
  [StatusEnum.STUNNED]: { title: "Stunned", canAction: false },
  [StatusEnum.FREEZE]: { title: "Freeze", canAction: false },
  [StatusEnum.POISON]: { title: "Poison", canAction: true },
  [StatusEnum.VULNERABLE]: { title: "Vulnerable", canAction: true },
  [StatusEnum.IMMUNITY_MAGIC]: { title: "Immunity magic", canAction: true },
  [StatusEnum.IMMUNITY_PHYSICAL]: {
    title: "Immunity physical",
    canAction: true,
  },
  [StatusEnum.INACTIVE]: {
    title: "Inactive",
    canAction: false,
  },
};
