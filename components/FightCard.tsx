"use client";
import React from "react";
import Card from "./Card";
import CardForm from "./CardForm";

const FightCard = () => {
  return (
    <div className="bg relative">
      <div className="flex-center flex-col">
        <CardForm />

        <div className="flex items-center justify-center gap-4 p-20 md:gap-8 lg:gap-12">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default FightCard;
