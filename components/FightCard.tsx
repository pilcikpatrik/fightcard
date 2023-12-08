"use client";
import React from "react";
import Card from "./Card";
import CardForm from "./CardForm";
import MainEvent from "./MainEvent";
import Prelims from "./Prelims";
import { useFightersStore } from "@/store/fightCardStore";
import SideBar from "./navs/SideBar";
import Image from "next/image";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface Props {
  mongoUserId: string;
}

// Typ pro pár bojovníků
type FighterPair = [Fighter | null, Fighter | null];

const FightCard = ({ mongoUserId }: Props) => {
  const fightPairs = useFightersStore((state) => state.fightPairs);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Rozdělení fightPairs do tří skupin
  const firstGroup = fightPairs.slice(0, 1);
  const secondGroup = fightPairs.slice(1, 5);
  const thirdGroup = fightPairs.slice(5, 9);
  const fourGroup = fightPairs.slice(9, 10);

  const renderGroup = (group: FighterPair[], index: number) => {
    // Rozhodněte, kterou komponentu použít na základě indexu
    const Component = index === 0 ? MainEvent : index === 3 ? Prelims : Card;

    return (
      <div className="flex items-center justify-center gap-5 md:gap-10">
        {group.map((pair, idx) => (
          <Component key={idx} pair={pair} />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div
        className={
          `${
            isSidebarOpen && "xl:flex" // Zobrazit sidebar na velkých obrazovkách, pokud je otevřen
          } z-30 hidden grow-0 bg-white p-10` // Skrýt sidebar na menších obrazovkách
        }
      >
        <SideBar />
      </div>

      <div className="flex-center grow flex-col">
        <CardForm
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          mongoUserId={mongoUserId}
        />

        <div className="bg flex h-full w-full grow flex-col items-center justify-center gap-2 px-10 pt-10 md:px-20">
          <div className="flex-center flex-col gap-2">
            {renderGroup(firstGroup, 0)}
            <Image
              src="/assets/images/oktagonmma.png"
              alt="oktagonmma"
              width={1450}
              height={1450}
              className="absolute overflow-hidden p-5"
            />
            <div className="sheet w-32 bg-yellow-400 py-0.5 md:w-32 md:py-1">
              <h2 className="text-center text-xs uppercase text-white md:text-sm">
                #Main card
              </h2>
            </div>

            {renderGroup(secondGroup, 1)}
            <div className="sheet w-32 bg-yellow-400 py-0.5 md:w-32 md:py-1">
              <h2 className="text-center text-xs uppercase text-white md:text-sm">
                #Prelims
              </h2>
            </div>
            {renderGroup(thirdGroup, 2)}
            {renderGroup(fourGroup, 3)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightCard;
