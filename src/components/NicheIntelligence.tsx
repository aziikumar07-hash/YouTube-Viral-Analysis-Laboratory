import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MarketTrend, NicheStrategy } from "../types";
import { Sparkles, ArrowRight, Loader, TrendingUp, Compass, DollarSign, Search, Award, HelpCircle } from "lucide-react";

export default function NicheIntelligence() {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<MarketTrend | null>(null);
  const [customNiche, setCustomNiche] = useState<string>("");
  const [customStrategy, setCustomStrategy] = useState<NicheStrategy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<"bento" | "custom">("bento");

  useEffect(() => {
    // Fetch default high-growth 2026 trends
    fetch("/api/market-trends")
      .then((res) => res.json())
      .then((data) => {
        setTrends(data);
        if (data && data.length > 0) {
          setSelectedTrend(data[0]);
        }
      })
      .catch((err) => console.error("Error fetching market trends:", err));
  }, []);

  const handleCustomNicheSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNiche.trim()) return;

    setIsLoading(true);
    setCustomStrategy(null);
    try {
      const response = await fetch("/api/niche-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicheName: customNiche }),
      });
      const data = await response.json();
      if (response.ok) {
        setCustomStrategy(data);
      } else {
        alert(data.error || "Failed to generate custom strategy");
      }
    } catch (err) {
      console.error("Error generating niche strategy:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro header */}
      <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/10 backdrop-blur-subtle">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
          <div>
            <span className="text-xs font-mono text-[#00FFCC] bg-[#00FFCC]/10 px-2.5 py-1 rounded-full border border-[#00FFCC]/20 uppercase tracking-widest font-semibold">
              Market Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mt-3 mb-2 tracking-tighter">
              2026 <span className="text-[#00FFCC]">Niche IQ Engine.</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 leading-relaxed max-w-2xl font-sans">
              Scan high search-to-supply coefficient categories or enter a custom creative target to generate tailored viral roadmaps.
            </p>
          </div>
          {/* Sub tabs */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10 shrink-0 font-mono">
            <button
              onClick={() => setCurrentTab("bento")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                currentTab === "bento" ? "bg-white/5 text-[#00FFCC]" : "text-slate-500 hover:text-white"
              }`}
            >
              Hotpots
            </button>
            <button
              onClick={() => setCurrentTab("custom")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                currentTab === "custom" ? "bg-white/5 text-[#00FFCC]" : "text-slate-500 hover:text-white"
              }`}
            >
              Custom Strategy
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentTab === "bento" ? (
          <motion.div
            key="bento-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Bento Grid layout */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold block pl-1">
                Viral Hotpots (Verified High Growth)
              </span>
              <div className="grid grid-cols-1 gap-3">
                {trends.map((trend) => {
                  const isSelected = selectedTrend?.id === trend.id;
                  return (
                    <button
                      key={trend.id}
                      onClick={() => setSelectedTrend(trend)}
                      className={`text-left p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? "bg-slate-950 border-[#FF2E63] text-white shadow-[0_0_15px_rgba(255,46,99,0.15)]"
                          : "bg-slate-950/45 hover:bg-slate-900 hover:border-white/10 border-white/5 text-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm tracking-tight">{trend.name}</h4>
                          <span className="text-[10px] font-mono text-[#00FFCC] bg-[#00FFCC]/10 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-[#00FFCC]/20">
                            {trend.growth} growth
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-black/60 px-2 py-1 rounded border border-white/10 shrink-0">
                          {trend.cpm}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Trend Strategic Analysis View */}
            <div className="lg:col-span-7">
              {selectedTrend && (
                <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-5 font-sans">
                  <div className="flex justify-between items-start pb-4 border-b border-white/5 gap-4">
                    <div>
                      <h3 className="text-2xl font-serif italic text-white tracking-tight">{selectedTrend.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedTrend.description}</p>
                    </div>
                    <Compass className="w-5 h-5 text-[#FF2E63] shrink-0 mt-1" />
                  </div>

                  {/* High level stats metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Search Demand</span>
                      <span className="text-sm font-bold text-white font-mono mt-0.5 block">{selectedTrend.demand}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Competition</span>
                      <span className="text-sm font-bold text-[#00FFCC] font-mono mt-0.5 block">{selectedTrend.competition}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">Typical CPM</span>
                      <span className="text-sm font-bold text-indigo-400 font-mono mt-0.5 block">{selectedTrend.cpm}</span>
                    </div>
                  </div>

                  {/* Secret weapon details */}
                  <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-405 text-yellow-500" />
                      <span className="text-[10px] font-mono font-bold text-slate-200 uppercase tracking-widest">Algorithmic Secret Weapon</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{selectedTrend.secretWeapon}</p>
                  </div>

                  <div className="space-y-3 font-sans">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block pl-1">
                      2026 Production Roadmap Example
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-400 bg-[#0A0A0B] p-4.5 border border-white/5 rounded-xl">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#00FFCC] font-mono inline-block pt-0.5 font-bold">01.</span>
                        <span>Use high-speed Shorts clips outlining a controversy or rapid trick as an discovery hook.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#00FFCC] font-mono inline-block pt-0.5 font-bold">02.</span>
                        <span>Lead directly to a long-form video (20+ minutes) incorporating full audio landscapes (rain, city binaural sweeps) designed for TV screen playback.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#FF2E63] font-mono inline-block pt-0.5 font-bold">03.</span>
                        <span>Pin a downloadable interactive outline using descriptive custom titles to convert casual viewers to regular loyalists.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="custom-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Custom input panel */}
              <div className="lg:col-span-4 space-y-4 p-6 bg-slate-950/40 border border-white/10 rounded-2xl h-fit">
                <form onSubmit={handleCustomNicheSubmit} className="space-y-4 font-sans">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold block">
                      Custom Niche Concept
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vintage Keyboard Restoration"
                      value={customNiche}
                      onChange={(e) => setCustomNiche(e.target.value)}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white placeholder:text-slate-651 focus:outline-none focus:border-[#00FFCC]"
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
                        <span>Injecting Gemini Brain...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run Strategy Blueprint</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5 text-slate-400 leading-relaxed text-[11px] space-y-2 select-none font-sans">
                  <span className="font-bold text-slate-200 block">AI Strategic Blueprinting:</span>
                  <p>
                    Gemini analyzes your custom niche against 2026 distribution metrics, charting search quotients, Connected TV potentials, and multi-format funnels in structured formats.
                  </p>
                </div>
              </div>

              {/* Analysis output panels */}
              <div className="lg:col-span-8">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-16 bg-slate-950/40 border border-white/10 rounded-2xl text-center space-y-4 font-sans">
                    <Loader className="w-8 h-8 text-[#FF2E63] animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">Generating Strategic Blueprint...</p>
                      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">Comparing supply gaps, analyzing long-form binging frameworks, and formulating high-RPM milestones.</p>
                    </div>
                  </div>
                ) : customStrategy ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-6 font-sans"
                  >
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/15 gap-4">
                      <div>
                        <span className="text-xs text-[#00FFCC] font-bold uppercase font-mono tracking-widest">Analysis Complete</span>
                        <h3 className="text-2xl font-serif italic text-white mt-1.5">{customNiche}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-3 py-1.5 border border-white/10 rounded-lg tracking-wider">
                          CPM Target: <strong className="text-[#00FFCC]">{customStrategy.estimatedCPM}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 bg-[#0A0A0B] rounded-xl border border-white/5 font-sans">
                        <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#00FFCC] block font-bold">Search Demand</span>
                        <span className="text-sm font-bold text-white font-mono mt-0.5 block">{customStrategy.searchDemand}</span>
                      </div>
                      <div className="p-3.5 bg-[#0A0A0B] rounded-xl border border-white/5 font-sans">
                        <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#FF2E63] block font-bold">Competition Level</span>
                        <span className="text-sm font-bold text-[#00FFCC] font-mono mt-0.5 block">{customStrategy.competitionLevel}</span>
                      </div>
                    </div>

                    {/* Content Strategic Pillars */}
                    <div className="space-y-3 font-sans">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block pl-1">
                        Core Content Pillars
                      </span>
                      <div className="grid grid-cols-1 gap-3">
                        {customStrategy.strategicPillars.map((p, i) => (
                          <div key={i} className="p-4.5 bg-[#0A0A0B] border border-white/5 rounded-xl space-y-2 leading-relaxed">
                            <div className="flex items-center gap-2">
                              <Award className="w-3.5 h-3.5 text-[#FF2E63]" />
                              <h4 className="font-bold text-xs text-white uppercase tracking-widest font-mono">{p.pillar}</h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-normal">{p.whyWorks}</p>
                            <p className="text-xs text-slate-300 font-mono bg-black/60 p-2.5 rounded-lg border border-white/5 leading-normal">
                              <span className="text-[#00FFCC] font-bold">Concept Idea:</span> {p.exampleIdea}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Formats separation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div className="space-y-1.5 font-sans">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#00FFCC] block">Short-Form Funnel</span>
                        <p className="text-xs text-slate-400 leading-relaxed bg-[#0A0A0B] p-4.5 rounded-xl border border-white/5">
                          {customStrategy.shortsFunnelStrategy}
                        </p>
                      </div>
                      <div className="space-y-1.5 font-sans">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF2E63] block">Leanback TV Anchors</span>
                        <p className="text-xs text-slate-400 leading-relaxed bg-[#0A0A0B] p-4.5 rounded-xl border border-white/5 font-sans">
                          {customStrategy.longFormAnchors}
                        </p>
                      </div>
                    </div>

                    {/* Growth hacks array */}
                    <div className="space-y-3 pt-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block pl-1">
                        Virality Expansion Hacks
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {customStrategy.growthHacks.map((g, i) => (
                          <span
                            key={i}
                            className="bg-[#00FFCC]/10 text-[#00FFCC] px-3.5 py-1 text-2xs uppercase tracking-widest rounded-full border border-[#00FFCC]/20 font-mono font-bold"
                          >
                            ⚡ {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3">
                    <Compass className="w-7 h-7 text-slate-600" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-400">Waiting for custom input</p>
                      <p className="text-xs text-slate-500">Type a topic and let Gemini map a precise viral distribution model.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
