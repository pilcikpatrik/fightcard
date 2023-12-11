"use client";
import React from "react";
import Image from "next/image";
import HomeForm from "./HomeForm";

const Home = ({ savedCards }: any) => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="flex-center grow flex-col">
        <HomeForm savedCards={savedCards} />
      </div>

      <div className="bg flex h-[90vh] w-full grow flex-col items-center justify-center gap-2 px-10 pt-10 md:px-20">
        <Image
          src="/assets/images/oktagonmma.png"
          alt="oktagonmma"
          width={1450}
          height={1450}
          className="absolute overflow-hidden p-5"
        />
      </div>
    </div>
  );
};

export default Home;
