import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Cpu, 
  Lock, 
  ArrowRight, 
  AlertTriangle, 
  FileCheck, 
  Zap, 
  Award,
  DollarSign
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-3xl -z-10 rounded-full" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>B.Tech CSE Mini Project — AI Scam Defense</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Detect Fake Jobs & Suspicious Offers with{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            Explainable AI
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Safeguard your career applications before you submit resumes or sensitive personal information. VeriJob AI cross-examines postings against modern fraud patterns using TF-IDF Machine Learning and rule heuristics.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('analyze')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Analyze a Job Posting</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
          >
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>View ML Pipeline & Weights</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-white">0 to 100</div>
            <div className="text-xs text-slate-400 mt-0.5">Calibrated Risk Index</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">TF-IDF + LR</div>
            <div className="text-xs text-slate-400 mt-0.5">Interpretable ML Model</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">10+ Rules</div>
            <div className="text-xs text-slate-400 mt-0.5">Heuristic Red-Flag Audit</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">100% Free</div>
            <div className="text-xs text-slate-400 mt-0.5">No Login or Sign-up Needed</div>
          </div>
        </div>
      </section>

      {/* 3-Step Detection Process */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">Simple & Fast Workflow</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How Detection Works in 3 Steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border-slate-800 relative group hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-2">Enter Job Details</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Paste the job description, company name, offered stipend, and optional recruiter contact email or portal link into the scanner.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800 relative group hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-black text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-2">Analyze Risk Signals</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our dual-stage engine extracts n-gram TF-IDF vectors, runs Logistic Regression, and audits against 10+ deterministic scam indicators.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800 relative group hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-2">Review Warnings & Steps</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get an overall risk score (Low, Medium, or High), identified suspicious snippets, and practical verification steps before applying.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">Core Capabilities</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Key Protection Modules</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Registration Fee Detection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Catches requests for training fees, laptop security deposits, and processing fees before onboarding starts.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Enterprise Domain Mismatch</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Flags recruiters claiming to represent Fortune 500 tech companies while using free Gmail, Yahoo, or Outlook webmail.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Guaranteed Hiring Traps</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Identifies claims of instant offer letters, 100% placement guarantees, and direct selection without interviews.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">TF-IDF Text Classification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Uses natural language processing and token weights trained on documented recruitment scam benchmarks.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Credential Harvesting Defense</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Alerts against premature requests for bank account details, government identity documents, or OTPs.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Transparent Local History</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stores personal scan history locally in SQLite with session privacy so you can reference past reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Advisory Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl p-6 border border-slate-800 bg-slate-900/80 flex items-start space-x-4">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">College Mini Project Advisory</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              This system calculates heuristic and statistical risk indicators. It is not an absolute guarantee of authenticity or fraud. Students should always cross-verify job postings on the official corporate careers portal and never transfer money to recruiters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
