"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GlobalSettingsPage() {
  const [instruction, setInstruction] = useState("");

  const handleSave = () => {
    // Save to user profile/db logic here (to be implemented)
    console.log("Saving global instruction:", instruction);
    alert("Global Instruction saved! This will apply to all new test cases.");
  };

  return (
    <main className="flex-1 p-lg overflow-y-auto h-[calc(100vh-64px)] w-full">
      <div className="glass-panel p-md rounded-xl max-w-4xl mx-auto border border-outline-variant/30">
        <h2 className="font-headline-lg text-[24px] text-on-surface mb-2">Global Settings</h2>
        <p className="font-body-md text-on-surface-variant mb-8">
          Configure instructions that will apply across all repositories and test suites.
        </p>

        <div className="space-y-4">
          <div>
            <label className="font-label-md text-[12px] uppercase text-on-surface-variant block mb-2">
              Common Global Instructions for AI
            </label>
            <Textarea
              placeholder="E.g. Always use data-testid selectors if available. Ensure tests clean up state after running..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="bg-surface-container-lowest border-outline-variant/30 text-on-surface min-h-[200px]"
            />
            <p className="font-body-sm text-[12px] text-on-surface-variant mt-2">
              These instructions will be appended to the context whenever the AI generates or heals tests.
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="neon-btn font-label-md text-[12px] uppercase rounded px-6 py-2 font-bold"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
