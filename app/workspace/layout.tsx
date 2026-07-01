import React from "react";
import WorkSpaceHeader from "./_components/WorkSpaceHeader";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <WorkSpaceHeader />
      {children}
    </div>
  );
};

export default WorkSpaceLayout;
