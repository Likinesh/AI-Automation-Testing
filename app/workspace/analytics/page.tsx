import React from "react";

export default function AnalyticsPage() {
  return (
    <main className="flex-1 p-lg overflow-y-auto h-[calc(100vh-64px)] w-full flex items-center justify-center">
      <div className="glass-panel p-xl rounded-xl max-w-md w-full border border-outline-variant/30 text-center relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-fixed/10 blur-[30px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-surface-variant/50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[32px] text-primary-fixed">insights</span>
          </div>
          <h2 className="font-headline-lg text-[24px] text-on-surface mb-2">Analytics Dashboard</h2>
          <p className="font-body-md text-[14px] text-on-surface-variant mb-6">
            We are building comprehensive test execution metrics, flaky test detection, and coverage reports. 
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shadow-[0_0_8px_#c3f400]"></span>
            <span className="font-label-md text-[12px] text-primary-fixed font-semibold tracking-wide">COMING SOON</span>
          </div>
        </div>
      </div>
    </main>
  );
}
