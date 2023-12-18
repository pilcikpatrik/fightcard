import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

type FighterPair = [Fighter | null, Fighter | null];

interface CardProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  createdAt: Date;
  fighters: Fighter[];
}

const PostCard = ({ _id, title, author, createdAt, fighters }: CardProps) => {
  const fightPairs: FighterPair[] = fighters.reduce(
    (acc: FighterPair[], fighter, index) => {
      if (index % 2 === 0) {
        acc.push([fighter, fighters[index + 1] || null]);
      }
      return acc;
    },
    []
  );

  return (
    <div className="w-[300px] flex-col items-start justify-center space-y-5 overflow-y-hidden rounded-lg border bg-white p-10 drop-shadow-md">
      <div className="flex-start gap-5">
        <Image
          src={author.picture}
          alt={author.name}
          width={36}
          height={36}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-xs uppercase text-black/60">Created by</span>
          <Link href={`/profile/${author.clerkId}`}>
            <p className="font-medium">{author.name}</p>
          </Link>
        </div>
      </div>
      <div className="flex-start flex-col">
        <Link href={`/card/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="text-black/60">{getTimestamp(createdAt)}</p>
      </div>
      <ScrollArea className="h-20 w-full">
        <div className="space-y-5">
          {fightPairs.map((pair: any, index) => (
            <div key={index} className="flex-between">
              <Image
                src={pair[0].imgSrc}
                alt={pair[0].title}
                width={50}
                height={50}
              />
              <div className="text-center text-xs">
                {pair[0].title} <br /> vs <br /> {pair[1].title}
              </div>
              <Image
                src={pair[1].imgSrc}
                alt={pair[1].title}
                width={50}
                height={50}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PostCard;
