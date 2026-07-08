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
      <Accordion
        type="single"
        collapsible
        onValueChange={(val) => GetTestCases(Number(val))}
      >
        {repoList.map((repo, index) => (
          <AccordionItem
            key={repo.repoId!}
            value={repo.repoId!.toString()}
            className="glass-panel border-outline-variant/30 px-5 rounded-xl mt-3 mb-2"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-5">
                <Image
                  src={"/github.png"}
                  alt="Github"
                  width={30}
                  height={30}
                  className="rounded-full invert opacity-80"
                />
                <div className="flex flex-col items-start gap-1">
                  <h2 className="font-headline-md text-[18px] text-on-surface">{repo.name}</h2>
                  <p className="font-label-md text-[12px] text-on-surface-variant/70 uppercase">
                    {repo.default_branch} • {repo.language}
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="pt-2 pb-6 space-y-6">
                <div className="p-4 bg-surface-container-highest/30 border border-outline-variant/20 rounded-xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Link2Icon className="h-4 w-4" />
                    <span className="font-label-md text-[12px] uppercase tracking-wider">Target Domain:</span>
                    <span className="font-code-sm text-[13px] text-primary-fixed bg-primary-fixed/10 px-2 py-0.5 rounded">
                      {repo?.target_domain || "Not Configured"}
                    </span>
                  </div>
                  <SettingRepo repo={repo} setReload={setReload} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-panel border-outline-variant/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-surface-variant/50 flex items-center justify-center">
                      <ListChecks className="h-5 w-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="font-label-md text-[12px] uppercase text-on-surface-variant">Total Tests</p>
                      <p className="font-headline-md text-[24px] text-on-surface">{statusData?.totalTests}</p>
                    </div>
                  </div>

                  <div className="glass-panel border-outline-variant/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-primary-fixed/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary-fixed" />
                    </div>
                    <div>
                      <p className="font-label-md text-[12px] uppercase text-on-surface-variant">Passed</p>
                      <p className="font-headline-md text-[24px] text-on-surface">{statusData?.passedTests}</p>
                    </div>
                  </div>

                  <div className="glass-panel border-outline-variant/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-error/10 flex items-center justify-center">
                      <XCircle className="h-5 w-5 text-error" />
                    </div>
                    <div>
                      <p className="font-label-md text-[12px] uppercase text-on-surface-variant">Failed</p>
                      <p className="font-headline-md text-[24px] text-on-surface">{statusData?.failedTests}</p>
                    </div>
                  </div>

                  <div className="glass-panel border-outline-variant/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-surface-variant/50 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="font-label-md text-[12px] uppercase text-on-surface-variant">Pass Rate</p>
                      <p className="font-headline-md text-[24px] text-on-surface">{Math.round(statusData?.passRate)}%</p>
                    </div>
                  </div>
                </div>

                {!testCaseLoading && testCases.length > 0 && (
                  <TestCaseList
                    testCases={testCases}
                    onReload={(repoId) => GetTestCases(repoId)}
                    repository={repo}
                  />
                )}

                {testCaseLoading ? (
                  <div className="flex items-center justify-center gap-4 py-8">
                    <Loader2 className="animate-spin text-primary-fixed w-6 h-6" />
                    <p className="font-code-sm text-[13px] text-on-surface-variant">
                      Analyzing Repository & Generating AI Test Cases...
                    </p>
                  </div>
                ) : (
                  testCases.length === 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-primary-fixed/30 bg-primary-fixed/5 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-fixed/10 blur-[30px] rounded-full pointer-events-none"></div>
                      <div className="relative z-10">
                        <h3 className="font-headline-md text-[18px] text-on-surface">Generate AI Test Suites</h3>
                        <p className="font-body-md text-[14px] text-on-surface-variant mt-1 max-w-md">
                          Let AutoPilot analyze your codebase structure and automatically generate robust E2E test scenarios.
                        </p>
                      </div>

                      <button
                        className="neon-btn gap-2 px-6 py-3 rounded font-label-md text-[12px] uppercase font-bold flex items-center relative z-10"
                        disabled={isLoading}
                        onClick={() => handleGenerateTestCases(repo)}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate Now
                      </button>
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
