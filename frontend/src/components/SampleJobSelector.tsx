import React, { useEffect, useState } from 'react';
import { SampleJob, JobAnalysisRequest } from '../types';
import { getSampleJobs } from '../services/api';
import { PlayCircle, ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';

interface SampleJobSelectorProps {
  onSelectSample: (job: JobAnalysisRequest) => void;
}

export const SampleJobSelector: React.FC<SampleJobSelectorProps> = ({ onSelectSample }) => {
  const [samples, setSamples] = useState<SampleJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSampleJobs()
      .then((data) => setSamples(data))
      .catch((err) => {
        console.warn('Could not load sample jobs from API, using defaults:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || samples.length === 0) return null;

  return (
    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
          <PlayCircle className="w-4 h-4 text-indigo-400" />
          <span>Interactive Mini-Project Demo Samples</span>
        </span>
        <span className="text-[11px] text-slate-400">Click any preset to test immediately</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {samples.map((s) => {
          const isHigh = s.expected_risk === 'High';
          const isLow = s.expected_risk === 'Low';

          let badgeClass = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
          let Icon = HelpCircle;

          if (isLow) {
            badgeClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
            Icon = ShieldCheck;
          } else if (isHigh) {
            badgeClass = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
            Icon = AlertOctagon;
          }

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectSample(s.data)}
              className="text-left p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                  {s.label}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase flex items-center space-x-1 ${badgeClass}`}>
                  <Icon className="w-3 h-3 mr-0.5" />
                  <span>{s.expected_risk}</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {s.description_summary}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
