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

  return (
    <div className="flex w-full flex-col">
      <FightCard
        fighters={result.fighters}
        itemId={JSON.stringify(itemId)}
        isAuthor={
          JSON.stringify(mongoUser._id) === JSON.stringify(result.author._id)
        }
        userId={JSON.stringify(mongoUser._id)}
        upvotes={result.upvotes.length}
        hasupVoted={result.upvotes.includes(mongoUser._id)}
      />
    </div>
  );
};

export default page;
