import Navbar from "@/components/navs/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Navbar />
      <div className="">
        {/* LeftSideBar */}
        <section className="">
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </section>
      </div>
      {/* <Footer /> */}
      <Toaster />
    </main>
  );
};

export default Layout;
