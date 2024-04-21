import { ActiveSkillsEnum, listDefaultActiveSkill } from "./activeSkills";
import { PowerEnum } from "./powers";
import { EffectSkill } from "@/classes/effect";

export enum EffectSkillEnum {
  HEALING_OVERTIME = "healing",
  POISON = "poison",
  STUN = "stun",
  FREEZE = "freeze",
  VULNERABLE = "vulnerable",
  ENHANCE_ATTACK = "enhance attack",
  ENHANCE_DEFEND = "enhance defend",
  ENHANCE_HEALTH = "enhance health",
  BARRIER = "barrier",
  IMMUNE_PHYSICAL = "immune to physical",
  IMMUNE_MAGICAL = "immune to magical",
  INVINCIBLE = "invincible",
  INACTIVE = "inactive",
}

export const listDefaultEffectSkill: {
  [key in EffectSkillEnum]: EffectSkill;
} = {
  [EffectSkillEnum.POISON]: new EffectSkill({
    name: EffectSkillEnum.POISON,
    emitValueMultiplier: 0.15,
    powerType: PowerEnum.PHYSICAL,
    canDispelWith: listDefaultActiveSkill[ActiveSkillsEnum.DISPEL_POISON],
    duration: 3,
    isNegative: true,
  }),
  [EffectSkillEnum.STUN]: new EffectSkill({
    name: EffectSkillEnum.STUN,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    canAction: false,
    canDispelWith: listDefaultActiveSkill[ActiveSkillsEnum.DISPEL_STUN],
    duration: 1,
    isNegative: true,
  }),
  [EffectSkillEnum.FREEZE]: new EffectSkill({
    name: EffectSkillEnum.FREEZE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.MAGICAL,
    duration: 1,
    canDispelWith: listDefaultActiveSkill[ActiveSkillsEnum.DISPEL_FREEZE],
    canAction: false,
    isNegative: true,
  }),
  [EffectSkillEnum.VULNERABLE]: new EffectSkill({
    name: EffectSkillEnum.VULNERABLE,
    emitValueMultiplier: 0.3,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: true,
  }),
  [EffectSkillEnum.ENHANCE_ATTACK]: new EffectSkill({
    name: EffectSkillEnum.ENHANCE_ATTACK,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.ENHANCE_DEFEND]: new EffectSkill({
    name: EffectSkillEnum.ENHANCE_DEFEND,
    emitValueMultiplier: 1,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.BARRIER]: new EffectSkill({
    name: EffectSkillEnum.BARRIER,
    emitValueMultiplier: 1,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.IMMUNE_PHYSICAL]: new EffectSkill({
    name: EffectSkillEnum.IMMUNE_PHYSICAL,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.IMMUNE_MAGICAL]: new EffectSkill({
    name: EffectSkillEnum.IMMUNE_MAGICAL,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.INVINCIBLE]: new EffectSkill({
    name: EffectSkillEnum.INVINCIBLE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.HYBRID,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.INACTIVE]: new EffectSkill({
    name: EffectSkillEnum.INACTIVE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.HYBRID,
    canAction: false,
    isNegative: true,
  }),
  [EffectSkillEnum.HEALING_OVERTIME]: new EffectSkill({
    name: EffectSkillEnum.HEALING_OVERTIME,
    emitValueMultiplier: 0.15,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    isNegative: false,
  }),
  [EffectSkillEnum.ENHANCE_HEALTH]: new EffectSkill({
    name: EffectSkillEnum.ENHANCE_HEALTH,
    emitValueMultiplier: 0.15,
    powerType: PowerEnum.PHYSICAL,
    duration: 1,
    isNegative: false,
    immediately: true,
  }),
};
