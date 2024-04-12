import { create } from "zustand";

export type Data = {
  isGameStart: boolean;
};

type UILogic = {
  data: {
    isSkillOverlay: boolean;
    isStageOverlay: boolean;
    isInfoOverlay: boolean;
    isTurnWarning: boolean;
    isActionWarning: boolean;
  };
  setSkillOverlay: (input: boolean) => void;
  setStageOverlay: (input: boolean) => void;
  setInfoOverlay: (input: boolean) => void;
  setTurnWarning: (input: boolean) => void;
  setActionWarning: (input: boolean) => void;
};

export const useUIStore = create<UILogic>((set) => ({
  data: {
    isSkillOverlay: false,
    isStageOverlay: false,
    isInfoOverlay: false,
    isTurnWarning: false,
    isActionWarning: false,
  },
  setSkillOverlay: (input: boolean) =>
    set((state) => ({ data: { ...state.data, isSkillOverlay: input } })),

  setStageOverlay: (input: boolean) =>
    set((state) => ({ data: { ...state.data, isStageOverlay: input } })),

  setInfoOverlay: (input: boolean) =>
    set((state) => ({ data: { ...state.data, isInfoOverlay: input } })),

  setTurnWarning: (input: boolean) =>
    set((state) => ({ data: { ...state.data, isTurnWarning: input } })),

  setActionWarning: (input: boolean) =>
    set((state) => ({ data: { ...state.data, isActionWarning: input } })),

}));
