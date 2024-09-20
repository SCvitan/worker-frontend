"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
];

const Nav = () => {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link 
          href={link.path} 
          key={index} 
          className={`${link.path === pathname && "text-gray-800 border-b-2 border-gray-800"} capitalize font-medium hover:text-green-700 transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
