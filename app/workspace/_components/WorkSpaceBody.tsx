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
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Workspace</h2>
        <h2 className="text-purple-600 bg-purple-100 px-2 rounded-lg">
          Remaining Credits: {user?.credits}
        </h2>
      </div>

      <Card className="mt-5 bg-purple-300 flex justify-between items-center p-4 border rounded-lg">
        <div className="flex text-black items-center gap-5">
          <Image src="/github.png" alt="Github Image" width={50} height={50} />
          <h2 className="text-lg font-semibold mt-2">
            Connect GitHub & Add Repo
          </h2>
        </div>
        <div>
          {token == "" ? (
            <Button onClick={onAddRepo}>Connect to Github</Button>
          ) : (
            <AddRepoDialog
              setRefresh={(refresh: boolean) => {
                if (refresh) {
                  GetRepoList();
                }
              }}
            />
          )}
        </div>
      </Card>
      {!repoList ? (
        <Card className="mt-10">
          <CardContent>
            <EmptyFolder />
          </CardContent>
        </Card>
      ) : (
        <UserRepoList repoList={repoList} />
      )}
    </div>
  );
};

export default WorkSpaceBody;
