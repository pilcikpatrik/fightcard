"use client";
import React from "react";
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
import { useFightersStore } from "@/store/fightCardStore";
import fightersData from "../../data.json";

interface CategoryFormProps {
  pairIndex: number;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ pairIndex }) => {
  const [open, setOpen] = React.useState(false);
  const selectedCategory = useFightersStore(
    (state) => state.selectedCategories[pairIndex]
  );
  const selectCategory = useFightersStore((state) => state.selectCategory);
  const categories = Object.keys(fightersData);

  const handleSelectCategory = (category: string) => {
    selectCategory(pairIndex, category);
    setOpen(false);
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
            {selectedCategory || "Select category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] bg-white p-0">
          <Command>
            <CommandInput placeholder="Search fighter..." />
            <CommandEmpty>No fighter found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    handleSelectCategory(category);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryForm;
