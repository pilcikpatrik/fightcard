import create from "zustand";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface FightersState {
  fighters: Fighter[];
  addFighter: (fighter: Fighter) => void;
}

export const useFightersStore = create<FightersState>((set) => ({
  fighters: [],
  addFighter: (fighter) =>
    set((state) => ({ fighters: [...state.fighters, fighter] })),
}));
