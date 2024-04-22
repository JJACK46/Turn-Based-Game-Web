import { MapData } from "@/data/worlds/types/map";
import { WorldData } from "@/data/worlds/types/world";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type WorldStore = {
  selectedWorld: WorldData;
  selectedMap: MapData;
};

interface WorldAction {
  setSelectedWorld: (props: WorldData) => void;
  setSelectedMap: (props: MapData) => void;
  setEntityLevel: (max: number, min: number) => void;
}

export const useWorldStore = create<WorldStore & WorldAction>()(
  immer((set) => ({
    selectedWorld: {
      id: "",
      worldImgUrl: "",
      entities: [],
      boss: null,
      dropItems: [],
      maps: [],
      title: "",
      path: "",
      info: "",
    },
    selectedMap: {
      name: "",
      entitiesLevel: [],
      grade: "COMMON",
      cardImageUrl: "",
      enemiesFrontRow: [],
    },
    setSelectedWorld: (props) => {
      set((state) => {
        state.selectedWorld = props;
      });
    },
    setSelectedMap: (props) => {
      set((state) => {
        state.selectedMap = props;
      });
    },
    setEntityLevel: (min: number, max: number) =>
      set((state) => {
        state.selectedMap.entitiesLevel = [min, max];
      }),
  }))
);
