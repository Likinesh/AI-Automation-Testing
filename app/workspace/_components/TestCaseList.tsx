import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Play,
  RefreshCw,
  RefreshCwIcon,
  Settings,
  SettingsIcon,
} from "lucide-react";
import React, { useState } from "react";

export type TestCase = {
  id: number;
  title: string;
  description: string;
  type: string;
  repoId: number;
  targetFiles: string[];
  expectedResult: string;
  repoName: string;
  repoOwner: string;
  targetRoute: string;
};

const TestCaseList = ({
  testCases,
  onReload,
}: {
  testCases: TestCase[];
  onReload: (repoId: number) => void;
}) => {
  const [selectedTestCase, isSelectedTastCase] = useState<TestCase[]>([]);

  const handleSelected = (check: boolean, testCase: TestCase) => {
    if (check) {
      isSelectedTastCase((prev) => [...prev, testCase]);
    } else {
      isSelectedTastCase((prev) => prev.filter((t) => t.id !== testCase.id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-primary">Generated Test Cases</h2>
        <Button size={"sm"} onClick={() => onReload(testCases[0]?.repoId!)}>
          <RefreshCw className="h-3 w-3 mr-2" />
          Refresh
        </Button>
      </div>
      <div className="border rounded-md mt-2">
        {testCases.map((testCase, index) => (
          <div
            key={index}
            className="p-4 border-b flex items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              <Checkbox
                checked={selectedTestCase.some((t) => t.id === testCase.id)}
                onCheckedChange={(check) =>
                  handleSelected(check! as boolean, testCase)
                }
              />
              <div>
                <h2>{testCase.title}</h2>
                <p className="text-sm text-gray-500"> {testCase.description}</p>
              </div>
            </div>
            <div className="gap-4 flex">
              <Badge variant={"secondary"}>{testCase.type}</Badge>
              <Badge variant={"secondary"}>Pending</Badge>
              <Button size={"icon"} variant={"outline"}>
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-medium">Run Selected Test Case</h2>
          <Button disabled={selectedTestCase.length == 0} className="bg-purple-400 hover:bg-purple-700">
            <Play className="h-4 w-4 mr-2"/>
            Run Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestCaseList;
