import { PowerEnum } from "@/data/enums/powers";
import { Entity } from "./entity";
import { EmitTypeEnum } from "@/data/enums/actions";
import { BASE_DAMAGE_REDUCTION } from "@/utils/constants";
import {
  EffectSkillEnum,
  listDefaultEffectSkill as listDefaultEffectSkill,
} from "@/data/enums/effectSkills";

type ResultAffectSingle = {
  updatedSource: Entity;
  effectedTarget: Entity;
  damageMade: number;
  blockedDamage: number;
  resultDamage: number;
  missed: boolean;
};

type ResultAffectMultiple = {
  updatedSource: Entity;
  effectedTargets: Entity[];
  resultDamage: number;
};

export type SkillType = {
  id?: string;
  name: string;
  describe?: string;
  type: EmitTypeEnum;
  requiredEnergy: number;
  requiredMana: number;
  requiredHealth?: number;
  comboAble?: true;
  comboWith?: string;
  comboSkill?: Skill;
  emitValueMultiply: number;
  emitValue?: number;
  power: PowerEnum;
  duration?: number;
  repeat?: number;
  randomTarget?: true | boolean;
  soundPath?: string;
  specialToTargetMethod?: (props: {
    sourceEntity: Entity;
    targetEntity: Entity;
    thisSkill: Skill;
  }) => ResultAffectSingle;
};

export class Skill implements SkillType {
  duration: number;
  describe?: string;
  requiredEnergy: number;
  requiredMana: number;
  requiredHealth: number;
  // comboAble: boolean;
  // comboWith: SkillType | null;
  power: PowerEnum;
  repeat: number;
  randomTarget: boolean;
  name: string;
  type: EmitTypeEnum;
  emitValueMultiply: number;
  emitValue: number;
  soundPath?: string;
  specialToTargetMethod?:
    | ((props: {
        sourceEntity: Entity;
        targetEntity: Entity;
        thisSkill: Skill;
      }) => ResultAffectSingle)
    | undefined;

  constructor({
    name,
    type,
    emitValueMultiply,
    duration,
    describe,
    requiredEnergy,
    requiredMana,
    requiredHealth,
    // comboAble,
    // comboWith,
    power,
    repeat,
    randomTarget,
    emitValue,
    soundPath,
    specialToTargetMethod,
  }: {
    name: string;
    type: EmitTypeEnum;
    emitValueMultiply: number;
    duration?: number;
    describe?: string;
    requiredEnergy?: number;
    requiredMana?: number;
    requiredHealth?: number;
    // comboAble?: true;
    // comboWith?: SkillType;
    power: PowerEnum;
    repeat?: number;
    randomTarget?: boolean;
    emitValue?: number;
    soundPath?: string | undefined;
    specialToTargetMethod?: (props: {
      sourceEntity: Entity;
      targetEntity: Entity;
      thisSkill: Skill;
    }) => ResultAffectSingle;
  }) {
    this.name = name;
    this.type = type;
    this.emitValueMultiply = emitValueMultiply;
    this.duration = duration ?? 0;
    this.describe = describe;
    this.requiredEnergy = requiredEnergy ?? -1;
    this.requiredMana = requiredMana ?? -1;
    this.requiredHealth = requiredHealth ?? -1;
    // this.comboAble = comboAble ?? false;
    // this.comboWith = comboWith ?? null;
    this.power = power;
    this.repeat = repeat ?? 0;
    this.randomTarget = randomTarget ?? false;
    this.emitValue = emitValue ?? 0;
    this.soundPath = soundPath;
    this.specialToTargetMethod = specialToTargetMethod;
  }

  get isAttackSkill(): boolean {
    const attacks = [EmitTypeEnum.ATTACK, EmitTypeEnum.ATTACK_AOE];
    return attacks.includes(this.type);
  }

  get isDefendSkill(): boolean {
    const defs = [EmitTypeEnum.DEFEND, EmitTypeEnum.DEFEND_AOE];
    return defs.includes(this.type);
  }

  get isHealSkill(): boolean {
    const heals = [EmitTypeEnum.HEALING, EmitTypeEnum.HEALING_AOE];
    return heals.includes(this.type);
  }

  get hasDuration() {
    return this.duration > 0 ? true : false;
  }

