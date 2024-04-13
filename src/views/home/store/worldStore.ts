import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { create } from "zustand";

// export type Data = {
//   isGameStart: boolean;
// };

type World = {
  data: {
    mapID: string;
    mapBackground: string;
    commonEntityInMap: Entity[];
    hardEntityInMap: Entity[];
    mapBoss: Entity | null;
    dropItem: (Weapon | Armor)[];
    entityLevel: number[];
  };
  setMap: (
    ID: string,
    BG: string,
    items: (Weapon | Armor)[],
    commonEntity: Entity[],
    hardEntity: Entity[],
    boss: Entity
  ) => void;
  setEntityLevel: (max: number, min: number) => void;
};

export const useWorldStore = create<World>((set) => ({
  data: {
    mapID: "",
    mapBackground: "",
    commonEntityInMap: [],
    hardEntityInMap: [],
    mapBoss: null,
    dropItem: [],
    entityLevel: [1, 10],
  },
  setMap: (
    ID: string,
    BG: string,
    items: (Weapon | Armor)[],
    commonEntity: Entity[],
    hardEntity: Entity[],
    boss: Entity
  ) =>
    set((state) => ({
      data: {
        ...state.data,
        mapID: ID,
        mapBackground: BG,
        dropItem: items,
        commonEntityInMap: commonEntity,
        hardEntityInMap: hardEntity,
        mapBoss: boss,
      },
    })),

  setEntityLevel: (min: number, max: number) =>
    set((state) => ({
      data: {
        ...state.data,
        entityLevel: [min, max],
      },
    })),
}));
