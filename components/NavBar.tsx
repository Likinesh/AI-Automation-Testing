"use client";
import React from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { userId } = useAuth();
  const pathname = usePathname();

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", "/#features");
    }
  };

  return (
    <nav className="bg-surface-glass w-full sticky z-50 backdrop-blur-xl border-b border-outline-variant/20">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-container-max mx-auto z-50">
        
        <Link href="/" className="font-headline-md text-[20px] font-bold tracking-tighter text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
            terminal
          </span>
          AUTOPILOT
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-primary-fixed font-bold border-b-2 border-primary-fixed pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase">
            Platform
          </Link>
          <Link href="/#features" onClick={handleFeaturesClick} className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase">
            Features
          </Link>
          <Link href="/workspace" className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase">
            Workspace
          </Link>
          <Link href="/pricing" className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
          {!userId && (
            <Link href="/workspace">
              <button className="neon-btn font-label-md text-[12px] uppercase rounded px-4 py-2 scale-95 active:scale-90 transition-transform font-bold">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
