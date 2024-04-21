// export const WeaponSkillSet = [
// {"BOW"} : {
//     "HUMAN" : [skill1, skill2],
//     "ROBOT" : [skill1, skill2],
//     "ORC" : [skill1, skill2],
// }
// {"SWORD"} : {
//     "HUMAN" : [skill1, skill2],
//     "ROBOT" : [skill1, skill2],
//     "ORC" : [skill1, skill2],
// }
// ];

//20 trait 3 weapon

import { Skill } from "@/classes/skills";
import { PlayableTraitEnum } from "./enums/traits";
import { EmitTypeEnum } from "./enums/actions";
import { PowerEnum } from "./enums/powers";
import { WeaponEnum } from "@/classes/weapon";
import { ComboSkillSet } from "./comboSkills";

export const WeaponSkillSet: {
  [key in WeaponEnum]: { [key in PlayableTraitEnum]: Skill[] };
} = {
  [WeaponEnum.BOW]: {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.SWORD]: {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.GUN]: {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.DAGGER] : {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.POLEARMS] : {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.SHIELD] : {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.MAGIC_WAND] : {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
  [WeaponEnum.HEALING_STAFF] : {
    [PlayableTraitEnum.HUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_0`,
        name: "triple charge",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id: `${WeaponEnum.SWORD}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1.2,
        requiredEnergy: 5,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.HUMAN}_1`,
        name: "magic bird",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.MAGICAL,
        comboAble: {
          id: `${WeaponEnum.GUN}_${PlayableTraitEnum.HUMAN}_1`,
          skill: ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0],
        },
        emitValueMultiply: 1,
        requiredEnergy: 3,
        duration: 3,
      }),
    ],
    [PlayableTraitEnum.ARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.AUTOMATION]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.AUTOMATION}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ANGEL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ANGEL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.BIG_CREATURE]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.BIG_CREATURE}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.CYBORG]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.CYBORG}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.DEMON]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.DEMON}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ELF]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ELF}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.GOBLIN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.GOBLIN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INHUMAN]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INHUMAN}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.INSECT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.INSECT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_ANIMAL]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_ANIMAL}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.MAGIC_GOLEM]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.MAGIC_GOLEM}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.ORC]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.ORC}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.SPIRIT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.SPIRIT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
    [PlayableTraitEnum.UNARMED_ROBOT]: [
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_0`,
        name: "piercing",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.SWORD}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.5,
        requiredEnergy: 8,
      }),
      new Skill({
        id: `${WeaponEnum.BOW}_${PlayableTraitEnum.UNARMED_ROBOT}_1`,
        name: "detonation",
        type: EmitTypeEnum.ATTACK,
        power: PowerEnum.PHYSICAL,
        comboAble: {
          id:`${WeaponEnum.GUN}_${PlayableTraitEnum.ARMED_ROBOT}_1`,
          skill:ComboSkillSet[WeaponEnum.BOW][PlayableTraitEnum.HUMAN][0]
        },
        emitValueMultiply: 1.8,
        requiredEnergy: 10,
      }),
    ],
  },
};
