import { Skill } from "./skills";
import { Armor } from "./armor";
import { Weapon } from "./weapon";
import { TraitEnum } from "@/data/enums/traits";
import { PositionEnum } from "@/data/enums/positions";
import { EmitTypeEnum } from "@/data/enums/actions";
import { StatusEnum } from "@/data/enums/status";
import {
  EffectSkillEnum,
  listDefaultEffectSkill,
} from "@/data/enums/effectSkills";
import { EffectSkill } from "./effect";

export type EntityType = {
  id: number;
  name: string;
  imageUrl: string;
  level: number;
  equipmentSkills?: Skill[];
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
  position: PositionEnum | PositionEnum.NONE;
  // holdingItem : item[]
  evasion: number;
};

export class Entity implements EntityType {
  instanceId: string;
  id: number;
  status: StatusEnum;
  evasion: number;
  index: number;
  trait: TraitEnum;
  position: PositionEnum;
  playable: boolean;
  activateSkills: Skill[];
  effectedSkills: EffectSkill[];
  equipmentSkills: Skill[];
  normalHitSkill: Skill;
  traitSkill: Skill;
  name: string;
  imageUrl: string;
  level: number;
  attackPower: number;
  healingPower: number;
  defend: number;
  health: number;
  mana: number;
  energy: number;
  maxManaEnergyPower: number;
  maxHealth: number;
  maxDefendPower: number;
  maxAttackPower: number;
  equipment?:
    | { weapon?: Weapon | undefined; armor?: Armor | undefined }
    | undefined;
  speed: number;
  restoreManaOrEnergy: number;
  restoreHealth: number;
  constructor({
    id,
    instanceId,
    name,
    index,
    position,
    playable,
    activateSkills,
    effectedSkills,
    imageUrl,
    level,
    attackPower,
    healingPower,
    defend,
    health,
    mana,
    energy,
    maxManaEnergyPower,
    maxHealth,
    maxDefendPower,
    maxAttackPower,
    equipment,
    speed,
    restoreManaOrEnergy,
    equipmentSkills,
    trait,
    normalHitSkill,
    traitSkill,
    status,
    evasion,
    restoreHealth,
  }: {
    id: number;
    instanceId: string;
    name: string;
    index: number;
    position: PositionEnum;
    playable: boolean;
    activateSkills?: Skill[];
    effectedSkills?: EffectSkill[];
    imageUrl: string;
    level: number;
    attackPower: number;
    healingPower: number;
    defend: number;
    health: number;
    mana: number;
    energy: number;
    maxManaEnergyPower: number;
    maxHealth: number;
    maxDefendPower: number;
    maxAttackPower: number;
    equipment?:
      | { weapon?: Weapon | undefined; armor?: Armor | undefined }
      | undefined;
    speed: number;
    restoreManaOrEnergy: number;
    equipmentSkills?: Skill[];
    trait: TraitEnum;
    normalHitSkill: Skill;
    traitSkill: Skill;
    status: StatusEnum;
    evasion: number;
    restoreHealth: number;
  }) {
    this.id = id;
    this.instanceId = instanceId;
    this.name = name;
    this.imageUrl = imageUrl;
    this.index = index;
    this.position = position;
    this.playable = playable;
    this.level = level;
    this.activateSkills = activateSkills ?? [];
    this.effectedSkills = effectedSkills ?? [];
    this.attackPower = attackPower;
    this.healingPower = healingPower;
    this.defend = defend;
    this.health = health;
    this.mana = mana;
    this.energy = energy;
    this.maxManaEnergyPower = maxManaEnergyPower;
    this.maxHealth = maxHealth;
    this.maxDefendPower = maxDefendPower;
    this.maxAttackPower = maxAttackPower;
    this.equipment = equipment;
    this.speed = speed;
    this.restoreManaOrEnergy = restoreManaOrEnergy;
    this.equipmentSkills = equipmentSkills ?? [];
    this.trait = trait;
    this.normalHitSkill = normalHitSkill;
    this.traitSkill = traitSkill;
    this.status = status;
    this.evasion = evasion;
    this.restoreHealth = restoreHealth;
  }

  get MANERGY() {
    return Math.max(0, this.energy) + Math.max(0, this.mana);
  }

