"use client";
import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="bg-surface-container-lowest text-on-surface relative min-h-screen flex flex-col font-body-md overflow-x-hidden">
      {/* Ambient Backgrounds */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>

      {/* TopNavBar */}
      <nav className="bg-surface-glass w-full top-0 sticky z-50 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-[1440px] mx-auto z-50">
          {/* Brand */}
          <div className="font-headline-md text-[20px] font-bold tracking-tighter text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
              terminal
            </span>
            AUTOPILOT
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary-fixed font-bold border-b-2 border-primary-fixed pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase" href="#">
              Platform
            </a>
            <a className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase" href="#">
              Features
            </a>
            <a className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase" href="#">
              Integrations
            </a>
            <a className="text-on-surface-variant font-medium pb-1 hover:text-primary-fixed transition-colors duration-300 font-label-md text-[12px] uppercase" href="#">
              Pricing
            </a>
          </div>
          {/* Trailing Action */}
          <div className="flex items-center gap-4">
            <UserButton />
            <Link href="/workspace">
              <button className="neon-btn font-label-md text-[12px] uppercase rounded px-4 py-2 scale-95 active:scale-90 transition-transform font-bold">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16 px-6 sm:px-12 w-full max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 mb-32 relative z-10">
          {/* Hero Copy */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-primary-fixed/30 w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shadow-[0_0_8px_#c3f400]"></span>
              <span className="font-label-md text-[12px] text-primary-fixed font-semibold tracking-wide">V2.0 NOW LIVE</span>
            </div>
            <h1 className="font-headline-xl text-[40px] md:text-[56px] md:leading-[64px] font-bold tracking-tighter text-on-surface">
              AI Auto-Healing<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed to-primary-fixed-dim">
                Test Automation
              </span>
            </h1>
            <p className="font-body-lg text-[16px] text-on-surface-variant max-w-2xl mx-auto lg:mx-0">
              Ship with confidence. AutoPilot detects UI changes and heals your Playwright tests in real-time, completely eliminating test flakiness.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
              <Link href="/workspace">
                <button className="neon-btn font-label-md text-[12px] uppercase rounded px-8 py-4 font-bold flex items-center gap-2 w-full sm:w-auto justify-center">
                  Start Free Trial
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <button className="glass-button-outline font-label-md text-[12px] uppercase rounded px-8 py-4 font-bold text-on-surface w-full sm:w-auto justify-center">
                Book a Demo
              </button>
            </div>
          </div>
          
          {/* Hero Visual (3D Mockup) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl xl:max-w-2xl tilt-container relative">
            {/* Decorative glow behind card */}
            <div className="absolute inset-0 bg-primary-fixed/20 blur-[100px] rounded-full z-0"></div>
            {/* The mock dashboard */}
            <div className="tilt-card glass-panel rounded-xl overflow-hidden border border-outline-variant/30 relative z-10 h-[400px] w-full">
              {/* Terminal Header */}
              <div className="bg-terminal-glass backdrop-blur-[24px] border-b border-outline-variant/20 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                </div>
                <div className="font-code-sm text-[13px] text-on-surface-variant">autopilot_dashboard.sh</div>
                <div className="w-6"></div> {/* Spacer for center alignment */}
              </div>
              {/* Terminal Body Content (Mock) */}
              <div className="p-6 font-code-sm text-[13px] text-on-surface flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 glass-panel rounded border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Checkout_Flow_E2E.spec.ts</span>
                  </div>
                  <span className="font-label-md text-[12px] bg-primary-fixed/10 text-primary-fixed px-2 py-1 rounded">PASS</span>
                </div>
                <div className="flex flex-col p-3 glass-panel rounded border border-primary-fixed/30 bg-primary-fixed/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary-fixed animate-pulse">healing</span>
                      <span>User_Login_Flow.spec.ts</span>
                    </div>
                    <span className="font-label-md text-[12px] bg-primary-fixed/20 text-primary-fixed px-2 py-1 rounded flex items-center gap-1 shadow-[0_0_8px_rgba(195,244,0,0.5)]">
                      <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                      HEALING
                    </span>
                  </div>
                  <div className="text-on-surface-variant pl-8 text-[11px]">
                    &gt; Old selector '[data-testid="btn-submit"]' failed.<br />
                    &gt; Generating new selector via DOM diff...<br />
                    <span className="text-primary-fixed">&gt; Found robust match: 'button:has-text("Sign In")'</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 glass-panel rounded border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Profile_Settings.spec.ts</span>
                  </div>
                  <span className="font-label-md text-[12px] bg-primary-fixed/10 text-primary-fixed px-2 py-1 rounded">PASS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Marquee */}
        <section className="w-full mb-32 flex flex-col items-center opacity-80">
          <h3 className="font-label-md text-[12px] text-on-surface-variant uppercase tracking-widest mb-8">
            Seamlessly Integrated with your Stack
          </h3>
          <div className="marquee-container py-4 glass-panel border-y border-outline-variant/10 w-full max-w-4xl rounded">
            <div className="marquee-content flex items-center gap-16 px-8">
              {/* Repeated logos for infinite scroll effect */}
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">code</span> GitHub</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">webhook</span> Next.js</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">change_history</span> Vercel</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">forum</span> Slack</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">integration_instructions</span> GitLab</div>
              
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">code</span> GitHub</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">webhook</span> Next.js</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">change_history</span> Vercel</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">forum</span> Slack</div>
              <div className="font-headline-md text-[20px] font-bold text-on-surface-variant opacity-60 flex items-center gap-2"><span className="material-symbols-outlined text-[32px]">integration_instructions</span> GitLab</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full flex flex-col items-center mb-24 z-10">
          <h2 className="font-headline-lg text-[24px] md:text-[30px] font-bold text-on-surface mb-12 text-center">
            Engineered for Modern QA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 border border-white/10 hover:border-primary-fixed/40 transition-colors group">
              <div className="w-12 h-12 rounded bg-surface-variant/50 flex items-center justify-center border border-outline-variant/30 group-hover:bg-primary-fixed/10 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
              </div>
              <h4 className="font-headline-md text-[20px] font-semibold text-on-surface">Zero-code Playwright</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Record actions directly in your browser. AutoPilot compiles clean, maintainable Playwright code instantly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 border border-white/10 hover:border-primary-fixed/40 transition-colors group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-fixed/10 blur-[30px] rounded-full"></div>
              <div className="w-12 h-12 rounded bg-surface-variant/50 flex items-center justify-center border border-outline-variant/30 group-hover:bg-primary-fixed/10 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
              </div>
              <h4 className="font-headline-md text-[20px] font-semibold text-on-surface">Headless Execution</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Scale effortlessly. Run thousands of parallel tests across our globally distributed headless infrastructure.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 border border-white/10 hover:border-primary-fixed/40 transition-colors group">
              <div className="w-12 h-12 rounded bg-surface-variant/50 flex items-center justify-center border border-outline-variant/30 group-hover:bg-primary-fixed/10 transition-colors">
                <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h4 className="font-headline-md text-[20px] font-semibold text-on-surface">Background Auto-Healing</h4>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Self-correcting selectors and logic adjustments happen silently on the fly, preventing brittle test failures.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-terminal-black border-t border-outline-variant/10 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-lg py-xl max-w-[1440px] mx-auto gap-md p-10">
          {/* Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="font-headline-md text-[20px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                terminal
              </span>
              AUTOPILOT
            </div>
            <span className="font-body-md text-[14px] text-on-surface-variant">
              © 2026 AutoPilot Terminal. All rights reserved.
            </span>
          </div>
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-label-md text-[12px] text-on-secondary-container hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Documentation</a>
            <a className="font-label-md text-[12px] text-on-secondary-container hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Privacy Policy</a>
            <a className="font-label-md text-[12px] text-on-secondary-container hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Status</a>
            <a className="font-label-md text-[12px] text-on-secondary-container hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100 uppercase" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
