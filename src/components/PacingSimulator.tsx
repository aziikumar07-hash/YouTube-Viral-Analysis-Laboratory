import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Sliders, Play, Info, AlertTriangle, Cpu, TrendingUp } from "lucide-react";

export default function PacingSimulator() {
  const [shotLength, setShotLength] = useState<number>(2.4); // Target: 1.6s
  const [interruptDensity, setInterruptDensity] = useState<number>(40); // 0-100
  const [soundAccents, setSoundAccents] = useState<number>(30); // 0-100
  const [sessionHookOn, setSessionHookOn] = useState<boolean>(true); // session loop strategy

  // Calculate simulated retention indices
  const simulationMetrics = useMemo(() => {
    // Shot length effect (Target 1.6s is master class)
    // shorter shot length preserves early hook attention (0-30s)
    const earlyPreservation = Math.min(95, Math.max(30, 85 - (shotLength - 1.6) * 18));
    
    // Pattern interrupts flatten the middle slide
    const midDecayRate = Math.max(0.1, 0.45 - (interruptDensity / 200));
    
    // Sound accents reinforce early validation peaks (+5% midpoint response if high)
    const midPeakBonus = Math.floor(soundAccents / 15);

    // Dynamic curve generator (10 ticks)
    const curvePoints: { x: number; y: number; name: string }[] = [];
    let currentY = 100;
    
    for (let i = 0; i <= 10; i++) {
      const progress = i / 10;
      if (progress === 0) {
        currentY = 100;
      } else if (progress <= 0.1) {
        // Fast hook drop
        const baseDrop = 100 - earlyPreservation;
        currentY = 100 - (baseDrop * (progress / 0.1));
      } else if (progress <= 0.5) {
        // Early mid decay, affected by shotlength and interrupts
        const slope = (35 - (interruptDensity / 3)) * midDecayRate;
        currentY = Math.max(15, currentY - slope * 0.1);
      } else if (progress <= 0.6) {
        // Validation midpoint peak trigger
        const recovery = Math.min(95, currentY + midPeakBonus + 4);
        currentY = recovery;
      } else if (progress <= 0.9) {
        // Late decay
        currentY = Math.max(10, currentY - (30 - (interruptDensity / 5)) * 0.1);
      } else {
        // Session ending loop or abrupt exit
        if (sessionHookOn) {
          // Binge trigger loop boost
          currentY = Math.min(80, currentY + 12);
        } else {
          currentY = Math.max(5, currentY - 15);
        }
      }
      
      // Keep within bounds
      currentY = Math.min(100, Math.max(4, Math.round(currentY)));
      
      let landmark = "";
      if (progress === 0.0) landmark = "Start";
      if (progress === 0.1) landmark = "Hook Edge (30s)";
      if (progress === 0.5) landmark = "Midpoint";
      if (progress === 0.6) landmark = "Emotional Peak";
      if (progress === 1.0) landmark = "Exit / Binge";

      curvePoints.push({ x: progress * 100, y: currentY, name: landmark });
    }

    // Average View Duration Approximation
    const sumPoints = curvePoints.reduce((sum, p) => sum + p.y, 0);
    const avgRetention = Math.round(sumPoints / curvePoints.length);
    const score = Math.round((avgRetention * 0.6) + (earlyPreservation * 0.4));

    return {
      points: curvePoints,
      avgRetention,
      earlyPreservation: Math.round(earlyPreservation),
      score,
      verdict: score >= 75 ? "Elite Retention" : score >= 55 ? "Moderate Keep-Rate" : "Severe Drop-off Alarm"
    };
  }, [shotLength, interruptDensity, soundAccents, sessionHookOn]);

  // SVG coordinate calculations for rendering the curve
  const svgPath = useMemo(() => {
    const width = 500;
    const height = 200;
    return simulationMetrics.points.map((p, index) => {
      const xCoord = (p.x / 100) * width;
      const yCoord = height - (p.y / 100) * height;
      return `${index === 0 ? 'M' : 'L'} ${xCoord} ${yCoord}`;
    }).join(" ");
  }, [simulationMetrics.points]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-950/40 rounded-2xl border border-white/10 backdrop-blur-subtle font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00FFCC] bg-[#00FFCC]/10 px-2.5 py-1 rounded-full border border-[#00FFCC]/20 uppercase tracking-widest font-semibold">
              Interactive simulator
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mt-3 mb-2 tracking-tighter">
              Algorithmic <span className="text-[#00FFCC]">Pacing Console.</span>
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 leading-relaxed max-w-2xl">
              Tweak your visual edit density and audio accents to preview simulated viewer retention under YouTube's satisfaction engine. Movement = Retention.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-lg border border-white/10 font-mono text-xs text-slate-450">
            <Cpu className="w-3.5 h-3.5 text-[#00FFCC] animate-pulse" />
            <span>Simulator Level: <strong className="text-[#FF2E63]">Operational</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-4 space-y-6 p-6 bg-slate-950/40 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Sliders className="w-4 h-4 text-[#FF2E63]" />
            <span className="text-xs font-semibold text-white uppercase tracking-widest font-mono">Pacing Parameters</span>
          </div>

          {/* Slider 1: Average Shot Length */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-medium text-slate-300">Average Cut Interval (Shot Length)</span>
              <span className={`font-mono font-bold ${shotLength <= 1.8 ? 'text-[#00FFCC]' : shotLength <= 2.8 ? 'text-yellow-405' : 'text-[#FF2E63]'}`}>
                {shotLength.toFixed(1)}s
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={shotLength}
              onChange={(e) => setShotLength(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FFCC]"
            />
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>Fast (1s)</span>
              <span className="text-[#00FFCC] font-semibold bg-[#00FFCC]/5 px-1.5 py-0.5 rounded border border-[#00FFCC]/10">Target: 1.6s</span>
              <span>Slow (5s)</span>
            </div>
          </div>

          {/* Slider 2: Pattern Interrupt Density */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-medium text-slate-300">Pattern Interrupt Frequency</span>
              <span className="font-mono text-[#00FFCC] font-bold">{interruptDensity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={interruptDensity}
              onChange={(e) => setInterruptDensity(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FFCC]"
            />
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>Sparsely Spaced</span>
              <span>Ultra Dense Graphics</span>
            </div>
          </div>

          {/* Slider 3: Sound Accents */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-medium text-slate-300">Foley & SFX Accents</span>
              <span className="font-mono text-[#00FFCC] font-bold">{soundAccents}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={soundAccents}
              onChange={(e) => setSoundAccents(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FFCC]"
            />
            <div className="flex items-center justify-between text-[9px] text-slate-550 font-mono">
              <span>Voice Only</span>
              <span>Soundscape Immersive</span>
            </div>
          </div>

          {/* Switch 4: Session Binge-Hook */}
          <div className="pt-4 border-t border-white/10">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sessionHookOn}
                onChange={(e) => setSessionHookOn(e.target.checked)}
                className="mt-1 rounded bg-black border-white/15 text-[#00FFCC] focus:ring-[#00FFCC] w-4 h-4 cursor-pointer"
              />
              <div className="text-xs font-sans">
                <span className="block font-medium text-slate-205 text-slate-200">Session Binge-Loop Ending</span>
                <span className="block text-slate-500 mt-0.5 leading-relaxed">
                  Triggers end-screen loops directly to adjacent videos, telling the system this video initiates a continuous session.
                </span>
              </div>
            </label>
          </div>

          <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5 flex gap-3 items-start font-sans">
            <Info className="w-4 h-4 text-[#00FFCC] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-450 leading-relaxed">
              <span className="font-bold text-slate-200">The 1.6s Cut Benchmark:</span> Leading creators average 1.6s before their first hard cut, keeping the brain's alert system locked. Slowing to 4s increases early bounce rate by over 50%.
            </p>
          </div>
        </div>

        {/* Retention Graph Output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-slate-950/40 border border-white/10 rounded-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00FFCC]" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest font-mono">Simulated Retention Curve</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                simulationMetrics.score >= 75 ? "bg-[#00FFCC]/10 text-[#00FFCC] border-[#00FFCC]/20" :
                simulationMetrics.score >= 55 ? "bg-yellow-500/10 text-yellow-450 border-yellow-500/20" : "bg-[#FF2E63]/10 text-[#FF2E63] border-[#FF2E63]/20"
              }`}>
                {simulationMetrics.verdict}
              </span>
            </div>

            {/* Dynamic Simulated Metrics */}
            <div className="grid grid-cols-3 gap-4 font-sans">
              <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block font-bold">Overall Score</span>
                <span className="text-2xl font-bold text-white font-mono mt-0.5 block">{simulationMetrics.score}%</span>
                <div className="w-full bg-white/10 h-0.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF2E63] to-[#00FFCC] h-full" style={{ width: `${simulationMetrics.score}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block font-bold">30s Retention</span>
                <span className="text-2xl font-bold text-[#00FFCC] font-mono mt-0.5 block">{simulationMetrics.earlyPreservation}%</span>
                <span className="text-[9px] text-slate-500 mt-1 block">Algorithm Entry Target</span>
              </div>

              <div className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block font-bold">Average View %</span>
                <span className="text-2xl font-bold text-[#FF2E63] font-mono mt-0.5 block">{simulationMetrics.avgRetention}%</span>
                <span className="text-[9px] text-slate-500 mt-1 block">Duration Satisfaction</span>
              </div>
            </div>

            {/* Simulated Graph (Custom SVG!) */}
            <div className="relative pt-4 bg-black/60 border border-white/5 rounded-xl p-4">
              {/* Y Axis Guide lines */}
              <div className="absolute left-2 top-4 bottom-8 w-full border-l border-white/5 border-dashed pointer-events-none">
                {[100, 75, 50, 25].map((yVal) => (
                  <div key={yVal} className="absolute w-full border-t border-white/5 flex justify-between pr-4 select-none" style={{ bottom: `${yVal}%` }}>
                    <span className="text-[8px] text-slate-655 font-mono -mt-1 text-slate-600">{yVal}%</span>
                  </div>
                ))}
              </div>

              {/* Curve Drawing Container */}
              <div className="h-44 w-full flex items-end relative pl-6">
                <svg className="w-full h-full overflow-visible animate-pulse-slow" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF2E63" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area below curve */}
                  <path
                    d={`${svgPath} L 500 200 L 0 200 Z`}
                    fill="url(#curveGradient)"
                  />

                  {/* Main Line path */}
                  <path
                    d={svgPath}
                    fill="none"
                    stroke="#00FFCC"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                  />

                  {/* Highlight control/milestone circles */}
                  {simulationMetrics.points.map((p, index) => {
                    const x = (p.x / 100) * 500;
                    const y = 200 - (p.y / 100) * 200;
                    const showPulse = index === 1 || index === 5 || index === 10;
                    return (
                      <g key={index}>
                        {showPulse && (
                          <circle
                            cx={x}
                            cy={y}
                            r="8"
                            fill="#00FFCC"
                            opacity="0.3"
                            className="animate-ping"
                          />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={index === 1 || index === 5 || index === 10 ? "5" : "3.5"}
                          fill={index === 10 && sessionHookOn ? "#FF2E63" : "#00FFCC"}
                          stroke="#020617"
                          strokeWidth="1.5"
                          className="hover:scale-155 transition-transform cursor-pointer"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between items-center pl-6 text-[8px] font-mono text-slate-500 mt-2 select-none uppercase tracking-widest">
                <span>0s (Intro)</span>
                <span>Hook Edge (30s)</span>
                <span>Midpoint</span>
                <span>Exit Loop (Binge)</span>
              </div>
            </div>

            {/* Alert / Advice box according to score */}
            <div className="flex gap-3 p-4 bg-[#0A0A0B] border border-white/10 rounded-xl font-sans">
              {simulationMetrics.score >= 75 ? (
                <>
                  <Play className="w-5 h-5 text-[#00FFCC] shrink-0 self-center" />
                  <p className="text-xs text-slate-400 leading-normal">
                    <span className="font-bold text-white block">Excellent Balance!</span> Your 1.6s cut rate and pattern interrupt density flatten the "Midpoint drop-off," guaranteeing high satisfaction tokens from the 2026 Home Feed discovery.
                  </p>
                </>
              ) : shotLength > 2.2 ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-[#FF2E63] shrink-0 self-center" />
                  <p className="text-xs text-slate-355 leading-relaxed">
                    <span className="font-bold text-[#FF2E63] block">Warning: Slow Visual Rhythm</span> Your average cut rate of <span className="font-mono text-white">{shotLength}s</span> causes immediate optical neurological drift. Drag Average Shot Length below 1.8s in the opening 30 seconds to lock viewers.
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-yellow-450 text-yellow-405 shrink-0 self-center" />
                  <p className="text-xs text-slate-355 leading-relaxed">
                    <span className="font-bold text-yellow-400 block">Session Decay Danger</span> The exit rate is dropping very sharply at the end. Turn on "Session Binge-Loop Ending" or introduce an unfinished loop script to prevent sudden bounce warnings.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
