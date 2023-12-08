import FightCard from "@/components/FightCard";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div className="flex w-full flex-col">
      <FightCard mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
};

export default page;
