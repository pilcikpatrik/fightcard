"use client";
import React from "react";
import Card from "./Card";
import CardForm from "./CardForm";
import { useFightersStore } from "@/store/fightCardStore";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

// Typ pro pár bojovníků
type FighterPair = [Fighter | null, Fighter | null];

const FightCard = () => {
  const fightPairs = useFightersStore((state) => state.fightPairs);

  // Rozdělení fightPairs do tří skupin
  const firstGroup = fightPairs.slice(0, 4);
  const secondGroup = fightPairs.slice(4, 8);
  const thirdGroup = fightPairs.slice(8, 12);

  const renderGroup = (group: FighterPair[]) => (
    <div className="flex items-center justify-center gap-10">
      {group.map((pair, index) => (
        <Card key={index} pair={pair} />
      ))}
    </div>
  );

  return (
    <div className="bg relative">
      <div className="flex-center flex-col">
        <CardForm />

        <div className="flex flex-col items-center justify-center gap-8 p-20">
          {renderGroup(firstGroup)}
          {renderGroup(secondGroup)}
          {renderGroup(thirdGroup)}
        </div>
      </div>
    </div>
  );
};

export default FightCard;
