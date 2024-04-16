import { Skill, SkillInstance } from "./skills";
import { Armor } from "./armor";
import { Weapon } from "./weapon";
import { StatusEnum } from "../data/enums/status";
import { TraitEnum } from "@/data/enums/trait";
import { PositionEnum } from "@/data/enums/position";
import { ActionTypeEnum } from "@/data/enums/actions";

export type Entity = {
  id: number;
  name: string;
  imageUrl: string;
  level: number;
  skills: Skill[];
  normalHitSkill: Skill;
  traitSkill: Skill;
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
    weapon?: Weapon;
    armor?: Armor;
  };
  status: StatusEnum;
  speed: number;
  trait: TraitEnum;
  restoreManaOrEnergy: number;
  restoreHealth?: number;
  evasion: number;
};

export class EntityInstance {
  instanceId: string;
  entity: Entity;
  index: number;
  position: PositionEnum;
  playable: boolean;
  activeSkills: SkillInstance[];

  constructor(props: {
    instanceId: string;
    entity: Entity;
    index: number;
    position: PositionEnum;
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

  get DEF() {
    return this.entity.defend ?? 0;
  }
  get MP() {
    return this.entity.mana ?? 0;
  }
  get EP() {
    return this.entity.energy ?? 0;
  }
  get MANERGY() {
    return this.entity.energy + this.entity.mana;
  }

  get trait() {
    return this.entity.trait;
  }

  get evasion() {
    return this.entity.evasion;
  }

  get isBoss() {
    const boss = [
      TraitEnum.BOSS_DOZOJO,
      TraitEnum.BOSS_NEXOS,
      TraitEnum.BOSS_VEXARIA,
    ];
    return boss.includes(this.entity.trait);
  }

  get listDurationSkill(): SkillInstance[] {
    return this.allSkills
      .slice(1)
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

  get allSkills(): Skill[] {
    return [
      this.entity.normalHitSkill,
      ...this.entity.skills,
      this.entity.traitSkill,
    ];
  }

  get traitSkill() {
    return this.entity.traitSkill;
  }

  get normalHitSkill() {
    return this.entity.normalHitSkill;
  }

  get hasDefSkill(): Skill[] {
    return this.allSkills.filter(
      (skill) => skill.type === ActionTypeEnum.DEFEND
    );
  }

  get hasDurationSkills(): boolean {
    return this.allSkills.some((skill) => skill.duration);
  }

  get hasActiveSkill() {
    return this.activeSkills.length > 0;
  }

  get isAlive() {
    return this.entity.health > 0;
  }

  get isUseEnergy() {
    return this.entity.energy > -1;
  }

  get isUseMana() {
    return this.entity.mana > -1;
  }

  get isUseHybrid() {
    return this.entity.energy > -1 && this.entity.mana > -1;
  }

  calculateDamageMadeBy(props: { skill: Skill }): number {
    const { skill } = props;
    return Math.round(this.entity.attackPower * skill.emitValueMultiply);
  }

  hasEnoughManaFor(props: { skill: Skill }): boolean {
    const { skill } = props;

    if (this.entity.energy > -1) {
      return this.entity.energy >= skill.requiredEnergy;
    }
    if (this.entity.mana > -1) {
      return this.entity.mana >= skill.requiredMana;
    }
    return false;
  }

  updateManaFromUse(props: { skill: Skill }): EntityInstance {
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

  get hasOverDefend(): boolean {
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

  updateStat(): EntityInstance {
    for (let i = 0; i < this.activeSkills.length; i++) {
      const instanceSkill = this.activeSkills[i];
      if (instanceSkill.remainingTurn === 0) {
        switch (instanceSkill.type) {
          case ActionTypeEnum.DEFEND:
            //reset to default
            this.entity.defend! = this.entity.maxDefendPower!;
            break;
          default:
            break;
        }
        this.activeSkills.splice(i, 1);
      }
    }
    return this;
  }
}
