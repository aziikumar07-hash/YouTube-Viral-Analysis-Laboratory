import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HookGradeResult } from "../types";
import { Sparkles, Loader, Terminal, Play, AlertTriangle, FileText, CheckCircle, RefreshCw, Layers } from "lucide-react";

const SAMPLE_HOOK_AUDIT: HookGradeResult = {
  overallScore: 42,
  promiseGrade: {
    score: 45,
    critique: "Very weak. You opened with 'Hey guys, welcome back to the channel, today we are going to...' which is a critical retention killer in 2026. This is empty introduction noise that triggers an immediate swipe-away on mobile scrolls."
  },
  proofGrade: {
    score: 30,
    critique: "Completely absent. You described what we would do later in the video, but provided no early visual confirmation that the hardware exists or functions. Viewers suspect clickbait and exit."
  },
  motionGrade: {
    score: 55,
    critique: "The shot remained fixed on your talking head for the entire opening 12 seconds. Minimum necessary cut latency in 2026 is 1.6s. The brain entered idle-phase and exited."
  },
  curiosityGapGrade: {
    score: 40,
    critique: "The question you posed was 'Hope you guys enjoy the video!' which holds no stakes. Pose an extreme operational risk or transformation target to lock engagement."
  },
  viralOverhaul: `[Visual: Tight macro 1.2s shot of blue extreme electrical arcs shooting off raw medical components. Volt meter pegging to RED]
[Audio: LOUD arc buzz effect combined with low-end synth sub drop]

Narrator (Fast, dynamic): "This is a radioactive cathode ray tube from a 1970s hospital monitor. In exactly sixty seconds, we are pumping 24,000 Volts coordinates through it..."

[Visual: Fast cut - retro gaming character title splashes onto the green monochrome tube surface, glitching slightly. Narrator points directly on screen]

Narrator: "...proving that scrap metal can run vintage software. But if my solder joints crack under this high-current load..."

[Visual: Quick B-roll montage (0.8s cuts) of sparks, scrap yard finding, and a puff of smoke from a test board]

Narrator: "...it does not just blow my fuses. It implodes the glass envelope. Can we play a round safely, or does this medical hardware dissolve itself in real-time? Let us power it on."`,
  annotations: [
    "Delete any greeting or introduction ('Hey guys'). Start on action.",
    "First visual cut must happen at 1.4 seconds. Match cut with high-frequency Foley sound.",
    "Add red text alerts ('HIGH VOLTAGE') in font style JetBrains Mono in the lower margin."
  ]
};

