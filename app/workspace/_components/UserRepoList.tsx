import { Repo } from "@/app/workspace/_components/AddRepoDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/ui/StatusCard";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import {
  CheckCircle2,
  Globe2Icon,
  Link2Icon,
  ListChecks,
  Loader2,
  Settings2,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import TestCaseList, { TestCase } from "./TestCaseList";
import SettingRepo from "./SettingRepo";

type StatusData = {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  passRate: number;
};

const UserRepoList = ({ repoList, setReload }: { repoList: Repo[], setReload:() => void }) => {
  const [statusData, setStatusData] = useState<StatusData>({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    passRate: 0,
  });

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [testCaseLoading, setTestCaseLoading] = useState<boolean>(false);

  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const { user } = useContext(UserContext);

  const handleGenerateTestCases = async (repo: any) => {
    try {
      setTestCaseLoading(true);
      const res = await axios.post("/api/generate-tc", {
        userId: user?.id,
        repoId: repo?.repoId,
        owner: repo.owner,
        repo: repo.name,
        branch: repo.default_branch,
      });
      const { testCases } = res.data;
      setTestCases(testCases);
      console.log(testCases);
    } catch (error: any) {
      console.log(error);
    } finally {
      setTestCaseLoading(false);
    }
  };

  const GetTestCases = async (repoId: number ) => {
    try {
      setisLoading(true);
      setTestCases([]);
      const res = await axios.get(`/api/testcases?repoId=${repoId}`);

      const total = res.data.length;
      const passed = res.data.filter((t: any) => t.status === "passed").length;
      const failed = res.data.filter((t: any) => t.status === "failed").length;
      const passRate = total == 0 ? 0 : (passed / total) * 100;

      setStatusData({
        totalTests: total,
        passedTests: passed,
        failedTests: failed,
        passRate: passRate,
      });

      setTestCases(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="my-3 font-medium">Your Repositories</h2>
      <Accordion
        type="single"
        collapsible
        onValueChange={(val) => GetTestCases(Number(val))}
      >
        {repoList.map((repo, index) => (
          <AccordionItem
            key={repo.repoId!}
            value={repo.repoId!.toString()}
            className="border px-5 rounded-xl mt-3"
          >
            <AccordionTrigger>
              <div className="flex items-center gap-5">
                <Image
                  src={"/github.png"}
                  alt="Github"
                  width={30}
                  height={30}
                />
                <div className="flex flex-col items-start gap-1">
                  <h2>{repo.name}</h2>
                  <p className="text-xs font-gray-500">
                    {repo.default_branch} * {repo.language}
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="pt-4 space-y-5">
                <div className="p-3 border rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link2Icon className="h-5 w-5" />
                    <h2 className="font-semibold text-sm"> Target Domain: </h2>
                    <h2 className="font-light text-sm">
                      {" "}
                      {repo?.target_domain || "Not Available"}
                    </h2>
                  </div>
                  <SettingRepo repo={repo} setReload={setReload} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatusCard
                    title="Total Tests"
                    value={statusData?.totalTests}
                    icon={<ListChecks className="h-5 w-5 text-blue-600" />}
                    bgColor="bg-blue-200"
                  />

                  <StatusCard
                    title="Passed"
                    value={statusData?.passedTests}
                    icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                    bgColor="bg-green-200"
                  />

                  <StatusCard
                    title="Failed"
                    value={statusData?.failedTests}
                    icon={<XCircle className="h-5 w-5 text-red-600" />}
                    bgColor="bg-red-200"
                  />

                  <StatusCard
                    title="Pass Rate"
                    value={`${statusData?.passRate}%`}
                    icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                    bgColor="bg-purple-200"
                  />
                </div>

                {!testCaseLoading && testCases.length > 0 && (
                  <TestCaseList
                    testCases={testCases}
                    onReload={(repoId) => GetTestCases(repoId)}
                    repository={repo}
                  />
                )}

                {testCaseLoading ? (
                  <div className="flex items-center gap-4">
                    <Loader2 className="animate-spin" />{" "}
                    <p className="text-sm text-gray-500">
                      {" "}
                      Generating Test Cases...
                    </p>
                  </div>
                ) : (
                  testCases.length === 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4">
                      <div>
                        <h3 className="font-medium">Generate AI Test Cases</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Analyze this repository and generate automated test
                          cases using AI.
                        </p>
                      </div>

                      <Button
                        className="gap-2"
                        disabled={isLoading}
                        onClick={() => handleGenerateTestCases(repo)}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate Test Cases
                      </Button>
                    </div>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default UserRepoList;
