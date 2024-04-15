import { Skill } from "@/classes/skills";
import { BASE_ROUND } from "@/utils/constants";

export enum TraitEnum {
  HUMAN = 0,
  ROBOT = 1,
}

export const maxTrait = 3;

export type TraitType = {
  id:number,
  name:string,
}

export const TraitData:TraitType[] = [
  {
    id:0,
    name:"human"
  },
  {
    id:1,
    name:"robot"
  }
]

export const TraitSkill:Skill[] = [
  {
    name: "co-operate",
    isAttackSkill: false,
    type: "defend",
    emitValueMultiply: 1,
    emitValue: 5,
    requiredMana: 5,
    duration: 2 * BASE_ROUND,
  },
  {
    name: "self repair",
    isAttackSkill: false,
    type: "healing",
    emitValueMultiply: 1,
    emitValue: 10,
    requiredMana: 5,
    duration: 1 * BASE_ROUND,
  }
]