  get isBoss() {
    const boss = [
      TraitEnum.BOSS_DOZOJO,
      TraitEnum.BOSS_NEXOS,
      TraitEnum.BOSS_VEXARIA,
    ];
    return boss.includes(this.trait);
  }

  get listDurationSkill(): Skill[] {
    return this.allSkills.slice(1);
  }

  get allSkills(): Skill[] {
    return [this.normalHitSkill, ...this.equipmentSkills, this.traitSkill];
  }

  get hasDefSkill(): Skill[] {
    return this.allSkills.filter((skill) => skill.type === EmitTypeEnum.DEFEND);
  }

  get hasAttackAOE(): Skill[] {
    return this.allSkills.filter(
      (skill) => skill.type === EmitTypeEnum.ATTACK_AOE
    );
  }

  get hasDurationSkills(): boolean {
    return this.allSkills.some((skill) => skill.duration > 0);
  }

  get hasActiveSkill() {
    return this.activateSkills.length > 0;
  }

  get isAlive() {
    return this.health > 0;
  }

  get isUseEnergy() {
    return this.energy > -1;
  }

  get isUseMana() {
    return this.mana > -1;
  }

  get isUseHybrid() {
    return this.energy > -1 && this.mana > -1;
  }

  calculateAmountMadeBy(props: { skill: Skill }): number {
    const { skill } = props;
    return Math.round(this.attackPower * skill.emitValueMultiply);
  }

  hasEnoughManaFor(props: { skill: Skill }): boolean {
    const { skill } = props;

    if (this.energy > -1) {
      return this.energy >= skill.requiredEnergy;
    }
    if (this.mana > -1) {
      return this.mana >= skill.requiredMana;
    }
    return false;
  }

  updateManaFromUse(props: { skill: Skill }): Entity {
    const { skill } = props;
    if (this.mana >= skill.requiredMana) {
      this.mana -= Math.max(0, skill.requiredMana);
    }
    if (this.energy >= (skill.requiredEnergy ?? 0)) {
      this.energy -= Math.max(0, skill.requiredEnergy ?? 0);
    }
    return this;
  }

  hasHealthLowerThan(props: {
    threshold: number;
    targetEntity?: EntityType;
  }): boolean {
    const { threshold, targetEntity } = props;
    if (targetEntity) {
      return targetEntity.health > this.health;
    }
    const ratio = parseFloat((this.health / this.maxHealth).toFixed(2));
    if (ratio <= threshold) {
      return true;
    }
    return false;
  }

  get hasOverDefend(): boolean {
    const def = this.defend ?? 0;
    const maxDef = this.maxDefendPower ?? 0;
    return def > maxDef;
  }

  getDifferentValueFromInitial(props: { stat: "atk" | "def" }): number {
    const def = this.defend ?? 0;
    const maxDef = this.maxDefendPower ?? 0;
    switch (props.stat) {
      case "atk":
        return Math.abs(this.maxAttackPower - this.attackPower);
      case "def":
        return Math.abs(maxDef - def);
      default:
        return 0;
    }
  }

  updateStatRemainingSkills(): Entity {
    for (let i = 0; i < this.activateSkills.length; i++) {
      const skill = this.activateSkills[i];
      if (skill.duration === 0) {
        this.defend = this.maxDefendPower;
        // switch (skill) {
        //   case skill:
        //     //reset to default
        //     break;
        //   default:
        //     break;
        // }
        this.activateSkills.splice(i, 1);
      }
    }
    for (let i = 0; i < this.effectedSkills.length; i++) {
      const skill = this.effectedSkills[i];
      console.log(skill);
      if (skill.duration === 0) {
        switch (skill.key) {
          case EffectSkillEnum.ENHANCE_DEFEND:
            //reset to default
            this.defend = this.maxDefendPower;
            break;
          default:
            break;
        }
        this.effectedSkills.splice(i, 1);
      }
    }
    return this;
  }

  applyEffectSkills(skill: EffectSkill) {
    if (skill.duration > 0) {
      this.effectedSkills.push(skill);
      switch (skill) {
        case listDefaultEffectSkill[EffectSkillEnum.ENHANCE_DEFEND]:
          this.defend += this.defend * skill.emitValueMultiplier;
          break;
        default:
          break;
      }
    }
  }
}
