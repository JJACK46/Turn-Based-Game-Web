import { EmitTypeEnum } from "./actions";
import { PowerEnum } from "./powers";
import { EffectSkillEnum, listDefaultEffectSkill } from "./effectSkills";
import { Skill } from "@/classes/skills";

export enum TraitEnum {
  //earth aprilX
  HUMAN = "human",
  SOLDIER = "soldier",
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

export enum PlayableTraitEnum {
  HUMAN = TraitEnum.HUMAN,
  INSECT = TraitEnum.INSECT,
  SPIRIT = TraitEnum.SPIRIT,
  INHUMAN = TraitEnum.INHUMAN,
  BIG_CREATURE = TraitEnum.BIG_CREATURE,
  ARMED_ROBOT = TraitEnum.ARMED_ROBOT,
  UNARMED_ROBOT = TraitEnum.UNARMED_ROBOT,
  CYBORG = TraitEnum.CYBORG,
  AUTOMATION = TraitEnum.AUTOMATION,
  GOBLIN = TraitEnum.GOBLIN,
  ELF = TraitEnum.ELF,
  ORC = TraitEnum.ORC,
  DEMON = TraitEnum.DEMON,
  ANGEL = TraitEnum.ANGEL,
  MAGIC_ANIMAL = TraitEnum.MAGIC_ANIMAL,
  MAGIC_GOLEM = TraitEnum.MAGIC_GOLEM,
}

export const isBoss = (trait: TraitEnum): boolean => {
  return [
    TraitEnum.BOSS_DOZOJO,
    TraitEnum.BOSS_NEXOS,
    TraitEnum.BOSS_VEXARIA,
  ].includes(trait);
};

export const listTraitSkill: { [key in TraitEnum]: Skill } = {
  [TraitEnum.SOLDIER]: new Skill({
    name: "Reinforcement",
    emitType: EmitTypeEnum.BUFF,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 1,
    freeAction: true,
    effectSkill: listDefaultEffectSkill[EffectSkillEnum.ENHANCE_ATTACK],
  }),
  [TraitEnum.HUMAN]: new Skill({
    name: "Never gonna give you up",
    requiredEnergy: 10,
    emitType: EmitTypeEnum.BUFF,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 1,
    effectSkill: listDefaultEffectSkill[EffectSkillEnum.ENHANCE_HEALTH],
  }),
  [TraitEnum.INSECT]: new Skill({
    name: "insect poison",
    emitType: EmitTypeEnum.DE_BUFF,
    requiredEnergy: 10,
    emitValueMultiply: 0,
    power: PowerEnum.PHYSICAL,
    effectSkill: listDefaultEffectSkill[EffectSkillEnum.POISON],
  }),
  [TraitEnum.SPIRIT]: new Skill({
    name: "fear",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    emitValueMultiply: -1,
    power: PowerEnum.MAGICAL,
    duration: 1,
  }),
  [TraitEnum.BIG_CREATURE]: new Skill({
    name: "stomped",
    emitType: EmitTypeEnum.DE_BUFF,
    requiredEnergy: 10,
    emitValueMultiply: 0,
    power: PowerEnum.PHYSICAL,
    effectSkill: listDefaultEffectSkill[EffectSkillEnum.STUN],
  }),
  [TraitEnum.ARMED_ROBOT]: new Skill({
    name: "Missile Rain",
    emitType: EmitTypeEnum.ATTACK_AOE,
    requiredEnergy: 2,
    emitValueMultiply: 0.2,
    power: PowerEnum.PHYSICAL,
    repeat: 10,
    randomTarget: true,
    soundPath: "/sounds/sfx/missile-rocket-firing.wav",
  }),
  [TraitEnum.UNARMED_ROBOT]: new Skill({
    name: "Untouchable",
    emitType: EmitTypeEnum.DEFEND,
    requiredEnergy: 30,
    emitValueMultiply: 10,
    power: PowerEnum.PHYSICAL,
    duration: 2,
  }),
  [TraitEnum.CYBORG]: new Skill({
    name: "shield up",
    emitType: EmitTypeEnum.DEFEND,
    requiredEnergy: 10,
    emitValueMultiply: 0.7,
    power: PowerEnum.PHYSICAL,
    duration: 1,
  }),
  [TraitEnum.AUTOMATION]: new Skill({
    name: "self repair",
    emitType: EmitTypeEnum.HEALING,
    requiredEnergy: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 3,
  }),
  [TraitEnum.GOBLIN]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.ELF]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
    duration: 0,
  }),
  [TraitEnum.ORC]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.DEMON]: new Skill({
    name: "Soulflame Burst",
    emitType: EmitTypeEnum.ATTACK_AOE,
    describe:
      "sacrifice 50% of blood to make TRUE AOE damage from blood being lost.",
    emitValueMultiply: 0.5,
    power: PowerEnum.MAGICAL,
    specialToAoeMethod(props) {
      const { sourceEntity, targets, thisSkill } = props;
      let totalDamage = 0;
      let damageMade = sourceEntity.health.value * thisSkill.emitValueMultiply;
      sourceEntity.health.value -= damageMade;
      for (const target of targets) {
        const evasion = target.evasion;
        const randomValue = Math.random();

        totalDamage += damageMade;

        if (randomValue < evasion) {
          damageMade = 0;
        }

        target.health.value -= damageMade;
      }
      return {
        updatedSource: sourceEntity,
        effectedTargets: targets,
        resultDamage: totalDamage,
      };
    },
  }),
  [TraitEnum.ANGEL]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.MAGIC_GOLEM]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.UNKNOWN]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.INHUMAN]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    duration: 0,
  }),
  [TraitEnum.MAGIC_ANIMAL]: new Skill({
    name: "",
    emitType: EmitTypeEnum.ATTACK,
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
    emitType: EmitTypeEnum.ATTACK_AOE,
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
    emitType: EmitTypeEnum.DEFEND,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.2,
    duration: 0,
  }),
  [TraitEnum.BOSS_VEXARIA]: new Skill({
    name: "Dark Manipulation",
    requiredMana: 80,
    requiredEnergy: -1,
    emitType: EmitTypeEnum.RESTORE,
    power: PowerEnum.MAGICAL,
    emitValueMultiply: 0.2,
    duration: 0,
  }),
};
