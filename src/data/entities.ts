import { EntityType } from "@/classes/entity";
import { StatusEnum } from "./enums/status";
import { TraitEnum, listTraitSkill } from "./enums/traits";
import { EmitTypeEnum } from "./enums/actions";
import { PowerEnum } from "./enums/powers";
import { Skill } from "@/classes/skills";
import { PositionEnum } from "./enums/positions";

export const EntitiesData: EntityType[] = [
  {
    id: 1,
    name: "G-Lizard",
    imageUrl: "monster_rookie_1.jpeg",
    level: 1,
    attackPower: 3,
    mana: -1,
    health: 10,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
    }),
    status: StatusEnum.NORMAL,
    speed: 3,
    trait: TraitEnum.INHUMAN,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 0,
    energy: -1,
    maxHealth: 10,
    maxAttackPower: 3,
    traitSkill: listTraitSkill[TraitEnum.INHUMAN],
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 2,
    name: "Babooza",
    imageUrl: "monster_forest_1.jpeg",
    level: 1,
    attackPower: 7,
    mana: -1,
    health: 30,
    status: StatusEnum.NORMAL,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
    }),
    speed: 6,
    trait: TraitEnum.BIG_CREATURE,
    traitSkill: listTraitSkill[TraitEnum.BIG_CREATURE],
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 0,
    energy: -1,
    maxHealth: 30,
    maxAttackPower: 7,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 3,
    name: "Orc Warrior",
    imageUrl: "orc_warrior.jpg",
    level: 1,
    attackPower: 10,
    mana: 10,
    health: 30,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
    }),
    traitSkill: listTraitSkill[TraitEnum.ORC],
    status: StatusEnum.NORMAL,
    speed: 5,
    trait: TraitEnum.ORC,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    energy: -1,
    maxHealth: 30,
    maxAttackPower: 10,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 4,
    name: "Demon Warrior",
    imageUrl: "demon_fighter.jpg",
    level: 1,
    attackPower: 6,
    mana: 10,
    health: 40,
    equipmentSkills: [],
    status: StatusEnum.NORMAL,
    speed: 6,
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
    }),
    traitSkill: listTraitSkill[TraitEnum.DEMON],
    trait: TraitEnum.DEMON,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    energy: -1,
    maxHealth: 40,
    maxAttackPower: 6,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 5,
    name: "Magic Eagle",
    imageUrl: "fantasy_bird.jpg",
    level: 1,
    attackPower: 2,
    mana: 10,
    health: 20,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
    }),
    status: StatusEnum.NORMAL,
    speed: 12,
    trait: TraitEnum.MAGIC_ANIMAL,
    traitSkill: listTraitSkill[TraitEnum.MAGIC_ANIMAL],
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    energy: -1,
    maxHealth: 20,
    maxAttackPower: 2,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 6,
    name: "Terra",
    imageUrl: "fantasy_god.jpg",
    level: 1,
    attackPower: 10,
    mana: 10,
    health: 25,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
      soundPath: "/sounds/sfx/fireball-whoosh-1.mp3",
    }),
    traitSkill: listTraitSkill[TraitEnum.MAGIC_ANIMAL],
    status: StatusEnum.NORMAL,
    speed: 7,
    trait: TraitEnum.MAGIC_ANIMAL,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    energy: -1,
    maxHealth: 25,
    maxAttackPower: 10,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 7,
    name: "Omega 3",
    imageUrl: "robot_soldier_1.jpeg",
    level: 1,
    attackPower: 5,
    mana: -1,
    health: 20,
    defend: 10,
    healingPower: 5,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
      soundPath: "sounds/sfx/gun_burst_firing.mp3",
    }),
    status: StatusEnum.NORMAL,
    speed: 4,
    trait: TraitEnum.ARMED_ROBOT,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 20,
    energy: 20,
    maxHealth: 20,
    maxDefendPower: 10,
    maxAttackPower: 5,
    traitSkill: listTraitSkill[TraitEnum.ARMED_ROBOT],
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 8,
    name: "Piroat",
    imageUrl: "piroat_boxing_1.jpeg",
    level: 1,
    attackPower: 5,
    mana: -1,
    energy: 10,
    health: 50,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: 0,
      emitValueMultiply: 1,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.PHYSICAL,
      requiredEnergy: 0,
      soundPath: "/sounds/sfx/punch.mp3",
    }),
    status: StatusEnum.NORMAL,
    speed: 10,
    trait: TraitEnum.HUMAN,
    traitSkill: listTraitSkill[TraitEnum.HUMAN],
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    maxHealth: 50,
    maxAttackPower: 5,
    evasion: 0.1,
    position: PositionEnum.NONE,
  },
  {
    id: 9,
    name: "Bravo",
    imageUrl: "super_soldier_sniper_1.jpeg",
    level: 1,
    attackPower: 15,
    mana: 15,
    health: 10,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: -1,
      requiredEnergy: 0,
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.PHYSICAL,
    }),
    status: StatusEnum.NORMAL,
    speed: 8,
    traitSkill: listTraitSkill[TraitEnum.HUMAN],
    trait: TraitEnum.HUMAN,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 15,
    energy: -1,
    maxHealth: 10,
    maxAttackPower: 15,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 10,
    name: "Elf",
    imageUrl: "wood_elf.jpg",
    level: 1,
    attackPower: 15,
    mana: 10,
    health: 8,
    traitSkill: listTraitSkill[TraitEnum.ELF],
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      requiredMana: -1,
      requiredEnergy: 0,
      type: EmitTypeEnum.ATTACK,
      power: PowerEnum.MAGICAL,
      emitValueMultiply: 1,
    }),
    status: StatusEnum.NORMAL,
    speed: 12,
    trait: TraitEnum.HUMAN,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 10,
    energy: -1,
    maxHealth: 8,
    maxAttackPower: 15,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 11,
    name: "Demon Hunter",
    imageUrl: "demon_hunter.jpg",
    level: 1,
    attackPower: 12,
    mana: 20,
    health: 30,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.MAGICAL,
      soundPath: "/sounds/sfx/sword-attack.wav",
    }),
    status: StatusEnum.NORMAL,
    speed: 10,
    traitSkill: listTraitSkill[TraitEnum.DEMON],
    trait: TraitEnum.DEMON,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 20,
    energy: -1,
    maxHealth: 30,
    maxAttackPower: 12,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 12,
    name: "Protector",
    imageUrl: "unarmed_robot_1.jpeg",
    level: 1,
    attackPower: 3,
    mana: -1,
    defend: 20,
    health: 40,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.PHYSICAL,
      soundPath: "/sounds/sfx/punch.mp3",
    }),
    status: StatusEnum.NORMAL,
    speed: 2,
    traitSkill: listTraitSkill[TraitEnum.UNARMED_ROBOT],
    trait: TraitEnum.UNARMED_ROBOT,
    restoreManaOrEnergy: 5,
    maxManaEnergyPower: 30,
    energy: 30,
    maxHealth: 40,
    maxDefendPower: 20,
    maxAttackPower: 3,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 777,
    name: "Dojozo",
    imageUrl: "boss_dojozo.jpeg",
    level: 1,
    attackPower: 40,
    mana: 40,
    defend: 50,
    health: 200,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.HYBRID,
    }),
    status: StatusEnum.NORMAL,
    speed: 40,
    traitSkill: listTraitSkill[TraitEnum.BOSS_DOZOJO],
    trait: TraitEnum.BOSS_DOZOJO,
    restoreManaOrEnergy: 10,
    maxManaEnergyPower: 40,
    energy: 40,
    maxHealth: 200,
    maxDefendPower: 50,
    maxAttackPower: 40,
    evasion: 0.2,
    position: PositionEnum.NONE,
  },
  {
    id: 888,
    name: "Nexos",
    imageUrl: "boss_nexos.jpeg",
    level: 1,
    attackPower: 40,
    mana: -1,
    defend: 150,
    health: 150,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.PHYSICAL,
    }),
    status: StatusEnum.NORMAL,
    speed: 30,
    traitSkill: listTraitSkill[TraitEnum.BOSS_NEXOS],
    trait: TraitEnum.BOSS_NEXOS,
    restoreManaOrEnergy: 10,
    maxManaEnergyPower: 80,
    energy: 80,
    maxHealth: 150,
    maxDefendPower: 150,
    maxAttackPower: 40,
    evasion: 0,
    position: PositionEnum.NONE,
  },
  {
    id: 999,
    name: "Vexaria",
    imageUrl: "boss_vexaria.jpeg",
    level: 1,
    attackPower: 40,
    mana: 80,
    defend: 20,
    health: 120,
    equipmentSkills: [],
    normalHitSkill: new Skill({
      name: "Normal Attack",
      type: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.MAGICAL,
    }),
    status: StatusEnum.NORMAL,
    speed: 60,
    traitSkill: listTraitSkill[TraitEnum.BOSS_VEXARIA],
    trait: TraitEnum.BOSS_VEXARIA,
    restoreManaOrEnergy: 10,
    maxManaEnergyPower: 80,
    energy: -1,
    maxHealth: 120,
    maxDefendPower: 20,
    maxAttackPower: 40,
    evasion: 0.5,
    position: PositionEnum.NONE,
  },
];
