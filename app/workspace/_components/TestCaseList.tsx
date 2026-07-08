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
import SettingsDialog from "./SettingsDialog";
import TestExecutionModal from "./textExecution";

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
  status?: string;
  browserbaseScript?: string;
};

const TestCaseList = ({
  testCases,
  onReload,
  repository,
}: {
  testCases: TestCase[];
  onReload: (repoId: number) => void;
  repository?: any;
}) => {
  const [selectedTestCase, isSelectedTastCase] = useState<TestCase[]>([]);
  const [isExecutionModalOpen, setIsExecutionModalOpen] = useState(false);

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
              <Badge variant={"secondary"}>{testCase?.type}</Badge>
              { testCase?.status === "failed" &&<Badge variant={"destructive"} className="text-red-200 font-normal bg-red-700">{testCase?.status}</Badge>}
              { testCase?.status === "passed" &&<Badge variant={"default"} className="text-green-200 font-normal bg-green-700">{testCase?.status}</Badge>}
              { testCase?.status === "running" &&<Badge variant={"secondary"} className="text-yellow-200 font-normal bg-yellow-700">{testCase?.status}</Badge>}
              <SettingsDialog testcase={testCase} setReload={() => onReload(testCase.repoId)}/>
            </div>
          </div>
        ))}
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-medium">Run Selected Test Case</h2>
          <Button disabled={selectedTestCase.length == 0} onClick={() => setIsExecutionModalOpen(true)} className="bg-purple-400 hover:bg-purple-700">
            <Play className="h-4 w-4 mr-2"/>
            Run Selected
          </Button>
        </div>
      </div>
      
      {isExecutionModalOpen && (
        <TestExecutionModal
          isOpen={isExecutionModalOpen}
          onClose={() => setIsExecutionModalOpen(false)}
          testCases={selectedTestCase}
          repository={repository}
        />
      )}
    </div>
  );
};

export default TestCaseList;
