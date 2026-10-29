import React, { useState } from 'react';
import { JobAnalysisRequest, JobAnalysisResponse } from '../types';
import { analyzeJob } from '../services/api';
import { AnalysisForm } from '../components/AnalysisForm';
import { ResultCard } from '../components/ResultCard';
import { ReportScamModal } from '../components/ReportScamModal';
import { AlertCircle } from 'lucide-react';

interface AnalysisPageProps {
  initialResult?: JobAnalysisResponse | null;
  onClearInitialResult?: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  initialResult,
  onClearInitialResult
}) => {
  const [result, setResult] = useState<JobAnalysisResponse | null>(initialResult || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [selectedReportPosting, setSelectedReportPosting] = useState<JobAnalysisResponse | null>(null);

  // Sync if initialResult changes (e.g. from history view)
  React.useEffect(() => {
    if (initialResult) {
      setResult(initialResult);
    }
  }, [initialResult]);

  const handleAnalyze = async (formData: JobAnalysisRequest) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await analyzeJob(formData);
      setResult(response);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMessage(err.message || 'Failed to analyze job posting. Please check your backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage('');
    if (onClearInitialResult) {
      onClearInitialResult();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportModal = (posting: JobAnalysisResponse) => {
    setSelectedReportPosting(posting);
    setReportModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold block">Analysis Error:</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {result ? (
        <ResultCard
          result={result}
          onReset={handleReset}
          onOpenReportModal={handleOpenReportModal}
        />
      ) : (
        <AnalysisForm
          onSubmit={handleAnalyze}
          isLoading={isLoading}
        />
      )}

      {/* Report Scam Modal */}
      <ReportScamModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        presetData={selectedReportPosting}
      />
    </div>
  );
};
