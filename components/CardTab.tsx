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
    <div className="my-5 flex w-full flex-col items-center justify-center  space-y-5 md:flex-row md:flex-wrap">
      {result.cards.length > 0 ? (
        result.cards.map((card) => (
          <PostCard
            key={card._id}
            _id={card._id}
            title={card.title}
            author={card.author}
            createdAt={card.createdAt}
            fighters={card.fighters}
          />
        ))
      ) : (
        <div>no result</div>
      )}
      <div className="mb-5 mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextCards}
        />
      </div>
    </div>
  );
};

export default CardTab;
