import React from "react";
import { getUserCards } from "@/lib/actions/user.action";
import PostCard from "./PostCard";
import Pagination from "./Pagination";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const CardTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserCards({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5 py-5">
      {result.cards.length > 0 ? (
        result.cards
          .filter((card) => card.isVisible) // Přidávám filtr pro zobrazení pouze viditelných karet
          .map((card) => (
            <PostCard
              key={card._id}
              _id={card._id}
              title={card.title}
              author={card.author}
              createdAt={card.createdAt}
              fighters={card.fighters}
              views={card.views}
              upvotes={card.upvotes.length}
              clerkId={clerkId}
            />
          ))
      ) : (
        <div>no result</div>
      )}
      <div className="my-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextCards}
        />
      </div>
    </div>
  );
};

export default CardTab;
