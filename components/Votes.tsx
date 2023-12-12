"use client";
import React, { useEffect } from "react";
import { upvoteCard } from "@/lib/actions/card.action";
import { viewCard } from "@/lib/actions/interaction.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import Image from "next/image";

interface Props {
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
}

const Votes = ({ itemId, userId, upvotes, hasupVoted }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please log in to perform this action",
      });
    }
    await upvoteCard({
      cardId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasupVoted,
      path: pathname,
    });

    return toast({
      title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
      variant: !hasupVoted ? "default" : "destructive",
    });
  };

  useEffect(() => {
    viewCard({
      cardId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="absolute right-0 top-0">
      <div className="flex items-center justify-end gap-2 p-2">
        <div className="rounded-md bg-black px-3 py-0.5 text-lg text-white">
          <div className="flex-center gap-1.5">
            <Image
              src={
                hasupVoted
                  ? "/assets/icons/upvoted.svg"
                  : "/assets/icons/upvote.svg"
              }
              width={18}
              height={18}
              alt="upvote"
              className="cursor-pointer"
              onClick={() => handleVote("upvote")}
            />

            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatAndDivideNumber(upvotes)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
