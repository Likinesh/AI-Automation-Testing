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
import { Textarea } from "@/components/ui/textarea";
import { SettingsIcon } from "lucide-react";
import React, { useState } from "react";
import { TestCase } from "./TestCaseList";
import { Input } from "@/components/ui/input";
import axios from "axios";

const SettingsDialog = ({
  testcase,
  setReload,
}: {
  testcase: TestCase;
  setReload: () => void;
}) => {
  const [testData, settestData] = useState({
    title: testcase.title || "",
    description: testcase.description || "",
    targetRoute: testcase.targetRoute || "",
    expectedResult: testcase.expectedResult || "",
  });

  const updateCase = async () => {
    const res = await axios.post("/api/testcases/update", {
      title: testData.title,
      description: testData.description,
      targetRoute: testData.targetRoute,
      expectedResult: testData.expectedResult,
      testCaseId: testcase.id,
    });
    setReload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testing Requirements</DialogTitle>
          <DialogDescription>
            Make changes to your testing requirements here. Click Save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md">
          <div className="mb-6">
            <label className="text-sm text-gray-500">Test Title</label>
            <Input
              value={testData.title}
              placeholder="Test Title"
              onChange={(e) =>
                settestData({ ...testData, title: e.target.value })
              }
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-500">Test Description</label>
            <Textarea
              value={testData.description}
              onChange={(e) =>
                settestData({ ...testData, description: e.target.value })
              }
              placeholder="Test Description"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-500">Target Route</label>
            <Input
              value={testData.targetRoute}
              onChange={(e) =>
                settestData({ ...testData, targetRoute: e.target.value })
              }
              placeholder="Target Route"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-500">Expected Result</label>
            <Textarea
              value={testData.expectedResult}
              onChange={(e) =>
                settestData({ ...testData, expectedResult: e.target.value })
              }
              placeholder="Expected Result"
              className="border w-full p-2 rounded-md mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            onClick={() => updateCase()}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Update Test Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
