import { BiHomeAlt2, BiUser } from "react-icons/bi";
import { FiOctagon } from "react-icons/fi";
import React from "react";

export interface SidebarLink {
  component: React.ElementType;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    component: BiHomeAlt2,
    route: "/",
    label: "Home",
  },
  {
    component: BiUser,
    route: "/profile",
    label: "Profile",
  },
  {
    component: FiOctagon,
    route: "https://oktagonmma.com/",
    label: "Oktagonmma",
  },
];
