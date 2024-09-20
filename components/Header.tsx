import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./ui/LogoutButton";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-black ml-80 mr-80">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Worker<span className="text-gray-800">App</span>
          </h1>
        </Link>

        {/* NAVBAR desktop */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus: outline-none">
              <Avatar className="h-10 w-10">
                {/* Placeholder avatar since API response doesn't include avatar */}
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="/profile" passHref>
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* NAVBAR mobile */}
        <div className="xl:hidden">
          <h1>
            <MobileNav />
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
