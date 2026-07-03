"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  private_: boolean;
  html_url: string;
  description: string;
  updated_at: string;
  language: string;
  default_branch: string;
  owner: string;
};

function AddRepoDialog({ setRefresh }: { setRefresh: (v: boolean) => void }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const GetRepoList = async () => {
    const res = await axios.get("/api/github/repo");
    // console.log(res.data);
    setRepos(res.data);
  };

  const filterRepoList = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return repos;
    }

    return repos.filter((r) => r.full_name.toLowerCase().includes(query));
  }, [searchText, repos]);

  const SaveRepoDB = async () => {
    if (!selectedRepo) {
      return;
    }

    const userId = user?.id;
    const res = await axios.post("/api/user-repo", {
      repoId: selectedRepo.id,
      userId: userId,
      name: selectedRepo.name,
      full_name: selectedRepo.full_name,
      private_: selectedRepo.private_,
      html_url: selectedRepo.html_url,
      description: selectedRepo.description,
      updated_at: selectedRepo.updated_at,
      language: selectedRepo.language,
      default_branch: selectedRepo.default_branch,
      owner: selectedRepo.owner,
    });

    console.log(res.data);
    setOpen(false);
    setRefresh(true);
  };

  useEffect(() => {
    GetRepoList();
  }, []);

  return (
    <Dialog open={open} onOpenChange={(v)=>setOpen(v)}>
      <DialogTrigger asChild>
        <Button>+ Add Repo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Repository</DialogTitle>
          <DialogDescription>
            Search and Select one of your Github Repositories
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="Search for a repository"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <ul className="max-h-60 overflow-y-auto border mt-4 rounded-xl">
            {filterRepoList &&
              filterRepoList.map((repo) => (
                <li
                  key={repo.id}
                  className={`p-4 border-b hover:bg-purple-400 cursor-pointer ${selectedRepo?.id == repo?.id ? "bg-purple-600 text-white" : ""} `}
                  onClick={() => setSelectedRepo(repo)}
                >
                  {repo.name}
                </li>
              ))}
          </ul>
        </div>
        <DialogFooter className="flex gap-5">
          <DialogClose>Cancel</DialogClose>
          <Button onClick={() => SaveRepoDB()}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddRepoDialog;
