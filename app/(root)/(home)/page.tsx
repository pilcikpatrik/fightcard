import Home from "@/components/Home";
import PostCard from "@/components/PostCard";
import Hero from "@/components/landing/Hero";
import Pagination from "@/components/Pagination";
import { getSavedCards, getCards } from "@/lib/actions/card.action";
import { auth } from "@clerk/nextjs";
import Filter from "@/components/Filter";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
];

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return <Hero />;

  const savedCards = await getSavedCards({ clerkId: userId });

  let result;

  if (userId) {
    result = await getCards({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  } else {
    result = {
      questions: [],
      isNext: false,
    };
  }

  const cards = result.cards || [];

  return (
    <div className="flex w-full flex-col">
      <Home savedCards={savedCards} />
      <div className="flex flex-col items-center justify-center px-10 xl:px-80">
        <div className="mt-10">
          <h2 className="text-4xl font-bold uppercase">
            Procházej karty ostatních uživatelů
          </h2>
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="hidden max-md:flex"
          />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {cards.length > 0 ? (
            cards.map((card) => (
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
        </div>
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
