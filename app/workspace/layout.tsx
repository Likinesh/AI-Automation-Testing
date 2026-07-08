import React from "react";
import SideNavBar from "./_components/SideNavBar";
import NavBar from "@/components/NavBar";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-body-md text-body-md min-h-screen overflow-hidden flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed bg-surface-container-lowest relative">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-surface-tint/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Global Navbar */}
      <NavBar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* SideNavBar Component */}
        <SideNavBar />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceLayout;
