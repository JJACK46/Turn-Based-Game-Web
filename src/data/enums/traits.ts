import { Skill } from "@/classes/skills";
import { EmitTypeEnum } from "./actions";
import { PowerEnum } from "./powers";
import { EffectSkillEnum, listDefaultEffectSkill } from "./effectSkills";

export enum TraitEnum {
  //earth aprilX
  HUMAN = "human",
  INSECT = "insect",
  SPIRIT = "spirit",
  INHUMAN = "inhuman",
  BIG_CREATURE = "big creature",
  //robotic empire
  ARMED_ROBOT = "armed robot",
  UNARMED_ROBOT = "unarmed robot",
  CYBORG = "cyborg",
  AUTOMATION = "automation",
  // gaia realm
  GOBLIN = "goblin",
  ELF = "elf",
  ORC = "orc",
  DEMON = "demon",
  ANGEL = "angel",
  MAGIC_ANIMAL = "magic animal",
  MAGIC_GOLEM = "magic golem",
  UNKNOWN = "unknown",
  // boss
  BOSS_DOZOJO = "The Disastrous of AprilX",
  BOSS_NEXOS = "The Perfection of Atralis Omega",
  BOSS_VEXARIA = "The Deceitful of Gaia Realm",
}

export const isBoss = (trait: TraitEnum): boolean => {
  return [
    TraitEnum.BOSS_DOZOJO,
    TraitEnum.BOSS_NEXOS,
    TraitEnum.BOSS_VEXARIA,
  ].includes(trait);
};

export const listTraitSkill: { [key in TraitEnum]: Skill } = {
  [TraitEnum.HUMAN]: new Skill({
    name: "Humanity",
    requiredEnergy: 10,
    type: EmitTypeEnum.HEALING,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.4,
    duration: 0,
  }),
  [TraitEnum.INSECT]: new Skill({
    name: "poison",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    emitValueMultiply: 1.1,
    power: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [TraitEnum.SPIRIT]: new Skill({
    name: "fear",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    emitValueMultiply: -1,
    power: PowerEnum.MAGICAL,
    duration: 1,
  }),
  [TraitEnum.BIG_CREATURE]: new Skill({
    name: "stomped",
    type: EmitTypeEnum.DE_BUFF,
    requiredEnergy: 10,
    emitValueMultiply: 0,
    power: PowerEnum.PHYSICAL,
    effectSkill: listDefaultEffectSkill[EffectSkillEnum.STUN],
  }),
  [TraitEnum.ARMED_ROBOT]: new Skill({
    name: "Missile Rain",
    type: EmitTypeEnum.ATTACK_AOE,
    requiredEnergy: 2,
    emitValueMultiply: 0.2,
    power: PowerEnum.PHYSICAL,
    repeat: 10,
    randomTarget: true,
    soundPath: "/sounds/sfx/missile-rocket-firing.wav",
  }),
  [TraitEnum.UNARMED_ROBOT]: new Skill({
    name: "Untouchable",
    type: EmitTypeEnum.DEFEND,
    requiredEnergy: 30,
    emitValueMultiply: 10,
    power: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [TraitEnum.CYBORG]: new Skill({
    name: "shield up",
    type: EmitTypeEnum.DEFEND,
    requiredEnergy: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 1,
  }),
  [TraitEnum.AUTOMATION]: new Skill({
    name: "self repair",
    type: EmitTypeEnum.HEALING,
    requiredEnergy: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 3,
  }),
  [TraitEnum.GOBLIN]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.ELF]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
    duration: 0,
  }),
  [TraitEnum.ORC]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.DEMON]: new Skill({
    name: "Soulflame Burst",
    type: EmitTypeEnum.ATTACK_AOE,
    requiredMana: 20,
    emitValueMultiply: 0.5,
    power: PowerEnum.MAGICAL,
  }),
  [TraitEnum.ANGEL]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.MAGIC_GOLEM]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.UNKNOWN]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.INHUMAN]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.MAGIC_ANIMAL]: new Skill({
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.BOSS_DOZOJO]: new Skill({
    name: "World's Corruption",
    requiredMana: 40 / 20,
    requiredEnergy: 40 / 20,
    type: EmitTypeEnum.ATTACK_AOE,
    power: PowerEnum.HYBRID,
    emitValueMultiply: 0.5,
    repeat: 5,
    randomTarget: true,
    soundPath: "/sounds/sfx/flame_burst.wav",
  }),
  [TraitEnum.BOSS_NEXOS]: new Skill({
    name: "Artificial Perfection",
    requiredMana: -1,
    requiredEnergy: 80,
    type: EmitTypeEnum.DEFEND,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.2,
    duration: 0,
  }),
  [TraitEnum.BOSS_VEXARIA]: new Skill({
    name: "Dark Manipulation",
    requiredMana: 80,
    requiredEnergy: -1,
    type: EmitTypeEnum.RESTORE,
    power: PowerEnum.MAGICAL,
    emitValueMultiply: 0.2,
    duration: 0,
  }),
};
