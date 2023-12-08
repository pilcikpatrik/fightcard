import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardList from "../CardList";

const OpenDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="no-focus btn">Open</DialogTrigger>
        <DialogContent className="max-h-[600px] bg-white px-10 py-16">
          <Input className="no-focus" placeholder="search..." />
          <ScrollArea className="max-h-80">
            <CardList />
            <CardList />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenDialog;
