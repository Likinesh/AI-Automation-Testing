"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddRepoDialog from "./AddRepoDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavBar = () => {
  const [token, setToken] = useState<string | null>("");
  const pathname = usePathname();

  useEffect(() => {
    const GetGithubToken = async () => {
      try {
        const response = await axios.get("/api/github/token");
        setToken(response.data.token);
      } catch (error) {
        console.error("Error fetching GitHub token:", error);
        setToken("");
      }
    };
    GetGithubToken();
  }, []);

  const onAddRepo = async () => {
    window.location.assign("/api/github");
  };

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + "/");
    if (isActive) {
      return "text-primary-fixed border-r-2 border-primary-fixed flex items-center gap-3 px-6 py-3 bg-primary-fixed/10 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150";
    }
    return "text-on-surface-variant flex items-center gap-3 px-6 py-3 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150";
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-md h-full w-64 shrink-0 border-r border-outline-variant/20 shadow-sm flex flex-col z-40">

      <div className="flex-1 overflow-y-auto py-md">
        <ul className="space-y-xs">
          <li>
            <Link href="/workspace" className={pathname === "/workspace" ? getLinkClasses("/workspace") : getLinkClasses("/workspace/projects")}>
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>folder_open</span>
              <span className="font-label-md text-[12px] uppercase">Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/workspace/analytics" className={getLinkClasses("/workspace/analytics")}>
              <span className="material-symbols-outlined">insights</span>
              <span className="font-label-md text-[12px] uppercase">Analytics</span>
            </Link>
          </li>
          <li>
            <Link href="/workspace/settings" className={getLinkClasses("/workspace/settings")}>
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-[12px] uppercase">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-md mt-auto">
        {token === "" ? (
          <button onClick={onAddRepo} className="w-full bg-primary-fixed text-on-primary-fixed font-label-md text-[12px] uppercase py-sm px-md rounded hover:bg-surface-tint transition-colors flex items-center justify-center gap-sm active:scale-95">
            <span className="material-symbols-outlined text-[16px]">integration_instructions</span>
            Connect GitHub
          </button>
        ) : (
          <div className="w-full [&>button]:w-full [&>button]:bg-primary-fixed [&>button]:text-on-primary-fixed [&>button]:font-label-md [&>button]:text-[12px] [&>button]:uppercase [&>button]:py-sm [&>button]:px-md [&>button]:rounded [&>button]:hover:bg-surface-tint [&>button]:transition-colors [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-sm [&>button]:active:scale-95">
            <AddRepoDialog setRefresh={(refresh: boolean) => { if (refresh) window.location.reload(); }} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideNavBar;
