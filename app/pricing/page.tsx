import Link from "next/link";
import React from "react";
import NavBar from "@/components/NavBar";

export default function PricingPage() {
  return (
    <div className="bg-surface-container-lowest text-on-surface relative min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-primary-fixed/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <NavBar />

      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-16 px-6 sm:px-12 w-full max-w-[1440px] mx-auto text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-primary-fixed/30 w-fit mx-auto mb-8">
          <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shadow-[0_0_8px_#c3f400]"></span>
          <span className="font-label-md text-[12px] text-primary-fixed font-semibold tracking-wide">PRICING</span>
        </div>
        
        <h1 className="font-headline-xl text-[48px] md:text-[64px] font-bold tracking-tighter text-on-surface mb-6">
          Coming Soon
        </h1>
        
        <p className="font-body-lg text-[18px] text-on-surface-variant max-w-lg mx-auto mb-12">
          We are currently polishing our enterprise tier and finalizing our pricing structure. Stay tuned for updates!
        </p>

        <div className="glass-panel p-8 rounded-xl max-w-md w-full border border-outline-variant/20 flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50 mb-4">mail</span>
          <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-2">Join the Waitlist</h3>
          <p className="font-body-md text-[14px] text-on-surface-variant mb-6 text-center">
            Get notified as soon as our premium features go live.
          </p>
          <div className="flex w-full gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-surface-container-highest border border-outline-variant/30 rounded px-4 py-2 font-body-md text-[14px] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-fixed/50 transition-colors"
            />
            <button className="neon-btn font-label-md text-[12px] uppercase rounded px-6 py-2 font-bold shrink-0">
              Notify Me
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
