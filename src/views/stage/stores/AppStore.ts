import { create } from "zustand";

// export type Data = {
//   isGameStart: boolean;
// };

type AppConfig = {
    data: {
        font: string;
        volume: {
            master: number;
            sfx: number;
            music: number;
        };
    };
    setMasterVolume: (input: number) => void;
    setSFXVolume: (input: number) => void;
    setMusicVolume: (input: number) => void;
    setFont: (input: string) => void;
};

export const useUIStore = create<AppConfig>((set) => ({
    data: {
        font: "",
        volume: {
            master: 1,
            sfx: 1,
            music: 1,
        },
    },
    setMasterVolume: (input: number) =>
        set((state) => ({ data: { ...state.data, volume: { ...state.data.volume, master: Math.min(Math.max(0,input),1) } } })),

    setSFXVolume: (input: number) =>
        set((state) => ({ data: { ...state.data, volume: { ...state.data.volume, sfx: Math.min(Math.max(0,input),1) } } })),

    setMusicVolume: (input: number) =>
        set((state) => ({ data: { ...state.data, volume: { ...state.data.volume, music: Math.min(Math.max(0,input),1) } } })),

    setFont: (input: string) =>
        set((state) => ({ data: { ...state.data, font: input } })),

}));
