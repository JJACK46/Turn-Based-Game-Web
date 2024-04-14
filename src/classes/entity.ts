import { Skill, SkillInstance } from "./skills";
import { Armor } from "./armor";
import { PowerType } from "./powerType";
import { Weapon } from "./weapon";
import { StatusEnum } from "../data/status";

export type Entity = {
  id: number;
  name: string;
  imageUrl: string;
  attackDamageType: PowerType;
  level: number;
  skills: Skill[];
  attackPower: number;
  healingPower?: number;
  defend?: number;
  health: number;
  mana: number;
  energy: number;
  maxManaEnergyPower: number;
  maxHealth: number;
  maxDefendPower?: number;
  maxAttackPower: number;
  equipment?: {
    weapon: Weapon;
    armor: Armor;
  };
  playable?: true;
  status: StatusEnum;
  canTakeDamage: boolean;
  speed: number;
  trait: string;
  restoreManaOrEnergy: number;
  restoreHealth?: number;
  evasion?: number;
};

export type Position = "front" | "back";

export class EntityInstance {
  instanceId: string;
  entity: Entity;
  index: number;
  position: Position;
  playable: boolean;
  activeSkills: SkillInstance[];

  constructor(props: {
    instanceId: string;
    entity: Entity;
    index: number;
    position: Position;
    playable: boolean;
    activeSkills?: SkillInstance[];
  }) {
    this.instanceId = props.instanceId;
    this.entity = props.entity;
    this.index = props.index;
    this.position = props.position;
    this.playable = props.playable;
    this.activeSkills = props.activeSkills ?? [];
  }

  get ATK() {
    return this.entity.attackPower;
  }

  get HP() {
    return this.entity.health;
  }

  get listDurationSkill(): SkillInstance[] {
    return this.entity.skills
      .filter(
        (skill): skill is Skill & { duration: number } =>
          skill.duration !== undefined
      )
      .map(
        (skill) =>
          new SkillInstance({
            skill,
            remainingTurn: skill.duration,
          })
      );
  }

  hasDurationSkills() {
    return this.entity.skills.some((skill) => skill.duration);
  }

  hasActiveSkill() {
    return this.activeSkills.length > 0;
  }

  isAlive() {
    return this.entity.health > 0;
  }

  isUseEnergyPower() {
    return this.entity.energy > -1;
  }

  getDamageMadeBy(props: { skill: Skill }): number {
    const { skill } = props;
    return Math.round(this.entity.attackPower * skill.emitValueMultiply);
  }

  hasEnoughManaFor(props: { skill: Skill }): boolean {
    const { skill } = props;
    const skillRequiredEnergy = skill.requiredEnergy ?? 0;

    if (this.entity.energy > -1) {
      return this.entity.energy >= skillRequiredEnergy;
    }
    if (this.entity.mana > -1) {
      return this.entity.mana >= skill.requiredMana;
    }
    return false;
  }

  updateManaFromUsed(props: { skill: Skill }): EntityInstance {
    const { skill } = props;
    if (this.entity.mana >= skill.requiredMana) {
      this.entity.mana -= Math.max(0, skill.requiredMana);
    }
    if (this.entity.energy >= (skill.requiredEnergy ?? 0)) {
      this.entity.energy -= Math.max(0, skill.requiredEnergy ?? 0);
    }
    return this;
  }

  hasHealthLowerThan(props: {
    threshold: number;
    targetEntity?: Entity;
  }): boolean {
    const { threshold, targetEntity } = props;
    if (targetEntity) {
      return targetEntity.health > this.entity.health;
    }
    const ratio = parseFloat(
      (this.entity.health / this.entity.maxHealth).toFixed(2)
    );
    if (ratio <= threshold) {
      return true;
    }
    return false;
  }

  hasOverDefend(): boolean {
    const def = this.entity.defend ?? 0;
    const maxDef = this.entity.maxDefendPower ?? 0;
    return def > maxDef;
  }

  getDifferentValueFromInitial(props: { stat: "atk" | "def" }): number {
    const def = this.entity.defend ?? 0;
    const maxDef = this.entity.maxDefendPower ?? 0;
    switch (props.stat) {
      case "atk":
        return Math.abs(this.entity.maxAttackPower - this.entity.attackPower);
      case "def":
        return Math.abs(maxDef - def);
      default:
        return 0;
    }
  }
}
