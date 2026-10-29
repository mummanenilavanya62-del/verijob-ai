import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { HistoryPage } from './pages/HistoryPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { JobAnalysisResponse } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeAnalysisResult, setActiveAnalysisResult] = useState<JobAnalysisResponse | null>(null);

  const handleViewAnalysisFromHistory = (analysis: JobAnalysisResponse) => {
    setActiveAnalysisResult(analysis);
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewScanFromHistory = () => {
    setActiveAnalysisResult(null);
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'analyze':
        return (
          <AnalysisPage
            initialResult={activeAnalysisResult}
            onClearInitialResult={() => setActiveAnalysisResult(null)}
          />
        );
      case 'history':
        return (
          <HistoryPage
            onViewAnalysis={handleViewAnalysisFromHistory}
            onNewScan={handleNewScanFromHistory}
          />
        );
      case 'methodology':
        return <MethodologyPage />;
      case 'about':
        return <AboutPage setActiveTab={setActiveTab} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      default:
        return <NotFoundPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {renderCurrentPage()}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
