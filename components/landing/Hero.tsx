import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg_home relative flex h-[90vh] w-full items-center justify-center">
      <div className="z-10 flex max-w-[400px] flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 drop-shadow-md sm:p-10 md:max-w-[600px]">
        <Image
          src="/assets/images/oktagonmma.png"
          alt="oktagonmma"
          width={300}
          height={300}
        />
        <h1 className="text-center text-2xl font-bold uppercase">
          Create and configure your own FIGHT CARD
        </h1>
        <p className="text-center">
          Buil your dream OKTAGON FIGHTCARD and share it with others. Let us
          know what fights you would like to see.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 xs:flex-row">
          <Link href="/sign-in">
            <Button className="no-focus bg-black text-white">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="no-focus bg-black text-white">Sign up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
