"use client";
import * as React from "react";
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

const FightForm = () => {
  const [open, setOpen] = React.useState(false);
  const addFighter = useFightersStore((state) => state.addFighter);
  const [selectFighter, setSelectFighter] = React.useState<Fighter | null>(
    null
  );

  const handleSelectFighter = (fighter: Fighter) => {
    setSelectFighter(fighter);
    addFighter(fighter);
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {selectFighter?.title || "Select fighter..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] bg-white p-0">
          <Command>
            <CommandInput placeholder="Search fighter..." />
            <CommandEmpty>No fighter found.</CommandEmpty>
            <CommandGroup>
              {fightersData.map((fighter) => (
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
