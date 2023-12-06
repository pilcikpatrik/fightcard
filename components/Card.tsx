import React from "react";
import Image from "next/image";
import { useFightersStore } from "@/store/fightCardStore";

const Card = () => {
  const fighters = useFightersStore((state) => state.fighters);

  // Funkce pro získání příjmení z celého jména
  const getSurname = (fullName) => fullName.split(" ").slice(-1)[0];

  return (
    <div>
      {fighters.map((fighter, index) => {
        // Přeskočit každého druhého bojovníka, protože je přidáváme po párech
        if (index % 2 !== 0) return null;

        const nextFighter = fighters[index + 1];

        return (
          <div
            key={fighter.title}
            className="relative z-0 flex h-24 w-16 border-2 border-white bg-yellow-400 md:h-48 md:w-32 lg:h-56 lg:w-36"
          >
            <Image
              src={fighter.imgSrc}
              alt={fighter.title}
              width={150}
              height={150}
              className="absolute bottom-0 right-3 w-36 md:w-60"
            />
            {nextFighter && (
              <Image
                src={nextFighter.imgSrc}
                alt={nextFighter.title}
                width={150}
                height={150}
                className="absolute bottom-0 left-3 w-36 md:w-60"
              />
            )}
            <div className="absolute bottom-0 z-30 w-full bg-transparent p-2">
              <h3 className="text-xxs text-center font-bold uppercase text-white md:text-base">
                {getSurname(fighter.title)}
                <br />
                <span className="lowercase text-yellow-400">vs </span>
                {nextFighter ? getSurname(nextFighter.title) : "Unknown"}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
