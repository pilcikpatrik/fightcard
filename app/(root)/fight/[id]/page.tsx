import React from "react";
import Fight from "@/components/Fight";
import { getCardById } from "@/lib/actions/card.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const page = async ({ params }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  const result = await getCardById({ cardId: params.id });

  const itemId = result._id;

  const isAuthor = mongoUser && mongoUser._id === result.author._id;

  return (
    <div className=" w-full">
      <Fight
        fighters={result.fighters}
        itemId={JSON.stringify(itemId)}
        title={result.title}
        isAuthor={isAuthor}
        author={result.author}
      />
    </div>
  );
};

export default page;
