import create from "zustand";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

type FighterPair = [Fighter | null, Fighter | null];

interface FightersState {
  fightPairs: FighterPair[];
  selectedCategories: Record<number, string>; // Přidáno pro sledování vybraných kategorií
  updateFightPair: (
    pairIndex: number,
    fighterIndex: 0 | 1,
    fighter: Fighter
  ) => void;
  selectCategory: (pairIndex: number, category: string) => void; // Přidáno pro aktualizaci vybrané kategorie
}

export const useFightersStore = create<FightersState>((set) => ({
  fightPairs: Array(10).fill([null, null]),
  selectedCategories: {}, // Inicializace prázdného objektu pro kategorie

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
