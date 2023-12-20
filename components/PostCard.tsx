import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { FaRegEye } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn } from "@clerk/nextjs";
import { Button } from "./ui/button";
// import { usePathname } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
// import { deleteCard } from "@/lib/actions/card.action";

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
  upvotes: number;
  views: number;
  clerkId?: string | null;
  fighters: Fighter[];
}

const PostCard = ({
  _id,
  title,
  author,
  createdAt,
  fighters,
  upvotes,
  views,
  clerkId,
}: CardProps) => {
  const fightPairs: FighterPair[] = fighters.reduce(
    (acc: FighterPair[], fighter, index) => {
      if (index % 2 === 0) {
        acc.push([fighter, fighters[index + 1] || null]);
      }
      return acc;
    },
    []
  );

  // const handleDelete = async () => {
  //   await deleteCard({
  //     cardId: JSON.parse(_id),
  //     path: pathname,
  //   });
  //   toast({
  //     description: "Card has been deleted.",
  //   });
  // };

  return (
    <div className="w-[300px] flex-col items-start justify-center space-y-5 overflow-y-hidden rounded-lg border bg-white p-10 drop-shadow-md">
      <div className="flex-between">
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
        <SignedIn>
          {clerkId === author.clerkId && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                  >
                    <BiDotsVerticalRounded className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] bg-white">
                  <Link href={`/create-card/${_id}`}>
                    <DropdownMenuItem className="cursor-pointer focus:bg-gray-300/20">
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-300/20">
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </SignedIn>
      </div>
      <div className="flex-start flex-col">
        <Link href={`/card/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="text-black/60">{getTimestamp(createdAt)}</p>
      </div>
      <Link href={`/fight/${_id}`}>
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
      </Link>
      <div className="flex-start gap-3">
        <div className="flex-start gap-2 text-black/80">
          <Image
            src={"/assets/icons/upvoted.svg"}
            width={18}
            height={18}
            alt="upvote"
            className=""
          />
          <span className="text-sm">{formatAndDivideNumber(upvotes)}</span>
        </div>
        <div className="flex-start gap-2 text-black/80">
          <FaRegEye />
          <span className="text-sm">{formatAndDivideNumber(views)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
