import React from 'react';
import { AlertTriangle, Award, CheckCircle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Academic & Regulatory Notice</span>
        </div>
        <h1 className="text-3xl font-black text-white">System Disclaimer</h1>
        <p className="mt-2 text-sm text-slate-400">
          Important operational and advisory considerations
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
          <h3 className="text-base font-bold text-amber-300 mb-2 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Advisory Scoring Only — Not a Legal Guarantee</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            VeriJob AI provides algorithmic risk scoring based on statistical natural language processing and empirical scam indicators. A low risk score does <strong>not</strong> guarantee that a company or employer is genuine, nor does a high risk score constitute legal proof of criminal fraud.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2">Fundamental Rules for Job Seekers</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Never pay money to get a job:</strong> Legitimate companies never charge registration fees, training fees, or equipment security deposits.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Verify through official domains:</strong> Always navigate independently to the company’s official careers page (e.g. company.com/careers) to verify active job listings.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span><strong>Protect sensitive credentials:</strong> Never disclose your netbanking passwords, debit card numbers, OTPs, or cryptocurrency wallet keys to anyone claiming to be a recruiter.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
