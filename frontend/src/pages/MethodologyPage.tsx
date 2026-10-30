import React, { useEffect, useState } from 'react';
import { MethodologyResponse } from '../types';
import { getMethodology } from '../services/api';
import { Cpu, ShieldAlert, Award, FileText, CheckCircle2, Sliders, Loader2 } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const [methodology, setMethodology] = useState<MethodologyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMethodology()
      .then(setMethodology)
      .catch((err) => console.warn('Could not load methodology from API:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Academic & Algorithmic Design</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          AI Detection Methodology
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          How VeriJob AI analyzes job postings through an interpretable ensemble of statistical NLP and deterministic cybersecurity heuristics.
        </p>
      </div>

      {/* High-Level Architecture Diagram Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-blue-400" />
          <span>Hybrid Architecture Overview</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center my-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">Input Layer</span>
            <h4 className="text-sm font-bold text-white mt-1">Raw Job Posting</h4>
            <p className="text-xs text-slate-400 mt-2">
              Title, Description, Company, Domain, Salary, Contact Email
            </p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-indigo-500/40 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold uppercase text-white">
              Dual Engine
            </div>
            <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Analysis Layer</span>
            <h4 className="text-sm font-bold text-white mt-1">TF-IDF + Heuristics</h4>
            <p className="text-xs text-slate-400 mt-2">
              Semantic N-Gram Vectorizer + 10 Red-Flag Rule Checks
            </p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Output Layer</span>
            <h4 className="text-sm font-bold text-white mt-1">Calibrated Risk Score</h4>
            <p className="text-xs text-slate-400 mt-2">
              0-100 Risk Score, Level Badge, Evidence Quotes & Actions
            </p>
          </div>
        </div>
      </div>

      {/* Machine Learning Pipeline Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">1. Machine Learning Classifier</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We employ <strong>TF-IDF (Term Frequency-Inverse Document Frequency)</strong> with sublinear term scaling combined with <strong>Logistic Regression</strong> using balanced class weights.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>N-Gram Range: Unigrams & Bigrams (1, 2)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Max Feature Space: 2,500 informative vocabulary tokens</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interpretability: Direct inspection of positive log-odds coefficients</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">2. Deterministic Rule Engine</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pure machine learning models can suffer from false negatives when new scams disguise language. Our heuristic engine enforces non-negotiable safety guardrails.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Upfront registration, training, or kit fee detection</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Enterprise domain vs public webmail (@gmail.com) cross-check</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Premature banking, OTP, or government credential harvesting</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Dataset Provenance & Academic Scope Disclosure */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800 bg-slate-900/60">
        <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>Benchmark Dataset Provenance & Scope Disclosure</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          To ensure strict ethical compliance and avoid fabricated metrics, the prototype classifier is trained on a transparent, curated benchmark reference set of 16 documented job postings:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-emerald-300 block mb-1">Authentic Cohort (8 Postings)</span>
            <p className="text-slate-400 leading-relaxed">
              Curated from verified corporate technical careers portals including Datadog, Thoughtworks, AI2, Canva, CrowdStrike, Spotify, Red Hat, and MongoDB.
            </p>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <span className="font-bold text-rose-300 block mb-1">Documented Fraud Archetypes (8 Postings)</span>
            <p className="text-slate-400 leading-relaxed">
              Synthesized from active consumer warnings and alerts published by the Federal Trade Commission (FTC), FBI IC3 Wire Fraud bulletins, and university career center advisories.
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 italic border-l-2 border-cyan-500/50 pl-3">
          <strong>Academic Disclosure:</strong> This 16-sample benchmark validates pipeline architecture, feature extraction stability, and coefficient interpretability for college mini project demonstration. It is not presented as a claim of universal real-world generalization across arbitrary industry domains.
        </p>
      </div>

      {/* Heuristic Rules Matrix */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <span>Heuristic Rule Evaluation Matrix</span>
        </h3>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-400" />
            <span>Loading rule definitions...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Heuristic Rule</th>
                  <th className="py-3 px-4">Impact / Weight</th>
                  <th className="py-3 px-4">Security Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-normal">
                {methodology?.rule_heuristics.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-semibold text-slate-200">{r.rule_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-xs">
                        {r.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{r.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Calibration Tiers */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span>Risk Calibration & Categorization Tiers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">0 - 35 Index</span>
            <h4 className="text-base font-bold text-white mt-1">Low Risk</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Standard recruitment terminology, authentic corporate career domains, verified compensation bounds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">36 - 69 Index</span>
            <h4 className="text-base font-bold text-white mt-1">Medium Risk</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Ambiguous description, unverified contact domains, vague responsibilities. Independent verification advised.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">70 - 100 Index</span>
            <h4 className="text-base font-bold text-white mt-1">High Risk</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Severe red flags detected (e.g. upfront fee, fake interview, enterprise identity theft, Telegram wire fraud).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