  get isAttackAOE() {
    return this.type === EmitTypeEnum.ATTACK_AOE;
  }

  get requiredTotalManaOrEnergy() {
    return (
      (Math.max(0, this.requiredEnergy) + Math.max(0, this.requiredMana)) *
      this.repeat
    );
  }

  effectToTarget(props: {
    sourceEntity: Entity;
    targetEntity: Entity;
  }): ResultAffectSingle {
    const { sourceEntity: source, targetEntity: target } = props;
    const blockedDamage = BASE_DAMAGE_REDUCTION * target.defend;
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
    if (this.specialToTargetMethod) {
      const {
        updatedSource,
        effectedTarget,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      } = this.specialToTargetMethod({
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
      const damageMade = Math.round(
        source.attackPower * this.emitValueMultiply
      );
      let resultDamage = Math.max(0, damageMade - blockedDamage);
      if (randomValue < evasion) {
        resultDamage = 0;
        missed = true;
      }

      target.health -= resultDamage;

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      };
    };
    const defaultHealMethod = (): ResultAffectSingle => {
      const healAmount = Math.round(
        source.attackPower * this.emitValueMultiply
      );

      target.health += Math.min(target.maxHealth, healAmount);

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade: 0,
        blockedDamage,
        resultDamage: 0,
        missed,
      };
    };

    switch (this.type) {
      case EmitTypeEnum.ATTACK:
        result = defaultAttackMethod();
        break;
      case EmitTypeEnum.HEALING:
        result = defaultHealMethod();
        break;
      default:
        break;
    }

    return result;
  }

  effectToSelf(sourceEntity: Entity): Entity {
    if (this.isAttackSkill) throw new Error("can not use attack skill to self");

    const defaultDefendSelfMethod = (): Entity => {
      // if (this.isDefendSkill) {
      //   if (sourceEntity.DEF > 0) {
      //     if (this.emitValueMultiply > 0) {
      //       sourceEntity.entity.defend! *= this.emitValueMultiply;
      //     } else {
      //       sourceEntity.entity.defend! += this.emitValue;
      //     }
      //     sourceEntity.updateSelfActiveSkills();
      //   }
      // }
      const defaultEffectDef =
        listDefaultEffectSkill[EffectSkillEnum.ENHANCE_DEFEND];
      if (this.emitValueMultiply > 0) {
        defaultEffectDef.emitValueMultiplier = this.emitValueMultiply;
      }
      sourceEntity.applyEffectSkills(defaultEffectDef);

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

  effectToAOE(props: { sourceEntity: Entity; targetEntities: Entity[] }) {
    const { sourceEntity: source, targetEntities: targets } = props;
    const damageBase = Math.round(source.attackPower * this.emitValueMultiply);
    let resultDamage = 0;
    let result: ResultAffectMultiple = {
      updatedSource: source,
      effectedTargets: targets,
      resultDamage: 0,
    };
    const defaultAttackAOEMethod = (): ResultAffectMultiple => {
      if (this.randomTarget) {
        let targetIndex = Math.floor(Math.random() * targets.length);
        const aliveTargetsCount = targets.filter(
          (target) => target.isAlive
        ).length;
        while (!targets[targetIndex].isAlive && aliveTargetsCount !== 0) {
          targetIndex = Math.floor(Math.random() * targets.length);
          if (targets[targetIndex].isAlive) break;
        }

        const blockedDamage =
          BASE_DAMAGE_REDUCTION * targets[targetIndex].defend;

        const evasion = targets[targetIndex].evasion;
        const randomValue = Math.random();
        resultDamage = Math.max(0, damageBase - blockedDamage);
        if (randomValue < evasion) {
          resultDamage = 0;
        }
        targets[targetIndex].health -= resultDamage;
      } else {
        for (const target of targets) {
          const blockedDamage = BASE_DAMAGE_REDUCTION * target.defend;
          const evasion = target.evasion;
          const randomValue = Math.random();

          resultDamage += Math.max(0, damageBase - blockedDamage);

          if (randomValue < evasion) {
            resultDamage = 0;
          }

          target.health -= resultDamage;
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
        target.applyEffectSkills(
          listDefaultEffectSkill[EffectSkillEnum.ENHANCE_DEFEND]
        );
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
