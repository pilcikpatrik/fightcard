import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CircularProgress } from "@nextui-org/react";

const defaultImageSrc = "https://oktagonmma.com/img/fight-card/arnold.png";

interface stats {
  label: string;
  value: string;
}

interface Fighter {
  title: string;
  nickname: string;
  imgSrc: string;
  score: string;
  nationality: string;
  age: string;
  height?: string;
  weight: string;
  background?: string;
  gym?: string;
  result?: string[];
  stats?: stats[];
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
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
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
            src={author.picture}
            alt="profile"
            width={36}
            height={36}
            className="h-8 w-8 rounded-full xs:h-12 xs:w-12"
          />
          <div className="">
            <span className="text-xs uppercase text-black/60">Created by</span>
            <Link href={`/profile/${author.clerkId}`}>
              <p className="text-sm font-medium xs:text-base">{author.name}</p>
            </Link>
          </div>
        </div>
        <Link href={`/card/${JSON.parse(itemId)}`}>
          <h2 className="text-sm font-semibold uppercase xs:text-base xl:text-lg">
            {title}
          </h2>
        </Link>
      </div>
      <div className="flex flex-col">
        {fightPairs.map((pair, index) => (
          <div key={index} className="flex flex-col-reverse md:flex-col">
            <div className="fight_gradient flex flex-col items-center gap-5 px-5 pt-10 xs:px-10 md:flex-row md:items-center md:justify-between 2xl:justify-center 2xl:gap-40">
              {pair.map((fighter, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex w-full items-end gap-5 md:w-auto">
                    {idx % 2 === 0 ? (
                      <div className="flex w-full flex-col">
                        <div className="flex items-end justify-start gap-5">
                          <Dialog>
                            <DialogTrigger
                              asChild
                              disabled={
                                fighter?.age === undefined || !fighter.age
                              }
                            >
                              <Image
                                src={fighter?.imgSrc || defaultImageSrc}
                                alt={fighter?.title || "Fighter"}
                                width={300}
                                height={300}
                                className="z-10 w-28 cursor-pointer xs:w-40 lg:w-56 xl:w-72"
                              />
                            </DialogTrigger>
                            <DialogContent className="w-full overflow-hidden bg-white p-0">
                              <div className="flex flex-col">
                                <div className="fight_gradient flex-center gap-5 pt-5">
                                  <Image
                                    src={fighter?.imgSrc || defaultImageSrc}
                                    alt={fighter?.title || "Fighter"}
                                    width={200}
                                    height={200}
                                    className="w-28 md:w-40"
                                  />
                                  <div>
                                    <span className="uppercase text-white">
                                      {fighter?.nickname}
                                    </span>
                                    <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                                      {fighter?.title || "Unknown"}
                                    </h3>
                                    <p className=" text-sm text-white xs:text-base lg:text-lg">
                                      {fighter?.score || "0-0-0"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start justify-between p-5">
                                  <div>
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Nationality
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter?.nationality}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Age
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter?.age}
                                      </p>
                                    </div>
                                    {fighter?.height && (
                                      <div>
                                        <span className="text-xs text-black/60">
                                          Height
                                        </span>
                                        <p className="text-sm sm:text-base">
                                          {fighter.height}
                                        </p>
                                      </div>
                                    )}
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Weight
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter?.weight}
                                      </p>
                                    </div>

                                    {fighter?.background && (
                                      <div>
                                        <span className="text-xs text-black/60">
                                          Background
                                        </span>
                                        <p className="text-sm sm:text-base">
                                          {fighter.background}
                                        </p>
                                      </div>
                                    )}
                                    {fighter?.gym && (
                                      <div>
                                        <span className="text-xs text-black/60">
                                          Gym
                                        </span>
                                        <p className="text-sm sm:text-base">
                                          {fighter.gym}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className={`${
                                      (fighter?.stats?.length ?? 0) > 0
                                        ? "flex"
                                        : "hidden"
                                    } flex flex-col justify-start gap-2`}
                                  >
                                    {fighter?.stats?.map((stat, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-end gap-3"
                                      >
                                        <div className="flex-start text-sm sm:text-base">
                                          {stat.label}:
                                        </div>
                                        <div className="flex items-start justify-end">
                                          <CircularProgress
                                            key={index}
                                            size="md"
                                            value={parseFloat(stat.value)}
                                            color="warning"
                                            showValueLabel={true}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    <div className="flex flex-col items-end">
                                      <span className="text-sm sm:text-base">{`Last ${fighter?.result?.length} fights`}</span>
                                      <div className="flex-start gap-1">
                                        {fighter?.result?.map((res, index) => (
                                          <div
                                            key={index}
                                            className="oktagon flex-center h-5 w-5 bg-yellow-400 p-1 text-xs text-white"
                                          >
                                            {res}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <div className="mb-12 sm:mb-20 lg:mb-32 xl:mb-40">
                            <span className="uppercase text-white">
                              {fighter?.nickname}
                            </span>
                            <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                              {fighter?.title || "Unknown"}
                            </h3>
                            <p className=" text-sm text-white xs:text-base lg:text-lg">
                              {fighter?.score || "0-0-0"}
                            </p>
                            {/*                             <div className="flex-start mt-1 gap-1">
                              {fighter?.result?.map((res, index) => (
                                <div
                                  key={index}
                                  className="oktagon flex-center h-5 w-5 bg-yellow-400 p-1 text-xs text-white"
                                >
                                  {res}
                                </div>
                              ))}
                            </div> */}
                          </div>
                        </div>
                        <div className="flex-center sheet w-full bg-yellow-400 p-3 text-white md:hidden">
                          VS
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-end justify-end gap-5">
                        <div className="mb-12 sm:mb-20 lg:mb-32 xl:mb-40">
                          <span className="uppercase text-white">
                            {fighter?.nickname}
                          </span>
                          <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                            {fighter?.title || "Unknown"}
                          </h3>
                          <p className=" text-sm text-white xs:text-base lg:text-lg">
                            {fighter?.score || "0-0-0"}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Image
                              src={fighter?.imgSrc || defaultImageSrc}
                              alt={fighter?.title || "Fighter"}
                              width={300}
                              height={300}
                              className="w-28 cursor-pointer xs:w-40 lg:w-56 xl:w-72"
                            />
                          </DialogTrigger>
                          <DialogContent className="w-full overflow-hidden bg-white p-0">
                            <div className="flex flex-col">
                              <div className="fight_gradient flex-center gap-5 pt-5">
                                <Image
                                  src={fighter?.imgSrc || defaultImageSrc}
                                  alt={fighter?.title || "Fighter"}
                                  width={200}
                                  height={200}
                                  className="w-28 md:w-40"
                                />
                                <div>
                                  <span className="uppercase text-white">
                                    {fighter?.nickname}
                                  </span>
                                  <h3 className="text-base font-bold xs:text-lg lg:text-2xl">
                                    {fighter?.title || "Unknown"}
                                  </h3>
                                  <p className=" text-sm text-white xs:text-base lg:text-lg">
                                    {fighter?.score || "0-0-0"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start justify-between p-5">
                                <div>
                                  <div>
                                    <span className="text-xs text-black/60">
                                      Nationality
                                    </span>
                                    <p className="text-sm sm:text-base">
                                      {fighter?.nationality}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-black/60">
                                      Age
                                    </span>
                                    <p className="text-sm sm:text-base">
                                      {fighter?.age}
                                    </p>
                                  </div>
                                  {fighter?.height && (
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Height
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter.height}
                                      </p>
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-xs text-black/60">
                                      Weight
                                    </span>
                                    <p className="text-sm sm:text-base">
                                      {fighter?.weight}
                                    </p>
                                  </div>

                                  {fighter?.background && (
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Background
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter.background}
                                      </p>
                                    </div>
                                  )}
                                  {fighter?.gym && (
                                    <div>
                                      <span className="text-xs text-black/60">
                                        Gym
                                      </span>
                                      <p className="text-sm sm:text-base">
                                        {fighter.gym}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div
                                  className={`${
                                    (fighter?.stats?.length ?? 0) > 0
                                      ? "flex"
                                      : "hidden"
                                  } flex flex-col justify-start gap-2`}
                                >
                                  {fighter?.stats?.map((stat, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-end gap-3"
                                    >
                                      <div className="flex-start text-sm sm:text-base">
                                        {stat.label}:
                                      </div>
                                      <div className="flex items-start justify-end">
                                        <CircularProgress
                                          key={index}
                                          size="md"
                                          value={parseFloat(stat.value)}
                                          color="warning"
                                          showValueLabel={true}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                  <div className="flex flex-col items-end">
                                    <span className="text-sm sm:text-base">{`Last ${fighter?.result?.length} fights`}</span>
                                    <div className="flex-start gap-1">
                                      {fighter?.result?.map((res, index) => (
                                        <div
                                          key={index}
                                          className="oktagon flex-center h-5 w-5 bg-yellow-400 p-1 text-xs text-white"
                                        >
                                          {res}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex-center gap-5 bg-white p-5 text-sm font-bold xs:text-lg xl:text-2xl">
              <span className="">{pair[0]?.title || "Unknown"}</span>
              <span className="text-yellow-400">vs</span>
              <span className="">{pair[1]?.title || "Unknown"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fight;
