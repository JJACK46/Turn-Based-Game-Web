import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserConfig {
  currentTeam: Entity[];
  inventory: { weapons: Weapon[]; armor: Armor[] }; //items: Item[];
  // achievement: 
}

interface UserMethods {
  setCurrentTeam: (entities: Entity[]) => void;
  insertIntoInventory: () => void;
  removeFromInventory: (id: number) => void;
}

export const useUserStore = create<UserConfig & UserMethods>()(
  immer((set) => ({
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
