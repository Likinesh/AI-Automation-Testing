"use client";
import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect } from "react";
import EmptyFolder from "./EmptyFolder";
import axios from "axios";
import { Repo } from "./AddRepoDialog";
import UserRepoList from "./UserRepoList";

const WorkSpaceBody = () => {
  const { user } = useContext(UserContext);
  const [repoList, setRepoList] = React.useState<Repo[]>([]);

  useEffect(() => {
    user && GetRepoList();
  }, [user]);

  const GetRepoList = async () => {
    const res = await axios.get("/api/user-repo?userId=" + user?.id);
    setRepoList(res.data);
  };

  return (
    <>
      {/* Main Panel: Test Case Management (Repos) */}
      <section className="flex flex-col glass-panel rounded-xl overflow-hidden min-h-full">

        
        <div className="flex-1 overflow-y-auto p-sm space-y-sm">
          {!repoList || repoList.length === 0 ? (
             <EmptyFolder />
          ) : (
            <UserRepoList repoList={repoList} setReload={GetRepoList} />
          )}
        </div>
      </section>
    </>
  );
};

export default WorkSpaceBody;