export default function HookGrader() {
  const [script, setScript] = useState<string>("");
  const [auditResult, setAuditResult] = useState<HookGradeResult | null>(SAMPLE_HOOK_AUDIT); // Default sample to avoid empty screen
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) return;

    setIsLoading(true);
    setAuditResult(null);
    try {
      const response = await fetch("/api/analyze-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hookScript: script }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuditResult(data);
      } else {
        alert(data.error || "Failed to analyze hook");
      }
    } catch (err) {
      console.error("Error analyzing script:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper description */}
      <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/10 backdrop-blur-subtle">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00FFCC] bg-[#00FFCC]/10 px-2.5 py-1 rounded-full border border-[#00FFCC]/20 uppercase tracking-widest font-semibold">
              Copywriting Laboratory
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mt-3 mb-2 tracking-tighter">
              4-Beat <span className="text-[#00FFCC]">Script Grader.</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 leading-relaxed max-w-2xl">
              YouTube's modern discovery system grades hooks in the first 30 seconds. Paste your intro, get graded, and generate a viral redesign. Keep them listening.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-lg border border-white/10 font-mono text-xs text-slate-450">
            <Terminal className="w-3.5 h-3.5 text-[#00FFCC] animate-pulse" />
            <span>4-Beat Formula: <strong className="text-[#FF2E63]">Optimized</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Script Input Panel */}
        <div className="lg:col-span-4 space-y-4 p-6 bg-slate-950/40 border border-white/10 rounded-2xl h-fit">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <FileText className="w-4 h-4 text-[#FF2E63]" />
            <span className="text-xs font-semibold text-white uppercase tracking-widest font-mono">Opening script board</span>
          </div>

          <form onSubmit={handleAudit} className="space-y-4 font-sans">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold block">
                Paste Opening Script (First 30 seconds)
              </label>
              <textarea
                required
                rows={7}
                placeholder="e.g. Hey guys, welcome back to my gaming workbench channel! Today we are modifying a cathode ray tube display in my room. Honestly turned out pretty crazy, make sure to hit subscribe, let us jump right..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-605 focus:outline-none focus:border-[#00FFCC] font-sans leading-relaxed transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF2E63] hover:bg-[#FF4A7A] text-white disabled:bg-slate-800 disabled:text-slate-600 text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:shadow-[0_0_20px_rgba(255,46,99,0.5)] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                  <span>Grading Draft Verbal Elements...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit Hook</span>
                </>
              )}
            </button>
          </form>

          {auditResult === SAMPLE_HOOK_AUDIT && (
            <div className="p-3 bg-[#00FFCC]/5 rounded-lg border border-[#00FFCC]/10 text-[11px] text-[#00FFCC] leading-relaxed font-mono">
              💡 Preloaded standard sample. Paste your opening hook script above to perform an actual evaluation with the generative engine.
            </div>
          )}
        </div>

        {/* Audit Report & Overhaul Output panels */}
        <div className="lg:col-span-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-16 bg-slate-950/40 border border-white/10 rounded-2xl text-center space-y-4">
              <Loader className="w-8 h-8 text-[#FF2E63] animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Grading Script Structure...</p>
                <p className="text-xs text-slate-500 max-w-sm">Comparing word weight against retention matrices, and generating narrator action instructions.</p>
              </div>
            </div>
          )}

          {auditResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Score banner */}
              <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Formula Score Alignment</span>
                  <p className="text-lg font-bold text-white font-sans mt-0.5">Overall Performance Grade</p>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className={`text-2xl font-black border-2 px-4 py-1.5 bg-black/60 rounded-xl ${
                    auditResult.overallScore >= 75 ? "text-[#00FFCC] border-[#00FFCC]/20" :
                    auditResult.overallScore >= 55 ? "text-yellow-400 border-yellow-500/20" : "text-[#FF2E63] border-[#FF2E63]/20"
                  }`}>
                    {auditResult.overallScore}/100
                  </span>
                </div>
              </div>

              {/* Beat level ratings grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Beat 1: The Promise", grade: auditResult.promiseGrade, icon: "🤝" },
                  { name: "Beat 2: The Proof", grade: auditResult.proofGrade, icon: "🔍" },
                  { name: "Beat 3: Dynamic Motion", grade: auditResult.motionGrade, icon: "⚡" },
                  { name: "Beat 4: Curiosity Gap", grade: auditResult.curiosityGapGrade, icon: "🎯" }
                ].map((beat, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/40 border border-white/10 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm select-none">{beat.icon}</span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">{beat.name}</h4>
                      </div>
                      <span className={`text-xs font-black px-2 py-0.5 rounded font-mono border ${
                        beat.grade.score >= 75 ? "bg-[#00FFCC]/10 text-[#00FFCC] border-[#00FFCC]/20" :
                        beat.grade.score >= 55 ? "bg-yellow-500/10 text-yellow-405 border-yellow-500/20" : "bg-[#FF2E63]/10 text-[#FF2E63] border-[#FF2E63]/20"
                      }`}>
                        {beat.grade.score}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-sans">{beat.grade.critique}</p>
                  </div>
                ))}
              </div>

              {/* Overhauled Viral Redesign Script */}
              <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00FFCC] font-bold block border-b border-white/10 pb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFCC]" />
                  <span>VIRAL OVERHAUL DIRECTIONS (ACT 1)</span>
                </span>

                <div className="bg-[#0A0A0B] border border-white/5 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {auditResult.viralOverhaul}
                </div>
              </div>

              {/* Key action recommendations list */}
              <div className="p-5 bg-[#0A0A0B]/80 border border-white/10 rounded-2xl space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-[#00FFCC] tracking-widest font-bold block">
                  Pacing and Annotation Directives
                </span>
                <ul className="space-y-2">
                  {auditResult.annotations.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-[#FF2E63] font-mono inline-block">▸</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
