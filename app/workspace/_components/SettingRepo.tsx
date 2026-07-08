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
import React, { useState, useEffect } from "react";
import { Repo } from "./AddRepoDialog";
import axios from "axios";

const SettingRepo = ({ repo, setReload }: { repo: Repo, setReload: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [repoSettings, setRepoSettings] = useState({
    targetDomain: repo.target_domain || "",
    globalInstruction: repo.global_instruction || "",
  });

  useEffect(() => {
    setRepoSettings({
      targetDomain: repo.target_domain || "",
      globalInstruction: repo.global_instruction || "",
    });
  }, [repo.target_domain, repo.global_instruction]);

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
        <button className="flex items-center gap-2 px-3 py-1.5 rounded glass-button-outline text-on-surface-variant font-label-md text-[12px] uppercase active:scale-95 transition-all hover:text-primary-fixed">
          <Settings2 className="h-4 w-4" /> Global Settings
        </button>
      </DialogTrigger>
      <DialogContent className="glass-panel border-outline-variant/30 text-on-surface">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline-md text-[20px] text-primary-fixed">
            <Settings2 className="h-5 w-5" /> Global Instructions
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant font-body-md text-[14px]">
            Configure global instructions for AI to follow for all test cases in this project.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-4">
            <label className="font-label-md text-[12px] uppercase text-on-surface-variant mb-1 block">App URL</label>
            <Input
              placeholder="https://your-app.com"
              value={repoSettings.targetDomain!}
              onChange={(e) =>
                setRepoSettings({
                  ...repoSettings,
                  targetDomain: e.target.value,
                })
              }
              className="bg-surface-container-lowest border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus-visible:ring-primary-fixed"
            />
          </div>
          <div className="mt-4">
            <label className="font-label-md text-[12px] uppercase text-on-surface-variant mb-1 block">Global Instructions</label>
            <Textarea
              placeholder="E.g. Always login as 'admin' before executing steps. Use data-testid for selectors."
              value={repoSettings.globalInstruction!}
              onChange={(e) =>
                setRepoSettings({
                  ...repoSettings,
                  globalInstruction: e.target.value,
                })
              }
              className="bg-surface-container-lowest border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus-visible:ring-primary-fixed min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <DialogClose asChild>
            <button className="px-4 py-2 rounded text-on-surface-variant font-label-md text-[12px] uppercase hover:bg-surface-variant/30 transition-colors">
              Cancel
            </button>
          </DialogClose>
          <button onClick={() => handleSave()} className="neon-btn px-6 py-2 rounded font-label-md text-[12px] uppercase font-bold">
            Save Settings
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingRepo;
