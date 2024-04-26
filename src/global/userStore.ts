import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Skill } from "@/classes/skills";
import { Weapon } from "@/classes/weapon";
import { EmitTypeEnum } from "@/data/enums/actions";
import { PositionEnum } from "@/data/enums/positions";
import { PowerEnum } from "@/data/enums/powers";
import { StatusEnum } from "@/data/enums/status";
import { TraitEnum, listTraitSkill } from "@/data/enums/traits";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserData {
  currentTeam: Entity[];
  troops: Entity[];
  inventory: { weapons: Weapon[]; armor: Armor[] }; //items: Item[];
  // achievement:
}

interface UserMethods {
  setCurrentTeam: (entities: Entity[]) => void;
  insertIntoInventory: () => void;
  removeFromInventory: (id: number) => void;
}

const initialEntity = new Entity({
  id: 90,
  name: "mk1",
  imageUrl: "super_soldier_rifle_1.jpeg",
  level: 3,
  status: StatusEnum.NORMAL,
  trait: TraitEnum.SOLDIER,
  position: PositionEnum.FRONT,
  speed: 4,
  skills: {
    normalHitSkill: new Skill({
      name: "Normal Hit",
      emitType: EmitTypeEnum.ATTACK,
      emitValueMultiply: 1,
      power: PowerEnum.PHYSICAL,
      soundPath: '/sounds/sfx/gun_burst_firing.mp3'
    }),
    traitSkill: listTraitSkill[TraitEnum.SOLDIER],
  },
  evasion: 0,
  attack: { value: 5, max: 5 },
  defense: { value: 5, max: 5 },
  health: { value: 25, max: 25 },
});

export const useUserStore = create<UserData & UserMethods>()(
  immer((set) => ({
    troops: [initialEntity, initialEntity, initialEntity, initialEntity],
    currentTeam: [],
    inventory: { weapons: [], armor: [] },
    setCurrentTeam(entities) {
      set((state) => {
        state.currentTeam = entities;
      });
    },
    insertIntoInventory() {},
    removeFromInventory() {},
  }))
);
