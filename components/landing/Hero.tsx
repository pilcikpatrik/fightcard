import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg_home relative flex min-h-screen w-full items-center justify-center">
      <div className="z-10 flex max-w-[400px] flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 drop-shadow-md sm:p-10 md:max-w-[600px]">
        <Image
          src="/assets/images/oktagonmma.png"
          alt="oktagonmma"
          width={300}
          height={300}
          className="w-40 md:w-60"
        />
        <h1 className="text-center text-base font-bold uppercase md:text-2xl">
          Create and configure your own FIGHT CARD
        </h1>
        <p className="text-center text-xs md:text-sm">
          Buil your dream OKTAGON FIGHTCARD and share it with others. Let us
          know what fights you would like to see.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/sign-in">
            <Button className="no-focus w-full bg-black text-white md:w-auto">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="no-focus w-full bg-black text-white md:w-auto">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
