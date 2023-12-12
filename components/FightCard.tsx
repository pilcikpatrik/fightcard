import Image from "next/image";
import React from "react";
import MainEvent from "./MainEvent";
import Card from "./Card";
import Prelims from "./Prelims";
import EditDelete from "./EditDelete";
import Link from "next/link";
import Votes from "./Votes";
import { Button } from "@/components/ui/button";
import { BiHomeAlt2 } from "react-icons/bi";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

// Typ pro pár bojovníků
type FighterPair = [Fighter | null, Fighter | null];

const FightCard = ({
  fighters,
  itemId,
  isAuthor,
  userId,
  upvotes,
  hasupVoted,
  views,
}: {
  fighters: Fighter[];
  itemId: string;
  isAuthor: boolean;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  views: number;
}) => {
  // Převod pole fighterů na FighterPair[]
  const fightPairs: FighterPair[] = fighters.reduce(
    (acc: FighterPair[], fighter, index) => {
      if (index % 2 === 0) {
        acc.push([fighter, fighters[index + 1] || null]);
      }
      return acc;
    },
    []
  );

  const splitIntoGroups = (pairs: FighterPair[], groupSizes: number[]) => {
    const groups: FighterPair[][] = [];
    let currentIndex = 0;

    groupSizes.forEach((size) => {
      const group = pairs.slice(currentIndex, currentIndex + size);
      while (group.length < size) {
        group.push([null, null]);
      }
      groups.push(group);
      currentIndex += size;
    });

    return groups;
  };

  // Příklad rozdělení do skupin: [1, 4, 4, 1] odpovídá počtům párů ve skupinách
  const groupSizes = [1, 4, 4, 1];
  const [firstGroup, secondGroup, thirdGroup, fourGroup] = splitIntoGroups(
    fightPairs,
    groupSizes
  );

  const renderGroup = (group: any, index: any) => {
    const Component = index === 0 ? MainEvent : index === 3 ? Prelims : Card;

    return (
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-10">
        {group.map((pair: any, idx: any) => (
          <Link key={idx} href={`/fight/${JSON.parse(itemId)}`}>
            <Component key={idx} pair={pair} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {isAuthor ? (
        <EditDelete itemId={itemId} />
      ) : (
        <div className="flex-start absolute right-0 top-0 z-40 flex w-full gap-2 p-2">
          <Link href="/">
            <Button className="no-focus bg-black text-lg text-white">
              <BiHomeAlt2 />
            </Button>
          </Link>
        </div>
      )}
      <Votes
        itemId={itemId}
        userId={userId}
        upvotes={upvotes}
        hasupVoted={hasupVoted}
        views={views}
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
          <div className="sheet w-20 bg-yellow-400 py-0.5 sm:w-32 md:w-32 md:py-1">
            <h2 className="text-xxs text-center uppercase text-white sm:text-xs md:text-sm">
              #Main card
            </h2>
          </div>

          {renderGroup(secondGroup, 1)}
          <div className="sheet w-20 bg-yellow-400 py-0.5 sm:w-32 md:w-32 md:py-1">
            <h2 className="text-xxs text-center uppercase text-white sm:text-xs md:text-sm">
              #Prelims
            </h2>
          </div>
          {renderGroup(thirdGroup, 2)}
          {renderGroup(fourGroup, 3)}
        </div>
      </div>
    </div>
  );
};

export default FightCard;
