import create from "zustand";

interface stats {
  label: string;
  value: string;
}

interface Fighter {
  title: string;
  nickname: string;
  imgSrc: string;
  score: string;
  nationality: string;
  age: string;
  height?: string;
  weight: string;
  background?: string;
  gym?: string;
  result?: string[];
  stats?: stats[];
}

type FighterPair = [Fighter | null, Fighter | null];

interface FightersState {
  fightPairs: FighterPair[];
  setFightPairs: (newPairs: FighterPair[]) => void;
  selectedCategories: Record<number, string>; // Přidáno pro sledování vybraných kategorií
  updateFightPair: (
    pairIndex: number,
    fighterIndex: 0 | 1,
    fighter: Fighter
  ) => void;
  selectCategory: (pairIndex: number, category: string) => void;
  resetFightPairs: () => void; // Přidáno pro aktualizaci vybrané kategorie
}

export const useFightersStore = create<FightersState>((set) => ({
  fightPairs: Array(10).fill([null, null]),
  selectedCategories: {}, // Inicializace prázdného objektu pro kategorie
  resetFightPairs: () =>
    set({
      fightPairs: Array(10).fill([null, null]),
      selectedCategories: {},
    }),
  setFightPairs: (newPairs) => set({ fightPairs: newPairs }),

  updateFightPair: (pairIndex, fighterIndex, fighter) =>
    set((state) => {
      const updatedPairs = [...state.fightPairs];
      const updatedPair = [...updatedPairs[pairIndex]];
      updatedPair[fighterIndex] = fighter;

      updatedPairs[pairIndex] = updatedPair as FighterPair;
      return { ...state, fightPairs: updatedPairs };
    }),

  selectCategory: (pairIndex, category) =>
    set((state) => ({
      ...state,
      selectedCategories: {
        ...state.selectedCategories,
        [pairIndex]: category,
      },
    })),
}));
