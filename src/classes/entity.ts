import { Skill } from "./skills";
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
  defendPower?: number;
  healingPower?: number;
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
  activeSkills?: Skill[];
};

export type Site = "front" | "back";

export class EntityInstance {
  entity: Entity;
  position: number;
  site: Site;

  constructor(props: { entity: Entity; position: number; site: Site }) {
    this.entity = props.entity;
    this.position = props.position;
    this.site = props.site;
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

  updateManaFromUsed(props: { skill: Skill }) {
    const { skill } = props;
    if (this.entity.mana > 0) {
      this.entity.mana -= skill.requiredMana;
    }
    if (this.entity.energy > 0 && skill.requiredEnergy) {
      this.entity.energy -= skill.requiredEnergy;
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
    const def = this.entity.defendPower ?? 0;
    const maxDef = this.entity.maxDefendPower ?? 0;
    return def > maxDef;
  }

  getDifferentValueFromInitial(props: { stat: "atk" | "def" }): number {
    const def = this.entity.defendPower ?? 0;
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
