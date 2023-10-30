import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      Navbar
      <div className="flex">
        LeftSideBar
        <section className="">
          <div className="">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
