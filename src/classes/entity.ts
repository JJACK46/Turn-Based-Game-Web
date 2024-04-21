import { Skill } from "./skills";
import { Armor } from "./armor";
import { Weapon } from "./weapon";
import { TraitEnum } from "@/data/enums/traits";
import { PositionEnum } from "@/data/enums/positions";
import { EmitTypeEnum } from "@/data/enums/actions";
import { StatusEnum } from "@/data/enums/status";
import { EffectSkillEnum } from "@/data/enums/effectSkills";
import { EffectSkill } from "./effect";

// export type EntityType = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   level: number;
//   equipmentSkills?: Skill[];
//   normalHitSkill: Skill;
//   traitSkill: Skill;
//   attackPower: number;
//   healingPower?: number;
//   defend?: number;
//   health: number;
//   mana: number;
//   energy: number;
//   maxManaEnergyPower: number;
//   maxHealth: number;
//   maxDefendPower?: number;
//   maxAttackPower: number;
//   equipment?: {
//     weapon?: Weapon;
//     armor?: Armor;
//   };
//   status: StatusEnum;
//   speed: number;
//   trait: TraitEnum;
//   restoreManaOrEnergy: number;
//   restoreHealth?: number;
//   position: PositionEnum | PositionEnum.NONE;
//   // holdingItem : item[]
//   evasion: number;
//   selectedSound?: string;
// };

export class Entity {
  instanceId?: string;
  index?: number;
  playable?: boolean;
  id: number;
  status: StatusEnum;
  evasion: number;
  trait: TraitEnum;
  position: PositionEnum;
  effectedSkills: EffectSkill[];
  skills: {
    equipmentSkills?: Skill[];
    normalHitSkill: Skill;
    traitSkill: Skill;
  };
  name: string;
  imageUrl: string;
  level: number;
  attack: { value: number; max: number };
  heal?: { value: number; max: number };
  defend: { value: number; max: number };
  health: { value: number; max: number; restore?: number };
  capacity?: {
    mana?: { value: number; max: number; restore: number };
    energy?: { value: number; max: number; restore: number };
  };
  equipment?: { weapon?: Weapon; armor?: Armor }; //Item
  speed: number;
  selectedSoundPath?: string;

  constructor({
    instanceId,
    index,
    playable,
    id,
    status,
    evasion,
    trait,
    position,
    effectedSkills,
    skills,
    name,
    imageUrl,
    level,
    attack,
    heal,
    defend,
    health,
    capacity,
    equipment,
    speed,
    selectedSoundPath,
  }: {
    instanceId?: string;
    index?: number;
    playable?: boolean;
    id: number;
    status: StatusEnum;
    evasion: number;
    trait: TraitEnum;
    position: PositionEnum;
    effectedSkills?: EffectSkill[];
    skills: {
      equipmentSkills?: Skill[];
      normalHitSkill: Skill;
      traitSkill: Skill;
    };
    name: string;
    imageUrl: string;
    level: number;
    attack: { value: number; max: number };
    heal?: { value: number; max: number };
    defend: { value: number; max: number };
    health: { value: number; max: number; restore?: number };
    capacity?: {
      mana?: { value: number; max: number; restore: number };
      energy?: { value: number; max: number; restore: number };
    };
    equipment?: { weapon?: Weapon; armor?: Armor };
    speed: number;
    selectedSoundPath?: string;
  }) {
    this.instanceId = instanceId;
    this.index = index;
    this.playable = playable;
    this.id = id;
    this.status = status;
    this.evasion = evasion;
    this.trait = trait;
    this.position = position;
    this.effectedSkills = effectedSkills ?? [];
    this.skills = skills;
    this.name = name;
    this.imageUrl = imageUrl;
    this.level = level;
    this.attack = attack;
    this.heal = heal;
    this.defend = defend;
    this.health = health;
    this.capacity = capacity;
    this.equipment = equipment;
    this.speed = speed;
    this.selectedSoundPath = selectedSoundPath;
  }

  get allCapacity() {
    return (
      (this.capacity?.energy?.value ?? 0) + (this.capacity?.mana?.value ?? 0)
    );
  }

  get isBoss() {
    const boss = [
      TraitEnum.BOSS_DOZOJO,
      TraitEnum.BOSS_NEXOS,
      TraitEnum.BOSS_VEXARIA,
    ];
    return boss.includes(this.trait);
  }

