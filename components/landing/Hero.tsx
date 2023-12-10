import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex h-[90vh] w-full items-center justify-center p-10 md:p-40">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video_filter absolute left-0 top-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/preview.mp4" type="video/mp4" />
      </video>
      <div className="z-10 flex max-w-[600px] flex-col items-center justify-center gap-5 rounded-lg bg-white p-10 drop-shadow-md">
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
        <div className="flex items-center justify-center gap-3">
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
