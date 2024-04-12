import { create } from "zustand";

export type Data = {
  isGameStart: boolean;
};

type UILogic = {
  isSkillOverlay: boolean;
  isStageOverlay: boolean;
  isInfoOverlay: boolean;
  isTurnWarning: boolean;
  isActionWarning: boolean;
  setSkillOverlay: (input: boolean) => void;
  setStageOverlay: (input: boolean) => void;
  setInfoOverlay: (input: boolean) => void;
  setTurnWarning: (input: boolean) => void;
  setActionWarning: (input: boolean) => void;
};

export const useUIStore = create<UILogic>((set) => ({
  isSkillOverlay: false,
  isStageOverlay: false,
  isInfoOverlay: false,
  isTurnWarning: false,
  isActionWarning: false,
  setSkillOverlay: (input: boolean) => set(() => ({ isSkillOverlay: input })),

  setStageOverlay: (input: boolean) => set(() => ({ isStageOverlay: input })),

  setInfoOverlay: (input: boolean) => set(() => ({ isInfoOverlay: input })),

  setTurnWarning: (input: boolean) => set(() => ({ isTurnWarning: input })),

  setActionWarning: (input: boolean) => set(() => ({ isActionWarning: input })),
}));
