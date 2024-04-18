import { Armor } from "@/classes/armor";
import { EntityType } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { MapData } from "@/data/worlds/types/map";
import { create } from "zustand";

type World = {
  selectedWorld: {
    id: string;
    worldImgUrl: string;
    entities: EntityType[];
    boss: EntityType | null;
    dropItems: (Weapon | Armor)[];
    maps: MapData[];
  };
  selectedMap: MapData;
  setSelectedWorld: (props: {
    id: string;
    worldImgUrl: string;
    entities: EntityType[];
    boss: EntityType | null;
    dropItems: (Weapon | Armor)[];
    maps: MapData[];
  }) => void;
  setSelectedMap: (props: MapData) => void;
  setEntityLevel: (max: number, min: number) => void;
};

export const useWorldStore = create<World>((set) => ({
  selectedWorld: {
    id: "",
    worldImgUrl: "",
    entities: [],
    boss: null,
    dropItems: [],
    maps: [],
  },
  selectedMap: {
    name: "",
    entitiesLevel: [],
    grade: "COMMON",
    cardImageUrl: "",
    enemyFrontRow: [],
  },
  setSelectedWorld: (props) => {
    return set(() => ({
      selectedWorld: {
        ...props,
      },
    }));
  },
  setSelectedMap: (props) => {
    set(() => ({
      selectedMap: {
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