  get allSkills(): Skill[] {
    return [this.skills.normalHitSkill, this.skills.traitSkill].concat(
      this.skills.equipmentSkills ?? []
    );
  }

  get hasDefSkill(): Skill[] {
    return this.allSkills.filter((skill) => skill.type === EmitTypeEnum.DEFEND);
  }

  get hasAttackAOE(): Skill[] {
    return this.allSkills.filter(
      (skill) => skill.type === EmitTypeEnum.ATTACK_AOE
    );
  }

  get hasEffectedSkill() {
    return this.effectedSkills.length > 0 ? true : false;
  }

  get isAlive() {
    return this.health.value > 0;
  }

  get isUseEnergy() {
    if (this.capacity) {
      return this.capacity.energy ? true : false;
    }
  }

  get isUseMana() {
    if (this.capacity) {
      return this.capacity.mana ? true : false;
    }
  }

  get isUseHybrid() {
    if (this.capacity) {
      return (
        (this.capacity.mana ? true : false) &&
        (this.capacity.energy ? true : false)
      );
    }
  }

  get isCanAction() {
    const found = this.effectedSkills.findIndex((fx) => fx.canAction === false);
    return found === -1;
  }

  calculateAmountMadeBy(props: { skill: Skill }): number {
    const { skill } = props;
    return Math.round(this.attack.value * skill.emitValueMultiply);
  }

  hasEnoughManaFor(props: { skill: Skill }): boolean {
    const { skill } = props;
    if (this.capacity) {
      if (this.capacity.energy) {
        return this.capacity.energy.value >= skill.requiredEnergy;
      }
      if (this.capacity.mana) {
        return this.capacity.mana.value >= skill.requiredMana;
      }
    }
    return false;
  }

  updateManaFromUse(props: { skill: Skill }): Entity {
    const { skill } = props;
    if (this.capacity) {
      if (this.capacity.mana) {
        if (this.capacity.mana.value >= skill.requiredMana) {
          this.capacity.mana.value -= Math.max(0, skill.requiredMana);
        }
      }
      if (this.capacity.energy) {
        if (this.capacity.energy.value >= (skill.requiredEnergy ?? 0)) {
          this.capacity.energy.value -= Math.max(0, skill.requiredEnergy ?? 0);
        }
      }
    }

    return this;
  }

  hasHealthLowerThan(props: {
    threshold: number;
    targetEntity?: Entity;
  }): boolean {
    const { threshold, targetEntity } = props;
    if (targetEntity) {
      return targetEntity.health.value > this.health.value;
    }
    const ratio = parseFloat((this.health.value / this.health.max).toFixed(2));
    if (ratio <= threshold) {
      return true;
    }
    return false;
  }

  get hasOverDefend(): boolean {
    return this.defend.value > this.defend.max;
  }

  getDifferentValueFromInitial(props: { stat: "atk" | "def" }): number {
    switch (props.stat) {
      case "atk":
        return Math.abs(this.attack.max - this.attack.value);
      case "def":
        return Math.abs(this.defend.max - this.defend.value);
      default:
        return 0;
    }
  }

  updateStatRemainingEffect(): Entity {
    for (let i = 0; i < this.effectedSkills.length; i++) {
      const effect = this.effectedSkills[i];
      effect.duration--;
      if (effect.duration === 0) {
        switch (effect.name) {
          case EffectSkillEnum.ENHANCE_DEFEND:
            //reset to default
            this.defend.value = this.defend.max;
            break;
          default:
            break;
        }
        this.effectedSkills.splice(i, 1);
      } else {
        switch (effect.name) {
          case EffectSkillEnum.ENHANCE_DEFEND:
            this.defend.value *= effect.emitValueMultiplier;
            break;
          default:
            break;
        }
      }
    }

    return this;
  }

  applyEffectSkills(effect: EffectSkill) {
    if (effect.duration <= 0)
      throw new Error("can not apply effect that has duration = 0 ");

    this.effectedSkills.push(effect);
    // switch (effect) {
    //   case listDefaultEffectSkill[EffectSkillEnum.ENHANCE_DEFEND]:
    //     this.defend.value *= effect.emitValueMultiplier;
    //     break;
    //   default:
    //     break;
    // }
  }
}
