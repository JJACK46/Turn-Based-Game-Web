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
    emitValueMultiplier: 0.3,
    powerType: PowerEnum.PHYSICAL,
    duration: 3,
  }),
  [EffectSkillEnum.STUN]: new EffectSkill({
    name: EffectSkillEnum.STUN,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    canAction: false,
    duration: 1,
  }),
  [EffectSkillEnum.FREEZE]: new EffectSkill({
    name: EffectSkillEnum.FREEZE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.MAGICAL,
    duration: 2,
    canAction: false,
  }),
  [EffectSkillEnum.VULNERABLE]: new EffectSkill({
    name: EffectSkillEnum.VULNERABLE,
    emitValueMultiplier: 0.3,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [EffectSkillEnum.ENHANCE_ATTACK]: new EffectSkill({
    name: EffectSkillEnum.ENHANCE_ATTACK,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [EffectSkillEnum.ENHANCE_DEFEND]: new EffectSkill({
    name: EffectSkillEnum.ENHANCE_DEFEND,
    emitValueMultiplier: 1,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [EffectSkillEnum.BARRIER]: new EffectSkill({
    name: EffectSkillEnum.BARRIER,
    emitValueMultiplier: 1,
    powerType: PowerEnum.PHYSICAL,
    duration: 3,
  }),
  [EffectSkillEnum.IMMUNE_PHYSICAL]: new EffectSkill({
    name: EffectSkillEnum.IMMUNE_PHYSICAL,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    canDispel: false,
  }),
  [EffectSkillEnum.IMMUNE_MAGICAL]: new EffectSkill({
    name: EffectSkillEnum.IMMUNE_MAGICAL,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    duration: 2,
    canDispel: false,
  }),
  [EffectSkillEnum.INVINCIBLE]: new EffectSkill({
    name: EffectSkillEnum.INVINCIBLE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.HYBRID,
    duration: 2,
    canDispel: false,
  }),
  [EffectSkillEnum.INACTIVE]: new EffectSkill({
    name: EffectSkillEnum.INACTIVE,
    emitValueMultiplier: 0,
    powerType: PowerEnum.PHYSICAL,
    canDispel: false,
    canAction: false,
  }),
  [EffectSkillEnum.HEALING_OVERTIME]: new EffectSkill({
    name: EffectSkillEnum.HEALING_OVERTIME,
    emitValueMultiplier: 0.2,
    powerType: PowerEnum.PHYSICAL,
    duration: 3,
  }),
};
