import React from 'react';
import { Shield, ExternalLink, Heart, AlertCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Abstract */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base">VeriJob AI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An intelligent fraud detection and risk assessment system developed as a Computer Science & Engineering mini project. Designed to empower students and early-career job seekers against recruitment scams through hybrid machine learning and transparent heuristics.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Backend API Status: Active (FastAPI + scikit-learn)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Project Modules</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-blue-400 transition-colors">
                  Risk Analysis Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-blue-400 transition-colors">
                  Scan History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('methodology')} className="hover:text-blue-400 transition-colors">
                  ML Model & Weights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Safety & Governance</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('disclaimer')} className="hover:text-blue-400 transition-colors">
                  Safety Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <a
                  href="/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                >
                  <span>OpenAPI Swagger Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Notice Banner */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 VeriJob AI — College B.Tech CSE Mini Project. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Provides advisory risk scoring. Always independently verify offers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
