import React from "react";
import Image from "next/image";

const defaultImageSrc = "https://oktagonmma.com/img/fight-card/arnold.png"; // Nahraďte cestou k vašemu defaultnímu obrázku

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface PrelimsProps {
  pair: [Fighter | null, Fighter | null];
}

const Prelims: React.FC<PrelimsProps> = ({ pair }) => {
  // Funkce pro extrakci příjmení z celého jména
  const getSurname = (fullName: string) => fullName.split(" ").slice(-1)[0];

  const getFighterImage = (fighter: Fighter | null) =>
    fighter ? fighter.imgSrc : defaultImageSrc;
  const getFighterSurname = (fighter: Fighter | null) =>
    fighter ? getSurname(fighter.title) : "Unknown";

  const [fighterOne, fighterTwo] = pair;

  return (
    <div className=" flex items-center justify-center md:mt-0">
      <Image
        src={getFighterImage(fighterOne)}
        alt={getFighterSurname(fighterOne)}
        width={150}
        height={150}
        className="w-20 md:w-40"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="sheet w-32 bg-yellow-400 py-0.5 md:w-32 md:py-1">
          <h2 className="text-center text-xs uppercase text-white md:text-sm">
            #Free prelims
          </h2>
        </div>
        <h3 className="text-center text-base font-bold uppercase text-white md:text-3xl">
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
        className="relative w-20 md:w-40"
      />
    </div>
  );
};

export default Prelims;
