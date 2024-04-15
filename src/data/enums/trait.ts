import { Skill } from "@/classes/skills";
import { ActionTypeEnum } from "./actions";
import { PowerEnum } from "./power";
import { BASE_DAMAGE_REDUCTION, BASE_ROUND } from "@/utils/constants";
import { StatusEnum } from "./status";
import { EntityInstance } from "@/classes/entity";

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
}

export const listTraitSkill: { [key in TraitEnum]: Skill } = {
  [TraitEnum.HUMAN]: {
    name: "Humanity",
    requiredMana: -1,
    requiredEnergy: 10,
    type: ActionTypeEnum.HEALING,
    power: PowerEnum.PHYSICAL,
    emitValueMultiply: 0.2, //heal self 20% of health
  },
  [TraitEnum.INSECT]: {
    name: "poison",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1.1,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.POISON,
    duration: 2 * BASE_ROUND,
  },
  [TraitEnum.SPIRIT]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: -1,
    power: PowerEnum.MAGICAL,
    effectStatus: StatusEnum.FREEZE,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.BIG_CREATURE]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
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
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 0.2,
    emitValue: -1,
    power: PowerEnum.PHYSICAL,
    repeat: 10,
    duration: 1 * BASE_ROUND,
    methodSkill(props) {
      const { sourceEntity, targetEntity, thisSkill } = props;
      const blockedDamage = BASE_DAMAGE_REDUCTION * targetEntity.DEF;
      const damageMade = sourceEntity.ATK * thisSkill.skill.emitValueMultiply;
      const resultDamage = Math.max(0, damageMade - blockedDamage);
      const effectedTarget: EntityInstance = new EntityInstance({
        ...targetEntity,
        entity: {
          ...targetEntity.entity,
          health: targetEntity.entity.health - resultDamage,
        },
      });

      return {
        updatedSource: sourceEntity,
        effectedTarget,
        damageMade,
        blockedDamage,
        resultDamage,
      };
    },
  },
  [TraitEnum.UNARMED_ROBOT]: {
    name: "Untouchable",
    type: ActionTypeEnum.DEFEND,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 2,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.IMMUNITY_PHYSICAL,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.CYBORG]: {
    name: "",
    type: ActionTypeEnum.DEFEND,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
    effectStatus: StatusEnum.IMMUNITY_PHYSICAL,
    duration: 1 * BASE_ROUND,
  },
  [TraitEnum.AUTOMATION]: {
    name: "self repair",
    type: ActionTypeEnum.HEALING,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.GOBLIN]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: 0,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.ELF]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.ORC]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.DEMON]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.ANGEL]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.MAGIC_GOLEM]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.UNKNOWN]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
  [TraitEnum.INHUMAN]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: 10,
    requiredMana: -1,
    emitValueMultiply: 1,
    power: PowerEnum.PHYSICAL,
  },
  [TraitEnum.MAGIC_ANIMAL]: {
    name: "",
    type: ActionTypeEnum.ATTACK,
    requiredEnergy: -1,
    requiredMana: 10,
    emitValueMultiply: 1,
    power: PowerEnum.MAGICAL,
  },
};
