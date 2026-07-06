import React from "react";
import WorkSpaceHeader from "./_components/WorkSpaceHeader";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-body-md text-body-md min-h-screen overflow-hidden flex selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-surface-tint/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* SideNavBar */}
      <nav className="bg-surface/80 backdrop-blur-md h-full w-64 fixed left-0 top-0 border-r border-outline-variant/20 shadow-sm flex flex-col z-50">
        <div className="p-lg border-b border-outline-variant/12 flex items-center gap-md">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary-fixed">rocket_launch</span>
          </div>
          <div>
            <h1 className="font-headline-md text-[20px] text-primary-fixed tracking-tight font-bold">AutoPilot QA</h1>
            <p className="font-label-md text-[12px] text-on-surface-variant mt-xs">V2.4.0-Alpha</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-md">
          <ul className="space-y-xs">
            <li>
              <a className="text-primary-fixed border-r-2 border-primary-fixed flex items-center gap-3 px-6 py-3 bg-primary-fixed/10 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150" href="#">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>folder_open</span>
                <span className="font-label-md text-[12px] uppercase">Projects</span>
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant flex items-center gap-3 px-6 py-3 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150" href="#">
                <span className="material-symbols-outlined">precision_manufacturing</span>
                <span className="font-label-md text-[12px] uppercase">Test Suites</span>
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant flex items-center gap-3 px-6 py-3 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150" href="#">
                <span className="material-symbols-outlined">insights</span>
                <span className="font-label-md text-[12px] uppercase">Analytics</span>
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant flex items-center gap-3 px-6 py-3 hover:bg-surface-container-high/50 transition-colors active:scale-95 duration-150" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span className="font-label-md text-[12px] uppercase">Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="p-md mt-auto">
          <button className="w-full bg-primary-fixed text-on-primary-fixed font-label-md text-[12px] uppercase py-sm px-md rounded hover:bg-surface-tint transition-colors flex items-center justify-center gap-sm active:scale-95">
            <span className="material-symbols-outlined">add</span>
            New Test Case
          </button>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        <WorkSpaceHeader />
        {children}
      </div>
    </div>
  );
};

export default WorkSpaceLayout;
