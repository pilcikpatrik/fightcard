import React from "react";
import FightForm from "../forms/FightForm";
import { ScrollArea } from "../ui/scroll-area";
import CategoryForm from "../forms/CategoryForm";

// Předpokládáme, že máte definovaný typ pro Fight
interface Fight {
  title: string;
}

// Vytvoření 12 zápasů
const fights: Fight[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Fight ${i + 1}`,
}));

const SideBar = () => {
  return (
    <div className="max-h-[85vh]">
      <ScrollArea className="h-[100%] w-full py-10">
        <div className="flex-col space-y-4">
          {fights.map((fight, index) => (
            <div key={fight.title} className="space-y-2">
              <h3>{fight.title}</h3>
              <CategoryForm pairIndex={index} />
              <FightForm pairIndex={index} fighterIndex={0} />
              <FightForm pairIndex={index} fighterIndex={1} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SideBar;
