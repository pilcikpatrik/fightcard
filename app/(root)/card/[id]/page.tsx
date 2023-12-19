import React from "react";
import { getCardById } from "@/lib/actions/card.action";
import { getUserById } from "@/lib/actions/user.action";
import FightCard from "@/components/FightCard";
import { auth } from "@clerk/nextjs";

const page = async ({ params }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  const result = await getCardById({ cardId: params.id });

  const itemId = result._id;

  const isAuthor =
    mongoUser &&
    result.author &&
    mongoUser._id.toString() === result.author._id.toString();

  const userId = mongoUser ? JSON.stringify(mongoUser._id) : "";

  const hasUpVoted = mongoUser ? result.upvotes.includes(mongoUser._id) : false;

  return (
    <div className="flex w-full flex-col">
      <FightCard
        fighters={result.fighters}
        itemId={JSON.stringify(itemId)}
        isAuthor={isAuthor}
        userId={userId}
        upvotes={result.upvotes.length}
        hasupVoted={hasUpVoted}
        views={result.views}
        picture={result.author.picture}
        clerkId={result.author.clerkId}
        isVisible={result.isVisible}
      />
    </div>
  );
};

export default page;
