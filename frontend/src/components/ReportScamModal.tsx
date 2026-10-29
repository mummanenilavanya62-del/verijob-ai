import React, { useState } from 'react';
import { JobAnalysisResponse, ScamReportCreate } from '../types';
import { submitScamReport } from '../services/api';
import { X, Flag, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetData?: JobAnalysisResponse | null;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({
  isOpen,
  onClose,
  presetData
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ScamReportCreate>({
    job_title: presetData?.job_title || '',
    company_name: presetData?.company_name || '',
    source_url: presetData?.application_url || '',
    scam_description: '',
    scam_type: 'suspicious_fees',
    contact_email: presetData?.recruiter_email || ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.job_title || !formData.company_name || !formData.scam_description) {
      setErrorMsg('Please fill in required fields.');
      return;
    }
    if (formData.scam_description.length < 10) {
      setErrorMsg('Description must be at least 10 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await submitScamReport(formData);
      setSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit scam report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border-slate-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Report Scam or Fraudulent Job</h3>
            <p className="text-xs text-slate-400">Help alert peers and protect fellow students</p>
          </div>
        </div>

        {successMsg ? (
          <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-emerald-300">Report Submitted!</h4>
            <p className="text-xs text-slate-300">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Job or Position Title *
              </label>
              <input
                type="text"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Scam Category
              </label>
              <select
                value={formData.scam_type}
                onChange={(e) => setFormData({ ...formData, scam_type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="suspicious_fees">Upfront Registration / Equipment Fee</option>
                <option value="enterprise_impersonation">Enterprise Impersonation / Fake HR</option>
                <option value="data_harvesting">Bank Account / Identity Theft</option>
                <option value="fake_check">Fake Cashier Check / Money Mule</option>
                <option value="unpaid_labor">Ghost Internship / Unpaid Labor</option>
                <option value="other">Other Suspicious Activity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                What happened? Describe the scam *
              </label>
              <textarea
                rows={3}
                placeholder="e.g. They asked for Rs. 2,000 for training via Google Pay and sent fake offer letter on WhatsApp..."
                value={formData.scam_description}
                onChange={(e) => setFormData({ ...formData, scam_description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-rose-600/20"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Flag className="w-3.5 h-3.5" />}
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
