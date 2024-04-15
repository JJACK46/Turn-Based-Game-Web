import { create } from "zustand";

interface LoadingType {
  isLoading: boolean;
  setLoading: (n: boolean) => void;
}

export const useLoaderStore = create<LoadingType>((set) => ({
  isLoading: true,
  setLoading: (newValue: boolean) => {
    set(() => ({ isLoading: newValue }));
  },
}));
