import React from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <section className="flex-between sticky z-50 w-full bg-black p-6">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={150}
        height={150}
      />
      <UserButton afterSignOutUrl="/" />
    </section>
  );
};

export default Navbar;
