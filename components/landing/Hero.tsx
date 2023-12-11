import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg relative flex h-[90vh] w-full items-center justify-center">
      <div className="z-10 flex max-w-[400px] flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 drop-shadow-md sm:p-10 md:max-w-[600px]">
        <Image
          src="/assets/images/oktagonmma.png"
          alt="oktagonmma"
          width={300}
          height={300}
        />
        <h1 className="text-center text-2xl font-bold uppercase">
          Poskládej si vlastní oktagon fightcard
        </h1>
        <p className="text-center">
          Poskládej svoji vysněnou FightCard a sdílej ji mezi ostatní. Dej nám
          vědět jaké zápasy by se ti na turnaji OKTAGON líbili. Můžeš také
          procházet karty ostatních fanouškú a dávat jim upvoty.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 xs:flex-row">
          <Link href="/sign-in">
            <Button className="no-focus bg-black text-white">
              Přihlásit se
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="no-focus bg-black text-white">
              Registrovat se
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
