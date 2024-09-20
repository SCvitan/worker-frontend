"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Updated for Next.js 13 app directory

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    // Redirect to the home page
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
      Log Out
    </button>
  );
};

export default LogoutButton;
