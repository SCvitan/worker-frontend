"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "profile",
    path: "/profile",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-gray-800" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* LOGO */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Worker<span className="text-green-800">App</span>
            </h1>
          </Link>
        </div>
        {/* NAV mobile */}
        <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => {
                return <Link href={link.path} key={index} className={`${link.path === pathname && "text-green-800 border-b-2 border-green-800"} text-xl capitalize hover:text-green-800 transition-all`}>{link.name}</Link>
            })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
