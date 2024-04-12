import { create } from "zustand";

export type Data = {
  isGameStart: boolean;
};

type UILogic = {
  data: {
    isGameStart: boolean;
  };
  isActionOverlayOpen: boolean;
  setData: (n: Data) => void;
};

export const useUIStore = create<UILogic>((set) => ({
  data: { isGameStart: false },
  isActionOverlayOpen: false,
  setData: (newData: Data) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
}));
