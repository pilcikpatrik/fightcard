"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardList from "../CardList";

const OpenDialog = ({ savedCards }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!savedCards) {
    return;
  }
  const filteredCards = JSON.parse(savedCards).filter((card: any) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger className="no-focus btn hover_btn">Open</DialogTrigger>
        <DialogContent className="max-h-[600px] bg-white px-10 py-16">
          <Input
            className="no-focus"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ScrollArea className="max-h-80">
            {filteredCards
              .sort(
                (a: any, b: any) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              ) // Seřazení karet
              .map((card: any) => (
                <CardList
                  key={card._id}
                  _id={JSON.stringify(card._id)}
                  title={card.title}
                  createdAt={card.createdAt}
                  isVisible={card.isVisible}
                />
              ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenDialog;
