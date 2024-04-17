import { Skill } from "@/classes/skills";
import { EmitTypeEnum } from "./actions";
import { PowerEnum } from "./powers";
import { BASE_ROUND } from "@/utils/constants";
import { StatusEnum } from "./status";

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

export const listTraitSkill: { [key in TraitEnum]: Skill } = {
  [TraitEnum.HUMAN]: {
    name: "Humanity",
    requiredMana: -1,
    requiredEnergy: 10,
    type: EmitTypeEnum.HEALING,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.2, //heal self 20% of health
  },
  [TraitEnum.INSECT]: {
    name: "poison",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1.1,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.POISON,
    duration: 2 * BASE_ROUND,
  },
  [TraitEnum.SPIRIT]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: -1,
    power: PowerEnum.MAGICAL,
    effectStatus: StatusEnum.FREEZE,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.BIG_CREATURE]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 0.5,
    emitValue: -1,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.STUNNED,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.ARMED_ROBOT]: {
    name: "Missile Rain",
    type: EmitTypeEnum.ATTACK_AOE,
    requiredEnergy: 2,
    requiredMana: -1,
    emitValueMultiply: 0.2,
    emitValue: -1,
    power: PowerEnum.PHYSICAL,
    repeat: 10,
    random: true,
    // specialToTargetMethod(props) {
    //   const { sourceEntity, targetEntity, thisSkill } = props;
    //   const blockedDamage = BASE_DAMAGE_REDUCTION * targetEntity.DEF;
    //   const damageMade = sourceEntity.ATK * thisSkill.skill.emitValueMultiply;
    //   const evasion = targetEntity.evasion;
    //   const randomValue = Math.random();
    //   let missed = false;
    //   let resultDamage = Math.max(0, damageMade - blockedDamage);
    //    if (randomValue < evasion) {
    //      resultDamage = 0;
    //      missed = true;
    //    }
    //   const effectedTarget: EntityInstance = new EntityInstance({
    //     ...targetEntity,
    //     entity: {
    //       ...targetEntity.entity,
    //       health: targetEntity.entity.health - resultDamage,
    //     },
    //   });

    //   return {
    //     updatedSource: sourceEntity,
    //     effectedTarget,
    //     damageMade,
    //     blockedDamage,
    //     resultDamage,
    //     missed,
    //   };
    // },
  },
  [TraitEnum.UNARMED_ROBOT]: {
    name: "Untouchable",
    type: EmitTypeEnum.DEFEND,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 2,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.IMMUNITY_PHYSICAL,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.CYBORG]: {
    name: "",
    type: EmitTypeEnum.DEFEND,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.IMMUNITY_PHYSICAL,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.AUTOMATION]: {
    name: "self repair",
    type: EmitTypeEnum.HEALING,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.GOBLIN]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.ELF]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.ORC]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.DEMON]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.ANGEL]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.MAGIC_GOLEM]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.UNKNOWN]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.INHUMAN]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.MAGIC_ANIMAL]: {
    name: "",
    type: EmitTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.BOSS_DOZOJO]: {
    name: "Surge Energy",
    requiredMana: 40,
    requiredEnergy: 40,
    type: EmitTypeEnum.ATTACK,
    power: PowerEnum.HYBRID,
    emitValueMultiply: 0.2,
  },
  [TraitEnum.BOSS_NEXOS]: {
    name: "Artificial Perfection",
    requiredMana: -1,
    requiredEnergy: 80,
    type: EmitTypeEnum.DEFEND,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.2,
  },
  [TraitEnum.BOSS_VEXARIA]: {
    name: "Dark Manipulation",
    requiredMana: 80,
    requiredEnergy: -1,
    type: EmitTypeEnum.RESTORE,
    power: PowerEnum.MAGICAL,
    emitValueMultiply: 0.2,
  },
};
