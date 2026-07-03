import { Repo } from "@/app/workspace/_components/AddRepoDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/ui/StatusCard";
import {
  CheckCircle2,
  ListChecks,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const UserRepoList = ({ repoList }: { repoList: Repo[] }) => {
  
  const [totalTests, setTotalTests] = React.useState<number>(0);
  const [passedTests, setPassedTests] = React.useState<number>(0);
  const [failedTests, setFailedTests] = React.useState<number>(0);
  const [passRate, setPassRate] = React.useState<number>(0);
  
  return (
    <div className="mt-5">
      <h2 className="my-3 font-medium">Your Repositories</h2>
      {repoList.map((repo, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem
            value={`item-${repo.id}`}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatusCard
                    title="Total Tests"
                    value={totalTests}
                    icon={<ListChecks className="h-5 w-5 text-blue-600" />}
                    bgColor="bg-blue-200"
                  />

                  <StatusCard
                    title="Passed"
                    value={passedTests}
                    icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                    bgColor="bg-green-200"
                  />

                  <StatusCard
                    title="Failed"
                    value={failedTests}
                    icon={<XCircle className="h-5 w-5 text-red-600" />}
                    bgColor="bg-red-200"
                  />

                  <StatusCard
                    title="Pass Rate"
                    value={`${passRate}%`}
                    icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                    bgColor="bg-purple-200"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4">
                  <div>
                    <h3 className="font-medium">Generate AI Test Cases</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Analyze this repository and generate automated test cases
                      using AI.
                    </p>
                  </div>

                  <Button className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate Test Cases
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default UserRepoList;
