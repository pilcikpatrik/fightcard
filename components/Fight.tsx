import React from "react";
import Image from "next/image";
import Link from "next/link";

const defaultImageSrc = "https://oktagonmma.com/img/fight-card/arnold.png";

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

type FighterPair = [Fighter | null, Fighter | null];

const Fight = ({
  fighters,
  title,
  isAuthor,
  itemId,
  author,
}: {
  fighters: Fighter[];
  title: string;
  itemId: string;
  isAuthor: boolean;
  author: string;
}) => {
  const fightPairs: FighterPair[] = fighters.reduce(
    (acc: FighterPair[], fighter, index) => {
      if (index % 2 === 0) {
        acc.push([fighter, fighters[index + 1] || null]);
      }
      return acc;
    },
    []
  );

  return (
    <div className="relative w-full flex-col">
      <div className="flex items-center justify-between border-b p-5 md:border-none md:border-neutral-400 2xl:px-80">
        <div className="flex-center gap-3">
          <Image
            src={defaultImageSrc}
            alt="profile"
            width={24}
            height={24}
            className="h-12 w-12 rounded-full"
          />
          <div className="">
            <span className="text-xs uppercase opacity-50">Created by</span>
            <p className="font-medium">{JSON.parse(author)}</p>
          </div>
        </div>
        <Link href={`/card/${JSON.parse(itemId)}`}>
          <h2 className="text-base font-semibold uppercase xs:text-base xl:text-lg">
            {title}
          </h2>
        </Link>
      </div>
      <div className="flex flex-col">
        {fightPairs.map((pair, index) => (
          <div key={index} className="flex flex-col-reverse md:flex-col">
            <div className="fight_gradient flex flex-col items-center gap-5 px-5 pt-10 xs:px-10 md:flex-row md:items-end md:justify-between 2xl:justify-center 2xl:gap-40">
              {pair.map((fighter, idx) => (
                <div
                  key={idx}
                  className="flex w-full items-end gap-5 md:w-auto"
                >
                  {idx % 2 === 0 ? (
                    <div className="flex items-end justify-start gap-5">
                      <Image
                        src={fighter?.imgSrc || defaultImageSrc}
                        alt={fighter?.title || "Fighter"}
                        width={300}
                        height={300}
                        className="w-28 xs:w-40 lg:w-56 xl:w-72"
                      />
                      <div className="mb-20 lg:mb-32 xl:mb-40">
                        <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                          {fighter?.title || "Unknown"}
                        </h3>
                        <p className=" text-sm text-white xs:text-base lg:text-lg">
                          {fighter?.score || "0-0-0"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full items-end justify-end">
                      <div className="mb-20 lg:mb-32 xl:mb-40">
                        <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                          {fighter?.title || "Unknown"}
                        </h3>
                        <p className=" text-sm text-white xs:text-base lg:text-lg">
                          {fighter?.score || "0-0-0"}
                        </p>
                      </div>
                      <Image
                        src={fighter?.imgSrc || defaultImageSrc}
                        alt={fighter?.title || "Fighter"}
                        width={300}
                        height={300}
                        className="w-28 xs:w-40 lg:w-56 xl:w-72"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-center bg-white p-5 text-base font-bold xs:text-lg xl:text-2xl">
              {pair[0]?.title || "Unknown"} vs {pair[1]?.title || "Unknown"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fight;
