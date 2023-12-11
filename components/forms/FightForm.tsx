"use client";
import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import fightersData from "../../data.json";
import { useFightersStore } from "@/store/fightCardStore";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface FightFormProps {
  pairIndex: number; // Index páru, pro který je tento form
  fighterIndex: 0 | 1; // Index bojovníka v páru (0 nebo 1)
}

interface FightersData {
  [category: string]: Fighter[];
}

const FightForm: React.FC<FightFormProps> = ({ pairIndex, fighterIndex }) => {
  const [open, setOpen] = useState(false);
  const selectedCategory = useFightersStore(
    (state) => state.selectedCategories[pairIndex]
  );
  const currentFighter = useFightersStore(
    (state) => state.fightPairs[pairIndex][fighterIndex]
  );
  const fightersInCategory =
    (fightersData as FightersData)[selectedCategory] ?? [];
  // Filtruje bojovníky na základě vybrané kategorie
  const updateFightPair = useFightersStore((state) => state.updateFightPair);
  const [selectFighter, setSelectFighter] = useState<Fighter | null>(
    currentFighter
  );

  const handleSelectFighter = (fighter: Fighter) => {
    setSelectFighter(fighter);
    updateFightPair(pairIndex, fighterIndex, fighter);
  };

  useEffect(() => {
    setSelectFighter(currentFighter);
  }, [currentFighter]);

  /*   console.log("Selected Category:", selectedCategory);
  console.log("Fighters in Selected Category:", fightersInCategory); */

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between xs:w-[300px]"
          >
            {selectFighter?.title || "Select fighter..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] bg-white p-0 xs:w-[300px]">
          <Command>
            <CommandInput placeholder="Search fighter..." />
            <CommandEmpty>No fighter found.</CommandEmpty>
            <CommandGroup>
              {fightersInCategory.map((fighter: any) => (
                <CommandItem
                  key={fighter.title}
                  value={fighter.title}
                  onSelect={() => {
                    handleSelectFighter(fighter);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectFighter?.title === fighter.title
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {fighter.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FightForm;
