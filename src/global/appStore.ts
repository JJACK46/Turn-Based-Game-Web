import { create } from "zustand";

type AppConfig = {
  font: string;
  volume: {
    master: number;
    sfx: number;
    music: number;
  };
  setMasterVolume: (input: number) => void;
  setSFXVolume: (input: number) => void;
  setMusicVolume: (input: number) => void;
  setFont: (input: string) => void;
};

export const useAppStore = create<AppConfig>((set) => ({
  font: "",
  volume: {
    master: 1,
    sfx: 1,
    music: 1,
  },
  setMasterVolume: (input: number) =>
    set((state) => ({
      ...state,
      volume: {
        ...state.volume,
        master: Math.min(Math.max(0, input), 1),
      },
    })),

  setSFXVolume: (input: number) =>
    set((state) => ({
      ...state,
      volume: { ...state.volume, sfx: Math.min(Math.max(0, input), 1) },
    })),

  setMusicVolume: (input: number) =>
    set((state) => ({
      ...state,
      volume: {
        ...state.volume,
        music: Math.min(Math.max(0, input), 1),
      },
    })),

  setFont: (input: string) => set((state) => ({ ...state, font: input })),
}));
