import { PowerEnum } from "@/data/enums/power";
import { EntityInstance } from "./entity";
import { ActionTypeEnum } from "@/data/enums/actions";
import { StatusEnum } from "@/data/enums/status";
import { BASE_DAMAGE_REDUCTION } from "@/utils/constants";

type ResultAffect = {
  updatedSource: EntityInstance;
  effectedTarget: EntityInstance;
  damageMade: number;
  blockedDamage: number;
  resultDamage: number;
};

export type Skill = {
  name: string;
  describe?: string;
  type: ActionTypeEnum;
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
  methodSkill?: (props: {
    sourceEntity: EntityInstance;
    targetEntity: EntityInstance;
    thisSkill: SkillInstance;
  }) => ResultAffect;
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
    return this.skill.type === ActionTypeEnum.ATTACK;
  }

  get isDefSkill(): boolean {
    return this.skill.type === ActionTypeEnum.DEFEND;
  }

  get type(): ActionTypeEnum {
    return this.skill.type;
  }

  effectToTarget(props: {
    sourceEntity: EntityInstance;
    targetEntity: EntityInstance;
  }): ResultAffect {
    const { sourceEntity: source, targetEntity: target } = props;

    if (this.skill.methodSkill) {
      const {
        updatedSource,
        effectedTarget,
        damageMade,
        blockedDamage,
        resultDamage,
      } = this.skill.methodSkill({
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
      };
    }

    const defaultAttackMethod = () => {
      const blockedDamage = BASE_DAMAGE_REDUCTION * target.DEF;
      const damageMade = Math.round(
        source.entity.attackPower * this.skill.emitValueMultiply
      );
      const resultDamage = Math.max(0, Math.abs(damageMade - blockedDamage));
      target.entity.health -= resultDamage;

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade,
        blockedDamage,
        resultDamage,
      };
    };

    let result;
    switch (this.type) {
      case ActionTypeEnum.ATTACK:
        result = defaultAttackMethod();
        break;
      // case ActionTypeEnum.DEFEND:
      //   result = defaultDefendMethod();
      //   break;
      default:
        break;
    }

    return (
      result || {
        updatedSource: source,
        effectedTarget: target,
        damageMade: 0,
        blockedDamage: 0,
        resultDamage: 0,
      }
    );
  }

  effectToSelf(sourceEntity: EntityInstance): EntityInstance {
    if (this.isAttackSkill) throw new Error("can not use attack skill to self");

    const defaultDefendSelfMethod = (): EntityInstance => {
      if (sourceEntity.DEF > -1 && this.isDefSkill) {
        const multiplier = this.skill.emitValueMultiply;
        const emitValue = this.skill.emitValue;
        if (sourceEntity.entity.defend) {
          if (multiplier > 0) {
            sourceEntity.entity.defend *= this.skill.emitValueMultiply;
          } else {
            sourceEntity.entity.defend +=
              emitValue || multiplier * sourceEntity.DEF;
          }
        }
        //maybe this can be reusable code
        if (sourceEntity.hasDurationSkills) {
          sourceEntity.activeSkills = sourceEntity.listDurationSkill;
        }
      }
      return sourceEntity;
    };

    let result;
    switch (this.type) {
      case ActionTypeEnum.DEFEND:
        result = defaultDefendSelfMethod();
        break;
      default:
        break;
    }

    return result || sourceEntity;
  }
}
