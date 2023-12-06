"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import FightForm from "./forms/FightForm";
import { ScrollArea } from "./ui/scroll-area";

const fights = [{ title: "Main event" }, { title: "Free prelims" }];

const CardForm = () => {
  return (
    <div className="flex-start absolute left-0 top-0 flex w-full gap-2 p-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="no-focus bg-black text-white">Open</Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="h-full border-none bg-white">
          <SheetHeader>
            <SheetTitle>Build your Fight Card</SheetTitle>
            <SheetDescription>
              Create your dream Fight Card and share with others.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[90%] w-full py-10">
            <div className="flex-col space-y-4">
              {fights.map((fight) => (
                <div key={fight.title} className="space-y-2">
                  <h3>{fight.title}</h3>
                  <FightForm />
                  <FightForm />
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Button className="no-focus bg-black text-white">Save</Button>
      <Button className="no-focus bg-black text-white">Publish</Button>
    </div>
  );
};

export default CardForm;
