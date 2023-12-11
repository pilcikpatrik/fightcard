import React from "react";
import OpenDialog from "./forms/OpenDialog";
import { Button } from "./ui/button";
import Link from "next/link";

const HomeForm = ({ savedCards }: any) => {
  return (
    <div className="flex-start absolute left-0 top-0 z-40 flex w-full gap-2 p-2">
      <OpenDialog savedCards={savedCards} />
      <Link href="/create-card">
        <Button className="no-focus btn">New</Button>
      </Link>
    </div>
  );
};

export default HomeForm;
