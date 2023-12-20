"use client";
import React from "react";
import HomeForm from "./HomeForm";

const Home = ({ savedCards }: any) => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="flex-center grow flex-col">
        <HomeForm savedCards={savedCards} />
      </div>

      <div className="bg_home flex min-h-screen w-full grow flex-col items-center justify-center gap-2 px-10 pt-10 md:px-20"></div>
    </div>
  );
};

export default Home;
