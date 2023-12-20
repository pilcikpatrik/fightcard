import React from "react";
import Image from "next/image";

const defaultImageSrc = "https://oktagonmma.com/img/fight-card/arnold.png"; // Nahraďte cestou k vašemu defaultnímu obrázku

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

interface CardProps {
  pair: [Fighter | null, Fighter | null];
}

const Card: React.FC<CardProps> = ({ pair }) => {
  // Funkce pro extrakci příjmení z celého jména
  const getSurname = (fullName: string) => fullName.split(" ").slice(-1)[0];

  const getFighterImage = (fighter: Fighter | null) =>
    fighter ? fighter.imgSrc : defaultImageSrc;
  const getFighterSurname = (fighter: Fighter | null) =>
    fighter ? getSurname(fighter.title) : "Unknown";

  const [fighterOne, fighterTwo] = pair;

  return (
    <div className="safari_only relative z-0 flex h-[110px] w-[70px] overflow-x-clip border-2 border-white bg-yellow-400 xs:h-28 xs:w-20 md:h-48 md:w-32 lg:h-56 lg:w-36">
      <Image
        src={getFighterImage(fighterOne)}
        alt={getFighterSurname(fighterOne)}
        width={150}
        height={150}
        className="f_image_1 relative -top-3"
      />
      <Image
        src={getFighterImage(fighterTwo)}
        alt={getFighterSurname(fighterTwo)}
        width={150}
        height={150}
        className="f_image_2"
      />
      <div className="card_gradient absolute bottom-0 z-20 h-[70%] w-full"></div>
      <div className="absolute bottom-0 z-30 w-full p-2">
        <h3 className="text-xxs text-center font-bold uppercase text-white md:text-base">
          {getFighterSurname(fighterOne)} vs {getFighterSurname(fighterTwo)}
        </h3>
      </div>
    </div>
  );
};

export default Card;
