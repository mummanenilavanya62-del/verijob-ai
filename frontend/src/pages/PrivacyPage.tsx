import React from 'react';
import { Lock, ShieldCheck, Database, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-400">
          How VeriJob AI processes text without compromising candidate confidentiality
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <span>No Account or Personal Credentials Required</span>
          </h3>
          <p className="text-slate-400">
            You do not need to register, provide your real name, phone number, resume, or password to analyze job postings. The system is entirely anonymous and accessible to any student.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Session-Based Local History</span>
          </h3>
          <p className="text-slate-400">
            Analysis records are tagged with an ephemeral browser session identifier generated on your device. Your past scans are not publicly cross-indexed, and you can delete any saved record at any time using the Delete button in Scan History.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Zero SSRF or Remote Ingestion</span>
          </h3>
          <p className="text-slate-400">
            For security, the application does not make arbitrary web requests or fetch remote URLs provided in form inputs. URLs are parsed purely syntactically for domain patterns and top-level domain classification.
          </p>
        </div>
      </div>
    </div>
  );
};
