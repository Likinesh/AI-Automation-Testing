"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Play,
    CheckCircle2,
    XCircle,
    Loader2,
    Terminal,
    ExternalLink,
    Globe,
    Code,
    RefreshCw,
    PlayCircle,
    ChevronRight,
    Sparkles,
    Database,
    SlidersHorizontal,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import axios from "axios";
import { TestCase } from "./TestCaseList";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    testCases: TestCase[];
    repository: any; // Connected repository config
};

type RunResult = {
    testCaseId: number;
    status: "idle" | "generating" | "running" | "passed" | "failed";
    logs: string[];
    error?: string;
    sessionId?: string;
    sessionUrl?: string;
    browserbaseScript?: string;
};

export default function TestExecutionModal({ isOpen, onClose, testCases, repository }: Props) {
    const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
    const [currentIdx, setCurrentIdx] = useState<number>(-1);
    const [isExecuting, setIsExecuting] = useState(false);
    const [results, setResults] = useState<Record<number, RunResult>>({});
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);

    // Advanced Options states
    const [executionMode, setExecutionMode] = useState<"cache" | "generate">("cache");
    const [customPrompt, setCustomPrompt] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    // Initialize states when testCases change or modal opens
    useEffect(() => {
        if (isOpen && testCases.length > 0) {
            const initial: Record<number, RunResult> = {};
            testCases.forEach((tc) => {
                const tcStatus = (tc as any).status;
                const tcLogs = (tc as any).logs;
                const hasPreviousLogs = Array.isArray(tcLogs) && tcLogs.length > 0;

                initial[tc.id] = {
                    testCaseId: tc.id,
                    status: (tcStatus === "passed" || tcStatus === "failed") ? tcStatus : "idle",
                    logs: hasPreviousLogs ? tcLogs : ["Waiting to run..."],
                    browserbaseScript: tc.browserbaseScript || undefined,
                    sessionId: (tc as any).sessionId || (tc as any).session_id || undefined,
                    sessionUrl: (tc as any).sessionUrl || (tc as any).session_url || undefined,
                };
            });
            setResults(initial);
            setSelectedDetailId(testCases[0].id);
            setCurrentIdx(-1);
            setIsExecuting(false);
            setCustomPrompt("");
            
            // Prefill with repository's saved website URL if available
            setBaseUrl(repository?.targetDomain || repository?.websiteUrl || "http://localhost:3000");

            // Auto-detect if any selected testcase doesn't have a cached script. 
            // If even one doesn't have a script, default to "generate" mode.
            const hasMissingScript = testCases.some(tc => !tc.browserbaseScript);
            setExecutionMode(hasMissingScript ? "generate" : "cache");
        }
    }, [isOpen, testCases, repository]);

    // Handle executing the queue sequentially
    useEffect(() => {
        if (!isExecuting || currentIdx < 0 || currentIdx >= testCases.length) {
            if (currentIdx >= testCases.length) {
                setIsExecuting(false);
            }
            return;
        }

        const runTest = async () => {
            const currentTestCase = testCases[currentIdx];
            const tcId = currentTestCase.id;

            setSelectedDetailId(tcId);
            
            const isRegenerating = executionMode === "generate" || !results[tcId]?.browserbaseScript;

            setResults((prev) => ({
                ...prev,
                [tcId]: {
                    ...prev[tcId],
                    status: isRegenerating ? "generating" : "running",
                    logs: [
                        isRegenerating 
                            ? "[SYSTEM] Connecting to AI agent to analyze files and generate script..."
                            : "[SYSTEM] Found pre-generated script cached in database, preparing execution..."
                    ],
                },
            }));

            try {
                // Call run API with advanced flags
                const res = await axios.post("/api/testcases/run", {
                    testCaseId: tcId,
                    baseUrl: baseUrl.trim(),
                    mode: executionMode, // "cache" (direct run) or "generate" (regenerate)
                    customPrompt: customPrompt.trim(),
                });

                const data = res.data;

                setResults((prev) => ({
                    ...prev,
                    [tcId]: {
                        testCaseId: tcId,
                        status: data.status,
                        logs: data.logs || [],
                        browserbaseScript: data.browserbaseScript,
                        sessionId: data.sessionId,
                        sessionUrl: data.sessionUrl,
                        error: data.error,
                    },
                }));
            } catch (err: any) {
                const errMsg = err.response?.data?.error || err.message || "Execution failed";
                setResults((prev) => ({
                    ...prev,
                    [tcId]: {
                        ...prev[tcId],
                        status: "failed",
                        error: errMsg,
                        logs: [...(prev[tcId]?.logs || []), `[SYSTEM ERROR] ${errMsg}`],
                    },
                }));
            }

            // Move to next item in the queue
            setCurrentIdx((prev) => prev + 1);
        };

        runTest();
    }, [isExecuting, currentIdx, testCases, baseUrl, executionMode]);

    const startExecution = () => {
        // Reset all statuses
        const resetResults: Record<number, RunResult> = {};
        testCases.forEach((tc) => {
            resetResults[tc.id] = {
                testCaseId: tc.id,
                status: "idle",
                logs: ["Queued..."],
                browserbaseScript: tc.browserbaseScript || undefined,
            };
        });
        setResults(resetResults);
        setIsExecuting(true);
        setCurrentIdx(0);
        setSelectedDetailId(testCases[0].id);
    };

    const stopExecution = () => {
        setIsExecuting(false);
        setCurrentIdx(-1);
    };

    const currentSelectedResult = selectedDetailId ? results[selectedDetailId] : null;
    const currentSelectedTestCase = testCases.find((tc) => tc.id === selectedDetailId);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-6 gap-4 bg-surface-container-lowest/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden select-none">
                <DialogHeader className="border-b border-outline-variant/30 pb-4 flex flex-row items-center justify-between shrink-0">
                    <div>
                        <DialogTitle className="font-headline-md text-[24px] font-bold text-on-surface flex items-center gap-2 tracking-tight">
                            <PlayCircle className="text-primary-fixed h-6 w-6" style={{ fontVariationSettings: "'FILL' 1" }} />
                            Browserbase Cloud Test Runner
                        </DialogTitle>
                        <DialogDescription className="font-body-md text-on-surface-variant mt-1">
                            Run automation scripts completely in the cloud using Browserbase headless infrastructure.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Target Configuration Header */}
                <div className="flex flex-col glass-panel p-4 rounded-xl border border-outline-variant/20 gap-3 shrink-0">
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-1.5">
                            <label className="font-label-md text-[12px] uppercase tracking-wider flex items-center gap-1.5 text-on-surface-variant">
                                <Globe className="h-3.5 w-3.5 text-primary-fixed" /> Target Website URL
                            </label>
                            <Input
                                placeholder="e.g. http://localhost:3000"
                                value={baseUrl}
                                onChange={(e) => setBaseUrl(e.target.value)}
                                disabled={isExecuting}
                                className="bg-surface-container-highest/50 border-outline-variant/30 font-code-sm text-[13px] text-on-surface focus-visible:ring-1 focus-visible:ring-primary-fixed h-10"
                            />
                        </div>
                        <div className="flex gap-2.5">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowOptions(!showOptions)}
                                className={`h-10 px-4 font-label-md font-bold text-[12px] gap-1.5 transition-colors border-outline-variant/30 hover:border-primary-fixed/50 hover:text-primary-fixed ${showOptions ? "bg-primary-fixed/10 text-primary-fixed border-primary-fixed/50" : "bg-surface-container-lowest text-on-surface-variant"}`}
                            >
                                <SlidersHorizontal className="h-4 w-4" /> 
                                Execution Options
                                {showOptions ? <ChevronUp className="h-3 w-3 ml-0.5" /> : <ChevronDown className="h-3 w-3 ml-0.5" />}
                            </Button>
                            {!isExecuting ? (
                                <Button
                                    onClick={startExecution}
                                    className="neon-btn h-10 font-label-md font-bold px-6 gap-2 text-[12px] uppercase tracking-wide"
                                >
                                    <Play className="h-4 w-4 fill-on-primary-fixed" /> Start Execution
                                </Button>
                            ) : (
                                <Button
                                    onClick={stopExecution}
                                    variant="destructive"
                                    className="h-10 px-6 font-label-md font-bold gap-2 text-[12px] uppercase bg-error text-on-error hover:bg-error/90"
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" /> Stop Runner
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Expandable Advanced Options Section */}
                    {showOptions && (
                        <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Execution Mode Segment */}
                            <div className="md:col-span-1 space-y-1.5">
                                <span className="font-label-md text-[12px] uppercase tracking-wider text-on-surface-variant">Run Mode</span>
                                <div className="grid grid-cols-2 bg-surface-container-highest/30 p-1 rounded-lg border border-outline-variant/20">
                                    <button
                                        type="button"
                                        disabled={isExecuting}
                                        onClick={() => setExecutionMode("cache")}
                                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md font-label-md text-[12px] font-bold transition-all ${
                                            executionMode === "cache" 
                                                ? "bg-surface-container-lowest text-on-surface shadow-[0_0_8px_rgba(195,244,0,0.15)] ring-1 ring-primary-fixed/30" 
                                                : "text-on-surface-variant hover:text-on-surface"
                                        } disabled:opacity-50`}
                                    >
                                        <Database className="h-3.5 w-3.5" /> Run Cached
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isExecuting}
                                        onClick={() => setExecutionMode("generate")}
                                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md font-label-md text-[12px] font-bold transition-all ${
                                            executionMode === "generate" 
                                                ? "bg-surface-container-lowest text-on-surface shadow-[0_0_8px_rgba(195,244,0,0.15)] ring-1 ring-primary-fixed/30" 
                                                : "text-on-surface-variant hover:text-on-surface"
                                        } disabled:opacity-50`}
                                    >
                                        <Sparkles className={`h-3.5 w-3.5 ${executionMode === "generate" ? "text-primary-fixed" : ""}`} /> AI Regenerate
                                    </button>
                                </div>
                            </div>

                            {/* Temporary Prompt/Instruction Override Textarea */}
                            <div className="md:col-span-2 space-y-1.5">
                                <span className="font-label-md text-[12px] uppercase tracking-wider text-on-surface-variant">
                                    Custom Run Instructions (Merged with Global Settings)
                                </span>
                                <textarea
                                    placeholder="e.g. Make sure to click the profile dropdown before asserting, or wait 1s after clicks..."
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    disabled={isExecuting || executionMode === "cache"}
                                    rows={1.5}
                                    className="w-full rounded-md border border-outline-variant/30 px-3 py-1.5 font-code-sm text-[13px] bg-surface-container-highest/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed disabled:opacity-50 disabled:bg-surface-container-lowest shadow-xs resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Dashboard Panel */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
                    {/* Left: Test Cases Queue List */}
                    <div className="md:col-span-1 border border-outline-variant/20 rounded-xl overflow-y-auto bg-surface-container-highest/20 p-3 flex flex-col gap-2 shadow-inner">
                        <h3 className="font-label-md text-[12px] font-bold text-on-surface-variant uppercase tracking-wider px-2 mb-1">
                            Execution Queue
                        </h3>
                        {testCases.map((tc, index) => {
                            const res = results[tc.id];
                            const isActive = selectedDetailId === tc.id;
                            const isRunning = currentIdx === index && isExecuting;

                            return (
                                <div
                                    key={tc.id}
                                    onClick={() => setSelectedDetailId(tc.id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                        isActive
                                            ? "bg-surface-container-lowest border-primary-fixed shadow-[0_0_8px_rgba(195,244,0,0.2)]"
                                            : "glass-panel border-outline-variant/30 hover:border-primary-fixed/40 shadow-none"
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <h4 className="font-headline-sm text-[14px] font-bold text-on-surface line-clamp-1">
                                            {tc.title}
                                        </h4>
                                        <ChevronRight className={`h-4 w-4 text-on-surface-variant transition-transform ${isActive ? "rotate-90 text-primary-fixed" : ""}`} />
                                    </div>
                                    <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 mb-2.5">
                                        {tc.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Badge variant="outline" className="text-[10px] font-code-sm capitalize border-outline-variant/30 text-on-surface-variant">
                                            {tc.type}
                                        </Badge>
                                        <StatusBadge status={res?.status || "idle"} isRunning={isRunning} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Code, Live Logs & Details Panel */}
                    <div className="md:col-span-2 border border-outline-variant/20 rounded-xl flex flex-col bg-surface-container-lowest overflow-hidden shadow-sm">
                        {currentSelectedTestCase ? (
                            <div className="flex-1 flex flex-col overflow-hidden">
                                {/* Header Info */}
                                <div className="p-4 border-b border-outline-variant/20 bg-surface-container-highest/20 flex justify-between items-start gap-4 shrink-0">
                                    <div>
                                        <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">
                                            {currentSelectedTestCase.title}
                                        </h3>
                                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                                            Expected: {currentSelectedTestCase.expectedResult}
                                        </p>
                                    </div>
                                    {currentSelectedResult?.sessionUrl && (
                                        <Button
                                            onClick={() => window.open(currentSelectedResult.sessionUrl, "_blank")}
                                            variant="outline"
                                            size="sm"
                                            className="font-label-md font-bold text-[12px] gap-1.5 border-primary-fixed/40 text-primary-fixed hover:bg-primary-fixed/10 hover:border-primary-fixed shadow-xs shrink-0 bg-transparent"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" /> Watch Recording
                                        </Button>
                                    )}
                                </div>

                                {/* Body split: Code Accordion + Terminal */}
                                <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
                                    {/* Playwright Script Code Block */}
                                    {currentSelectedResult?.browserbaseScript && (
                                        <div className="rounded-lg border border-outline-variant/20 overflow-hidden">
                                            <div className="bg-surface-container-high px-3.5 py-2 border-b border-outline-variant/20 flex items-center justify-between">
                                                <span className="font-label-md text-[12px] font-bold text-on-surface-variant flex items-center gap-1.5 uppercase">
                                                    <Code className="h-3.5 w-3.5 text-primary-fixed" /> Generated Playwright Code
                                                </span>
                                            </div>
                                            <pre className="p-3 bg-surface text-primary-fixed font-code-sm text-[12px] leading-relaxed overflow-x-auto max-h-36 selection:bg-primary-fixed selection:text-on-primary-fixed">
                                                {currentSelectedResult.browserbaseScript}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Terminal logs panel */}
                                    <div className="flex-1 flex flex-col rounded-lg border border-outline-variant/20 overflow-hidden min-h-48">
                                        <div className="bg-surface px-3.5 py-2.5 border-b border-outline-variant/20 flex items-center justify-between shrink-0">
                                            <span className="font-code-sm font-bold text-[12px] flex items-center gap-1.5 text-primary-fixed">
                                                <Terminal className="h-3.5 w-3.5" /> Console Terminal Output
                                            </span>
                                            <Badge variant="secondary" className="bg-surface-container-highest text-on-surface-variant border-none font-code-sm text-[10px] uppercase">
                                                {currentSelectedResult?.status || "idle"}
                                            </Badge>
                                        </div>
                                        <div className="flex-1 p-3 bg-surface font-code-sm text-[13px] text-on-surface-variant overflow-y-auto flex flex-col gap-1.5 select-text selection:bg-primary-fixed selection:text-on-primary-fixed">
                                            {currentSelectedResult?.logs.map((log, lIdx) => (
                                                <div key={lIdx} className="leading-relaxed whitespace-pre-wrap">
                                                    {log.startsWith("[SYSTEM]") ? (
                                                        <span className="text-secondary-fixed">{log}</span>
                                                    ) : log.startsWith("[SYSTEM ERROR]") ? (
                                                        <span className="text-error font-semibold">{log}</span>
                                                    ) : log.startsWith("[BROWSER]") ? (
                                                        <span className="text-tertiary-fixed">{log}</span>
                                                    ) : (
                                                        <span>{log}</span>
                                                    )}
                                                </div>
                                            ))}
                                            {currentSelectedResult?.error && (
                                                <div className="text-error font-bold mt-2 pt-2 border-t border-outline-variant/20">
                                                    Error: {currentSelectedResult.error}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface-container-highest/10">
                                <Terminal className="h-12 w-12 text-on-surface-variant/50 mb-3" />
                                <h3 className="font-headline-md text-[20px] font-bold text-on-surface">No Test Case Selected</h3>
                                <p className="font-body-md text-[14px] text-on-surface-variant mt-1 max-w-sm">
                                    Choose any test case from the queue to inspect its console logs and code.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-outline-variant/30 pt-4 flex justify-end gap-3 shrink-0">
                    <Button variant="outline" onClick={onClose} disabled={isExecuting} className="glass-button-outline h-10 font-label-md font-bold text-[12px] uppercase px-5 hover:text-primary-fixed">
                        Close & Refresh Status
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function StatusBadge({
    status,
    isRunning,
}: {
    status: RunResult["status"];
    isRunning: boolean;
}) {
    if (isRunning) {
        return (
            <Badge className="bg-primary-fixed/20 text-primary-fixed hover:bg-primary-fixed/30 border border-primary-fixed/30 flex gap-1 items-center font-code-sm text-[10px]">
                <Loader2 className="h-3 w-3 animate-spin" /> Running
            </Badge>
        );
    }

    switch (status) {
        case "generating":
            return (
                <Badge className="bg-secondary-fixed/20 text-secondary-fixed hover:bg-secondary-fixed/30 border border-secondary-fixed/30 flex gap-1 items-center font-code-sm text-[10px]">
                    <Loader2 className="h-3 w-3 animate-spin" /> Generating
                </Badge>
            );
        case "passed":
            return (
                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 flex gap-1 items-center font-code-sm text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> Passed
                </Badge>
            );
        case "failed":
            return (
                <Badge className="bg-error/20 text-error hover:bg-error/30 border border-error/30 flex gap-1 items-center font-code-sm text-[10px]">
                    <XCircle className="h-3 w-3" /> Failed
                </Badge>
            );
        case "idle":
        default:
            return (
                <Badge variant="outline" className="text-on-surface-variant border-outline-variant/30 font-code-sm text-[10px]">
                    Queued
                </Badge>
            );
    }
}