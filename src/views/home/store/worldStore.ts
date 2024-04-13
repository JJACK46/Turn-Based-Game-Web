import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { create } from "zustand";

type World = {
  selectedWorld: {
    id: string;
    background: string[];
    entities: Entity[];
    boss: Entity | null;
    dropItems: (Weapon | Armor)[];
  };
  selectedMap: {
    id: number;
    entityLevel: number[];
  };
  setMap: (props: {
    id: string;
    background: string[];
    entities: Entity[];
    boss: Entity;
    dropItems: (Weapon | Armor)[];
  }) => void;
  setEntityLevel: (max: number, min: number) => void;
};

export const useWorldStore = create<World>((set) => ({
  selectedWorld: {
    id: "",
    background: [],
    entities: [],
    boss: null,
    dropItems: [],
  },
  selectedMap: {
    id: -1,
    entityLevel: [1, 10],
  },
  setMap: (props) => {
    return set(() => ({
      selectedWorld: {
        ...props,
      },
    }));
  },

  setEntityLevel: (min: number, max: number) =>
    set((state) => ({
      selectedMap: {
        ...state.selectedMap,
        entityLevel: [min, max],
      },
    })),
}));
