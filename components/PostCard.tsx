import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

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
  clerkId?: string | null;
  fighters: Fighter[];
}

const PostCard = ({
  clerkId,
  _id,
  title,
  author,
  createdAt,
  fighters = [],
}: CardProps) => {
  const firstFighter = fighters[0];
  const secondFighter = fighters[1];
  return (
    <div className="w-[300px] flex-col  items-start justify-center space-y-5 rounded-lg border bg-white p-10 drop-shadow-md">
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
          <p className="font-medium">{author.name}</p>
        </div>
      </div>
      <div className="flex-start flex-col">
        <Link href={`/card/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="text-black/60">{getTimestamp(createdAt)}</p>
      </div>
      <div className="flex-between">
        {firstFighter && (
          <Image
            src={firstFighter.imgSrc}
            alt={firstFighter.title}
            width={50}
            height={50}
          />
        )}
        <div className="text-center text-xs">
          {firstFighter.title} <br /> vs <br /> {secondFighter.title}
        </div>
        {secondFighter && (
          <Image
            src={secondFighter.imgSrc}
            alt={secondFighter.title}
            width={50}
            height={50}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
