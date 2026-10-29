import React from 'react';
import { HistoryItemSummary } from '../types';
import { 
  Building2, 
  MapPin, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Clock 
} from 'lucide-react';

interface HistoryTableProps {
  history: HistoryItemSummary[];
  onViewDetails: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onNewScan: () => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
  history,
  onViewDetails,
  onDeleteItem,
  onNewScan
}) => {
  if (history.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Analysis Records Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
          Your scanned postings will be securely remembered here in your local session for review.
        </p>
        <button
          onClick={onNewScan}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform"
        >
          Scan Your First Job Posting
        </button>
      </div>
    );
  }

  const getRiskBadge = (level: string, score: number) => {
    if (level === 'Low') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Low ({score})</span>
        </span>
      );
    }
    if (level === 'Medium') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Med ({score})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>High ({score})</span>
      </span>
    );
  };

  return (
    <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-xl">
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Recent Analysis History</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Retrieved from SQLite database with session-level isolation
          </p>
        </div>
        <button
          onClick={onNewScan}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Search className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Job Position & Company</th>
              <th className="py-3.5 px-4">Type & Location</th>
              <th className="py-3.5 px-4">Risk Evaluation</th>
              <th className="py-3.5 px-4">Flags</th>
              <th className="py-3.5 px-4">Scanned On</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-normal">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900/50 transition-colors group">
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {item.job_title}
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-0.5">
                    <Building2 className="w-3 h-3 text-purple-400" />
                    <span>{item.company_name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs text-slate-300 block">{item.job_type || 'Job'}</span>
                  {item.location && (
                    <span className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {getRiskBadge(item.risk_level, item.risk_score)}
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {item.warning_count} signals
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button
                      onClick={() => onViewDetails(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                      title="View Full Report"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
