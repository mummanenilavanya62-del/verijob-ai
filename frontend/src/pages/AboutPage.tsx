import React from 'react';
import { Shield, BookOpen, Layers, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>College B.Tech CSE Mini Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          About the Project
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          AI-Based Fake Job and Internship Detection System
        </p>
      </div>

      {/* Abstract */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800 space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>1. Project Abstract</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Online recruitment fraud targeting university students and fresh college graduates has proliferated rapidly with the expansion of remote work. Vulnerable applicants are lured by promises of high stipends, only to be subjected to registration fees, credential theft, and money mule schemes. This project presents <strong>VeriJob AI</strong>, an end-to-end full-stack web application that combines statistical natural language processing (TF-IDF with Logistic Regression) and explainable cybersecurity heuristics to evaluate the legitimacy of job and internship postings in real time.
        </p>
      </div>

      {/* Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white text-rose-300">2. Problem Statement</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Students lack reliable automated tools to assess recruitment legitimacy prior to submitting sensitive personal documents or paying deceptive security deposits. Existing job portals often rely on delayed manual user reporting after victims have already been defrauded.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white text-emerald-300">3. Project Objectives</h3>
          <ul className="text-xs sm:text-sm text-slate-400 space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Provide instant, privacy-respecting job risk scoring (0-100).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Extract verifiable evidence snippets for flagged warning signs.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Detect enterprise vs free email provider domain mismatches.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Existing vs Proposed System */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4">4. Existing vs Proposed System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-bold text-rose-400 mb-2">Existing System Limitations:</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Passive manual moderation requiring user reports.</li>
              <li>• Black-box warning labels without actionable explanations.</li>
              <li>• Frequent false negatives when scammers use formal wording.</li>
              <li>• High barrier to entry requiring login accounts and tracking.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
            <h4 className="font-bold text-blue-300 mb-2">Proposed VeriJob AI Advantages:</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>• Real-time hybrid evaluation (ML probability + heuristic audit).</li>
              <li>• Transparent explainability breakdown with highlighted text snippets.</li>
              <li>• Instant access without user account registration.</li>
              <li>• Local SQLite session isolation preventing data leakage.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>5. Technology Stack</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Frontend</span>
            <span className="font-bold text-white text-sm">React + Vite</span>
            <span className="text-slate-400 block mt-1">TypeScript, Tailwind CSS</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Backend</span>
            <span className="font-bold text-white text-sm">Python FastAPI</span>
            <span className="text-slate-400 block mt-1">Pydantic v2, RESTful APIs</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Machine Learning</span>
            <span className="font-bold text-white text-sm">scikit-learn</span>
            <span className="text-slate-400 block mt-1">TF-IDF + Logistic Regression</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Database</span>
            <span className="font-bold text-white text-sm">SQLAlchemy</span>
            <span className="text-slate-400 block mt-1">SQLite (Dev) / PostgreSQL (Prod)</span>
          </div>
        </div>
      </div>

      {/* Limitations & Future Scope */}
      <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>6. Limitations & Future Scope</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Current Limitations:</strong> Analysis is conducted statically without fetching or parsing remote dynamic JavaScript pages (preventing SSRF). It assumes text input is supplied by the user.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Future Scope:</strong> Browser extension integration for automated inline scoring on LinkedIn, Indeed, and Internshala; multilingual support for regional recruitment scams; automated WHOIS domain age inspection.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => setActiveTab('analyze')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-105 transition-all inline-flex items-center space-x-2"
        >
          <span>Try Risk Analyzer Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
