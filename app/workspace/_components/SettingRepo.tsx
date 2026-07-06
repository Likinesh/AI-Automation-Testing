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
import { Textarea } from "@/components/ui/textarea";
import { Settings2 } from "lucide-react";
import React, { useState } from "react";
import { Repo } from "./AddRepoDialog";
import axios from "axios";

const SettingRepo = ({ repo, setReload }: { repo: Repo, setReload: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [repoSettings, setRepoSettings] = useState({
    targetDomain: repo.target_domain || "",
    globalInstruction: repo.global_instruction || "",
  });

  const handleSave = async () => {
    try {
        const res = await axios.post("/api/testcases/setting-update", {
            repoId: repo.repoId,
            targetDomain: repoSettings.targetDomain,
            globalInstruction: repoSettings.globalInstruction,
        })
        if(res.data){
          setIsOpen(false);
          setReload();
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="">
          <Settings2 className="h-4 w-4 mr-1" /> Project Config
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 mr-1" /> Project Repo Settings
          </DialogTitle>
          <DialogDescription>
            Configure your project repo settings here.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-4">
            <label>App URL</label>
            <Input
              placeholder="App URL"
              value={repoSettings.targetDomain!}
              onChange={(e) =>
                setRepoSettings({
                  ...repoSettings,
                  targetDomain: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>
          <div className="mt-4">
            <label>Test Instructions</label>
            <Textarea
              placeholder="Add instructions for AI Agents to generate test cases"
              value={repoSettings.globalInstruction!}
              onChange={(e) =>
                setRepoSettings({
                  ...repoSettings,
                  globalInstruction: e.target.value,
                })
              }
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter className="space-y-1">
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"default"} onClick={() => handleSave()}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingRepo;
