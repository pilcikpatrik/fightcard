import CreateFightCard from "@/components/CreateFightCard";
import { getUserById } from "@/lib/actions/user.action";
import { getCardById } from "@/lib/actions/card.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: any) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getCardById({ cardId: params.id });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CreateFightCard
        type="Edit"
        mongoUserId={JSON.stringify(mongoUser?._id)}
        cardDetails={JSON.stringify(result)}
      />
    </div>
  );
};

export default page;
