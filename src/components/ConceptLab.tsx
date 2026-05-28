import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ConceptAnalysis } from "../types";
import { Sparkles, Loader, Shield, Play, HelpCircle, Check, AlertTriangle, RefreshCw, Layers, Award } from "lucide-react";

const SAMPLE_ANALYSIS: ConceptAnalysis = {
  viralityScore: 88,
  critique: "This concept perfectly bridges the curiosity gap demanded by 2026 viewers, targeting both high-frequency tech searches and Connected-TV leanback. The combination of hardware aesthetics with a macro dramatic quest holds extreme potential for regular viewers.",
  hookBlueprint: {
    promise: "Show the completely custom retro visual engine rebuilt from old medical CRT tubes in the first 4 seconds.",
    proof: "Power it on immediately, proving it streams real-time gameplay with fully authentic distortion.",
    motion: "Fast jump cut pulling backwards as we describe the 3 broken scrap yards we searched, transitioning to physical on-camera quest footage.",
    curiosityGap: "Can this high-frequency radiation emitter play retro games safely, or does it burn itself out after 60 seconds of high-amperage load?"
  },
  pacingBreakdown: {
    hookPacing: "Fast cuts (every 1.4s) showing extreme closeup voltage arcs and scope output dials.",
    midPacing: "Ease to 2.8s average shot length. Use schematic graphics overlays and Foley claps every time a dial rotates.",
    latePacing: "Hold a continuous static talking-head explanation for no longer than 15s before overlaying a B-roll b-roll wipe.",
    endPacing: "Lead directly to an unfinished cliffhanger challenge, keeping viewers binge-clicking the adjacent video link."
  },
  milestones: [
    { timestamp: "0:00", sectionName: "The Promise Beat", strategy: "CRT monitor powers on displaying custom warning graphics", predictedRetention: 100 },
    { timestamp: "0:30", sectionName: "The Hook Edge", strategy: "Pattern Interrupt: sudden loud power arc sound effect as voltmeter shoots to red", predictedRetention: 89 },
    { timestamp: "3:15", sectionName: "The Scrap Yard Quest", strategy: "Foley audio heavy b-roll montage showing physical hunting and salvage moments", predictedRetention: 78 },
    { timestamp: "7:45", sectionName: "Emotional Validation", strategy: "Show the first successful raster sweep - close up on narrator's expression of relief", predictedRetention: 72 },
    { timestamp: "12:00", sectionName: "Curiosity Peak", strategy: "The tube begins smelling of ozone - adding alert symbols onscreen to force high commitment", predictedRetention: 68 },
    { timestamp: "15:00", sectionName: "The Binge Link", strategy: "Endscreen pops pointing directly to 'EP 2: Setting up 240 Volts safely'", predictedRetention: 64 }
  ],
  emotionalMidpoint: "At the 7-minute mark, pivot the content from pure mechanical troubleshooting to human frustration. Detail the exact moment we almost abandoned the build, validating the viewer's psychological empathy before introducing the working breakthrough.",
  packagingVariants: [
    {
      title: "I Built a Video Engine From 1970s Scrap Medical Tech",
      thumbnailConcept: "Single extreme close up of a glowing green cathode tube with miniature arc sparks. Text: 'DANGEROUS CRT?'",
      whyItWorks: "Bypasses cheap clickbait by using high contrasting physical macro objects, exciting hardware collectors."
    },
    {
      title: "Rebuilding a Radioactive CRT Monitor was a Huge Mistake...",
      thumbnailConcept: "Close up of narrator wearing nuclear safety goggles looking stressed under green CRT glow. Text: 'A MISTAKE?'",
      whyItWorks: "Strong sense of stakes and threat, targeting high-CTR casual scroll rates on smartphones."
    }
  ]
};

