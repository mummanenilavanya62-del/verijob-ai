import React, { useEffect, useState } from 'react';
import { HistoryItemSummary, JobAnalysisResponse } from '../types';
import { getHistory, getHistoryById, deleteHistoryItem } from '../services/api';
import { HistoryTable } from '../components/HistoryTable';
import { Loader2, AlertCircle } from 'lucide-react';

interface HistoryPageProps {
  onViewAnalysis: (analysis: JobAnalysisResponse) => void;
  onNewScan: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onViewAnalysis,
  onNewScan
}) => {
  const [history, setHistory] = useState<HistoryItemSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchHistory = () => {
    setIsLoading(true);
    getHistory()
      .then((data) => setHistory(data))
      .catch((err) => {
        console.error('History fetch failed:', err);
        setErrorMsg('Could not load analysis records from backend.');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleViewDetails = async (id: string) => {
    try {
      const fullAnalysis = await getHistoryById(id);
      onViewAnalysis(fullAnalysis);
    } catch (err: any) {
      alert(`Could not open analysis: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this analysis record?')) return;
    try {
      await deleteHistoryItem(id);
      setHistory(history.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="glass-panel rounded-2xl p-16 flex flex-col items-center justify-center border-slate-800">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-3" />
          <span className="text-sm text-slate-400">Loading analysis records from database...</span>
        </div>
      ) : (
        <HistoryTable
          history={history}
          onViewDetails={handleViewDetails}
          onDeleteItem={handleDelete}
          onNewScan={onNewScan}
        />
      )}
    </div>
  );
};
