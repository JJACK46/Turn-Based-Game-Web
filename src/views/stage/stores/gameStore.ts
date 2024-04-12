import { create } from "zustand";
import { Data } from "./UI_Store";

type GameLogic = {
  data: Data;
  startGame: () => void;
};

export const useGameStore = create<GameLogic>((set) => ({
  data: { isGameStart: false },
  startGame: () =>
    set((state) => ({ data: { ...state.data, isGameStart: true } })),
}));