export default function ConceptLab() {
  const [concept, setConcept] = useState<string>("");
  const [niche, setNiche] = useState<string>("AI & Technology");
  const [targetLength, setTargetLength] = useState<number>(15);
  const [analysis, setAnalysis] = useState<ConceptAnalysis | null>(SAMPLE_ANALYSIS); // Default sample to avoid empty UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMockVariant, setSelectedMockVariant] = useState<number>(0);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;

    setIsLoading(true);
    setAnalysis(null);
    try {
      const response = await fetch("/api/analyze-concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, niche, targetLength }),
      });
      const data = await response.json();
      if (response.ok) {
        setAnalysis(data);
        setSelectedMockVariant(0);
      } else {
        alert(data.error || "Failed to analyze concept");
      }
    } catch (err) {
      console.error("Error analyzing concept:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/10 backdrop-blur-subtle">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00FFCC] bg-[#00FFCC]/10 px-2.5 py-1 rounded-full border border-[#00FFCC]/20 uppercase tracking-widest font-semibold">
              Showrunner Workspace
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mt-3 mb-2 tracking-tighter">
              Showrunner <span className="text-[#00FFCC]">Concept Laboratory.</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 leading-relaxed max-w-2xl">
              Design a video topic, map out retention mechanics, and simulate mobile feed thumbnails before you film a single frame. Discard static pans. Movement = Retention.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-lg border border-white/10 font-mono text-xs text-slate-450">
            <Shield className="w-3.5 h-3.5 text-[#00FFCC]" />
            <span>Telemetry: <strong className="text-[#FF2E63]">Locked</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-4 p-6 bg-slate-950/40 border border-white/10 rounded-2xl h-fit">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Layers className="w-4 h-4 text-[#FF2E63]" />
            <span className="text-xs font-semibold text-white uppercase tracking-widest font-mono">Blueprint Setup</span>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-5">
            {/* Concept text area */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold block">
                Describe Video Concept / Goal
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. I reconstructed a 1970s monochrome CRT radar screen to play retro video games."
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FFCC] font-sans leading-relaxed transition-colors"
              />
            </div>

            {/* Select Niche */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold block">
                Target Niche Channel
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-3 text-xs text-slate-350 focus:outline-none focus:border-[#00FFCC] transition-colors"
              >
                <option value="AI & Technology">AI & Technology</option>
                <option value="Sleep & Ambient">Sleep & Ambient</option>
                <option value="Historical Cooking">Historical Recipe Reconstructions</option>
                <option value="Streamer Lore Docs">Streamer Lore Mockumentaries</option>
                <option value="Finance & Passive Income">Finance & Side Hustle spreadsheets</option>
                <option value="General Entertainment">Creative entertainment stunts</option>
              </select>
            </div>

            {/* Target length */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold">Target Length</span>
                <span className="font-sans font-semibold text-[#00FFCC]">{targetLength} Mins</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={targetLength}
                onChange={(e) => setTargetLength(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FFCC]"
              />
              <div className="flex justify-between text-[9px] text-slate-550 font-mono">
                <span>Short Form (5m)</span>
                <span>TV Leanback (45m)</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF2E63] hover:bg-[#FF4A7A] text-white disabled:bg-slate-800 disabled:text-slate-600 text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:shadow-[0_0_20px_rgba(255,46,99,0.5)] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                  <span>Computing Variables...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scan Theme</span>
                </>
              )}
            </button>
          </form>

          {analysis === SAMPLE_ANALYSIS && (
            <div className="p-3 bg-[#00FFCC]/5 rounded-lg border border-[#00FFCC]/10 text-[11px] text-[#00FFCC] font-mono leading-relaxed">
              💡 Preloaded default. Change values and click "Scan Theme" to run full strategic AI audit.
            </div>
          )}
        </div>

        {/* Results Workspace Panel */}
        <div className="lg:col-span-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-16 bg-slate-950/40 border border-white/10 rounded-2xl text-center space-y-4">
              <Loader className="w-8 h-8 text-[#FF2E63] animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Analyzing Retention Flow...</p>
                <p className="text-xs text-slate-500 max-w-sm">Generating a customized 4-beat opening hook, predicting satisfaction indices, and building title structures.</p>
              </div>
            </div>
          )}

          {analysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Score & Critique Block */}
              <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 text-[#FF2E63]" />
                    <span className="text-xs uppercase tracking-widest text-[#FF2E63] font-bold font-mono">Performance Diagnosis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Yield Index:</span>
                    <span className="text-2xl font-black text-[#00FFCC] font-mono">{analysis.viralityScore}/100</span>
                  </div>
                </div>

                <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5">
                  <span className="text-[9px] font-mono text-[#00FFCC] uppercase tracking-widest font-bold block mb-1">
                    Algorithm Satisfaction Audit
                  </span>
                  <p className="text-xs text-slate-355 leading-relaxed font-sans">{analysis.critique}</p>
                </div>
              </div>

              {/* Hook sequence & emotional midpoint blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Opening Block (4-Beats) */}
                <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block border-b border-white/10 pb-2">
                    4-Beat Hook Sequence
                  </span>

                  <div className="space-y-3">
                    {[
                      { num: "01", name: "The Promise Beat", value: analysis.hookBlueprint.promise, color: "border-white/5 bg-[#0A0A0B]", numColor: "text-[#00FFCC]" },
                      { num: "02", name: "The Proof Beat", value: analysis.hookBlueprint.proof, color: "border-white/10 bg-[#0A0A0B]", numColor: "text-[#FF2E63]" },
                      { num: "03", name: "The Motion Beat", value: analysis.hookBlueprint.motion, color: "border-white/5 bg-[#0A0A0B]", numColor: "text-[#00FFCC]" },
                      { num: "04", name: "The Curiosity Gap", value: analysis.hookBlueprint.curiosityGap, color: "border-white/10 bg-[#0A0A0B]", numColor: "text-[#FF2E63]" }
                    ].map((beat, i) => (
                      <div key={i} className={`p-3.5 border rounded-xl ${beat.color} space-y-1`}>
                        <div className="flex items-center justify-between text-[9px] font-mono font-black uppercase tracking-wider">
                          <span className="text-slate-400">{beat.name}</span>
                          <span className={beat.numColor}>Beat {beat.num}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{beat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Feed Packaging card */}
                <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block border-b border-white/10 pb-2">
                      Visual Packaging preview
                    </span>

                    {/* Selector of variant */}
                    <div className="flex gap-1.5 p-1 bg-[#0A0A0B] rounded-xl border border-white/10">
                      {analysis.packagingVariants.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedMockVariant(i)}
                          className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-mono tracking-widest uppercase transition-all ${
                            selectedMockVariant === i ? "bg-white/5 text-[#00FFCC] font-bold" : "text-slate-500 hover:text-white"
                          }`}
                        >
                          Variant {i === 0 ? "A" : "B"}
                        </button>
                      ))}
                    </div>

                    {/* The Feed Mock Container */}
                    <div className="p-3.5 bg-[#0A0A0B] rounded-2xl border border-white/5 space-y-3 shadow-inner">
                      <div className="text-[9px] font-mono text-slate-500 flex justify-between items-center select-none border-b border-white/5 pb-1.5">
                        <span>📱 FEED SIMULATOR</span>
                        <span className="text-[#00FFCC]">satisfies CTR benchmark</span>
                      </div>

                      {/* Visual Thumbnail Frame */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] border border-white/10 flex flex-col justify-center items-center p-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#080808] to-[#1a1a2e] opacity-90 pointer-events-none"></div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white bg-[#FF2E63] border border-white/20 px-3 py-1.5 rounded-full text-center z-10 max-w-[85%] leading-tight shadow-md">
                          {analysis.packagingVariants[selectedMockVariant]?.thumbnailConcept}
                        </span>
                        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white z-10 opacity-90 border border-white/10">
                          {targetLength}:00 Mins
                        </span>
                      </div>

                      {/* Title block under video */}
                      <div className="flex gap-3 items-start">
                        {/* Channel circle */}
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 font-mono text-[9px] flex items-center justify-center text-[#00FFCC] font-black shrink-0">
                          042
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold leading-snug text-white font-sans">
                            {analysis.packagingVariants[selectedMockVariant]?.title}
                          </h4>
                          <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-550 leading-none">
                            Creator Studio • 460K views • 2 hours ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#0A0A0B] rounded-xl border border-white/5 text-[11px] text-slate-400 leading-normal">
                    <span className="font-bold text-slate-200 block mb-1">CTR-to-Watch-Time Conversion:</span>
                    {analysis.packagingVariants[selectedMockVariant]?.whyItWorks}
                  </div>
                </div>
              </div>

              {/* Milestones Horizontal map */}
              <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block border-b border-white/10 pb-2">
                  Retention Timeline Breakdown
                </span>

                <div className="relative overflow-x-auto pb-2 scrollbar-thin">
                  <div className="flex gap-4 min-w-[650px] py-1">
                    {analysis.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex-1 bg-[#0A0A0B] border border-white/5 rounded-xl p-4 space-y-2 relative">
                        {/* Connecting visual pointer line */}
                        {idx < analysis.milestones.length - 1 && (
                          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/10 z-10 pointer-events-none"></div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-2xs font-mono font-bold text-[#00FFCC] bg-[#00FFCC]/10 px-2 py-0.5 rounded border border-[#00FFCC]/10">
                            {milestone.timestamp}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase">
                            {milestone.predictedRetention}% CTR
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-white tracking-tight leading-none font-sans">
                          {milestone.sectionName}
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-normal leading-snug">
                          {milestone.strategy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emotional Midpoint Pivot strategy */}
              <div className="p-4 bg-[#FF2E63] text-black rounded-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-black shrink-0 fill-current" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    The Binge Trigger // Midpoint Switch
                  </span>
                </div>
                <p className="text-xs font-bold leading-normal">
                  {analysis.emotionalMidpoint}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
