import React from "react";
import Image from "next/image";

const defaultImageSrc = "https://oktagonmma.com/img/fight-card/arnold.png"; // Nahraďte cestou k vašemu defaultnímu obrázku

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface MainEventProps {
  pair: [Fighter | null, Fighter | null];
}

const MainEvent: React.FC<MainEventProps> = ({ pair }) => {
  // Funkce pro extrakci příjmení z celého jména
  const getSurname = (fullName: string) => fullName.split(" ").slice(-1)[0];

  const getFighterImage = (fighter: Fighter | null) =>
    fighter ? fighter.imgSrc : defaultImageSrc;
  const getFighterSurname = (fighter: Fighter | null) =>
    fighter ? getSurname(fighter.title) : "Unknown";

  const [fighterOne, fighterTwo] = pair;

  return (
    <div className="relative -bottom-10 flex items-center justify-center md:-bottom-20">
      <Image
        src={getFighterImage(fighterOne)}
        alt={getFighterSurname(fighterOne)}
        width={150}
        height={150}
        className="w-24 xs:w-32 sm:w-36 md:w-60"
      />
      <div className="relative -top-2 flex flex-col items-center justify-center gap-1 xs:top-0 xs:gap-2">
        <div className="sheet w-20 bg-yellow-400 py-0.5 sm:w-32 md:w-32 md:py-1">
          <h2 className="text-xxs text-center uppercase text-white sm:text-xs md:text-sm">
            #Main event
          </h2>
        </div>
        <h3 className="text-center text-base font-bold uppercase text-white xs:text-lg sm:text-2xl md:text-4xl">
          {getFighterSurname(fighterOne)}
          <br /> vs <br />
          {getFighterSurname(fighterTwo)}
        </h3>
      </div>
      <Image
        src={getFighterImage(fighterTwo)}
        alt={getFighterSurname(fighterTwo)}
        width={150}
        height={150}
        className="w-24 xs:w-32 sm:w-36 md:w-60"
      />
    </div>
  );
};

export default MainEvent;
