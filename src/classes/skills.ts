import { EmitTypeEnum } from "@/data/enums/actions";
import { PowerEnum } from "@/data/enums/powers";
import {
  EffectSkillEnum,
  listDefaultEffectSkill,
} from "@/data/enums/effectSkills";
import { BASE_DAMAGE_REDUCTION } from "@/utils/constants";
import { EffectSkill } from "./effect";
import { Entity } from "./entity";

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

export class Skill {
  id?: string;
  name: string;
  effectSkill?: EffectSkill;
  describe?: string;
  requiredEnergy: number;
  requiredMana: number;
  requiredHealth: number;
  comboAble?: { id: string; skill: Skill };
  power: PowerEnum;
  repeat: number;
  randomTarget: boolean;
  emitType: EmitTypeEnum;
  emitValueMultiply: number;
  soundPath?: string;
  specialToTargetMethod?:
    | ((props: {
        sourceEntity: Entity;
        targetEntity: Entity;
        thisSkill: Skill;
      }) => ResultAffectSingle)
    | undefined;

  constructor({
    id,
    name,
    emitType,
    emitValueMultiply,
    describe,
    requiredEnergy,
    requiredMana,
    requiredHealth,
    comboAble,
    power,
    repeat,
    randomTarget,
    soundPath,
    specialToTargetMethod,
    effectSkill,
  }: {
    id?: string;
    name: string;
    emitType: EmitTypeEnum;
    emitValueMultiply: number;
    duration?: number;
    describe?: string;
    requiredEnergy?: number;
    requiredMana?: number;
    requiredHealth?: number;
    comboAble?: { id: string; skill: Skill };
    power: PowerEnum;
    repeat?: number;
    randomTarget?: boolean;
    soundPath?: string | undefined;
    specialToTargetMethod?: (props: {
      sourceEntity: Entity;
      targetEntity: Entity;
      thisSkill: Skill;
    }) => ResultAffectSingle;
    effectSkill?: EffectSkill;
  }) {
    this.id = id;
    this.name = name;
    this.emitType = emitType;
    this.emitValueMultiply = emitValueMultiply;
    this.describe = describe;
    this.requiredEnergy = requiredEnergy ?? -1;
    this.requiredMana = requiredMana ?? -1;
    this.requiredHealth = requiredHealth ?? -1;
    this.comboAble = comboAble;
    this.power = power;
    this.repeat = repeat ?? 0;
    this.randomTarget = randomTarget ?? false;
    this.soundPath = soundPath;
    this.specialToTargetMethod = specialToTargetMethod;
    this.effectSkill = effectSkill;
  }

  get isAttackSkill(): boolean {
    const attacks = [
      EmitTypeEnum.ATTACK,
      EmitTypeEnum.ATTACK_AOE,
      EmitTypeEnum.DE_BUFF,
    ];
    return attacks.includes(this.emitType);
  }

  get isDefendSkill(): boolean {
    const defs = [EmitTypeEnum.DEFEND, EmitTypeEnum.DEFEND_AOE];
    return defs.includes(this.emitType);
  }

  get isHealSkill(): boolean {
    const heals = [EmitTypeEnum.HEALING, EmitTypeEnum.HEALING_AOE];
    return heals.includes(this.emitType);
  }

  get isAttackAOE() {
    return this.emitType === EmitTypeEnum.ATTACK_AOE;
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
    const blockedDamage = BASE_DAMAGE_REDUCTION * (target.defense.value ?? 1);
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

    const defaultAttack = (): ResultAffectSingle => {
      const damageMade = Math.round(
        source.attack.value * this.emitValueMultiply
      );
      let resultDamage = Math.max(0, damageMade - blockedDamage);
      if (randomValue < evasion) {
        resultDamage = 0;
        missed = true;
      }

      target.health.value -= resultDamage;

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade,
        blockedDamage,
        resultDamage,
        missed,
      };
    };
    const defaultHeal = (): ResultAffectSingle => {
      if (!source.heal) throw new Error("this entity can not heal");
      const amount = Math.round(source.heal.value * this.emitValueMultiply);

      target.health.value = Math.min(
        target.health.max,
        target.health.value + amount
      );

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade: 0,
        blockedDamage,
        resultDamage: 0,
        missed,
      };
    };
    const defaultBuffAndDeBuff = (): ResultAffectSingle => {
      const effect = this.effectSkill;
      if (effect) {
        //if this skill has emit use this instead effect
        if (this.emitValueMultiply > 0) {
          effect.emitValueMultiplier = this.emitValueMultiply;
        }
        target.applyEffectSkills({ ...effect });
      }

      return {
        updatedSource: source,
        effectedTarget: target,
        damageMade: 0,
        blockedDamage,
        resultDamage: 0,
        missed,
      };
    };

    switch (this.emitType) {
      case EmitTypeEnum.ATTACK:
        result = defaultAttack();
        break;
      case EmitTypeEnum.HEALING:
        result = defaultHeal();
        break;
      case EmitTypeEnum.BUFF:
        result = defaultBuffAndDeBuff();
        break;
      case EmitTypeEnum.DE_BUFF:
        result = defaultBuffAndDeBuff();
        break;
      default:
        break;
    }

    return result;
  }

  effectToSelf(sourceEntity: Entity): Entity {
    if (this.isAttackSkill) throw new Error("can not use attack skill to self");

    const defaultDefendSelfMethod = (): Entity => {
      const defaultEffectDef =
        listDefaultEffectSkill[EffectSkillEnum.ENHANCE_DEFEND];
      if (this.emitValueMultiply > 0) {
        //use value from skill instead effectSkill
        defaultEffectDef.emitValueMultiplier = this.emitValueMultiply;
      }
      sourceEntity.applyEffectSkills({ ...defaultEffectDef });

      return sourceEntity;
    };

    let result;
    switch (this.emitType) {
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
    const damageBase = Math.round(source.attack.value * this.emitValueMultiply);
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
          BASE_DAMAGE_REDUCTION * targets[targetIndex].defense.value;

        const evasion = targets[targetIndex].evasion;
        const randomValue = Math.random();
        resultDamage = Math.max(0, damageBase - blockedDamage);
        if (randomValue < evasion) {
          resultDamage = 0;
        }
        targets[targetIndex].health.value -= resultDamage;
      } else {
        for (const target of targets) {
          const blockedDamage = BASE_DAMAGE_REDUCTION * target.defense.value;
          const evasion = target.evasion;
          const randomValue = Math.random();

          resultDamage += Math.max(0, damageBase - blockedDamage);

          if (randomValue < evasion) {
            resultDamage = 0;
          }

          target.health.value -= resultDamage;
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

    switch (this.emitType) {
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
