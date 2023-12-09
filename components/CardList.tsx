import React from "react";
import { Button } from "@/components/ui/button";
import { BiTrash, BiEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const CardList = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-start flex-col">
          <h3 className="font-bold">FightCard name</h3>
          <p className=" text-sm">12/12/2023/11:27</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button className="no-focus bg-black text-lg text-white">
            <FaRegEye />
          </Button>
          <Button className="no-focus bg-black text-lg text-white">
            <BiEdit />
          </Button>
          <Button className="no-focus bg-black text-lg text-white">
            <BiTrash />
          </Button>
        </div>
      </div>
      <Separator className="h-[1px] bg-slate-100" />
    </div>
  );
};

export default CardList;
