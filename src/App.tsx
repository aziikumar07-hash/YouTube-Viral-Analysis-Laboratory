import React, { useState } from "react";
import ConceptLab from "./components/ConceptLab";
import HookGrader from "./components/HookGrader";
import PacingSimulator from "./components/PacingSimulator";
import NicheIntelligence from "./components/NicheIntelligence";
import { Youtube, Sparkles, Sliders, Compass, Terminal, Cpu, Info } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"concept" | "hook" | "pacing" | "trends">("concept");

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col font-sans selection:bg-[#FF2E63]/30 selection:text-white">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 border-b border-white/10 bg-[#0A0A0B] sticky top-0 z-50 backdrop-blur-md bg-opacity-95 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#FF2E63] shadow-[0_0_10px_#FF2E63]"></div>
          <div>
            <h1 className="text-xs uppercase tracking-[0.4em] font-bold text-slate-400 font-sans">
              Creator Lab // Production Analysis
            </h1>
            <span className="text-lg font-serif italic text-white mt-1 block tracking-tight">
              YouTube Viral Analysis Laboratory <span className="text-[#00FFCC] font-mono text-xs not-italic font-bold bg-[#00FFCC]/10 border border-[#00FFCC]/20 px-1.5 py-0.5 rounded ml-2">2026 Core</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
          <span>Session: <span className="text-slate-350">042-VIRAL</span></span>
          <span>Target: <span className="text-slate-350">2.5M Reach</span></span>
          <span className="text-[#00FFCC] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC] animate-ping"></span>
            Status: Optimized
          </span>
        </div>
      </header>

      {/* Main Core Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Modular Navigation Workbench Docks */}
        <section className="lg:col-span-3 space-y-6">
          <div className="p-6 bg-slate-950/40 border border-white/10 rounded-xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF2E63] block border-b border-white/10 pb-2">
              Optimization Stack
            </span>

            <nav className="space-y-2.5 flex flex-col">
              {/* Concept lab button */}
              <button
                onClick={() => setActiveTab("concept")}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 border ${
                  activeTab === "concept"
                    ? "bg-white/5 border-[#00FFCC] text-white shadow-md shadow-[#00FFCC]/5"
                    : "bg-transparent hover:bg-white/2 border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "concept" ? "text-[#00FFCC]" : "text-slate-500"}`} />
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold tracking-tight">Showrunner Concept Lab</span>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 block">Analyze video targets</span>
                </div>
              </button>

              {/* Hook Overhaul button */}
              <button
                onClick={() => setActiveTab("hook")}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 border ${
                  activeTab === "hook"
                    ? "bg-white/5 border-[#00FFCC] text-white shadow-md shadow-[#00FFCC]/5"
                    : "bg-transparent hover:bg-white/2 border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "hook" ? "text-[#FF2E63]" : "text-slate-500"}`} />
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold tracking-tight">4-Beat Hook Grader</span>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 block">Optimize first 30 seconds</span>
                </div>
              </button>

              {/* Rentention simulator button */}
              <button
                onClick={() => setActiveTab("pacing")}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 border ${
                  activeTab === "pacing"
                    ? "bg-white/5 border-[#00FFCC] text-white shadow-md shadow-[#00FFCC]/5"
                    : "bg-transparent hover:bg-white/2 border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "pacing" ? "text-[#00FFCC]" : "text-slate-500"}`} />
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold tracking-tight">Pacing Simulator</span>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 block">Simulate audience decay</span>
                </div>
              </button>

              {/* Niche explorer button */}
              <button
                onClick={() => setActiveTab("trends")}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 border ${
                  activeTab === "trends"
                    ? "bg-white/5 border-[#00FFCC] text-white shadow-md shadow-[#00FFCC]/5"
                    : "bg-transparent hover:bg-white/2 border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <Compass className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "trends" ? "text-purple-400" : "text-slate-500"}`} />
                <div className="text-left leading-none">
                  <span className="block text-xs font-bold tracking-tight">Niche IQ Explorer</span>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 block">2026 trending markets</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Quick Informational Widget */}
          <div className="p-6 bg-slate-950/40 border border-white/5 rounded-xl space-y-3">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#00FFCC] shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold block">
                Satisfaction Rules
              </span>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
              In 2026, raw watch-time has been replaced by <strong className="text-slate-200 font-medium">Satisfaction Signals</strong>. The algorithm rewards videos with high completion rates on television screens and session loops that prevent app exits.
            </p>
          </div>
        </section>

        {/* Right Side: Active Workspace Workspace Rendering */}
        <section className="lg:col-span-9 bg-slate-900/10 border border-white/5 rounded-2xl p-2 md:p-6 shadow-2xl backdrop-blur-subtle">
          {activeTab === "concept" && <ConceptLab />}
          {activeTab === "hook" && <HookGrader />}
          {activeTab === "pacing" && <PacingSimulator />}
          {activeTab === "trends" && <NicheIntelligence />}
        </section>

      </main>

      {/* Footer Ticker Container */}
      <footer className="h-10 bg-white text-black flex items-center px-6 md:px-10 text-[9px] font-bold uppercase tracking-widest font-sans select-none overflow-hidden shrink-0 mt-8">
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap inline-block">
            RETENTION OPTIMIZED // TEXT-BOXES REMOVED // GLITCH TRANSITIONS APPLIED // SOUND DESIGN SYNCED // MULTI-MILLION VIEW POTENTIAL // FACELESS NICHE ACCELERATOR // MONETIZATION HARVEST // 2026 SATISFACTION ALGORITHM OPTIMIZED // RETENTION OPTIMIZED // TEXT-BOXES REMOVED // GLITCH TRANSITIONS APPLIED //
          </div>
        </div>
        <div className="pl-6 font-mono text-[9px] uppercase tracking-widest shrink-0 border-l border-black/20 hidden sm:block">
          COPYRIGHT 2026 CREATOR_STUDIO
        </div>
      </footer>

      {/* Marquee Animation Inline styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
