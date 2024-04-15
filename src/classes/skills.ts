import { EntityInstance } from "./entity";
import { PowerType } from "./powerType";

export type Skill = {
  name: string;
  isAttackSkill: boolean;
  type: PowerType;
  requiredEnergy?: number;
  requiredHealth?: number;
  comboAble?: true;
  comboWith?: Skill;
  emitValueMultiply: number;
  emitValue?: number;
  requiredMana: number;
  duration?: number;
};

export class SkillInstance {
  skill: Skill;
  remainingTurn: number;

  constructor(props: { skill: Skill; remainingTurn: number }) {
    this.skill = props.skill;
    this.remainingTurn = props.remainingTurn;
  }

  get name(): string {
    return this.skill.name;
  }

  get isSkillRequiredEnergy(): boolean {
    const ep = this.skill.requiredEnergy ?? -1;
    return ep > -1;
  }

  get isAttackSkill(): boolean {
    return (
      this.skill.isAttackSkill &&
      (this.skill.type === "physical" || this.skill.type === "magic")
    );
  }

  get isDefSkill(): boolean {
    return this.skill.type === "defend";
  }

  get type() {
    return this.skill.type;
  }

  effectToTarget(props: {
    sourceEntity: EntityInstance;
    targetEntity: EntityInstance;
  }): {
    updatedSource: EntityInstance;
    effectedTarget: EntityInstance;
    damageMade: number;
    blockedDamage: number;
    resultDamage: number;
  } {
    const { sourceEntity: source, targetEntity: target } = props;
    const targetDef = target.entity.defend ?? 0;
    const blockedDamage = 0.25 * targetDef;
    const damageMade = Math.round(
      source.entity.attackPower * this.skill.emitValueMultiply
    );
    const resultDamage = Math.max(0, damageMade - blockedDamage);
    if (this.skill.isAttackSkill) {
      target.entity.health -= resultDamage;
      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade,
        blockedDamage,
        resultDamage,
      };
    }
    //not attack skill
    switch (this.skill.type) {
      case "defend":
        if (source.entity.defend && this.skill.emitValue) {
          source.entity.defend += this.skill.emitValue;
        }
        break;
      default:
        break;
    }
    return {
      updatedSource: source,
      effectedTarget: target,
      damageMade,
      blockedDamage,
      resultDamage,
    };
  }

  effectToSelf(sourceEntity: EntityInstance): EntityInstance {
    if (this.skill.isAttackSkill)
      throw new Error("can not use attack skill to self");
    switch (this.skill.type) {
      case "defend":
        if (sourceEntity.entity.defend && this.skill.emitValue) {
          sourceEntity.entity.defend += this.skill.emitValue;
          if (sourceEntity.hasDurationSkills()) {
            sourceEntity.activeSkills = sourceEntity.listDurationSkill;
          }
        }
        return sourceEntity;
      case "restore":
        if (sourceEntity.entity.energy > -1 && this.skill.emitValue) {
          sourceEntity.entity.energy += this.skill.emitValue;
        }
        if (sourceEntity.entity.mana > -1 && this.skill.emitValue) {
          sourceEntity.entity.mana += this.skill.emitValue;
        }
        return sourceEntity;
      default:
        return sourceEntity;
    }
  }
}
