import { EmitTypeEnum } from "./actions";
import { PowerEnum } from "./powers";
import { Skill } from "@/classes/skills";

export enum ActiveSkillsEnum {
  NORMAL_HIT_PHYSICAL = "normal hit physical",
  NORMAL_HIT_MAGICAL = "normal hit magical",
  DISPEL_POISON = "dispel poison",
  DISPEL_FREEZE = "dispel freeze",
  DISPEL_STUN = "dispel stun",
}

export const listDefaultActiveSkill: { [key in ActiveSkillsEnum]: Skill } = {
  [ActiveSkillsEnum.NORMAL_HIT_PHYSICAL]: new Skill({
    name: "Normal Hit",
    emitType: EmitTypeEnum.ATTACK,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  }),
  [ActiveSkillsEnum.NORMAL_HIT_MAGICAL]: new Skill({
    name: "Normal Hit",
    emitType: EmitTypeEnum.ATTACK,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  }),
  [ActiveSkillsEnum.DISPEL_POISON]: new Skill({
    name: "Dispel Poison",
    emitType: EmitTypeEnum.DISPEL,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  }),
  [ActiveSkillsEnum.DISPEL_FREEZE]: new Skill({
    name: "Dispel Freeze",
    emitType: EmitTypeEnum.DISPEL,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  }),
  [ActiveSkillsEnum.DISPEL_STUN]: new Skill({
    name: "Dispel Stun",
    emitType: EmitTypeEnum.DISPEL,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  }),
};
