import React from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <section className="flex-between sticky z-50 w-full bg-black p-6">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </Link>
      <UserButton afterSignOutUrl="/" />
    </section>
  );
};

export default Navbar;
