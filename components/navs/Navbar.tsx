"use client";
import React from "react";
import { SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-2 pt-5">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        const IconComponent = item.component; // assign component to a variable

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className="flex items-center justify-start gap-4 bg-transparent p-4 text-black"
            >
              <div>
                <IconComponent /> {/* render icon as JSX element */}
              </div>
              <p className={`${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

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
      <div className="flex items-center justify-end gap-3">
        <UserButton afterSignOutUrl="/" />
        <div className="flex-center cursor-pointer text-2xl text-white">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex-center text-2xl text-white">
                <BiMenu />
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white pb-48 pt-10">
              <SheetClose asChild>
                <div className="flex-center">
                  <Image
                    src="/assets/images/oktagonmma.png"
                    alt="oktagonmma"
                    width={200}
                    height={200}
                  />
                </div>
              </SheetClose>
              <SheetClose asChild>
                <NavContent />
              </SheetClose>
              <SignedOut>
                <div className="flex flex-col gap-3">
                  <SheetClose asChild>
                    <Link href={`/sign-in`}>
                      <Button className="no-focus hover_btn w-full bg-black text-white">
                        Sign in
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={`/sign-up`}>
                      <Button className="no-focus hover_btn w-full bg-black text-white">
                        Sign up
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
