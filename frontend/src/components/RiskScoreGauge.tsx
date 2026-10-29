import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface RiskScoreGaugeProps {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  mlScore: number;
  ruleScore: number;
  modelMode?: string;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  level,
  mlScore,
  ruleScore,
  modelMode
}) => {
  // Determine color scheme
  let colorClass = 'text-emerald-400 stroke-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let badgeText = 'Low Risk — Likely Legitimate';
  let badgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  let Icon = ShieldCheck;
  let gradientStops = { start: '#10B981', end: '#059669' };

  if (level === 'Medium') {
    colorClass = 'text-amber-400 stroke-amber-400 bg-amber-500/10 border-amber-500/30';
    badgeText = 'Medium Risk — Exercise Caution';
    badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    Icon = AlertTriangle;
    gradientStops = { start: '#F59E0B', end: '#D97706' };
  } else if (level === 'High') {
    colorClass = 'text-rose-400 stroke-rose-400 bg-rose-500/10 border-rose-500/30';
    badgeText = 'High Risk — Multiple Scam Red Flags';
    badgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    Icon = ShieldAlert;
    gradientStops = { start: '#EF4444', end: '#DC2626' };
  }

  // Circular progress calculation
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div 
        className="absolute w-56 h-56 rounded-full blur-3xl -top-12 -right-12 opacity-20 pointer-events-none"
        style={{ background: gradientStops.start }}
      />

      <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>Overall Fraud Risk Assessment</span>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative w-48 h-48 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="14"
            fill="transparent"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke={gradientStops.start}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Display */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-5xl font-black tracking-tight text-white">{score}</span>
          <span className="text-xs uppercase font-medium text-slate-400 mt-0.5">out of 100</span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-3 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-sm font-semibold shadow-sm ${badgeColor}`}>
        <Icon className="w-4 h-4" />
        <span>{badgeText}</span>
      </div>

      {/* Engine Breakdown: ML vs Heuristics */}
      <div className="w-full mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-left">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center space-x-1">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>TF-IDF + ML Score</span>
            </span>
            <span className="font-bold text-slate-200">{mlScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, mlScore)}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center space-x-1">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>Rule Heuristic Score</span>
            </span>
            <span className="font-bold text-slate-200">{ruleScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, ruleScore)}%` }}
            />
          </div>
        </div>
      </div>

      {modelMode && (
        <div className="mt-3 text-[11px] text-slate-500">
          Engine Pipeline: <span className="text-slate-400 font-medium">{modelMode}</span>
        </div>
      )}
    </div>
  );
};
