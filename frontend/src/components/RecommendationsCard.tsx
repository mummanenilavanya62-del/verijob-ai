import React from 'react';
import { CheckSquare, ShieldCheck } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border-slate-800">
      <div className="flex items-center space-x-2.5 mb-4">
        <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Recommended Safety Actions</h3>
          <p className="text-xs text-slate-400">Practical steps to safeguard your identity and career</p>
        </div>
      </div>

      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm text-slate-300">
            <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
