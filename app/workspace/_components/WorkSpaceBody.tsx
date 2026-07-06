"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import EmptyFolder from "./EmptyFolder";
import axios from "axios";
import AddRepoDialog, { Repo } from "./AddRepoDialog";
import UserRepoList from "./UserRepoList";

const WorkSpaceBody = () => {
  const { user } = useContext(UserContext);
  const [token, setToken] = React.useState<string | null>("");
  const [repoList, setRepoList] = React.useState<Repo[]>([]);

  React.useEffect(() => {
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

  useEffect(() => {
    user && GetRepoList();
  }, [user]);

  const onAddRepo = async () => {
    window.location.assign("/api/github");
  };

  const GetRepoList = async () => {
    const res = await axios.get("/api/user-repo?userId=" + user?.id);
    setRepoList(res.data);
  };

  return (
    <>
      {/* Left Panel: Test Case Management (Repos) */}
      <section className="col-span-5 flex flex-col glass-panel rounded-xl overflow-hidden h-full">
        <div className="p-md border-b border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-headline-md text-[20px] text-inverse-surface">Core Platform Suite</h2>
            <p className="font-label-md text-[12px] text-on-surface-variant mt-1">Remaining Credits: {user?.credits}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 rounded border border-outline-variant/30 text-on-surface-variant hover:text-primary-fixed hover:border-primary-fixed/50 transition-colors bg-surface-container-lowest/50">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-sm space-y-sm">
          <div className="p-sm rounded-lg border border-primary-fixed/30 bg-primary-fixed/5 flex justify-between items-center cursor-pointer hover:bg-primary-fixed/10 transition-colors mb-4">
            <div className="flex text-on-surface items-center gap-5">
              <Image src="/github.png" alt="Github Image" width={30} height={30} className="rounded-full invert" />
              <h2 className="text-sm font-semibold mt-1">Connect GitHub & Add Repo</h2>
            </div>
            <div>
              {token == "" ? (
                <button onClick={onAddRepo} className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded">Connect</button>
              ) : (
                <AddRepoDialog setRefresh={(refresh: boolean) => { if (refresh) GetRepoList(); }} />
              )}
            </div>
          </div>

          {!repoList ? (
             <EmptyFolder />
          ) : (
            <UserRepoList repoList={repoList} setReload={GetRepoList} />
          )}
        </div>
      </section>

      {/* Right Panel: Terminal Execution View */}
      <section className="col-span-7 terminal-panel rounded-xl flex flex-col overflow-hidden h-full">
        <div className="px-md py-sm border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest/80 shrink-0">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">terminal</span>
            <span className="font-code-sm text-[13px] text-on-surface-variant uppercase tracking-wider mt-1">Live Execution Stream</span>
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full border border-outline-variant/50"></span>
            <span className="w-3 h-3 rounded-full border border-outline-variant/50"></span>
            <span className="w-3 h-3 rounded-full border border-outline-variant/50"></span>
          </div>
        </div>
        
        <div className="flex-1 p-md overflow-y-auto font-code-sm text-[13px] leading-relaxed space-y-1 bg-[#0A0A0A]">
          <div className="text-on-surface-variant/60">AutoPilot Engine v2.4.0 initialized...</div>
          <div className="text-on-surface-variant/60">Connecting to test environment: Staging-EU-West</div>
          <div className="text-primary-fixed mt-4 mb-2">&gt; run suite Core_Platform_Suite --focus User_Authentication_Flow</div>
          
          <div className="text-on-surface flex gap-2">
            <span className="text-outline-variant shrink-0">[14:20:01]</span>
            <span>Executing Suite: <span className="text-inverse-surface">Core_Flow_A</span>...</span>
          </div>
          <div className="text-on-surface flex gap-2">
            <span className="text-outline-variant shrink-0">[14:20:02]</span>
            <span>Loading environment variables... <span className="text-outline">OK</span></span>
          </div>
          <div className="text-on-surface flex gap-2">
            <span className="text-outline-variant shrink-0">[14:20:03]</span>
            <span>Spawning headless browser instance (Chromium v120)...</span>
          </div>
          <div className="text-on-surface flex gap-2">
            <span className="text-outline-variant shrink-0">[14:20:05]</span>
            <span><span className="text-outline">PASS:</span> Element visibility check on <span className="text-secondary-fixed">#login-container</span></span>
          </div>
          
          <div className="text-primary-fixed flex gap-2 mt-2">
            <span className="text-primary-fixed/50 shrink-0">[14:20:10]</span>
            <span>Waiting for dashboard redirect<span className="animate-cursor-blink font-bold">_</span></span>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkSpaceBody;
