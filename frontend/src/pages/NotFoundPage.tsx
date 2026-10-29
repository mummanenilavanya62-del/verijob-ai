import React from 'react';
import { AlertCircle, Home, Search } from 'lucide-react';

interface NotFoundPageProps {
  setActiveTab: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-200 mt-1">Page Not Found</h2>
      <p className="text-sm text-slate-400 mt-2 mb-6">
        The section you are looking for does not exist or has been moved.
      </p>
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setActiveTab('home')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center space-x-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('analyze')}
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
        >
          <Search className="w-4 h-4" />
          <span>Analyze Job</span>
        </button>
      </div>
    </div>
  );
};
