import Home from "@/components/Home";
import PostCard from "@/components/PostCard";
import Hero from "@/components/landing/Hero";
import Pagination from "@/components/Pagination";
import { getSavedCards, getCards } from "@/lib/actions/card.action";
import { auth } from "@clerk/nextjs";
import Filter from "@/components/Filter";
import Info from "@/components/Info";

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

  let savedCards: any[] = []; // Initialize as an empty array
  if (userId) {
    const fetchedCards = await getSavedCards({ clerkId: userId });
    if (fetchedCards) {
      savedCards = fetchedCards;
    }
  }

  const result = await getCards({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex w-full flex-col">
      {userId ? <Home savedCards={JSON.stringify(savedCards)} /> : <Hero />}
      <div className="mt-10 flex flex-col items-center justify-center px-10 xl:px-80">
        <div className="mt-10 flex flex-col items-center justify-center gap-5">
          <Info title="Jedeme bombyyy" />
          <h2 className="text-center text-4xl font-bold uppercase">
            Look for FightCards
          </h2>
          <p className="text-center text-black/60">
            Browse FightCards from the community
          </p>
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="w-[250px] md:w-[300px]"
          />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {result.cards.length > 0 ? (
            result.cards.map((card) => (
              <PostCard
                key={card._id}
                _id={card._id}
                title={card.title}
                author={card.author}
                createdAt={card.createdAt}
                fighters={card.fighters}
                views={card.views}
                upvotes={card.upvotes.length}
                clerkId={card.author.clerkId}
              />
            ))
          ) : (
            <div>no result</div>
          )}
        </div>
        <div className="my-10">
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
