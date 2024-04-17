import { PowerEnum } from "@/data/enums/powers";
import { EntityInstance } from "./entity";
import { EmitTypeEnum } from "@/data/enums/actions";
import { StatusEnum, listStatus } from "@/data/enums/status";
import { BASE_DAMAGE_REDUCTION } from "@/utils/constants";

type ResultAffectSingle = {
  updatedSource: EntityInstance;
  effectedTarget: EntityInstance;
  damageMade: number;
  blockedDamage: number;
  resultDamage: number;
  missed: boolean;
};

type ResultAffectMultiple = {
  updatedSource: EntityInstance;
  effectedTargets: EntityInstance[];
  resultDamage: number;
};

export type Skill = {
  name: string;
  describe?: string;
  type: EmitTypeEnum;
  requiredEnergy: number;
  requiredMana: number;
  requiredHealth?: number;
  comboAble?: true;
  comboWith?: Skill;
  emitValueMultiply: number;
  emitValue?: number;
  power: PowerEnum;
  effectStatus?: StatusEnum;
  duration?: number;
  repeat?: number;
  random?: true;
  specialToTargetMethod?: (props: {
    sourceEntity: EntityInstance;
    targetEntity: EntityInstance;
    thisSkill: SkillInstance;
  }) => ResultAffectSingle;
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
    const attackTypes = [EmitTypeEnum.ATTACK, EmitTypeEnum.ATTACK_AOE];
    return attackTypes.includes(this.skill.type);
  }

  get isDefendSkill(): boolean {
    const defTypes = [EmitTypeEnum.DEFEND, EmitTypeEnum.DEFEND_AOE];
    return defTypes.includes(this.skill.type);
  }

  get type(): EmitTypeEnum {
    return this.skill.type;
  }

  get hasDuration() {
    return this.skill.duration ?? 0;
  }

  get isAttackAOE() {
    return this.skill.type === EmitTypeEnum.ATTACK_AOE;
  }

  get repeatTimes() {
    return this.skill.repeat ?? 0;
  }

  get emitValueMultiply() {
    return this.skill.emitValueMultiply;
  }

  get emitValue() {
    return this.skill.emitValue ?? 0;
  }

  get requiredTotalManaOrEnergy() {
    return (
      (Math.max(0, this.skill.requiredEnergy) +
        Math.max(0, this.skill.requiredMana)) *
      (this.skill.repeat ?? 1)
    );
  }

  get isRandom() {
    return this.skill.random;
  }

  effectToTarget(props: {
    sourceEntity: EntityInstance;
    targetEntity: EntityInstance;
  }): ResultAffectSingle {
    const { sourceEntity: source, targetEntity: target } = props;
    const blockedDamage = BASE_DAMAGE_REDUCTION * target.DEF;
    const evasion = target.evasion;
    const randomValue = Math.random();
    let missed = false;
    let result: ResultAffectSingle = {
      updatedSource: source,
      effectedTarget: target,
      damageMade: 0,
      blockedDamage: 0,
      resultDamage: 0,
      missed: false,
    };

    //special method
    if (this.skill.specialToTargetMethod) {
      const {
        updatedSource,
        effectedTarget,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      } = this.skill.specialToTargetMethod({
        sourceEntity: source,
        targetEntity: target,
        thisSkill: this,
      });
      return {
        updatedSource: updatedSource,
        effectedTarget: effectedTarget,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      };
    }

    const defaultAttackMethod = (): ResultAffectSingle => {
      const damageMade = Math.round(source.ATK * this.skill.emitValueMultiply);
      let resultDamage = Math.max(0, damageMade - blockedDamage);
      if (randomValue < evasion) {
        resultDamage = 0;
        missed = true;
      }

      target.entity.health -= resultDamage;

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      };
    };

    switch (this.type) {
      case EmitTypeEnum.ATTACK:
        result = defaultAttackMethod();
        break;
      default:
        break;
    }

    return result;
  }

  effectToSelf(sourceEntity: EntityInstance): EntityInstance {
    if (this.isAttackSkill) throw new Error("can not use attack skill to self");

    const defaultDefendSelfMethod = (): EntityInstance => {
      if (sourceEntity.DEF > 0 && this.isDefendSkill) {
        if (this.emitValueMultiply > 0) {
          sourceEntity.entity.defend! *= this.emitValueMultiply;
        } else {
          sourceEntity.entity.defend! += this.emitValue;
        }
        sourceEntity.updateSelfActiveSkills();
      }
      return sourceEntity;
    };

    let result;
    switch (this.type) {
      case EmitTypeEnum.DEFEND:
        result = defaultDefendSelfMethod();
        break;
      default:
        break;
    }

    return result || sourceEntity;
  }

  effectToAOE(props: {
    sourceEntity: EntityInstance;
    targetEntities: EntityInstance[];
  }) {
    const { sourceEntity: source, targetEntities: targets } = props;
    const damageBase = Math.round(source.ATK * this.skill.emitValueMultiply);
    let resultDamage = 0;
    let result: ResultAffectMultiple = {
      updatedSource: source,
      effectedTargets: targets,
      resultDamage: 0,
    };
    const defaultAttackAOEMethod = (): ResultAffectMultiple => {
      if (this.isRandom) {
        const targetIndex = Math.round(Math.random() * 10) % targets.length;
        const blockedDamage = BASE_DAMAGE_REDUCTION * targets[targetIndex].DEF;
        const evasion = targets[targetIndex].evasion;
        const randomValue = Math.random();
        resultDamage = Math.max(0, damageBase - blockedDamage);
        if (randomValue < evasion) {
          resultDamage = 0;
        }
        targets[targetIndex].entity.health -= resultDamage;
      } else {
        for (const target of targets) {
          const blockedDamage = BASE_DAMAGE_REDUCTION * target.DEF;
          const evasion = target.evasion;
          const randomValue = Math.random();

          resultDamage = Math.max(0, damageBase - blockedDamage);

          if (randomValue < evasion) {
            resultDamage = 0;
          }

          target.entity.health -= resultDamage;
        }
      }
      return {
        updatedSource: source,
        effectedTargets: targets,
        resultDamage,
      };
    };
    const defaultDefendAOEMethod = (): ResultAffectMultiple => {
      for (const target of targets) {
        target.applyStatus(listStatus[StatusEnum.DEFENSIVE]);
      }
      return {
        updatedSource: source,
        effectedTargets: targets,
        resultDamage,
      };
    };

    switch (this.type) {
      case EmitTypeEnum.ATTACK_AOE:
        result = defaultAttackAOEMethod();
        break;
      case EmitTypeEnum.DEFEND_AOE:
        result = defaultDefendAOEMethod();
        break;
      default:
        break;
    }

    return result;
  }
}
