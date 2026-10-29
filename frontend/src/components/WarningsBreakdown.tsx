import React from 'react';
import { WarningSignItem } from '../types';
import { AlertCircle, DollarSign, Clock, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface WarningsBreakdownProps {
  warnings: WarningSignItem[];
}

export const WarningsBreakdown: React.FC<WarningsBreakdownProps> = ({ warnings }) => {
  if (warnings.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-emerald-950/10">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-emerald-300">No Common Red Flags Detected</h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              The analysis engine did not uncover upfront fee requests, suspicious free domains, direct appointment promises, or high-pressure recruitment tactics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial':
        return DollarSign;
      case 'urgency':
        return Clock;
      case 'contact':
        return Mail;
      case 'compensation':
        return DollarSign;
      default:
        return FileText;
    }
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'high') {
      return (
        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
          High Severity Flag
        </span>
      );
    }
    if (severity === 'medium') {
      return (
        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Medium Severity Flag
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
        Low Severity Flag
      </span>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span>Detected Warning Signs ({warnings.length})</span>
        </h3>
        <span className="text-xs text-slate-400">Prioritized by scam risk impact</span>
      </div>

      <div className="space-y-3">
        {warnings.map((w, idx) => {
          const CategoryIcon = getCategoryIcon(w.category);
          return (
            <div
              key={idx}
              className="glass-panel rounded-xl p-4 sm:p-5 border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <CategoryIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{w.title}</h4>
                </div>
                <div>{getSeverityBadge(w.severity)}</div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {w.description}
              </p>

              {w.evidence && (
                <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-xs">
                  <span className="text-slate-500 font-medium mr-2">Identified Signal:</span>
                  <code className="text-amber-300 font-mono bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20">
                    "{w.evidence}"
                  </code>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
