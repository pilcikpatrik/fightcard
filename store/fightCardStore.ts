import create from "zustand";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

// Definujeme typ pro pár bojovníků
type FighterPair = [Fighter | null, Fighter | null];

interface FightersState {
  fightPairs: FighterPair[];
  updateFightPair: (
    pairIndex: number,
    fighterIndex: 0 | 1,
    fighter: Fighter
  ) => void;
}

export const useFightersStore = create<FightersState>((set) => ({
  // Inicializujeme 12 párů, každý pár je [null, null]
  fightPairs: Array(12).fill([null, null]),

  updateFightPair: (pairIndex, fighterIndex, fighter) =>
    set((state) => {
      const updatedPairs = [...state.fightPairs];
      const updatedPair = [...updatedPairs[pairIndex]];
      updatedPair[fighterIndex] = fighter;

      updatedPairs[pairIndex] = updatedPair as FighterPair;
      return { fightPairs: updatedPairs };
    }),
}));
