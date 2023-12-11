import Home from "@/components/Home";
import Hero from "@/components/landing/Hero";
import { getSavedCards } from "@/lib/actions/card.action";
import { auth } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth();

  if (!userId) return <Hero />;

  const savedCards = await getSavedCards({ clerkId: userId });

  return (
    <div className="flex w-full flex-col">
      <Home savedCards={savedCards} />
    </div>
  );
};

export default page;
