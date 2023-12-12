import Home from "@/components/Home";
import PostCard from "@/components/PostCard";
import Hero from "@/components/landing/Hero";
import Pagination from "@/components/Pagination";
import { getSavedCards, getCards } from "@/lib/actions/card.action";
import { auth } from "@clerk/nextjs";
import Filter from "@/components/Filter";
import Image from "next/image";

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
      cards: [],
      isNext: false,
    };
  }

  return (
    <div className="flex w-full flex-col">
      <Home savedCards={JSON.stringify(savedCards)} />
      <div className="mt-10 flex flex-col items-center justify-center px-10 xl:px-80">
        <div className="mt-10 flex flex-col items-center justify-center gap-5">
          <a
            className="mx-auto rounded-full bg-gradient-to-r from-[#edde5d] to-[#f09819] p-[1px] brightness-90 contrast-150 focus:outline-none focus:ring-blue-600 focus-visible:ring-2 dark:brightness-125 dark:contrast-100 sm:block"
            href="/"
          >
            <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80">
              <span className="select-none bg-gradient-to-r from-[#edde5d] to-[#f09819] bg-clip-text text-transparent">
                <svg
                  className="mr-1 inline-block h-4 w-4 fill-[#edde5d]"
                  viewBox="4 4 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m19.2 36.4-4.75-10.45L4 21.2l10.45-4.75L19.2 6l4.75 10.45L34.4 21.2l-10.45 4.75ZM36.4 42l-2.35-5.25-5.25-2.35 5.25-2.4 2.35-5.2 2.4 5.2 5.2 2.4-5.2 2.35Z" />
                </svg>
                Jedeme bombyyyyy
                <Image
                  className="absolute -bottom-1 right-1 translate-y-7 duration-300 group-hover:translate-y-0"
                  alt="doge smile"
                  height="28"
                  width="28"
                  src="/assets/images/novotny.png"
                />
              </span>
            </div>
          </a>
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
                key={JSON.stringify(card._id)} // Convert ObjectId to string
                _id={JSON.stringify(card._id)} // Convert ObjectId to string
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
